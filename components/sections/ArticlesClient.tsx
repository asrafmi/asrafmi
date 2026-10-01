'use client';

import { useRef } from 'react';
import SectionHead from '@/components/motion/SectionHead';
import { useReveal } from '@/hooks/useReveal';

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
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section id="articles" ref={rootRef} className="section">
      <div className="wrap">
        <SectionHead
          idx="05"
          label="Writing"
          title={<>Thoughts I&apos;ve shared.</>}
          aside={<>Random notes on engineering and building products, posted on <a href="https://medium.com/@asraf.muhammad07" target="_blank" rel="noopener" className="ulink" style={{ color: 'var(--text)' }}>Medium</a>.</>}
        />

        <div style={{ borderBottom: '1px solid var(--border)' }}>
          {articles.map((article) => (
            <a key={article.link} href={article.link} target="_blank" rel="noopener" className="article-row" data-reveal>
              <span className="mono art-date" style={{ fontSize: 11, color: 'var(--muted)' }}>{formatDate(article.pubDate)}</span>
              <div>
                <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 10 }}>
                  {article.title}
                </h3>
                <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, maxWidth: 720 }}>{stripHtml(article.description)}</p>
                {article.category && article.category.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    {article.category.slice(0, 3).map((tag) => <span key={tag} className="chip">{tag}</span>)}
                  </div>
                )}
              </div>
              <span className="art-arrow" style={{
                width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--border-2)',
                display: 'grid', placeItems: 'center',
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}>
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
