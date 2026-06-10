"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollContinuity() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Section headings clip-path reveal — safe, additive, doesn't conflict
      const headings = gsap.utils.toArray<HTMLElement>("section h2");
      headings.forEach((h2) => {
        // Skip headings that already have their own clip-path animation
        if (h2.classList.contains("no-global-reveal")) return;
        // Skip if already has a clip-path set by inline style (managed by component)
        if (h2.style.clipPath) return;

        gsap.fromTo(
          h2,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: h2,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
