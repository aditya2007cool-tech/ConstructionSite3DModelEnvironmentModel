import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { X, Sparkles, Sliders, Info, Zap } from 'lucide-react';
import { MicroSensorSimulations } from '../3d/MicroSensorSimulations';

interface MicroSimModalProps {
  type: 'pm' | 'gas' | 'wind' | 'temp' | null;
  onClose: () => void;
}

export const MicroSimModal: React.FC<MicroSimModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const simInfo = {
    pm: {
      title: 'Optical PM Sensor — Mie Light Scattering Simulation',
      subtitle: 'Laser Nephelometer Pulse-Height Sizing Mechanism',
      description:
        'Demonstrates how a 650nm focused laser diode beam interacts with individual dust particles. When a particle traverses the beam waist, it scatters photons in all directions. A 90° parabolic mirror gathers the scattered flux onto a high-speed PIN photodiode. The resulting voltage spike amplitude is proportional to the square of particle diameter (Mie Scattering Theory), sizing particulates into PM1.0, PM2.5, and PM10 bins.',
      metrics: [
        { label: 'Laser Wavelength', val: '650 nm (Red Diode)' },
        { label: 'Scattering Angle', val: '90° Orthogonal' },
        { label: 'Size Discrimination', val: '0.35 µm to 40 µm' },
        { label: 'Sampling Airflow', val: '1.2 L/min Sheath Flow' },
      ],
    },
    gas: {
      title: 'Electrochemical Gas Sensor — 4-Electrode Redox Reaction',
      subtitle: 'Amperometric Catalytic Reaction & Nanoamp Generation',
      description:
        'Demonstrates how toxic gas molecules (NO₂, CO, SO₂, O₃) diffuse across a hydrophobic porous PTFE membrane. At the catalytic precious metal Working Electrode, an oxidation or reduction reaction occurs, releasing electrons into the external circuit. An Auxiliary Electrode tracks baseline electrolyte zero-drift, providing sub-ppb accuracy for construction equipment exhaust tracking.',
      metrics: [
        { label: 'Electrode Catalyst', val: 'Platinum / Gold Black' },
        { label: 'Diffusion Barrier', val: 'Hydrophobic ePTFE' },
        { label: 'Signal Output', val: 'Nanoamperes (nA)' },
        { label: 'AFE Digitization', val: '24-Bit Sigma-Delta' },
      ],
    },
    wind: {
      title: 'Meteorological Wind Sensor — Aerodynamic Drag & Azimuth Tracking',
      subtitle: '3-Cup Differential Drag Rotor & Contactless Magnetic Vane',
      description:
        'Demonstrates how wind airflow produces differential aerodynamic drag on the conical cups, driving rotation strictly proportional to horizontal wind speed. Simultaneously, the aerodynamic tail fin self-aligns downwind, turning the solid brass nose counterweight into the wind vector while an AS5600 12-bit magnetic Hall sensor digitizes continuous 360° direction.',
      metrics: [
        { label: 'Starting Threshold', val: '< 0.4 m/s (0.9 mph)' },
        { label: 'Measurement Range', val: '0.3 to 55 m/s' },
        { label: 'Angle Resolution', val: '0.1° (12-Bit Magnetic)' },
        { label: 'Crane Safety Cutoff', val: '> 12 m/s (27 mph)' },
      ],
    },
    temp: {
      title: 'Environmental Temp & RH Sensor — Capacitive Dielectric Absorption',
      subtitle: 'Capacitive Polymer Relative Humidity & Bandgap Silicon Diode',
      description:
        'Demonstrates how ambient water vapor molecules diffuse through a porous gold top electrode into a sub-micron polymer dielectric film. The absorbed moisture alters the dielectric constant, changing capacitance proportionally to relative humidity. An integrated silicon bandgap PTAT circuit measures thermodynamic temperature.',
      metrics: [
        { label: 'RH Response Time', val: 'τ63% < 4 seconds' },
        { label: 'RH Precision', val: '±1.0% RH (0 to 100%)' },
        { label: 'Temp Accuracy', val: '±0.1°C (-40°C to +85°C)' },
        { label: 'Dust Protection', val: '5µm Sintered Stainless Cap' },
      ],
    },
  }[type];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1220] border border-cyan-500/50 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden shadow-cyan-500/20">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {simInfo.title}
              </h2>
              <p className="text-[11px] text-cyan-400/90 font-mono">
                {simInfo.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Micro-Simulation Viewport */}
        <div className="h-72 w-full bg-[#050811] relative border-b border-slate-800">
          <Canvas camera={{ position: [0, 0, 2.0], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 5, 4]} intensity={1.5} />
            <directionalLight position={[-3, -3, 2]} intensity={0.6} color="#38bdf8" />
            <Center>
              <MicroSensorSimulations type={type} />
            </Center>
            <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
            Interactive 3D Simulation • Drag to Orbit • Scroll to Zoom
          </div>
        </div>

        {/* Technical Description & Parameter Metrics */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
              <Info className="w-4 h-4" />
              <span>Scientific Working Mechanism</span>
            </div>
            {simInfo.description}
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Operational Engineering Parameters</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {simInfo.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono"
                >
                  <span className="text-[10px] text-slate-400 block">{m.label}</span>
                  <span className="text-xs text-cyan-300 font-bold mt-0.5 block">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 transition-all"
          >
            Close Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

