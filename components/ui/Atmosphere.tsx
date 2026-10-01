// Static backdrop: a fine engineering grid with crosshair marks, plus film grain.
export default function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          backgroundPosition: 'center top',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 20%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 20%, transparent 80%)',
        }}
      />
      <div className="grain" aria-hidden />
    </>
  );
}
