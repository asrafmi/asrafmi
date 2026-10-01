'use client';

import { useRef, useSyncExternalStore } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Avatar from '@/components/ui/Avatar';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SECTIONS, SECTION_IDS } from '@/lib/sections';
import { gsap, scrollToSection, useGSAP } from '@/lib/motion';

const fmtTime = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};

function Clock() {
  const now = useSyncExternalStore(subscribeClock, fmtTime, () => '--:--:--');
  return <span>{now}</span>;
}

export default function Header() {
  const activeId = useScrollSpy(SECTION_IDS);
  const idx = Math.max(0, SECTIONS.findIndex((s) => s.id === activeId));
  const barRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
    gsap.from(rootRef.current, { yPercent: -120, opacity: 0, duration: 1.2, delay: 0.2 });
  }, { scope: rootRef });

  return (
    <header
      ref={rootRef}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, pointerEvents: 'none' }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: '0 0 -24px 0', zIndex: -1,
        background: 'linear-gradient(var(--bg) 35%, transparent)',
      }} />
      <div
        className="wrap"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76, gap: 20 }}
      >
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
          data-cursor
          style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 12 }}
        >
          <Avatar size={40} zoom={1.7} />
          <span className="mono hud-nav" style={{ color: 'var(--muted)', fontSize: 11 }}>
            Asraf Muhammad
          </span>
        </button>

        <div className="mono hud-nav" style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--muted)', fontSize: 11 }}>
          <span style={{ color: 'var(--accent-ink)' }}>{String(idx).padStart(2, '0')}</span>
          <span style={{ width: 48, height: 1, background: 'var(--border-2)', position: 'relative', overflow: 'hidden' }}>
            <span ref={barRef} style={{ position: 'absolute', inset: 0, background: 'var(--text)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
          </span>
          <span key={activeId} style={{ minWidth: 90, animation: 'fadeIn 0.5s forwards', opacity: 0 }}>
            {SECTIONS[idx].label}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, pointerEvents: 'auto' }}>
          <span className="mono hud-clock" style={{ color: 'var(--muted)', fontSize: 11, display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2.4s infinite' }} />
            JKT <Clock />
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
