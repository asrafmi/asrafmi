import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Asraf Muhammad — Programmer & Technology Enthusiast';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* accent */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* avatar placeholder with initials */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            AM
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ margin: 0, fontSize: 20, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
              Portfolio
            </p>
            <h1 style={{ margin: 0, fontSize: 64, fontWeight: 800, color: '#f5f5f5', lineHeight: 1.1 }}>
              Asraf Muhammad
            </h1>
            <p style={{ margin: 0, fontSize: 26, color: '#a3a3a3', fontWeight: 400 }}>
              Programmer & Technology Enthusiast
            </p>
          </div>

          <p style={{ margin: 0, fontSize: 18, color: '#737373', maxWidth: 700, lineHeight: 1.5 }}>
            Full-stack developer · React · Next.js · Node.js · NestJS · AI products · Indonesia
          </p>

          <p style={{ margin: 0, fontSize: 16, color: '#6366f1', fontWeight: 500 }}>
            asrafmi.vercel.app
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
