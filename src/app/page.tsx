"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Offer from "@/components/sections/Offer";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For safety, force scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg text-white min-h-screen relative selection:bg-glow selection:text-red">
      <CustomCursor />
      
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
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
