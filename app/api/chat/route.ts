import Anthropic from '@anthropic-ai/sdk';
import { PERSONA } from '@/lib/persona';

const anthropic = new Anthropic();

type Message = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const transcript = messages
    .map((m) => (m.role === 'user' ? 'Visitor: ' : 'Asraf: ') + m.content)
    .join('\n');

  const prompt = `${PERSONA}\n\n--- Conversation so far ---\n${transcript}\n\nReply now as Asraf (first person, concise). Do not prefix with your name.`;

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
      } catch {
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
