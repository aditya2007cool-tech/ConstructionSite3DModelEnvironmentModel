import React from 'react';
import { Wind, Play, Pause, FastForward, Filter } from 'lucide-react';

interface AirflowControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onChangeSpeed: (spd: number) => void;
  activeStage: 'all' | 'inlet' | 'pm' | 'gas' | 'exhaust';
  onSelectStage: (stage: 'all' | 'inlet' | 'pm' | 'gas' | 'exhaust') => void;
  showStreamlines: boolean;
  onToggleStreamlines: () => void;
  density: number;
  onChangeDensity: (density: number) => void;
}

export const AirflowControls: React.FC<AirflowControlsProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  activeStage,
  onSelectStage,
  showStreamlines,
  onToggleStreamlines,
  density,
  onChangeDensity,
}) => {
  const stages: { id: 'all' | 'inlet' | 'pm' | 'gas' | 'exhaust'; label: string; desc: string }[] = [
    { id: 'all', label: 'Complete Path', desc: 'Full outdoor air sampling cycle' },
    { id: 'inlet', label: '1. Rain Inlet', desc: 'Omnidirectional rain cap & de-fogger' },
    { id: 'pm', label: '2. PM Laser Chamber', desc: 'Sheath flow & 90° light scattering' },
    { id: 'gas', label: '3. Gas Manifold', desc: 'Diffusion over NO₂, CO, SO₂, O₃' },
    { id: 'exhaust', label: '4. Bottom Exhaust', desc: 'Louvered discharge with mesh' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0c1424]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-4 shadow-2xl">
      {/* Title & Play/Pause */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Aerosol & Gas Flow Dynamics
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-800/60">
            {speed}x Flow Speed
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Animate</span>
              </>
            )}
          </button>

          {/* Speed Presets */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
            {[0.5, 1.0, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-0.5 rounded ${
                  speed === spd ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Streamlines Toggle */}
          <button
            onClick={onToggleStreamlines}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
              showStreamlines ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Streamlines
          </button>
        </div>
      </div>

      {/* Sampling Flow Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80">
        {stages.map((stg) => {
          const isActive = activeStage === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => onSelectStage(stg.id)}
              className={`p-2 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-cyan-500/15 border border-cyan-500/60 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <div
                className={`text-[11px] font-bold font-mono ${
                  isActive ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {stg.label}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {stg.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

