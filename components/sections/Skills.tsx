const SKILL_CATS = [
  { title: 'Languages', chips: ['JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { title: 'Frontend', chips: ['React.js', 'Next.js', 'Redux', 'Vue.js', 'Vuex', 'Angular', 'React Native'] },
  { title: 'Backend & Data', chips: ['Node.js', 'Express', 'NestJS', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB', 'Elasticsearch'] },
  { title: 'AI / ML & DevOps', chips: ['Machine Learning', 'NLP', 'Web Scraping', 'Docker', 'Kubernetes', 'CI/CD', 'Git'] },
];

const AWARDS = [
  '<strong>Highest Performer Employee</strong> — Solusi Teknologi Kreatif (Dec 2025)',
  '<strong>Productzilla Talent Pool Awardee</strong> — channelled directly to partner companies (2022)',
  '<strong>Sidoarjo District Scholarship</strong> — one of 800+ awardees (2022)',
  '<strong>2nd Best Student</strong> — PKS Digital School Data Science Bootcamp',
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad" style={{ position: 'relative' }}>
      <div className="section-inner">
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            Toolkit
          </span>
        </div>
        <div className="reveal" data-delay="1">
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
            Skills &amp; stack.
          </h2>
        </div>

        <div className="skills-grid">
          {/* Left — chips */}
          <div className="reveal" data-delay="1">
            {SKILL_CATS.map((cat) => (
              <div key={cat.title} style={{ marginBottom: 30 }}>
                <h4 style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 16 }}>
                  {cat.title}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {cat.chips.map((chip) => (
                    <span key={chip} style={{
                      fontSize: 14, padding: '9px 16px', borderRadius: 100,
                      border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)',
                      transition: 'all 0.35s var(--ease)', cursor: 'default',
                    }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right — languages + awards */}
          <div className="reveal" data-delay="2">
            <h4 style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 16 }}>
              Languages I speak
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { lang: 'Bahasa Indonesia', level: 'Native', pct: '100%' },
                { lang: 'English', level: 'Professional working', pct: '78%' },
              ].map((l) => (
                <div key={l.lang}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, fontSize: 14, marginBottom: 11 }}>
                    <span>{l.lang}</span>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--muted)' }}>{l.level}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 100, background: 'var(--surface-2)', overflow: 'hidden' }}>
                    <div style={{
                      display: 'block', height: '100%', width: l.pct, borderRadius: 100,
                      background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
                      transition: 'width 1.3s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 16, marginTop: 38 }}>
              Recognition
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
              {AWARDS.map((award, i) => (
                <li key={i} style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.55, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--border-2)' }} />
                  <span dangerouslySetInnerHTML={{ __html: award }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
