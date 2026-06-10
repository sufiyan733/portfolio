"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoHover = (e: React.MouseEvent) => {
    const chars = e.currentTarget.querySelectorAll(".logo-char");
    gsap.to(chars, {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const navLinks = [
    { name: "WHO AM I", href: "#about" },
    { name: "ARSENAL", href: "#skills" },
    { name: "MISSIONS", href: "#projects" },
    { name: "OFFER", href: "#offer" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 will-change-transform ${
        isScrolled ? "bg-surface/60 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-bebas text-3xl text-red relative group"
          onMouseEnter={handleLogoHover}
        >
          <span className="flex overflow-hidden">
            {"SAIF.".split("").map((char, i) => (
              <span key={i} className="logo-char inline-block">{char}</span>
            ))}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="font-space text-sm tracking-widest text-white/70 hover:text-white relative group py-2 transition-colors"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-end w-10 h-10 z-[60] relative group gap-2 outline-none focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isMobileMenuOpen ? "w-8 rotate-45 translate-y-[10px]" : "w-8 group-hover:w-6"}`} />
          <span className={`h-[2px] bg-red transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isMobileMenuOpen ? "w-0 opacity-0" : "w-6 group-hover:w-8"}`} />
          <span className={`h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isMobileMenuOpen ? "w-8 -rotate-45 -translate-y-[10px]" : "w-8 group-hover:w-4"}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Card */}
      <div 
        className={`fixed top-24 right-4 w-[calc(100%-2rem)] max-w-sm bg-[#050505]/95 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 z-50 flex flex-col shadow-[0_0_50px_rgba(255,51,51,0.15)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden will-change-transform origin-top-right overflow-hidden`}
        style={{
          transform: isMobileMenuOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-20px)",
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
      >
        {/* Subtle top glare */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center gap-3 mb-6 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse shadow-[0_0_8px_rgba(255,51,51,0.8)]" />
          <span className="font-space text-[10px] tracking-widest text-white/40 uppercase">System_Nav</span>
        </div>
        
        <nav className="flex flex-col w-full">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group relative flex items-center justify-between py-4 px-2 border-b border-white/5 last:border-0 overflow-hidden"
            >
              {/* Animated highlight line on the left */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              
              <div className="flex items-center gap-4 relative z-10 pl-2">
                <span className="font-space text-xs text-red opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,51,51,0.8)] transition-all">
                  0{i + 1}
                </span>
                <span className="font-bebas text-4xl tracking-wide text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                  {link.name}
                </span>
              </div>

              {/* Circular arrow icon */}
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red/50 group-hover:bg-red/10 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-red transition-all -translate-x-0.5 group-hover:translate-x-0.5 duration-300">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </nav>

        {/* Tech Footer */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="font-space text-[9px] tracking-[0.2em] text-white/30">
            STATUS: <span className="text-[#00ff00] animate-pulse">ONLINE</span>
          </div>
          <div className="font-space text-[9px] tracking-[0.2em] text-white/30">
            SYS. V2.0
          </div>
        </div>
      </div>
    </header>
  );
}
