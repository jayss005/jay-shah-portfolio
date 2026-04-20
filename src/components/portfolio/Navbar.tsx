import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      const dy = y - lastY;
      if (Math.abs(dy) > 8) {
        setHidden(dy > 0 && y > 200);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-[80] h-16 transition-all duration-300"
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          background: scrolled ? "hsl(var(--bg-primary) / 0.92)" : "hsl(var(--bg-primary))",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid hsl(var(--${scrolled ? "border-subtle" : "border-subtle"}))`,
        }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-20">
          <button
            onClick={() => go("top")}
            className="font-display text-[18px] font-bold tracking-tight text-text-primary transition-colors duration-200 hover:text-accent"
            data-cursor="hover"
          >
            JAY SHAH
          </button>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative font-mono text-[12px] uppercase tracking-mono transition-colors duration-150"
                style={{ color: active === l.id ? "hsl(var(--accent))" : "hsl(var(--text-muted))" }}
                data-cursor="hover"
              >
                <span className="group-hover:text-text-primary transition-colors">{l.label}</span>
                <span
                  className="absolute -bottom-1 left-0 h-[1px] origin-left bg-accent transition-transform duration-200"
                  style={{ width: "100%", transform: active === l.id ? "scaleX(1)" : "scaleX(0)" }}
                />
                <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="group relative overflow-hidden border-2 border-accent px-5 py-2.5 font-mono text-[12px] font-bold tracking-mono text-accent"
              data-cursor="button"
            >
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-200 group-hover:translate-x-0" />
              <span className="relative transition-colors duration-200 group-hover:text-bg-primary">
                HIRE ME <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="relative h-8 w-8 md:hidden"
          >
            <span
              className="absolute left-0 top-2 block h-[2px] w-full bg-text-primary transition-transform duration-200"
              style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-4 block h-[2px] w-full bg-text-primary transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 top-6 block h-[2px] w-full bg-text-primary transition-transform duration-200"
              style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-bg-primary transition-all duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {links.map((l, i) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="font-display text-4xl font-extrabold text-text-primary transition-all duration-300 hover:text-accent"
            style={{
              transform: open ? "translateX(0)" : "translateX(-32px)",
              opacity: open ? 1 : 0,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
};
