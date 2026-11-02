import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VisualizationSection } from '../../types';
import { STATION_COMPONENTS } from '../../data/stationComponents';
import { createPBRMaterials } from './Materials';

interface AeroStation3DProps {
  section: VisualizationSection;
  explodedProgress: number; // 0 to 1
  xrayOpacity: number; // 0.05 to 0.5
  clippingPlanes: THREE.Plane[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onHoverComponent: (id: string | null) => void;
  isolatedComponentId?: string | null;
  windSpeedFactor?: number;
}

export const AeroStation3D: React.FC<AeroStation3DProps> = ({
  section,
  explodedProgress,
  xrayOpacity,
  clippingPlanes,
  selectedComponentId,
  hoveredComponentId,
  onSelectComponent,
  onHoverComponent,
  isolatedComponentId,
  windSpeedFactor = 1.0,
}) => {
  // References for continuous moving mechanical parts
  const anemometerRef = useRef<THREE.Group>(null);
  const windVaneRef = useRef<THREE.Group>(null);
  const fanBladesRef = useRef<THREE.Group>(null);
  const statusLedRef = useRef<THREE.PointLight>(null);
  const laserPulseRef = useRef<THREE.PointLight>(null);

  const isXRay = section === 'xray';
  const isExploded = section === 'exploded';
  const isTechnical = section === 'technical';
  const isCrossSection = section === 'cross-section';

  // Generate materials with clipping planes, X-ray glow, and double-sided cutaways
  const materials = useMemo(() => {
    return createPBRMaterials(
      isCrossSection ? clippingPlanes : [],
      isXRay,
      xrayOpacity,
      isTechnical,
      isCrossSection
    );
  }, [clippingPlanes, isCrossSection, isXRay, xrayOpacity, isTechnical]);

  // Animation frame loop for continuous rotating components
  useFrame((state, delta) => {
    // 3-Cup Anemometer rotation
    if (anemometerRef.current) {
      anemometerRef.current.rotation.y += delta * 4.8 * windSpeedFactor;
    }
    // Aerodynamic wind vane natural oscillation
    if (windVaneRef.current) {
      const time = state.clock.getElapsedTime();
      windVaneRef.current.rotation.y = Math.sin(time * 0.9) * 0.18 + 0.35;
    }
    // High-speed centrifugal blower impeller inside PM sensor
    if (fanBladesRef.current) {
      fanBladesRef.current.rotation.z += delta * 24.0;
    }
    // Diagnostic LED pulse sequence
    if (statusLedRef.current) {
      const t = state.clock.getElapsedTime();
      statusLedRef.current.intensity = Math.sin(t * 5.0) > 0.1 ? 1.6 : 0.2;
    }
    // PM Laser cavity optical pulse
    if (laserPulseRef.current) {
      const t = state.clock.getElapsedTime();
      laserPulseRef.current.intensity = 1.2 + Math.sin(t * 12.0) * 0.4;
    }
  });

  // Calculate position with exploded offset
  const getComponentOffset = (componentId: string): [number, number, number] => {
    const comp = STATION_COMPONENTS.find((c) => c.id === componentId);
    if (!comp) return [0, 0, 0];
    if (isExploded) {
      return [
        comp.explodedOffset[0] * explodedProgress,
        comp.explodedOffset[1] * explodedProgress,
        comp.explodedOffset[2] * explodedProgress,
      ];
    }
    return [0, 0, 0];
  };

  // Helper for component interaction props
  const getInteractProps = (componentId: string) => ({
    onClick: (e: any) => {
      e.stopPropagation();
      onSelectComponent(componentId);
    },
    onPointerOver: (e: any) => {
      e.stopPropagation();
      onHoverComponent(componentId);
    },
    onPointerOut: (e: any) => {
      e.stopPropagation();
      onHoverComponent(null);
    },
  });

  // Check visibility for isolated mode
  const isVisible = (componentId: string) => {
    if (section === 'inspection' && isolatedComponentId) {
      return isolatedComponentId === componentId;
    }
    return true;
  };

  const isSelected = (id: string) => selectedComponentId === id;
  const isHovered = (id: string) => hoveredComponentId === id;

  const getHighlightColor = (id: string, defaultColor: string) => {
    if (isSelected(id)) return '#38bdf8'; // Bright cyan selection
    if (isHovered(id)) return '#f59e0b'; // Amber hover
    return defaultColor;
  };

  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================================
          14. STRUCTURAL MOUNTING MAST & BRACKETS
          ========================================================================= */}
      {isVisible('mounting_mast') && (
        <group
          position={getComponentOffset('mounting_mast')}
          {...getInteractProps('mounting_mast')}
        >
          {/* Main 50mm Hot-Dip Galvanized Structural Steel Mast */}
          <mesh position={[0, -0.4, -0.35]} material={materials.mastSteelMat} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, 3.2, 32]} />
          </mesh>

          {/* Top T-Crossarm for Meteorological Sensors */}
          <mesh
            position={[0, 1.25, -0.35]}
            rotation={[0, 0, Math.PI / 2]}
            material={materials.mastSteelMat}
          >
            <cylinderGeometry args={[0.026, 0.026, 1.1, 24]} />
          </mesh>

          {/* Dual Heavy-Duty U-Bolt Saddle Clamps with Damping Isolators */}
          {[0.25, -0.35].map((y, idx) => (
            <group key={`ubolt-${idx}`} position={[0, y, -0.28]}>
              {/* Saddle Clamp Backer */}
              <mesh material={materials.aluminumChassisMat}>
                <boxGeometry args={[0.22, 0.065, 0.08]} />
              </mesh>
              {/* Neoprene Vibration Isolator Sleeve */}
              <mesh position={[0, 0, -0.04]} material={materials.enclosureMat}>
                <cylinderGeometry args={[0.055, 0.055, 0.055, 24]} />
              </mesh>
              {/* Stainless Steel U-Bolt Rod & Hex Nuts */}
              <mesh position={[0.08, 0, -0.04]} material={materials.mastSteelMat}>
                <cylinderGeometry args={[0.008, 0.008, 0.09, 12]} />
              </mesh>
              <mesh position={[-0.08, 0, -0.04]} material={materials.mastSteelMat}>
                <cylinderGeometry args={[0.008, 0.008, 0.09, 12]} />
              </mesh>
            </group>
          ))}

          {/* Lightning Protection M8 Grounding Stud & Heavy Braided Copper Lead */}
          <group position={[0.04, -1.2, -0.3]}>
            <mesh material={materials.brassLaserMat}>
              <boxGeometry args={[0.035, 0.045, 0.035]} />
            </mesh>
            {/* Grounding cable routing downward */}
            <mesh position={[0.015, -0.4, 0]} material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.009, 0.009, 0.8, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          13. SOLAR PANEL (40W MONOCRYSTALLINE) & ADJUSTABLE TILT BRACKET
          ========================================================================= */}
      {isVisible('solar_panel') && (
        <group
          position={getComponentOffset('solar_panel')}
          {...getInteractProps('solar_panel')}
        >
          {/* Tilted Solar PV Assembly (30° Latitude Angle) */}
          <group position={[0, 0.7, -0.75]} rotation={[-Math.PI / 5, 0, 0]}>
            {/* Anodized Aluminum Extrusion Outer Frame */}
            <mesh material={materials.frameAluMat} castShadow>
              <boxGeometry args={[0.9, 0.7, 0.032]} />
            </mesh>

            {/* Dark Blue Monocrystalline Silicon Cell Surface */}
            <mesh position={[0, 0, 0.012]} material={materials.solarWaferMat}>
              <boxGeometry args={[0.86, 0.66, 0.005]} />
            </mesh>

            {/* Silver Solar Busbars & Grid Pattern */}
            <group position={[0, 0, 0.016]}>
              {[-0.32, -0.16, 0, 0.16, 0.32].map((x, i) => (
                <mesh key={`grid-${i}`} position={[x, 0, 0]}>
                  <boxGeometry args={[0.004, 0.64, 0.002]} />
                  <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
                </mesh>
              ))}
              {[-0.22, -0.07, 0.07, 0.22].map((y, i) => (
                <mesh key={`gridy-${i}`} position={[0, y, 0]}>
                  <boxGeometry args={[0.84, 0.003, 0.002]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.15} />
                </mesh>
              ))}
            </group>

            {/* Low-Iron Tempered Solar Glass Front Face */}
            <mesh position={[0, 0, 0.02]} material={materials.solarGlassMat}>
              <boxGeometry args={[0.88, 0.68, 0.006]} />
            </mesh>

            {/* IP68 Rear Junction Box & MC4 Solar Gland */}
            <mesh position={[0, 0.15, -0.026]} material={materials.enclosureMat}>
              <boxGeometry args={[0.1, 0.1, 0.028]} />
            </mesh>
          </group>

          {/* Adjustable Elevation Heavy Swivel Mounting Arm to Mast */}
          <group position={[0, 0.55, -0.55]} rotation={[-Math.PI / 6, 0, 0]}>
            <mesh material={materials.aluminumChassisMat}>
              <boxGeometry args={[0.08, 0.38, 0.04]} />
            </mesh>
            <mesh position={[0.045, 0.1, 0]} material={materials.mastSteelMat}>
              <cylinderGeometry args={[0.014, 0.014, 0.025, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          1. WEATHER-RESISTANT MAIN INDUSTRIAL ENCLOSURE & CHASSIS
          ========================================================================= */}
      {isVisible('main_enclosure') && (
        <group
          position={getComponentOffset('main_enclosure')}
          {...getInteractProps('main_enclosure')}
        >
          {/* Main Enclosure Body / Chassis Box */}
          <mesh position={[0, 0, 0]} material={materials.enclosureMat} castShadow receiveShadow>
            <boxGeometry args={[0.52, 0.72, 0.28]} />
          </mesh>

          {/* Internal Chamber Partition Shelf (Separates analytical bay from power bay) */}
          <mesh position={[0, -0.16, 0]} material={materials.aluminumChassisMat}>
            <boxGeometry args={[0.49, 0.012, 0.25]} />
          </mesh>

          {/* Rear Marine-Grade AlSi12 Aluminum Cooling Backplate with Heat-Dissipation Fins */}
          <group position={[0, 0, -0.145]}>
            <mesh material={materials.aluminumChassisMat}>
              <boxGeometry args={[0.5, 0.7, 0.02]} />
            </mesh>
            {/* 6 Vertical Thermal Dissipation Fins */}
            {[-0.2, -0.12, -0.04, 0.04, 0.12, 0.2].map((x, i) => (
              <mesh key={`fin-${i}`} position={[x, 0, -0.022]} material={materials.aluminumChassisMat}>
                <boxGeometry args={[0.009, 0.65, 0.026]} />
              </mesh>
            ))}
          </group>

          {/* Front Door Cowl with Beveled Edge & Continuous Perimeter Silicone Gasket */}
          <mesh position={[0, 0, 0.142]} material={materials.enclosureMat}>
            <boxGeometry args={[0.51, 0.71, 0.02]} />
          </mesh>

          {/* Clear UV-Stabilized Polycarbonate Inspection Window */}
          <mesh position={[0, 0.15, 0.152]} material={materials.solarGlassMat}>
            <boxGeometry args={[0.26, 0.2, 0.008]} />
          </mesh>

          {/* Industrial Nameplate / Station Identifier Badge */}
          <group position={[0, -0.12, 0.153]}>
            <mesh>
              <boxGeometry args={[0.26, 0.065, 0.002]} />
              <meshStandardMaterial
                color="#090d16"
                metalness={0.9}
                roughness={0.15}
                emissive={isSelected('main_enclosure') ? '#0ea5e9' : '#000000'}
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>

          {/* 4 Stainless Steel Over-Center Draw Toggle Latches with Strike Plates */}
          {[-0.265, 0.265].map((x, sideIdx) => (
            <React.Fragment key={`latches-${sideIdx}`}>
              <group position={[x, 0.18, 0.06]}>
                <mesh material={materials.mastSteelMat}>
                  <boxGeometry args={[0.02, 0.075, 0.04]} />
                </mesh>
                <mesh position={[0, 0.02, 0.015]} material={materials.stainlessProbeMat}>
                  <cylinderGeometry args={[0.005, 0.005, 0.04, 12]} />
                </mesh>
              </group>
              <group position={[x, -0.18, 0.06]}>
                <mesh material={materials.mastSteelMat}>
                  <boxGeometry args={[0.02, 0.075, 0.04]} />
                </mesh>
                <mesh position={[0, 0.02, 0.015]} material={materials.stainlessProbeMat}>
                  <cylinderGeometry args={[0.005, 0.005, 0.04, 12]} />
                </mesh>
              </group>
            </React.Fragment>
          ))}

          {/* Sloped Solar Radiation Sunshield Canopy (Protects chassis from high solar heat load) */}
          <mesh
            position={[0, 0.4, 0.04]}
            rotation={[-0.1, 0, 0]}
            material={materials.sunshieldMat}
            castShadow
          >
            <boxGeometry args={[0.58, 0.03, 0.38]} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          15. VENTILATION & PROTECTIVE ePTFE BREATHING PLUGS
          ========================================================================= */}
      {isVisible('ventilation_mesh') && (
        <group
          position={getComponentOffset('ventilation_mesh')}
          {...getInteractProps('ventilation_mesh')}
        >
          {/* Upper Gore-Tex ePTFE Pressure Equalization Breather Plug (Right Side) */}
          <group position={[0.265, 0.22, -0.05]} rotation={[0, 0, -Math.PI / 2]}>
            <mesh material={materials.mastSteelMat}>
              <cylinderGeometry args={[0.016, 0.016, 0.022, 16]} />
            </mesh>
            {/* White breathable ePTFE membrane disc */}
            <mesh position={[0, 0.012, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.002, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.1} />
            </mesh>
          </group>

          {/* Bottom Downward-Facing Exhaust Cowl & 50-Mesh Stainless Screen */}
          <group position={[0.15, -0.37, 0.04]}>
            <mesh material={materials.aluminumChassisMat}>
              <boxGeometry args={[0.1, 0.045, 0.08]} />
            </mesh>
            {/* Stainless Steel Fine Wire Mesh (0.3mm aperture) */}
            <mesh position={[0, -0.023, 0]}>
              <boxGeometry args={[0.09, 0.003, 0.07]} />
              <meshStandardMaterial color="#94a3b8" wireframe metalness={0.95} roughness={0.15} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          2. OMNIDIRECTIONAL SAMPLING INLET & HEATED DE-FOGGER
          ========================================================================= */}
      {isVisible('sampling_inlet') && (
        <group
          position={getComponentOffset('sampling_inlet')}
          {...getInteractProps('sampling_inlet')}
        >
          {/* Aerodynamic Omnidirectional Rain-Deflecting Hood (Top Left of Enclosure) */}
          <group position={[-0.16, 0.44, 0.04]}>
            {/* Rain Cap Disc / Hat */}
            <mesh material={materials.sunshieldMat} castShadow>
              <cylinderGeometry args={[0.072, 0.082, 0.022, 32]} />
            </mesh>
            {/* Louvered Circumferential Air Intake Slots */}
            <mesh position={[0, -0.025, 0]} material={materials.pmBlockMat}>
              <cylinderGeometry args={[0.046, 0.046, 0.035, 24]} />
            </mesh>
            {/* Vertical Air Ingestion Tube */}
            <mesh position={[0, -0.08, 0]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.022, 0.022, 0.085, 24]} />
            </mesh>
            {/* Brass Heating Collar (12V PTC Anti-Condensation De-fogger) */}
            <mesh position={[0, -0.095, 0]} material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.028, 0.028, 0.03, 24]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          3. PM1, PM2.5, PM10 HIGH-PRECISION LASER OPTICAL PARTICLE COUNTER
          ========================================================================= */}
      {isVisible('pm_sensor') && (
        <group
          position={getComponentOffset('pm_sensor')}
          {...getInteractProps('pm_sensor')}
        >
          {/* Main CNC Stepped Optical Bench Housing */}
          <group position={[-0.15, 0.16, 0.03]}>
            <mesh material={materials.pmBlockMat} castShadow>
              <boxGeometry args={[0.13, 0.16, 0.09]} />
            </mesh>

            {/* Aluminum Cooling Micro-Fins on Optical Block */}
            {[-0.04, -0.01, 0.02, 0.05].map((y, i) => (
              <mesh key={`pm-fin-${i}`} position={[0.066, y, 0]} material={materials.pmBlockMat}>
                <boxGeometry args={[0.005, 0.012, 0.08]} />
              </mesh>
            ))}

            {/* Precision Laser Diode Brass Collimator Housing */}
            <mesh position={[-0.075, 0.03, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.015, 0.015, 0.045, 20]} />
            </mesh>

            {/* Focused 650nm Laser Beam (Emissive Red Internal Line) */}
            <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.002, 0.002, 0.1, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <pointLight ref={laserPulseRef} position={[0, 0.03, 0]} color="#ef4444" distance={0.15} />

            {/* 90° Light Scattering Photodiode Collector Optics Housing */}
            <mesh position={[0, -0.04, 0.05]} material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.013, 0.013, 0.028, 16]} />
            </mesh>

            {/* Light Trap / Beam Dump Horn on opposite side */}
            <mesh position={[0.07, 0.03, 0]} rotation={[0, 0, -Math.PI / 2]} material={materials.pmBlockMat}>
              <coneGeometry args={[0.015, 0.025, 16]} />
            </mesh>

            {/* Miniature 40mm Brushless Centrifugal Sampling Fan */}
            <group position={[0, -0.082, 0]}>
              <mesh material={materials.enclosureMat}>
                <boxGeometry args={[0.082, 0.024, 0.082]} />
              </mesh>
              {/* Rotating aerodynamic impeller blades */}
              <group ref={fanBladesRef} position={[0, -0.012, 0]}>
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                  <mesh key={`blade-${idx}`} rotation={[0, (idx * Math.PI) / 3.5, 0.25]}>
                    <boxGeometry args={[0.032, 0.003, 0.009]} />
                    <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.25} />
                  </mesh>
                ))}
              </group>
            </group>

            {/* Laser Active Hazard Warning Indicator */}
            <mesh position={[-0.05, 0.07, 0.046]}>
              <circleGeometry args={[0.005, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          4, 5, 6, 7. 4-ELECTRODE GAS SENSOR CLUSTER (NO₂, CO, SO₂, O₃) IN MANIFOLD
          ========================================================================= */}
      {/* Delrin Air-Tight Gas Manifold Base Block with Internal Gas Galleries */}
      {isVisible('gas_no2') && (
        <group
          position={getComponentOffset('gas_no2')}
          {...getInteractProps('gas_no2')}
        >
          <mesh position={[0.13, 0.16, 0.02]} material={materials.gasManifoldMat}>
            <boxGeometry args={[0.18, 0.16, 0.07]} />
          </mesh>

          {/* Brass Compression Elbow Fitting for Series Pneumatic Intake */}
          <mesh position={[0.03, 0.16, 0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.brassLaserMat}>
            <cylinderGeometry args={[0.008, 0.008, 0.03, 12]} />
          </mesh>

          {/* Sensor 1: NO₂ (Amber Identification Ring) */}
          <group position={[0.08, 0.2, 0.06]}>
            {/* Canister Body */}
            <mesh material={materials.gasCanisterMat}>
              <cylinderGeometry args={[0.023, 0.023, 0.034, 24]} />
            </mesh>
            {/* Knurled Collar */}
            <mesh position={[0, -0.01, 0]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.024, 0.024, 0.008, 24]} />
            </mesh>
            {/* Amber Identification Rim */}
            <mesh position={[0, 0.018, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.004, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.7} />
            </mesh>
            {/* White Hydrophobic ePTFE Gas-Permeable Membrane Center */}
            <mesh position={[0, 0.019, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.003, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        </group>
      )}

      {/* Sensor 2: CO (Safety Orange Identification Ring) */}
      {isVisible('gas_co') && (
        <group
          position={getComponentOffset('gas_co')}
          {...getInteractProps('gas_co')}
        >
          <group position={[0.18, 0.2, 0.06]}>
            <mesh material={materials.gasCanisterMat}>
              <cylinderGeometry args={[0.023, 0.023, 0.034, 24]} />
            </mesh>
            <mesh position={[0, -0.01, 0]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.024, 0.024, 0.008, 24]} />
            </mesh>
            <mesh position={[0, 0.018, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.004, 24]} />
              <meshStandardMaterial color="#f97316" roughness={0.2} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.019, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.003, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        </group>
      )}

      {/* Sensor 3: SO₂ (Yellow Identification Ring) */}
      {isVisible('gas_so2') && (
        <group
          position={getComponentOffset('gas_so2')}
          {...getInteractProps('gas_so2')}
        >
          <group position={[0.08, 0.12, 0.06]}>
            <mesh material={materials.gasCanisterMat}>
              <cylinderGeometry args={[0.023, 0.023, 0.034, 24]} />
            </mesh>
            <mesh position={[0, -0.01, 0]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.024, 0.024, 0.008, 24]} />
            </mesh>
            <mesh position={[0, 0.018, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.004, 24]} />
              <meshStandardMaterial color="#eab308" roughness={0.2} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.019, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.003, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        </group>
      )}

      {/* Sensor 4: O₃ (Violet / Purple Identification Ring) */}
      {isVisible('gas_o3') && (
        <group
          position={getComponentOffset('gas_o3')}
          {...getInteractProps('gas_o3')}
        >
          <group position={[0.18, 0.12, 0.06]}>
            <mesh material={materials.gasCanisterMat}>
              <cylinderGeometry args={[0.023, 0.023, 0.034, 24]} />
            </mesh>
            <mesh position={[0, -0.01, 0]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.024, 0.024, 0.008, 24]} />
            </mesh>
            <mesh position={[0, 0.018, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.004, 24]} />
              <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.019, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.003, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          8. TEMPERATURE & HUMIDITY PROBE (SHT45 IN STEVENSON RADIATION SHIELD)
          ========================================================================= */}
      {isVisible('env_temp_rh') && (
        <group
          position={getComponentOffset('env_temp_rh')}
          {...getInteractProps('env_temp_rh')}
        >
          {/* Aspirated Multi-Plate Radiation Shield Mounted on Left Side Standoff */}
          <group position={[-0.34, 0.05, 0.02]}>
            {/* 8 Stacked Conical Radiation Louver Plates */}
            {[0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14].map((y, i) => (
              <mesh key={`shield-plate-${i}`} position={[0, y, 0]} material={materials.radShieldMat}>
                <cylinderGeometry args={[0.046, 0.056, 0.013, 24]} />
              </mesh>
            ))}

            {/* Central 316 Stainless Steel Probe Rod */}
            <mesh position={[0, 0.06, 0]} material={materials.stainlessProbeMat}>
              <cylinderGeometry args={[0.008, 0.008, 0.13, 16]} />
            </mesh>

            {/* Sintered Porous 5µm Stainless Steel Filter Cap */}
            <mesh position={[0, -0.015, 0]} material={materials.gasCanisterMat}>
              <cylinderGeometry args={[0.009, 0.009, 0.028, 16]} />
            </mesh>

            {/* Standoff Mounting Arm with Hex Nut to Main Chassis */}
            <mesh position={[0.045, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.008, 0.008, 0.08, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          10. 3-CUP ROTARY ANEMOMETER (WIND SPEED)
          ========================================================================= */}
      {isVisible('wind_anemometer') && (
        <group
          position={getComponentOffset('wind_anemometer')}
          {...getInteractProps('wind_anemometer')}
        >
          {/* Left Side of Top Mast Crossarm */}
          <group position={[-0.45, 1.35, -0.35]}>
            {/* Vertical Spindle Bearing Housing */}
            <mesh material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.022, 0.024, 0.15, 20]} />
            </mesh>

            {/* Rotating 3-Cup Rotor Assembly */}
            <group ref={anemometerRef} position={[0, 0.075, 0]}>
              {/* Central Hub with Bearing Cap */}
              <mesh material={materials.enclosureMat}>
                <cylinderGeometry args={[0.026, 0.026, 0.022, 16]} />
              </mesh>

              {/* 3 Aerodynamic Parabolic Cups with Beaded Rims */}
              {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
                <group key={`cup-${idx}`} rotation={[0, angle, 0]}>
                  {/* Carbon-fiber strut arm */}
                  <mesh position={[0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.mastSteelMat}>
                    <cylinderGeometry args={[0.004, 0.004, 0.16, 12]} />
                  </mesh>
                  {/* Parabolic aerodynamic cup */}
                  <mesh position={[0.17, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <sphereGeometry args={[0.032, 16, 16, 0, Math.PI]} />
                    <meshStandardMaterial
                      color={getHighlightColor('wind_anemometer', '#0ea5e9')}
                      metalness={0.35}
                      roughness={0.3}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                </group>
              ))}
            </group>
          </group>
        </group>
      )}

      {/* =========================================================================
          11. AERODYNAMIC BALANCED WIND VANE (WIND DIRECTION)
          ========================================================================= */}
      {isVisible('wind_vane') && (
        <group
          position={getComponentOffset('wind_vane')}
          {...getInteractProps('wind_vane')}
        >
          {/* Right Side of Top Mast Crossarm */}
          <group position={[0.45, 1.35, -0.35]}>
            {/* Bearing Spindle Housing 12-Bit Contactless Magnetic Angle Sensor */}
            <mesh material={materials.aluminumChassisMat}>
              <cylinderGeometry args={[0.022, 0.024, 0.15, 20]} />
            </mesh>

            {/* Rotating Aerodynamic Vane Assembly */}
            <group ref={windVaneRef} position={[0, 0.075, 0]}>
              {/* Central Balance Pivot Hub */}
              <mesh material={materials.enclosureMat}>
                <cylinderGeometry args={[0.024, 0.024, 0.026, 16]} />
              </mesh>

              {/* Horizontal Support Spindle */}
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.mastSteelMat}>
                <cylinderGeometry args={[0.004, 0.004, 0.38, 12]} />
              </mesh>

              {/* Solid Turned Brass Bullet Counterweight (Points INTO the oncoming wind) */}
              <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]} material={materials.brassLaserMat}>
                <cylinderGeometry args={[0.016, 0.012, 0.055, 16]} />
              </mesh>

              {/* Aerodynamic NACA Profile Tail Fin */}
              <mesh position={[0, 0.045, -0.17]}>
                <boxGeometry args={[0.004, 0.12, 0.15]} />
                <meshStandardMaterial
                  color={getHighlightColor('wind_vane', '#06b6d4')}
                  metalness={0.75}
                  roughness={0.25}
                />
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* =========================================================================
          12. CONFORMAL-COATED MOTHERBOARD & EMBEDDED MEMS BAROMETER
          ========================================================================= */}
      {isVisible('control_pcb') && (
        <group
          position={getComponentOffset('control_pcb')}
          {...getInteractProps('control_pcb')}
        >
          {/* 4-Layer FR4 Conformal-Coated Motherboard Plate */}
          <group position={[0, -0.05, -0.02]}>
            <mesh material={materials.pcbMat} castShadow>
              <boxGeometry args={[0.42, 0.34, 0.008]} />
            </mesh>

            {/* Dual-Core 32-Bit ARM / ESP32-S3 Microcontroller (MCU) */}
            <group position={[-0.08, 0.04, 0.008]}>
              <mesh material={materials.mcuMat}>
                <boxGeometry args={[0.046, 0.046, 0.006]} />
              </mesh>
              {/* Laser-Etched Metallic Heat Spreader */}
              <mesh position={[0, 0, 0.004]}>
                <boxGeometry args={[0.038, 0.038, 0.001]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>

            {/* Multichannel 24-Bit Sigma-Delta Analog Front-End (AFE) ICs */}
            <mesh position={[0.1, 0.08, 0.007]} material={materials.mcuMat}>
              <boxGeometry args={[0.032, 0.022, 0.005]} />
            </mesh>

            {/* Pluggable Phoenix Screw Terminal Headers */}
            <group position={[0, -0.14, 0.012]}>
              <mesh material={materials.pcbMat}>
                <boxGeometry args={[0.36, 0.025, 0.02]} />
              </mesh>
              {/* Brass Screw Terminals */}
              {[-0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15].map((x, i) => (
                <mesh key={`screw-${i}`} position={[x, 0, 0.011]} material={materials.brassLaserMat}>
                  <cylinderGeometry args={[0.004, 0.004, 0.004, 12]} />
                </mesh>
              ))}
            </group>

            {/* Diagnostic Multi-Color Status LEDs with Dynamic Point Light */}
            <group position={[-0.16, 0.13, 0.008]}>
              {/* Green Power LED */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.003, 0.003, 0.004, 12]} />
                <meshBasicMaterial color="#22c55e" />
              </mesh>
              {/* Blue Link LED */}
              <mesh position={[0.015, 0, 0]}>
                <cylinderGeometry args={[0.003, 0.003, 0.004, 12]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
              {/* Amber Status LED */}
              <mesh position={[0.03, 0, 0]}>
                <cylinderGeometry args={[0.003, 0.003, 0.004, 12]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <pointLight
                ref={statusLedRef}
                position={[0.015, 0, 0.02]}
                color="#38bdf8"
                distance={0.35}
                intensity={1.2}
              />
            </group>

            {/* 9. Atmospheric Pressure Sensor (BMP390 MEMS Barometer) */}
            <group position={[0.05, -0.02, 0.007]} {...getInteractProps('baro_pressure')}>
              <mesh>
                <boxGeometry args={[0.016, 0.014, 0.005]} />
                <meshStandardMaterial
                  color={getHighlightColor('baro_pressure', '#cbd5e1')}
                  metalness={0.95}
                  roughness={0.15}
                />
              </mesh>
              {/* Microscopic pressure port hole */}
              <mesh position={[0, 0, 0.003]}>
                <cylinderGeometry args={[0.002, 0.002, 0.002, 12]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* =========================================================================
          10. HIGH-PRECISION GNSS / GPS MODULE & PATCH ANTENNA
          ========================================================================= */}
      {isVisible('gps_module') && (
        <group
          position={getComponentOffset('gps_module')}
          {...getInteractProps('gps_module')}
        >
          {/* Ceramic 25x25mm GNSS Patch Antenna on Upper Shelf */}
          <group position={[0.16, 0.32, 0.04]}>
            <mesh>
              <boxGeometry args={[0.05, 0.05, 0.01]} />
              <meshStandardMaterial
                color={getHighlightColor('gps_module', '#f8fafc')}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0.006]} material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.002, 0.002, 0.004, 12]} />
            </mesh>
            <mesh position={[0, -0.015, -0.01]} material={materials.aluminumChassisMat}>
              <boxGeometry args={[0.045, 0.03, 0.008]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          11. 4G LTE-M / NB-IOT CELLULAR MODEM & OMNIDIRECTIONAL ANTENNA
          ========================================================================= */}
      {isVisible('cellular_modem') && (
        <group
          position={getComponentOffset('cellular_modem')}
          {...getInteractProps('cellular_modem')}
        >
          {/* Top Chassis SMA Bulkhead & 3dBi Ruggedized Fiberglass Whip Antenna */}
          <group position={[0.22, 0.44, 0.0]}>
            <mesh material={materials.brassLaserMat}>
              <cylinderGeometry args={[0.01, 0.01, 0.03, 16]} />
            </mesh>
            {/* Fiberglass Antenna Radome */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.012, 0.008, 0.42, 24]} />
              <meshStandardMaterial
                color={getHighlightColor('cellular_modem', '#0f172a')}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
          </group>

          {/* Internal M.2 Cellular Transceiver Shield Can on PCB */}
          <mesh position={[0.16, 0.02, -0.01]} material={materials.aluminumChassisMat}>
            <boxGeometry args={[0.06, 0.07, 0.008]} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          12. LiFePO4 DEEP-CYCLE BATTERY & SYNCHRONOUS MPPT CHARGE CONTROLLER
          ========================================================================= */}
      {isVisible('power_system') && (
        <group
          position={getComponentOffset('power_system')}
          {...getInteractProps('power_system')}
        >
          {/* Lower Thermally Isolated Power Bay */}
          {/* 12.8V 20Ah LiFePO4 Prismatic Battery Pack */}
          <group position={[-0.08, -0.24, 0.02]}>
            <mesh material={materials.batteryMat} castShadow>
              <boxGeometry args={[0.22, 0.12, 0.12]} />
            </mesh>
            {/* Terminal Busbars & High-Current Anderson Connector */}
            <mesh position={[0.06, 0.065, 0]} material={materials.brassLaserMat}>
              <boxGeometry args={[0.03, 0.012, 0.04]} />
            </mesh>
            <mesh position={[-0.06, 0.065, 0]} material={materials.mastSteelMat}>
              <boxGeometry args={[0.03, 0.012, 0.04]} />
            </mesh>
          </group>

          {/* Synchronous MPPT Solar Charge Controller with Extruded Fins */}
          <group position={[0.14, -0.24, 0.02]}>
            <mesh material={materials.mpptHeatsinkMat}>
              <boxGeometry args={[0.14, 0.12, 0.07]} />
            </mesh>
            {/* 4 Heat-Dissipation Fins */}
            {[-0.04, -0.01, 0.02, 0.05].map((x, i) => (
              <mesh key={`mppt-fin-${i}`} position={[x, 0, 0.04]} material={materials.mpptHeatsinkMat}>
                <boxGeometry args={[0.005, 0.11, 0.015]} />
              </mesh>
            ))}
            {/* DC Terminal Infeed Block */}
            <mesh position={[0, -0.065, 0.01]} material={materials.brassLaserMat}>
              <boxGeometry args={[0.1, 0.015, 0.03]} />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          INTERNAL PNEUMATIC AIRFLOW TUBING (Continuous Sampling Flow Path)
          ========================================================================= */}
      {(!isolatedComponentId || section === 'airflow' || section === 'xray') && (
        <group>
          {/* Tube 1: Inlet to PM Sensor Chamber */}
          <mesh position={[-0.155, 0.3, 0.035]} material={materials.tubingMat}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 16]} />
          </mesh>

          {/* Tube 2: PM Sensor exhaust to Gas Manifold */}
          <mesh position={[-0.01, 0.16, 0.025]} rotation={[0, 0, Math.PI / 2]} material={materials.tubingMat}>
            <cylinderGeometry args={[0.01, 0.01, 0.15, 16]} />
          </mesh>

          {/* Tube 3: Gas Manifold down to Bottom Exhaust Vent */}
          <mesh position={[0.14, -0.1, 0.03]} material={materials.tubingMat}>
            <cylinderGeometry args={[0.01, 0.01, 0.38, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
};
