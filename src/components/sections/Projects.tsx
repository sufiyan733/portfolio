"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  {
    tag: "SaaS",
    title: "MultiTenant",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://www.multiitenant.online",
    problem: "A security-hardened multi-tenant SaaS booking & commerce platform with custom domains and isolated subdomains, zero-friction guest checkout, POS terminal, and an embedded RAG-driven AI.",
    outcomes: [
      "AES-256-GCM authenticated encryption for customer PII at rest with unique IVs & auth tags.",
      "Timing-safe HMAC-SHA256 webhook verification, Redis rate limiting & strict tenant DB isolation.",
      "RAG-powered AI advisor (Ray) via Groq LLM for real-time analytics & operational insights.",
      "End-to-end production flow with Razorpay integration (prepaid UPI/cards, webhooks & automated billing)."
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "TanStack Query/Table", "Zod", "Zustand"] },
      { label: "Backend & AI", items: ["Drizzle ORM", "Neon PostgreSQL", "RAG Pipeline", "Groq AI", "Razorpay", "Better Auth"] },
      { label: "Security & Infra", items: ["AES-256-GCM", "HMAC-SHA256", "PII Encryption", "Upstash Redis", "Tenant Isolation"] }
    ],
    images: ["mt1_v2", "mt2_v2", "mt3_v2", "mt4_v2"]
  },
  {
    tag: "SaaS",
    title: "FreelanceOS",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://freelance-os-iota.vercel.app",
    problem: "An all-in-one business OS built solo for Indian freelancers — client management, GST-compliant invoicing, payment tracking, and a magic-link client portal in one place.",
    outcomes: [
      "Replaces five disconnected tools with one",
      "India-first compliance from day one",
      "Free trial for 1st Month"
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
    problem: "MediLife is an AI-powered hospital intelligence platform that matches patients with the right hospital based on symptoms, severity, distance, and live bed availability. Users chat with an AI assistant (supporting Hindi, Hinglish, and English), get triaged, and book a bed directly — with a one-tap Emergency SOS for critical situations. The platform also includes a Digital Health Profile (blood group, allergies, medications) that's auto-shared with hospitals during emergencies to save critical time. A dedicated hospital dashboard/admin panel for real-time bed management and AI-based patient routing.",
    outcomes: [
      "Architected for resilience",
      "High-volume data streaming"
    ],
    techList: ["Next.js", "PostgreSQL", "DRIZZLE ORM", "BETTER AUTH", "TAILWIND CSS"],
    images: ["ml1", "ml2", "ml3", "ml4"]
  },
  {
    tag: "Hobby",
    title: "VisuoSlayer",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://dsa-visuals-nine.vercel.app",
    problem: "VisuoSlayer is an interactive platform that teaches DSA through real-time visual animations — students write code and watch the logic execute step-by-step visually at runtime. It also covers core programming fundamentals, making it useful for beginners and interview prep. Built with Canvas API for smooth, high-performance rendering of complex algorithms.",
    outcomes: [
      "High-performance canvas rendering"
    ],
    techList: ["NEXT.JS", "BETTERAUTH", "Algorithms", "Canvas API"],
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const sysId = String(idx + 1).padStart(2, '0');


  return (
    <div className="project-panel w-screen h-[100dvh] flex items-stretch justify-center px-3 pt-20 pb-4 md:px-8 md:pt-24 md:pb-6 relative border-r border-red/10 z-10 will-change-transform overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ backfaceVisibility: 'hidden' }}>

      {/* Massive Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[80vw] md:text-[60vw] leading-none text-transparent opacity-[0.03] z-0 pointer-events-none select-none" style={{ WebkitTextStroke: '2px #ff3333' }}>
        {sysId}
      </div>

      {/* Optimized Volumetric Center Glow (No CSS Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.08),transparent_50%)] pointer-events-none z-0" />

      {/* TACTICAL HUD PANEL */}
      <div
        className={`tactical-hud opacity-0 translate-y-24 relative z-10 w-full max-w-[1500px] h-full p-[2px] my-0 group/hud motion-safe:transition-shadow motion-safe:duration-500 ease-out flex flex-col ${isMobile
          ? "border border-red/40 rounded-sm bg-[#111111]"
          : "bg-gradient-to-br from-[#333] via-[#111] to-[#000] shadow-[0_30px_60px_-10px_rgba(0,0,0,1),inset_1px_1px_0_rgba(255,255,255,0.2),inset_-2px_-2px_0_rgba(0,0,0,0.8)] hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,1),0_0_40px_rgba(255,51,51,0.1),inset_1px_1px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.8)] rounded-sm"
          }`}
      >
        <div
          className={`w-full h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#050505] to-[#000000] shadow-[inset_0_30px_60px_-15px_rgba(0,0,0,1),inset_0_-20px_40px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(0,0,0,1)] rounded-sm ${isMobile ? "" : ""
            }`}
        // Removed inner clipPath
        >

          {/* Deep Ambient Red Core Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,51,51,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Glossy Curved Glass Reflections */}
          <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-10 mix-blend-screen" />
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.02)_48%,rgba(255,255,255,0.06)_50%,transparent_52%)] pointer-events-none z-10 mix-blend-screen" />

          {/* Subtle micro-texture for physical glass feel */}
          <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Hardware Mount Brackets */}
          <div className="absolute top-14 left-4 w-8 h-8 z-30 hidden md:block pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red/80 to-red/20 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red/80 to-red/20 shadow-[2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="absolute bottom-4 left-4 w-8 h-8 z-30 hidden md:block pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red/80 to-red/20 shadow-[0_-2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-red/80 to-red/20 shadow-[2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="absolute top-14 right-4 w-8 h-8 z-30 hidden md:block pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-red/80 to-red/20 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red/80 to-red/20 shadow-[-2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="absolute bottom-4 right-4 w-8 h-8 z-30 hidden md:block pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red/80 to-red/20 shadow-[0_-2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-red/80 to-red/20 shadow-[-2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>

          {/* Static 3D Material Noise Texture */}
          <div className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Subtle curved surface highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none z-0" />

          {/* Optimized Scanlines Overlay */}
          <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.04)_2px,rgba(255,51,51,0.04)_4px)] pointer-events-none z-0 ${isMobile ? 'opacity-30' : 'opacity-50'}`} />

          {/* TOP BAR: Systems Info */}
          <div className="h-8 shrink-0 border-b border-red/20 flex items-center justify-between px-4 md:px-6 bg-red/[0.05] z-10">
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
          <div className="w-full relative z-10 overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="flex flex-col md:flex-row items-stretch flex-1 min-h-0">

              {/* Left Side: Typography & Data */}
              <div className={`w-full md:w-[50%] lg:w-[60%] p-3 md:p-6 lg:p-8 flex flex-col justify-start md:justify-between border-b md:border-b-0 md:border-r border-red/20 relative z-20 flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isMobile ? '' : 'bg-gradient-to-br from-[#111] to-transparent shadow-[10px_0_20px_-5px_rgba(0,0,0,0.8)]'}`}>

                <div className="pl-3 md:pl-4 mb-2 md:mb-4 flex flex-wrap items-start gap-2 md:gap-3">
                  <h3 className={`font-bodoni text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-[#888888] to-white [filter:drop-shadow(0_8px_8px_rgba(0,0,0,0.9))] transition-transform duration-500 hover:-translate-y-1 cursor-default mb-0 md:mb-1`}>
                    {project.title}
                  </h3>
                  <span className="px-2.5 py-0.5 mt-1 md:mt-2 border border-red/30 bg-gradient-to-b from-red/20 to-red/5 text-[10px] md:text-[11px] lg:text-xs font-space text-red tracking-widest uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)] rounded-sm">
                    {project.tag}
                  </span>
                  <div className="border-l-[3px] border-red pl-3 md:pl-6 bg-gradient-to-r from-red/[0.05] to-transparent py-2 md:py-4 mb-1 md:mb-2 mt-1 md:mt-0">
                    <p className="font-inter font-light text-white/90 text-xs md:text-sm lg:text-base leading-relaxed mb-2 md:mb-3">
                      {project.problem}
                    </p>
                    <ul className="flex flex-col gap-1 md:gap-2">
                      {project.outcomes.map((outcome: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 md:gap-3">
                          <svg className="w-3 h-3 text-red mt-0.5 md:mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-inter text-white/70 text-xs md:text-sm leading-snug">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pl-3 md:pl-4 mt-auto pt-2 md:pt-4">
                  <div className="flex items-center justify-between pr-3 md:pr-0 mb-2 md:mb-3">
                    <div className="font-space text-[10px] text-red/60 tracking-[0.4em] uppercase text-left">
                      Tech_Parameters
                    </div>
                    {isMobile && project.images?.length > 0 && (
                      <button 
                        onClick={() => setIsGalleryOpen(true)}
                        className="flex items-center gap-1.5 font-space text-[9px] text-white border border-red/40 px-2 py-1 bg-gradient-to-b from-red/20 to-red/5 hover:bg-red/20 active:bg-red/30 shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.1)] uppercase tracking-widest transition-colors rounded-sm cursor-pointer z-20 relative"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        Images
                      </button>
                    )}
                  </div>

                  {project.techGroups ? (
                    <div className="flex flex-col gap-2 md:gap-3">
                      {project.techGroups.map((group: any, i: number) => (
                        <div key={i}>
                          <div className="font-space text-[9px] text-red/60 tracking-[0.2em] uppercase mb-1 md:mb-1.5">[{group.label}]</div>
                          <div className="flex flex-wrap gap-1 md:gap-1.5">
                            {group.items.map((tech: string, j: number) => (
                              <span key={j} className="px-2 py-0.5 md:py-1 text-[9px] md:text-[10px] font-space text-white/80 border border-red/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.05)] uppercase tracking-wider">{tech}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      {project.techList?.map((tech: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 md:py-1 text-[9px] md:text-[10px] font-space text-white/80 border border-red/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.05)] uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* Right Side: Visuals & Action */}
              <div className={`w-full md:w-[50%] lg:w-[40%] p-3 md:p-6 lg:p-8 flex flex-col justify-between relative shrink-0 ${isMobile ? '' : 'bg-gradient-to-tl from-red/[0.05] to-transparent'}`}>

                <div className={`${isMobile ? 'hidden' : 'flex'} flex-col mb-2 md:mb-4`}>
                  {/* Navigation Header */}
                  <div className="flex items-center justify-between mb-2 md:mb-4 w-full">
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

                  {/* Embedded Screen Display Area */}
                  <div className="w-full sm:w-[80%] md:w-full mx-auto aspect-video p-1 bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.8)] relative z-30">
                    <div
                      className="w-full h-full bg-[#020202] relative overflow-hidden group/img cursor-pointer shadow-[inset_0_10px_30px_rgba(0,0,0,1),inset_0_0_0_1px_rgba(255,51,51,0.15)] rounded-sm"
                      onClick={() => setFullScreenImage(project.images[currentImageIndex])}
                    >
                      {/* Glass screen reflection */}
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20" />

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
                </div>

                <div className="mt-auto pt-2 md:pt-4 pb-1 md:pb-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full h-10 md:h-12 border border-red/40 flex items-center justify-between px-6 overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] motion-safe:transition-all motion-safe:duration-100 shadow-[0_6px_0_#000,0_8px_15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-[0_1px_0_#000,0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(0,0,0,0.4)] shrink-0 rounded-sm group/btn"
                    data-cursor="cta"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red/20 to-transparent -translate-x-full pointer-events-none" />
                    <span className="font-space text-xs md:text-sm tracking-[0.3em] text-white uppercase relative z-10 font-bold">
                      OPEN PROJECT URL
                    </span>

                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red relative z-10 transition-all">
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

      {/* Mobile Image Gallery Popup */}
      {isMobile && isGalleryOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-[#020202]/98 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsGalleryOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(false);
            }}
            className="absolute top-6 right-6 w-10 h-10 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 rounded-full cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
            <span className="font-bebas text-2xl text-white tracking-widest leading-none drop-shadow-md">{project.title}</span>
            <span className="font-space text-[10px] text-red tracking-[0.3em] font-bold">
              {(currentImageIndex + 1).toString().padStart(2, '0')} / {project.images.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="relative w-full aspect-video mt-4 bg-black/50 border border-red/20 rounded-sm shadow-[0_0_30px_rgba(255,51,51,0.1)]" onClick={(e) => e.stopPropagation()}>
             {project.images.map((img: string, i: number) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  {!imageErrors[img] && (
                    <Image
                      src={`/${img}.png`}
                      alt={img}
                      fill
                      className="object-contain"
                      priority={i === currentImageIndex}
                      onError={() => setImageErrors(prev => ({ ...prev, [img]: true }))}
                    />
                  )}
                </div>
              ))}
          </div>

          <div className="flex gap-4 mt-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={prevImage} className="w-12 h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={nextImage} className="w-12 h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
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
          const totalScrollDistance = window.innerWidth * panels.length;

          // Master horizontal timeline animating the container itself
          const scrollTween = gsap.to(scrollContainerRef.current, {
            x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              anticipatePin: mobile ? 0 : 1,
              scrub: mobile ? 1.2 : 1,
              end: () => `+=${scrollContainerRef.current!.scrollWidth}`,
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
                  start: "left 20%",
                  toggleActions: "play none none reverse",
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

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="w-full h-full relative overflow-hidden bg-[#020202]">

        {/* Global Tactical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
        <div ref={scrollContainerRef} className="flex h-full w-max">

          {/* Intro Spacer: Section Title & Lead-in */}
          <div className="w-[40vw] md:w-[28vw] h-full shrink-0 flex flex-col justify-center px-6 md:px-12 pointer-events-none z-20">
            <div className="projects-header flex flex-col gap-2">
              <div className="font-space text-[11px] text-red tracking-[0.4em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-red rounded-full animate-ping" />
                SYSTEM_PORTFOLIO
              </div>
              <h2 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-none drop-shadow-2xl">
                PROJECTS
              </h2>
              <p className="font-space text-xs tracking-[0.25em] text-white/40 uppercase mt-2">
                [ PRODUCTION SYSTEMS & ARCHIVES ]
              </p>
            </div>
          </div>

          {activeProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} isMobile={isMobile} />
          ))}

        </div>
      </div>
    </section>
  );
}
