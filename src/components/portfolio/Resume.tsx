import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "$ whoami",
  "jay-shah — full-stack developer, pune",
  "",
  "$ cat about.txt",
  "B.Tech IT · Walchand Institute · CGPA 9.49",
  "",
  "$ ls skills/",
  "nextjs/  firebase/  react-native/  typescript/  python/",
  "",
  "$ cat experience.txt",
  "SDE Intern @ Soft Test Labs — Jun–Jul 2025",
  "Spring Boot · Angular · MySQL",
  "",
  "$ ls projects/",
  "focusflow/  [project_02]/  [project_03]/",
  "",
  "$ status --hire",
  "✓ Available for internships",
  "✓ Open to full-time roles",
  "✓ Ready to ship",
  "",
  "$ ",
];

const Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ref.current.innerHTML = lines.map((l) => `<div>${l || "&nbsp;"}</div>`).join("");
      setDone(true);
      return;
    }
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const el = ref.current!;
        el.innerHTML = "";
        let li = 0;
        const typeLine = () => {
          if (li >= lines.length) {
            setDone(true);
            return;
          }
          const div = document.createElement("div");
          el.appendChild(div);
          const text = lines[li];
          if (!text) {
            div.innerHTML = "&nbsp;";
            li++;
            setTimeout(typeLine, 100);
            return;
          }
          let ci = 0;
          const tick = () => {
            div.textContent = text.slice(0, ci + 1);
            ci++;
            if (ci < text.length) setTimeout(tick, 18);
            else {
              li++;
              setTimeout(typeLine, 180);
            }
          };
          tick();
        };
        typeLine();
      },
    });
  }, []);

  return (
    <div className="border border-border-subtle" style={{ background: "hsl(0 0% 5%)" }}>
      <div className="flex h-10 items-center gap-2 border-b border-border-subtle px-4" style={{ background: "hsl(var(--bg-elevated))" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} />
        <span className="ml-3 font-mono text-[12px]" style={{ color: "hsl(0 0% 27%)" }}>
          jay@portfolio:~
        </span>
      </div>
      <div className="px-8 py-6">
        <div ref={ref} className="font-mono text-[14px] leading-[2.2] text-accent" />
        {done && <span className="blink inline-block h-[1em] w-[0.6em] align-middle bg-accent" />}
      </div>
    </div>
  );
};

export const Resume = () => {
  const [downloading, setDownloading] = useState(false);
  return (
    <section id="resume" className="relative mx-auto max-w-[1280px] px-6 py-32 md:px-20">
      <SectionHeader number="// 005" title="RESUME" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55%_45%]">
        <Terminal />
        <div>
          <h3 className="font-display font-extrabold leading-[1.05] text-text-primary" style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}>
            Grab my resume.
          </h3>
          <p className="mt-4 font-body text-[16px] text-text-muted">
            Everything above — but in a PDF. Updated May 2025.
          </p>
          <a
            href="/Jay_Shah_Resume.docx"
            download="Jay_Shah_Resume.docx"
            onClick={() => {
              setDownloading(true);
              setTimeout(() => setDownloading(false), 1200);
            }}
            data-cursor="button"
            className="group relative mt-10 block w-full overflow-hidden border-2 border-accent bg-accent px-6 py-5 text-center font-mono text-[14px] font-bold text-bg-primary transition-all duration-200 hover:-translate-y-[3px]"
          >
            <span className="absolute inset-0 translate-x-[-101%] bg-bg-primary transition-transform duration-200 group-hover:translate-x-0" />
            <span className="relative transition-colors duration-200 group-hover:text-accent">
              DOWNLOAD RESUME ↗
            </span>
          </a>
          <div className="mt-3 h-4 font-mono text-[10px] text-text-muted">
            {downloading && <span className="animate-fade-in">DOWNLOADING...</span>}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AWS — Cloud Architecting", "JPMorgan Chase — SWE Simulation"].map((c) => (
              <span key={c} className="border border-text-faint bg-bg-surface px-4 py-2 font-mono text-[12px] text-text-primary">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
