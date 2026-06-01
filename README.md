# Asraf Muhammad — Portfolio

Personal portfolio website with an AI chat twin, built with Next.js (App Router), Tailwind CSS, and the Anthropic API.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + inline styles for complex animations
- **AI**: Claude Haiku via Anthropic SDK, streamed via SSE
- **Fonts**: Geist & Geist Mono (Google Fonts)
- **Deploy**: Vercel (recommended)

## Project Structure

```
app/
├── api/chat/route.ts     # SSE streaming endpoint (Claude Haiku)
├── globals.css           # CSS variables, keyframes, Tailwind
├── layout.tsx            # Root layout + SEO metadata
└── page.tsx              # Homepage

components/
├── sections/             # Hero, About, Experience, Projects, Skills, Contact
└── ui/
    ├── Atmosphere.tsx    # Background grid, glow, spotlight, particles
    ├── Dock.tsx          # Fixed bottom nav with scroll-spy
    └── ChatPanel.tsx     # AI chat FAB + slide-in panel

hooks/
├── useCursorSpotlight.ts
├── useMagneticEffect.ts
├── useReveal.ts
└── useScrollSpy.ts

lib/
└── persona.ts            # AI system prompt (server-only)
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variable**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Anthropic API key:

   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com) |

## Deploy

Push to GitHub and deploy to [Vercel](https://vercel.com). Set `ANTHROPIC_API_KEY` in the Vercel project environment variables.

## Roadmap

### AI Chat — RAG with Vector DB

Currently the AI twin uses a hardcoded system prompt in `lib/persona.ts`. The plan is to replace this with a proper RAG pipeline so the AI can answer from richer, always-up-to-date context without touching code.

**Target architecture:**

```
Sanity CMS  →  embed on publish (webhook)  →  Vector DB  →  /api/chat retrieves top-k chunks  →  Claude Haiku
```

- **Content source**: [Sanity](https://sanity.io) — manage CV, projects, blog posts, and any other portfolio content as structured documents. No code changes needed to update content.
- **Embeddings**: Generate embeddings from Sanity content on every publish via a Sanity webhook → serverless function.
- **Vector DB**: Store and query embeddings (candidates: [Pinecone](https://pinecone.io), [Supabase pgvector](https://supabase.com/docs/guides/ai/vector-columns), or [Upstash Vector](https://upstash.com/docs/vector/overall/getstarted)).
- **Retrieval**: On each chat message, embed the user query → similarity search → inject top-k relevant chunks into Claude's context window instead of the static persona string.
- **Benefit**: Content stays accurate automatically. Adding a new project or job in Sanity Studio is enough — no `persona.ts` edit, no redeploy.
