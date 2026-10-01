'use client';

import { useRef, type ReactNode } from 'react';
import SplitReveal from '@/components/motion/SplitReveal';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

type Props = { idx: string; label: string; title: ReactNode; aside?: ReactNode };

export default function SectionHead({ idx, label, title, aside }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } });
    tl.from('.bar', { scaleX: 0, duration: 1.2 })
      .from('.label > span:not(.bar)', { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.1);
    if (aside) tl.from('.head-aside', { opacity: 0, y: 20, duration: 1 }, 0.3);
  }, { scope: ref });

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(48px, 7vw, 96px)' }}>
      <div className="label" style={{ marginBottom: 28, overflow: 'hidden' }}>
        <span className="idx">({idx})</span>
        <span className="bar" />
        <span>{label}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
        <SplitReveal as="h2" className="h2" style={{ maxWidth: 900 }}>{title}</SplitReveal>
        {aside && <div className="head-aside" style={{ maxWidth: 340, color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.65 }}>{aside}</div>}
      </div>
    </div>
  );
}
