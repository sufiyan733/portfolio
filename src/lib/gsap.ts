import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// We will use standard framer-motion or custom implementation for SplitText if needed.

export { gsap, ScrollTrigger };
