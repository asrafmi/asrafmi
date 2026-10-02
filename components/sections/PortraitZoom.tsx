'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/motion';

// Pinned scene between the hero and About: a small portrait window opens up
// into a near full screen frame as you scroll. The photo sits on black and is
// shown at full height (object-fit: contain) so it never gets upscaled into mush;
// its black backdrop blends into the frame.
export default function PortraitZoom() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px)',
      },
      (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;

        // Start as a portrait window in the middle of the frame.
        const start = mobile ? 'inset(24% 18% 24% 18% round 20px)' : 'inset(20% 37% 20% 37% round 24px)';

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=160%',
            pin: '.pz-stage',
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl.fromTo('.pz-frame', { clipPath: start }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, 0)
          .fromTo('.pz-img', { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
          .fromTo('.pz-left', { xPercent: 0, opacity: 1 }, { xPercent: -60, opacity: 0, duration: 0.6 }, 0)
          .fromTo('.pz-right', { xPercent: 0, opacity: 1 }, { xPercent: 60, opacity: 0, duration: 0.6 }, 0)
          .fromTo('.pz-cap > *', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.3 }, 0.75)
          .to({}, { duration: 0.25 }); // short hold at full size before releasing the pin
      },
    );
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-label="Portrait" style={{ position: 'relative' }}>
      <div className="pz-stage" style={{ position: 'relative', height: 'min(100svh, 1400px)', overflow: 'hidden', padding: 'clamp(12px, 1.6vw, 20px)' }}>
        <div
          className="pz-frame"
          style={{ position: 'relative', width: '100%', height: '100%', background: '#000', borderRadius: 'clamp(16px, 2vw, 28px)', overflow: 'hidden' }}
        >
          {/* Portrait column at full frame height; slightly over-scaled from the
              top so the source photo's corner watermark stays out of view. */}
          <div
            className="pz-img"
            style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', aspectRatio: '864 / 1184', translate: '-50% 0', transformOrigin: '50% 40%' }}
          >
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <Image
                src="/assets/asraf.webp"
                alt="Portrait of Asraf Muhammad"
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                style={{ objectFit: 'cover', objectPosition: '50% 0%', transform: 'scale(1.12)', transformOrigin: '50% 35%' }}
              />
            </div>
          </div>

          <div
            aria-hidden
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.65))', pointerEvents: 'none' }}
          />

          <div
            className="pz-cap"
            style={{
              position: 'absolute', left: 'clamp(20px, 3vw, 44px)', right: 'clamp(20px, 3vw, 44px)', bottom: 'clamp(20px, 3vw, 40px)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', color: '#f2f2f0', overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 'clamp(30px, 5vw, 76px)', fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1 }}>
              That&apos;s me. Hi!
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'rgba(242,242,240,0.7)' }}>
              Asraf M. Izzuddin · Jakarta, ID
            </span>
          </div>
        </div>

        {/* Words flanking the small window; they slide away as it opens. */}
        <div
          aria-hidden
          className="pz-words"
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 var(--gutter)', pointerEvents: 'none',
            fontSize: 'clamp(28px, 3.6vw, 60px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1,
          }}
        >
          <span className="pz-left">The human</span>
          <span className="pz-right" style={{ color: 'var(--muted-2)' }}>behind the code</span>
        </div>
      </div>
    </section>
  );
}
