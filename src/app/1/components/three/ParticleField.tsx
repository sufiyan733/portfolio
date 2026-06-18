"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport, invalidate } = useThree();

  const [positions, colors, initialPositions] = useMemo(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const count = isMobile ? 500 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    
    let redCount = 0;
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;
      
      // Select 80 red particles randomly, or if we run out, just use random
      const isRed = (redCount < 80 && Math.random() < (80 / count)) || (i > count - 80 && redCount < 80);
      
      if (isRed) {
        redCount++;
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.2;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
    }
    return [positions, colors, initialPositions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime() * 0.1;
      const positionsAttr = ref.current.geometry.attributes.position;
      
      // Update particles with Simplex noise drift
      for (let i = 0; i < positionsAttr.count; i++) {
        const ix = initialPositions[i * 3];
        const iy = initialPositions[i * 3 + 1];
        const iz = initialPositions[i * 3 + 2];

        // Small drift based on noise
        const nx = noise3D(ix, iy, time) * 0.2;
        const ny = noise3D(iy, iz, time) * 0.2;

        positionsAttr.setXYZ(i, ix + nx, iy + ny, iz);
      }
      positionsAttr.needsUpdate = true;

      // Mouse Parallax - opposite direction, lerp factor 0.03
      const targetX = -(mouse.x * viewport.width) / 20;
      const targetY = -(mouse.y * viewport.height) / 20;
      
      ref.current.position.x += (targetX - ref.current.position.x) * 0.03;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.03;
      
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
