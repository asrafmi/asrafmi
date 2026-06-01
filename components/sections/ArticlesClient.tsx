'use client';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category?: string[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').slice(0, 150) + '...';
}

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  return (
    <section id="articles" className="section-pad" style={{ position: 'relative' }}>
      <div className="section-inner">
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            Writing
          </span>
        </div>
        <div className="reveal" data-delay="1">
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
            Thoughts I&apos;ve shared.
          </h2>
        </div>

        <div className="projects-grid">
          {articles.map((article, i) => (
            <a
              key={article.link}
              className="reveal"
              data-delay={i === 0 ? '1' : i === 1 ? '2' : '1'}
              href={article.link}
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
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--muted-2)', letterSpacing: '0.1em' }}>
                  {formatDate(article.pubDate)}
                </span>
                <span style={{
                  width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--border)',
                  display: 'grid', placeItems: 'center', color: 'var(--muted)',
                  transition: 'all 0.45s var(--ease)',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>
                {article.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>
                {stripHtml(article.description)}
              </p>
              {article.category && article.category.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 20 }}>
                  {article.category.slice(0, 3).map((tag) => (
                    <span key={tag} style={{
                      fontFamily: 'var(--ff-mono)', fontSize: 11.5, color: 'var(--muted)',
                      border: '1px solid var(--border)', borderRadius: 7, padding: '4px 9px',
                      background: 'rgba(0,0,0,0.2)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
