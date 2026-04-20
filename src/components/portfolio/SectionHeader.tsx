import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/splitText";

gsap.registerPlugin(ScrollTrigger);

export const SectionHeader = ({ number, title }: { number: string; title: string }) => {
  const numRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = titleRef.current;
    const n = numRef.current;
    const r = ruleRef.current;
    if (!t || !n || !r) return;
    const words = splitWords(t);
    gsap.set(n, { x: -40, autoAlpha: 0 });
    gsap.set(words, { y: 40, autoAlpha: 0 });
    gsap.set(r, { width: 0 });

    ScrollTrigger.create({
      trigger: n,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(n, { x: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" });
        tl.to(words, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" }, 0.1);
        tl.to(r, { width: "100%", duration: 0.5, ease: "power2.out" }, 0.2);
      },
    });
  }, []);

  return (
    <div className="mb-16">
      <div ref={numRef} className="font-mono text-[12px] tracking-mono text-text-muted">
        {number}
      </div>
      <h2
        ref={titleRef}
        className="mt-3 font-display font-extrabold leading-none text-text-primary"
        style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
      >
        {title}
      </h2>
      <div ref={ruleRef} className="mt-6 h-[2px] bg-border-bold" style={{ width: 0 }} />
    </div>
  );
};
