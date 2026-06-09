"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const ayanokojiRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Awwwards Entrance Timeline
      // Focus on extreme subtlety, tension, and precision.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Center Red Line Draws In
      tl.to(lineRef.current, {
        scaleY: 1,
        duration: 1.8,
        ease: "expo.inOut"
      })
      
      // 2. Ayanokoji materializes from the void (slowly)
      .fromTo(ayanokojiRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "brightness(0.2) contrast(150%) blur(10px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "brightness(1) contrast(110%) blur(0px)",
        duration: 3,
        ease: "power2.out"
      }, "-=0.6")

      // 3. Massive background title rises smoothly (Clip path reveal)
      .fromTo(titleRef.current, {
        opacity: 0,
        y: "10%",
        clipPath: "inset(100% 0 0 0)"
      }, {
        opacity: 0.8,
        y: "0%",
        clipPath: "inset(0% 0 0 0)",
        duration: 2.5,
        ease: "power4.out"
      }, "-=2.2")

      // 4. Subtle metadata / typography fades in perfectly sharp
      .fromTo(".hero-meta", {
        opacity: 0,
        y: 10
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1.5");

      // Extremely subtle mouse parallax (Maximum 10px movement for weight and premium feel)
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5); // -0.5 to 0.5
        const y = (e.clientY / innerHeight - 0.5);

        // Movement is minimal to retain elegance
        gsap.to(titleRef.current, { x: x * -10, y: y * -10, duration: 2, ease: "power2.out" });
        gsap.to(ayanokojiRef.current, { x: x * 8, y: y * 8, duration: 2.5, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Scroll Parallax - Smooth and heavy
      gsap.to(titleRef.current, {
        y: "-20%",
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.5 }
      });
      
      gsap.to(ayanokojiRef.current, {
        scale: 1.1,
        y: "10%",
        opacity: 0,
        filter: "blur(5px)",
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.2 }
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={container} className="relative h-[100svh] w-full bg-[#020202] overflow-hidden flex items-center justify-center">
      
      {/* Absolute center structural line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[30vh] md:h-[40vh] bg-red/30 origin-top scale-y-0 z-0" ref={lineRef} />

      {/* Layer 1: Subdued Particle Field & Premium Grain */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none">
        <ParticleField />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      {/* Layer 2: Massive, Elegant Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden select-none">
        <h1 
          ref={titleRef} 
          className="font-bebas text-[45vw] text-[#0f0f13] leading-none tracking-tighter whitespace-nowrap will-change-transform opacity-0"
        >
          SAIF
        </h1>
      </div>

      {/* Layer 3: Character with Flawless Gradient Mask */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[65vw] h-[85vh] md:h-[95vh] z-20 pointer-events-none flex justify-center items-end">
        <div 
          ref={ayanokojiRef} 
          className="relative w-full h-full will-change-transform opacity-0" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 5%, black 25%)', 
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 5%, black 25%)' 
          }}
        >
          {/* Faint Red Ambient Light */}
          <div className="absolute inset-0 bg-red/10 blur-[100px] rounded-full scale-75 opacity-50 mix-blend-screen" />
          
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

      {/* Layer 4: Minimalist Premium Typography (Foreground) */}
      <div className="absolute inset-0 z-30 pointer-events-none container mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-20 h-full">
        
        {/* Top Meta Area */}
        <div className="flex justify-between items-start w-full pt-16 md:pt-0">
          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col gap-1 text-white/40">
            <span className="text-red/80 font-medium tracking-[0.5em] mb-2">— FULL STACK DEVELOPER</span>
            <span>Based in</span>
            <span className="text-white/80">The Void</span>
          </div>

          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col gap-1 text-white/40 text-right">
            <span>Scroll</span>
            <div className="w-[1px] h-8 bg-red/40 self-end mt-2 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full bg-red origin-top animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Meta Area */}
        <div ref={metadataRef} className="flex justify-between items-end w-full pb-8 md:pb-0">
          <div className="hero-meta max-w-xs font-inter text-sm font-light leading-relaxed text-white/50">
            Cold logic. Clean code. Zero compromise.<br />
            <span className="text-white/80">Architecting systems that win.</span>
          </div>
          
          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] text-white/30 flex items-center gap-4">
            <span>[ AWWWARDS LVL. ]</span>
          </div>
        </div>
      </div>

      {/* Extreme dark vignette to focus the center */}
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_200px_rgba(2,2,2,1)]" />

    </section>
  );
}
