'use client';

import { useEffect, RefObject } from 'react';

export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  strength = 0.25
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(pointer:fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, strength]);
}
