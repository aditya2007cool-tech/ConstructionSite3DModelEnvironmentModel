import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirflowSimulationProps {
  isPlaying: boolean;
  flowSpeed: number; // 0.25 to 2.0
  activeStage: 'all' | 'inlet' | 'pm' | 'gas' | 'exhaust';
  showStreamlines: boolean;
  particleDensity: number; // 50 to 300
}

export const AirflowSimulation: React.FC<AirflowSimulationProps> = ({
  isPlaying,
  flowSpeed,
  activeStage,
  showStreamlines,
  particleDensity = 120,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Key waypoint trajectory coordinates through the device
  // 1. Ambient outdoor air approaching inlet
  // 2. Enters sampling inlet hood [-0.16, 0.44, 0.04]
  // 3. Heated inlet tube downward [-0.16, 0.32, 0.04]
  // 4. Enters PM optical chamber [-0.15, 0.16, 0.03]
  // 5. Crosses laser optical zone [-0.15, 0.12, 0.03]
  // 6. Centrifugal fan intake [-0.15, 0.08, 0.03]
  // 7. Manifold tube [-0.01, 0.16, 0.025] -> Gas block [0.13, 0.16, 0.02]
  // 8. Across electrochemical diffusion ports [0.13, 0.10, 0.02]
  // 9. Downward exhaust tube [0.14, -0.1, 0.03] -> [0.15, -0.37, 0.04]
  // 10. Ambient discharge below
  const waypoints = useMemo(() => {
    return [
      new THREE.Vector3(-0.35, 0.65, 0.25), // Ambient approach 1
      new THREE.Vector3(-0.25, 0.55, 0.12), // Ambient approach 2
      new THREE.Vector3(-0.16, 0.44, 0.04), // Rain cap inlet
      new THREE.Vector3(-0.16, 0.32, 0.04), // Heated tube
      new THREE.Vector3(-0.15, 0.18, 0.03), // PM optical chamber
      new THREE.Vector3(-0.15, 0.10, 0.03), // PM laser sensing zone
      new THREE.Vector3(-0.08, 0.16, 0.025), // Manifold crossover
      new THREE.Vector3(0.08, 0.16, 0.025), // Gas manifold infeed
      new THREE.Vector3(0.14, 0.14, 0.03), // Electrochemical cells
      new THREE.Vector3(0.14, -0.10, 0.03), // Exhaust down-tube
      new THREE.Vector3(0.15, -0.37, 0.04), // Bottom exhaust louver
      new THREE.Vector3(0.18, -0.55, 0.06), // Ambient discharge
    ];
  }, []);

  // CatmullRomCurve3 smooth spline
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.2);
  }, [waypoints]);

  // Generate particle pool with staggered progress (0 to 1) and random radial dispersion
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleDensity; i++) {
      data.push({
        t: Math.random(), // current progress along spline
        speed: 0.08 + Math.random() * 0.05,
        radiusOffset: (Math.random() - 0.5) * 0.025,
        radiusAngle: Math.random() * Math.PI * 2,
        size: 0.015 + Math.random() * 0.012,
        isParticulate: Math.random() > 0.4, // True: dust particle (amber/red), False: air molecule (cyan)
      });
    }
    return data;
  }, [particleDensity]);

  // Buffer geometries for particles
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleDensity * 3);
    const col = new Float32Array(particleDensity * 3);

    for (let i = 0; i < particleDensity; i++) {
      const p = particles[i];
      const point = curve.getPoint(p.t);
      pos[i * 3] = point.x;
      pos[i * 3 + 1] = point.y;
      pos[i * 3 + 2] = point.z;

      // Color coding: Air (cyan) vs Dust PM (orange-red)
      if (p.isParticulate) {
        col[i * 3] = 0.95; // R
        col[i * 3 + 1] = 0.45; // G
        col[i * 3 + 2] = 0.1; // B
      } else {
        col[i * 3] = 0.1;
        col[i * 3 + 1] = 0.75;
        col[i * 3 + 2] = 0.95;
      }
    }
    return [pos, col];
  }, [curve, particles, particleDensity]);

  // Tube geometry for streamline
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 70, 0.008, 8, false);
  }, [curve]);

  // Animation frame update
  useFrame((_, delta) => {
    if (!isPlaying || !pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < particleDensity; i++) {
      const p = particles[i];
      p.t += delta * p.speed * flowSpeed;
      if (p.t > 1.0) p.t = 0;

      // If filtering by stage:
      // inlet: t 0.0 to 0.3
      // pm: t 0.25 to 0.55
      // gas: t 0.5 to 0.8
      // exhaust: t 0.75 to 1.0
      let inStage = true;
      if (activeStage === 'inlet' && (p.t < 0.0 || p.t > 0.35)) inStage = false;
      if (activeStage === 'pm' && (p.t < 0.25 || p.t > 0.6)) inStage = false;
      if (activeStage === 'gas' && (p.t < 0.5 || p.t > 0.82)) inStage = false;
      if (activeStage === 'exhaust' && p.t < 0.75) inStage = false;

      const pt = curve.getPoint(p.t);
      if (inStage) {
        // Add subtle radial swirl
        const cosOffset = Math.cos(p.radiusAngle + p.t * 20) * p.radiusOffset;
        const sinOffset = Math.sin(p.radiusAngle + p.t * 20) * p.radiusOffset;
        array[i * 3] = pt.x + cosOffset;
        array[i * 3 + 1] = pt.y;
        array[i * 3 + 2] = pt.z + sinOffset;
      } else {
        // Hide out of bounds
        array[i * 3] = 9999;
        array[i * 3 + 1] = 9999;
        array[i * 3 + 2] = 9999;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Visual Animated Streamline Tube */}
      {showStreamlines && (
        <mesh geometry={tubeGeometry}>
          <meshStandardMaterial
            color="#0ea5e9"
            transparent
            opacity={0.3}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* Floating Animated Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Flow Stage Markers & Callout Beacons */}
      {/* Stage 1: Rain Inlet */}
      <group position={[-0.16, 0.44, 0.04]}>
        <pointLight color="#38bdf8" intensity={1.2} distance={0.35} />
        <mesh>
          <ringGeometry args={[0.075, 0.082, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Stage 2: PM Laser Sensing Zone */}
      <group position={[-0.15, 0.16, 0.03]}>
        <pointLight color="#ef4444" intensity={1.5} distance={0.3} />
        <mesh>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Stage 3: Gas Manifold Diffusion Zone */}
      <group position={[0.13, 0.16, 0.02]}>
        <pointLight color="#f59e0b" intensity={1.2} distance={0.3} />
        <mesh>
          <boxGeometry args={[0.19, 0.04, 0.08]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Stage 4: Bottom Exhaust Cowl */}
      <group position={[0.15, -0.37, 0.04]}>
        <pointLight color="#10b981" intensity={1.0} distance={0.3} />
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.04, 16]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};

