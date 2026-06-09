<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md — SAIF Portfolio

## STACK
next: 16.2.7 · tailwindcss: ^4 · @tailwindcss/postcss: ^4

## TAILWIND V4
- NO tailwind.config.js — config lives in globals.css only
- globals.css: `@import "tailwindcss"` then `@theme { --color-red: #ff3333; ... }`
- postcss.config.mjs: `export default { plugins: { "@tailwindcss/postcss": {} } }`

## COLORS & FONTS (CSS vars, never hardcode)
--bg:#030303 · --surface:#0a0a0f · --red:#ff3333 · --glow:rgba(255,51,51,0.15) · --muted:#3d3d3d
Bebas Neue → headings · Inter → body · Space Mono → labels

## ANIMATION RULES — NEVER BREAK
- ONLY animate transform + opacity — never top/left/width/height
- Ease defaults: entrance power3.out · exit power3.in · scrub 1.2
- Durations: micro 0.4s · standard 0.7s · cinematic 1.2s · stagger 0.08s
- gsap.set() for initial states — never CSS on animated properties
- will-change: transform on targets, remove after animation completes
- All GSAP inside gsap.context() scoped to a ref — never global selectors
- Clean up: context.revert() + ScrollTrigger.kill() in every useEffect return
- SplitText: always split.revert() on unmount
- ScrollTrigger.refresh() after fonts + images load

## LENIS + GSAP SYNC (exact, no deviation)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
- One Lenis instance in root layout via context
- Zero native scroll listeners anywhere
- lenis.destroy() on unmount

## THREE.JS RULES
- frameloop="demand" always · invalidate() only on scene change
- Dispose geometry + material + texture on every unmount
- Desktop: 2000 particles max · Mobile: 500 particles max
- All Three.js components: dynamic(() => import(...), { ssr: false })

## PERFORMANCE CHECKLIST
- "use client" on every component using GSAP/Lenis/Three/framer
- next/image with priority on hero · loading="lazy" on rest
- No setTimeout/setInterval — GSAP ticker only
- No layout thrash — zero offsetHeight reads inside animation loops
- Fonts loaded before first animation plays
- ScrollTrigger instances killed on unmount

## STRUCTURE
app/layout.tsx → Lenis provider + cursor + loader
app/page.tsx → all sections in order
components/ui/ → Cursor · Loader · Navbar · ScrollProgress
components/sections/ → Hero · About · Skills · Projects · Offer · Contact · Footer
components/three/ → ParticleField · FloatingIcons
lib/gsap.ts → register all plugins once · lib/lenis.ts → init + sync
hooks/ → useGSAP · useLenis · useMousePosition · useReducedMotion

## AYANOKOJI
Path: /public/ayanokoji.png · transparent bg · 745x1024
filter: drop-shadow(0 0 60px rgba(255,30,30,0.5))
Float: gsap y:0→-20→0 · 3s · sine.inOut · repeat:-1 · yoyo:true
Scroll: drifts right + fades · ScrollTrigger scrub:1.2
Alt text: "The Strategist"

## VIBE
Cold. Precise. Cinematic. 60fps or bust. Every animation serves a purpose.
Dark like void. Sharp like blade. Red like intention.