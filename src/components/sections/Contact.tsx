"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";

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

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles client-side only
  useEffect(() => {
    const generated = Array.from({ length: 50 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(generated);
  }, []);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("kaizerxdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 bg-gradient-to-b from-[#020202] via-[#050505] to-[#020202] mt-20 md:mt-32">

      {/* Cinematic Top Separator (Black Void + Energy Line) */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red/80 to-transparent z-30 shadow-[0_0_15px_rgba(255,51,51,0.8)]" />

      {/* Background Tactical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0 mt-20" />

      {/* Background Deep Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-6xl h-[100vh] bg-red/20 blur-[150px] pointer-events-none z-0 rounded-full mix-blend-screen" />

      {/* Massive Background Title */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none z-0">
          <h2 ref={titleRef} className="font-bebas text-[18vw] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.05)] whitespace-nowrap will-change-transform">
            CONTACTS
          </h2>
      </div>

      {/* Hero Background Character */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center z-10 overflow-hidden">
        <div className="ayanokoji-wrapper relative w-full max-w-[1000px] h-[95vh] opacity-100 [mask-image:linear-gradient(to_top,transparent_0%,black_5%,black_100%)]">
          <Image 
            src="/ayanokoji.png" 
            alt="The Strategist" 
            fill 
            className="object-contain object-bottom scale-[1.05] filter drop-shadow-[0_0_60px_rgba(255,30,30,0.6)] will-change-transform"
            priority
          />
        </div>
      </div>

      {/* HTML Particle Field */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 overflow-hidden mix-blend-screen">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-red rounded-full will-change-transform blur-[1px]"
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
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center h-full mt-20">
        <div className="contact-grid flex flex-col lg:flex-row items-center lg:items-end justify-between w-full max-w-7xl gap-4 md:gap-8 lg:gap-0 mt-[10vh] lg:mt-[20vh]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[400px] lg:translate-x-16 z-20">
            {/* WhatsApp */}
            <a
              href="https://wa.me/918709914537"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group flex items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#111111]/90 to-[#050505]/60 backdrop-blur-3xl border border-white/10 hover:border-[#25D366]/50 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(37,211,102,0.15)] transition-all duration-500 will-change-transform relative overflow-hidden rounded-xl"
              data-cursor="eye"
            >
              <div className="absolute left-0 top-0 w-[2px] h-full bg-[#25D366] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-20" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(37,211,102,0.015)_2px,rgba(37,211,102,0.015)_4px)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(37,211,102,0)] group-hover:shadow-[inset_0_0_50px_rgba(37,211,102,0.03)] transition-shadow duration-500 rounded pointer-events-none z-0" />
              
              <div className="flex items-center gap-4 md:gap-5 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#25D366]/10 border border-[#25D366]/30 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/60 transition-colors duration-500 text-[#25D366]">
                  <MessageCircle size={18} strokeWidth={1.5} className="md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-0.5 md:mb-1">WhatsApp</span>
                  <span className="font-bebas text-[#25D366] text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(37,211,102,0.3)]">+91 87099 14537</span>
                </div>
              </div>

              <div className="relative z-10 text-[#25D366]/50 group-hover:text-[#25D366] transition-all duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
            </a>

            {/* Email */}
            <button
              onClick={handleCopy}
              className="contact-card group flex items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#111111]/90 to-[#050505]/60 backdrop-blur-3xl border border-white/10 hover:border-red/50 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,51,51,0.15)] transition-all duration-500 will-change-transform relative overflow-hidden text-left w-full rounded-xl"
              data-cursor="cta"
            >
              <div className="absolute left-0 top-0 w-[2px] h-full bg-red origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-20" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,51,51,0.015)_2px,rgba(255,51,51,0.015)_4px)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              
              <div className={`flex items-center gap-4 md:gap-5 relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-red/10 border border-red/30 group-hover:bg-red/20 group-hover:border-red/60 transition-colors duration-500 text-red">
                  <Mail size={18} strokeWidth={1.5} className="md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-0.5 md:mb-1">Email</span>
                  <span className="font-bebas text-red text-xl md:text-3xl transition-colors duration-500 tracking-wide truncate max-w-[180px] sm:max-w-none drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]">kaizerxdev@gmail.com</span>
                </div>
              </div>

              <div className={`relative z-10 text-red/50 group-hover:text-red transition-all duration-500 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100 transform group-hover:-translate-y-1 group-hover:translate-x-1'}`}>
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>

              <div className={`absolute inset-0 flex items-center justify-center bg-red/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <span className="font-space text-[12px] tracking-[0.4em] text-white font-bold drop-shadow-[0_0_10px_rgba(255,51,51,0.8)] flex items-center gap-3">
                  <Mail size={16} /> ADDRESS_COPIED ✓
                </span>
              </div>
            </button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[400px] z-20">
            {/* GitHub */}
            <a
              href="https://github.com/kaiizer777"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group flex items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#111111]/90 to-[#050505]/60 backdrop-blur-3xl border border-white/10 hover:border-white/50 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)] transition-all duration-500 will-change-transform relative overflow-hidden rounded-xl"
              data-cursor="eye"
            >
              <div className="absolute left-0 top-0 w-[2px] h-full bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-20" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_50px_rgba(255,255,255,0.03)] transition-shadow duration-500 rounded pointer-events-none z-0" />
              
              <div className="flex items-center gap-4 md:gap-5 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/30 group-hover:bg-white/20 group-hover:border-white/60 transition-colors duration-500 text-white">
                  <GithubIcon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-0.5 md:mb-1">GitHub</span>
                  <span className="font-bebas text-white text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">kaiizer777</span>
                </div>
              </div>

              <div className="relative z-10 text-white/50 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/misterr_stoic"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group flex items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#111111]/90 to-[#050505]/60 backdrop-blur-3xl border border-white/10 hover:border-[#E1306C]/50 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(225,48,108,0.15)] transition-all duration-500 will-change-transform relative overflow-hidden rounded-xl"
              data-cursor="eye"
            >
              <div className="absolute left-0 top-0 w-[2px] h-full bg-[#E1306C] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-20" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(225,48,108,0.015)_2px,rgba(225,48,108,0.015)_4px)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(225,48,108,0)] group-hover:shadow-[inset_0_0_50px_rgba(225,48,108,0.03)] transition-shadow duration-500 rounded pointer-events-none z-0" />
              
              <div className="flex items-center gap-4 md:gap-5 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 group-hover:bg-[#E1306C]/20 group-hover:border-[#E1306C]/60 transition-colors duration-500 text-[#E1306C]">
                  <InstagramIcon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-0.5 md:mb-1">Instagram</span>
                  <span className="font-bebas text-[#E1306C] text-xl md:text-3xl transition-colors duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(225,48,108,0.3)] truncate max-w-[180px] sm:max-w-none">@misterr_stoic</span>
                </div>
              </div>

              <div className="relative z-10 text-[#E1306C]/50 group-hover:text-[#E1306C] transition-all duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
