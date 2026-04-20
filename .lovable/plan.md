
## Jay Shah — Brutalist Animated Developer Portfolio

A single-page, dark brutalist portfolio with a heavy GSAP-driven animation system. Acid green (#b8ff57) on near-black, zero rounding, zero shadows, depth via flat color steps.

### Tech & Libraries
- **GSAP + ScrollTrigger + SplitText** — master timeline, scroll-scrubbed reveals, word/char splits
- **Custom cursor** — pure React + requestAnimationFrame (lerp ring, instant dot)
- **Fonts** — Syne (display), Inter (body), JetBrains Mono (mono) via Google Fonts in `index.html`
- **Tailwind tokens** — extend `index.css` + `tailwind.config.ts` with the full brutalist palette as HSL tokens (`--bg-primary`, `--accent`, etc.) so all components use the design system

### Page Structure (single route `/`)
Single `Index.tsx` composing these sections in order:

1. **GlobalEffects** — fixed grain canvas overlay, scroll progress line (right edge), custom cursor
2. **LoadSequence** — 0→2600ms GSAP master timeline with green curtain split, gated by `sessionStorage`
3. **Navbar** — fixed, scroll-hide on down/show on up, blurred bg past 100px, IntersectionObserver active link, mobile full-screen overlay
4. **Hero** — left content stack (// PORTFOLIO, JAY SHAH 96px, green rule, tagline, CTAs, scroll cue) + right canvas panel (ASCII dot grid that "breathes", CRT scan line, corner coords). Includes the **glitch easter egg** on the name (random 15–25s timer, RGB split + slice shift + flicker)
5. **About // 001** — pull quote (scroll-scrubbed word color reveal #333→#e8e8e8) + 3 paragraphs + 4 stat blocks with count-up numbers
6. **Skills // 002** — 4 groups (Languages / Frameworks / Backend / Tools) with flagship ★ tags (green border) and one blinking-cursor featured tag per group
7. **Experience // 003** — vertical timeline with 8px square node, Soft Test Labs card with left green accent, bullets, tech chips
8. **Projects // 004** — FocusFlow featured card (engineering bracket corners that draw in, mockup panel with dot grid + watermark) + 2 "Coming Soon" placeholder cards
9. **Resume // 005** — terminal mock (traffic-light dots, typewriter effect on lines, blinking █) + right-side download CTA + cert chips
10. **Contact // 006** — centered (only centered section), giant rotated "JAY SHAH" watermark behind, char-drop heading animation, 3 contact links, footer with back-to-top

### Animation System
- **Master load timeline** runs once per session (sessionStorage flag)
- **Section entry pattern** — reusable hook `useSectionEntry` applies number→title→rule→content sequence via ScrollTrigger (`start: "top 80%", once: true`)
- **Scroll-scrub** — pull quote word colors tied to scroll progress
- **Custom cursor states** — default / hover (link/button) / text I-beam / button lock-on rect / click ripple, disabled below 768px and on `prefers-reduced-motion`
- **Reduced motion** — `gsap.matchMedia` short-circuits all timelines, content shown at final state

### Responsive
- ≥1280px full layout
- 768–1280px: hide right canvas panel, collapse 2-col layouts
- <768px: stacked, hamburger overlay nav, cursor disabled, ASCII/CRT hidden, animations simplified to fades

### Files to create/modify
- `index.html` — add Google Fonts (Syne, Inter, JetBrains Mono) + `cursor: none` on html (desktop only via media query)
- `src/index.css` — full design token overhaul (brutalist palette as HSL), grain keyframes, blink keyframes, base typography
- `tailwind.config.ts` — extend with `bg-primary/surface/elevated`, `border-subtle/bold`, `text-primary/muted/faint`, `accent`, `accent-dim`, `danger`; font families `display/body/mono`; new keyframes
- `src/lib/cursor.tsx` — `CustomCursor` component (rAF + lerp)
- `src/lib/grain.tsx` — `GrainOverlay` component
- `src/lib/scrollProgress.tsx` — right-edge scroll line
- `src/components/portfolio/` — `LoadSequence`, `Navbar`, `Hero`, `AsciiPanel`, `GlitchName`, `About`, `StatBlock`, `Skills`, `SkillTag`, `Experience`, `Projects`, `FeaturedCard`, `Resume`, `Terminal`, `Contact`, `Footer`
- `src/hooks/useSectionEntry.ts`, `useReducedMotion.ts`, `useActiveSection.ts`, `useCountUp.ts`
- `src/pages/Index.tsx` — composes all sections + global effects
- `package.json` — add `gsap` (uses free SplitText alternative or custom char/word splitter to avoid GSAP Club requirement)

### Notes
- I'll write a small `splitText` utility (chars/words → spans) instead of GSAP's paid SplitText plugin
- Resume download button links to a placeholder `/resume.pdf` (you can drop a real file into `public/` later)
- All personal data baked in exactly as specified
