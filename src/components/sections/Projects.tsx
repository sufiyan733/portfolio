"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  {
    tag: "SaaS",
    title: "MULTITENANT",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://www.multiitenant.com",
    problem: "A multi-tenant SaaS booking platform built solo for local businesses — salons, clinics, gyms, tutors.",
    outcomes: [
      "Tenant-isolated subdomains and dashboards",
      "Razorpay-powered subscriptions & bookings",
      "One codebase scaling to infinite tenants"
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "TanStack Query/Table", "Zod", "Zustand"] },
      { label: "Backend", items: ["Drizzle ORM", "PostgreSQL", "Better Auth", "Razorpay", "Resend"] }
    ],
    images: ["mt1", "mt2", "mt3", "mt4"]
  },
  {
    tag: "SaaS",
    title: "FREELANCEOS",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://freelance-os-iota.vercel.app",
    problem: "An all-in-one business OS built solo for Indian freelancers — client management, GST-compliant invoicing, payment tracking, and a magic-link client portal in one place.",
    outcomes: [
      "Replaces five disconnected tools with one",
      "India-first compliance from day one"
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "TanStack Query/Table", "Zod", "Zustand"] },
      { label: "Backend", items: ["PostgreSQL", "Prisma ORM", "BetterAuth", "Redis", "Brevo", "UploadThing"] }
    ],
    images: ["fr1", "fr2", "fr3", "fr4"]
  },
  {
    tag: "Hackathon",
    title: "MedLife",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://med-life-delta.vercel.app",
    problem: "A medical application built solo during a high-stakes hackathon.",
    outcomes: [
      "Architected for resilience",
      "High-volume data streaming"
    ],
    techList: ["Next.js", "TypeScript", "Database"],
    images: ["ml1", "ml2", "ml3", "ml4"]
  },
  {
    tag: "Hobby",
    title: "VisuoSlayer",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://dsa-visuals-nine.vercel.app",
    problem: "Interactive visualizer for Data Structures and Algorithms.",
    outcomes: [
      "High-performance canvas rendering"
    ],
    techList: ["JavaScript", "Algorithms", "Canvas API"],
    images: ["vs1", "vs2", "vs3", "vs4"]
  },
  {
    tag: "Hobby",
    title: "Twin",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://twin-l3hf.vercel.app",
    problem: "A mobile-only application built in Next.js and wrapped as a PWA, showcasing advanced full stack capabilities.",
    outcomes: [
      "Pure logic, built for mathematical precision"
    ],
    techList: ["React", "Node.js", "REST API"],
    images: ["tw1", "tw2", "tw3", "tw4"]
  }
];

const ProjectCard = ({ project, idx, isMobile }: { project: any, idx: number, isMobile: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const sysId = String(idx + 1).padStart(2, '0');

  const getHash = (str: string) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    return Math.abs(h).toString(16).padStart(8, '0').toUpperCase();
  };
  const hexAlloc = getHash(project.title);
  const hexSec = getHash(project.title + "SECURE");

  return (
    <div className="project-panel w-screen h-[100dvh] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-32 pb-4 md:pb-8 relative border-r border-red/10 z-10 will-change-transform overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ backfaceVisibility: 'hidden' }}>

      {/* Massive Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[80vw] md:text-[60vw] leading-none text-transparent opacity-[0.03] z-0 pointer-events-none select-none" style={{ WebkitTextStroke: '2px #ff3333' }}>
        {sysId}
      </div>

      {/* Optimized Volumetric Center Glow (No CSS Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.08),transparent_50%)] pointer-events-none z-0" />

      {/* TACTICAL HUD PANEL */}
      <div
        className={`tactical-hud relative z-10 w-full max-w-[1400px] h-auto md:h-[520px] lg:h-[580px] p-[1px] my-auto bg-red/40 group/hud will-change-transform ${isMobile
            ? "border border-red/40 rounded-sm"
            : "shadow-[0_0_50px_rgba(255,51,51,0.1)] hover:shadow-[0_0_80px_rgba(255,51,51,0.2)] hover:bg-red/60 transition-shadow duration-700"
          }`}
        style={!isMobile ? { clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))" } : undefined}
      >
        <div
          className={`w-full h-full bg-[#030303] flex flex-col relative overflow-hidden ${isMobile ? "" : ""
            }`}
          style={!isMobile ? { clipPath: "polygon(0 0, calc(100% - 39px) 0, 100% 39px, 100% 100%, 39px 100%, 0 calc(100% - 39px))" } : undefined}
        >

          {/* Fixed HUD Corner Brackets */}
          <div className="absolute top-16 left-6 w-6 h-6 border-t-2 border-l-2 border-red/60 z-30 hidden md:block pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-red/60 z-30 hidden md:block pointer-events-none" />
          <div className="absolute top-16 right-6 w-6 h-6 border-t-2 border-r-2 border-red/60 z-30 hidden md:block pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-red/60 z-30 hidden md:block pointer-events-none" />

          {/* Optimized Scanlines Overlay */}
          <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.04)_2px,rgba(255,51,51,0.04)_4px)] pointer-events-none z-20 ${isMobile ? 'opacity-30' : 'opacity-50'}`} />

          {/* TOP BAR: Systems Info */}
          <div className="h-12 shrink-0 border-b border-red/20 flex items-center justify-between px-4 md:px-6 bg-red/[0.05] z-10">
            <div className="flex items-center gap-3 md:gap-4">
              <span className="w-3 h-3 border border-red flex items-center justify-center">
                <span className={`w-1.5 h-1.5 bg-red ${isMobile ? '' : 'animate-[ping_2s_linear_infinite]'}`} />
              </span>
              <span className="font-space text-xs tracking-widest text-white/90">SYS.ID: {sysId}</span>
            </div>
            <div className="font-space text-[9px] md:text-[10px] tracking-widest text-red uppercase font-bold">
              {project.label}
            </div>
          </div>

          {/* MAIN CONTENT SPLIT (Content-driven height) */}
          <div className="w-full h-full relative z-10 overflow-hidden flex-1">
            <div className="flex flex-col md:flex-row h-full items-stretch">

              {/* Left Side: Typography & Data */}
              <div className={`w-full md:w-[50%] lg:w-[60%] p-4 md:p-6 lg:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-red/20 relative ${isMobile ? '' : 'bg-gradient-to-br from-red/[0.02] to-transparent'}`}>

                <div className="pl-3 md:pl-4 mb-4">
                  <h3 className={`font-bebas text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white mb-4 flex items-start gap-3 ${isMobile ? '' : 'group-hover/hud:text-red transition-colors duration-700'} drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]`}>
                    {project.title}
                    <span className="px-2.5 py-0.5 mt-1 border border-red/30 bg-red/10 text-[10px] md:text-[11px] lg:text-xs font-space text-red tracking-widest uppercase drop-shadow-none">
                      {project.tag}
                    </span>
                  </h3>

                  <div className="border-l-2 border-red/50 pl-4 md:pl-6 bg-gradient-to-r from-red/[0.08] to-transparent py-3 mb-2">
                    <p className="font-inter font-light text-white/90 text-xs md:text-sm lg:text-base leading-relaxed mb-3">
                      {project.problem}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {project.outcomes.map((outcome: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-3 h-3 text-red mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-inter text-white/70 text-xs md:text-sm leading-snug">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pl-3 md:pl-4 mt-auto pt-4">
                  <div className="font-space text-[10px] text-red/60 tracking-[0.4em] mb-3 uppercase text-left">
                    Tech_Parameters
                  </div>

                  {project.techGroups ? (
                    <div className="flex flex-col gap-3">
                      {project.techGroups.map((group: any, i: number) => (
                        <div key={i}>
                          <div className="font-space text-[9px] text-red/60 tracking-[0.2em] uppercase mb-1.5">[{group.label}]</div>
                          <div className="flex flex-wrap gap-1.5">
                            {group.items.map((tech: string, j: number) => (
                              <span key={j} className="px-2 py-1 text-[9px] md:text-[10px] font-space text-white/80 border border-red/20 bg-[#0a0a0a] group-hover/hud:border-red/40 transition-colors uppercase tracking-wider">{tech}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techList?.map((tech: string, i: number) => (
                        <span key={i} className="px-2 py-1 text-[9px] md:text-[10px] font-space text-white/80 border border-red/20 bg-[#0a0a0a] group-hover/hud:border-red/40 transition-colors uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 md:mt-6 font-space text-[9px] text-red/40 tracking-[0.3em] break-all hidden lg:block">
                    0x{hexAlloc} // MEMORY_ALLOC // 0x{hexSec} // SECURE
                  </div>
                </div>
              </div>

              {/* Right Side: Visuals & Action */}
              <div className={`w-full md:w-[50%] lg:w-[40%] p-4 md:p-6 lg:p-8 flex flex-col justify-between relative ${isMobile ? '' : 'bg-gradient-to-tl from-red/[0.05] to-transparent'}`}>

                <div className="flex flex-col mb-3 md:mb-4">
                  {/* Navigation Header */}
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="font-space text-[10px] text-red/60 tracking-[0.4em] uppercase">
                      Visual_Telemetry
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-space text-[10px] text-red tracking-widest">
                        {(currentImageIndex + 1).toString().padStart(2, '0')} / {project.images.length.toString().padStart(2, '0')}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={prevImage} className="w-8 h-8 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red z-20 relative cursor-pointer group/nav">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/nav:-translate-x-0.5 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button onClick={nextImage} className="w-8 h-8 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red z-20 relative cursor-pointer group/nav">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/nav:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Single Image Carousel Area */}
                  <div
                    className="w-full aspect-video bg-[#0a0a0a] border border-red/20 relative overflow-hidden group/img cursor-pointer z-30"
                    onClick={() => setFullScreenImage(project.images[currentImageIndex])}
                  >
                    {project.images.map((img: string, i: number) => (
                      <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      >
                        {!imageErrors[img] && (
                          <Image
                            src={`/${img}.png`}
                            alt={img}
                            fill
                            className="object-contain opacity-100"
                            loading="lazy"
                            onError={() => setImageErrors(prev => ({ ...prev, [img]: true }))}
                          />
                        )}
                        {imageErrors[img] && (
                          <>
                            {/* Fallback Placeholder text */}
                            <div className={`absolute inset-0 flex items-center justify-center font-space text-lg tracking-widest ${imageErrors[img] ? 'text-red/40' : 'text-red/0'}`}>{img}</div>
                            {/* Scanlines on placeholder */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.02)_2px,rgba(255,51,51,0.02)_4px)] pointer-events-none z-0" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative w-full h-10 md:h-12 border border-red/40 flex items-center justify-between px-6 overflow-hidden bg-[#0a0a0a] hover:border-red transition-colors duration-500 shadow-[inset_0_0_20px_rgba(255,51,51,0.05)] hover:shadow-[inset_0_0_40px_rgba(255,51,51,0.2)] shrink-0"
                    data-cursor="cta"
                  >
                    {/* Hardware scanning background */}
                    <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-red/20 to-red/40 group-hover/btn:w-full transition-all duration-500 ease-out" />
                    {/* Laser edge */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-red shadow-[0_0_20px_rgba(255,51,51,1)] group-hover/btn:opacity-100 opacity-50 transition-opacity" />

                    <span className="font-space text-xs md:text-sm tracking-[0.3em] text-white uppercase relative z-10 font-bold group-hover/btn:tracking-[0.4em] transition-all duration-500">
                      OPEN PROJECT URL
                    </span>

                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {fullScreenImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-[#020202]/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
            className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 group cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="relative w-full h-full max-w-[90vw] max-h-[85vh]">
            <Image
              src={`/${fullScreenImage}.png`}
              alt={fullScreenImage}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
              anticipatePin: mobile ? 0 : 1,
              scrub: mobile ? 1.2 : 1,
              end: () => `+=${totalScrollDistance}`,
              invalidateOnRefresh: true,
              fastScrollEnd: mobile ? 3000 : false,
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

  const activeProjects = mounted ? projects.filter(p => isMobile || p.title !== "Twin") : projects.filter(p => p.title !== "Twin");

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#020202] text-red overflow-hidden h-[100dvh] flex flex-col">

      {/* 1. ABSOLUTE HEADER */}
      <div className="projects-header absolute top-0 left-0 w-full pt-8 md:pt-12 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent flex flex-col justify-start px-6 md:px-16 pb-12 z-50 pointer-events-none">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter text-white leading-none drop-shadow-lg flex items-center gap-4">
              <span className="w-3 h-3 bg-red rounded-full shadow-[0_0_10px_rgba(255,51,51,1)]" />
              PROJECTS
            </h2>
          </div>
        </div>
      </div>

      {/* 2. HORIZONTAL SCROLL CONTAINER */}
      <div className="w-full h-full relative overflow-hidden bg-[#020202]">

        {/* Global Tactical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
        <div ref={scrollContainerRef} className="flex h-full" style={{ width: `${activeProjects.length * 100}vw` }}>
          {activeProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
