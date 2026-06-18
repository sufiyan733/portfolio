"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Icons() {
  const group = useRef<THREE.Group>(null);
  const { mouse, viewport, invalidate } = useThree();
  
  // Custom geometries to represent tech stack vaguely
  const geometries = [
    new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.TetrahedronGeometry(1.5, 0),
    new THREE.TorusGeometry(1.2, 0.4, 16, 100)
  ];
  
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x3d3d3d, 
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });

  const meshes = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    return () => {
      geometries.forEach(g => g.dispose());
      material.dispose();
    };
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.x += 0.001;
      group.current.rotation.y += 0.002;
      
      meshes.current.forEach((mesh, i) => {
        mesh.rotation.x += 0.005 * (i % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.005 * (i % 3 === 0 ? 1 : -1);
        
        // Physics-like repel on mouse proximity
        const meshWorldPos = new THREE.Vector3();
        mesh.getWorldPosition(meshWorldPos);
        
        // Map mouse to world space
        const targetX = (mouse.x * viewport.width) / 2;
        const targetY = (mouse.y * viewport.height) / 2;
        
        const dist = Math.sqrt(
          Math.pow(meshWorldPos.x - targetX, 2) + 
          Math.pow(meshWorldPos.y - targetY, 2)
        );
        
        if (dist < 4) {
          const repelStrength = (4 - dist) * 0.01;
          mesh.position.x += (meshWorldPos.x - targetX) * repelStrength;
          mesh.position.y += (meshWorldPos.y - targetY) * repelStrength;
        } else {
          // Return to original local pos gently
          const origPos = new THREE.Vector3(
            Math.sin(i * Math.PI * 0.4) * 5,
            Math.cos(i * Math.PI * 0.4) * 3,
            Math.sin(i * Math.PI * 0.2) * 2
          );
          mesh.position.lerp(origPos, 0.01);
        }
      });
      invalidate();
    }
  });

  return (
    <group ref={group}>
      {geometries.map((geo, i) => (
        <mesh 
          key={i} 
          ref={(el) => { if (el) meshes.current[i] = el; }}
          geometry={geo} 
          material={material}
          position={[
            Math.sin(i * Math.PI * 0.4) * 5,
            Math.cos(i * Math.PI * 0.4) * 3,
            Math.sin(i * Math.PI * 0.2) * 2
          ]}
        />
      ))}
    </group>
  );
}

export default function FloatingIcons() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 10] }} className="pointer-events-none">
      <Icons />
    </Canvas>
  );
}
