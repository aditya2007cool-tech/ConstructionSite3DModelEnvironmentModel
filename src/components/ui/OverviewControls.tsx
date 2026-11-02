import React from 'react';
import { Camera, Rotate3d, Play, Pause, Compass, RotateCcw } from 'lucide-react';
import { CameraPreset } from '../../types';

interface OverviewControlsProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
}

export const OverviewControls: React.FC<OverviewControlsProps> = ({
  currentPreset,
  onSelectPreset,
  isAutoRotating,
  onToggleAutoRotate,
  onResetCamera,
}) => {
  const viewpoints: { id: CameraPreset; label: string }[] = [
    { id: 'front', label: 'Front' },
    { id: 'rear', label: 'Rear' },
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'top', label: 'Top' },
    { id: 'bottom', label: 'Bottom' },
    { id: 'iso', label: 'Isometric' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0c1424]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-3.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            360° Interactive Product Viewport
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-Rotation Toggle */}
          <button
            onClick={onToggleAutoRotate}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              isAutoRotating
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{isAutoRotating ? 'Pause Turntable' : 'Turntable'}</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={onResetCamera}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Camera View Presets */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-mono shrink-0 mr-1">
          CAMERA:
        </span>
        {viewpoints.map((vp) => {
          const isActive = currentPreset === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() => onSelectPreset(vp.id)}
              className={`flex-1 min-w-[70px] py-1 px-2 rounded-md text-xs font-mono transition-all text-center ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {vp.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

