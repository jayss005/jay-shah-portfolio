import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const LoadSequence = ({ onComplete }: { onComplete?: () => void }) => {
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const played = sessionStorage.getItem("jay_load_played");
    if (played || reduced) {
      wrapRef.current?.remove();
      onComplete?.();
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("jay_load_played", "1");
        document.body.style.overflow = "auto";
        wrapRef.current?.remove();
        onComplete?.();
      },
    });

    tl.set([topRef.current, botRef.current], { autoAlpha: 0 });
    tl.fromTo(lineRef.current, { width: "0vw" }, { width: "100vw", duration: 0.3, ease: "power2.out" }, 0.3);
    tl.set([topRef.current, botRef.current], { autoAlpha: 1 }, 0.6);
    tl.set(lineRef.current, { autoAlpha: 0 }, 0.6);
    tl.to(topRef.current, { yPercent: -100, duration: 0.5, ease: "power2.inOut" }, 0.6);
    tl.to(botRef.current, { yPercent: 100, duration: 0.5, ease: "power2.inOut" }, 0.6);

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, [reduced, onComplete]);

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-[200]">
      <div ref={topRef} className="absolute left-0 top-0 h-1/2 w-full" style={{ background: "hsl(var(--bg-primary))" }} />
      <div ref={botRef} className="absolute bottom-0 left-0 h-1/2 w-full" style={{ background: "hsl(var(--bg-primary))" }} />
      <div
        ref={lineRef}
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{ background: "hsl(var(--accent))", width: 0 }}
      />
    </div>
  );
};
