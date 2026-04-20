import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Mode = "default" | "hover" | "text" | "button";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 768;
    if (!fine) return;

    document.documentElement.classList.add("cursor-hidden");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let mode: Mode = "default";
    let lockRect: DOMRect | null = null;

    const setMode = (m: Mode, rect: DOMRect | null = null) => {
      mode = m;
      lockRect = rect;
      if (m === "hover") {
        dot.style.opacity = "0";
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "hsl(var(--accent))";
        ring.style.background = "hsl(var(--accent) / 0.15)";
        ring.style.borderRadius = "0px";
      } else if (m === "button") {
        dot.style.opacity = "0";
        ring.style.borderColor = "hsl(var(--accent))";
        ring.style.background = "hsl(var(--accent) / 0.15)";
        ring.style.borderRadius = "0px";
      } else if (m === "text") {
        dot.style.opacity = "0";
        ring.style.width = "2px";
        ring.style.height = "18px";
        ring.style.borderColor = "transparent";
        ring.style.background = "hsl(var(--accent))";
      } else {
        dot.style.opacity = "1";
        ring.style.width = "24px";
        ring.style.height = "24px";
        ring.style.borderColor = "hsl(var(--text-primary))";
        ring.style.background = "transparent";
        ring.style.borderRadius = "999px";
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const target = e.target as HTMLElement;
      if (!target) return;
      const btn = target.closest("button, a, [data-cursor='button']") as HTMLElement | null;
      const link = target.closest("[data-cursor='hover']") as HTMLElement | null;
      const text = target.closest("p, [data-cursor='text']");
      if (btn) {
        setMode("button", btn.getBoundingClientRect());
      } else if (link) {
        setMode("hover");
      } else if (text) {
        setMode("text");
      } else {
        setMode("default");
      }
    };

    const onClick = () => {
      dot.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(2.5)", opacity: 0.4 },
          { transform: "translate(-50%,-50%) scale(0)", opacity: 0 },
        ],
        { duration: 300, easing: "ease-out" },
      );
    };

    let raf = 0;
    const loop = () => {
      // Dot snaps to mouse
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      // Ring lerp
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (mode === "button" && lockRect) {
        const cx = lockRect.left + lockRect.width / 2;
        const cy = lockRect.top + lockRect.height / 2;
        ring.style.width = `${lockRect.width + 8}px`;
        ring.style.height = `${lockRect.height + 8}px`;
        ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      } else {
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 24,
          height: 24,
          border: "1px solid hsl(var(--text-primary))",
          borderRadius: 999,
          transition: "width 150ms ease, height 150ms ease, background 150ms ease, border-color 150ms ease, border-radius 150ms ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          background: "hsl(var(--text-primary))",
          borderRadius: 999,
          transition: "opacity 80ms ease",
        }}
      />
    </>
  );
};
