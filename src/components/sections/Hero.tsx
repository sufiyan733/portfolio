"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";

const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });

// Typewriter — uses setInterval only (no nested setTimeout)
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const ticker = setInterval(() => {
        i++;
        setDisplayedText(text.slice(0, i));
        if (i >= text.length) clearInterval(ticker);
      }, 40);
      return () => clearInterval(ticker);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <span>
      {displayedText}
      <span className={`inline-block w-[2px] h-3 ml-1 bg-red ${started ? "animate-pulse" : "opacity-0"}`} />
    </span>
  );
};

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const ayanokojiRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollDescendRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Structural line reveal
      tl.to(lineRef.current, {
        scaleY: 1,
        duration: 1.2,
        ease: "expo.inOut",
      })

      // Title reveal: clip-path stagger
      .fromTo(".hero-title-char", {
        clipPath: "inset(0 100% 0 0)",
      }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      }, "-=0.5")

      // Ayanokoji emerges — opacity + scale only
      .fromTo(ayanokojiRef.current, {
        opacity: 0,
        scale: 1.04,
      }, {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "power2.out",
      }, "-=1")

      // Metadata fade
      .fromTo(".hero-meta", {
        opacity: 0,
        y: 10,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=1.5");

      // 3. Scroll to Descend pulse
      gsap.fromTo(scrollDescendRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );

      // 4. Ayanokoji Idle float — smaller on mobile for less compositing
      const floatTween = gsap.to(ayanokojiRef.current, {
        y: isMobile ? -10 : -18,
        duration: isMobile ? 2.5 : 1.75,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // 5. Mouse parallax — desktop only
      if (!isMobile) {
        const xTo = gsap.quickTo(titleContainerRef.current, "x", { duration: 1.5, ease: "power2.out" });
        const yTo = gsap.quickTo(titleContainerRef.current, "y", { duration: 1.5, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX / window.innerWidth - 0.5;
          const y = e.clientY / window.innerHeight - 0.5;
          xTo(x * -15);
          yTo(y * -15);
        };

        window.addEventListener("mousemove", handleMouseMove);
      }

      // 6. Scroll Parallax
      gsap.to(titleContainerRef.current, {
        y: "-15%",
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      // Ayanokoji scroll
      gsap.to(ayanokojiRef.current, {
        y: isMobile ? 80 : 150,
        scale: 0.95,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          onEnter: () => floatTween.pause(),
          onLeaveBack: () => floatTween.resume(),
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  const titleText = "SUFIYAN";

  return (
    <section id="hero" ref={container} className="relative h-[100svh] w-full bg-[#020202] overflow-hidden flex items-center justify-center">

      {/* Structural line with glowing tip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[30vh] md:h-[40vh] bg-gradient-to-b from-red/50 to-transparent origin-top scale-y-0 z-0" ref={lineRef}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[15px] bg-red blur-[2px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-white rounded-full" />
      </div>

      {/* Particle Field — desktop only, it's too heavy for mobile GPUs */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-screen pointer-events-none hidden md:block">
        <ParticleField />
      </div>

      {/* Deep Red Radial Glow — use opacity gradient on mobile instead of blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(255,51,51,0.12)_0%,transparent_70%)] md:bg-red/10 md:blur-[120px]" />

      {/* Layer 2: Large background SUFIYAN text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden select-none">
        <h1
          ref={titleContainerRef}
          className="relative font-bebas text-[35vw] leading-none tracking-tighter whitespace-nowrap overflow-hidden flex will-change-transform"
        >
          {titleText.split("").map((char, i) => (
            <span 
              key={i} 
              className="hero-title-char relative inline-block text-white/[0.12]" 
              style={{ 
                clipPath: "inset(0 100% 0 0)",
                WebkitTextStroke: '2px rgba(255,255,255,0.1)'
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Layer 3: Ayanokoji */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[65vw] h-[85vh] md:h-[95vh] z-20 flex justify-center items-end">
        <div
          ref={ayanokojiRef}
          className="relative w-full h-full will-change-transform opacity-0"
          style={{
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.05) 5%, black 30%)",
            maskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.05) 5%, black 30%)",
          }}
        >
          {/* Ambient glow — radial gradient on mobile, blur on desktop */}
          <div className="absolute inset-0 rounded-full scale-50 mix-blend-screen bg-[radial-gradient(circle,rgba(255,51,51,0.08)_0%,transparent_60%)] md:bg-red/5 md:blur-[80px] md:animate-pulse-slow" />
          <Image
            src="/ayanokoji.png"
            alt="The Strategist"
            fill
            priority
            sizes="(max-width: 768px) 120vw, 65vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Layer 4: Meta text */}
      <div className="absolute inset-0 z-30 pointer-events-none container mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-20 h-full">
        <div className="flex justify-between items-start w-full pt-16 md:pt-0">
          {/* MOBILE VIEW METADATA (from commit b47598c) */}
          <div className="hero-meta font-space text-[10px] tracking-[0.3em] uppercase flex flex-col gap-0.5 text-white/40 md:hidden">
            <span className="text-red/80 font-medium tracking-[0.5em] leading-tight flex items-center gap-2"><span className="w-1 h-1 bg-red rounded-full shrink-0" />FULL STACK</span>
            <span className="text-red/80 font-medium tracking-[0.5em] leading-tight pl-3">DEVELOPER</span>
          </div>
          <div className="hero-meta font-space text-[10px] tracking-[0.3em] uppercase flex flex-col gap-1 text-white/40 text-right items-end md:hidden">
            <span className="opacity-50">Based in</span>
            <span className="text-white/80">India</span>
            <div className="w-[1px] h-12 bg-red/20 mt-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-red origin-top animate-pulse" />
            </div>
          </div>

          {/* PC VIEW METADATA (current) */}
          <div className="hero-meta font-space text-xs tracking-[0.3em] uppercase hidden md:flex flex-col gap-1 text-white/40">
            <span className="opacity-50">Based in</span>
            <span className="text-white/80">India</span>
          </div>
          <div className="hero-meta font-space text-xs tracking-[0.3em] uppercase hidden md:flex flex-col gap-1 text-white/40 text-right items-end">
            <span className="text-red/80 font-medium tracking-[0.5em] mb-2 flex items-center justify-end gap-2">
              <span className="w-1 h-1 bg-red rounded-full animate-ping" />
              FULL STACK DEVELOPER
            </span>
            <div className="w-[1px] h-12 bg-red/20 mt-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-red origin-top animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end w-full pb-8 md:pb-0">
          <div className="hero-meta max-w-xs font-inter text-sm font-light leading-relaxed text-white/50">
            <TypewriterText text="Cold logic. Clean code. Zero compromise. Architecting systems that win." delay={2} />
          </div>
          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] text-white/30 flex items-center gap-4">
            <span>[ AI ENTHUSIAST ]</span>
          </div>
        </div>
      </div>

      {/* Scroll to Descend */}
      <div ref={scrollDescendRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-space text-[10px] tracking-[0.4em] text-white/60">
        SCROLL TO DESCEND
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_200px_rgba(2,2,2,1)]" />

    </section>
  );
}
