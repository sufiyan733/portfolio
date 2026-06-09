"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const FloatingIcons = dynamic(() => import("../three/FloatingIcons"), { ssr: false });

const skillCategories = [
  { id: "01", title: "FRONTEND CORE", tech: "React.js • Next.js 14 • TypeScript" },
  { id: "02", title: "STYLING & UI", tech: "Tailwind CSS • CSS Modules • Radix" },
  { id: "03", title: "ANIMATION & 3D", tech: "GSAP • Lenis • Three.js • R3F" },
  { id: "04", title: "BACKEND & DB", tech: "Node.js • PostgreSQL • MongoDB" },
  { id: "05", title: "ARCHITECTURE", tech: "REST APIs • Server Actions • Vercel" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgText1Ref = useRef<HTMLDivElement>(null);
  const bgText2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Title Reveal (Elegant, slow mask reveal)
      gsap.fromTo(".arsenal-char", {
        y: "110%",
        rotationZ: 5
      }, {
        y: "0%",
        rotationZ: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".arsenal-title-container",
          start: "top 80%",
        }
      });

      // 2. Tactical List Wipes In
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row, {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          }
        });
      });

      // 3. Heavy Parallax on Background Typography based on scroll
      gsap.to(bgText1Ref.current, {
        x: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(bgText2Ref.current, {
        x: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative min-h-[100svh] py-32 bg-[#020202] overflow-hidden flex flex-col justify-center">
      
      {/* Deep Background 3D Icons */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <FloatingIcons />
      </div>

      {/* Massive Scroll-tied Typography Layer */}
      <div className="absolute inset-0 flex flex-col justify-center gap-20 pointer-events-none select-none z-0 opacity-40 overflow-hidden">
        <div ref={bgText1Ref} className="font-bebas text-[20vw] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] translate-x-[10%]">
          ENGINEERING ARCHITECTURE SYSTEM
        </div>
        <div ref={bgText2Ref} className="font-bebas text-[20vw] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] -translate-x-[20%]">
          DEPLOYMENT PERFORMANCE SCALE
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-8">
          <div className="arsenal-title-container overflow-hidden">
            <h2 className="font-bebas text-7xl md:text-[9rem] text-white leading-[0.85] tracking-tighter flex">
              {"ARSENAL".split("").map((char, i) => (
                <span key={i} className="arsenal-char block will-change-transform translate-y-full origin-bottom-left">
                  {char}
                </span>
              ))}
            </h2>
          </div>
          
          <div className="font-space text-xs tracking-[0.3em] text-white/40 uppercase max-w-xs mt-8 md:mt-0 leading-relaxed text-right">
            Technologies weaponized for flawless execution.
          </div>
        </div>

        {/* Tactical List */}
        <div className="w-full flex flex-col group/list">
          {skillCategories.map((cat, i) => (
            <div 
              key={cat.id}
              ref={el => { rowsRef.current[i] = el; }}
              className="group relative flex flex-col md:flex-row md:items-center py-8 md:py-12 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-default"
            >
              {/* Background Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Column 1: ID */}
              <div className="w-full md:w-1/4 font-space text-xs md:text-sm tracking-[0.4em] text-white/30 group-hover:text-red transition-colors duration-500 mb-4 md:mb-0">
                [ {cat.id} ]
              </div>
              
              {/* Column 2: Category */}
              <div className="w-full md:w-1/3 font-inter font-light text-xl md:text-3xl tracking-wide text-white/70 group-hover:text-white transition-colors duration-500 mb-2 md:mb-0 transform group-hover:translate-x-2 transition-transform">
                {cat.title}
              </div>
              
              {/* Column 3: Stack */}
              <div className="w-full md:w-5/12 flex justify-start md:justify-end">
                <span className="font-space text-sm md:text-base tracking-widest text-white/40 uppercase group-hover:text-white/80 transition-colors duration-500">
                  {cat.tech}
                </span>
              </div>
              
            </div>
          ))}
        </div>
        
        {/* Footer of Arsenal */}
        <div className="flex justify-between items-center mt-12 font-space text-[10px] tracking-[0.3em] text-white/30 uppercase">
          <span>{skillCategories.length} CLASSIFICATIONS</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red animate-pulse" />
            SYSTEM_STABLE
          </span>
        </div>

      </div>

    </section>
  );
}
