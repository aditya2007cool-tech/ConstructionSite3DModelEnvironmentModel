import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MapPin,
  Activity,
  ShieldCheck,
  BookOpen,
  Info,
} from 'lucide-react';
import { TourStep } from '../../types';

interface GuidedTourOverlayProps {
  currentStep: TourStep;
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  onSelectStepIndex: (index: number) => void;
  onOpenMicroSim?: (type: 'pm' | 'gas' | 'wind' | 'temp') => void;
}

export const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onRestart,
  onSelectStepIndex,
  onOpenMicroSim,
}) => {
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl bg-[#0b1220]/95 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl p-5 overflow-hidden animate-in fade-in duration-300">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-800/60">
            STEP {currentStep.stepNumber} / {totalSteps}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {currentStep.focalPointName}
          </span>
        </div>

        {/* Play / Pause / Restart / Step Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onRestart}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Restart Tour from Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Auto-Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Tour</span>
              </>
            )}
          </button>
          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
            title="Previous Component"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
            title="Next Component"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Clickable Step Dots */}
      <div className="mb-4">
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center gap-1 px-0.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectStepIndex(idx)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-cyan-400 shadow-sm shadow-cyan-400'
                  : idx < currentStepIndex
                  ? 'bg-cyan-700/60'
                  : 'bg-slate-800'
              }`}
              title={`Jump to Step ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Step Title & Subtitle */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            {currentStep.title}
          </h2>
          <p className="text-xs text-cyan-400/90 font-mono mt-0.5">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Micro-Simulation Button (if available) */}
        {currentStep.microSimType && onOpenMicroSim && (
          <button
            onClick={() => onOpenMicroSim(currentStep.microSimType!)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch 3D Physics Sim</span>
          </button>
        )}
      </div>

      {/* Structured Technical Explanation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Left Column: What It Does & How It Works */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Function & Location</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentStep.narrative}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-sky-400 font-semibold mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Working Principle</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentStep.howItWorks}
            </p>
          </div>
        </div>

        {/* Right Column: Construction Significance & Regulatory Standard */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-orange-950/20 border border-orange-900/40">
            <div className="flex items-center gap-1.5 text-orange-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Construction Site Relevance</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentStep.constructionSignificance}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Regulatory Standard & Limits</span>
            </div>
            <p className="text-[11px] font-mono text-emerald-300/90 leading-relaxed">
              {currentStep.regulatoryStandard}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

