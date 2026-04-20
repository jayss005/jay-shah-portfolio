import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/splitText";
import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 1, suffix: "+", label: "PRODUCTION SAAS" },
  { num: 9.49, suffix: "", label: "CGPA / 10", decimals: 2 },
  { num: 2, suffix: "", label: "CERTIFICATIONS" },
  { num: 3, suffix: "", label: "YEARS BUILDING" },
];

const StatBlock = ({ num, suffix, label, decimals = 0 }: { num: number; suffix: string; label: string; decimals?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(num);
      return;
    }
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: num,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => setVal(obj.v),
        });
      },
    });
  }, [num]);

  return (
    <div
      ref={ref}
      className="group flex-1 border border-border-subtle bg-bg-surface px-6 py-6 transition-all duration-200 hover:border-accent md:px-9"
      data-cursor="hover"
    >
      <div className="font-display text-[40px] font-extrabold leading-none text-accent transition-colors md:text-[48px]">
        {val.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-mono text-text-muted">{label}</div>
    </div>
  );
};

const QUOTE = "Full-stack by day. Shipping products by night.";

export const About = () => {
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (quoteRef.current) {
      const words = splitWords(quoteRef.current);
      words.forEach((w) => (w.style.color = "hsl(var(--text-faint))"));
      ScrollTrigger.create({
        trigger: quoteRef.current,
        start: "top 75%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (st) => {
          const progress = st.progress;
          words.forEach((w, i) => {
            const t = i / Math.max(1, words.length - 1);
            w.style.color = progress >= t ? "hsl(var(--text-primary))" : "hsl(var(--text-faint))";
          });
        },
      });
    }
    if (parasRef.current) {
      const ps = parasRef.current.querySelectorAll("p");
      gsap.fromTo(
        ps,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.2,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: parasRef.current, start: "top 80%", once: true },
        },
      );
    }
  }, []);

  return (
    <section id="about" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-20">
      <SectionHeader number="// 001" title="ABOUT" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[38%_62%]">
        <h3 ref={quoteRef} className="font-display text-[28px] font-bold leading-[1.2] md:text-[36px]">
          {QUOTE}
        </h3>
        <div ref={parasRef} className="space-y-6 font-body text-[16px] leading-[1.75]" style={{ color: "hsl(var(--text-primary) / 0.7)" }}>
          <p>
            I'm Jay — a full-stack developer from Pune, India. I build real-world products end-to-end, from Firebase
            backends to polished Next.js and React Native frontends.
          </p>
          <p>
            Currently in my 3rd year of B.Tech in Information Technology at Walchand Institute of Technology — CGPA
            9.49/10. I care about clean architecture, great UX, and code that actually ships.
          </p>
          <p>
            Outside of class, I build. FocusFlow is my flagship product — a real-time collaborative SaaS I architected
            solo. AWS certified. JPMorgan simulation completed.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col md:flex-row md:gap-0">
        {stats.map((s) => (
          <StatBlock key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
};
