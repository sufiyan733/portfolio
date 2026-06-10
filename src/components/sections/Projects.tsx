"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  {
    id: "01",
    title: "MedLife",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://med-life-delta.vercel.app",
    desc: "A medical application built solo during a high-stakes hackathon. Architected for resilience and high-volume data streaming.",
    tech: "NEXT.JS / TS / DB"
  },
  {
    id: "02",
    title: "DSA Visuals",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://dsa-visuals-nine.vercel.app",
    desc: "Interactive visualizer for Data Structures and Algorithms. High-performance canvas rendering.",
    tech: "JS / ALGO / CANVAS"
  },
  {
    id: "03",
    title: "Twin",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://twin-l3hf.vercel.app",
    desc: "A personal initiative showcasing advanced full stack capabilities. Pure logic, built for mathematical precision.",
    tech: "REACT / NODE / API"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    // Wait for fonts + layout to settle before creating ScrollTrigger
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Reveal header
        gsap.fromTo(".projects-header", 
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );

        if (scrollContainerRef.current) {
          const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
          
          // Set initial states via gsap.set() — never CSS on animated properties
          panels.forEach((panel) => {
            const hud = panel.querySelector(".tactical-hud");
            if (hud) {
              gsap.set(hud, { y: mobile ? 40 : 100, opacity: 0, scale: mobile ? 1 : 0.95 });
            }
          });

          // Calculate precise scroll distance
          const totalScrollDistance = window.innerWidth * (panels.length - 1);
          
          // Master horizontal timeline
          const scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              // anticipatePin causes a visual jump on mobile when Lenis momentum
              // crosses the pin boundary — disable it on mobile entirely
              anticipatePin: mobile ? 0 : 1,
              // Higher scrub on mobile = smoother interpolation at the transition point
              // Lower values make it too responsive to touch jitter
              scrub: mobile ? 1.2 : 1,
              end: () => `+=${totalScrollDistance}`,
              invalidateOnRefresh: true,
              // Prevent Lenis momentum from overshooting past the pin start/end
              fastScrollEnd: mobile ? 3000 : false,
              // Prevent scroll position from snapping when address bar shows/hides
              preventOverlaps: true,
            }
          });

          // Intro animation for HUD cards (lighter on mobile)
          panels.forEach((panel) => {
            const hud = panel.querySelector(".tactical-hud");
            if (hud) {
              gsap.to(hud, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: mobile ? 0.8 : 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 85%",
                }
              });
            }
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimeout);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#020202] text-red overflow-hidden h-[100dvh] flex flex-col">
      
      {/* 1. FIXED HEADER — no backdrop-blur on mobile (GPU killer during pinned scroll) */}
      <div className="projects-header w-full h-40 md:h-48 pt-20 border-b border-red/30 bg-[#020202] md:bg-[#020202]/90 md:backdrop-blur-2xl flex flex-col justify-end px-6 md:px-16 pb-6 z-50 shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-end">
          <div>
            <div className="font-space text-[10px] tracking-widest text-red uppercase mb-2 flex items-center gap-3">
              <span className="w-2 h-2 bg-red animate-pulse shadow-[0_0_10px_rgba(255,51,51,1)]" />
              Terminal // Classified
            </div>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter text-white leading-none drop-shadow-lg">
              MISSIONS EXECUTED
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end font-space text-[10px] text-red/60 tracking-widest">
            <span className="animate-pulse">DATA_STREAM_ACTIVE</span>
            <span>UPLINK: SECURE</span>
          </div>
        </div>
      </div>

      {/* 2. HORIZONTAL SCROLL CONTAINER */}
      <div className="flex-1 relative overflow-hidden bg-[#020202]">
        
        {/* Global Tactical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

        <div ref={scrollContainerRef} className="flex h-full" style={{ width: `${projects.length * 100}vw` }}>
          {projects.map((project, idx) => (
            <div key={idx} className="project-panel w-screen h-full flex items-center justify-center p-4 md:p-12 relative border-r border-red/10 z-10 will-change-transform" style={{ backfaceVisibility: 'hidden' }}>
              
              {/* Massive Background Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[80vw] md:text-[60vw] leading-none text-transparent opacity-[0.03] z-0 pointer-events-none select-none" style={{ WebkitTextStroke: '2px #ff3333' }}>
                {project.id}
              </div>

              {/* Optimized Volumetric Center Glow (No CSS Blur) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.08),transparent_50%)] pointer-events-none z-0" />

              {/* TACTICAL HUD PANEL — clipPath on desktop only, border on mobile */}
              <div 
                className={`tactical-hud relative z-10 w-full max-w-6xl h-full max-h-[80vh] md:max-h-[75vh] p-[1px] bg-red/40 group/hud will-change-transform ${
                  isMobile 
                    ? "border border-red/40 rounded-sm" 
                    : "shadow-[0_0_50px_rgba(255,51,51,0.1)] hover:shadow-[0_0_80px_rgba(255,51,51,0.2)] hover:bg-red/60 transition-shadow duration-700"
                }`}
                style={!isMobile ? { clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))" } : undefined}
              >
                <div 
                  className={`w-full h-full bg-[#030303] flex flex-col relative overflow-hidden ${
                    isMobile ? "" : ""
                  }`}
                  style={!isMobile ? { clipPath: "polygon(0 0, calc(100% - 39px) 0, 100% 39px, 100% 100%, 39px 100%, 0 calc(100% - 39px))" } : undefined}
                >
                  
                  {/* Optimized Scanlines Overlay */}
                  <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.04)_2px,rgba(255,51,51,0.04)_4px)] pointer-events-none z-20 ${isMobile ? 'opacity-30' : 'opacity-50'}`} />
                  
                  {/* TOP BAR: Systems Info */}
                  <div className="h-12 shrink-0 border-b border-red/20 flex items-center justify-between px-4 md:px-6 bg-red/[0.05] z-10">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="w-3 h-3 border border-red flex items-center justify-center">
                        <span className={`w-1.5 h-1.5 bg-red ${isMobile ? '' : 'animate-[ping_2s_linear_infinite]'}`} />
                      </span>
                      <span className="font-space text-xs tracking-widest text-white/90">SYS.ID: {project.id}</span>
                    </div>
                    <div className="font-space text-[9px] md:text-[10px] tracking-widest text-red uppercase font-bold">
                      {project.label}
                    </div>
                  </div>

                  {/* MAIN CONTENT SPLIT */}
                  <div className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">
                    
                    {/* Left Side: Typography & Data */}
                    <div className={`w-full md:w-[60%] p-5 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-red/20 relative ${isMobile ? '' : 'bg-gradient-to-br from-red/[0.02] to-transparent'}`}>
                      {/* Corner Accents */}
                      <div className="absolute top-4 md:top-6 left-4 md:left-6 w-4 md:w-6 h-4 md:h-6 border-t-2 border-l-2 border-red/60" />
                      <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-red/60 hidden md:block" />
                      
                      <div className="pl-3 md:pl-4">
                        <div className="font-space text-[10px] text-red/60 tracking-[0.4em] mb-3 md:mb-4 uppercase">
                          Target_Designation
                        </div>
                        <h3 className={`font-bebas text-5xl md:text-8xl tracking-tighter text-white mb-4 md:mb-10 ${isMobile ? '' : 'group-hover/hud:text-red transition-colors duration-700'} drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]`}>
                          {project.title}
                        </h3>
                        <p className="font-inter font-light text-white/80 text-base md:text-xl leading-relaxed max-w-lg border-l-2 border-red/50 pl-4 md:pl-6 bg-gradient-to-r from-red/[0.08] to-transparent py-3 md:py-4">
                          {project.desc}
                        </p>
                      </div>

                      <div className="mt-8 font-space text-[10px] text-red/40 tracking-[0.3em] break-all hidden md:block px-4">
                        0x{Math.random().toString(16).substring(2, 10).toUpperCase()} // MEMORY_ALLOC // 0x{Math.random().toString(16).substring(2, 10).toUpperCase()} // SECURE
                      </div>
                    </div>

                    {/* Right Side: Tech & Action */}
                    <div className={`w-full md:w-[40%] p-5 md:p-14 flex flex-col justify-between relative ${isMobile ? '' : 'bg-gradient-to-tl from-red/[0.05] to-transparent'}`}>
                      {/* Corner Accents */}
                      <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-red/60 hidden md:block" />
                      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-red/60 hidden md:block" />

                      <div className="pr-0">
                        <div className="font-space text-[10px] text-red/60 tracking-[0.4em] mb-6 md:mb-8 uppercase text-left">
                          Tech_Parameters
                        </div>
                        <div className="flex flex-col gap-4 md:gap-6">
                          {project.tech.split(' / ').map((t, i) => (
                            <div key={i} className="flex items-center gap-4 group/tech">
                              <span className="font-space text-[10px] text-red/50 group-hover/tech:text-red transition-colors font-bold">[{i+1}]</span>
                              <div className={`flex-1 h-[1px] bg-red/20 ${isMobile ? '' : 'group-hover/tech:bg-red shadow-[0_0_10px_rgba(255,51,51,0)] group-hover/tech:shadow-[0_0_10px_rgba(255,51,51,1)] transition-all duration-500'}`} />
                              <span className="font-space text-sm tracking-[0.2em] text-white/80 group-hover/tech:text-white transition-colors">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 md:mt-12 group/btn relative w-full h-14 md:h-16 border border-red/40 flex items-center justify-between px-6 md:px-8 overflow-hidden bg-[#0a0a0a] hover:border-red transition-colors duration-500 shadow-[inset_0_0_20px_rgba(255,51,51,0.05)] hover:shadow-[inset_0_0_40px_rgba(255,51,51,0.2)]"
                        data-cursor="cta"
                      >
                        {/* Hardware scanning background */}
                        <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-red/20 to-red/40 group-hover/btn:w-full transition-all duration-500 ease-out" />
                        {/* Laser edge */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-red shadow-[0_0_20px_rgba(255,51,51,1)] group-hover/btn:opacity-100 opacity-50 transition-opacity" />
                        
                        <span className="font-space text-xs md:text-sm tracking-[0.3em] text-white uppercase relative z-10 font-bold group-hover/btn:tracking-[0.4em] transition-all duration-500">
                          Execute_Uplink
                        </span>
                        
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
