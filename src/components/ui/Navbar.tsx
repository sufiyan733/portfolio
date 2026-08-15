"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

const navLinks = [
  { name: "HERO", href: "#hero" },
  { name: "WHO AM I", href: "#about" },
  { name: "STACK", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "PRICING", href: "#offer" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const scrambleIntervalRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle active section tracking via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Triggers when section is at the exact middle of screen
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle scroll detection for Navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = "";
      if ((window as any).lenis) (window as any).lenis.start();
    }
  }, [isMobileMenuOpen]);

  const handleLogoHover = () => {
    if (!logoRef.current) return;
    const chars = logoRef.current.querySelectorAll(".logo-char");
    const container = logoRef.current.querySelector(".logo-container");
    const underline = logoRef.current.querySelector(".logo-underline");
    
    const originalText = "KAIZER.";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    // Animate spacing and underline
    gsap.to(container, { gap: "4px", duration: 0.4, ease: "back.out(2)" });
    gsap.to(underline, { scaleX: 1, duration: 0.4, ease: "expo.out" });
    
    let iteration = 0;
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    
    scrambleIntervalRef.current = setInterval(() => {
      chars.forEach((char, index) => {
        if (index < iteration) {
          char.textContent = originalText[index];
          (char as HTMLElement).style.color = "var(--red)";
          (char as HTMLElement).style.textShadow = "0 0 15px rgba(255,51,51,0.8)";
        } else {
          char.textContent = letters[Math.floor(Math.random() * letters.length)];
          // Glitch color
          const isWhite = Math.random() > 0.5;
          (char as HTMLElement).style.color = isWhite ? "white" : "var(--red)";
          (char as HTMLElement).style.textShadow = isWhite ? "0 0 10px rgba(255,255,255,0.5)" : "none";
        }
      });
      
      if (iteration >= originalText.length) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const handleLogoLeave = () => {
    if (!logoRef.current) return;
    const chars = logoRef.current.querySelectorAll(".logo-char");
    const container = logoRef.current.querySelector(".logo-container");
    const underline = logoRef.current.querySelector(".logo-underline");
    const originalText = "KAIZER.";
    
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    
    // Snap back to normal immediately to avoid sticking
    chars.forEach((char, index) => {
      char.textContent = originalText[index];
      (char as HTMLElement).style.color = "var(--red)";
      (char as HTMLElement).style.textShadow = "0 0 15px rgba(255,51,51,0.8)";
    });
    
    gsap.to(container, { gap: "0px", duration: 0.4, ease: "power2.out" });
    gsap.to(underline, { scaleX: 0, duration: 0.4, ease: "power2.out" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Start lenis immediately if it was stopped by the mobile menu
    if ((window as any).lenis) {
      (window as any).lenis.start();
      document.body.style.overflow = "";
    }
    
    setIsMobileMenuOpen(false);
    
    // Small timeout ensures the DOM has unlocked before scrolling
    setTimeout(() => {
      const isProjects = href === "#projects";
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      // Scroll slightly further down into the horizontal scroll pin so the first project card triggers and reveals
      const projectsOffset = isMobile 
        ? Math.round(window.innerHeight * 0.45) 
        : Math.round(window.innerHeight * 0.35);
      const offset = isProjects ? projectsOffset : 0;

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(href === 'body' ? 0 : href, { offset, duration: 1.5 });
      } else {
        if (href === 'body') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(href);
          if (el) {
            const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    }, 50);
  };

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
          ref={logoRef}
          className="relative group inline-flex cursor-pointer outline-none focus:outline-none"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
          onClick={(e) => handleNavClick(e, 'body')}
        >
          <div className="font-bebas text-3xl text-red relative flex flex-col items-center">
            <span className="logo-container flex relative" style={{ textShadow: "0 0 15px rgba(255,51,51,0.8)" }}>
              {"KAIZER.".split("").map((char, i) => (
                <span key={i} className="logo-char inline-block min-w-[0.55em] text-center will-change-transform">{char}</span>
              ))}
            </span>
            {/* Center-out underline */}
            <span className="logo-underline absolute -bottom-1 left-0 w-full h-[2px] bg-white origin-center scale-x-0 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-space text-[13px] tracking-[0.25em] relative group py-2 transition-all duration-300 outline-none focus:outline-none ${activeSection === link.href ? "text-red drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]" : "text-white/50 hover:text-white"}`}
            >
              {link.name}
              <span className={`absolute left-0 bottom-0 w-full h-[2px] origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeSection === link.href ? "bg-red scale-x-100 shadow-[0_0_8px_rgba(255,51,51,0.5)]" : "bg-red scale-x-0 group-hover:scale-x-100"}`} />
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
        className={`fixed top-0 left-0 w-full max-h-[70vh] bg-[#020202]/70 backdrop-blur-3xl z-40 border-b border-white/5 rounded-b-[2rem] flex flex-col px-8 pt-10 pb-8 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden will-change-transform origin-top shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,51,51,0.2)]`}
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
          <nav className="flex flex-col w-full gap-3">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-5 group relative py-1 outline-none focus:outline-none"
                >
                  {/* Tech dot indicator */}
                  <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-red scale-150 shadow-[0_0_10px_rgba(255,51,51,1)]" : "bg-red/30 group-hover:bg-red/60 group-active:scale-150 group-active:bg-red group-active:shadow-[0_0_10px_rgba(255,51,51,1)]"}`} />
                  
                  <span className={`font-space text-xs tracking-widest w-4 transition-colors ${isActive ? "text-red" : "text-white/30"}`}>
                    0{i + 1}
                  </span>

                  {/* Vertical Separator */}
                  <span className="w-[1px] h-5 bg-white/10" />

                  <span className={`font-bebas text-3xl tracking-wide transition-all duration-300 origin-left leading-none ${isActive ? "text-red translate-x-2 drop-shadow-[0_0_15px_rgba(255,51,51,0.6)]" : "text-white/70 hover:text-white active:text-red active:translate-x-2"}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
