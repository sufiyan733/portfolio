"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch effect on enter
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            x: () => gsap.utils.random(-10, 10),
            y: () => gsap.utils.random(-5, 5),
            opacity: 0.8,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
              gsap.set(titleRef.current, { x: 0, y: 0, opacity: 1 });
            }
          });
        }
      });

      // Slide up cards
      gsap.fromTo(".contact-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
    navigator.clipboard.writeText("kanekigaminz@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 bg-bg">
      {/* Ghost Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-[0.08] grayscale mix-blend-screen scale-110 animate-pulse" style={{ animationDuration: '3s' }}>
        <div className="relative w-[100vw] h-[150vh] opacity-30">
          <Image 
            src="/ayanokoji.png" 
            alt="" 
            fill 
            className="object-cover object-top opacity-50"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-12 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_10px_#00ff00] animate-pulse" />
          <span className="font-space text-xs tracking-widest text-white/80 uppercase">AVAILABLE FOR PROJECTS</span>
        </div>

        <h2 ref={titleRef} className="font-bebas text-7xl md:text-9xl text-white mb-20 text-center will-change-transform">
          INITIATE CONTACT
        </h2>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* WhatsApp */}
          <a 
            href="https://wa.me/918709914537" 
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group flex items-center p-6 md:p-8 bg-surface border border-white/10 hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.1)] transition-all duration-300 will-change-transform"
          >
            <div className="font-space text-white/50 text-xs tracking-widest uppercase w-24">WhatsApp</div>
            <div className="font-inter text-white group-hover:text-[#25D366] text-lg md:text-xl transition-colors">+91 87099 14537</div>
          </a>

          {/* Email */}
          <button 
            onClick={handleCopy}
            className="contact-card group flex items-center p-6 md:p-8 bg-surface border border-white/10 hover:border-red hover:shadow-[0_0_30px_rgba(255,51,51,0.15)] transition-all duration-300 relative overflow-hidden will-change-transform text-left"
          >
            <div className="font-space text-white/50 text-xs tracking-widest uppercase w-24">Email</div>
            <div className="font-inter text-white group-hover:text-red text-lg md:text-xl transition-colors">kanekigaminz@gmail.com</div>
            
            <div className={`absolute right-8 font-space text-xs tracking-widest text-red bg-red/10 px-3 py-1 rounded transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              COPIED
            </div>
          </button>

          {/* GitHub */}
          <a 
            href="https://github.com/sufiyan733" 
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group flex items-center p-6 md:p-8 bg-surface border border-white/10 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 will-change-transform"
          >
            <div className="font-space text-white/50 text-xs tracking-widest uppercase w-24">GitHub</div>
            <div className="font-inter text-white group-hover:text-white text-lg md:text-xl transition-colors">sufiyan733</div>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/mohd_sufiyan76" 
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group flex items-center p-6 md:p-8 bg-surface border border-white/10 hover:border-[#E1306C] hover:shadow-[0_0_30px_rgba(225,48,108,0.1)] transition-all duration-300 will-change-transform"
          >
            <div className="font-space text-white/50 text-xs tracking-widest uppercase w-24">Instagram</div>
            <div className="font-inter text-white group-hover:text-[#E1306C] text-lg md:text-xl transition-colors">@mohd_sufiyan76</div>
          </a>
        </div>
      </div>
    </section>
  );
}
