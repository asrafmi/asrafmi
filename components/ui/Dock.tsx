'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
        <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
        <path d="M12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6z" />
      </svg>
    ),
  },
];

const CONTACT = {
  id: 'contact',
  label: 'Contact',
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={19} height={19}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
};

function scrollTo(id: string) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Dock() {
  const activeId = useScrollSpy([...NAV.map((n) => n.id), CONTACT.id]);

  const btnStyle = (id: string): React.CSSProperties => ({
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: activeId === id ? 'var(--accent)' : 'var(--muted)',
    transition: 'color 0.3s, background 0.3s',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  });

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 26,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: 8,
          background: 'rgba(12,12,14,0.72)',
          backdropFilter: 'blur(18px) saturate(1.4)',
          border: '1px solid var(--border-2)',
          borderRadius: 100,
          boxShadow: '0 20px 50px -16px rgba(0,0,0,0.7)',
        }}
      >
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={btnStyle(item.id)}
            aria-label={item.label}
            title={item.label}
          >
            {activeId === item.id && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 5,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}
              />
            )}
            {item.icon}
          </button>
        ))}

        <span style={{ width: 1, height: 26, background: 'var(--border)', margin: '0 4px' }} />

        <button
          onClick={() => scrollTo(CONTACT.id)}
          style={btnStyle(CONTACT.id)}
          aria-label={CONTACT.label}
          title={CONTACT.label}
        >
          {activeId === CONTACT.id && (
            <span
              style={{
                position: 'absolute',
                bottom: 5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--accent)',
              }}
            />
          )}
          {CONTACT.icon}
        </button>
      </nav>
    </div>
  );
}
