"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });
      
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      })
      .fromTo(".loader-char", {
        y: -100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out"
      })
      .fromTo(".loader-sub-char", {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.inOut"
      }, "+=0.2")
      .to(".loader-particle", {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        opacity: 0,
        scale: "random(0.5, 1.5)",
        duration: 1,
        stagger: 0.02,
        ease: "power4.out"
      }, "-=0.5")
      .to(containerRef.current, {
        y: "-100vh",
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.5
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [onComplete]);

  const splitText = (text: string, className: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className={`inline-block ${className} will-change-transform`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[1000] bg-bg flex flex-col items-center justify-center overflow-hidden will-change-transform"
    >
      <div 
        ref={lineRef} 
        className="absolute top-1/2 left-0 w-full h-[2px] bg-red origin-left scale-x-0"
      />
      
      {/* CSS Particles Burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="loader-particle absolute w-1 h-1 bg-white rounded-full opacity-0"
            style={{ 
              backgroundColor: i % 5 === 0 ? 'var(--red)' : 'white',
              boxShadow: i % 5 === 0 ? '0 0 10px var(--red)' : 'none'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <h1 className="font-bebas text-8xl md:text-[10rem] text-white leading-none overflow-hidden pb-4">
          {splitText("SAIF", "loader-char")}
        </h1>
        <div className="font-space text-red tracking-[0.3em] text-sm md:text-base uppercase mt-4 overflow-hidden">
          {splitText("Full Stack Developer", "loader-sub-char")}
        </div>
      </div>
    </div>
  );
}
