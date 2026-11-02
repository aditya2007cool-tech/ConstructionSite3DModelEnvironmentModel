import React from 'react';
import { Layers, RotateCcw } from 'lucide-react';
import { STATION_COMPONENTS } from '../../data/stationComponents';

interface ExplodedControlsProps {
  progress: number; // 0 to 1
  onChangeProgress: (val: number) => void;
  onReset: () => void;
  onSelectComponent: (id: string) => void;
  selectedComponentId: string | null;
}

export const ExplodedControls: React.FC<ExplodedControlsProps> = ({
  progress,
  onChangeProgress,
  onReset,
  onSelectComponent,
  selectedComponentId,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0d1424]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-4 shadow-2xl">
      {/* Title & Quick Presets */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Exploded Assembly Separation
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-800">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onChangeProgress(0)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              progress === 0
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Assembled (0%)
          </button>
          <button
            onClick={() => onChangeProgress(0.5)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              Math.abs(progress - 0.5) < 0.05
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Half (50%)
          </button>
          <button
            onClick={() => onChangeProgress(1.0)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              progress === 1.0
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Full (100%)
          </button>
          <button
            onClick={onReset}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Restore Assembly"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Smooth Explosion Slider */}
      <div className="flex items-center gap-4 mb-3">
        <span className="text-[11px] font-mono text-slate-400">0%</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={(e) => onChangeProgress(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <span className="text-[11px] font-mono text-slate-400">100%</span>
      </div>

      {/* Assembly Part Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-mono shrink-0 mr-1">
          FOCUS PART:
        </span>
        {STATION_COMPONENTS.slice(0, 10).map((comp) => {
          const isSelected = selectedComponentId === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800/70 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {comp.badge}
            </button>
          );
        })}
      </div>
    </div>
  );
};

