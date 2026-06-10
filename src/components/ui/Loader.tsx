"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const progressObj = { value: 0 };
  const slicesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });
      
      // Black screen holds for 0.3s
      tl.to({}, { duration: 0.3 })
      
      // Single red line scaleX: 0->1 from left, 0.6s, power4.out
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power4.out",
      })
      
      // "KAIZER" SplitText: each letter y:-120->0, stagger:0.07, ease:expo.out, duration:0.8
      .fromTo(".loader-char", {
        y: -120,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "expo.out"
      })
      
      // Subtext
      .fromTo(".loader-sub-char", {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.inOut"
      }, "+=0.2")

      // Percentage counter 0->100 in 1.5s
      .to(progressObj, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(progressObj.value));
          // Progress bar is driven by this timeline, or we can use another element
        }
      }, "-=0.5")
      
      // Particles
      .to(".loader-particle", {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        opacity: 0,
        scale: "random(0.5, 1.5)",
        duration: 1,
        stagger: 0.02,
        ease: "power4.out"
      }, "-=0.5")
      
      // Wait a moment at 100%
      .to({}, { duration: 0.2 })

      // At 100%: screen slices into 4 horizontal strips, each sliding off in alternating directions
      .to(slicesRef.current, {
        xPercent: (i) => (i % 2 === 0 ? 100 : -100),
        duration: 0.8,
        ease: "power4.inOut",
        stagger: 0.06
      })
      // Fade out container to avoid blocking
      .to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.1
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
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden will-change-transform bg-transparent pointer-events-auto touch-none"
    >
      {/* 4 Horizontal Slices */}
      <div className="absolute inset-0 z-0 flex flex-col w-full h-full pointer-events-auto">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            ref={(el) => {
              if (el) slicesRef.current[i] = el;
            }}
            className="w-full flex-1 bg-[#030303] will-change-transform origin-center border-b border-white/5 last:border-none"
          />
        ))}
      </div>

      <div 
        ref={lineRef} 
        className="absolute top-1/2 left-0 w-full h-[2px] bg-red origin-left scale-x-0 z-10"
      />
      
      {/* CSS Particles Burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
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
      
      <div className="relative z-20 text-center flex flex-col items-center justify-center pointer-events-none">
        <h1 className="font-bebas text-8xl md:text-[10rem] text-white leading-none overflow-hidden pb-4">
          {splitText("KAIZER", "loader-char")}
        </h1>
        <div className="font-space text-red tracking-[0.3em] text-sm md:text-base uppercase mt-4 overflow-hidden h-8">
          {splitText("Full Stack Developer", "loader-sub-char")}
        </div>
      </div>

      {/* Progress Counter & Loading Bar at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 flex flex-col items-center z-20 pointer-events-none">
        <div className="font-space text-red text-xl mb-4 tabular-nums tracking-widest">{progress}%</div>
        <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-red origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
