import Image from 'next/image';

export type Logo = { src: string; w: number; h: number };

// Institution logos ship with dark wordmarks, so they always sit on a white
// tile to stay legible in both themes.
export default function LogoTile({ logo, alt, size = 60, radius = 14 }: { logo: Logo; alt: string; size?: number; radius?: number }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: radius, background: '#fff', flexShrink: 0,
      border: '1px solid var(--border)', display: 'grid', placeItems: 'center', padding: Math.round(size * 0.14),
    }}>
      <Image src={logo.src} alt={alt} width={logo.w} height={logo.h} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </span>
  );
}
