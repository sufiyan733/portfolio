"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isEye, setIsEye] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.set(cursorDot.current, { x: mouseX, y: mouseY });
      
      gsap.to(cursorRing.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.dataset.cursor === "eye") {
        setIsEye(true);
        setIsHovering(true);
        setHoverText("");
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.dataset.cursor === "view") {
        setIsHovering(true);
        setHoverText("VIEW");
        setIsEye(false);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.dataset.cursor) {
        setIsHovering(false);
        setHoverText("");
        setIsEye(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot} 
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-200 ${isHovering ? "opacity-0" : "opacity-100"}`}
      />
      <div 
        ref={cursorRing} 
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${
          isEye 
            ? "w-24 h-24 border border-red shadow-[0_0_20px_rgba(255,51,51,0.5)] bg-black/40 backdrop-blur-sm"
            : isHovering 
              ? "w-20 h-20 bg-red/20 border-red/50" 
              : "w-10 h-10 border-2 border-red"
        }`}
      >
        {isHovering && !isEye && hoverText && (
          <span className="text-[10px] font-space font-bold tracking-widest text-red">
            {hoverText}
          </span>
        )}
        {isEye && (
          <div className="w-8 h-8 rounded-full border border-red/50 flex items-center justify-center relative">
             <div className="w-2 h-2 bg-red rounded-full shadow-[0_0_10px_#ff3333]" />
          </div>
        )}
      </div>
    </>
  );
}
