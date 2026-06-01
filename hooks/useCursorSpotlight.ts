'use client';

import { useEffect } from 'react';

export function useCursorSpotlight() {
  useEffect(() => {
    const fine = matchMedia('(pointer:fine)').matches;
    if (!fine) return;

    const root = document.documentElement;
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let tmx = mx;
    let tmy = my;
    let raf: number;

    const onMove = (e: PointerEvent) => {
      tmx = e.clientX;
      tmy = e.clientY;
    };

    const loop = () => {
      mx += (tmx - mx) * 0.12;
      my += (tmy - my) * 0.12;
      root.style.setProperty('--mx', `${mx}px`);
      root.style.setProperty('--my', `${my}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
