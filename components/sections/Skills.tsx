'use client';

import { useRef } from 'react';
import SectionHead from '@/components/motion/SectionHead';
import { useReveal } from '@/hooks/useReveal';
import TechIcon from '@/components/ui/TechIcon';
import { techBrand } from '@/lib/tech';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

const SKILL_CATS = [
  { title: 'Languages', chips: ['JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { title: 'Frontend', chips: ['React.js', 'Next.js', 'Redux', 'Vue.js', 'Vuex', 'Angular', 'React Native'] },
  { title: 'Backend & Data', chips: ['Node.js', 'Express', 'NestJS', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB', 'Elasticsearch'] },
  { title: 'AI, ML & DevOps', chips: ['Machine Learning', 'NLP', 'Web Scraping', 'Docker', 'Kubernetes', 'CI/CD', 'Git'] },
];

const AWARDS = [
  '<strong>High Achiever (1 of 13)</strong> at CV. Solusi Teknologi Kreatif, late 2025',
  '<strong>Productzilla Talent Pool Awardee</strong>, fast tracked straight to partner companies (2022)',
  '<strong>Sidoarjo District Scholarship</strong>, one of 800+ awardees (2022)',
  '<strong>2nd Best Student</strong> at the PKS Digital School Data Science Bootcamp',
];

const LANGS = [
  { lang: 'Bahasa Indonesia', level: 'Native', pct: 1 },
  { lang: 'English', level: 'Comfy at work', pct: 0.78 },
];

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>('.skill-row').forEach((row) => {
      gsap.from(row.querySelectorAll('.chip'), {
        y: 24, opacity: 0, stagger: 0.04, duration: 0.9,
        scrollTrigger: { trigger: row, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>('.lang-fill').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: Number(el.dataset.pct), duration: 1.8, ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }, { scope: rootRef });

  return (
    <section id="skills" ref={rootRef} className="section">
      <div className="wrap">
        <SectionHead idx="04" label="Toolkit" title={<>Skills &amp; stack.</>} />

        <div className="skills-grid">
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            {SKILL_CATS.map((cat, i) => (
              <div key={cat.title} className="skill-row">
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', paddingTop: 7, display: 'flex', gap: 12 }}>
                  <span style={{ color: 'var(--accent-ink)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cat.chips.map((chip) => (
                    <span
                      key={chip}
                      className="chip skill-chip"
                      style={{
                        fontFamily: 'var(--ff-sans)', fontSize: 14.5, padding: '8px 16px 8px 12px', gap: 9,
                        color: 'var(--text)', letterSpacing: '-0.01em',
                        ['--brand' as string]: techBrand(chip),
                      }}
                    >
                      <TechIcon name={chip} size={16} />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mono" data-reveal style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 22 }}>Languages I speak</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {LANGS.map((l) => (
                <div key={l.lang} data-reveal>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>{l.lang}</span>
                    <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{l.level}</span>
                  </div>
                  <div style={{ height: 2, background: 'var(--border)', position: 'relative' }}>
                    <span className="lang-fill" data-pct={l.pct} style={{ position: 'absolute', inset: 0, background: 'var(--accent-ink)', transformOrigin: 'left', transform: `scaleX(${l.pct})` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mono" data-reveal style={{ fontSize: 11, color: 'var(--muted-2)', margin: '56px 0 10px' }}>Wins</div>
            <ol style={{ listStyle: 'none' }}>
              {AWARDS.map((award, i) => (
                <li key={award} data-reveal className="muted" style={{ display: 'flex', gap: 16, fontSize: 15, lineHeight: 1.55, padding: '16px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span dangerouslySetInnerHTML={{ __html: award }} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <style>{`
        .skill-chip .tech-icon { color: var(--muted); transition: color 0.35s var(--ease), transform 0.5s var(--ease); }
        .skill-chip:hover { border-color: var(--border-2) !important; background: var(--surface-2); }
        .skill-chip:hover .tech-icon { color: var(--brand); transform: scale(1.15) rotate(-6deg); }
      `}</style>
    </section>
  );
}
