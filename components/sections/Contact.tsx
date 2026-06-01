'use client';

type Props = { onChatOpen?: () => void };

export default function Contact({ onChatOpen }: Props) {
  return (
    <section id="contact" className="section-pad" style={{ paddingBottom: 200, textAlign: 'center', position: 'relative' }}>
      <div className="section-inner">
        <div className="reveal">
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 26,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
            Contact
          </span>
        </div>

        <div className="reveal" data-delay="1">
          <h2 style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.98, marginBottom: 26 }}>
            Let&apos;s build something{' '}
            <span style={{ color: 'var(--accent)' }}>worth discovering.</span>
          </h2>
        </div>

        <p className="reveal" data-delay="2" style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 460, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Open to full-stack &amp; AI roles, freelance, and interesting collaborations.
          The fastest way to know me is to just ask my AI twin.
        </p>

        <div className="reveal" data-delay="3" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 34 }}>
          <button
            onClick={onChatOpen}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '12px 20px',
              borderRadius: 12,
              border: 'none',
              background: 'var(--accent)',
              color: '#1a1205',
              fontSize: 14.5,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width={17} height={17}>
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
            </svg>
            Chat with my AI twin
          </button>
          <a
            href="mailto:asraf.muhammad07@gmail.com"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '12px 20px',
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              fontSize: 14.5,
              fontWeight: 500,
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'border-color 0.4s var(--ease), background 0.4s var(--ease)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Send an email
          </a>
        </div>

        <a
          href="mailto:asraf.muhammad07@gmail.com"
          style={{
            fontFamily: 'var(--ff-mono)', fontSize: 15, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'color 0.3s', textDecoration: 'none',
          }}
        >
          asraf.muhammad07@gmail.com
        </a>
      </div>
    </section>
  );
}
