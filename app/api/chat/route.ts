type Message = { role: 'user' | 'assistant'; content: string };

const OFF_TOPIC_REPLY =
  "I'm only here to answer questions about my background, experience, skills, and projects. For anything else, feel free to reach me at **asraf.muhammad07@gmail.com**.";

function isOffTopic(question: string): boolean {
  const q = question.toLowerCase();

  // Allow if clearly about Asraf / portfolio topics
  const ON_TOPIC = [
    'experience', 'skill', 'project', 'work', 'job', 'hire', 'contact',
    'built', 'tech', 'stack', 'react', 'next', 'node', 'nest', 'typescript',
    'education', 'background', 'about', 'who', 'what do you', 'tell me',
    'portfolio', 'freelance', 'open to', 'available', 'reach', 'email',
    'language', 'framework', 'asraf', 'indonesia', 'linkedin', 'github',
    'company', 'lion parcel', 'telkom', 'hemdal', 'kemendagri', 'skripsiai',
    'award', 'gpa', 'salary', 'rate', 'collaborate', 'team', 'lead',
  ];

  const OFF_TOPIC = [
    'recipe', 'cook', 'weather', 'sport', 'politic', 'movie', 'game',
    'music', 'celebrity', 'news', 'stock', 'crypto', 'bitcoin', 'invest',
    'math problem', 'solve this', 'translate', 'write a poem', 'write a story',
    'tell me a joke', 'what is the capital', 'history of', 'wikipedia',
    'homework', 'essay', 'medical', 'doctor', 'symptom', 'legal advice',
  ];

  if (OFF_TOPIC.some((kw) => q.includes(kw))) return true;
  if (ON_TOPIC.some((kw) => q.includes(kw))) return false;

  // Default: short greetings are fine, very long unrelated queries are blocked
  return q.length > 200 && !ON_TOPIC.some((kw) => q.includes(kw));
}

function sseDone(controller: ReadableStreamDefaultController<Uint8Array>, encoder: TextEncoder) {
  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
}

function sseError(controller: ReadableStreamDefaultController<Uint8Array>, encoder: TextEncoder) {
  controller.enqueue(encoder.encode('data: [ERROR]\n\n'));
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');

  const encoder = new TextEncoder();

  if (lastUserMessage && isOffTopic(lastUserMessage.content)) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(OFF_TOPIC_REPLY)}\n\n`));
        sseDone(controller, encoder);
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
    });
  }

  const baseUrl = process.env.KNOWLEDGE_BASE_API_URL;
  const companyId = process.env.KNOWLEDGE_BASE_API_COMPANY_ID;
  const tenantId = process.env.KNOWLEDGE_BASE_API_TENANT_ID;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (!baseUrl || !companyId || !tenantId) {
          throw new Error('Knowledge base API is not configured');
        }

        const upstream = await fetch(`${baseUrl}/v1/completion/stream`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-company-id': companyId,
            'x-tenant-id': tenantId,
          },
          body: JSON.stringify({ query: lastUserMessage?.content ?? '' }),
        });

        if (!upstream.ok || !upstream.body) {
          throw new Error(`Upstream error: ${upstream.status}`);
        }

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Upstream SSE events are separated by a blank line.
          let sepIndex: number;
          while ((sepIndex = buffer.indexOf('\n\n')) !== -1) {
            const rawEvent = buffer.slice(0, sepIndex);
            buffer = buffer.slice(sepIndex + 2);

            let eventType = 'message';
            let data = '';
            for (const line of rawEvent.split('\n')) {
              if (line.startsWith('event:')) {
                eventType = line.slice(6).trim();
              } else if (line.startsWith('data:')) {
                data += line.slice(5).trim();
              }
            }

            if (!data) continue;

            if (eventType === 'done') {
              // Final event carries `sources`, not text — not surfaced in the UI.
              continue;
            }

            try {
              const parsed = JSON.parse(data) as { text?: string };
              if (parsed.text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsed.text)}\n\n`));
              }
            } catch {
              // malformed chunk, skip
            }
          }
        }

        sseDone(controller, encoder);
      } catch (err) {
        console.error('[chat] stream error:', err);
        sseError(controller, encoder);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
