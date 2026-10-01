import Image from 'next/image';

// Circular portrait, zoomed onto the face (the source photo is a wide
// half-body shot on black, face sitting around 43% from the top).
export default function Avatar({ size, zoom = 1.6, priority, className }: {
  size: number | string; zoom?: number; priority?: boolean; className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        position: 'relative', display: 'inline-block', width: size, height: size, flexShrink: 0,
        borderRadius: '50%', overflow: 'hidden', background: '#000',
        border: '1px solid var(--border-2)',
      }}
    >
      <span style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 40%' }}>
        <Image
          src="/assets/asraf.webp"
          alt=""
          fill
          priority={priority}
          sizes={typeof size === 'number' ? `${Math.round(size * zoom)}px` : '320px'}
          style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
        />
      </span>
    </span>
  );
}
