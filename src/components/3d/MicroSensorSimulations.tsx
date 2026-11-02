import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MicroSensorProps {
  type: 'pm' | 'gas' | 'wind' | 'temp';
}

export const MicroSensorSimulations: React.FC<MicroSensorProps> = ({ type }) => {
  return (
    <group position={[0, 0, 0]}>
      {type === 'pm' && <PMMicroSim />}
      {type === 'gas' && <GasMicroSim />}
      {type === 'wind' && <WindMicroSim />}
      {type === 'temp' && <TempRHMicroSim />}
    </group>
  );
};

// 1. PM Optical Particle Counter Micro-Simulation (Mie Scattering)
const PMMicroSim: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const flashRef = useRef<THREE.PointLight>(null);

  // Generate 40 particles traversing the laser beam
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map(() => ({
      x: (Math.random() - 0.5) * 0.4,
      y: 0.6 + Math.random() * 0.4, // Falling downward past laser
      z: (Math.random() - 0.5) * 0.2,
      speed: 0.3 + Math.random() * 0.3,
      sizeCategory: Math.random() > 0.6 ? 'PM10' : Math.random() > 0.3 ? 'PM2.5' : 'PM1.0',
    }));
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particles.length * 3);
    const col = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      if (p.sizeCategory === 'PM10') {
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.3; col[i * 3 + 2] = 0.2; // Red coarse
      } else if (p.sizeCategory === 'PM2.5') {
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.7; col[i * 3 + 2] = 0.1; // Amber fine
      } else {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 0.95; // Cyan ultra-fine
      }
    });
    return [pos, col];
  }, [particles]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    let anyInBeam = false;

    particles.forEach((p, i) => {
      p.y -= delta * p.speed;
      if (p.y < -0.6) p.y = 0.6; // loop

      // Laser beam is at y = 0, within -0.04 to +0.04
      if (Math.abs(p.y) < 0.04 && Math.abs(p.x) < 0.15) {
        anyInBeam = true;
      }

      array[i * 3] = p.x;
      array[i * 3 + 1] = p.y;
      array[i * 3 + 2] = p.z;
    });

    posAttr.needsUpdate = true;

    if (flashRef.current) {
      flashRef.current.intensity = anyInBeam ? 2.5 : 0.4;
    }
  });

  return (
    <group>
      {/* Laser Diode Source on Left */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 24]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Red 650nm Laser Beam */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.85} />
      </mesh>

      {/* Light Beam Stop / Dump Trap on Right */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.2, 20]} />
        <meshStandardMaterial color="#090d16" roughness={0.9} />
      </mesh>

      {/* Photodetector Collector Optics at 90° (Top) */}
      <group position={[0, 0.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.06, 0.15, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        <pointLight ref={flashRef} position={[0, -0.1, 0]} color="#ef4444" distance={0.6} />
      </group>

      {/* 90° Light Scattering Cones from Center */}
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.16, 0.35, 24, 1, true]} />
        <meshBasicMaterial color="#fca5a5" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Animated Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.95} />
      </points>
    </group>
  );
};

// 2. Electrochemical Gas Sensor Micro-Simulation (Redox Reaction)
const GasMicroSim: React.FC = () => {
  const electronsRef = useRef<THREE.Points>(null);

  // Gas molecules diffusing
  const molecules = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 0.8,
      y: 0.2 + Math.random() * 0.4,
      z: (Math.random() - 0.5) * 0.4,
      vx: (Math.random() - 0.5) * 0.05,
      vy: -0.08 - Math.random() * 0.08,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!electronsRef.current) return;
    const posAttr = electronsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    molecules.forEach((m, i) => {
      m.y += m.vy * delta;
      m.x += m.vx * delta;
      if (m.y < -0.15) {
        // Molecule hit working electrode -> reacts!
        m.y = 0.5;
        m.x = (Math.random() - 0.5) * 0.8;
      }
      array[i * 3] = m.x;
      array[i * 3 + 1] = m.y;
      array[i * 3 + 2] = m.z;
    });
    posAttr.needsUpdate = true;
  });

  const initialPositions = useMemo(() => {
    const pos = new Float32Array(molecules.length * 3);
    molecules.forEach((m, i) => {
      pos[i * 3] = m.x;
      pos[i * 3 + 1] = m.y;
      pos[i * 3 + 2] = m.z;
    });
    return pos;
  }, [molecules]);

  return (
    <group>
      {/* Porous Hydrophobic PTFE Membrane */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.04, 0.6]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={0.5} roughness={0.8} />
      </mesh>

      {/* Working Electrode (Gold/Platinum Catalyst Layer) */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.85, 0.04, 0.55]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Aqueous Acid Electrolyte Reservoir (Blue gel layer) */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[0.85, 0.28, 0.55]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.4} roughness={0.1} />
      </mesh>

      {/* Counter & Reference Electrodes (Bottom Base) */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.85, 0.04, 0.55]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Gas Molecules Diffusing */}
      <points ref={electronsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#f59e0b" transparent opacity={0.9} />
      </points>
    </group>
  );
};

// 3. Anemometer & Vane Aerodynamic Simulation
const WindMicroSim: React.FC = () => {
  const rotorRef = useRef<THREE.Group>(null);
  const vaneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.y += delta * 6.0;
    }
    if (vaneRef.current) {
      const t = state.clock.getElapsedTime();
      vaneRef.current.rotation.y = Math.sin(t * 1.2) * 0.2 + 0.1;
    }
  });

  return (
    <group>
      {/* 3-Cup Rotor */}
      <group position={[-0.4, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        <group ref={rotorRef} position={[0, 0.1, 0]}>
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
            <group key={`sim-cup-${idx}`} rotation={[0, angle, 0]}>
              <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <sphereGeometry args={[0.08, 16, 16, 0, Math.PI]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Aerodynamic Vane */}
      <group position={[0.4, 0, 0]} ref={vaneRef}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.025, 0.1, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, -0.28]}>
          <boxGeometry args={[0.01, 0.22, 0.25]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

// 4. Capacitive Humidity & Temperature Sensor Micro-Simulation
const TempRHMicroSim: React.FC = () => {
  const vaporGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!vaporGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    vaporGroupRef.current.children.forEach((child, idx) => {
      child.position.y = -0.15 + Math.sin(t * 2.0 + idx) * 0.08;
    });
  });

  return (
    <group>
      {/* Top Capacitor Plate (Porous Gold Electrode) */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.03, 0.6]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Porous Polymer Dielectric Layer */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.76, 0.24, 0.56]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} roughness={0.1} />
      </mesh>

      {/* Water Vapor (H2O) Molecules entering polymer pores */}
      <group ref={vaporGroupRef}>
        {[-0.25, -0.1, 0.05, 0.2].map((x, i) => (
          <mesh key={`h2o-${i}`} position={[x, 0, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#60a5fa" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Bottom Capacitor Plate */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.8, 0.03, 0.6]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Silicon Substrate with Integrated Bandgap Temperature Sensor */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.9, 0.12, 0.7]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

