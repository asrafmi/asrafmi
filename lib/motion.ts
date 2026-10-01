'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Single Lenis instance shared by navigation helpers.
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };

export function scrollToSection(id: string) {
  const target = id === 'home' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, offset: 0 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fired by the preloader so the hero can start its entrance.
export const INTRO_EVENT = 'intro:done';
export function onIntroDone(cb: () => void) {
  if ((window as unknown as { __introDone?: boolean }).__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}
export function markIntroDone() {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}
