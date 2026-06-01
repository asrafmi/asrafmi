const EXPERIENCES = [
  {
    role: 'Technical Leader',
    date: 'Jan 2022 — Present',
    company: 'CV. Solusi Teknologi Kreatif (STK)',
    place: '· Jakarta, Indonesia',
    items: [
      'Implemented SSR & perf work on <strong>Lion Parcel</strong> — <strong>+54.2%</strong> performance and <strong>+9.89%</strong> SEO (Node, Express, Vue).',
      'Led <strong>4+ engineers</strong> building <strong>Sentiment Analysis</strong> — real-time social & article monitoring (Next, Nest, MySQL, Elasticsearch).',
      'Led <strong>4+ engineers</strong> on a <strong>Smart Booking Room</strong> system for DPR RI (Next, Nest, Socket.io, MySQL).',
      'Built a Face-Recognition presence system & Telegram monitoring bot; set up CI/CD on Drone, Gitea, Docker & Kubernetes.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    date: 'Jan 2025 — Dec 2025',
    company: 'Ministry of Home Affairs — SIPD',
    place: '· Jakarta · Part-time',
    items: [
      'Built <strong>geospatial distribution maps</strong> for national priority programs (MBG, 3M Free Housing, Zero Tax) with React Leaflet.',
      'Crafted interactive policy-monitoring dashboards (React, Tailwind, Chakra UI).',
      'Owned end-to-end data integration — PostgreSQL queries through to front-end visualization.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    roleSub: '· FE heavy',
    date: 'Aug 2022 — Dec 2024',
    company: 'PT. Telkom Indonesia — Apilogy.id',
    place: '· Bandung · Project-based',
    items: [
      'Shipped a new homepage from the UI/UX prototype (React, Next, Tailwind).',
      'Rebuilt user-management — <strong>+81.9% SUS</strong>, +30% content, +53% visual impression (Vue + Webpack).',
      'Fixed 5+ pentest security issues; wrote 15+ unit & 5+ integration tests (Jest, Cypress); CI/CD on Jenkins & Drone.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    roleSub: '· FE heavy',
    date: 'Aug 2022 — Apr 2024',
    company: 'PT. Produkzilla Akademi — Productzilla',
    place: '· Bandung · Part-time',
    items: [
      'Built back-end for <strong>e-Election</strong> (NestJS/TS) + web (React, Next, React Query) and a <strong>React Native</strong> mobile app.',
      'Reworked user-management UX — <strong>+90.5% SUS</strong>, +36.4% content, +59.6% visual impression.',
      'Mentored 5+ students in a short React web-dev class; containerized services with Docker Compose.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    roleSub: '· FE heavy',
    date: 'Apr 2024 — Jul 2024',
    company: 'PT. Solusi Kebutuhan Teknologi',
    place: '· Remote · Contract',
    items: [
      'Built 3+ new features and enhanced 15+ existing ones on a <strong>Warehouse Management System</strong> (Angular, Express, MongoDB) — web & mobile.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ position: 'relative' }}>
      <div className="section-inner">
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            Experience
          </span>
        </div>
        <div className="reveal" data-delay="1">
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
            Where I&apos;ve shipped.
          </h2>
        </div>

        {/* Timeline */}
        <div className="exp-timeline" style={{ position: 'relative', marginTop: 20 }}>
          <div className="exp-line" style={{
            position: 'absolute', left: 11, top: 8, bottom: 8, width: 1,
            background: 'linear-gradient(var(--border-2), var(--border), transparent)',
          }} />

          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="reveal" data-delay="1" style={{ position: 'relative', padding: '0 0 14px 48px', marginBottom: 14 }}>
              <span className="exp-dot" style={{
                position: 'absolute', left: 4, top: 6, width: 15, height: 15, borderRadius: '50%',
                background: 'var(--bg)', border: '2px solid var(--border-2)', transition: 'all 0.4s var(--ease)',
              }} />
              <div style={{
                border: '1px solid var(--border)', borderRadius: 16, padding: '22px 24px',
                background: 'var(--surface)', transition: 'border-color 0.4s var(--ease), transform 0.4s var(--ease), background 0.4s',
              }}>
                <div className="exp-header">
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {exp.role}
                    {exp.roleSub && <span style={{ color: 'var(--muted-2)', fontWeight: 400, fontSize: 13 }}> {exp.roleSub}</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 12.5, color: 'var(--muted-2)', whiteSpace: 'nowrap' }}>{exp.date}</div>
                </div>
                <div style={{ fontSize: 14.5, color: 'var(--accent)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {exp.company}
                  <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--ff-mono)', fontSize: 12 }}>{exp.place}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {exp.items.map((item, j) => (
                    <li key={j} style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.55, paddingLeft: 18, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--border-2)' }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
