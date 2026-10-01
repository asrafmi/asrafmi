import { existsSync } from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Avatar from '@/components/ui/Avatar';
import { CV_FILE } from '@/lib/cv';

export const metadata: Metadata = {
  title: 'CV',
  description: 'The CV of Asraf Muhammad Izzuddin, full stack engineer based in Indonesia.',
};

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={15} height={15}><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export default function CvPage() {
  const hasCv = existsSync(path.join(process.cwd(), 'public', CV_FILE));

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <header className="wrap" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 84 }}>
        <Link href="/" className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--muted)' }}>
          <Avatar size={40} zoom={1.7} />
          <span className="ulink">← Back to portfolio</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {hasCv && (
            <>
              <a href={CV_FILE} target="_blank" rel="noopener" className="btn" style={{ height: 40, padding: '0 16px', fontSize: 13.5 }}>
                <ExternalIcon /> <span className="cv-btn-label">Open PDF</span>
              </a>
              <a href={CV_FILE} download="Asraf-Muhammad-Izzuddin-CV.pdf" className="btn btn-accent" style={{ height: 40, padding: '0 16px', fontSize: 13.5 }}>
                <DownloadIcon /> <span className="cv-btn-label">Download</span>
              </a>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>

      <main className="wrap" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 'var(--gutter)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', margin: '8px 0 20px' }}>
          <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>Curriculum Vitae</h1>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Asraf M. Izzuddin · Full stack engineer</span>
        </div>

        {hasCv ? (
          <div style={{
            flex: 1, minHeight: '78svh', borderRadius: 20, overflow: 'hidden',
            border: '1px solid var(--border-2)', background: '#fff', boxShadow: 'var(--shadow)',
          }}>
            <iframe src={`${CV_FILE}#view=FitH`} title="Asraf Muhammad Izzuddin CV" style={{ width: '100%', height: '100%', minHeight: '78svh', border: 0, display: 'block' }} />
          </div>
        ) : (
          <div style={{
            flex: 1, minHeight: '60svh', borderRadius: 20, border: '1px dashed var(--border-2)',
            display: 'grid', placeItems: 'center', textAlign: 'center', padding: 32,
          }}>
            <div>
              <p style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12 }}>
                My CV is on its way.
              </p>
              <p className="muted" style={{ fontSize: 15.5, maxWidth: 420, margin: '0 auto 24px', lineHeight: 1.6 }}>
                It&apos;s not uploaded just yet. Hit me up and I&apos;ll send it straight to your inbox.
              </p>
              <a href="mailto:asraf.muhammad07@gmail.com?subject=CV%20request" className="btn btn-accent">Ask for my CV</a>
            </div>
          </div>
        )}
      </main>

      <style>{`@media (max-width: 560px) { .cv-btn-label { display: none; } }`}</style>
    </div>
  );
}
