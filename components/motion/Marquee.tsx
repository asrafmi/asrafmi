'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/motion';
import TechIcon from '@/components/ui/TechIcon';
import { techBrand } from '@/lib/tech';

type Props = { items: string[]; reverse?: boolean; speed?: number; outline?: boolean; icons?: boolean };

// Infinite ticker that speeds up and skews with scroll velocity.
export default function Marquee({ items, reverse = false, speed = 40, outline = false, icons = false }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const track = trackRef.current!;
    const loop = gsap.fromTo(track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: speed, ease: 'none', repeat: -1 });

    const skew = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' });
    ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const v = self.getVelocity();
        gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v) / 250, 6), duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: 'power2.out' });
        skew(gsap.utils.clamp(-8, 8, v / -300));
      },
    });
  }, { scope: rootRef });

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} style={{ display: 'flex', flexShrink: 0 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(24px, 3vw, 48px)', paddingRight: 'clamp(24px, 3vw, 48px)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.28em', ...(outline ? { color: 'transparent', WebkitTextStroke: '1px var(--muted-2)' } : null) }}>
            {icons && <span style={{ color: techBrand(item), display: 'inline-flex' }}><TechIcon name={item} size="0.62em" /></span>}
            {item}
          </span>
          <svg viewBox="0 0 24 24" width="0.42em" height="0.42em" fill="var(--accent-ink)" aria-hidden><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={rootRef}
      style={{
        overflow: 'hidden', whiteSpace: 'nowrap', padding: '18px 0',
        fontSize: 'clamp(40px, 7vw, 104px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1,
      }}
    >
      <div ref={trackRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
