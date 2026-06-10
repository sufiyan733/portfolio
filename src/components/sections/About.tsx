"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgNumberRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  const [skillWidths, setSkillWidths] = useState([0, 0, 0, 0]);

  useEffect(() => {
    let handleMouseMove: (e: MouseEvent) => void;

    const ctx = gsap.context(() => {
      // Background Number Morphing
      gsap.to(bgNumberRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          onEnter: () => {
            if (bgNumberRef.current) bgNumberRef.current.innerText = "02";
          },
          onLeaveBack: () => {
            if (bgNumberRef.current) bgNumberRef.current.innerText = "01";
          }
        }
      });

      // Mouse Follow Glow - Throttled using gsap.quickTo for high performance
      if (glowRef.current) {
        const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power2.out" });
        const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power2.out" });

        handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left - window.innerWidth / 2;
          const y = e.clientY - rect.top - window.innerHeight / 2;
          
          xTo(x);
          yTo(y);
        };
        
        containerRef.current?.addEventListener("mousemove", handleMouseMove);
      }

      // Reveal Title
      gsap.fromTo(textRef.current, 
        { clipPath: "inset(0 100% 0 0)" },
        { 
          clipPath: "inset(0 0% 0 0)", 
          duration: 1.2, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );

      // Glowing border animation
      gsap.fromTo(".about-border", 
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Word-by-word Quote Reveal
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.quote-word');
        gsap.fromTo(words, 
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Progress bars fill & count up
      const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-container");
      bars.forEach((bar, index) => {
        const fill = bar.querySelector(".skill-bar-fill");
        const targetWidthStr = bar.getAttribute("data-width") || "0%";
        const targetWidthNum = parseInt(targetWidthStr, 10);
        
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetWidthNum,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
          },
          onUpdate: () => {
            setSkillWidths(prev => {
              const newWidths = [...prev];
              newWidths[index] = Math.round(obj.val);
              return newWidths;
            });
            if (fill) {
              gsap.set(fill, { width: `${obj.val}%` });
            }
          }
        });
      });

    }, containerRef);

    return () => {
      if (handleMouseMove) {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      }
      ctx.revert();
    };
  }, []);

  const skills = [
    { name: "Frontend / React / Next.js", width: "95" },
    { name: "Backend / Node.js", width: "90" },
    { name: "Databases / SQL / NoSQL", width: "85" },
    { name: "Animation / GSAP / Three.js", width: "80" },
  ];

  const wrapWords = (text: string, isRed = false) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className={`quote-word inline-block relative ${isRed ? "text-red font-medium" : ""}`} style={{ clipPath: "inset(0 100% 0 0)" }}>
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      {/* Background Glow (Follows Mouse) */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.05)_0%,transparent_60%)] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      {/* Giant faint number */}
      <div className="absolute top-20 left-10 pointer-events-none select-none z-0">
        <span ref={bgNumberRef} className="font-bebas text-[30vw] leading-none text-white opacity-[0.03]">01</span>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute w-full h-full" preserveAspectRatio="none">
          <rect 
            width="100%" 
            height="100%" 
            fill="none" 
            stroke="var(--red)" 
            strokeWidth="2" 
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="about-border"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <h2 ref={textRef} className="font-bebas text-6xl md:text-8xl lg:text-[10rem] leading-none text-white opacity-20 relative will-change-transform">
          WHO AM I
        </h2>

        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mt-16 md:mt-[-4rem]">
          {/* Left: Quote */}
          <div className="about-content flex gap-6 will-change-transform relative z-10" ref={quoteRef}>
            <span className="font-bebas text-6xl md:text-9xl text-red leading-[0.8] mt-2">"</span>
            <div className="flex flex-col gap-6 font-inter text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed max-w-xl">
              <p>
                {wrapWords("I build websites that work — not just ones that look good in screenshots. ")}
                <span className="text-white font-medium">{wrapWords("Self-taught. Detail-obsessed. Deadline-respecting.")}</span>
              </p>
              <p>
                {wrapWords("You have a deadline. I have a solution — ")}
                {wrapWords("Open for work.", true)}
              </p>
            </div>
          </div>

          {/* Right: Skills Timeline */}
          <div className="about-content flex flex-col justify-center gap-10 will-change-transform relative z-10">
            {skills.map((skill, index) => (
              <div key={index} className="skill-bar-container flex flex-col gap-3" data-width={skill.width}>
                <div className="flex justify-between font-space text-sm tracking-widest uppercase">
                  <span className="text-white/70">{skill.name}</span>
                  <span className="text-red tabular-nums">{skillWidths[index]}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                  <div 
                    className="skill-bar-fill absolute top-0 left-0 h-full bg-red origin-left will-change-transform"
                    style={{ width: "0%" }}
                  />
                  {/* Glow on the tip of the progress bar */}
                  <div className="absolute top-0 right-0 h-full w-4 bg-white/50 blur-[2px] -translate-y-1/2 will-change-transform" style={{ left: `calc(${skillWidths[index]}% - 8px)`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
