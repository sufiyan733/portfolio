"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

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

function SkillCard({ skill, index }: { skill: { name: string; class: string }; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    e.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-cell group min-h-[140px] sm:aspect-square md:aspect-auto md:h-[280px] relative flex flex-col justify-between p-4 md:p-8 bg-[#030303] border border-white/10 hover:border-red/50 transition-colors duration-500 cursor-crosshair focus:border-red active:scale-95 group-hover/grid:opacity-30 hover:!opacity-100 group-hover/grid:blur-[2px] hover:!blur-none"
    >
      {/* Glow and Depth - Shadow */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(255,51,51,0.2)] pointer-events-none" />

      {/* Flashlight Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,51,51,0.15), transparent 40%)"
        }}
      />
      
      {/* Ambient Grid with Shimmer Sweep */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:12px_12px] z-0 overflow-hidden">
         <motion.div 
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red/10 to-transparent skew-x-12"
         />
      </div>

      {/* Top Red Scan Line */}
      <div className="absolute top-0 left-0 h-[2px] bg-red w-0 group-hover:w-full transition-all duration-700 ease-[0.23,1,0.32,1] shadow-[0_0_10px_var(--red)] pointer-events-none z-10" />

      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Content Container with Z-translation for 3D pop */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none" style={{ transform: "translateZ(30px)" }}>
        {/* Top Row */}
        <div className="flex justify-between items-start font-space text-[9px] md:text-[10px] tracking-widest">
          <span className="text-white/40 group-hover:text-white transition-colors duration-500">
            // {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-red opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]">
            [{skill.class}]
          </span>
        </div>

        {/* Main typography */}
        <div className="flex flex-col items-start mt-4 mb-4 md:mt-0 md:mb-0">
          <h3 className={`font-bebas text-white/80 group-hover:text-white transition-all duration-700 ease-[0.23,1,0.32,1] origin-left leading-[0.9] pr-2 break-normal w-full tracking-wide group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,51,51,0.6)] ${
              skill.name.length > 8 ? "text-3xl sm:text-4xl md:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
            }`}>
            {skill.name}
          </h3>
        </div>

        {/* Bottom Row - Icon Reactions */}
        <div className="flex justify-between items-end">
          <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-red group-hover:shadow-[0_0_10px_var(--red)] transition-all duration-500" />
          
          <div className="flex items-end gap-[2px] h-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-[2px] h-full bg-red animate-pulse-slow" style={{ animationDelay: '0ms' }} />
            <div className="w-[2px] h-[60%] group-hover:h-[90%] transition-all duration-500 ease-out bg-red animate-pulse-slow" style={{ animationDelay: '150ms' }} />
            <div className="w-[2px] h-[80%] group-hover:h-full transition-all duration-500 ease-out bg-red animate-pulse-slow" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip parallax on mobile — no mouse cursor
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

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
    <section id="skills" ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen py-8 md:py-16 bg-bg overflow-hidden flex flex-col justify-center border-t border-white/5 z-10 selection:bg-red/20">

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
            {/* Vertical drop line */}
            <div className="absolute top-0 left-12 md:left-24 w-[1px] h-32 md:h-48 bg-gradient-to-b from-red/50 to-transparent origin-top struct-line-y" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start mt-16 md:mt-24 gap-8 lg:gap-16">

            {/* Main Title Area */}
            <div className="relative flex-1 parallax-title">
              <div className="font-space text-white/90 text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-8 inline-flex items-center gap-3 data-item border border-white/10 border-l-[3px] border-l-red bg-white/[0.03] px-4 py-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md w-max">
                <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse shadow-[0_0_10px_var(--red)]" />
                [SYS_ARSENAL] <span className="text-white/30 mx-1">//</span> CORE_MODULES
              </div>

              <div className="relative mt-2 flex">
                {/* Wireframe Outline Layer */}
                <h2 className="absolute top-0 left-0 font-bebas text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] leading-[0.8] tracking-tighter uppercase select-none pointer-events-none text-transparent opacity-30" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                  ARSENAL
                </h2>
                
                {/* Solid Fill Layer with Clip Path Animation */}
                <h2 className="font-bebas text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-white leading-[0.8] tracking-tighter uppercase select-none pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] flex relative z-10">
                  {"ARSENAL".split("").map((char, i) => (
                    <span key={i} className="arsenal-char inline-block">{char}</span>
                  ))}
                </h2>
              </div>

              {/* Strict Data Table Moved to Left */}
              <div className="flex flex-col w-full relative mt-4 md:mt-8 max-w-xl pl-1">
                 {/* Top Line Accent */}
                 <div className="absolute -top-6 left-0 w-12 h-[1px] bg-gradient-to-r from-red/50 to-transparent hidden md:block" />

                 <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-2 mb-4 sm:mb-3 gap-1 sm:gap-0 hover:border-red/40 transition-colors duration-500 group/row cursor-default">
                   <span className="font-space text-[9px] text-white/50 uppercase tracking-[0.4em] group-hover/row:text-red/60 transition-colors duration-500 flex items-center gap-2">
                     <span className="w-1 h-1 bg-red/0 group-hover/row:bg-red transition-colors duration-500" />
                     Frontend_Logic
                   </span>
                   <span className="font-bebas text-xl lg:text-2xl text-white tracking-widest group-hover/row:text-white group-hover/row:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500">NEXT.JS / REACT</span>
                 </div>

                 <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-2 gap-1 sm:gap-0 hover:border-red/40 transition-colors duration-500 group/row cursor-default">
                   <span className="font-space text-[9px] text-white/50 uppercase tracking-[0.4em] group-hover/row:text-red/60 transition-colors duration-500 flex items-center gap-2">
                     <span className="w-1 h-1 bg-red/0 group-hover/row:bg-red transition-colors duration-500" />
                     Backend_Systems
                   </span>
                   <span className="font-bebas text-xl lg:text-2xl text-white tracking-widest group-hover/row:text-white group-hover/row:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500">NODE.JS / FASTAPI</span>
                 </div>
              </div>
            </div>

            {/* Precision Editorial Block */}
            <div className="parallax-panel flex flex-col justify-start max-w-sm w-full relative z-20 mt-8 lg:mt-0 lg:pt-8">
              
              <div className="flex flex-col data-item border-l border-white/5 pl-8 lg:pl-12 relative group/editorial">
                {/* Accent Highlight */}
                <div className="absolute top-0 left-0 w-[2px] h-1/2 bg-gradient-to-b from-red to-transparent shadow-[0_0_15px_var(--red)] group-hover/editorial:h-[80%] transition-all duration-700 ease-out" />
                <div className="absolute top-0 left-[-2px] w-1.5 h-3 bg-red shadow-[0_0_10px_var(--red)]" />

                <div className="font-space text-[9px] md:text-[10px] text-white/80 tracking-[0.3em] uppercase mb-5 flex items-center gap-3 bg-white/[0.03] w-max px-3 py-1.5 border border-white/10 border-l-[3px] border-l-red backdrop-blur-sm relative overflow-hidden group/tag">
                  <div className="absolute inset-0 bg-red/10 -translate-x-full group-hover/tag:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="w-1.5 h-1.5 bg-red/80 animate-pulse-slow shadow-[0_0_8px_var(--red)] relative z-10" />
                  <span className="relative z-10">[ ARCHITECTURAL_OVERVIEW ]</span>
                </div>

                <h3 className="font-bebas text-4xl lg:text-6xl text-white leading-[0.9] tracking-tight mb-6 flex flex-col gap-1 relative">
                  <span className="opacity-90">PRECISION STACK</span>
                  <div className="flex items-center gap-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-red/60 drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]">
                      INTEGRATION
                    </span>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-red/50 to-transparent" />
                  </div>
                </h3>

                <p className="font-space text-[11px] text-white/60 leading-[2] uppercase tracking-[0.2em] mb-10 border-l-[3px] border-red pl-5 bg-gradient-to-r from-white/[0.02] to-transparent py-3 max-w-sm">
                  Deploying cutting-edge rendering engines and structural frameworks to construct ruthless, high-performance interfaces.
                </p>


              </div>
            </div>

          </div>

          {/* Bottom Structural Line */}
          <div className="w-full h-[1px] bg-white/10 relative mt-12 origin-right struct-line-x">
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-red/50 origin-right struct-line-x" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-red rounded-full -translate-y-1/2 opacity-0 hud-point shadow-[0_0_10px_var(--red)]" />
          </div>

        </div>

        {/* HUD Data Grid */}
        <div
          ref={gridRef}
          className="skills-grid w-full relative group/grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 [perspective:1200px]"
        >
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
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
