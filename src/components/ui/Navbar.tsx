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
        isScrolled ? "py-4 border-b border-white/5" : "py-8"
      }`}
    >
      {/* Scroll Background Layer (Fixes nested backdrop-blur bug) */}
      <div className={`absolute inset-0 -z-10 transition-all duration-500 ${isScrolled ? "bg-[#030303]/80 backdrop-blur-xl" : "bg-transparent opacity-0"}`} />

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative z-10">
        <Link 
          href="/" 
          className="font-bebas text-3xl text-red relative group"
          onMouseEnter={handleLogoHover}
        >
          <span className="flex overflow-hidden">
            {"KAIZER.".split("").map((char, i) => (
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Card (Top Sheet) */}
      <div 
        className={`fixed top-0 left-0 w-full max-h-[50vh] bg-[#020202]/70 backdrop-blur-3xl z-40 border-b border-white/5 rounded-b-[2rem] flex flex-col px-8 pt-10 pb-8 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden will-change-transform origin-top shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,51,51,0.2)]`}
        style={{
          transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
      >
        {/* Close Button Inside Card */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/40 active:text-red transition-colors z-50 bg-white/5 rounded-full backdrop-blur-sm border border-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col flex-1 mt-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <nav className="flex flex-col w-full gap-4">
            {navLinks.map((link, i) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-6 group relative py-1"
              >
                {/* Tech dot indicator */}
                <span className="w-1 h-1 bg-red/30 rounded-full group-active:scale-150 group-active:bg-red group-active:shadow-[0_0_10px_rgba(255,51,51,1)] transition-all duration-300" />
                
                <span className="font-space text-sm text-red/60 tracking-widest w-5">
                  0{i + 1}
                </span>

                {/* Vertical Separator */}
                <span className="w-[1px] h-6 bg-white/10" />

                <span className="font-bebas text-[2.5rem] tracking-wide text-white/90 active:text-red active:translate-x-2 transition-all duration-300 origin-left leading-none">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
