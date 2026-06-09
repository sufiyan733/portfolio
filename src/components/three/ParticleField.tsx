"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport, invalidate } = useThree();

  const [positions, colors] = useMemo(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const count = isMobile ? 500 : 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      const isRed = Math.random() > 0.95;
      if (isRed) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.2;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Very slight constant drift
      ref.current.rotation.y += 0.001;
      
      // Mouse Parallax
      const targetX = (mouse.x * viewport.width) / 50;
      const targetY = (mouse.y * viewport.height) / 50;
      
      ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
      
      invalidate(); // Required since frameloop="demand"
    }
  });

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.geometry.dispose();
        (ref.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <Points ref={ref} positions={positions} colors={colors} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 3] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
