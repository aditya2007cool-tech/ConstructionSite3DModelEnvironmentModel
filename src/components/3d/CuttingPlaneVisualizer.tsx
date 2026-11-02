import React from 'react';
import * as THREE from 'three';
import { CuttingAxis } from '../../types';

interface CuttingPlaneVisualizerProps {
  axis: CuttingAxis;
  offset: number;
  isInverted: boolean;
  visible: boolean;
}

export const CuttingPlaneVisualizer: React.FC<CuttingPlaneVisualizerProps> = ({
  axis,
  offset,
  isInverted,
  visible,
}) => {
  if (!visible) return null;

  // Compute position and rotation of the cutting plane visualizer
  let position: [number, number, number] = [0, 0, 0];
  let rotation: [number, number, number] = [0, 0, 0];

  if (axis === 'x') {
    // Sagittal cut (plane lies in Y-Z)
    position = [offset, 0, 0];
    rotation = [0, Math.PI / 2, 0];
  } else if (axis === 'y') {
    // Horizontal cut (plane lies in X-Z)
    position = [0, offset, 0];
    rotation = [-Math.PI / 2, 0, 0];
  } else if (axis === 'z') {
    // Coronal cut (plane lies in X-Y)
    position = [0, 0, offset];
    rotation = [0, 0, 0];
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Semi-transparent Tinted Cutting Plane Sheet */}
      <mesh>
        <planeGeometry args={[1.4, 1.4]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Glowing Perimeter Laser Border Line */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.4, 1.4)]} />
        <lineBasicMaterial color="#f97316" linewidth={2} />
      </lineSegments>

      {/* Center Laser Crosshair & Normal Direction Indicator */}
      <group position={[0, 0, 0]}>
        {/* Normal Arrow Vector showing which side is preserved/clipped */}
        <mesh
          position={[0, 0, isInverted ? -0.12 : 0.12]}
          rotation={[isInverted ? Math.PI : 0, 0, 0]}
        >
          <coneGeometry args={[0.025, 0.08, 16]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        <mesh
          position={[0, 0, isInverted ? -0.05 : 0.05]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      </group>

      {/* Grid divisions on cutting blade */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((coord, i) => (
        <React.Fragment key={`grid-${i}`}>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([-0.7, coord, 0.001, 0.7, coord, 0.001]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#f97316" transparent opacity={0.25} />
          </line>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([coord, -0.7, 0.001, coord, 0.7, 0.001]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#f97316" transparent opacity={0.25} />
          </line>
        </React.Fragment>
      ))}
    </group>
  );
};
