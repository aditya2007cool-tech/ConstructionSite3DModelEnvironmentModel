import React from 'react';
import { Sparkles, Eye, Shield, Sliders, Layers } from 'lucide-react';
import { STATION_COMPONENTS } from '../../data/stationComponents';

interface XRayControlsProps {
  opacity: number;
  onChangeOpacity: (val: number) => void;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
}

export const XRayControls: React.FC<XRayControlsProps> = ({
  opacity,
  onChangeOpacity,
  selectedComponentId,
  onSelectComponent,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0d1424]/95 backdrop-blur-xl border border-sky-500/40 rounded-2xl p-4 shadow-2xl shadow-sky-500/10">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Holographic X-Ray Internal View
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 font-mono text-[11px] font-bold border border-sky-800/60">
            Enclosure Opacity: {Math.round(opacity * 100)}%
          </span>
        </div>

        {/* Quick Opacity Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onChangeOpacity(0.08)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
              opacity <= 0.1
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Ghost (8%)
          </button>
          <button
            onClick={() => onChangeOpacity(0.22)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
              opacity > 0.1 && opacity < 0.35
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Holo-Glass (22%)
          </button>
          <button
            onClick={() => onChangeOpacity(0.45)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
              opacity >= 0.35
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            CT Semi-Solid (45%)
          </button>
        </div>
      </div>

      {/* Opacity Slider */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-mono text-slate-400">Transparent</span>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.01"
          value={opacity}
          onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
        <span className="text-[11px] font-mono text-slate-400">Frosted</span>
      </div>

      {/* Internal Component Targets */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-mono shrink-0 mr-1 flex items-center gap-1">
          <Layers className="w-3 h-3 text-sky-400" />
          INTERNAL TARGETS:
        </span>
        {[
          'pm_sensor',
          'gas_no2',
          'control_pcb',
          'power_system',
          'gps_module',
          'cellular_modem',
          'baro_pressure',
        ].map((id) => {
          const comp = STATION_COMPONENTS.find((c) => c.id === id);
          if (!comp) return null;
          const isSelected = selectedComponentId === id;
          return (
            <button
              key={id}
              onClick={() => onSelectComponent(id)}
              className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                isSelected
                  ? 'bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-400/40 ring-1 ring-white'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
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
