import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

type Tag = { label: string; flagship?: boolean; cursor?: boolean };

const groups: { label: string; tags: Tag[] }[] = [
  {
    label: "LANGUAGES",
    tags: [
      { label: "JavaScript", flagship: true },
      { label: "TypeScript", flagship: true, cursor: true },
      { label: "Python" }, { label: "Java" }, { label: "HTML" }, { label: "CSS" },
    ],
  },
  {
    label: "FRAMEWORKS & LIBRARIES",
    tags: [
      { label: "Next.js", flagship: true, cursor: true },
      { label: "React", flagship: true },
      { label: "Firebase", flagship: true },
      { label: "Angular" }, { label: "Tailwind CSS" }, { label: "shadcn/ui" },
      { label: "Framer Motion" }, { label: "Expo" }, { label: "React Native" }, { label: "Spring Boot" },
    ],
  },
  {
    label: "BACKEND & DATABASE",
    tags: [
      { label: "Firebase Firestore", flagship: true, cursor: true },
      { label: "Firebase Auth", flagship: true },
      { label: "MySQL" }, { label: "REST APIs" },
    ],
  },
  {
    label: "TOOLS & PLATFORMS",
    tags: [
      { label: "Git", flagship: true, cursor: true },
      { label: "GitHub" }, { label: "VS Code" }, { label: "IntelliJ IDEA" },
      { label: "AWS (Cloud Arch.)" }, { label: "Vercel" },
    ],
  },
];

const SkillTag = ({ tag }: { tag: Tag }) => (
  <span
    data-cursor="hover"
    className={`group inline-flex items-center border px-4 py-2 font-mono text-[12px] transition-all duration-150 ${
      tag.flagship
        ? "border-accent bg-bg-surface text-accent hover:bg-accent/10"
        : "border-text-faint bg-bg-surface text-text-primary hover:border-border-bold hover:bg-bg-elevated"
    }`}
  >
    {tag.label}
    {tag.flagship && <span className="ml-1.5">★</span>}
    {tag.cursor && <span className="ml-1 blink text-accent">_</span>}
  </span>
);

export const Skills = () => {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!wrap.current) return;
    const groupEls = wrap.current.querySelectorAll<HTMLDivElement>("[data-group]");
    groupEls.forEach((g, gi) => {
      const tags = g.querySelectorAll("[data-tag]");
      gsap.fromTo(
        tags,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
          delay: gi * 0.15,
          scrollTrigger: { trigger: g, start: "top 85%", once: true },
        },
      );
    });
  }, []);

  return (
    <section id="skills" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-20">
      <SectionHeader number="// 002" title="SKILLS" />
      <div ref={wrap} className="space-y-12">
        {groups.map((g) => (
          <div key={g.label} data-group>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-mono text-text-muted" style={{ letterSpacing: "0.25em" }}>
              {g.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.tags.map((t) => (
                <span key={t.label} data-tag className="inline-block">
                  <SkillTag tag={t} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
