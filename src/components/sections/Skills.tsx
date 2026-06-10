"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const FloatingIcons = dynamic(() => import("../three/FloatingIcons"), { ssr: false });

const skillsData = [
  { name: "NEXT.JS", class: "SYS_CORE" },
  { name: "REACT.JS", class: "SYS_FRONTEND" },
  { name: "TYPESCRIPT", class: "SYS_LOGIC" },
  { name: "NODE.JS", class: "SYS_BACKEND" },
  { name: "PYTHON", class: "SYS_BACKEND" },
  { name: "FASTAPI", class: "SYS_API" },
  { name: "GOLANG", class: "SYS_SYSTEMS" },
  { name: "POSTGRESQL", class: "SYS_DATABASE" }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip parallax on mobile — no mouse cursor
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gridRef.current.style.setProperty('--mouse-x', `${x}px`);
      gridRef.current.style.setProperty('--mouse-y', `${y}px`);
    }

    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(".parallax-title", {
        x: x * 15,
        y: y * 5,
        rotationY: x * 2,
        rotationX: -y * 2,
        ease: "power3.out",
        duration: 1.2
      });

      gsap.to(".parallax-panel", {
        x: -x * 8,
        y: -y * 4,
        ease: "power3.out",
        duration: 1.2
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header text entrance (Wireframe Fill)
      gsap.fromTo(".arsenal-char", {
        clipPath: "inset(100% 0% 0% 0%)",
      }, {
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Structural Lines X
      gsap.fromTo(".struct-line-x", {
        scaleX: 0,
      }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
        },
      });

      // Structural Lines Y
      gsap.fromTo(".struct-line-y", {
        scaleY: 0,
      }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Data items wipe in
      gsap.fromTo(".data-item", {
        opacity: 0,
        x: -20,
        clipPath: "inset(0 100% 0 0)",
      }, {
        opacity: 1,
        x: 0,
        clipPath: "inset(0 0% 0 0)",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 35%",
          scrub: 1,
        },
      });

      // Points fade in
      gsap.fromTo(".hud-point", {
        opacity: 0,
        scale: 0,
      }, {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Grid Cells Staggered Reveal
      gsap.fromTo(".skill-cell", {
        opacity: 0,
        clipPath: "inset(0% 100% 0% 0%)",
      }, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: {
          amount: 0.8,
          from: "random"
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen py-24 md:py-40 bg-bg overflow-hidden flex flex-col justify-center border-t border-white/5 z-10 selection:bg-red/20">

      {/* 3D Particles background — desktop only, too heavy for mobile GPUs */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen hidden md:block">
        <FloatingIcons />
      </div>

      {/* Ambient Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Vertical Background Watermark */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pointer-events-none z-0 mix-blend-overlay opacity-[0.03] select-none overflow-hidden">
        <h2 className="font-bebas text-[50vh] text-white leading-[0.8] tracking-tighter whitespace-nowrap -rotate-90 -translate-x-[30%]">
          SYSTEM_CORE
        </h2>
      </div>

      {/* Intricate Background Geometry (Rotating Radar) — desktop only */}
      <div className="absolute right-[-20%] top-[-10%] w-[1200px] h-[1200px] pointer-events-none z-0 opacity-[0.04] mix-blend-screen animate-[spin_180s_linear_infinite] hidden md:block">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-[0.1]">
          <circle cx="50" cy="50" r="48" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" stroke="var(--red)" strokeWidth="0.2" className="animate-pulse" />
          <path d="M50 0 L50 100 M0 50 L100 50" />
          <path d="M15 15 L85 85 M15 85 L85 15" strokeDasharray="2 4" />
          <rect x="20" y="20" width="60" height="60" className="animate-[spin_60s_linear_infinite_reverse] origin-center" strokeDasharray="4 4" />
          <rect x="35" y="35" width="30" height="30" className="animate-[spin_30s_linear_infinite] origin-center" stroke="var(--red)" />
        </svg>
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Cinematic Header Structure */}
        <div ref={headerRef} className="w-full relative mb-24 md:mb-40 flex flex-col pt-12 [perspective:1000px]">

          {/* Top Structural Line */}
          <div className="w-full h-[1px] bg-white/10 relative origin-left struct-line-x">
            <div className="absolute top-0 left-0 w-32 h-[1px] bg-red shadow-[0_0_15px_var(--red)] origin-left struct-line-x" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red/50 -translate-y-1/2 opacity-0 hud-point" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start mt-16 md:mt-24 gap-8 lg:gap-16">

            {/* Main Title Area (Monolithic Wipe Reveal) */}
            <div className="relative flex-1 parallax-title">
              <div className="font-space text-red/60 text-[10px] tracking-[0.4em] uppercase mb-10 flex items-center gap-4 data-item">
                <span className="w-1.5 h-1.5 bg-red/80 rounded-full animate-pulse shadow-[0_0_10px_var(--red)]" />
                [SYS_ARSENAL] // CORE_MODULES
              </div>

              <div className="relative">
                {/* Background Wireframe Layer */}
                <h2 className="font-bebas text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] text-transparent leading-[0.8] tracking-tighter uppercase select-none pointer-events-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
                  ARSENAL
                </h2>

                {/* Foreground Solid Layer (Wipes in on scroll) */}
                <h2 className="font-bebas text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] text-white leading-[0.8] tracking-tighter uppercase no-global-reveal absolute top-0 left-0 flex">
                  {"ARSENAL".split("").map((char, i) => (
                    <span key={i} className="arsenal-char block will-change-transform">
                      {char}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Precision Editorial Block */}
            <div className="parallax-panel flex flex-col justify-start max-w-sm w-full relative z-20 mt-8 lg:mt-0 lg:pt-8">
              
              <div className="flex flex-col data-item border-l border-white/5 pl-8 lg:pl-12 relative">
                {/* Accent Highlight */}
                <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-gradient-to-b from-red to-transparent shadow-[0_0_15px_var(--red)]" />
                <div className="absolute top-0 left-[-3px] w-1.5 h-1.5 bg-red shadow-[0_0_10px_var(--red)]" />

                <div className="font-space text-[10px] text-white/30 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                  [ ARCHITECTURAL_OVERVIEW ]
                </div>

                <h3 className="font-bebas text-4xl lg:text-5xl text-white leading-[0.9] tracking-tight mb-4">
                  PRECISION STACK <br/>
                  <span className="text-white/40">INTEGRATION</span>
                </h3>

                <p className="font-space text-[11px] text-white/40 leading-[1.8] uppercase tracking-[0.15em] mb-6">
                  Deploying cutting-edge rendering engines and structural frameworks to construct ruthless, high-performance interfaces.
                </p>

                {/* Strict Data Table */}
                <div className="flex flex-col w-full relative mt-4 md:mt-0">
                   {/* Top Line Accent */}
                   <div className="absolute -top-4 left-0 w-8 h-[1px] bg-red/30" />

                   <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-2 mb-4 sm:mb-2 gap-1 sm:gap-0">
                     <span className="font-space text-[9px] text-white/30 uppercase tracking-[0.4em]">Frontend_Logic</span>
                     <span className="font-bebas text-xl lg:text-2xl text-white tracking-widest">NEXT.JS / REACT</span>
                   </div>

                   <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-2 gap-1 sm:gap-0">
                     <span className="font-space text-[9px] text-white/30 uppercase tracking-[0.4em]">Motion_Physics</span>
                     <span className="font-bebas text-xl lg:text-2xl text-white tracking-widest">GSAP / WEBGL</span>
                   </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Structural Line */}
          <div className="w-full h-[1px] bg-white/10 relative mt-12 origin-right struct-line-x">
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-red/50 origin-right struct-line-x" />
            <div className="absolute top-0 left-0 w-1 h-3 bg-red -translate-y-full opacity-0 hud-point" />
          </div>

        </div>

        {/* HUD Data Grid with Mouse Tracking Spotlight */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            if (gridRef.current) {
              gridRef.current.style.setProperty('--mouse-x', `50%`);
              gridRef.current.style.setProperty('--mouse-y', `50%`);
            }
          }}
          className="skills-grid w-full relative group/grid grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 overflow-hidden"
        >

          {/* Spotlight for the Grid Borders (shines through the 1px gaps) */}
          <div className="absolute inset-0 z-0 opacity-0 md:group-hover/grid:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,51,51,0.8), transparent 40%)' }}
          />

          {/* Spotlight for the Cell Surfaces */}
          <div className="absolute inset-0 z-20 opacity-0 md:group-hover/grid:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
            style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)' }}
          />

          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-cell group min-h-[140px] sm:aspect-square md:aspect-auto md:h-[280px] relative overflow-hidden flex flex-col justify-between p-4 md:p-8 bg-[#050505] md:bg-[#030303] md:hover:bg-[#0a0a0f] transition-colors duration-500 cursor-crosshair z-10 border border-white/5 md:border-transparent"
            >

              {/* Dot Matrix Background - Always partially visible on mobile, full on desktop hover */}
              <div className="absolute inset-0 opacity-30 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:12px_12px] z-0" />

              {/* Scanline Effect on Hover */}
              <div className="absolute -top-full left-0 w-full h-[1px] bg-red opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-[280px] transition-all duration-1000 ease-linear pointer-events-none z-0 shadow-[0_0_10px_var(--red)]" />

              {/* Top Row */}
              <div className="flex justify-between items-start font-space text-[9px] md:text-[10px] tracking-widest relative z-10">
                <span className="text-white/60 md:text-white/20 md:group-hover:text-white/50 transition-colors duration-300">
                  // {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-red font-bold md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(255,51,51,0.5)] md:shadow-red/20">
                  [{skill.class}]
                </span>
              </div>

              {/* Main typography */}
              <div className="relative z-10 flex flex-col items-start mt-4 mb-4 md:mt-0 md:mb-0">
                <h3 className={`font-bebas text-white md:text-white/30 md:group-hover:text-white transition-colors duration-500 leading-[0.9] pr-2 break-normal w-full tracking-wide ${skill.name.length > 8
                    ? "text-3xl sm:text-4xl md:text-4xl lg:text-5xl"
                    : "text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
                  }`}>
                  {skill.name}
                </h3>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end relative z-10">
                <div className="w-1.5 h-1.5 bg-red md:bg-white/10 md:group-hover:bg-red shadow-[0_0_8px_rgba(255,51,51,0.8)] md:shadow-none md:group-hover:shadow-[0_0_10px_var(--red)] transition-all duration-300" />

                {/* Data Bars */}
                <div className="flex items-end gap-[2px] h-3 opacity-80 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-[2px] h-full bg-red animate-pulse-slow" style={{ animationDelay: '0ms' }} />
                  <div className="w-[2px] h-[60%] bg-red animate-pulse-slow" style={{ animationDelay: '150ms' }} />
                  <div className="w-[2px] h-[80%] bg-red animate-pulse-slow" style={{ animationDelay: '300ms' }} />
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 md:group-hover:border-red transition-colors duration-300 pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/0 md:group-hover:border-red transition-colors duration-300 pointer-events-none z-10" />

            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-space text-[10px] tracking-[0.4em] text-white/30 uppercase hud-element relative border-t border-white/10 pt-8 mt-16 md:mt-24 gap-6 md:gap-0">
          <div className="absolute left-0 -top-[1px] w-8 h-[1px] bg-red/50" />
          <div className="absolute right-0 -top-[1px] w-8 h-[1px] bg-red/50 hidden md:block" />

          <span className="flex items-center gap-4">
            <span className="opacity-50">ENTITIES_LOADED:</span>
            <span className="text-white">{skillsData.length}</span>
          </span>

          <span className="flex items-center gap-3 text-red/90 border border-red/20 px-4 py-2 bg-red/5">
            <span className="w-1.5 h-1.5 bg-red animate-pulse-slow shadow-[0_0_10px_var(--red)]" />
            SYSTEM_OPTIMIZED
          </span>
        </div>

      </div>
    </section>
  );
}
