'use client';

import { useRef } from 'react';
import SectionHead from '@/components/motion/SectionHead';
import TechIcon from '@/components/ui/TechIcon';
import { techBrand } from '@/lib/tech';
import { gsap, useGSAP } from '@/lib/motion';

const PROJECTS = [
  {
    idx: 'Live',
    title: 'SkripsiAI · Thesis Assistant',
    desc: 'Write your thesis without the headache. Built in AI tools plus automatic document formatting, powered by the Anthropic API.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic API'],
    href: 'https://thesis-ai-assistant.vercel.app/',
  },
  {
    idx: 'GitHub',
    title: 'Knowledge Base API · RAG',
    desc: 'A multitenant RAG API with multiturn chat. Every tenant can pick their own LLM: Claude, OpenAI, Gemini or a self hosted Ollama.',
    tags: ['FastAPI', 'PostgreSQL', 'pgvector', 'Voyage AI', 'Docker'],
    href: 'https://github.com/asrafmi/knowledge-base-api',
  },
  {
    idx: 'GitHub',
    title: 'HRIS App',
    desc: 'An HR web app with the four things every team needs: attendance, leave requests, reimbursements and payroll.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    href: 'https://github.com/asrafmi/hris-app',
  },
  {
    idx: 'Live at Satria Muda Indonesia',
    title: 'Satria Muda Indonesia',
    desc: 'The platform for a national martial arts org, with realtime digital scoring, events and asset management.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Websocket', 'Docker', 'Kubernetes'],
    href: 'https://satriamudaindonesia.com',
  },
  {
    idx: 'Live at Hemdal',
    title: 'Hemdal · Media Monitoring',
    desc: 'A B2B SaaS that listens to social media and articles in realtime, with AI sentiment analysis and fast search.',
    tags: ['Next.js', 'NestJS', 'MySQL', 'Elasticsearch', 'Websocket', 'Docker', 'Kubernetes'],
    href: 'https://www.hemdal.id',
  },
  {
    idx: 'GitHub',
    title: 'This Portfolio',
    desc: 'The site you are on right now, with an AI twin chatbot that answers as me, built on the Anthropic API.',
    tags: ['Next.js', 'Tailwind', 'GSAP', 'Anthropic API'],
    href: 'https://github.com/asrafmi/asrafmi',
  },
  {
    idx: 'GitHub',
    title: 'ChatGPT Clone',
    desc: 'A ChatGPT style messenger with streaming replies and chats that stick around, built on the OpenAI API.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase', 'OpenAI API'],
    href: 'https://github.com/asrafmi/chatgpt-messenger',
  },
  {
    idx: 'GitHub',
    title: 'Diabetes Prediction',
    desc: 'A web app that estimates your diabetes risk from a few inputs, powered by a trained machine learning model.',
    tags: ['Python', 'Machine Learning', 'sklearn'],
    href: 'https://github.com/asrafmi/prediksi-diabetes-fixed',
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = rootRef.current!.querySelector<HTMLElement>('.proj-track')!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.proj-stage',
          start: 'center center',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const n = PROJECTS.length;
            const i = Math.min(n, Math.floor(self.progress * n) + 1);
            const el = rootRef.current?.querySelector('.proj-count');
            if (el) el.textContent = String(i).padStart(2, '0');
          },
        },
      });

      gsap.to('.proj-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.proj-stage', start: 'center center', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
      });

      // Big outlined numbers drift against the scroll for depth.
      gsap.utils.toArray<HTMLElement>('.proj-num').forEach((num) => {
        gsap.fromTo(num, { xPercent: 30 }, {
          xPercent: -20, ease: 'none',
          scrollTrigger: { trigger: num, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
        });
      });
    });

    mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((card) => {
        gsap.from(card, { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
    });
  }, { scope: rootRef });

  return (
    <section id="projects" ref={rootRef} className="section" style={{ overflow: 'hidden' }}>
      <div className="wrap">
        <SectionHead
          idx="03"
          label="Selected Work"
          title={<>Things I&apos;ve built.</>}
          aside="Stuff running in production, open source experiments and AI tools. Keep scrolling to slide through."
        />
      </div>

      <div className="proj-stage">
        <div className="proj-track">
          {PROJECTS.map((p, i) => (
            <a key={p.title} className="proj-card" href={p.href} target="_blank" rel="noopener">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', lineHeight: 1.5 }}>{p.idx}</span>
                <span className="proj-arrow" style={{
                  width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--border-2)', flexShrink: 0,
                  display: 'grid', placeItems: 'center', color: 'var(--text)',
                }}>
                  <ArrowIcon />
                </span>
              </div>

              <div className="proj-num" aria-hidden style={{ margin: '32px 0 auto' }}>{String(i + 1).padStart(2, '0')}</div>

              <h3 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '40px 0 12px' }}>{p.title}</h3>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 22 }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="chip tag-chip" style={{ gap: 7 }}>
                    <span style={{ display: 'inline-flex', color: techBrand(tag) }}>
                      <TechIcon name={tag} size={13} />
                    </span>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="wrap" style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
            <span className="proj-count" style={{ color: 'var(--text)' }}>01</span> / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)', position: 'relative' }}>
            <span className="proj-progress" style={{ position: 'absolute', inset: 0, background: 'var(--text)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
          </span>
          <a href="https://github.com/asrafmi" target="_blank" rel="noopener" className="mono ulink" style={{ fontSize: 11, color: 'var(--muted)' }}>
            More on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
