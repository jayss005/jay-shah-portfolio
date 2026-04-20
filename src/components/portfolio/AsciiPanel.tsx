import { useEffect, useRef } from "react";

export const AsciiPanel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const cols = 40;
  const rows = 20;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dots = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-dot]"));
    let timer = 0;
    const tick = () => {
      const startCol = Math.floor(Math.random() * (cols - 4));
      const startRow = Math.floor(Math.random() * (rows - 3));
      const w = 3 + Math.floor(Math.random() * 3);
      const h = 2 + Math.floor(Math.random() * 2);
      const cluster: HTMLSpanElement[] = [];
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          const idx = (startRow + r) * cols + (startCol + c);
          if (dots[idx]) cluster.push(dots[idx]);
        }
      }
      cluster.forEach((d) => {
        d.style.transition = "color 600ms ease-in-out";
        d.style.color = "hsl(var(--accent) / 0.4)";
        setTimeout(() => {
          d.style.color = "hsl(var(--text-faint) / 0.4)";
        }, 600);
      });
      timer = window.setTimeout(tick, 2000 + Math.random() * 1500);
    };
    timer = window.setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative hidden h-full w-full overflow-hidden lg:block" style={{ background: "hsl(0 0% 5%)" }}>
      <div ref={ref} className="absolute inset-0 p-8 font-mono text-[11px] leading-[14px]" style={{ color: "hsl(var(--text-faint) / 0.4)" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="whitespace-pre">
            {Array.from({ length: cols }).map((_, c) => (
              <span key={c} data-dot>· </span>
            ))}
          </div>
        ))}
      </div>
      {/* CRT scan line */}
      <div
        className="pointer-events-none absolute left-0 h-[2px] w-full"
        style={{
          background: "hsl(0 0% 100% / 0.06)",
          top: 0,
          animation: "crt-scan 12s linear infinite",
        }}
      />
      <style>{`@keyframes crt-scan { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
      <div className="absolute right-4 top-4 text-right font-mono text-[9px]" style={{ color: "hsl(var(--text-faint))" }}>
        <div>40.9°N 74.1°W</div>
        <div>SYS:READY</div>
      </div>
    </div>
  );
};
