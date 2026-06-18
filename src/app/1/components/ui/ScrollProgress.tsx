"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const topProgressRef = useRef<HTMLDivElement>(null);
  const leftProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(topProgressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2
        }
      });
      
      gsap.to(leftProgressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={topProgressRef}
        className="fixed top-0 left-0 w-full h-[2px] bg-red origin-left scale-x-0 z-[9999] pointer-events-none"
      />
      <div
        ref={leftProgressRef}
        className="fixed top-0 left-0 w-[2px] h-full bg-red origin-top scale-y-0 z-[9999] pointer-events-none hidden md:block"
      />
    </>
  );
}
