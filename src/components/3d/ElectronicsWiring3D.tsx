import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ElectronicsWiring3DProps {
  selectedComponentId: string | null;
  showPowerBuses: boolean;
  showDataBuses: boolean;
}

interface WireDefinition {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'power' | 'data' | 'rf';
  color: string;
  voltageOrProtocol: string;
  points: THREE.Vector3[];
}

export const ElectronicsWiring3D: React.FC<ElectronicsWiring3DProps> = ({
  selectedComponentId,
  showPowerBuses,
  showDataBuses,
}) => {
  // Pre-defined realistic 3D routing paths for internal electronics harnesses
  const wireDefinitions: WireDefinition[] = useMemo(() => [
    // 1. Solar Panel -> MPPT Controller (18V-24V DC PV Infeed)
    {
      id: 'pv_to_mppt',
      sourceId: 'solar_panel',
      targetId: 'power_system',
      type: 'power',
      color: '#facc15', // Yellow/Gold
      voltageOrProtocol: '22V DC Solar Infeed',
      points: [
        new THREE.Vector3(0, 0.45, -0.6),
        new THREE.Vector3(0, 0.1, -0.3),
        new THREE.Vector3(0.14, -0.15, -0.05),
        new THREE.Vector3(0.14, -0.22, 0.0),
      ],
    },
    // 2. Battery Pack -> MPPT Controller (12.8V DC LiFePO4 Bus)
    {
      id: 'bat_to_mppt',
      sourceId: 'power_system',
      targetId: 'power_system',
      type: 'power',
      color: '#ef4444', // Red power
      voltageOrProtocol: '12.8V DC Battery Bus',
      points: [
        new THREE.Vector3(-0.02, -0.24, 0.02),
        new THREE.Vector3(0.04, -0.24, 0.02),
        new THREE.Vector3(0.1, -0.24, 0.02),
      ],
    },
    // 3. MPPT / Battery -> Motherboard PCB Main 12V Infeed
    {
      id: 'pwr_to_pcb',
      sourceId: 'power_system',
      targetId: 'control_pcb',
      type: 'power',
      color: '#ef4444',
      voltageOrProtocol: '12V DC Regulated Bus',
      points: [
        new THREE.Vector3(0.14, -0.18, 0.02),
        new THREE.Vector3(0.05, -0.16, 0.0),
        new THREE.Vector3(0.0, -0.14, 0.01),
      ],
    },
    // 4. PCB 5V & UART -> PM Sensor
    {
      id: 'pcb_to_pm',
      sourceId: 'control_pcb',
      targetId: 'pm_sensor',
      type: 'data',
      color: '#38bdf8', // Cyan UART
      voltageOrProtocol: 'UART 115200 Baud + 5V',
      points: [
        new THREE.Vector3(-0.08, -0.05, 0.0),
        new THREE.Vector3(-0.12, 0.05, 0.02),
        new THREE.Vector3(-0.15, 0.12, 0.03),
      ],
    },
    // 5. Gas Manifold -> PCB 24-Bit AFE (Differential Analog Lines)
    {
      id: 'gas_to_afe',
      sourceId: 'gas_no2',
      targetId: 'control_pcb',
      type: 'data',
      color: '#a855f7', // Purple Analog AFE
      voltageOrProtocol: '24-Bit Nanoamp AFE',
      points: [
        new THREE.Vector3(0.13, 0.12, 0.02),
        new THREE.Vector3(0.11, 0.04, 0.01),
        new THREE.Vector3(0.08, -0.02, 0.0),
      ],
    },
    // 6. PCB -> GPS Module (UART NMEA + 1PPS Timing Strobe)
    {
      id: 'pcb_to_gps',
      sourceId: 'control_pcb',
      targetId: 'gps_module',
      type: 'data',
      color: '#10b981', // Emerald GPS
      voltageOrProtocol: 'UART NMEA + 1PPS',
      points: [
        new THREE.Vector3(-0.04, 0.08, 0.0),
        new THREE.Vector3(0.06, 0.2, 0.02),
        new THREE.Vector3(0.16, 0.3, 0.04),
      ],
    },
    // 7. PCB -> 4G LTE Modem (High-Speed UART AT Bus)
    {
      id: 'pcb_to_lte',
      sourceId: 'control_pcb',
      targetId: 'cellular_modem',
      type: 'data',
      color: '#ec4899', // Pink LTE
      voltageOrProtocol: 'UART AT Commands & PPP',
      points: [
        new THREE.Vector3(0.04, 0.02, 0.0),
        new THREE.Vector3(0.14, 0.02, 0.0),
        new THREE.Vector3(0.16, 0.04, -0.01),
      ],
    },
    // 8. LTE Modem -> Antenna SMA (RG-58 RF Coaxial Lead)
    {
      id: 'lte_to_antenna',
      sourceId: 'cellular_modem',
      targetId: 'cellular_modem',
      type: 'rf',
      color: '#64748b', // RF Coax
      voltageOrProtocol: 'RF 50-Ohm Coaxial',
      points: [
        new THREE.Vector3(0.16, 0.08, -0.01),
        new THREE.Vector3(0.18, 0.25, 0.0),
        new THREE.Vector3(0.22, 0.42, 0.0),
      ],
    },
    // 9. PCB -> Environmental Temp/RH Probe (I2C Bus)
    {
      id: 'pcb_to_env',
      sourceId: 'control_pcb',
      targetId: 'env_temp_rh',
      type: 'data',
      color: '#06b6d4', // Cyan I2C
      voltageOrProtocol: 'I2C 400kHz Fast-Mode',
      points: [
        new THREE.Vector3(-0.15, -0.05, 0.0),
        new THREE.Vector3(-0.25, -0.02, 0.01),
        new THREE.Vector3(-0.32, 0.05, 0.02),
      ],
    },
    // 10. PCB -> Anemometer & Wind Vane (Frequency Pulse & I2C)
    {
      id: 'pcb_to_wind',
      sourceId: 'control_pcb',
      targetId: 'wind_anemometer',
      type: 'data',
      color: '#38bdf8',
      voltageOrProtocol: 'Pulse Counter & 12-Bit Angle',
      points: [
        new THREE.Vector3(-0.02, 0.1, -0.02),
        new THREE.Vector3(0, 0.4, -0.3),
        new THREE.Vector3(0, 1.25, -0.35),
        new THREE.Vector3(-0.4, 1.25, -0.35),
      ],
    },
  ], []);

  // Energy pulse particle points ref
  const pulseGroupRef = useRef<THREE.Group>(null);

  // Generate curves
  const curves = useMemo(() => {
    return wireDefinitions.map((w) => ({
      wire: w,
      curve: new THREE.CatmullRomCurve3(w.points, false, 'catmullrom', 0.2),
      tubeGeo: new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(w.points, false, 'catmullrom', 0.2),
        32,
        0.005,
        8,
        false
      ),
    }));
  }, [wireDefinitions]);

  // Pulse progression state
  const pulseData = useMemo(() => {
    return curves.map((_, i) => ({
      t: (i * 0.15) % 1.0,
      speed: 0.35 + Math.random() * 0.25,
    }));
  }, [curves]);

  useFrame((_, delta) => {
    if (!pulseGroupRef.current) return;
    const children = pulseGroupRef.current.children;

    curves.forEach((c, i) => {
      const p = pulseData[i];
      p.t = (p.t + delta * p.speed) % 1.0;
      const mesh = children[i] as THREE.Mesh;
      if (mesh) {
        const pt = c.curve.getPoint(p.t);
        mesh.position.copy(pt);
      }
    });
  });

  return (
    <group>
      {/* 3D Wiring Conduits / Tubes */}
      {curves.map(({ wire, tubeGeo }, idx) => {
        const isConnectedToSelected =
          selectedComponentId === null ||
          wire.sourceId === selectedComponentId ||
          wire.targetId === selectedComponentId;

        const isVisible =
          (wire.type === 'power' && showPowerBuses) ||
          ((wire.type === 'data' || wire.type === 'rf') && showDataBuses);

        if (!isVisible) return null;

        const glowIntensity = isConnectedToSelected ? 0.9 : 0.15;

        return (
          <group key={wire.id}>
            {/* Wire Tube */}
            <mesh geometry={tubeGeo}>
              <meshStandardMaterial
                color={wire.color}
                emissive={wire.color}
                emissiveIntensity={glowIntensity}
                roughness={0.3}
                metalness={0.2}
                transparent
                opacity={isConnectedToSelected ? 0.95 : 0.25}
              />
            </mesh>

            {/* Glowing Connection Junction Beacons */}
            <mesh position={wire.points[0]}>
              <sphereGeometry args={[0.009, 12, 12]} />
              <meshBasicMaterial
                color={wire.color}
                transparent
                opacity={isConnectedToSelected ? 1.0 : 0.2}
              />
            </mesh>
            <mesh position={wire.points[wire.points.length - 1]}>
              <sphereGeometry args={[0.009, 12, 12]} />
              <meshBasicMaterial
                color={wire.color}
                transparent
                opacity={isConnectedToSelected ? 1.0 : 0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Traveling Energy and Signal Pulses */}
      <group ref={pulseGroupRef}>
        {curves.map(({ wire }, idx) => {
          const isConnectedToSelected =
            selectedComponentId === null ||
            wire.sourceId === selectedComponentId ||
            wire.targetId === selectedComponentId;

          const isVisible =
            (wire.type === 'power' && showPowerBuses) ||
            ((wire.type === 'data' || wire.type === 'rf') && showDataBuses);

          return (
            <mesh key={`pulse-${idx}`} visible={isVisible && isConnectedToSelected}>
              <sphereGeometry args={[0.012, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

