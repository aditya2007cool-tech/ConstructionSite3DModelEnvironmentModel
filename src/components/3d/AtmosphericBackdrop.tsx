import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericBackdropProps {
  isAirflowMode: boolean;
}

export const AtmosphericBackdrop: React.FC<AtmosphericBackdropProps> = ({ isAirflowMode }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 140;

  // Floating ambient aerosol & dust motes in the 3D volume
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < particleCount; i++) {
      list.push({
        x: (Math.random() - 0.5) * 5.0,
        y: -1.2 + Math.random() * 3.5,
        z: (Math.random() - 0.5) * 5.0,
        vy: 0.02 + Math.random() * 0.04,
        vx: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        size: 0.025 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      // Soft sunlit golden-amber dust and cool sky blue motes
      const isWarm = Math.random() > 0.4;
      col[i * 3] = isWarm ? 0.95 : 0.4;
      col[i * 3 + 1] = isWarm ? 0.75 : 0.7;
      col[i * 3 + 2] = isWarm ? 0.4 : 0.95;
    });
    return [pos, col];
  }, [particles]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Gentle floating upward & Brownian drift
      p.y += p.vy * delta;
      p.x += Math.sin(time * 0.5 + p.phase) * delta * 0.04;
      p.z += Math.cos(time * 0.5 + p.phase) * delta * 0.04;

      if (p.y > 2.5) p.y = -1.2; // loop from bottom

      array[i * 3] = p.x;
      array[i * 3 + 1] = p.y;
      array[i * 3 + 2] = p.z;
    });

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Floating Micro-Dust Motes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={isAirflowMode ? 0.15 : 0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle Circular Studio Pedestal Base Ring on Floor */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.63, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 2.82, 64]} />
        <meshBasicMaterial color="#64748b" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
