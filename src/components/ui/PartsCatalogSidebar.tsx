import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ComponentCategory, StationComponent } from '../../types';
import { STATION_COMPONENTS } from '../../data/stationComponents';

interface PartsCatalogSidebarProps {
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  isIsolated: boolean;
  onToggleIsolate: () => void;
}

export const PartsCatalogSidebar: React.FC<PartsCatalogSidebarProps> = ({
  selectedComponentId,
  onSelectComponent,
  isIsolated,
  onToggleIsolate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Parts' },
    { id: 'sensing', label: 'Sensors' },
    { id: 'computing', label: 'Computing' },
    { id: 'power', label: 'Power & Solar' },
    { id: 'mechanical', label: 'Mechanical' },
    { id: 'environmental', label: 'Weather' },
  ];

  const filteredComponents = STATION_COMPONENTS.filter((comp) => {
    const matchesCategory =
      activeCategory === 'all' || comp.category === activeCategory;
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed left-4 top-16 bottom-6 w-80 max-w-[calc(100vw-2rem)] z-20 bg-[#0c1220]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-200">
      {/* Header & Search */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Engineering Parts Catalogue
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
            {filteredComponents.length} COMPONENTS
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search parts, tags, sensors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Isolation Action Banner */}
      <div className="px-3 py-2 bg-slate-950/50 border-b border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          Mode: <strong className="text-cyan-400">{isIsolated ? 'Isolated Pedestal' : 'In Full Assembly'}</strong>
        </span>
        <button
          onClick={onToggleIsolate}
          className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
            isIsolated
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {isIsolated ? (
            <>
              <Minimize2 className="w-3 h-3" />
              <span>Restore Assembly</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3" />
              <span>Isolate Selected</span>
            </>
          )}
        </button>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredComponents.map((comp) => {
          const isSelected = selectedComponentId === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2 group ${
                isSelected
                  ? 'bg-cyan-500/15 border border-cyan-500/60 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: comp.colorAccent }}
                />
                <div className="min-w-0">
                  <div
                    className={`text-xs font-semibold truncate ${
                      isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {comp.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    {comp.modelNumber} • {comp.category}
                  </div>
                </div>
              </div>

              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-500'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

