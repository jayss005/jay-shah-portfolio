import { useEffect, useRef } from "react";

export const ScrollProgress = () => {
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = fillRef.current;
      if (!el) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      el.style.height = `${Math.min(1, Math.max(0, p)) * 100}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[90] h-screen w-[2px]" style={{ background: "hsl(var(--bg-elevated))" }}>
      <div ref={fillRef} style={{ width: "100%", height: "0%", background: "hsl(var(--accent))" }} />
    </div>
  );
};
