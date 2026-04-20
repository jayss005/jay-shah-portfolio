import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "@/lib/splitText";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "mailto:jaysshah235@gmail.com", text: "jaysshah235@gmail.com" },
  { href: "https://github.com/jayss005", text: "github.com/jayss005" },
  { href: "https://linkedin.com/in/jay-shah-045586358", text: "linkedin.com/in/jay-shah-045586358" },
];

export const Contact = () => {
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    [l1.current, l2.current].forEach((el, i) => {
      if (!el) return;
      const chars = splitChars(el);
      gsap.set(chars, { y: -80, rotation: -5, autoAlpha: 0 });
      gsap.to(chars, {
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        stagger: 0.06,
        duration: 0.6,
        ease: "power4.out",
        delay: i * 0.3,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    });
    if (subRef.current) {
      gsap.fromTo(
        subRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.4, scrollTrigger: { trigger: subRef.current, start: "top 85%", once: true } },
      );
    }
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { x: -24, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, stagger: 0.12, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: linksRef.current, start: "top 85%", once: true } },
      );
    }
  }, []);

  return (
    <section id="contact" className="relative mx-auto max-w-[1280px] overflow-hidden px-6 py-40 md:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-extrabold"
        style={{
          fontSize: "clamp(140px, 22vw, 280px)",
          color: "hsl(0 0% 6%)",
          transform: "rotate(-12deg)",
          whiteSpace: "nowrap",
        }}
      >
        JAY SHAH
      </div>

      <div className="relative text-center">
        <div ref={l1} className="font-display font-extrabold leading-[0.95] text-text-primary" style={{ fontSize: "clamp(48px, 8vw, 80px)" }}>
          Let's build
        </div>
        <div ref={l2} className="font-display font-extrabold leading-[0.95] text-text-primary" style={{ fontSize: "clamp(48px, 8vw, 80px)" }}>
          something.
        </div>
        <p ref={subRef} className="mx-auto mt-10 max-w-xl font-body text-[18px] text-text-muted">
          Open to internships, full-time roles, and interesting builds.
        </p>

        <div ref={linksRef} className="mx-auto mt-16 flex flex-col items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 font-mono text-[16px] transition-colors duration-200"
              style={{ color: "hsl(var(--text-primary) / 0.7)" }}
            >
              <span className="inline-block text-accent transition-transform duration-200 group-hover:translate-x-2">→</span>
              <span className="relative group-hover:text-accent">
                {l.text}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-32 flex flex-col items-start justify-between gap-4 font-mono text-[11px] md:flex-row" style={{ color: "hsl(var(--text-faint))" }}>
        <div>© 2025 Jay Shah. Built with obsession.</div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group transition-colors hover:text-accent"
          data-cursor="hover"
        >
          BACK TO TOP <span className="inline-block transition-transform group-hover:-translate-y-1">↑</span>
        </button>
      </footer>
    </section>
  );
};
