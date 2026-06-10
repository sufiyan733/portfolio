"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const services = [
  {
    id: "01",
    title: "LANDING PAGE",
    tagline: `"Clean. Fast. Live."`,
    desc: "A modern, responsive landing page for your business, brand, or product. Looks great on every device. Hosted and deployed — ready to share the same day it's done.",
    price: "5,000",
    delivery: "EST. DELIVERY // 7 DAYS",
    params: "7_PARAMS",
    features: [
      "Clean modern UI — no templates, built from scratch",
      "Fully responsive (mobile, tablet, desktop)",
      "Deployed on Vercel with custom domain setup",
      "Contact form that actually sends emails (Resend / EmailJS)",
      "Sub-second load times via edge caching",
      "GSAP integrated cinematic animations",
      "SEO-optimized structure & meta tags"
    ]
  },
  {
    id: "02",
    title: "BUSINESS WEBSITE",
    tagline: `"Your entire business, online."`,
    desc: "Multi-page website for businesses that need more than a landing page. Home, About, Services, Portfolio, Contact — all built, hosted, and handed over with a CMS so you can edit content yourself.",
    price: "10,000",
    delivery: "EST. DELIVERY // 14 DAYS",
    params: "6_PARAMS",
    features: [
      "5–7 pages (Home, About, Services, Work, Contact, etc.)",
      "Fully responsive on all screen sizes",
      "CMS integration — edit your own content without touching code",
      "Contact form + WhatsApp chat button",
      "Deployed on Vercel + custom domain configured",
      "Basic SEO setup (meta tags, sitemap, Google indexing)"
    ]
  },
  {
    id: "03",
    title: "FULL STACK APP",
    tagline: `"Login. Dashboard. Database. The whole thing."`,
    desc: "A complete web application — user authentication, database, admin panel, and a clean frontend. For startups and small businesses that need real software, not just a website.",
    price: "15,000",
    delivery: "EST. DELIVERY // 21 DAYS",
    params: "7_PARAMS",
    features: [
      "User login & signup (email + Google OAuth)",
      "Database design and setup (PostgreSQL or MongoDB)",
      "Admin dashboard to manage users and content",
      "REST API backend (Next.js API routes or Express)",
      "Fully responsive frontend, clean modern UI",
      "Deployed on Vercel + Railway/Supabase, production-ready",
      "Ongoing support for 30 days post-delivery"
    ]
  }
];

export default function Offer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const ctx = gsap.context(() => {
      
      // Glitch text title
      gsap.fromTo(titleRef.current,
        { x: 10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Staggered Cards Entrance
      const cards = gsap.utils.toArray(".offer-card");
      gsap.fromTo(cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".offer-cards-container",
            start: isMobile ? "top 85%" : "top 70%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="offer" ref={containerRef} className="min-h-screen pt-20 pb-8 bg-[#020202] relative flex flex-col items-center justify-center border-t border-red/10 overflow-hidden">
      
      {/* Background Tactical Grid - Highly Optimized */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-20 w-full max-w-7xl flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="mb-6 text-center md:text-left flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4 shrink-0">
          <div>
            <h2 ref={titleRef} className="font-space tracking-[0.4em] text-red text-[10px] uppercase mb-1 will-change-transform">
              Deployment_Protocols
            </h2>
            <h3 className="font-bebas text-4xl md:text-5xl text-white leading-none tracking-tight">
              SERVICES_AVAILABLE
            </h3>
            <p className="mt-2 font-inter text-white/70 text-xs md:text-sm">
              Real deliverables. Real deadlines. No jargon.
            </p>
            <p className="mt-1 font-space text-[10px] md:text-[11px] text-white/50 tracking-widest">
              Introductory pricing — available for the next 3 clients only.
            </p>
          </div>
          <div className="hidden md:block font-space text-[10px] text-white/40 tracking-[0.2em] text-right">
            <div>UPLINK: ACTIVE</div>
            <div>STATUS: AWAITING_COMMAND</div>
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="offer-cards-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="offer-card relative w-full border border-red/40 bg-[#080808] flex flex-col transition-all duration-700 will-change-transform shadow-[0_20px_50px_rgba(255,51,51,0.08)]"
            >
              {/* Left Border */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-red origin-top scale-y-100 z-20" />
              
              {/* Internal Scanline FX */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.015)_2px,rgba(255,51,51,0.015)_4px)] opacity-100 pointer-events-none z-0" />

              {/* Header Block */}
              <div className="h-12 border-b border-white/5 bg-red/[0.03] px-5 flex justify-between items-center relative z-10 shrink-0">
                <div className="font-space text-[10px] text-white/50 tracking-[0.3em] uppercase font-bold">
                  {service.id}
                </div>
                {/* Abstract Symbol */}
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <div className="absolute w-full h-[1px] bg-red rotate-180" />
                  <div className="absolute h-full w-[1px] bg-red rotate-180" />
                  <div className="w-1 h-1 border border-red scale-150" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
                <h4 className="font-bebas text-3xl text-red tracking-wide mb-1">
                  {service.title}
                </h4>
                <div className="font-space text-[9px] md:text-[10px] text-red/80 tracking-widest uppercase mb-3">
                  {service.tagline}
                </div>
                <p className="font-inter text-white/70 text-xs mb-4 leading-relaxed font-light line-clamp-3">
                  {service.desc}
                </p>

                <div className="mb-4">
                  <div className="font-space text-[9px] md:text-[10px] tracking-[0.2em] text-red/80 uppercase mb-3 border-b border-white/10 pb-2 flex justify-between">
                    <span>Technical_Specs</span>
                    <span className="text-white/30">{service.params}</span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-space text-red text-[10px] mt-[2px]">
                          {`>`}
                        </span>
                        <span className="font-inter text-[11px] md:text-xs text-white leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Bottom Price & Action */}
                <div className="mt-auto pt-4 border-t border-white/10 shrink-0 flex flex-col">
                  {/* Delivery & Base Deployment Section */}
                  <div className="border-b border-white/10 pb-3 mb-3 flex flex-col">
                    <div className="font-space text-[10px] text-white/50 tracking-[0.3em] uppercase font-bold mb-1">
                      {service.delivery}
                    </div>
                    <div className="font-space text-[10px] text-white/50 tracking-[0.3em] uppercase font-bold">
                      Base_Deployment
                    </div>
                  </div>
                  
                  {/* Price & Contact CTA */}
                  <div className="flex items-center justify-between">
                    <div className="font-bebas text-4xl text-white leading-none tracking-tight drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]">
                      <span className="text-red text-xl mr-2 font-inter align-top">₹</span>
                      {service.price}
                    </div>
                    
                    {/* Action Button */}
                    <a 
                      href="#contact" 
                      className="px-4 h-10 md:h-12 border border-red bg-red flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 shrink-0"
                      data-cursor="cta"
                      aria-label="Contact for this service"
                    >
                      <span className="font-space text-[10px] uppercase tracking-[0.2em] text-white">Contact</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white -rotate-45">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
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
