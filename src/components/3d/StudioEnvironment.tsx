import React from 'react';
import { ContactShadows, Grid } from '@react-three/drei';
import { LightingPreset } from '../../types';
import { AtmosphericBackdrop } from './AtmosphericBackdrop';

interface StudioEnvironmentProps {
  preset: LightingPreset;
  showGrid?: boolean;
  isAirflowMode?: boolean;
}

export const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({
  preset,
  showGrid = true,
  isAirflowMode = false,
}) => {
  return (
    <>
      {/* Studio Lighting Configurations */}
      {preset === 'studio' && (
        <>
          <ambientLight intensity={0.7} color="#f8fafc" />
          {/* Key Light (Sun / Studio Softbox) */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.0}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          {/* Cool Fill Light */}
          <directionalLight position={[-5, 3, -2]} intensity={1.1} color="#93c5fd" />
          {/* High Top Rim Light */}
          <directionalLight position={[0, 10, -5]} intensity={1.4} color="#e0f2fe" />
          {/* Soft Ground Bounce */}
          <pointLight position={[0, -2, 2]} intensity={0.6} color="#38bdf8" />
        </>
      )}

      {preset === 'sunset' && (
        <>
          <ambientLight intensity={0.6} color="#fed7aa" />
          {/* Warm Golden Key Light */}
          <directionalLight
            position={[7, 4, 3]}
            intensity={2.8}
            color="#f97316"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Cool Twilight Sky Fill */}
          <directionalLight position={[-6, 5, -4]} intensity={1.2} color="#6366f1" />
          <pointLight position={[0, -1, 1]} intensity={0.8} color="#fdba74" />
        </>
      )}

      {preset === 'cad-white' && (
        <>
          <ambientLight intensity={1.5} color="#ffffff" />
          <directionalLight position={[0, 10, 5]} intensity={1.3} />
          <directionalLight position={[0, -5, -5]} intensity={0.7} />
          <directionalLight position={[-8, 0, 0]} intensity={0.5} />
        </>
      )}

      {preset === 'cyberpunk' && (
        <>
          <ambientLight intensity={0.4} color="#1e1b4b" />
          {/* Cyan High-Intensity Key */}
          <directionalLight position={[5, 6, 4]} intensity={2.4} color="#06b6d4" castShadow />
          {/* Magenta / Pink Accent Fill */}
          <directionalLight position={[-5, 4, -3]} intensity={2.2} color="#ec4899" />
          <pointLight position={[0, -1, 1]} intensity={1.8} color="#8b5cf6" distance={4} />
          <pointLight position={[0, 2, -1]} intensity={1.2} color="#06b6d4" distance={3} />
        </>
      )}

      {/* Atmospheric Construction Air Particle Motes */}
      <AtmosphericBackdrop isAirflowMode={isAirflowMode} />

      {/* Realistic Soft Contact Shadows on Floor */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.75}
        scale={7}
        blur={2.2}
        far={5.0}
      />

      {/* Industrial CAD Ground Plane Grid */}
      {showGrid && (
        <Grid
          position={[0, -1.805, 0]}
          args={[14, 14]}
          cellSize={0.25}
          cellThickness={0.7}
          cellColor="#1e293b"
          sectionSize={1.0}
          sectionThickness={1.4}
          sectionColor="#38bdf8"
          fadeDistance={9}
          fadeStrength={1.8}
        />
      )}
    </>
  );
};
