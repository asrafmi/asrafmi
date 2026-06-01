export default function About() {
  return (
    <section id="about" style={{ padding: '130px 0', position: 'relative' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 32px' }}>
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            About
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 70, alignItems: 'start' }}>
          {/* Left */}
          <div className="reveal" data-delay="1">
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
              Always chasing the feeling of discovery.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 17.5, lineHeight: 1.75, marginBottom: 20 }}>
              I&apos;m a programmer who lives in the <strong style={{ color: 'var(--text)', fontWeight: 600 }}>JavaScript world</strong> — from pixel-precise
              React &amp; Next.js front-ends to robust Node.js, Express &amp; NestJS back-ends. Over the last
              few years I&apos;ve grown from building features to <strong style={{ color: 'var(--text)', fontWeight: 600 }}>leading engineers</strong> and owning
              full-stack products end to end.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 17.5, lineHeight: 1.75, marginBottom: 20 }}>
              I care about clean code, measurable impact, and shipping things people actually use —
              whether that&apos;s a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>54% Lighthouse jump</strong>, a real-time sentiment platform, or an
              AI tool that writes theses. New ideas, new tech, and the chance to affect life positively keep me going.
            </p>

            <div style={{ marginTop: 28, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
              {[
                { school: 'Binus Online University', deg: 'Information System — Bachelor (Ongoing)', gpa: '3.94 / 4.0' },
                { school: 'Telkom University', deg: 'Information System — Diploma 3 · Cumlaude', gpa: '3.90 / 4.0' },
              ].map((edu, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0',
                  borderBottom: i === 0 ? '1px dashed var(--border)' : 'none',
                }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{edu.school}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{edu.deg}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 13, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{edu.gpa}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats */}
          <div className="reveal" data-delay="2">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { num: '3.5', suffix: '+', label: 'years experience', accentNum: true },
                { num: '15', suffix: '+', label: 'technologies', accentSuffix: true },
                { num: '4', suffix: '+', label: 'engineers led', accentSuffix: true },
                { num: '5', suffix: '+', label: 'companies', accentSuffix: true },
              ].map((stat) => (
                <div key={stat.label} style={{
                  border: '1px solid var(--border)', borderRadius: 16, padding: 24,
                  background: 'var(--surface)', transition: 'border-color 0.4s var(--ease), transform 0.4s var(--ease), background 0.4s',
                }}>
                  <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
                    {stat.accentNum
                      ? <><span style={{ color: 'var(--accent)' }}>{stat.num}</span>{stat.suffix}</>
                      : <>{stat.num}<span style={{ color: 'var(--accent)' }}>{stat.suffix}</span></>
                    }
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--ff-mono)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
