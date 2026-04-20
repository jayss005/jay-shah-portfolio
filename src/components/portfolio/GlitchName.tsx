import { useEffect, useRef } from "react";

export const GlitchName = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sliceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: number;
    const run = () => {
      const main = ref.current;
      const ghost = ghostRef.current;
      const slice = sliceRef.current;
      if (!main || !ghost || !slice) return;

      // Frame 1: RGB split
      main.style.transform = "translateX(4px)";
      ghost.style.opacity = "0.3";
      ghost.style.transform = "translateX(-3px)";
      // random slice
      const y = 10 + Math.random() * 60;
      const h = 10 + Math.random() * 12;
      slice.style.clipPath = `polygon(0 ${y}%, 100% ${y}%, 100% ${y + h}%, 0 ${y + h}%)`;
      slice.style.opacity = "1";

      setTimeout(() => {
        slice.style.transform = "translateX(-8px)";
      }, 80);

      setTimeout(() => {
        // Frame 3 flicker
        let i = 0;
        const flick = window.setInterval(() => {
          main.style.opacity = i % 2 === 0 ? "0.3" : "1";
          i++;
          if (i >= 6) {
            clearInterval(flick);
            main.style.opacity = "1";
          }
        }, 30);
      }, 180);

      setTimeout(() => {
        main.style.transform = "translateX(0)";
        ghost.style.opacity = "0";
        ghost.style.transform = "translateX(-3px)";
        slice.style.opacity = "0";
        slice.style.transform = "translateX(0)";
      }, 400);

      timeout = window.setTimeout(run, 15000 + Math.random() * 10000);
    };
    timeout = window.setTimeout(run, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={ref}
        className="font-display font-extrabold leading-[0.9] text-text-primary"
        style={{ fontSize: "clamp(52px, 9vw, 112px)", transition: "transform 60ms linear, opacity 30ms linear" }}
      >
        {text}
      </div>
      <span
        ref={ghostRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 font-display font-extrabold leading-[0.9]"
        style={{
          fontSize: "clamp(52px, 9vw, 112px)",
          color: "hsl(var(--danger))",
          mixBlendMode: "screen",
          opacity: 0,
          transition: "opacity 80ms linear, transform 80ms linear",
        }}
      >
        {text}
      </span>
      <span
        ref={sliceRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 font-display font-extrabold leading-[0.9] text-text-primary"
        style={{
          fontSize: "clamp(52px, 9vw, 112px)",
          opacity: 0,
          transition: "transform 80ms linear, opacity 80ms linear",
        }}
      >
        {text}
      </span>
    </div>
  );
};
