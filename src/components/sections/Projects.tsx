"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const projects = [
  {
    title: "MedLife",
    label: "⚡ HACKATHON — BUILT SOLO",
    link: "https://github.com/sufiyan733/MedLife",
    desc: "A medical application built solo during a high-stakes hackathon."
  },
  {
    title: "Twin",
    label: "PERSONAL PROJECT",
    link: "https://github.com/sufiyan733/twin",
    desc: "A personal initiative showcasing advanced full stack capabilities."
  },
  {
    title: "DSA Visuals",
    label: "🔴 LIVE — IN PROGRESS",
    link: "https://github.com/sufiyan733/DSA-VISUALS",
    desc: "Interactive visualizer for Data Structures and Algorithms."
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    const ctx = gsap.context(() => {
      if (!isMobile && scrollContainerRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        
        // Horizontal scroll setup
        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1),
            end: () => `+=${scrollContainerRef.current?.offsetWidth || window.innerWidth}`,
          }
        });

        // Flip in on enter
        cards.forEach((card) => {
          gsap.fromTo(card,
            { rotationY: 90, opacity: 0 },
            {
              rotationY: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById("horizontalScroll"), // Assuming we need a linked animation if we want it to trigger based on horizontal scroll, but standard ScrollTrigger with containerAnimation is tricky. Let's do it simply on scroll.
                start: "left center",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      } else {
        // Mobile fallback (vertical scroll)
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-bg overflow-hidden border-t border-white/5">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--red) 1px, transparent 1px), linear-gradient(90deg, var(--red) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="pt-20 md:pt-32 pb-10 px-6 md:px-12 relative z-10">
        <h2 className="font-bebas text-5xl md:text-8xl text-white">
          MISSIONS EXECUTED
        </h2>
      </div>

      <div ref={scrollContainerRef} className="flex flex-col md:flex-row md:w-[300vw] h-auto md:h-[80vh] px-6 md:px-12 pb-20 md:pb-0 gap-10 md:gap-0">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card md:w-screen h-[60vh] md:h-[70vh] flex items-center justify-center relative md:pr-12 perspective-[1000px] will-change-transform">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-full md:w-[80vw] bg-surface border border-white/10 border-t-red relative overflow-hidden flex flex-col justify-between p-8 md:p-12 transition-all duration-500 hover:scale-[1.02] hover:border-red hover:shadow-[0_0_30px_rgba(255,51,51,0.15)]"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <span className="font-space text-xs md:text-sm tracking-widest text-red bg-red/10 px-4 py-2 rounded-full border border-red/20">
                  {project.label}
                </span>
                <span className="font-space text-xs tracking-widest text-white/50 group-hover:text-white transition-colors flex items-center gap-2">
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">OPEN MISSION</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:text-red transition-colors"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>

              {/* Card Body */}
              <div className="mt-10 flex-grow">
                <h3 className="font-bebas text-5xl md:text-7xl text-white mb-4 group-hover:text-red transition-colors duration-500">{project.title}</h3>
                <p className="font-inter text-white/60 max-w-xl md:text-lg">{project.desc}</p>
              </div>

              {/* Card Background Decoration */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red rounded-full opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-700 pointer-events-none" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
