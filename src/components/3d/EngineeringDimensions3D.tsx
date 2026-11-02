import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { STATION_COMPONENTS } from '../../data/stationComponents';

interface EngineeringDimensions3DProps {
  showDimensions: boolean;
  showLabels: boolean;
  onSelectComponent: (id: string) => void;
  selectedComponentId: string | null;
}

export const EngineeringDimensions3D: React.FC<EngineeringDimensions3DProps> = ({
  showDimensions,
  showLabels,
  onSelectComponent,
  selectedComponentId,
}) => {
  return (
    <group>
      {/* =========================================================================
          DIMENSION LINES & ANNOTATIONS (Illustrative Engineering Dimensions)
          ========================================================================= */}
      {showDimensions && (
        <group>
          {/* Dimension 1: Enclosure Height (720 mm) */}
          <group position={[0.34, 0, 0.15]}>
            {/* Vertical Line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, -0.36, 0, 0, 0.36, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" linewidth={2} />
            </line>
            {/* Top Tick */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.02, 0.36, 0, 0.02, 0.36, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" />
            </line>
            {/* Bottom Tick */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.02, -0.36, 0, 0.02, -0.36, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" />
            </line>
            {/* Measurement Badge */}
            <Html position={[0.04, 0, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/90 text-[#38bdf8] border border-[#38bdf8]/40 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                720 mm (H)
              </div>
            </Html>
          </group>

          {/* Dimension 2: Enclosure Width (520 mm) */}
          <group position={[0, -0.42, 0.15]}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.26, 0, 0, 0.26, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" linewidth={2} />
            </line>
            <Html position={[0, -0.04, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/90 text-[#38bdf8] border border-[#38bdf8]/40 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                520 mm (W)
              </div>
            </Html>
          </group>

          {/* Dimension 3: Solar PV Width (900 mm) */}
          <group position={[0, 0.95, -0.75]}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.45, 0, 0, 0.45, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#facc15" linewidth={2} />
            </line>
            <Html position={[0, 0.04, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/90 text-[#facc15] border border-[#facc15]/40 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                900 mm (PV)
              </div>
            </Html>
          </group>

          {/* Dimension 4: Meteorological Crossarm Span (1100 mm) */}
          <group position={[0, 1.48, -0.35]}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.55, 0, 0, 0.55, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#06b6d4" linewidth={2} />
            </line>
            <Html position={[0, 0.04, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/90 text-[#06b6d4] border border-[#06b6d4]/40 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                1100 mm (Span)
              </div>
            </Html>
          </group>

          {/* Dimension 5: Mast Height (1800 mm assembled) */}
          <group position={[-0.45, -0.3, -0.35]}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, -1.0, 0, 0, 0.8, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#94a3b8" linewidth={2} />
            </line>
            <Html position={[-0.05, 0, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/90 text-[#94a3b8] border border-[#94a3b8]/40 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                1800 mm (Mast)
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* =========================================================================
          COMPONENT IDENTIFICATION BALLOONS / CALLOUT LABELS
          ========================================================================= */}
      {showLabels && (
        <group>
          {STATION_COMPONENTS.slice(0, 14).map((comp, idx) => {
            // Anchor coordinates corresponding to component location
            let anchor: [number, number, number] = [0, 0, 0];
            switch (comp.id) {
              case 'main_enclosure': anchor = [0.26, 0.1, 0.14]; break;
              case 'sampling_inlet': anchor = [-0.16, 0.44, 0.04]; break;
              case 'pm_sensor': anchor = [-0.15, 0.16, 0.08]; break;
              case 'gas_no2': anchor = [0.08, 0.2, 0.1]; break;
              case 'gas_co': anchor = [0.18, 0.2, 0.1]; break;
              case 'gas_so2': anchor = [0.08, 0.12, 0.1]; break;
              case 'gas_o3': anchor = [0.18, 0.12, 0.1]; break;
              case 'env_temp_rh': anchor = [-0.34, 0.05, 0.02]; break;
              case 'baro_pressure': anchor = [0.05, -0.02, 0.02]; break;
              case 'wind_anemometer': anchor = [-0.45, 1.45, -0.35]; break;
              case 'wind_vane': anchor = [0.45, 1.45, -0.35]; break;
              case 'control_pcb': anchor = [-0.08, -0.05, 0.02]; break;
              case 'gps_module': anchor = [0.16, 0.32, 0.06]; break;
              case 'cellular_modem': anchor = [0.22, 0.55, 0.0]; break;
              case 'power_system': anchor = [-0.08, -0.24, 0.08]; break;
              case 'solar_panel': anchor = [0, 0.85, -0.75]; break;
              default: anchor = [0, 0, 0];
            }

            const isSelected = selectedComponentId === comp.id;

            return (
              <Html key={comp.id} position={anchor} center distanceFactor={7}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectComponent(comp.id);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono transition-all transform hover:scale-110 shadow-lg ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-semibold ring-2 ring-cyan-300'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ backgroundColor: comp.colorAccent, color: '#090d16' }}
                  >
                    {idx + 1}
                  </span>
                  <span className="whitespace-nowrap">{comp.badge}</span>
                </button>
              </Html>
            );
          })}
        </group>
      )}
    </group>
  );
};

