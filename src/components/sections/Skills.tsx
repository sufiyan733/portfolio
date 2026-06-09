"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const FloatingIcons = dynamic(() => import("../three/FloatingIcons"), { ssr: false });

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title gravity bounce reveal
      gsap.from(".arsenal-char", {
        y: -150,
        opacity: 0,
        rotationX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const techStack = [
    "Next.js", "PostgreSQL", "MongoDB", "Node.js", "TypeScript", 
    "React", "GSAP", "Three.js", "Tailwind", "REST APIs",
    "Next.js", "PostgreSQL", "MongoDB", "Node.js", "TypeScript", 
    "React", "GSAP", "Three.js", "Tailwind", "REST APIs"
  ];

  return (
    <section id="skills" ref={containerRef} className="relative min-h-screen py-32 flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingIcons />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <h2 className="font-bebas text-6xl md:text-[12rem] text-center text-white leading-none overflow-hidden pb-4">
          {"ARSENAL".split("").map((char, i) => (
            <span key={i} className="arsenal-char inline-block will-change-transform">{char}</span>
          ))}
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative z-10 w-full flex overflow-hidden py-10 bg-black/50 backdrop-blur-md border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className="mx-4 md:mx-8 px-6 py-3 md:px-10 md:py-4 border border-red/30 bg-surface rounded-full text-white/80 font-space text-lg md:text-2xl uppercase tracking-wider hover:border-red hover:text-white hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] transition-all duration-300 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
        {/* Duplicate for infinite effect */}
        <div className="flex animate-marquee whitespace-nowrap absolute top-0 py-10">
          {techStack.map((tech, index) => (
            <div 
              key={`dup-${index}`} 
              className="mx-4 md:mx-8 px-6 py-3 md:px-10 md:py-4 border border-red/30 bg-surface rounded-full text-white/80 font-space text-lg md:text-2xl uppercase tracking-wider hover:border-red hover:text-white hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] transition-all duration-300 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
