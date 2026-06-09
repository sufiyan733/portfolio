"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Offer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards float in
      gsap.fromTo(".offer-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".offer-cards-container",
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Landing Pages", desc: "High-conversion, cinematic designs that demand attention." },
    { title: "E-Commerce", desc: "Performant, seamless shopping experiences built to scale." },
    { title: "Full Stack Apps", desc: "Robust architectures with scalable backends and intuitive UI." }
  ];

  return (
    <section id="offer" ref={containerRef} className="min-h-screen py-32 bg-black relative flex flex-col items-center justify-center border-t border-white/5">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-space tracking-[0.5em] text-red text-sm md:text-base uppercase mb-6">
          FIRST CLIENT SPECIAL
        </h2>
        
        <div className="font-bebas text-7xl md:text-[10rem] text-white leading-none mb-20 flex justify-center items-center">
          <span className="text-red mr-2 md:mr-6">₹</span>
          <span>999</span>
        </div>

        <div className="offer-cards-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {services.map((service, idx) => (
            <div key={idx} className="offer-card group relative bg-surface p-8 md:p-10 border border-white/5 text-left will-change-transform">
              {/* SVG Animated Border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <rect 
                  width="100%" 
                  height="100%" 
                  fill="none" 
                  stroke="var(--red)" 
                  strokeWidth="2" 
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="group-hover:stroke-dashoffset-0 transition-all duration-[1.5s] ease-out"
                  style={{ transitionProperty: 'stroke-dashoffset' }}
                />
              </svg>
              
              <h3 className="font-space font-bold text-xl text-white mb-4 uppercase tracking-widest">{service.title}</h3>
              <p className="font-inter text-white/60 text-sm md:text-base">{service.desc}</p>
            </div>
          ))}
        </div>

        <button className="group relative font-space font-bold uppercase tracking-widest text-lg px-12 py-6 bg-red text-white overflow-hidden transition-all duration-300 hover:text-red hover:shadow-[0_0_40px_rgba(255,51,51,0.4)]">
          <span className="relative z-10 group-hover:text-red transition-colors duration-300">HIRE ME FOR ₹999</span>
          <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] z-0" />
        </button>
      </div>
    </section>
  );
}
