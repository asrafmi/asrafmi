import Anthropic from '@anthropic-ai/sdk';
import { PERSONA, GUARD_SYSTEM } from '@/lib/persona';

const anthropic = new Anthropic();

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

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (lastUserMessage && isOffTopic(lastUserMessage.content)) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(OFF_TOPIC_REPLY)}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
    });
  }

  const transcript = messages
    .map((m) => (m.role === 'user' ? 'Visitor: ' : 'Asraf: ') + m.content)
    .join('\n');

  const prompt = `${PERSONA}\n\n${GUARD_SYSTEM}\n\n--- Conversation so far ---\n${transcript}\n\nReply now as Asraf (first person, concise). Do not prefix with your name.`;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        const response = await anthropic.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          messages: [{ role: 'user', content: prompt }],
        });

        for await (const chunk of response) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(chunk.delta.text)}\n\n`)
            );
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        console.error('[chat] stream error:', err);
        controller.enqueue(encoder.encode('data: [ERROR]\n\n'));
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
