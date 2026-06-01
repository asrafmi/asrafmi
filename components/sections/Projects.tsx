const PROJECTS = [
  {
    idx: '01 — Live',
    title: 'SkripsiAI — Thesis Assistant',
    desc: 'A platform for writing theses with built-in AI tools and automated document formatting, powered by the Anthropic API.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic API'],
    href: 'https://thesis-ai-assistant.vercel.app/',
    delay: '1',
  },
  {
    idx: '02 — GitHub',
    title: 'ChatGPT Clone',
    desc: 'A full ChatGPT-style messenger with streaming responses and persistent chats, built on the OpenAI API.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase', 'OpenAI API'],
    href: 'https://github.com/asrafmi/chatgpt-messenger',
    delay: '2',
  },
  {
    idx: '03 — GitHub',
    title: 'Diabetes Prediction',
    desc: 'A smart web app that predicts diabetes risk from user inputs using a trained machine-learning model.',
    tags: ['Python', 'Machine Learning', 'scikit-learn'],
    href: 'https://github.com/asrafmi/prediksi-diabetes-fixed',
    delay: '1',
  },
  {
    idx: '04 — GitHub',
    title: 'Portfolio Website',
    desc: 'A clean, animated personal portfolio site crafted from scratch with React and SCSS.',
    tags: ['React', 'SCSS'],
    href: 'https://github.com/asrafmi/emil-portofolio',
    delay: '2',
  },
  {
    idx: '05 — Production Live at Satria Muda Indonesia',
    title: 'Satria Muda Indonesia Website',
    desc: 'A website for Satria Muda Indonesia, showcasing their events, news, and team information.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'TypeORM', 'PostgreSQL', 'Websocket', 'Docker', 'Kubernetes'],
    href: 'https://satriamudaindonesia.com',
    delay: '1',
  },
  {
    idx: '06 — Production Live at Hemdal',
    title: 'Hemdal — Social Media Monitoring Dashboard',
    desc: 'A dashboard for monitoring social media metrics and engagement, providing real-time insights and analytics.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'NestJS', 'MySQL', 'Elasticsearch', 'Websocket', 'Docker', 'Kubernetes'],
    href: 'https://www.hemdal.id',
    delay: '1',
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ position: 'relative' }}>
      <div className="section-inner">
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            Selected Work
          </span>
        </div>
        <div className="reveal" data-delay="1">
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
            Things I&apos;ve built.
          </h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              className="reveal"
              data-delay={p.delay}
              href={p.href}
              target="_blank"
              rel="noopener"
              style={{
                position: 'relative',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 30,
                background: 'var(--surface)',
                overflow: 'hidden',
                minHeight: 230,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.5s var(--ease), transform 0.5s var(--ease), background 0.5s',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--muted-2)', letterSpacing: '0.1em' }}>{p.idx}</span>
                <span style={{
                  width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--border)',
                  display: 'grid', placeItems: 'center', color: 'var(--muted)',
                  transition: 'all 0.45s var(--ease)',
                }}>
                  <ArrowIcon />
                </span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 20 }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'var(--ff-mono)', fontSize: 11.5, color: 'var(--muted)',
                    border: '1px solid var(--border)', borderRadius: 7, padding: '4px 9px',
                    background: 'rgba(0,0,0,0.2)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
