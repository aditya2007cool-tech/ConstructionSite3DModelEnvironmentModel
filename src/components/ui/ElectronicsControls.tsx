import React from 'react';
import { Cpu, Zap, Activity, GitBranch, Layers } from 'lucide-react';
import { STATION_COMPONENTS } from '../../data/stationComponents';

interface ElectronicsControlsProps {
  showPowerBuses: boolean;
  onTogglePowerBuses: () => void;
  showDataBuses: boolean;
  onToggleDataBuses: () => void;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onOpenSchematic: () => void;
}

export const ElectronicsControls: React.FC<ElectronicsControlsProps> = ({
  showPowerBuses,
  onTogglePowerBuses,
  showDataBuses,
  onToggleDataBuses,
  selectedComponentId,
  onSelectComponent,
  onOpenSchematic,
}) => {
  const electronicComponents = STATION_COMPONENTS.filter(
    (c) => c.category === 'computing' || c.category === 'power' || c.category === 'sensing'
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl bg-[#0c1424]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-4 shadow-2xl">
      {/* Title & Schematic Modal Button */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Internal Electronics & Wiring Topology
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-800/60">
            3D HARNESS ROUTING
          </span>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Power Bus Toggle */}
          <button
            onClick={onTogglePowerBuses}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
              showPowerBuses
                ? 'bg-red-500/20 text-red-300 border border-red-500/50 font-bold'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-red-400" />
            <span>Power Rails</span>
          </button>

          {/* Data Bus Toggle */}
          <button
            onClick={onToggleDataBuses}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
              showDataBuses
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data Buses</span>
          </button>

          {/* 2D Schematic Block Diagram Button */}
          <button
            onClick={onOpenSchematic}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-[11px] font-semibold shadow-md shadow-cyan-500/20 transition-all"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2D Schematic</span>
          </button>
        </div>
      </div>

      {/* Module Quick Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-mono shrink-0 mr-1">
          TRACE NODE:
        </span>
        {electronicComponents.map((comp) => {
          const isSelected = selectedComponentId === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                isSelected
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/30'
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

