import React from 'react';
import {
  X,
  Cpu,
  Zap,
  Activity,
  ShieldAlert,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize,
  Minimize,
} from 'lucide-react';
import { StationComponent } from '../../types';

interface ComponentInfoDrawerProps {
  component: StationComponent | null;
  onClose: () => void;
  onSelectComponent: (id: string) => void;
  onOpenMicroSim?: (type: 'pm' | 'gas' | 'wind' | 'temp') => void;
  isIsolated?: boolean;
  onToggleIsolate?: () => void;
  showIsolateButton?: boolean;
}

export const ComponentInfoDrawer: React.FC<ComponentInfoDrawerProps> = ({
  component,
  onClose,
  onSelectComponent,
  onOpenMicroSim,
  isIsolated,
  onToggleIsolate,
  showIsolateButton = true,
}) => {
  if (!component) return null;

  return (
    <aside className="fixed right-4 top-16 bottom-6 w-96 max-w-[calc(100vw-2rem)] z-30 bg-[#0c1222]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${component.colorAccent}20`,
                color: component.colorAccent,
                border: `1px solid ${component.colorAccent}50`,
              }}
            >
              {component.category}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {component.modelNumber}
            </span>
          </div>
          <h2 className="text-base font-bold text-white leading-tight">
            {component.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{component.subname}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Bar (Isolate in Studio & Micro-Simulation) */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between gap-2">
        {showIsolateButton && onToggleIsolate && (
          <button
            onClick={onToggleIsolate}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              isIsolated
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isIsolated ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span>Restore Assembly</span>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5" />
                <span>Isolate Component</span>
              </>
            )}
          </button>
        )}

        {component.hasMicroSimulation && component.microSimType && onOpenMicroSim && (
          <button
            onClick={() => onOpenMicroSim(component.microSimType!)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 transition-all shadow-sm shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>3D Working Sim</span>
          </button>
        )}
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300">
        {/* Short Summary */}
        <p className="text-slate-300 leading-relaxed font-normal">
          {component.fullDesc}
        </p>

        {/* Working Principle */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400 font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Scientific Working Principle</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            {component.workingPrinciple}
          </p>
        </div>

        {/* Construction Site Importance & Hazards */}
        <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-900/40">
          <div className="flex items-center gap-2 mb-1.5 text-orange-400 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Construction Site Impact & Safety</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            {component.constructionImportance}
          </p>
        </div>

        {/* Measured Parameters Table (If any) */}
        {component.measuredParameters.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Measurement Specifications</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              {component.measuredParameters.map((param, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1"
                >
                  <div className="flex justify-between items-center text-slate-200 font-medium">
                    <span>{param.parameter}</span>
                    <span className="text-cyan-400 font-semibold">{param.range}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Resolution: {param.resolution}</span>
                    <span>Acc: {param.accuracy}</span>
                  </div>
                  {param.standardLimit && (
                    <div className="text-[10px] text-amber-400/90 pt-0.5 border-t border-slate-800/50">
                      Standard: {param.standardLimit}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Electrical & Hardware Specs */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Electrical & Protocol Interface</span>
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Protocol</span>
              <span className="text-white font-medium">{component.electricalInterface.protocol}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Voltage</span>
              <span className="text-white font-medium">{component.electricalInterface.operatingVoltage}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Power Draw</span>
              <span className="text-white font-medium">{component.electricalInterface.powerConsumption}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Ingress</span>
              <span className="text-emerald-400 font-medium">{component.physicalSpecs.ipRating || 'Internal'}</span>
            </div>
          </div>
        </div>

        {/* Physical Specs */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-slate-200 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Physical Dimensions & Materials</span>
          </div>
          <div className="text-[11px] space-y-1 font-mono text-slate-400 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div><strong className="text-slate-300">Dimensions:</strong> {component.physicalSpecs.dimensions}</div>
            <div><strong className="text-slate-300">Weight:</strong> {component.physicalSpecs.weight}</div>
            <div><strong className="text-slate-300">Materials:</strong> {component.physicalSpecs.materials}</div>
          </div>
        </div>

        {/* Connected Subsystems */}
        {component.connections.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Interconnected Subsystems</span>
            </div>
            <div className="space-y-1">
              {component.connections.map((conn, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectComponent(conn.targetId)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        conn.type === 'power'
                          ? 'bg-red-400'
                          : conn.type === 'data'
                          ? 'bg-cyan-400'
                          : conn.type === 'gas'
                          ? 'bg-amber-400'
                          : 'bg-slate-400'
                      }`}
                    />
                    <span className="text-[11px] text-slate-300 group-hover:text-white">
                      {conn.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

