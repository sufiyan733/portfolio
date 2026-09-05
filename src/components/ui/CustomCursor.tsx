"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "eye" | "cta">("default");
  
  // Create an array for trail elements
  const trailsCount = 8;
  
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none)").matches;
    if (isMobile) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Arrays for trail positions
    const trailPositions = Array(trailsCount).fill({ x: mouse.x, y: mouse.y });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = gsap.ticker.add(() => {
      // Lerp ring
      ringPos.x += (mouse.x - ringPos.x) * 0.08;
      ringPos.y += (mouse.y - ringPos.y) * 0.08;

      gsap.set(cursorDot.current, { x: mouse.x, y: mouse.y });
      gsap.set(cursorRing.current, { x: ringPos.x, y: ringPos.y });

      // Trail logic
      trailPositions.pop();
      trailPositions.unshift({ x: mouse.x, y: mouse.y });
      
      trailsRef.current.forEach((trail, index) => {
        if (trail) {
          const pos = trailPositions[index];
          gsap.set(trail, { 
            x: pos.x, 
            y: pos.y,
            opacity: 1 - (index / trailsCount),
            scale: 1 - (index / trailsCount) * 0.8
          });
        }
      });
    });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.dataset.cursor === "eye") {
        setHoverType("eye");
        setIsHovering(true);
      } else if (target.dataset.cursor === "cta" || target.closest('[data-cursor="cta"]')) {
        setHoverType("cta");
        setIsHovering(true);
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setHoverType("default");
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.dataset.cursor) {
        setIsHovering(false);
        setHoverType("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none z-[9999]">
      {/* Trail Elements */}
      {[...Array(trailsCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-red rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
        />
      ))}

      {/* Main Dot */}
      <div 
        ref={cursorDot} 
        className={`fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-200 ${isHovering ? "opacity-0" : "opacity-100"}`}
      />
      
      {/* Lerping Ring */}
      <div 
        ref={cursorRing} 
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out will-change-transform
          ${isHovering ? (
            hoverType === "eye" ? "w-16 h-16" :
            hoverType === "cta" ? "w-16 h-16 bg-red rounded-full shadow-[0_0_20px_rgba(255,51,51,0.5)]" :
            "w-[79px] h-[79px] bg-red/10 border-red rounded-full border-[1.5px]" // 36px * 2.2 = 79.2px
          ) : "w-[36px] h-[36px] border-[1.5px] border-red/80 rounded-full"}`}
      >
        {isHovering && hoverType === "cta" && (
          <span className="text-[12px] font-space font-bold tracking-widest text-white">GO</span>
        )}
        
        {isHovering && hoverType === "eye" && (
          <div className="w-8 h-8 relative flex items-center justify-center text-red">
            {/* Crosshair SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
