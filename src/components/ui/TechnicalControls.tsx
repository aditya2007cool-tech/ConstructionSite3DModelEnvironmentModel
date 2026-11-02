import React from 'react';
import { Compass, Eye, Grid, Ruler, Tag, Box } from 'lucide-react';
import { CameraPreset } from '../../types';

interface TechnicalControlsProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  showDimensions: boolean;
  onToggleDimensions: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  isOrthographic: boolean;
  onToggleOrthographic: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

export const TechnicalControls: React.FC<TechnicalControlsProps> = ({
  currentPreset,
  onSelectPreset,
  showDimensions,
  onToggleDimensions,
  showLabels,
  onToggleLabels,
  isOrthographic,
  onToggleOrthographic,
  showGrid,
  onToggleGrid,
}) => {
  const viewpoints: { id: CameraPreset; label: string; shortcut: string }[] = [
    { id: 'front', label: 'Front Elev.', shortcut: 'F' },
    { id: 'rear', label: 'Rear Elev.', shortcut: 'R' },
    { id: 'left', label: 'Left Side', shortcut: 'L' },
    { id: 'right', label: 'Right Side', shortcut: 'K' },
    { id: 'top', label: 'Top Plan', shortcut: 'T' },
    { id: 'bottom', label: 'Bottom', shortcut: 'B' },
    { id: 'iso', label: 'Isometric', shortcut: 'I' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-3xl bg-[#0c1424]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-4 shadow-2xl">
      {/* Title & Projection Toggle */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Orthographic Engineering Blueprint
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-800/60">
            {isOrthographic ? 'ORTHOGRAPHIC 1:1' : 'PERSPECTIVE'}
          </span>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          {/* Orthographic Projection Toggle */}
          <button
            onClick={onToggleOrthographic}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
              isOrthographic
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{isOrthographic ? 'Ortho' : 'Persp'}</span>
          </button>

          {/* Dimension Lines Toggle */}
          <button
            onClick={onToggleDimensions}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
              showDimensions
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Dimensions</span>
          </button>

          {/* Balloon Callout Labels Toggle */}
          <button
            onClick={onToggleLabels}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
              showLabels
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>ID Balloons</span>
          </button>

          {/* Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
              showGrid
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Engineering Viewpoint Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-400 font-mono shrink-0 mr-1">
          CAD VIEWPORTS:
        </span>
        {viewpoints.map((vp) => {
          const isActive = currentPreset === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() => onSelectPreset(vp.id)}
              className={`flex-1 min-w-[90px] py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all text-center ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
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

