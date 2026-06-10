"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // Random white/black pixel with high transparency
        if (Math.random() < 0.5) {
          buffer32[i] = 0xffffffff; // White pixel
        } else {
          buffer32[i] = 0xff000000; // Black pixel
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    const loop = () => {
      // Throttle to every 2nd frame for performance (approx 30fps noise)
      if (frameCount % 2 === 0) {
        drawNoise();
      }
      frameCount++;
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.035]"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}
