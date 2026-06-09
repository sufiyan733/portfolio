"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });

// Tiny hacker-style data stream component
const DataStream = () => {
  const [stream, setStream] = useState("");
  useEffect(() => {
    const chars = "0123456789ABCDEF";
    const interval = setInterval(() => {
      let str = "";
      for(let i=0; i<6; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      setStream(`SYS.MEM.${str}`);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return <div>{stream}</div>;
};

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const ayanokojiRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Cinematic Focus Pull & Lighting Reveal
      tl.to(lineRef.current, {
        scaleY: 1,
        duration: 1.5,
        ease: "expo.inOut"
      })
      
      // Title rises sharp, then blurs slightly (Focus pull)
      .fromTo(titleRef.current, {
        opacity: 0,
        y: "5%",
        clipPath: "inset(100% 0 0 0)",
        filter: "blur(0px)"
      }, {
        opacity: 1,
        y: "0%",
        clipPath: "inset(0% 0 0 0)",
        duration: 2.5
      }, "-=0.5")
      
      // Ayanokoji emerges blurred, then snaps to focus
      .fromTo(ayanokojiRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "brightness(0) blur(20px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: 3,
        ease: "power2.out"
      }, "-=2")
      
      // Push background out of focus
      .to(titleRef.current, {
        filter: "blur(4px)",
        opacity: 0.6,
        duration: 2
      }, "-=2")

      // Metadata fade
      .fromTo(".hero-meta", {
        opacity: 0,
        x: (i) => i % 2 === 0 ? -10 : 10
      }, {
        opacity: 1,
        x: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=2");

      // 2. Light Sheen across title
      gsap.fromTo(sheenRef.current, 
        { x: "-100%", skewX: -20 },
        { 
          x: "200%", 
          skewX: -20, 
          duration: 3, 
          ease: "power2.inOut", 
          repeat: -1, 
          repeatDelay: 5 
        }
      );

      // 3. Subtle Parallax & Focus Shift on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5); 
        const y = (e.clientY / innerHeight - 0.5);

        // Core parallax
        gsap.to(titleRef.current, { x: x * -15, y: y * -15, duration: 1.5, ease: "power2.out" });
        gsap.to(ayanokojiRef.current, { x: x * 10, y: y * 10, duration: 2, ease: "power2.out" });

        // Dynamic focus pull based on mouse Y position
        // When mouse is high, focus background. When low, focus foreground.
        const focusVal = Math.abs(y); // 0 to 0.5
        gsap.to(titleRef.current, { filter: `blur(${focusVal * 12}px)`, duration: 0.5 });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 4. Scroll Parallax - Smooth and heavy
      gsap.to(titleRef.current, {
        y: "-15%",
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      
      gsap.to(ayanokojiRef.current, {
        scale: 1.05,
        y: "15%",
        filter: "blur(2px)",
        scrollTrigger: { 
          trigger: container.current, 
          start: "top top", 
          end: "bottom top", 
          scrub: 1 
        }
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={container} className="relative h-[100svh] w-full bg-[#020202] overflow-hidden flex items-center justify-center">
      
      {/* Absolute center structural line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[30vh] md:h-[40vh] bg-gradient-to-b from-red/50 to-transparent origin-top scale-y-0 z-0" ref={lineRef} />

      {/* Layer 1: Subdued Particle Field & Premium Grain */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-screen pointer-events-none">
        <ParticleField />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      {/* Layer 2: Massive, Textured Typography with Light Sweep */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden select-none perspective-[1000px]">
        <h1 
          ref={titleRef} 
          className="relative font-bebas text-[45vw] text-[#0f0f13] leading-none tracking-tighter whitespace-nowrap opacity-0 transform-style-3d overflow-hidden"
        >
          <span className="relative z-10 mix-blend-difference text-white/5">SAIF</span>
          <span className="absolute inset-0 z-0 bg-clip-text text-transparent bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20">SAIF</span>
          
          {/* Volumetric Light Sheen */}
          <div ref={sheenRef} className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none" />
        </h1>
      </div>

      {/* Layer 3: Character with Flawless Gradient Mask */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[65vw] h-[85vh] md:h-[95vh] z-20 pointer-events-none flex justify-center items-end">
        <div 
          ref={ayanokojiRef} 
          className="relative w-full h-full will-change-transform opacity-0" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.05) 5%, black 30%)', 
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.05) 5%, black 30%)' 
          }}
        >
          {/* Ultra-subtle deep red backlight */}
          <div className="absolute inset-0 bg-red/5 blur-[120px] rounded-full scale-50 mix-blend-screen" />
          
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
          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col gap-1 text-white/40 mix-blend-difference">
            <span className="text-red/80 font-medium tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-red animate-ping rounded-full" />
              FULL STACK DEVELOPER
            </span>
            <span className="opacity-50">Based in</span>
            <span className="text-white/80">The Void</span>
          </div>

          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col gap-1 text-white/40 text-right items-end mix-blend-difference">
            <DataStream />
            <div className="w-[1px] h-12 bg-red/20 mt-4 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full bg-red origin-top animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Meta Area */}
        <div className="flex justify-between items-end w-full pb-8 md:pb-0">
          <div className="hero-meta max-w-xs font-inter text-sm font-light leading-relaxed text-white/50 mix-blend-difference">
            Cold logic. Clean code. Zero compromise.<br />
            <span className="text-white/80">Architecting systems that win.</span>
          </div>
          
          <div className="hero-meta font-space text-[10px] md:text-xs tracking-[0.3em] text-white/30 flex items-center gap-4 mix-blend-difference">
            <span>[ AWWWARDS LVL. ]</span>
          </div>
        </div>
      </div>

      {/* Extreme dark vignette to focus the center */}
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_200px_rgba(2,2,2,1)]" />

    </section>
  );
}
