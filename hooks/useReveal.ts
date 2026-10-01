'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/motion';

// Fades/lifts every [data-reveal] inside `scope` as it enters the viewport,
// batching neighbours so they stagger together.
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    if (!els.length) return;
    gsap.set(els, { y: 48, opacity: 0 });
    ScrollTrigger.batch(els, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, stagger: 0.09, duration: 1.2, overwrite: true }),
    });
  }, { scope });
}
