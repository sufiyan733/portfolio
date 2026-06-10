"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import dynamic from "next/dynamic";

const FloatingIcons = dynamic(() => import("../three/FloatingIcons"), { ssr: false });

const allSkills = [
  "React.js", "Next.js 14", "TypeScript", "Tailwind CSS", "GSAP", "Lenis",
  "Three.js", "Node.js", "PostgreSQL", "MongoDB", "REST APIs", "Server Actions",
  "Vercel", "Framer Motion", "WebGL",
];

const stableRow1 = [...allSkills];
const stableRow2 = [...allSkills].reverse();

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [row1, setRow1] = useState(stableRow1);
  const [row2, setRow2] = useState(stableRow2);

  // Shuffle client-side only — avoids SSR mismatch
  useEffect(() => {
    const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
    setRow1(shuffle(allSkills));
    setRow2(shuffle(allSkills));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.fromTo(".arsenal-char", {
        y: "110%",
        rotationZ: 5,
      }, {
        y: "0%",
        rotationZ: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".arsenal-title-container",
          start: "top 80%",
        },
      });

      // Background text parallax — transform only
      gsap.to(bgTextRef.current, {
        x: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Continuous marquee tweens
        const marquee1 = gsap.to(marquee1Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 25,
          repeat: -1,
        });

        const marquee2 = gsap.to(marquee2Ref.current, {
          xPercent: 50,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
        gsap.set(marquee2Ref.current, { xPercent: -50 });

        // Proper smooth velocity physics
        let targetVelocity = 1;
        let currentVelocity = 1;

        const tickerId = gsap.ticker.add(() => {
          // Smoothly lerp the current timescale towards the target timescale
          currentVelocity += (targetVelocity - currentVelocity) * 0.1;
          
          // Friction: smoothly decay the target timescale back to baseline 1
          targetVelocity += (1 - targetVelocity) * 0.05;

          marquee1.timeScale(currentVelocity);
          marquee2.timeScale(currentVelocity);
        });

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            // Map scroll velocity to a reasonable timescale range
            const scaled = 1 + (v / 300);
            targetVelocity = scaled;
          },
        });

        return () => {
          gsap.ticker.remove(tickerId);
          st.kill();
        };
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative min-h-screen py-32 bg-[#020202] overflow-hidden flex flex-col justify-center">

      {/* 3D Icons — lightweight, ssr:false */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <FloatingIcons />
      </div>

      {/* Faint ARSENAL background text */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden">
        <div ref={bgTextRef} className="font-bebas text-[30vw] leading-none whitespace-nowrap text-white -translate-x-[20%] will-change-transform">
          ARSENAL ARSENAL ARSENAL
        </div>
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-8">
            <div className="arsenal-title-container overflow-hidden">
              <h2 className="font-bebas text-7xl md:text-[9rem] text-white leading-[0.85] tracking-tighter flex">
                {"ARSENAL".split("").map((char, i) => (
                  <span key={i} className="arsenal-char block will-change-transform translate-y-full origin-bottom-left">
                    {char}
                  </span>
                ))}
              </h2>
            </div>
            <div className="font-space text-xs tracking-[0.3em] text-white/40 uppercase max-w-xs mt-8 md:mt-0 leading-relaxed text-right">
              Technologies weaponized for flawless execution.
            </div>
          </div>
        </div>

        {/* Marquees */}
        <div className="flex flex-col gap-8 w-full overflow-hidden my-12 rotate-[-2deg] scale-110">

          <div className="flex whitespace-nowrap items-center will-change-transform" ref={marquee1Ref}>
            {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
              <div
                key={i}
                className="skill-pill inline-block flex-shrink-0 mx-4 px-8 py-4 border border-white/20 bg-white/5 rounded-full font-space text-sm md:text-base tracking-widest uppercase text-white/80 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,51,51,0.4)] hover:border-red hover:text-white transition-all duration-300 relative hover:z-10 hover:bg-red/10 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>

          <div className="flex whitespace-nowrap items-center will-change-transform" ref={marquee2Ref}>
            {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
              <div
                key={i}
                className="skill-pill inline-block flex-shrink-0 mx-4 px-8 py-4 border border-white/20 bg-white/5 rounded-full font-space text-sm md:text-base tracking-widest uppercase text-white/80 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,51,51,0.4)] hover:border-red hover:text-white transition-all duration-300 relative hover:z-10 hover:bg-red/10 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>

        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex justify-between items-center mt-24 font-space text-[10px] tracking-[0.3em] text-white/30 uppercase">
            <span>{allSkills.length} CLASSIFICATIONS</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red animate-pulse" />
              SYSTEM_STABLE
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
