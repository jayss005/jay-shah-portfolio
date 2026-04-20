import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";
import focusflowMockup from "@/assets/focusflow-mockup.png";

gsap.registerPlugin(ScrollTrigger);

const focusTech = [
  { label: "Next.js", flagship: true },
  { label: "React 19" },
  { label: "TypeScript" },
  { label: "Firebase", flagship: true },
  { label: "Tailwind v4" },
  { label: "shadcn/ui" },
  { label: "dnd-kit" },
];

const Bracket = ({ pos }: { pos: "tr" | "bl" }) => {
  const v = useRef<HTMLDivElement>(null);
  const h = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!v.current || !h.current) return;
    const trig = { trigger: v.current, start: "top 85%", once: true };
    const delay = pos === "bl" ? 0.15 : 0;
    gsap.fromTo(v.current, { height: 0 }, { height: 32, duration: 0.3, ease: "power2.out", delay, scrollTrigger: trig });
    gsap.fromTo(h.current, { width: 0 }, { width: 32, duration: 0.3, ease: "power2.out", delay: delay + 0.1, scrollTrigger: trig });
  }, [pos]);
  const cls = pos === "tr" ? "right-3 top-3" : "bottom-3 left-3";
  return (
    <div className={`absolute ${cls}`}>
      <div ref={v} className="absolute" style={{ width: 1, height: 0, background: "hsl(var(--accent) / 0.4)", [pos === "tr" ? "right" : "left"]: 0, top: pos === "tr" ? 0 : "auto", bottom: pos === "bl" ? 0 : "auto" }} />
      <div ref={h} className="absolute" style={{ height: 1, width: 0, background: "hsl(var(--accent) / 0.4)", [pos === "tr" ? "right" : "left"]: 0, top: pos === "tr" ? 0 : "auto", bottom: pos === "bl" ? 0 : "auto" }} />
    </div>
  );
};

export const Projects = () => {
  const featRef = useRef<HTMLDivElement>(null);
  const regRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (featRef.current) {
      gsap.fromTo(
        featRef.current,
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: featRef.current, start: "top 85%", once: true } },
      );
    }
    if (regRef.current) {
      gsap.fromTo(
        regRef.current.children,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: regRef.current, start: "top 85%", once: true } },
      );
    }
  }, []);

  return (
    <section id="projects" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-20">
      <SectionHeader number="// 004" title="PROJECTS" />

      <div
        ref={featRef}
        className="group relative grid grid-cols-1 border border-text-faint bg-bg-surface transition-all duration-300 hover:border-accent lg:grid-cols-[55%_45%]"
        style={{ borderLeftWidth: "0px" }}
        data-cursor="hover"
      >
        <div className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-200 group-hover:w-1" />
        <div className="relative p-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-mono text-accent" style={{ letterSpacing: "0.3em" }}>
            FEATURED
          </div>
          <h3 className="font-display text-[36px] font-bold text-text-primary transition-transform duration-200 group-hover:translate-x-2 md:text-[44px]">
            FocusFlow
          </h3>
          <div className="mt-1 font-body text-[16px] text-text-muted">Full-Stack Productivity SaaS</div>
          <p className="mt-4 max-w-prose font-body text-[15px] leading-[1.7]" style={{ color: "hsl(var(--text-primary) / 0.7)" }}>
            A real-time collaborative workspace with role-based Kanban boards, habit tracking, Pomodoro timer, and team
            invites — architected and shipped solo with Next.js 16, Firebase, and shadcn/ui.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {focusTech.map((t) => (
              <span
                key={t.label}
                className={`inline-block border px-3 py-1.5 font-mono text-[11px] ${
                  t.flagship ? "border-accent text-accent" : "border-text-faint text-text-primary"
                }`}
              >
                {t.label}
                {t.flagship && " ★"}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-6 font-mono text-[13px]">
            <a href="https://github.com/jayss005" target="_blank" rel="noreferrer" className="text-accent hover:underline" data-cursor="hover">GITHUB ↗</a>
            <a href="https://focusflow-gamma-six.vercel.app/" target="_blank" rel="noreferrer" className="text-accent hover:underline" data-cursor="hover">LIVE DEMO ↗</a>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden" style={{ background: "hsl(var(--bg-elevated))" }}>
          <img
            src={focusflowMockup}
            alt="FocusFlow productivity SaaS landing page screenshot"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <Bracket pos="tr" />
          <Bracket pos="bl" />
          <div className="absolute bottom-3 right-4 font-mono text-[9px]" style={{ color: "hsl(var(--accent))", textShadow: "0 0 8px hsl(0 0% 0% / 0.8)" }}>
            v1.0.0 · PRODUCTION
          </div>
        </div>
      </div>

      <div ref={regRef} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {["Project 02", "Project 03"].map((name) => (
          <div
            key={name}
            className="group relative border border-text-faint bg-bg-surface p-7 transition-all duration-200 hover:border-accent"
            style={{ background: "hsl(var(--bg-surface))" }}
            data-cursor="hover"
          >
            <div className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            <div className="mb-2 font-mono text-[10px] uppercase tracking-mono text-accent">IN PROGRESS</div>
            <h3 className="font-display text-[24px] font-bold text-text-primary transition-transform duration-200 group-hover:translate-x-1.5">
              Coming Soon: {name}
            </h3>
            <p className="mt-2 font-body text-[14px] text-text-muted">Details dropping soon.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["TBD", "TBD", "TBD"].map((t, i) => (
                <span key={i} className="inline-block border border-text-faint bg-bg-surface px-3 py-1 font-mono text-[11px] text-text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
