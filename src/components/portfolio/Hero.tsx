import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/splitText";
import { AsciiPanel } from "./AsciiPanel";
import { GlitchName } from "./GlitchName";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const portRef = useRef<HTMLDivElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem("jay_load_played");
    const baseDelay = played || reduced ? 0 : 1.2;

    if (reduced) return;

    // Typewriter on // PORTFOLIO
    if (portRef.current) {
      const txt = portRef.current.textContent ?? "";
      portRef.current.innerHTML = txt
        .split("")
        .map((c) => `<span style="opacity:0;display:inline-block">${c === " " ? "&nbsp;" : c}</span>`)
        .join("");
      gsap.to(portRef.current.querySelectorAll("span"), {
        opacity: 1,
        stagger: 0.04,
        delay: baseDelay,
        duration: 0.05,
      });
    }

    // Name slam
    if (nameWrapRef.current) {
      gsap.set(nameWrapRef.current, { yPercent: 30, opacity: 0 });
      gsap.to(nameWrapRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
        delay: baseDelay + 0.5,
      });
    }

    if (ruleRef.current) {
      gsap.fromTo(
        ruleRef.current,
        { width: 0 },
        { width: 120, duration: 0.25, ease: "power2.out", delay: baseDelay + 0.8 },
      );
    }

    if (tagRef.current) {
      const words = splitWords(tagRef.current);
      gsap.fromTo(
        words,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power3.out", delay: baseDelay + 0.9 },
      );
    }

    if (subRef.current) {
      gsap.fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, delay: baseDelay + 1.05 });
    }

    if (ctasRef.current) {
      gsap.fromTo(
        ctasRef.current.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "power2.out", delay: baseDelay + 1.2 },
      );
    }

    if (scrollRef.current) {
      gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: baseDelay + 1.4 });
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full">
      <div className="mx-auto grid h-screen max-w-[1280px] grid-cols-1 px-6 md:px-20 lg:grid-cols-[55%_45%] lg:px-0">
        <div className="flex h-full flex-col justify-center pt-16 lg:pl-20">
          <div ref={portRef} className="font-mono text-[12px] tracking-mono text-text-muted">
            // PORTFOLIO
          </div>
          <div className="mt-8" ref={nameWrapRef}>
            <GlitchName text="JAY SHAH" />
          </div>
          <div ref={ruleRef} className="mt-2 h-[2px] bg-accent" style={{ width: 0 }} />
          <h2 ref={tagRef} className="mt-5 font-display text-[24px] font-medium leading-[1.2] text-text-primary md:text-[28px]">
            Full-Stack Developer. Product Builder. IT Undergrad.
          </h2>
          <div ref={subRef} className="mt-4 font-mono text-[14px] text-text-muted">
            Next.js · Firebase · React Native · TypeScript
          </div>

          <div ref={ctasRef} className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="button"
              className="group relative overflow-hidden border-2 border-accent bg-accent px-8 py-4 font-mono text-[13px] font-bold text-bg-primary transition-transform duration-200 active:scale-[0.97]"
            >
              <span className="absolute inset-0 translate-x-[-101%] bg-bg-primary transition-transform duration-200 group-hover:translate-x-0" />
              <span className="relative transition-colors duration-200 group-hover:text-accent">
                VIEW WORK <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </a>
            <a
              href="/resume.pdf"
              data-cursor="button"
              className="group relative border-2 border-text-primary px-8 py-4 font-mono text-[13px] font-bold text-text-primary transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
            >
              <span className="relative">
                RESUME <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </span>
              <span className="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          </div>

          <div ref={scrollRef} className="mt-20 flex items-center gap-3 font-mono text-[11px] tracking-mono" style={{ color: "hsl(var(--text-faint))" }}>
            <span className="pulse-fade">SCROLL TO EXPLORE</span>
            <span className="bob inline-block">↓</span>
          </div>
        </div>

        <div className="hidden lg:block">
          <AsciiPanel />
        </div>
      </div>
    </section>
  );
};
