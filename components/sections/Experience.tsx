'use client';

import { useRef, useState } from 'react';
import SectionHead from '@/components/motion/SectionHead';
import { useReveal } from '@/hooks/useReveal';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/motion';

const EXPERIENCES = [
  {
    role: 'Technical Leader',
    date: 'Jan 2022 to now',
    company: 'CV. Solusi Teknologi Kreatif (STK)',
    place: '· Jakarta, Indonesia',
    items: [
      'Led a squad of <strong>8 engineers</strong> building <strong>Satria Muda Indonesia</strong>, a realtime scoring, event and asset management platform (Next, Nest, PostgreSQL, Socket.io).',
      'Led <strong>4 engineers</strong> on <strong>Hemdal</strong>, a B2B media monitoring SaaS with realtime listening, AI sentiment analysis and Elasticsearch search (Next, Nest, MySQL).',
      'Led <strong>4 engineers</strong> on a <strong>Smart Room Booking</strong> system for DPR RI (Next, Nest, Socket.io, MySQL).',
      'Tuned SSR and performance on <strong>Lion Parcel</strong> for <strong>+54.2%</strong> Lighthouse performance and <strong>+9.89%</strong> SEO (Node, Express, Vue).',
      'Built a Telegram bot that keeps an eye on our systems (Python) and a face recognition attendance app (React, NestJS). Set up CI/CD with Drone.io, Gitea Actions, Docker and Kubernetes.',
      'Got picked as <strong>High Achiever (1 of 13)</strong> at STK in late 2025 for pushing initiatives way past my job scope.',
    ],
  },
  {
    role: 'Full Stack Developer',
    date: 'Jan 2025 to Dec 2025',
    company: 'Ministry of Home Affairs · SIPD',
    place: '· Jakarta · Project based',
    items: [
      'Built <strong>geospatial maps</strong> for national priority programs (MBG, 3M Free Housing, Zero Tax), rolled out to <strong>500+ regional governments</strong> with React Leaflet.',
      'Built interactive policy monitoring dashboards for people at the minister level (React, Tailwind, Chakra UI).',
      'Owned the whole data flow, from PostgreSQL queries and backend prep all the way to the charts on screen.',
      'Helped ship a helpdesk app used by 500+ regional governments, running on Docker Compose on premise.',
    ],
  },
  {
    role: 'Full Stack Developer',
    roleSub: '· FE heavy',
    date: 'Aug 2022 to Dec 2024',
    company: 'PT. Telkom Indonesia · Apilogy.id',
    place: '· Bandung · Project based',
    items: [
      'Shipped a brand new homepage straight from the UI/UX prototype (React, Next, Tailwind).',
      'Rebuilt user management and pushed <strong>SUS up 81.9%</strong>, content up 30% and visual impression up 53% (Vue, Webpack).',
      'Fixed 5+ pentest security issues, wrote 15+ unit and 5+ integration tests (Jest, Cypress), and ran CI/CD on Jenkins and Drone.',
    ],
  },
  {
    role: 'Full Stack Developer',
    roleSub: '· FE heavy',
    date: 'Aug 2022 to Apr 2024',
    company: 'PT. Produkzilla Akademi · Productzilla',
    place: '· Bandung · Part time',
    items: [
      'Built the backend for an <strong>online election app</strong> (NestJS, TS), plus the web app (React, Next, React Query) and a <strong>React Native</strong> mobile app.',
      'Reworked the user management UX and got <strong>SUS up 90.5%</strong>, content up 36.4% and visual impression up 59.6%.',
      'Mentored 5+ students in a short React class and containerized services with Docker Compose.',
    ],
  },
  {
    role: 'Full Stack Developer',
    roleSub: '· FE heavy',
    date: 'Apr 2024 to Jul 2024',
    company: 'PT. Solusi Kebutuhan Teknologi',
    place: '· Remote · Contract',
    items: [
      'Shipped 3+ new features and leveled up 15+ existing ones on a <strong>Warehouse Management System</strong> (Angular, Express, MongoDB) for web and mobile.',
    ],
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveal(rootRef);

  useGSAP(() => {
    // Measure live on every scroll so late layout shifts (fonts, images)
    // can never desync the counter from the item actually in view.
    const items = gsap.utils.toArray<HTMLElement>('.exp-item');
    const update = () => {
      const line = innerHeight * 0.6;
      let idx = 0;
      items.forEach((el, i) => { if (el.getBoundingClientRect().top <= line) idx = i; });
      setActive(idx);
    };
    ScrollTrigger.create({ trigger: '.exp-list', start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: update });
    update();

    if (prefersReducedMotion()) return;

    gsap.fromTo('.exp-progress', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.exp-list', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
    gsap.utils.toArray<HTMLElement>('.exp-rule').forEach((el) => {
      gsap.from(el, { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
  }, { scope: rootRef });

  const current = EXPERIENCES[active];

  return (
    <section id="experience" ref={rootRef} className="section">
      <div className="wrap">
        <SectionHead
          idx="02"
          label="Experience"
          title={<>Where I&apos;ve shipped.</>}
          aside="Five teams, 4+ years. From leading a squad of eight to shipping stuff at government scale."
        />

        <div className="exp-grid">
          <aside className="exp-sticky">
            <div style={{ display: 'flex', gap: 28 }}>
              <div style={{ width: 1, background: 'var(--border)', position: 'relative', alignSelf: 'stretch' }}>
                <span className="exp-progress" style={{ position: 'absolute', inset: 0, background: 'var(--accent-ink)', transformOrigin: 'top' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, overflow: 'hidden' }}>
                  <span
                    key={active}
                    style={{
                      fontSize: 'clamp(84px, 11vw, 168px)', fontWeight: 600, letterSpacing: '-0.06em', lineHeight: 0.85,
                      fontVariantNumeric: 'tabular-nums', display: 'inline-block', animation: 'expNum 0.8s var(--ease-2)',
                    }}
                  >
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 8 }}>
                    / {String(EXPERIENCES.length).padStart(2, '0')}
                  </span>
                </div>
                <div key={`m-${active}`} style={{ marginTop: 28, animation: 'expMeta 0.7s var(--ease-2)' }}>
                  <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>{current.company}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>{current.date}</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="exp-list">
            {EXPERIENCES.map((exp, i) => (
              <article
                key={exp.company}
                className="exp-item"
                style={{ paddingBottom: 48, opacity: active === i ? 1 : 0.38, transition: 'opacity 0.6s var(--ease)' }}
              >
                <div className="exp-rule" style={{ height: 1, background: 'var(--border-2)', transformOrigin: 'left', marginBottom: 28 }} />
                <div data-reveal>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                      {exp.role}
                      {exp.roleSub && <span style={{ color: 'var(--muted-2)', fontWeight: 400, fontSize: '0.5em', letterSpacing: 0 }}> {exp.roleSub}</span>}
                    </h3>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', whiteSpace: 'nowrap' }}>{exp.date}</span>
                  </div>
                  <div style={{ fontSize: 15, color: 'var(--accent-ink)', marginBottom: 20 }}>
                    {exp.company} <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 11 }}>{exp.place}</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {exp.items.map((item) => (
                      <li key={item} className="muted" style={{ fontSize: 15, lineHeight: 1.6, paddingLeft: 22, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.8em', width: 10, height: 1, background: 'var(--muted-2)' }} />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expNum  { from { transform: translateY(100%); } }
        @keyframes expMeta { from { opacity: 0; transform: translateY(12px); } }
      `}</style>
    </section>
  );
}
