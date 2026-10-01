'use client';

import { useRef } from 'react';
import SplitReveal from '@/components/motion/SplitReveal';
import { useReveal } from '@/hooks/useReveal';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

type Props = { onChatOpen?: () => void };

export default function Contact({ onChatOpen }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLButtonElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);
  useReveal(rootRef);
  useMagneticEffect(chatRef, 0.3);
  useMagneticEffect(mailRef, 0.3);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.contact-orb', {
      scale: 0.4, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'center center', scrub: true },
    });
  }, { scope: rootRef });

  return (
    <section id="contact" ref={rootRef} className="section" style={{ overflow: 'hidden', paddingBottom: 'clamp(140px, 16vw, 220px)' }}>
      <div
        className="contact-orb"
        aria-hidden
        style={{
          position: 'absolute', left: '50%', top: '50%', width: 'min(90vw, 900px)', aspectRatio: '1', zIndex: -1,
          translate: '-50% -50%', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-soft), transparent 62%)',
        }}
      />
      <div className="wrap" style={{ textAlign: 'center' }}>
        <div className="label" data-reveal style={{ justifyContent: 'center', marginBottom: 36 }}>
          <span className="idx">(06)</span>
          <span className="bar" />
          <span>Contact</span>
        </div>

        <SplitReveal
          as="h2"
          by="chars"
          className="display"
          style={{ fontSize: 'clamp(48px, 10vw, 168px)', marginBottom: 40 }}
        >
          Got an idea? <span style={{ color: 'var(--accent-ink)' }}>Let&apos;s build it.</span>
        </SplitReveal>

        <p data-reveal className="muted" style={{ fontSize: 17, maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.65 }}>
          Open to full stack and AI roles, freelance gigs, or just a fun collab.
          Fastest way to get to know me? Just ask my AI twin.
        </p>

        <div data-reveal style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <button ref={chatRef} onClick={onChatOpen} className="btn btn-accent" style={{ height: 54, padding: '0 26px', fontSize: 15 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width={17} height={17}>
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
            </svg>
            Chat with my AI twin
          </button>
          <a ref={mailRef} href="mailto:asraf.muhammad07@gmail.com" className="btn" style={{ height: 54, padding: '0 26px', fontSize: 15 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Send an email
          </a>
          <a href="/cv" target="_blank" rel="noopener" className="btn" style={{ height: 54, padding: '0 26px', fontSize: 15 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}>
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h4" />
            </svg>
            View my CV
          </a>
        </div>

        <a data-reveal href="mailto:asraf.muhammad07@gmail.com" className="ulink" style={{ fontSize: 'clamp(18px, 2.4vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em' }}>
          asraf.muhammad07@gmail.com
        </a>
      </div>
    </section>
  );
}
