'use client';

import { useRef, useState } from 'react';
import SectionHead from '@/components/motion/SectionHead';
import LogoTile from '@/components/ui/LogoTile';
import { useReveal } from '@/hooks/useReveal';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/motion';

const EXPERIENCES = [
  {
    role: 'Technical Leader',
    date: 'Jan 2022 to now',
    company: 'CV. Solusi Teknologi Kreatif (STK)',
    logo: { src: '/assets/work/stk.png', w: 256, h: 256 },
    place: '· Jakarta · Full time',
    items: [
      'Led a squad of <strong>8 engineers</strong> building <strong>Satria Muda Indonesia</strong>, a platform for a national martial arts org with realtime digital scoring, events and asset management (Next.js, NestJS, PostgreSQL, Socket.io).',
      'Led <strong>4 engineers</strong> on <strong>Hemdal</strong>, a B2B media monitoring SaaS that listens to social media and articles in realtime, with AI sentiment analysis and Elasticsearch search (Next.js, NestJS, MySQL).',
      'Led <strong>4 engineers</strong> on a <strong>Smart Room Booking</strong> system for DPR RI, the Indonesian Parliament, with realtime room management (Next.js, NestJS, Socket.io, MySQL).',
      'Tuned SSR and web performance for <strong>Lion Parcel</strong> and got <strong>+54.2%</strong> on Lighthouse performance and <strong>+9.89%</strong> on SEO (Node.js, Express, Vue.js).',
      'Built internal tools: a Telegram bot that keeps an eye on our systems (Python) and a face recognition attendance app with Midtrans payments (React, NestJS).',
      'Built a License API service with Go (Fiber), MySQL and GORM, set up CI/CD with Drone.io, Gitea Actions, Docker and Kubernetes, and do code reviews to keep things clean.',
      'Got picked as <strong>High Achiever (1 of 13)</strong> at STK in late 2025 for stepping up past my scope and pushing initiatives on my own.',
    ],
  },
  {
    role: 'Full Stack Developer',
    date: 'Jan 2025 to Dec 2025',
    company: 'Ministry of Home Affairs · SIPD',
    logo: { src: '/assets/work/kemendagri.png', w: 186, h: 240 },
    place: '· Jakarta · Project based via STK',
    items: [
      'Built <strong>geospatial distribution maps</strong> for national priority programs (MBG, 3 Million Free Housing, Zero Tax), used across <strong>500+ regional governments</strong> with React Leaflet.',
      'Built interactive policy monitoring dashboards for minister level stakeholders, showing how programs roll out across regions (React, Tailwind CSS, Chakra UI).',
      'Owned the whole data flow, from PostgreSQL queries and backend prep in Go (Fiber) all the way to the charts on screen.',
      'Helped ship a helpdesk app used by 500+ regional governments, running on Docker Compose on premise.',
    ],
  },
  {
    role: 'Full Stack Developer',
    date: 'Aug 2022 to Dec 2024',
    company: 'PT. Telkom Indonesia · Apilogy.id',
    logo: { src: '/assets/work/telkom.svg', w: 200, h: 110 },
    place: '· Bandung · Project based via STK',
    items: [
      'Revamped the user management UI and got <strong>SUS up 81.9%</strong>, 30% more useful content and visual impression up 53% (Vue.js, Webpack).',
      'Shipped the new apilogy.id homepage straight from the UI/UX prototype (React, Next.js, Tailwind CSS).',
      'Fixed 5+ security issues from the pentest team and wrote 15+ unit and 5+ integration tests (Jest, Cypress).',
      'Worked closely with backend and frontend folks on API integration, did code reviews, and ran CI/CD on Jenkins and Drone.io.',
    ],
  },
  {
    role: 'Full Stack Developer',
    date: 'Aug 2022 to Apr 2024',
    company: 'PT. Produkzilla Akademi · Productzilla',
    logo: { src: '/assets/work/productzilla.png', w: 572, h: 160 },
    place: '· Bandung · Project based via STK',
    items: [
      'Turned new UI/UX designs into the user management pages and got <strong>SUS up 90.5%</strong>, 36.4% more useful content and visual impression up 59.6% (Vue.js, Webpack).',
      'Built the backend for an <strong>online election product</strong> (NestJS, TypeScript), its web app from Figma mockups (React, Next.js, React Query) and the <strong>React Native</strong> mobile app.',
      'Containerized the services with Docker Compose and set up CI/CD on Drone.io.',
      'Taught and mentored 5+ students in a short React web dev class.',
    ],
  },
  {
    role: 'Full Stack Developer',
    date: 'Apr 2024 to Jul 2024',
    company: 'PT. Solusi Kebutuhan Teknologi (Prieds)',
    logo: { src: '/assets/work/prieds.jpg', w: 200, h: 200 },
    place: '· Remote · Freelance',
    items: [
      'Shipped 3+ new features, squashed 5+ bugs and leveled up 15+ existing features on a <strong>Warehouse Management System</strong>, web and mobile (Angular, Express, MongoDB).',
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
                  <div style={{ marginBottom: 18 }}>
                    <LogoTile logo={current.logo} alt={`${current.company} logo`} size={72} radius={18} />
                  </div>
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
                    </h3>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', whiteSpace: 'nowrap' }}>{exp.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <LogoTile logo={exp.logo} alt={`${exp.company} logo`} size={36} radius={10} />
                    <div style={{ fontSize: 15, color: 'var(--accent-ink)' }}>
                      {exp.company} <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 11 }}>{exp.place}</span>
                    </div>
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
