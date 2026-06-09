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
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-full h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[1px]" : "-translate-y-1.5"}`} />
          <span className={`w-full h-[2px] bg-red transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`w-full h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1.5"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"} md:hidden`}>
        <nav className="flex flex-col gap-8 text-center">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bebas text-5xl text-white hover:text-red transition-colors"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: `translateY(${isMobileMenuOpen ? 0 : 20}px)`,
                transition: `all 0.5s ease ${0.3 + i * 0.1}s`
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
