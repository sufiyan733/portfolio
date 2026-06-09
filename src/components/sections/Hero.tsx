"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const ayanokojiRef = useRef<HTMLDivElement>(null);
  const textBackRef = useRef<HTMLHeadingElement>(null);
  const textFrontRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${now.getMilliseconds().toString().padStart(3, '0')}`);
    }, 47); // weird interval for faster millis update
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Entry Sequence
      const tl = gsap.timeline();

      // HUD elements flicker in
      tl.fromTo(".hud-element", 
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.1, stagger: 0.05, ease: "none" }
      )
      // Glitch flash for HUD
      .to(".hud-element", {
        opacity: 0.2, duration: 0.05, yoyo: true, repeat: 3
      })
      
      // Giant Text slams in from the abyss
      .fromTo([textBackRef.current, textFrontRef.current], {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)"
      }, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "expo.out"
      }, "-=0.2")

      // Ayanokoji rises from the dark
      .fromTo(ayanokojiRef.current, {
        y: "20%",
        opacity: 0,
        scale: 0.95,
        filter: "brightness(0) contrast(200%)"
      }, {
        y: "0%",
        opacity: 1,
        scale: 1,
        filter: "brightness(1) contrast(100%)",
        duration: 2.5,
        ease: "power3.out"
      }, "-=1.5");

      // 2. Parallax & Mouse Interactivity
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

        // Parallax depth effect
        gsap.to(textBackRef.current, { x: x * -40, y: y * -40, duration: 1, ease: "power2.out" });
        gsap.to(textFrontRef.current, { x: x * -15, y: y * -15, duration: 1, ease: "power2.out" });
        gsap.to(ayanokojiRef.current, { x: x * 30, y: y * 10, duration: 1.5, ease: "power2.out" });
        
        // Tilt effect on HUD
        gsap.to(hudRef.current, { 
          rotationY: x * 10, 
          rotationX: -y * 10, 
          transformPerspective: 1000,
          duration: 1, 
          ease: "power2.out" 
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. Continuous Animations
      // Breathing aura around Ayanokoji
      gsap.to(".aura-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Glitch effect on the front text outline randomly
      const glitchText = () => {
        if (Math.random() > 0.7) {
          gsap.set(textFrontRef.current, { x: "+=10", y: "-=5", opacity: 0.5 });
          setTimeout(() => {
            gsap.set(textFrontRef.current, { x: "-=10", y: "+=5", opacity: 1 });
          }, 50);
        }
      };
      const glitchInterval = setInterval(glitchText, 2000);

      // Scroll Parallax
      gsap.to(textBackRef.current, {
        y: "-50%",
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(textFrontRef.current, {
        y: "-30%",
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.5 }
      });
      gsap.to(ayanokojiRef.current, {
        y: "20%",
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.2 }
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearInterval(glitchInterval);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={container} className="relative h-[100svh] w-full bg-bg overflow-hidden flex items-center justify-center">
      
      {/* Layer 1: Noise & Particles */}
      <ParticleField />
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
      
      {/* Layer 2: Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden select-none">
        <h1 ref={textBackRef} className="font-bebas text-[45vw] text-[#0a0a0f] leading-none tracking-tighter whitespace-nowrap will-change-transform">
          SAIF
        </h1>
      </div>

      {/* Layer 3: Tactical HUD (Reacts to mouse tilt) */}
      <div ref={hudRef} className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between transform-style-3d will-change-transform">
        
        {/* Top HUD */}
        <div className="flex justify-between items-start w-full">
          <div className="hud-element font-space text-[10px] md:text-xs text-red uppercase tracking-widest leading-relaxed">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red shadow-[0_0_10px_#ff3333] animate-pulse" />
              <span>[ INTEL_LINK_ESTABLISHED ]</span>
            </div>
            <div className="text-white/60">&gt; DESIGNATION: SAIF</div>
            <div className="text-white/60">&gt; CLASS: FULL STACK DEVELOPER</div>
            <div className="text-white/60">&gt; STATUS: LETHAL</div>
          </div>

          <div className="hud-element font-space text-[10px] md:text-xs text-white/50 text-right uppercase tracking-widest leading-relaxed flex flex-col items-end">
            <svg width="40" height="40" viewBox="0 0 100 100" className="mb-2 opacity-50 animate-spin-slow">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--red)" strokeWidth="1" strokeDasharray="10 5 2 5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="50 50" />
            </svg>
            <div>LAT: 28.6139° N</div>
            <div>LON: 77.2090° E</div>
            <div className="text-red mt-1">SYS_TIME: {time}</div>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="flex justify-between items-end w-full">
          <div className="hud-element font-space text-xs tracking-widest text-white/30 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-red/50" />
            <span>SCROLL TO DESCEND</span>
          </div>
          
          <div className="hud-element flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-8 bg-white/10" style={{ height: `${Math.random() * 30 + 10}px` }} />
            ))}
          </div>
        </div>

      </div>

      {/* Layer 4: Character & Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[70vw] h-[80vh] md:h-[95vh] z-30 pointer-events-none flex justify-center items-end">
        {/* Massive Red Aura */}
        <div className="aura-glow absolute bottom-0 w-[60%] h-[60%] bg-red/20 blur-[120px] rounded-full mix-blend-screen will-change-transform" />
        
        <div ref={ayanokojiRef} className="relative w-full h-full will-change-transform" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)', maskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }}>
          <Image 
            src="/ayanokoji.png" 
            alt="The Strategist" 
            fill 
            priority
            sizes="(max-width: 768px) 120vw, 70vw"
            className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(255,30,30,0.3)]"
          />
        </div>
      </div>

      {/* Layer 5: Front Interlocking Text Outline */}
      <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none overflow-hidden select-none">
        <h1 
          ref={textFrontRef} 
          className="font-bebas text-[45vw] text-transparent leading-none tracking-tighter whitespace-nowrap will-change-transform"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}
        >
          SAIF
        </h1>
      </div>

      {/* Layer 6: Cyber Vignette */}
      <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      
      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px', backgroundPosition: 'center center' }} />

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}</style>

    </section>
  );
}
