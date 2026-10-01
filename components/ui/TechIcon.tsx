import { TECH } from '@/lib/tech';

// Monochrome logo painted with currentColor via CSS mask, so it follows the theme.
export default function TechIcon({ name, size = '1em' }: { name: string; size?: string | number }) {
  const tech = TECH[name];
  if (!tech) return null;
  const url = `url(/assets/tech/${tech.icon}.svg)`;
  return (
    <span
      aria-hidden
      className="tech-icon"
      style={{
        display: 'inline-block', width: size, height: size, flexShrink: 0,
        backgroundColor: 'currentColor',
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
  );
}
