"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Reveal text and progress bars
      gsap.fromTo(".about-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 75%",
          }
        }
      );

      // Progress bars
      const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-fill");
      bars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(bar, 
          { width: "0%" },
          {
            width: targetWidth,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: "Frontend / React / Next.js", width: "95%" },
    { name: "Backend / Node.js", width: "90%" },
    { name: "Databases / SQL / NoSQL", width: "85%" },
    { name: "Animation / GSAP / Three.js", width: "80%" },
  ];

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.05)_0%,transparent_50%)] pointer-events-none" />

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
          <div className="about-content flex gap-6 will-change-transform">
            <span className="font-bebas text-6xl md:text-9xl text-red leading-[0.8] mt-2">"</span>
            <div className="flex flex-col gap-6 font-inter text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed max-w-xl">
              <p>
                I don't talk about what I'll do. I build it. <span className="text-white font-medium">Cold logic, clean code, zero compromise.</span>
              </p>
              <p>
                If you need a developer who debugs at 3AM without complaining — <span className="text-red font-medium">you found one.</span>
              </p>
            </div>
          </div>

          {/* Right: Skills Timeline */}
          <div className="about-content flex flex-col justify-center gap-10 will-change-transform">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex justify-between font-space text-sm tracking-widest uppercase">
                  <span className="text-white/70">{skill.name}</span>
                  <span className="text-red">{skill.width}</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                  <div 
                    className="skill-bar-fill absolute top-0 left-0 h-full bg-red origin-left will-change-transform"
                    data-width={skill.width}
                  />
                  {/* Glow on the tip of the progress bar */}
                  <div className="absolute top-0 right-0 h-full w-4 bg-white/50 blur-[2px] -translate-y-1/2" style={{ left: `calc(${skill.width} - 8px)`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
