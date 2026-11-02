import React from 'react';
import { Scissors, ArrowLeftRight, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { CuttingAxis } from '../../types';

interface CrossSectionControlsProps {
  axis: CuttingAxis;
  onChangeAxis: (axis: CuttingAxis) => void;
  offset: number;
  onChangeOffset: (offset: number) => void;
  isInverted: boolean;
  onToggleInvert: () => void;
  onReset: () => void;
  onApplyPreset: (preset: 'airway' | 'pcb' | 'power') => void;
  showPlaneVisualizer: boolean;
  onTogglePlaneVisualizer: () => void;
}

export const CrossSectionControls: React.FC<CrossSectionControlsProps> = ({
  axis,
  onChangeAxis,
  offset,
  onChangeOffset,
  isInverted,
  onToggleInvert,
  onReset,
  onApplyPreset,
  showPlaneVisualizer,
  onTogglePlaneVisualizer,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0d1424]/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4 shadow-2xl shadow-orange-500/10">
      {/* Title & Presets */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Scissors className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Geometric Cross-Section Cutaway
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-950/80 text-orange-400 font-mono text-[11px] font-bold border border-orange-800/60">
            {axis.toUpperCase()} Cut ({offset > 0 ? `+${offset.toFixed(2)}` : offset.toFixed(2)}m)
          </span>
        </div>

        {/* Feature Presets & Toggle Blade */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onApplyPreset('airway')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
          >
            Airway Cut
          </button>
          <button
            onClick={() => onApplyPreset('pcb')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
          >
            PCB Cut
          </button>
          <button
            onClick={() => onApplyPreset('power')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
          >
            Battery Cut
          </button>
          <button
            onClick={onTogglePlaneVisualizer}
            className={`p-1.5 rounded text-[11px] font-mono transition-colors ${
              showPlaneVisualizer
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}
            title={showPlaneVisualizer ? 'Hide Visual Slicing Blade' : 'Show Visual Slicing Blade'}
          >
            {showPlaneVisualizer ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onReset}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Reset Cut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Axis Selection and Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
        {/* Cutting Axis Selector */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => onChangeAxis('x')}
            className={`flex-1 py-1 px-2 rounded font-mono font-bold transition-colors ${
              axis === 'x'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Sagittal Cut (X-Axis)"
          >
            X (Sagittal)
          </button>
          <button
            onClick={() => onChangeAxis('y')}
            className={`flex-1 py-1 px-2 rounded font-mono font-bold transition-colors ${
              axis === 'y'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Horizontal Cut (Y-Axis)"
          >
            Y (Horizontal)
          </button>
          <button
            onClick={() => onChangeAxis('z')}
            className={`flex-1 py-1 px-2 rounded font-mono font-bold transition-colors ${
              axis === 'z'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Coronal Cut (Z-Axis)"
          >
            Z (Coronal)
          </button>
        </div>

        {/* Plane Position Slider */}
        <div className="sm:col-span-2 flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">-0.5m</span>
          <input
            type="range"
            min="-0.5"
            max="0.5"
            step="0.01"
            value={offset}
            onChange={(e) => onChangeOffset(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <span className="text-[10px] font-mono text-slate-400">+0.5m</span>
        </div>

        {/* Invert Cut Side Button */}
        <button
          onClick={onToggleInvert}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
            isInverted
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Flip Side</span>
        </button>
      </div>

      <div className="mt-2 text-[11px] text-slate-400 font-mono text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span>Real-time Double-Sided Solid Geometry Clipping • Internal Chambers & Flow Passages Exposed</span>
      </div>
    </div>
  );
};
