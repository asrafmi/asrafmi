'use client';

import { useRef } from 'react';
import SignalField from '@/components/motion/SignalField';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { gsap, SplitText, useGSAP, onIntroDone, prefersReducedMotion, scrollToSection } from '@/lib/motion';

const WORDS = ['AI products', 'web apps', 'systems that scale', 'clean code', 'realtime tools'];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
);
const CvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
);

function MagneticLink({ href, children, accent }: { href: string; children: React.ReactNode; accent?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagneticEffect(ref, 0.3);
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener" className={`btn${accent ? ' btn-accent' : ''}`} style={{ height: 44, padding: '0 18px', fontSize: 14 }}>
      {children}
    </a>
  );
}

function Badge() {
  const text = 'Open to work • Full stack • AI products • ';
  return (
    <button
      className="hero-badge"
      onClick={() => scrollToSection('about')}
      aria-label="Scroll to about"
      style={{ position: 'relative', width: 'clamp(84px, 9vw, 132px)', aspectRatio: '1', flexShrink: 0, color: 'var(--text)' }}
    >
      <span className="badge-spin" style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ animation: 'spin 18s linear infinite' }}>
        <defs><path id="badge-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" /></defs>
        <text style={{ fontFamily: 'var(--ff-mono)', fontSize: 8.4, letterSpacing: '0.18em', textTransform: 'uppercase', fill: 'var(--muted)' }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      </span>
      <span style={{
        position: 'absolute', inset: '30%', borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)',
        display: 'grid', placeItems: 'center',
      }}>
        <svg viewBox="0 0 24 24" width="40%" height="40%" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
      </span>
    </button>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP((_ctx, contextSafe) => {
    const reduced = prefersReducedMotion();

    // Rotating word slot — a column of words stepped upward forever.
    const col = rootRef.current!.querySelector<HTMLElement>('.word-col');
    if (col && !reduced) {
      const n = WORDS.length;
      const tl = gsap.timeline({ repeat: -1, delay: 2.4 });
      for (let i = 1; i <= n; i++) {
        tl.to(col, { yPercent: (-100 * i) / (n + 1), duration: 0.9, ease: 'expo.inOut' }, '+=1.5');
      }
      tl.set(col, { yPercent: 0 });
    }

    if (reduced) return;

    const q = gsap.utils.selector(rootRef);
    const split = SplitText.create(q('.hero-line'), { type: 'chars', mask: 'chars' });
    gsap.set(split.chars, { yPercent: 110 });
    gsap.set(q('.hero-badge'), { scale: 0, rotate: -90 });
    gsap.set(q('.hero-fade'), { y: 30, opacity: 0 });
    gsap.set(q('.hero-rule'), { scaleX: 0 });

    let played = false;
    const play = contextSafe!(() => {
      if (played) return;
      played = true;
      gsap.timeline()
        .to(split.chars, { yPercent: 0, stagger: 0.035, duration: 1.4, ease: 'expo.out' })
        .to(q('.hero-badge'), { scale: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.6)' }, 0.5)
        .to(q('.hero-rule'), { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.4)
        .to(q('.hero-fade'), { y: 0, opacity: 1, stagger: 0.07, duration: 1.2 }, 0.6);
    });
    const stop = onIntroDone(play);
    // Never leave the hero hidden if the preloader signal is missed.
    const fallback = gsap.delayedCall(4, play);

    // Scroll-out: lines drift apart, canvas sinks, content fades.
    const out = gsap.timeline({
      scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    out.to('.hero-l1', { xPercent: -10, ease: 'none' }, 0)
      .to('.hero-l2', { xPercent: 8, ease: 'none' }, 0)
      .to('.hero-signal', { yPercent: 30, opacity: 0.2, ease: 'none' }, 0)
      .to('.badge-spin', { rotate: 220, ease: 'none' }, 0)
      .to('.hero-bottom', { y: -60, opacity: 0, ease: 'none' }, 0);

    return () => { stop(); fallback.kill(); };
  }, { scope: rootRef });

  return (
    <section
      id="home"
      ref={rootRef}
      style={{
        position: 'relative', minHeight: 'min(100svh, 1400px)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        paddingTop: 110, paddingBottom: 'clamp(90px, 9vw, 120px)',
      }}
    >
      <div
        className="hero-signal"
        style={{
          position: 'absolute', inset: 0, zIndex: -1,
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 70%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 70%, transparent 100%)',
        }}
      >
        <SignalField />
      </div>

      <div className="wrap" style={{ width: '100%' }}>
        <div className="mono hero-fade" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', color: 'var(--muted)', fontSize: 11, marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <span>( Portfolio ©2026 )</span>
          <span>Full stack engineer &amp; AI builder</span>
          <span>6.2088° S, 106.8456° E</span>
        </div>

        <h1 className="display" style={{ fontSize: 'clamp(56px, 13.4vw, 210px)', marginBottom: 'clamp(28px, 4vw, 56px)' }}>
          <span className="hero-l1" style={{ display: 'flex', alignItems: 'center', gap: '0.12em' }}>
            <span className="hero-line">Asraf</span>
            <span style={{ flex: 1 }} />
            <Badge />
          </span>
          <span className="hero-l2" style={{ display: 'block', textAlign: 'right' }}>
            <span className="hero-line" style={{ color: 'var(--muted-2)' }}>Muhammad</span>
          </span>
        </h1>

        <div className="hero-rule" style={{ height: 1, background: 'var(--border-2)', transformOrigin: 'left', marginBottom: 32 }} />

        <div className="hero-bottom">
          <div className="hero-fade" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.15, whiteSpace: 'nowrap' }}>
            <span className="muted">I build</span>{' '}
            <span style={{ display: 'inline-block', height: '1.15em', overflow: 'hidden', verticalAlign: 'top' }}>
              <span className="word-col" style={{ display: 'flex', flexDirection: 'column', color: 'var(--accent-ink)' }}>
                {[...WORDS, WORDS[0]].map((w, i) => (
                  <span key={i} style={{ height: '1.15em', whiteSpace: 'nowrap' }}>{w}</span>
                ))}
              </span>
            </span>
          </div>

          <p className="hero-fade muted" style={{ fontSize: 15.5, lineHeight: 1.7, maxWidth: 480 }}>
            Full stack engineer, <strong>4+ years</strong> in. I pulled off a <strong>54% speed boost</strong> on a
            national logistics platform and built map dashboards the Ministry of Home Affairs actually uses.
            These days I lead dev teams and own features from database to deploy.
          </p>

          <div className="hero-fade" style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <MagneticLink href="https://github.com/asrafmi"><GithubIcon /> GitHub</MagneticLink>
              <MagneticLink href="https://linkedin.com/in/asrafmi"><LinkedinIcon /> LinkedIn</MagneticLink>
              <MagneticLink href="/cv"><CvIcon /> View CV</MagneticLink>
              <MagneticLink href="mailto:asraf.muhammad07@gmail.com" accent><MailIcon /> Email</MagneticLink>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 11, color: 'var(--muted)' }}>
              <span>Indonesia</span>
              <a href="tel:+6282245101283" className="ulink">+62 822 4510 1283</a>
              <span style={{ color: 'var(--live)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--live)', animation: 'pulse 2.4s infinite' }} />
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
