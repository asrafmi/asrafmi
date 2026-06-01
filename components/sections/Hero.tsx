'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const TYPED_WORDS = ['AI solutions', 'web apps', 'scalable systems', 'clean code', 'real-time tools'];

function TypedText() {
  const [text, setText] = useState('');
  const stateRef = useRef({ wi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { wi, ci, deleting } = stateRef.current;
      const word = TYPED_WORDS[wi];

      if (!deleting) {
        const nextCi = ci + 1;
        if (nextCi > word.length) {
          stateRef.current = { wi, ci: nextCi, deleting: true };
          timeout = setTimeout(tick, 1500);
          return;
        }
        stateRef.current = { wi, ci: nextCi, deleting: false };
        setText(word.slice(0, nextCi));
        timeout = setTimeout(tick, 85);
      } else {
        const nextCi = ci - 1;
        if (nextCi === 0) {
          stateRef.current = { wi: (wi + 1) % TYPED_WORDS.length, ci: 0, deleting: false };
        } else {
          stateRef.current = { wi, ci: nextCi, deleting: true };
        }
        setText(word.slice(0, nextCi));
        timeout = setTimeout(tick, 45);
      }
    };

    timeout = setTimeout(tick, 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      color: 'var(--text)',
      background: 'var(--surface-2)',
      border: '1px solid var(--border-2)',
      padding: '4px 16px',
      borderRadius: 12,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontWeight: 600 }}>{text}</span>
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '1.1em',
        background: 'var(--accent)',
        marginLeft: 3,
        verticalAlign: 'middle',
        animation: 'blink 1s steps(1) infinite',
      }} />
    </span>
  );
}

function PhotoCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card || !matchMedia('(pointer:fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`;
    };
    const onLeave = () => { card.style.transform = ''; };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ perspective: 1200 }}>
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          border: '1px solid var(--border-2)',
          aspectRatio: '4 / 4.4',
          background: 'var(--bg-2)',
          boxShadow: '0 40px 80px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'transform 0.3s var(--ease)',
          transformStyle: 'preserve-3d',
        }}
      >
        <span style={{
          position: 'absolute', top: 16, right: 16, zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,10,12,0.7)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-2)', borderRadius: 100,
          padding: '7px 13px', fontSize: 12.5, fontWeight: 500, fontFamily: 'var(--ff-mono)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2.4s infinite' }} />
          Online
        </span>
        <Image
          src="/assets/asraf.jpeg"
          alt="Muhammad Asraf"
          fill
          style={{ objectFit: 'cover', objectPosition: '50% 22%', filter: 'grayscale(0.15) contrast(1.04)' }}
          priority
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }} />
        <span style={{
          position: 'absolute', left: 16, bottom: 16, zIndex: 2,
          fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase',
        }}>
          Asraf · 2026
        </span>
      </div>
    </div>
  );
}

function LinkBtn({ href, children, style }: { href: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagneticEffect(ref);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '12px 20px',
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        fontSize: 14.5,
        fontWeight: 500,
        color: 'var(--text)',
        transition: 'border-color 0.4s var(--ease), background 0.4s var(--ease)',
        textDecoration: 'none',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </a>
  );
}

export default function Hero({ onChatOpen }: { onChatOpen?: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setTimeout(() => setLoaded(true), 80));
    const t2 = setTimeout(() => setLoaded(true), 500);
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 90,
        paddingBottom: 150,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 70, alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div>
            <div className="reveal" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.12em',
              color: 'var(--muted)', padding: '7px 14px',
              border: '1px solid var(--border)', borderRadius: 100,
              background: 'var(--surface)', marginBottom: 30,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2.4s infinite' }} />
              Available for new opportunities
            </div>

            <h1 style={{ fontSize: 'clamp(46px, 7.2vw, 92px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95, marginBottom: 22 }}>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'inline-block', transform: loaded ? 'none' : 'translateY(110%)', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
                  Muhammad
                </span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span style={{
                  display: 'inline-block',
                  transform: loaded ? 'none' : 'translateY(110%)',
                  transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s',
                  background: 'linear-gradient(180deg, #fff 30%, #9a9aa0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>
                  Asraf
                </span>
              </span>
            </h1>

            <div className="reveal" data-delay="1" style={{
              fontSize: 'clamp(20px, 2.6vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em',
              color: 'var(--muted)', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            }}>
              <span>I build</span>
              <TypedText />
            </div>

            <p className="reveal" data-delay="2" style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 480, marginBottom: 36, lineHeight: 1.7 }}>
              Programmer &amp; technology enthusiast with <strong style={{ color: 'var(--text)', fontWeight: 600 }}>3.5+ years</strong> across the
              JavaScript ecosystem — <strong style={{ color: 'var(--text)', fontWeight: 600 }}>React, Next.js, Node.js</strong> &amp; NestJS.
              I lead small teams, ship scalable full-stack products, and chase ideas that affect life positively.
            </p>

            <div className="reveal" data-delay="3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 34 }}>
              <LinkBtn href="https://github.com/asrafmi">
                <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
                GitHub
              </LinkBtn>
              <LinkBtn href="https://linkedin.com/in/asrafmi">
                <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
                LinkedIn
              </LinkBtn>
              <LinkBtn href="mailto:asraf.muhammad07@gmail.com">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                Email
              </LinkBtn>
            </div>

            <div className="reveal" data-delay="4" style={{ display: 'flex', flexWrap: 'wrap', gap: 22, fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--ff-mono)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={15} height={15} style={{ color: 'var(--muted-2)' }}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                Indonesia
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={15} height={15} style={{ color: 'var(--muted-2)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +62 822 4510 1283
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--green)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={15} height={15}><path d="M20 6 9 17l-5-5"/></svg>
                Open to work
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="reveal" data-delay="2">
            <PhotoCard />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--muted-2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        opacity: 0, animation: 'fadeIn 1s 1.4s forwards',
      }}>
        <span>Scroll</span>
        <span style={{ width: 1, height: 34, background: 'linear-gradient(var(--muted-2), transparent)', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: '-50%', left: 0, width: '100%', height: '50%', background: 'var(--accent)', animation: 'scrollDot 1.8s cubic-bezier(0.22,1,0.36,1) infinite' }} />
        </span>
      </div>
    </section>
  );
}
