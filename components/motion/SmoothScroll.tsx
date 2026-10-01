'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion, setLenis } from '@/lib/motion';

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts change layout after mount.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('load', refresh);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
