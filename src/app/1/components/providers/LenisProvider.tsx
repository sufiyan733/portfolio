"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const lenis = new Lenis({
      // Shorter duration on mobile = less momentum carry-over at pin boundaries
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Lower touchMultiplier prevents Lenis from overshooting ScrollTrigger pins
      touchMultiplier: isMobile ? 1.0 : 1.2,
      infinite: false,
    });

    // Sync Lenis scroll position to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    
    // Expose lenis globally for components to trigger scroll
    (window as any).lenis = lenis;

    // Drive Lenis via GSAP ticker (exact spec from AGENTS.md)
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
}
