import React from 'react';
import {
  Layers,
  Sparkles,
  Scissors,
  Compass,
  Wind,
  Search,
  Cpu,
  Footprints,
  Sun,
  Maximize2,
  RotateCcw,
  Camera,
  Boxes,
} from 'lucide-react';
import { VisualizationSection, LightingPreset } from '../../types';

interface NavbarProps {
  currentSection: VisualizationSection;
  onSelectSection: (section: VisualizationSection) => void;
  lightingPreset: LightingPreset;
  onChangeLighting: (preset: LightingPreset) => void;
  onResetCamera: () => void;
  onTakeScreenshot: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  lightingPreset,
  onChangeLighting,
  onResetCamera,
  onTakeScreenshot,
  onToggleFullscreen,
  isFullscreen,
}) => {
  const sections: { id: VisualizationSection; label: string; icon: React.ReactNode; shortcut: string }[] = [
    { id: 'overview', label: 'Device Overview', icon: <Boxes className="w-4 h-4" />, shortcut: '1' },
    { id: 'exploded', label: 'Exploded View', icon: <Layers className="w-4 h-4" />, shortcut: '2' },
    { id: 'xray', label: 'X-Ray View', icon: <Sparkles className="w-4 h-4" />, shortcut: '3' },
    { id: 'cross-section', label: 'Cross-Section', icon: <Scissors className="w-4 h-4" />, shortcut: '4' },
    { id: 'technical', label: 'Technical CAD', icon: <Compass className="w-4 h-4" />, shortcut: '5' },
    { id: 'airflow', label: 'Airflow Path', icon: <Wind className="w-4 h-4" />, shortcut: '6' },
    { id: 'inspection', label: 'Parts Catalog', icon: <Search className="w-4 h-4" />, shortcut: '7' },
    { id: 'electronics', label: 'Electronics Bus', icon: <Cpu className="w-4 h-4" />, shortcut: '8' },
    { id: 'tour', label: 'Guided Tour', icon: <Footprints className="w-4 h-4" />, shortcut: '9' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Station Model Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-cyan-400 to-sky-200 bg-clip-text text-transparent">
                AeroSentinel-3D
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                INDUSTRIAL IoT
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Outdoor Construction Air Quality Monitoring Station
            </div>
          </div>
        </div>

        {/* 9 Dedicated Engineering Section Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {sections.map((sec) => {
            const isActive = currentSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
                title={`Press [${sec.shortcut}] to switch to ${sec.label}`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{sec.icon}</span>
                <span>{sec.label}</span>
                <span className="hidden xl:inline text-[10px] font-mono text-slate-500 bg-slate-900/60 px-1 rounded">
                  {sec.shortcut}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Global View Controls (Lighting, Screenshot, Fullscreen, Reset) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Lighting Selector */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onChangeLighting('studio')}
              className={`p-1.5 rounded ${lightingPreset === 'studio' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}
              title="Studio Neutral Lighting"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeLighting('sunset')}
              className={`p-1.5 rounded ${lightingPreset === 'sunset' ? 'bg-orange-500/20 text-orange-400' : 'text-slate-400 hover:text-slate-200'}`}
              title="Construction Sunset Lighting"
            >
              <span className="text-[11px] font-bold">🌅</span>
            </button>
            <button
              onClick={() => onChangeLighting('cad-white')}
              className={`p-1.5 rounded ${lightingPreset === 'cad-white' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Clean CAD White"
            >
              <span className="text-[11px] font-mono font-bold">CAD</span>
            </button>
            <button
              onClick={() => onChangeLighting('cyberpunk')}
              className={`p-1.5 rounded ${lightingPreset === 'cyberpunk' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
              title="Cyberpunk Blue/Magenta"
            >
              <span className="text-[11px] font-bold">⚡</span>
            </button>
          </div>

          {/* Reset Camera */}
          <button
            onClick={onResetCamera}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Reset Camera View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Screenshot Capture */}
          <button
            onClick={onTakeScreenshot}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Export 3D Engineering Snapshot"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

