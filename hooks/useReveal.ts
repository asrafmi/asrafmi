'use client';

import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => observer.observe(el));

    // Fallback: snap in-view content if transitions can't run
    const settle = setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.style.transition = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.classList.add('in');
        }
      });
    }, 1300);

    return () => {
      observer.disconnect();
      clearTimeout(settle);
    };
  }, []);
}
