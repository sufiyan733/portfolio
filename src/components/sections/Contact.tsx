"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const GithubIcon = ({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.78c.15-.38.65-1.79-.15-3.72C18.3 4.2 16 5.5 16 5.5c-1-.25-2.1-.38-3-.38s-2 .13-3 .38c0 0-2.3-1.3-3.67-.84-.8 1.93-.3 3.34-.15 3.72A5.2 5.2 0 0 0 4.6 11.5c0 5.23 3 6.42 6 6.76A4.8 4.8 0 0 0 9.6 21v1"/>
  </svg>
);

const InstagramIcon = ({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

type Particle = {
  width: string;
  height: string;
  top: string;
  left: string;
  animation: string;
  opacity: number;
};

function createParticleRandom(seed = 1984) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rnd = createParticleRandom(1984);
const PARTICLES: Particle[] = Array.from({ length: 50 }, () => ({
  width: `${rnd() * 2 + 1}px`,
  height: `${rnd() * 2 + 1}px`,
  top: `${rnd() * 100}%`,
  left: `${rnd() * 100}%`,
  animation: `float-particle ${rnd() * 10 + 10}s linear infinite`,
  opacity: rnd() * 0.5 + 0.1,
}));

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ayanokoji Float Animation
      gsap.fromTo(".ayanokoji-wrapper",
        { y: 0 },
        {
          y: -20,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        }
      );

      // Ayanokoji Scroll Animation (Fades IN and drifts into place)
      gsap.fromTo(".ayanokoji-wrapper", 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1.2
          }
        }
      );

      // Glitch effect on enter
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();
          const offsets = [8, -6, 4, 0];

          offsets.forEach((xPos) => {
            tl.to(titleRef.current, {
              x: xPos,
              duration: 0.06,
              ease: "none",
            });
          });
        }
      });

      // Slide up cards staggered
      gsap.fromTo(".contact-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
          }
        }
      );

      // Mouse Parallax Effect for Background Depth
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth <= 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(".bg-parallax", {
          x: x * -40,
          y: y * -40,
          duration: 1.2,
          ease: "power2.out",
        });
        
        gsap.to(".bg-parallax-reverse", {
          x: x * 20,
          y: y * 20,
          duration: 1.2,
          ease: "power2.out",
        });
      };
      
      const currentContainer = containerRef.current;
      if (currentContainer) {
        currentContainer.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (currentContainer) {
          currentContainer.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("sufiyanxdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={containerRef} className="relative h-[100svh] md:min-h-screen md:h-auto flex flex-col items-center justify-center overflow-hidden py-0 md:py-32 mt-0 md:mt-32">

      {/* Top Energy Blend */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red/50 to-transparent z-30 shadow-[0_0_30px_rgba(255,51,51,0.6)]" />

      {/* Volumetric Top Light (Cinematic Stage Lighting) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(255,51,51,0.12),transparent_70%)] pointer-events-none z-0 mix-blend-screen" />

      {/* Dual-Layer Tactical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.06)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none z-0 bg-parallax-reverse" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none z-0 bg-parallax-reverse" />

      {/* Core Red Atmosphere */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.06),transparent_60%)] pointer-events-none z-0 ${isMobile ? '' : 'mix-blend-screen'}`} />

      {/* Massive Cinematic Background Title */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 opacity-100 mix-blend-screen select-none">
        <h2 
          ref={titleRef} 
          className="font-bebas text-[15vw] md:text-[28vw] leading-none tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-red/30 via-red/5 to-transparent drop-shadow-[0_0_80px_rgba(255,51,51,0.15)] whitespace-nowrap"
          style={{ WebkitTextStroke: "1px rgba(255,51,51,0.1)" }}
        >
          CONTACTS
        </h2>
      </div>

      {/* Hero Background Character */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center z-10 overflow-hidden">
        <div className={`ayanokoji-wrapper relative w-full max-w-[1000px] h-[95vh] opacity-100 ${isMobile ? '' : '[mask-image:linear-gradient(to_top,transparent_0%,black_10%,black_100%)]'}`}>
          <Image 
            src="/ayanokoji.png" 
            alt="The Strategist" 
            fill 
            className={`object-contain object-bottom scale-[1.05] ${isMobile ? '' : 'filter drop-shadow-[0_0_50px_rgba(255,30,30,0.5)]'} will-change-transform`}
            priority
          />
        </div>
      </div>

      {/* HTML Particle Field */}
      <div className={`absolute inset-0 z-10 pointer-events-none opacity-40 overflow-hidden mix-blend-screen ${isMobile ? 'hidden' : ''} [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]`}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute bg-red rounded-full will-change-transform shadow-[0_0_8px_rgba(255,51,51,0.8)]"
            style={p}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-particle {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100vh); }
        }
      `}} />

      {/* UI Overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center justify-end md:justify-center h-full pb-24 md:pb-0">
        <div className="contact-grid flex flex-col lg:flex-row items-center lg:items-end justify-between w-full max-w-7xl gap-2 md:gap-8 lg:gap-0 mt-auto md:mt-[10vh] lg:mt-[20vh]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-2 md:gap-6 w-full lg:w-[400px] lg:translate-x-16 z-20">
            {/* Email */}
            <button
              onClick={handleCopy}
              className={`contact-card group flex items-center justify-between p-2.5 px-4 md:p-6 bg-[#0A0303]/40 md:bg-[#0A0303]/70 backdrop-blur-xl md:backdrop-blur-3xl border border-red/20 md:border-red/30 border-l-red/60 md:border-l-red/80 shadow-[0_0_15px_rgba(255,51,51,0.05)] md:shadow-[0_0_20px_rgba(255,51,51,0.1)] hover:border-red hover:bg-[#1A0505]/90 active:scale-95 ${isMobile ? '' : 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,51,51,0.3)]'} transition-all duration-500 will-change-transform relative overflow-hidden text-left w-full rounded-2xl md:rounded-2xl`}
              data-cursor="cta"
            >
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-20`} />
              <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.02)_2px,rgba(255,51,51,0.02)_4px)] opacity-50 group-hover:opacity-100 pointer-events-none z-0`} />
              
              <div className={`flex items-center gap-3 md:gap-5 relative z-10 ${isMobile ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]'} ${copied ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className={`w-9 h-9 md:w-14 md:h-14 flex items-center justify-center rounded-full md:rounded-xl bg-red/10 border border-red/20 shadow-[inset_0_1px_10px_rgba(255,51,51,0.1)] group-hover:bg-red/20 group-hover:shadow-[inset_0_0_20px_rgba(255,51,51,0.3)] transition-all duration-500 text-red`}>
                  <Mail strokeWidth={1.5} className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-red/60 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mb-0 md:mb-1 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red/80 group-hover:bg-red group-hover:shadow-[0_0_8px_rgba(255,51,51,1)] transition-colors duration-500" />
                    Email
                  </span>
                  <span className={`font-bebas text-white group-hover:text-red text-xl md:text-3xl transition-colors duration-500 tracking-wide truncate max-w-[200px] sm:max-w-none group-hover:drop-shadow-[0_0_15px_rgba(255,51,51,0.6)] leading-none mt-1 md:mt-0`}>sufiyanxdev@gmail.com</span>
                </div>
              </div>

              <div className={`relative z-10 text-white/20 group-hover:text-red transition-all duration-500 ${copied ? 'opacity-0 scale-50' : `opacity-100 scale-100 transform group-hover:-translate-y-2 group-hover:translate-x-2`}`}>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-7 md:h-7" />
              </div>

              <div className={`absolute inset-0 flex items-center justify-center bg-red/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <span className="font-space text-[10px] md:text-[12px] tracking-[0.4em] text-white font-bold drop-shadow-[0_0_10px_rgba(255,51,51,0.8)] flex items-center gap-2 md:gap-3">
                  <Mail className="w-3 h-3 md:w-4 md:h-4" /> ADDRESS_COPIED ✓
                </span>
              </div>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/kaiizer777"
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card group flex items-center justify-between p-2.5 px-4 md:p-6 bg-[#0A0A0A]/40 md:bg-[#0A0A0A]/70 backdrop-blur-xl md:backdrop-blur-3xl border border-white/10 md:border-white/20 border-l-white/40 md:border-l-white/60 shadow-[0_0_15px_rgba(255,255,255,0.03)] md:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white hover:bg-[#1A1A1A]/90 active:scale-95 ${isMobile ? '' : 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]'} transition-all duration-500 will-change-transform relative overflow-hidden rounded-2xl md:rounded-2xl`}
              data-cursor="eye"
            >
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-20`} />
              <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] opacity-50 group-hover:opacity-100 pointer-events-none z-0`} />
              
              <div className="flex items-center gap-3 md:gap-5 relative z-10">
                <div className={`w-9 h-9 md:w-14 md:h-14 flex items-center justify-center rounded-full md:rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05)] group-hover:bg-white/20 group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500 text-white`}>
                  <div className="w-4 h-4 md:w-5 md:h-5"><GithubIcon size={24} strokeWidth={1.5} /></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-white/60 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mb-0 md:mb-1 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/80 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,1)] transition-colors duration-500" />
                    GitHub
                  </span>
                  <span className={`font-bebas text-white group-hover:text-white text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] leading-none mt-1 md:mt-0`}>kaiizer777</span>
                </div>
              </div>

              <div className={`relative z-10 text-white/20 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2`}>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-7 md:h-7" />
              </div>
            </a>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 md:gap-6 w-full lg:w-[400px] z-20">
            {/* Instagram */}
            <a
              href="https://instagram.com/kaiizer_dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card group flex items-center justify-between p-2.5 px-4 md:p-6 bg-[#0A050A]/40 md:bg-[#0A050A]/70 backdrop-blur-xl md:backdrop-blur-3xl border border-[#E1306C]/20 md:border-[#E1306C]/30 border-l-[#E1306C]/60 md:border-l-[#E1306C]/80 shadow-[0_0_15px_rgba(225,48,108,0.05)] md:shadow-[0_0_20px_rgba(225,48,108,0.1)] hover:border-[#E1306C] hover:bg-[#1A0A15]/90 active:scale-95 ${isMobile ? '' : 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(225,48,108,0.3)]'} transition-all duration-500 will-change-transform relative overflow-hidden rounded-2xl md:rounded-2xl`}
              data-cursor="eye"
            >
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-20`} />
              <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(225,48,108,0.02)_2px,rgba(225,48,108,0.02)_4px)] opacity-50 group-hover:opacity-100 pointer-events-none z-0`} />
              
              <div className="flex items-center gap-3 md:gap-5 relative z-10">
                <div className={`w-9 h-9 md:w-14 md:h-14 flex items-center justify-center rounded-full md:rounded-xl bg-[#E1306C]/10 border border-[#E1306C]/20 shadow-[inset_0_1px_10px_rgba(225,48,108,0.1)] group-hover:bg-[#E1306C]/20 group-hover:shadow-[inset_0_0_20px_rgba(225,48,108,0.3)] transition-all duration-500 text-[#E1306C]`}>
                  <div className="w-4 h-4 md:w-5 md:h-5"><InstagramIcon size={24} strokeWidth={1.5} /></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-[#E1306C]/60 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mb-0 md:mb-1 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#E1306C]/80 group-hover:bg-[#E1306C] group-hover:shadow-[0_0_8px_rgba(225,48,108,1)] transition-colors duration-500" />
                    Instagram
                  </span>
                  <span className={`font-bebas text-white group-hover:text-[#E1306C] text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(225,48,108,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(225,48,108,0.8)] truncate max-w-[200px] sm:max-w-none leading-none mt-1 md:mt-0`}>@kaiizer_dev</span>
                </div>
              </div>

              <div className={`relative z-10 text-white/20 group-hover:text-[#E1306C] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2`}>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-7 md:h-7" />
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918709914537"
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card group flex items-center justify-between p-2.5 px-4 md:p-6 bg-[#030A05]/40 md:bg-[#030A05]/70 backdrop-blur-xl md:backdrop-blur-3xl border border-[#25D366]/20 md:border-[#25D366]/30 border-l-[#25D366]/60 md:border-l-[#25D366]/80 shadow-[0_0_15px_rgba(37,211,102,0.05)] md:shadow-[0_0_20px_rgba(37,211,102,0.1)] hover:border-[#25D366] hover:bg-[#0A1A0F]/90 active:scale-95 ${isMobile ? '' : 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(37,211,102,0.3)]'} transition-all duration-500 will-change-transform relative overflow-hidden rounded-2xl md:rounded-2xl`}
              data-cursor="eye"
            >
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-20`} />
              <div className={`absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(37,211,102,0.02)_2px,rgba(37,211,102,0.02)_4px)] opacity-50 group-hover:opacity-100 pointer-events-none z-0`} />
              
              <div className="flex items-center gap-3 md:gap-5 relative z-10">
                <div className={`w-9 h-9 md:w-14 md:h-14 flex items-center justify-center rounded-full md:rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 shadow-[inset_0_1px_10px_rgba(37,211,102,0.1)] group-hover:bg-[#25D366]/20 group-hover:shadow-[inset_0_0_20px_rgba(37,211,102,0.3)] transition-all duration-500 text-[#25D366]`}>
                  <MessageCircle strokeWidth={1.5} className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-[#25D366]/60 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mb-0 md:mb-1 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#25D366]/80 group-hover:bg-[#25D366] group-hover:shadow-[0_0_8px_rgba(37,211,102,1)] transition-colors duration-500" />
                    WhatsApp
                  </span>
                  <span className={`font-bebas text-white group-hover:text-[#25D366] text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(37,211,102,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.8)] leading-none mt-1 md:mt-0`}>+91 87099 14537</span>
                </div>
              </div>

              <div className={`relative z-10 text-white/20 group-hover:text-[#25D366] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2`}>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-7 md:h-7" />
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
