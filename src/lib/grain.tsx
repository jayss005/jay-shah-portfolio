export const GrainOverlay = () => {
  // SVG noise tile
  const svg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  return (
    <div
      aria-hidden
      className="grain-layer pointer-events-none fixed inset-[-10%] z-[100]"
      style={{
        backgroundImage: `url("${svg}")`,
        backgroundRepeat: "repeat",
        opacity: 0.03,
        mixBlendMode: "overlay",
      }}
    />
  );
};
