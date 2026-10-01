'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';

const HOVER_SELECTOR = 'a, button, [data-cursor]';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { x: innerWidth / 2, y: innerHeight / 2, opacity: 0 });

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) { gsap.to([dot, ring], { opacity: 1, duration: 0.4 }); shown = true; }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const hovering = (e.target as Element | null)?.closest?.(HOVER_SELECTOR);
      ring.classList.toggle('is-hover', !!hovering);
    };
    const onLeave = () => { gsap.to([dot, ring], { opacity: 0, duration: 0.3 }); shown = false; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
