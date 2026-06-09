"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const ayanokojiRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating idle animation
      gsap.to(ayanokojiRef.current, {
        y: "-=15",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Parallax scroll for Ayanokoji
      gsap.to(ayanokojiRef.current, {
        x: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      
      // Scroll indicator breathing
      gsap.to(".scroll-line", {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={container} className="relative h-screen w-full flex items-center overflow-hidden pt-20">
      <ParticleField />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
        <div ref={textContainerRef} className="w-full md:w-1/2 flex flex-col justify-center mt-20 md:mt-0 relative z-20">
          <h1 className="font-bebas text-[20vw] leading-[0.8] text-white tracking-tighter hero-title opacity-0 will-change-transform">
            SAIF
          </h1>
          
          <div className="relative mt-2 overflow-hidden inline-block self-start opacity-0 hero-subtitle will-change-transform">
            <h2 className="font-space text-red text-xl md:text-3xl tracking-widest uppercase type-writer pr-2 border-r-2 border-red animate-pulse whitespace-nowrap">
              Full Stack Developer
            </h2>
            <div className="h-[2px] w-full bg-red origin-left absolute -bottom-1 left-0 hero-line will-change-transform scale-x-0" />
          </div>
          
          <p className="font-inter text-muted italic mt-6 text-sm md:text-base opacity-0 hero-desc will-change-transform">
            prolly debugging life !!
          </p>
        </div>
        
        <div 
          ref={ayanokojiRef}
          className="absolute right-0 bottom-0 w-[85vw] md:w-[50vw] h-[70vh] md:h-[90vh] translate-x-10 md:translate-x-0 pointer-events-auto z-10 opacity-0 hero-image will-change-transform"
          data-cursor="eye"
        >
          <Image 
            src="/ayanokoji.png" 
            alt="The Strategist" 
            fill 
            priority
            className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(255,30,30,0.5)]"
          />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator opacity-0 will-change-transform z-20">
        <span className="font-space text-[10px] tracking-widest text-white/50 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-red origin-top scale-y-0 scroll-line will-change-transform" />
        </div>
      </div>
    </section>
  );
}
