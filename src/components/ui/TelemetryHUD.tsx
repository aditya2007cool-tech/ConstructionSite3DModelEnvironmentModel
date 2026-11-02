import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, ChevronUp, Sun, Wind, Battery, Radio } from 'lucide-react';

export const TelemetryHUD: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Live fluctuating simulated telemetry values
  const [telemetry, setTelemetry] = useState({
    pm25: 28.4,
    pm10: 64.1,
    no2: 34.6,
    co: 1.8,
    temp: 24.6,
    rh: 52.4,
    windSpd: 3.8,
    windDir: 235,
    solarWatts: 36.2,
    batteryVolts: 13.3,
    batterySoc: 92,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        pm25: Math.max(12, +(prev.pm25 + (Math.random() - 0.48) * 1.2).toFixed(1)),
        pm10: Math.max(30, +(prev.pm10 + (Math.random() - 0.48) * 2.5).toFixed(1)),
        no2: Math.max(15, +(prev.no2 + (Math.random() - 0.48) * 1.5).toFixed(1)),
        co: Math.max(0.5, +(prev.co + (Math.random() - 0.5) * 0.1).toFixed(1)),
        temp: +(24.5 + Math.sin(Date.now() / 10000) * 0.3).toFixed(1),
        rh: +(52.0 + Math.cos(Date.now() / 8000) * 0.8).toFixed(1),
        windSpd: Math.max(0.5, +(prev.windSpd + (Math.random() - 0.5) * 0.3).toFixed(1)),
        windDir: (prev.windDir + Math.floor((Math.random() - 0.5) * 4) + 360) % 360,
        solarWatts: Math.max(20, +(prev.solarWatts + (Math.random() - 0.5) * 0.5).toFixed(1)),
        batteryVolts: +(13.25 + Math.sin(Date.now() / 15000) * 0.05).toFixed(2),
        batterySoc: 92,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-4 z-20 transition-all">
      <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-3 shadow-2xl max-w-xs text-xs">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold font-mono text-[11px] text-white tracking-wider">
              LIVE TELEMETRY STREAM
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-2 pt-1 font-mono text-[11px]">
            {/* PM Values */}
            <div className="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block">PM2.5 Silica Dust</span>
                <span className="text-amber-400 font-bold">{telemetry.pm25} µg/m³</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">PM10 Coarse Dust</span>
                <span className="text-orange-400 font-bold">{telemetry.pm10} µg/m³</span>
              </div>
            </div>

            {/* Gas Readings */}
            <div className="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block">NO₂ Diesel Fumes</span>
                <span className="text-amber-300 font-bold">{telemetry.no2} ppb</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">CO Combustion</span>
                <span className="text-cyan-300 font-bold">{telemetry.co} ppm</span>
              </div>
            </div>

            {/* Weather & Power */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 pt-1 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{telemetry.windSpd} m/s ({telemetry.windDir}°)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{telemetry.solarWatts} W Infeed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{telemetry.batteryVolts}V ({telemetry.batterySoc}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-emerald-400">4G LTE-M 100%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
