'use client';

import { useRef } from 'react';
import LogoTile from '@/components/ui/LogoTile';
import SectionHead from '@/components/motion/SectionHead';
import { useReveal } from '@/hooks/useReveal';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/motion';

const STATS = [
  { num: 4, label: 'Years shipping' },
  { num: 50, label: 'Tech I work with' },
  { num: 8, label: 'Engineers led' },
  { num: 5, label: 'Companies' },
];

const BOOTCAMPS = [
  { name: 'AI Engineering Bootcamp', by: 'Ruby Thalib', when: '2026', note: 'Final project 95/100: a multitenant RAG API' },
  { name: 'Backend Engineer', by: 'Productzilla Academy', when: '2023', note: 'Node.js, MongoDB, async programming' },
  { name: 'Data Science', by: 'PKS Digital School', when: '2022', note: 'Python data analysis, scored 92 and 90' },
  { name: 'Fullstack Web Development', by: 'PKS Digital School', when: '2021', note: 'Laravel CRUD apps' },
];

const EDUCATION = [
  { school: 'Binus Online University', deg: 'Information Systems, Bachelor (still going)', gpa: '3.92', logo: '/assets/edu/binus.webp', w: 320, h: 190 },
  { school: 'Telkom University', deg: 'Information Systems, Diploma 3 · Cum laude', gpa: '3.90', logo: '/assets/edu/telkom.webp', w: 295, h: 360 },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Statement lights up word by word as it crosses the viewport.
    SplitText.create('.about-statement', {
      type: 'words',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: '.about-statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }),
    });

    gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
      const target = Number(el.dataset.value);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)).padStart(2, '0'); },
      });
    });

    gsap.from('.edu-rule', {
      scaleX: 0, stagger: 0.15, duration: 1.4, ease: 'expo.inOut',
      scrollTrigger: { trigger: '.edu-list', start: 'top 85%', once: true },
    });
  }, { scope: rootRef });

  return (
    <section id="about" ref={rootRef} className="section">
      <div className="wrap">
        <SectionHead idx="01" label="About" title="Curious by default." />

        <p
          className="about-statement"
          style={{ fontSize: 'clamp(24px, 3.3vw, 46px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: 1100, marginBottom: 'clamp(64px, 9vw, 120px)' }}
        >
          I&apos;m a programmer who mostly lives in the JavaScript world. React and Next.js on the front,
          NestJS, Node and some Go on the back. Started out just building features, now I lead small teams
          and own products end to end, from the database to the UI to the deploy.
        </p>

        <div className="about-stats" style={{ marginBottom: 'clamp(64px, 9vw, 120px)' }}>
          {STATS.map((s) => (
            <div key={s.label} data-reveal style={{ padding: '28px clamp(16px, 2vw, 28px) 0' }}>
              <div style={{ fontSize: 'clamp(56px, 7vw, 104px)', fontWeight: 600, letterSpacing: '-0.06em', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>
                <span className="stat-num" data-value={s.num}>{String(s.num).padStart(2, '0')}</span>
                <span style={{ color: 'var(--accent-ink)' }}>+</span>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 16 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="about-lower">
          <p data-reveal className="muted" style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 520 }}>
            I care about clean code, real impact, and building stuff people actually use. Think a{' '}
            <strong>54% Lighthouse jump</strong> on a national logistics platform, or map dashboards for the{' '}
            <strong>Indonesian Ministry of Home Affairs</strong>. New ideas and new tech keep me going, and if
            it makes someone&apos;s day a little easier, that&apos;s a win.
          </p>

          <div className="edu-list">
            <div className="mono" data-reveal style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 18 }}>Education</div>
            {EDUCATION.map((edu) => (
              <div key={edu.school} data-reveal>
                <div className="edu-rule" style={{ height: 1, background: 'var(--border-2)', transformOrigin: 'left' }} />
                <div style={{ display: 'flex', gap: 18, padding: '22px 0', alignItems: 'center' }}>
                  <LogoTile logo={{ src: edu.logo, w: edu.w, h: edu.h }} alt={`${edu.school} logo`} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 18, letterSpacing: '-0.01em' }}>{edu.school}</div>
                    <div className="muted" style={{ fontSize: 14, marginTop: 4 }}>{edu.deg}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                    <span style={{ color: 'var(--accent-ink)' }}>{edu.gpa}</span>
                    <span style={{ color: 'var(--muted-2)' }}> / 4.0</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mono" data-reveal style={{ fontSize: 11, color: 'var(--muted-2)', margin: '40px 0 6px' }}>Bootcamps</div>
            {BOOTCAMPS.map((b) => (
              <div key={b.name} data-reveal style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '14px 0', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 500 }}>{b.name} <span className="muted" style={{ fontWeight: 400 }}>· {b.by}</span></div>
                  <div className="muted" style={{ fontSize: 13.5, marginTop: 3 }}>{b.note}</div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', paddingTop: 4 }}>{b.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
