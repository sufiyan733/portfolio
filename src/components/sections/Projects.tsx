"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  {
    tag: "SaaS",
    title: "MultiTenant",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://www.multiitenant.online",
    problem: "A production-grade multi-tenant SaaS platform serving Indian businesses with isolated subdomains, custom domain routing, and a 9-step middleware security pipeline with zero-trust tenant isolation.",
    outcomes: [
      "4 independent AES-256-GCM encryption keys with deterministic PII lookups and constant-time auth verification across all flows.",
      "GST-compliant invoicing with atomic allocation (SELECT FOR UPDATE), credit notes, and webhook-driven payment state machine.",
      "Full POS terminal with IndexedDB offline queue, barcode scanning, split-tender payments, and live iframe theme studio preview.",
      "Strict tenant isolation with HMAC-signed proxy signatures, per-host origin allowlist, and Redis-cached domain routing.",
      "RAG-powered AI advisor (Ray) via Groq LLM with 3-key fallback and 9 parallel real-time analytics queries."
    ],
    stats: [
      { label: "API Routes", value: "100+" },
      { label: "DB Tables", value: "33" },
      { label: "Lib Modules", value: "86" },
      { label: "Security Layers", value: "65+" }
    ],
    highlights: [
      "Zero-Trust Tenant Isolation",
      "GST Invoicing & Credit Notes",
      "Offline POS & Theme Studio",
      "RAG AI Advisor Pipeline"
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "TanStack Query/Table", "Zod", "Zustand"] },
      { label: "Backend & AI", items: ["Drizzle ORM", "Neon PostgreSQL", "RAG Pipeline", "Groq AI", "Razorpay", "Better Auth"] },
      { label: "Security & Infra", items: ["AES-256-GCM", "HMAC-SHA256", "PII Encryption", "Upstash Redis", "Tenant Isolation"] }
    ],
    images: ["mt1_v2", "mt2_v2", "mt3_v2", "mt4_v2"]
  },
  {
    tag: "Research Agent",
    title: "Onyx-Agent",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://github.com/kaiizer777/onyx-scrapper",
    problem: "A self-hosted, $0/month autonomous web research and scraping engine built in Go — combining an autonomous ReAct loop, parallel multi-provider discovery (SearXNG, TinyFish, Jina), stealth headless browser automation, DAG-based pedagogical outlines, and SQLite FTS5 local knowledge indexing.",
    outcomes: [
      "Multi-provider discovery engine querying SearXNG, TinyFish, and Jina in parallel with URL deduplication, fallback routing, and zero-cost operation.",
      "Autonomous ReAct agent loop with natural language semantic element locator, automated DOM actions, and schema-driven structured JSON extraction.",
      "Deep Research Orchestrator decomposing complex queries into sub-questions with parallel worker pools and automated cited markdown reports.",
      "Stealth browser automation via go-rod with randomized viewports, human-like delays, anti-bot circuit breakers, and Colly fast-path scraping.",
      "Pedagogical Teacher Agent pipeline with DAG dependency graph execution (Kahn's TopoSort), multi-turn clarification, and 5-dimension critic refinement."
    ],
    stats: [
      { label: "Operating Cost", value: "$0/mo" },
      { label: "Discovery Layer", value: "3-Way" },
      { label: "Agent Modes", value: "3" },
      { label: "Search Index", value: "FTS5" }
    ],
    highlights: [
      "Autonomous ReAct Loop",
      "Multi-Provider Discovery",
      "Stealth Browser & Colly",
      "Teacher Agent DAG"
    ],
    techGroups: [
      { label: "Core & Agents", items: ["Go (Golang)", "ReAct Loop", "DAG TopoSort", "Evaluator-Critic", "MiMo V2.5", "Groq / OpenAI"] },
      { label: "Discovery & Scraping", items: ["SearXNG", "TinyFish API", "Jina Reader/Reranker", "go-rod Stealth", "Colly", "Circuit Breakers"] },
      { label: "Storage & Infra", items: ["SQLite FTS5", "SSE Streaming", "Telegram Gateway", "Ticker Scheduler", "Docker Compose"] }
    ],
    videos: ["onyx_demo1", "onyx_demo2"]
  },
  {
    tag: "SaaS",
    title: "FreelanceOS",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://freelance-os-iota.vercel.app",
    problem: "A production-grade business operating system built solo for Indian freelancers — eliminating tool sprawl by unifying client management, GST-compliant invoicing, payment reconciliation, and a passwordless magic-link client portal into a single, zero-config platform.",
    outcomes: [
      "5-tool consolidation with unified client lifecycle — from lead capture to invoice settlement — replacing CRMs, invoice generators, payment trackers, contract managers, and client portals with a single codebase.",
      "GST-compliant invoicing engine with automatic CGST/SGST/IGST computation, HSN code mapping, e-invoice readiness, and PDF generation with real-time tax summary dashboards.",
      "Magic-link client portal with token-based passwordless auth, scoped document sharing, live payment status tracking, and branded self-service dashboards — zero credentials required.",
      "Role-based access control with granular permission scoping, session management via BetterAuth, and Redis-cached session invalidation for instant revocation across devices.",
      "Email automation pipeline via Brevo transactional API — invoice delivery, payment reminders, overdue alerts, and onboarding sequences with open/click tracking and retry logic."
    ],
    stats: [
      { label: "API Routes", value: "50+" },
      { label: "DB Tables", value: "18" },
      { label: "Features", value: "40+" },
      { label: "Lib Modules", value: "35+" }
    ],
    highlights: [
      "Magic-Link Client Portal",
      "GST-Compliant Invoicing",
      "Payment Reconciliation",
      "Zero Config Setup"
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "TanStack Query/Table", "Zod", "Zustand"] },
      { label: "Backend & Auth", items: ["Prisma ORM", "Neon PostgreSQL", "BetterAuth", "Redis", "Brevo Email API", "UploadThing"] },
      { label: "Compliance & Infra", items: ["GST Tax Engine", "HSN Code Mapping", "E-Invoice Ready", "PDF Generation", "Role-Based Access"] }
    ],
    images: ["fr1", "fr2", "fr3", "fr4"]
  },
  {
    tag: "Browser Agent",
    title: "MEW-AGENT",
    label: "[ SYS.STATUS: DEPLOYED ]",
    link: "https://github.com/kaiizer777/mew-agent",
    problem: "A high-performance, visible computer-use browser agent written in Rust from scratch — driving real Chromium via CDP with accessibility-first tree perception, a two-agent LLM harness, multi-worker research orchestration, and a 6-layer resilience engine built for $0 infrastructure cost.",
    outcomes: [
      "Accessibility-first perception using Accessibility.getFullAXTree and structural diffing with stable @eX refs — slashing token footprint by 70%+ vs full-page screenshots.",
      "Two-agent LLM harness (intent-routing ChatAgent + ReAct-loop BrowserAgent) connected via typed Handoff and Result contracts with deterministic pre-flight DAG planning.",
      "Multi-worker research orchestration fanning out across platforms concurrently via Tokio JoinSet with isolated CDP browser contexts and per-domain concurrency caps.",
      "6-layer resilience engine auto-recovering from stale refs, cookie/modal interrupts, mid-task session loss, Cloudflare 429 backoff, and irreversible action pause gates.",
      "Native Tauri 2 desktop shell with high-throughput Channel<any> streaming live partial findings, step progress lines, and 4K downscaled screencast frames."
    ],
    stats: [
      { label: "Crates", value: "7" },
      { label: "Token Cut", value: "70%+" },
      { label: "Resilience", value: "6-Layer" },
      { label: "Concurrency", value: "3x Workers" }
    ],
    highlights: [
      "AX-Tree First Perception",
      "Two-Agent Split & DAG",
      "6-Layer Resilience Core",
      "Tauri 2 Live Stream"
    ],
    techGroups: [
      { label: "Core & Engine", items: ["Rust", "Chromium CDP", "chromiumoxide", "Tokio", "Tauri 2", "TypeScript"] },
      { label: "Agent & Perception", items: ["AX-Tree Diffing", "ReAct Loop", "Pre-Flight DAG", "Episodic Memory", "Live Streaming"] },
      { label: "Resilience & Evasion", items: ["Stealth Chromium", "Pacing Guards", "Anti-Bot Evasion", "OAuth Auth", "Trace Auditing"] }
    ],
    videos: ["mew_demo1", "mew_demo2"]
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
    stats: [
      { label: "Languages", value: "3" },
      { label: "AI Models", value: "2" },
      { label: "Response Time", value: "<1s" },
      { label: "Bed Tracking", value: "Live" }
    ],
    highlights: [
      "Multi-Language AI Chat",
      "Emergency SOS System",
      "Real-Time Bed Availability",
      "Digital Health Profile"
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
    stats: [
      { label: "Algorithms", value: "20+" },
      { label: "FPS", value: "60" },
      { label: "Render Tech", value: "Canvas" },
      { label: "Code Support", value: "JS" }
    ],
    highlights: [
      "Real-Time Code Execution",
      "Step-by-Step Visualization",
      "Canvas API Rendering",
      "Interview Prep Focus"
    ],
    techList: ["NEXT.JS", "BETTERAUTH", "Algorithms", "Canvas API"],
    images: ["vs1", "vs2", "vs3", "vs4"]
  }
];

interface TechGroup {
  label: string;
  items: string[];
}

interface ProjectStat {
  label: string;
  value: string;
}

interface ProjectData {
  tag: string;
  title: string;
  label: string;
  link: string;
  problem: string;
  outcomes: string[];
  stats?: ProjectStat[];
  techGroups?: TechGroup[];
  techList?: string[];
  images?: string[];
  videos?: string[];
  highlights?: string[];
}

const TechStackContent = ({ project, isMobileView }: { project: ProjectData; isMobileView?: boolean }) => {
  if (isMobileView) {
    const allTech = project.techGroups 
      ? project.techGroups.flatMap((g: TechGroup) => g.items)
      : (project.techList || []);

    return (
      <div className="w-full border border-red/20 bg-gradient-to-b from-[#111]/90 to-[#050505]/90 rounded-sm px-2.5 py-1.5 relative shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-1 h-1 bg-red/60 rounded-full" />
          <span className="font-space text-[8px] text-red/70 tracking-[0.25em] uppercase font-bold">[TECH.STACK]</span>
          <span className="flex-1 h-px bg-red/20" />
        </div>
        <div className="flex flex-wrap gap-1">
          {allTech.map((tech: string, i: number) => (
            <span key={i} className="px-1.5 py-0.5 text-[7.5px] sm:text-[8px] font-space text-white/90 border border-red/30 bg-[#151515] rounded-[2px] tracking-wider uppercase whitespace-nowrap">
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-red/20 bg-gradient-to-b from-[#111]/80 to-[#050505]/80 shadow-[0_4px_16px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04),0_0_12px_rgba(255,51,51,0.04)] rounded-sm px-3 py-3 md:px-4 md:py-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red/20 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1 h-1 bg-red/60 rounded-full" />
        <span className="font-space text-[9px] md:text-[10px] text-red/70 tracking-[0.3em] uppercase font-extrabold border-b border-red/50 pb-0.5">[TECH.STACK]</span>
        <span className="flex-1 h-px bg-red/30" />
      </div>
      {project.techGroups ? (
        <div className="flex flex-col gap-2 md:gap-3">
          {project.techGroups.map((group: TechGroup, i: number) => (
            <div key={i}>
              <div className="text-center mb-1">
                <span className="font-space text-[9px] md:text-[10px] text-red/50 tracking-[0.2em] uppercase border-b border-red/30 pb-0.5">[{group.label}]</span>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center">
                {group.items.map((tech: string, j: number) => (
                  <span key={j} className="px-2 py-0.5 md:py-1 text-[8px] md:text-[9px] font-space text-white/80 border border-red/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.05)] uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center">
          {project.techList?.map((tech: string, i: number) => (
            <span key={i} className="px-2 py-0.5 md:py-1 text-[8px] md:text-[9px] font-space text-white/80 border border-red/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.05)] uppercase tracking-wider">{tech}</span>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, idx }: { project: ProjectData; idx: number }) => {
  const isVideo = Boolean(project.videos && project.videos.length > 0);
  const mediaItems: string[] = isVideo ? (project.videos ?? []) : (project.images ?? []);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaErrors, setMediaErrors] = useState<Record<string, boolean>>({});
  const [fullScreenMedia, setFullScreenMedia] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const getMediaSrc = (item: string, isVid: boolean) => {
    if (item.includes(".")) return item.startsWith("/") ? item : `/${item}`;
    return `/${item}.${isVid ? "mp4" : "png"}`;
  };

  const sysId = String(idx + 1).padStart(2, '0');


  return (
    <div className="project-panel w-screen h-[100dvh] flex items-stretch justify-center px-2 pt-16 pb-3 sm:px-4 sm:pt-20 sm:pb-4 md:px-8 md:pt-24 md:pb-6 relative border-r border-red/10 z-10 will-change-transform overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ backfaceVisibility: 'hidden' }}>

      {/* Massive Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[80vw] md:text-[60vw] leading-none text-transparent opacity-[0.03] z-0 pointer-events-none select-none" style={{ WebkitTextStroke: '2px #ff3333' }}>
        {sysId}
      </div>

      {/* Optimized Volumetric Center Glow (No CSS Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.08),transparent_50%)] pointer-events-none z-0" />

      {/* Hardware Mount Brackets */}
          <div className="panel-bracket absolute top-20 left-8 w-8 h-8 z-30 hidden md:block pointer-events-none opacity-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red/80 to-red/20 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red/80 to-red/20 shadow-[2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="panel-bracket absolute bottom-2 left-8 w-8 h-8 z-30 hidden md:block pointer-events-none opacity-0">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red/80 to-red/20 shadow-[0_-2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-red/80 to-red/20 shadow-[2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="panel-bracket absolute top-20 right-8 w-8 h-8 z-30 hidden md:block pointer-events-none opacity-0">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-red/80 to-red/20 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red/80 to-red/20 shadow-[-2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>
          <div className="panel-bracket absolute bottom-2 right-8 w-8 h-8 z-30 hidden md:block pointer-events-none opacity-0">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red/80 to-red/20 shadow-[0_-2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-red/80 to-red/20 shadow-[-2px_0_4px_rgba(0,0,0,0.8),inset_1px_0_0_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#444] to-[#111] border border-black shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-red/50 shadow-[0_0_2px_rgba(255,51,51,1)]" /></div>
          </div>

      {/* TACTICAL HUD PANEL */}
      <div
        className="tactical-hud opacity-0 translate-y-24 relative z-10 w-full max-w-[1425px] h-full p-[2px] my-0 group/hud motion-safe:transition-shadow motion-safe:duration-500 ease-out flex flex-col bg-gradient-to-br from-[#333] via-[#111] to-[#000] shadow-[0_30px_60px_-10px_rgba(0,0,0,1),inset_1px_1px_0_rgba(255,255,255,0.2),inset_-2px_-2px_0_rgba(0,0,0,0.8)] hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,1),0_0_40px_rgba(255,51,51,0.1),inset_1px_1px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.8)] rounded-sm overflow-hidden"
      >
        <div
          className="w-full h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#050505] to-[#000000] shadow-[inset_0_30px_60px_-15px_rgba(0,0,0,1),inset_0_-20px_40px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(0,0,0,1)] rounded-sm"
        >

          {/* Deep Ambient Red Core Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,51,51,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Glossy Curved Glass Reflections */}
          <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-10 mix-blend-screen" />
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.02)_48%,rgba(255,255,255,0.06)_50%,transparent_52%)] pointer-events-none z-10 mix-blend-screen" />

          {/* Subtle micro-texture for physical glass feel */}
          <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Static 3D Material Noise Texture */}
          <div className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Subtle curved surface highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none z-0" />

          {/* Optimized Scanlines Overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.04)_2px,rgba(255,51,51,0.04)_4px)] pointer-events-none z-0 opacity-40 md:opacity-50" />

          {/* TOP BAR: Systems Info */}
          <div className="h-6 sm:h-7 lg:h-8 shrink-0 border-b border-red/20 flex items-center justify-between px-3 md:px-6 bg-red/[0.05] z-10">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-red flex items-center justify-center">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red animate-[ping_2s_linear_infinite]" />
              </span>
              <span className="font-space text-[10px] sm:text-xs tracking-widest text-white/90">SYS.ID: {sysId}</span>
            </div>
            <div className="font-space text-[8px] sm:text-[9px] md:text-[10px] tracking-widest text-red uppercase font-bold">
              {project.label}
            </div>
          </div>

          {/* MAIN CONTENT SPLIT (Content-driven height) */}
          <div className="w-full relative z-10 overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="flex flex-col lg:flex-row items-stretch flex-1 min-h-0">

              {/* Left Side: Typography & Data */}
              <div className="w-full lg:w-[60%] px-3 sm:px-5 md:px-6 lg:px-8 pt-1.5 sm:pt-2 md:pt-2.5 lg:pt-3 pb-3 sm:pb-4 md:pb-5 lg:pb-6 flex flex-col justify-start lg:justify-between gap-2.5 sm:gap-3.5 md:gap-4 border-b-0 lg:border-r border-red/20 relative z-20 flex-1 min-h-0 overflow-hidden lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gradient-to-br from-[#111] to-transparent shadow-[10px_0_20px_-5px_rgba(0,0,0,0.8)]">

                {/* Header Row: Title + Tag (Mobile/Desktop) & PC Open URL */}
                <div className="pl-1 sm:pl-3 md:pl-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 md:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <h3 className="font-bodoni text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-[#888888] to-white [filter:drop-shadow(0_8px_8px_rgba(0,0,0,0.9))] transition-transform duration-500 hover:-translate-y-1 cursor-default mb-0 leading-tight">
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 border border-red/30 bg-gradient-to-b from-red/20 to-red/5 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-space text-red tracking-widest uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)] rounded-sm">
                        {project.tag}
                      </span>
                    </div>

                    {/* PC View Only: Top Right Open URL Button */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden lg:flex relative h-8 px-3 border border-red/40 items-center gap-2 overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] motion-safe:transition-all motion-safe:duration-100 shadow-[0_4px_0_#000,0_6px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-[0_1px_0_#000,0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(0,0,0,0.4)] shrink-0 rounded-sm group/btn"
                      data-cursor="cta"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red/20 to-transparent -translate-x-full pointer-events-none" />
                      <span className="font-space text-[10px] tracking-[0.25em] text-white uppercase relative z-10 font-bold whitespace-nowrap">
                        OPEN URL
                      </span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red relative z-10 shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>

                  {/* Mobile & Tablet Dual Action Bar (2 Organized Buttons) */}
                  <div className="flex lg:hidden items-center gap-2 w-full pt-0.5">
                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="flex-1 h-7 sm:h-8 px-3 border border-red/40 flex items-center justify-center gap-1.5 overflow-hidden bg-gradient-to-b from-[#242424] to-[#0d0d0d] shadow-[0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] active:scale-[0.98] rounded-sm group cursor-pointer hover:border-red/70 transition-all"
                      data-cursor="cta"
                    >
                      {isVideo ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red shrink-0">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red shrink-0">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      )}
                      <span className="font-space text-[8.5px] sm:text-[9.5px] tracking-[0.18em] text-white uppercase font-bold whitespace-nowrap">
                        {isVideo ? "VIEW DEMOS" : "VIEW IMAGES"}
                      </span>
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-7 sm:h-8 px-3 border border-red/40 flex items-center justify-center gap-1.5 overflow-hidden bg-gradient-to-b from-[#242424] to-[#0d0d0d] shadow-[0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] active:scale-[0.98] rounded-sm group hover:border-red/70 transition-all"
                      data-cursor="cta"
                    >
                      <span className="font-space text-[8.5px] sm:text-[9.5px] tracking-[0.18em] text-white uppercase font-bold whitespace-nowrap">
                        OPEN URL
                      </span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Problem Statement & Outcomes */}
                <div className="border-l-[2px] sm:border-l-[3px] border-red pl-2.5 sm:pl-3 md:pl-6 bg-gradient-to-r from-red/[0.06] to-transparent py-1.5 sm:py-2.5 md:py-4 rounded-r-sm">
                  <p className="font-inter font-light text-white/90 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed mb-1.5 sm:mb-2 md:mb-3">
                    {project.problem}
                  </p>
                  <ul className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                    {project.outcomes.slice(0, 2).map((outcome: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5 md:gap-3">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red mt-0.5 md:mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span className="font-inter text-white/70 text-[10px] sm:text-xs md:text-sm leading-snug">{outcome}</span>
                      </li>
                    ))}
                    {project.outcomes.slice(2).map((outcome: string, i: number) => (
                      <li key={i + 2} className="hidden lg:flex items-start gap-3">
                        <svg className="w-3 h-3 text-red mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span className="font-inter text-white/70 text-sm leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats Grid */}
                {project.stats && (
                  <div className="w-full">
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 w-full">
                      {project.stats.map((stat: ProjectStat, i: number) => (
                        <div key={i} className="text-center border border-red/20 bg-gradient-to-b from-red/[0.08] to-[#0a0a0a]/50 py-1 sm:py-2 md:py-3 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
                          <div className="font-bebas text-sm sm:text-base md:text-2xl text-red leading-none">{stat.value}</div>
                          <div className="font-space text-[6.5px] sm:text-[7.5px] md:text-[8px] text-white/50 tracking-wider uppercase mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {project.highlights && (
                  <div className="w-full flex justify-center">
                    <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 md:gap-2">
                      {project.highlights.map((highlight: string, i: number) => (
                        <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[7.5px] sm:text-[8.5px] md:text-[9px] font-space text-red/90 border border-red/25 bg-red/[0.06] tracking-wider uppercase rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile & iPad / Tablet Tech Stack Box (Integrated in default view) */}
                <div className="block lg:hidden w-full">
                  <TechStackContent project={project} isMobileView={true} />
                </div>
              </div>

              {/* Right Side: Visuals & Action (PC View >= 1024px) */}
              <div className="hidden lg:flex lg:w-[40%] px-3 md:px-6 lg:px-8 pt-1 md:pt-2 lg:pt-2 pb-2 md:pb-4 flex-col justify-start relative shrink-0 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gradient-to-tl from-red/[0.05] to-transparent">

                <div className="flex flex-col shrink-0">
                  {/* Embedded Screen Display Area */}
                  <div className="w-full sm:w-[80%] md:w-full mx-auto aspect-video p-1 bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.8)] relative z-30">
                    <div
                      className="w-full h-full bg-[#020202] relative overflow-hidden group/img cursor-pointer shadow-[inset_0_10px_30px_rgba(0,0,0,1),inset_0_0_0_1px_rgba(255,51,51,0.15)] rounded-sm"
                      onClick={() => setFullScreenMedia(mediaItems[currentMediaIndex])}
                    >

                      {mediaItems.map((item: string, i: number) => {
                        const isCurrent = i === currentMediaIndex;
                        const src = getMediaSrc(item, isVideo);
                        return (
                          <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                          >
                            {!mediaErrors[item] ? (
                              isVideo ? (
                                <video
                                  src={src}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-contain"
                                  onError={() => setMediaErrors(prev => ({ ...prev, [item]: true }))}
                                />
                              ) : (
                                <Image
                                  src={src}
                                  alt={item}
                                  fill
                                  className="object-contain opacity-100"
                                  loading="lazy"
                                  onError={() => setMediaErrors(prev => ({ ...prev, [item]: true }))}
                                />
                              )
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-red animate-ping" />
                                  <span className="font-space text-xs tracking-widest text-red/80 font-bold uppercase">
                                    {isVideo ? `[ VIDEO STREAM ${String(i + 1).padStart(2, '0')} / DEMO ]` : item}
                                  </span>
                                </div>
                                <span className="font-space text-[9px] text-white/40 tracking-wider">
                                  {isVideo ? `DEMO_${i + 1}.MP4` : "SIGNAL OFFLINE"}
                                </span>
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.03)_2px,rgba(255,51,51,0.03)_4px)] pointer-events-none z-0" />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Bottom Navigation Overlay */}
                      <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-3 py-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20">
                        <button onClick={(e) => { e.stopPropagation(); prevMedia(); }} className="pointer-events-auto w-8 h-8 border border-red/40 bg-[#0a0a0a]/80 hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red cursor-pointer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <span className="font-space text-[10px] text-red/80 tracking-widest pointer-events-none">
                          {(currentMediaIndex + 1).toString().padStart(2, '0')} / {mediaItems.length.toString().padStart(2, '0')}
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); nextMedia(); }} className="pointer-events-auto w-8 h-8 border border-red/40 bg-[#0a0a0a]/80 hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red cursor-pointer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack for PC View — centered in remaining space */}
                <div className="flex-1 flex items-center">
                  <TechStackContent project={project} isMobileView={false} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Media Overlay (PC View Zoom) */}
      {fullScreenMedia && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-[#020202]/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
          onClick={() => setFullScreenMedia(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenMedia(null);
            }}
            className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 group cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIdx = (currentMediaIndex === 0 ? mediaItems.length - 1 : currentMediaIndex - 1);
              setCurrentMediaIndex(prevIdx);
              setFullScreenMedia(mediaItems[prevIdx]);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-red/40 bg-[#0a0a0a]/80 hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextIdx = (currentMediaIndex + 1) % mediaItems.length;
              setCurrentMediaIndex(nextIdx);
              setFullScreenMedia(mediaItems[nextIdx]);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-red/40 bg-[#0a0a0a]/80 hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {!mediaErrors[fullScreenMedia] ? (
              isVideo ? (
                <video
                  src={getMediaSrc(fullScreenMedia, true)}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="max-w-full max-h-[85vh] object-contain rounded-sm border border-red/20"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={getMediaSrc(fullScreenMedia, false)}
                    alt={fullScreenMedia}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-red/60 font-space tracking-widest text-lg">
                <span>{isVideo ? `[ VIDEO DEMO ${currentMediaIndex + 1} NOT FOUND ]` : `[ ${fullScreenMedia} NOT FOUND ]`}</span>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Media Gallery Modal (Phone & iPad / Tablet) */}
      {isGalleryOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-[#020202]/98 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md"
          onClick={() => setIsGalleryOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(false);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red z-50 rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-1 pointer-events-none">
            <span className="font-bebas text-2xl md:text-3xl text-white tracking-widest leading-none drop-shadow-md">{project.title}</span>
            <span className="font-space text-[10px] md:text-xs text-red tracking-[0.3em] font-bold">
              {isVideo ? "SYS.DEMO: " : "SYS.IMAGE: "} {(currentMediaIndex + 1).toString().padStart(2, '0')} / {mediaItems.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="relative w-full max-w-4xl aspect-video mt-8 sm:mt-4 bg-black/60 border border-red/30 rounded-sm shadow-[0_0_40px_rgba(255,51,51,0.15)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {mediaItems.map((item: string, i: number) => {
              const isCurrent = i === currentMediaIndex;
              const src = getMediaSrc(item, isVideo);
              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  {!mediaErrors[item] ? (
                    isVideo ? (
                      <video
                        src={src}
                        controls
                        autoPlay={isCurrent}
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                        onError={() => setMediaErrors(prev => ({ ...prev, [item]: true }))}
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={item}
                        fill
                        className="object-contain"
                        priority={isCurrent}
                        onError={() => setMediaErrors(prev => ({ ...prev, [item]: true }))}
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-space text-sm sm:text-base text-red/60 tracking-widest p-4 text-center">
                      <span>{isVideo ? `[ VIDEO STREAM ${i + 1} OFFLINE ]` : item}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={prevMedia} className="w-11 h-11 md:w-12 md:h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)] active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span className="font-space text-xs text-white/70 tracking-widest">
              {(currentMediaIndex + 1)} OF {mediaItems.length}
            </span>
            <button onClick={nextMedia} className="w-11 h-11 md:w-12 md:h-12 border border-red/40 bg-[#0a0a0a] hover:border-red hover:bg-red/10 flex items-center justify-center transition-colors text-red/80 hover:text-red rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)] active:scale-95">
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
  const isMobile = useIsMobile();

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    const mobile = isMobile;

    // Wait for fonts + layout to settle before creating ScrollTrigger
    const initTimeout = setTimeout(() => {
      ctx = gsap.context(() => {
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
            const brackets = panel.querySelectorAll(".panel-bracket");
            if (brackets.length) {
              gsap.set(brackets, { opacity: 0 });
            }
          });

          // Master horizontal timeline animating the container itself
          const scrollTween = gsap.to(scrollContainerRef.current, {
            x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              anticipatePin: mobile ? 0 : 1,
              scrub: mobile ? 1.2 : 1.5,
              end: () => `+=${scrollContainerRef.current!.scrollWidth}`,
              invalidateOnRefresh: true,
              fastScrollEnd: mobile ? 3000 : false,
              preventOverlaps: true,
            }
          });

          // Intro animation for HUD cards (lighter on mobile)
          panels.forEach((panel) => {
            const hud = panel.querySelector(".tactical-hud");
            const brackets = panel.querySelectorAll(".panel-bracket");
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
                  start: "left 50%",
                  toggleActions: "play none none reverse",
                }
              });
            }
            if (brackets.length) {
              gsap.to(brackets, {
                opacity: 1,
                duration: mobile ? 0.8 : 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 50%",
                  toggleActions: "play none none reverse",
                }
              });
            }
          });
        }
      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ctx?.revert();
    };
  }, [isMobile]);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#020202] text-red overflow-hidden h-[100dvh] flex flex-col">

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="w-full h-full relative overflow-hidden bg-[#020202]">

        {/* Global Tactical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
        <div ref={scrollContainerRef} className="flex h-full w-max">

          {/* Intro Slide: Section Title & Lead-in */}
          <div className="w-screen lg:w-[28vw] h-full shrink-0 flex flex-col justify-center items-center lg:items-start px-6 md:px-12 pointer-events-none z-20">
            <div className="projects-header flex flex-col items-center lg:items-start text-center lg:text-left gap-2 max-w-sm lg:max-w-none">
              <div className="font-space text-[10px] sm:text-[11px] text-red tracking-[0.4em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-red rounded-full animate-ping" />
                SYSTEM_PORTFOLIO
              </div>
              <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-none drop-shadow-2xl">
                PROJECTS
              </h2>
              <p className="font-space text-[10px] sm:text-xs tracking-[0.25em] text-white/40 uppercase mt-1 sm:mt-2">
                [ PRODUCTION SYSTEMS & ARCHIVES ]
              </p>
              <div className="lg:hidden mt-4 flex items-center gap-2 px-3 py-1 border border-red/30 bg-red/10 rounded-full">
                <span className="font-space text-[9px] text-red tracking-widest uppercase animate-pulse">SCROLL TO EXPLORE →</span>
              </div>
            </div>
          </div>

          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}

        </div>
      </div>
    </section>
  );
}
