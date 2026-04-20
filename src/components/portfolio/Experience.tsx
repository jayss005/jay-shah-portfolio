import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const tech = ["Java", "Spring Boot", "Angular", "MySQL"];

export const Experience = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trig = { trigger: lineRef.current, start: "top 80%", once: true };
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, ease: "power2.out", scrollTrigger: trig },
      );
    }
    if (nodeRef.current) {
      gsap.fromTo(
        nodeRef.current,
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, duration: 0.3,
          scrollTrigger: trig,
          delay: 0.2,
        },
      );
    }
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: 32, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", scrollTrigger: trig, delay: 0.2 },
      );
    }
  }, []);

  return (
    <section id="experience" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-20">
      <SectionHeader number="// 003" title="EXPERIENCE" />
      <div className="relative pl-12">
        <div ref={lineRef} className="absolute left-0 top-0 h-full w-px bg-border-subtle" />
        <div ref={nodeRef} className="absolute -left-[3px] top-2 h-2 w-2 bg-accent" />

        <div
          ref={cardRef}
          className="group border border-border-subtle bg-bg-surface p-8 transition-all duration-200 hover:border-accent"
          style={{ borderLeft: "4px solid hsl(var(--accent))" }}
          data-cursor="hover"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-[20px] font-bold text-text-primary transition-transform duration-200 group-hover:translate-x-2">
              SOFT TEST LABS
            </h3>
            <span className="font-mono text-[12px] text-text-muted">JUN 2025 – JUL 2025</span>
          </div>
          <div className="mt-2 font-mono text-[13px] text-accent">
            SOFTWARE DEVELOPMENT ENGINEERING INTERN · PUNE
          </div>
          <ul className="mt-5 space-y-3 font-body text-[15px] leading-[1.7]" style={{ color: "hsl(var(--text-primary) / 0.7)" }}>
            <li>• Built 5+ RESTful APIs in Java Spring Boot handling core business logic and data operations for client-facing features</li>
            <li>• Developed 5+ end-to-end Angular frontend pages integrated with Spring Boot APIs, delivering production-ready user features</li>
            <li>• Designed and managed MySQL relational schemas for a multi-module application supporting complex data requirements</li>
            <li>• Applied industry-standard practices through structured code reviews and collaborative team workflows</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="inline-block border border-text-faint bg-bg-surface px-3 py-1 font-mono text-[11px] text-text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
