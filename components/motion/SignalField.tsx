'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

// Canvas "motion graph": layered waveforms drifting like an oscilloscope,
// bending slightly toward the pointer. Colours come from the theme tokens.
export default function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    let rgb = '255, 255, 255';
    let accent = '#7d97ff';
    let px = 0.5, py = 0.5, tpx = 0.5, tpy = 0.5;
    let visible = true;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb = cs.getPropertyValue('--signal').trim() || rgb;
      accent = cs.getPropertyValue('--accent-ink').trim() || accent;
    };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const LINES = 14;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;
      const step = Math.max(6, w / 180);

      for (let i = 0; i < LINES; i++) {
        const k = i / (LINES - 1);
        const baseY = h * (0.22 + k * 0.62);
        const amp = h * (0.025 + 0.05 * Math.sin(k * Math.PI));
        const freq = 0.0035 + k * 0.0012;
        const speed = 0.6 + k * 0.5;
        const hl = i === Math.round(LINES * 0.62);

        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const dx = x / w - px;
          const pull = Math.exp(-(dx * dx) / 0.02) * (py - 0.5) * h * 0.18 * (1 - Math.abs(k - 0.5));
          const y = baseY
            + Math.sin(x * freq + t * speed + i * 0.7) * amp
            + Math.sin(x * freq * 2.3 - t * speed * 0.6 + i) * amp * 0.35
            + pull;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hl ? accent : `rgba(${rgb}, ${0.05 + 0.1 * Math.sin(k * Math.PI)})`;
        ctx.lineWidth = hl ? 1.25 : 1;
        ctx.stroke();
      }
      t += 0.008;
    };

    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 32) return;
      last = now;
      draw();
    };

    readColors(); resize();
    if (reduced) draw(); else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => { tpx = e.clientX / innerWidth; tpy = e.clientY / innerHeight; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const mo = new MutationObserver(() => { readColors(); if (reduced) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(); });
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); mo.disconnect(); ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
