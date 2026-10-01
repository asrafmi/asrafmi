'use client';

import { useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/motion';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  by?: 'lines' | 'words' | 'chars';
  delay?: number;
  stagger?: number;
};

// Masked text reveal triggered when the element scrolls into view.
export default function SplitReveal({ as = 'div', children, className, style, by = 'lines', delay = 0, stagger }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    SplitText.create(el, {
      type: by === 'lines' ? 'lines' : `lines,${by}`,
      mask: 'lines',
      linesClass: 'line-mask-inner',
      autoSplit: true,
      onSplit(self) {
        const targets = by === 'lines' ? self.lines : by === 'words' ? self.words : self.chars;
        return gsap.from(targets, {
          yPercent: 115,
          rotate: by === 'chars' ? 6 : 0,
          stagger: stagger ?? (by === 'chars' ? 0.018 : by === 'words' ? 0.04 : 0.09),
          duration: 1.2,
          delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  }, { scope: ref });

  const Tag = as;
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}
