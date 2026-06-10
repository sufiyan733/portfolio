"use client";

import { useState, useEffect, useCallback } from "react";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollContinuity from "@/components/ui/ScrollContinuity";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Offer from "@/components/sections/Offer";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll while loader is active
  useEffect(() => {
    if (isLoading) {
      // Lock both html and body to prevent any scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Force scroll to absolute top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [isLoading]);

  const handleLoaderComplete = useCallback(() => {
    // Force scroll to top before unlocking
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Unlock scroll
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    setIsLoading(false);
  }, []);

  return (
    <main className="bg-bg text-white min-h-screen relative selection:bg-glow selection:text-red">
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <ScrollContinuity />
      
      {/* Global Scanlines via ::before approach mapped to an element */}
      <div className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#000_1px,#000_2px)]" />
      
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      
      <div 
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Offer />
        <Contact />
      </div>
    </main>
  );
}
