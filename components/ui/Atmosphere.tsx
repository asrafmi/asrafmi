'use client';

import { useEffect, useRef } from 'react';
import { useCursorSpotlight } from '@/hooks/useCursorSpotlight';

export default function Atmosphere() {
  useCursorSpotlight();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const N = innerWidth < 640 ? 14 : 30;

    for (let i = 0; i < N; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const dur = 14 + Math.random() * 22;
      const size = Math.random() < 0.25 ? 3 : 1.5;
      p.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:rgba(255,255,255,0.35);
        animation:rise ${dur}s linear infinite;
        left:${Math.random() * 100}vw;
        bottom:-${Math.random() * 20}vh;
        animation-delay:-${Math.random() * dur}s;
        opacity:${0.2 + Math.random() * 0.4};
      `;
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: '-2px',
          zIndex: -2,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%)',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%)',
          animation: 'gridDrift 30s linear infinite',
        }}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: -2,
          pointerEvents: 'none',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,163,26,0.10), transparent 65%)',
          top: '-22vw',
          left: '30vw',
          filter: 'blur(20px)',
          animation: 'floatGlow 18s cubic-bezier(0.16,1,0.3,1) infinite alternate',
        }}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(245,163,26,0.07), transparent 60%)',
          transition: 'opacity 0.4s ease',
        }}
      />
      <div ref={particlesRef} style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none' }} />
    </>
  );
}
