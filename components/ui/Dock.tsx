'use client';

import { useLayoutEffect, useRef } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SECTIONS, SECTION_IDS } from '@/lib/sections';
import { gsap, scrollToSection, useGSAP, onIntroDone, prefersReducedMotion } from '@/lib/motion';

export default function Dock() {
  const activeId = useScrollSpy(SECTION_IDS);
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef(false);

  // Slide the highlight pill to the active button.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!nav || !btn || !pillRef.current) return;
    const move = () => gsap.to(pillRef.current, {
      x: btn.offsetLeft, width: btn.offsetWidth, duration: readyRef.current ? 0.7 : 0, ease: 'expo.out',
    });
    move();
    readyRef.current = true;
    window.addEventListener('resize', move);
    return () => window.removeEventListener('resize', move);
  }, [activeId]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.set(rootRef.current, { yPercent: 160 });
    return onIntroDone(() => gsap.to(rootRef.current, { yPercent: 0, duration: 1.2, delay: 0.9 }));
  }, { scope: rootRef });

  return (
    <div ref={rootRef} style={{ position: 'fixed', bottom: 22, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 60, pointerEvents: 'none' }}>
      <nav
        ref={navRef}
        className="dock-nav"
        aria-label="Sections"
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', padding: 6, pointerEvents: 'auto',
          background: 'var(--glass)', backdropFilter: 'blur(18px) saturate(1.4)', WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
          border: '1px solid var(--border-2)', borderRadius: 100, boxShadow: 'var(--shadow)',
        }}
      >
        <span
          ref={pillRef}
          aria-hidden
          style={{ position: 'absolute', top: 6, bottom: 6, left: 0, width: 0, borderRadius: 100, background: 'var(--text)' }}
        />
        {SECTIONS.map((s, i) => {
          const active = activeId === s.id;
          return (
            <button
              key={s.id}
              data-id={s.id}
              onClick={() => scrollToSection(s.id)}
              className="dock-btn mono"
              aria-label={s.label}
              aria-current={active ? 'true' : undefined}
              style={{
                position: 'relative', height: 38, padding: '0 14px', borderRadius: 100, fontSize: 10.5,
                color: active ? 'var(--bg)' : 'var(--muted)', transition: 'color 0.5s var(--ease)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              <span>{String(i).padStart(2, '0')}</span>
              <span className="dock-label">{s.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
