'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP, markIntroDone, prefersReducedMotion } from '@/lib/motion';

const SEEN_KEY = 'intro-seen';

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch {}

    const finish = () => {
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
      markIntroDone();
      setGone(true);
    };

    if (prefersReducedMotion()) { finish(); return; }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    if (seen) {
      // Returning visitor in the same session: quick wipe only.
      tl.set('.pl-count, .pl-meta', { opacity: 0 })
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.1)
        .call(markIntroDone, [], 0.45);
      return;
    }

    tl.from('.pl-meta > *', { yPercent: 120, stagger: 0.05, duration: 0.6 })
      .to(counter, {
        v: 100, duration: 0.7, ease: 'power3.inOut',
        onUpdate: () => { if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0'); },
      }, 0)
      .to('.pl-line', { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0)
      .to('.pl-count, .pl-meta > *', { yPercent: -120, stagger: 0.03, duration: 0.35, ease: 'expo.in' }, '+=0')
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, '-=0.15')
      .call(markIntroDone, [], '-=0.55');
  }, { scope: rootRef });

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg-2)', color: 'var(--text)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="mono pl-meta" style={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden', color: 'var(--muted)', fontSize: 11 }}>
        <span>Asraf Muhammad</span>
        <span>Portfolio ©2026</span>
      </div>

      <div>
        <div style={{ overflow: 'hidden' }}>
          <span
            ref={countRef}
            className="pl-count"
            style={{ display: 'block', fontSize: 'clamp(80px, 18vw, 260px)', fontWeight: 600, letterSpacing: '-0.06em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums' }}
          >
            000
          </span>
        </div>
        <div style={{ height: 1, background: 'var(--border)', marginTop: 24, position: 'relative' }}>
          <span className="pl-line" style={{ position: 'absolute', inset: 0, background: 'var(--accent-ink)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </div>
        <div className="mono pl-meta" style={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden', color: 'var(--muted)', fontSize: 11, marginTop: 14 }}>
          <span>Warming things up</span>
          <span>Full stack · AI</span>
        </div>
      </div>
    </div>
  );
}
