"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const projects = [
  {
    id: "01",
    title: "MedLife",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://med-life-delta.vercel.app",
    desc: "A medical application built solo during a high-stakes hackathon. Architected for resilience.",
    tech: "NEXT.JS / TS / DB"
  },
  {
    id: "02",
    title: "Twin",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://twin-l3hf.vercel.app",
    desc: "A personal initiative showcasing advanced full stack capabilities. Pure logic.",
    tech: "REACT / NODE / API"
  },
  {
    id: "03",
    title: "DSA Visuals",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://dsa-visuals-nine.vercel.app",
    desc: "Interactive visualizer for Data Structures and Algorithms. Mathematical precision.",
    tech: "JS / ALGO / CANVAS"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    const ctx = gsap.context(() => {
      if (!isMobile && scrollContainerRef.current) {
        const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
        
        // Master horizontal timeline
        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollContainerRef.current?.offsetWidth || window.innerWidth * 3}`,
          }
        });

        // Parallax internals for each panel
        panels.forEach((panel, i) => {
          // Giant background number parallax
          gsap.to(panel.querySelector(".bg-number"), {
            x: 200,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          });
          
          // Title parallax (moves faster than the panel)
          gsap.fromTo(panel.querySelector(".project-title"), 
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
                end: "center center",
                scrub: true
              }
            }
          );
        });
      } else {
        // Mobile fallback
        const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 70%"
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#020202] overflow-hidden text-white">
      
      {/* Title Overlay fixed during pin */}
      <div className="absolute top-10 md:top-20 left-6 md:left-12 z-20 pointer-events-none mix-blend-difference">
        <div className="font-space text-[10px] md:text-xs tracking-[0.4em] text-red mb-2 uppercase">
           Classification: Classified
        </div>
        <h2 className="font-bebas text-4xl md:text-6xl tracking-tighter text-white">
          MISSIONS EXECUTED
        </h2>
      </div>

      <div ref={scrollContainerRef} className="flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-[100svh]">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="project-panel w-full md:w-screen h-[80vh] md:h-screen flex items-center justify-center relative border-r border-white/5"
          >
            {/* Giant Background Number Parallax Layer */}
            <div className="bg-number absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
              <span className="font-bebas text-[80vw] md:text-[50vw] leading-none text-transparent opacity-30" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
                {project.id}
              </span>
            </div>

            <div className="container mx-auto px-6 md:px-24 flex flex-col justify-center h-full relative z-10 w-full mt-20 md:mt-0">
              
              {/* Project Layout */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-8 md:gap-0">
                
                {/* Left Side: Title & Description */}
                <div className="flex flex-col max-w-3xl">
                  <span className="font-space text-xs md:text-sm tracking-[0.3em] text-white/40 mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-red animate-pulse" />
                    {project.label}
                  </span>
                  
                  <h3 className="project-title font-bebas text-[18vw] md:text-[12vw] leading-[0.8] tracking-tighter text-white hover:text-red transition-colors duration-500 cursor-default">
                    {project.title}
                  </h3>
                  
                  <p className="font-inter font-light text-white/50 text-sm md:text-lg mt-8 max-w-xl leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Right Side: Meta & Action */}
                <div className="flex flex-col items-start md:items-end gap-6 md:pb-6">
                  <div className="font-space text-[10px] md:text-xs tracking-[0.3em] text-white/30 text-left md:text-right">
                    STACK_OVERVIEW<br/>
                    <span className="text-white/60">{project.tech}</span>
                  </div>
                  
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 border border-white/20 hover:border-red bg-white/5 hover:bg-red/10 px-8 py-4 transition-all duration-300"
                    data-cursor="eye"
                  >
                    <span className="font-space text-xs tracking-[0.2em] text-white group-hover:text-red transition-colors">
                      INITIALIZE_DEPLOYMENT
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-red transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white group-hover:border-red transition-colors" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white group-hover:border-red transition-colors" />
                  </a>
                </div>

              </div>
            </div>

            {/* Subtle red bottom gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-red/5 to-transparent pointer-events-none opacity-50" />
          </div>
        ))}
      </div>
    </section>
  );
}
