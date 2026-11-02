import React from 'react';
import { X, Cpu, Zap, Activity, Radio, GitBranch } from 'lucide-react';

interface SchematicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (id: string) => void;
}

export const SchematicModal: React.FC<SchematicModalProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1220] border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                System Electronics & Topology Block Diagram
              </h2>
              <p className="text-[11px] text-slate-400">
                Functional interconnect schematic of power domains, digital communication buses, and sensor AFEs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Schematic Diagram Body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs">
          {/* Main Block Diagram Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Power Harvester & Storage Bay */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-amber-500/30 pb-2">
                <Zap className="w-4 h-4" />
                <span>POWER SUBSYSTEM</span>
              </div>

              {/* Solar Panel Box */}
              <div
                onClick={() => {
                  onSelectComponent('solar_panel');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="text-amber-300 font-bold text-xs mb-1">40W Solar PV Module</div>
                <div className="text-[10px] text-slate-400">Voc: 22.4V • Imp: 2.35A • Monocrystalline</div>
                <div className="mt-2 text-[10px] bg-amber-950/60 text-amber-400 px-2 py-0.5 rounded inline-block">
                  DC 18V-24V Infeed ↓
                </div>
              </div>

              {/* MPPT Controller */}
              <div
                onClick={() => {
                  onSelectComponent('power_system');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="text-emerald-300 font-bold text-xs mb-1">Synchronous MPPT Controller</div>
                <div className="text-[10px] text-slate-400">98.2% Efficiency • Step-down Buck • Modbus</div>
                <div className="mt-2 text-[10px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded inline-block">
                  Charging Bus (14.4V Max) ⇄
                </div>
              </div>

              {/* LiFePO4 Battery */}
              <div
                onClick={() => {
                  onSelectComponent('power_system');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/40 hover:border-blue-400 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="text-blue-300 font-bold text-xs mb-1">12.8V 20Ah LiFePO4 Pack</div>
                <div className="text-[10px] text-slate-400">256 Wh Energy • 3000 Cycles • Hardware BMS</div>
                <div className="mt-2 text-[10px] bg-blue-950/60 text-blue-400 px-2 py-0.5 rounded inline-block">
                  Main 12V DC Rail Out →
                </div>
              </div>
            </div>

            {/* Column 2: Central Motherboard & Computing Brain */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-cyan-500/30 pb-2">
                <Cpu className="w-4 h-4" />
                <span>CENTRAL PROCESSOR & AFE</span>
              </div>

              {/* Central Controller Box */}
              <div
                onClick={() => {
                  onSelectComponent('control_pcb');
                  onClose();
                }}
                className="p-4 rounded-xl bg-slate-900/95 border-2 border-cyan-500/80 hover:border-cyan-400 cursor-pointer shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-300 font-bold text-sm">Industrial Motherboard</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400">240 MHz Dual-Core</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 mb-3">
                  <div>• Dual-Core 32-bit ARM / ESP32-S3</div>
                  <div>• Multichannel 24-Bit Sigma-Delta ADC</div>
                  <div>• Conformal-Coated 4-Layer FR4</div>
                  <div>• Hardware Watchdog & RTC Strobe</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    <strong className="text-cyan-400 block">I2C Fast-Mode</strong>
                    SHT45, BMP390, Angle
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    <strong className="text-cyan-400 block">UART Buses</strong>
                    PM Laser, GNSS, LTE
                  </div>
                </div>
              </div>

              {/* Telemetry Gateways */}
              <div className="grid grid-cols-2 gap-3">
                {/* GPS Module */}
                <div
                  onClick={() => {
                    onSelectComponent('gps_module');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 border border-teal-500/40 hover:border-teal-400 cursor-pointer transition-all"
                >
                  <div className="text-teal-300 font-bold text-xs">Multi-GNSS Engine</div>
                  <div className="text-[10px] text-slate-400 mt-1">UART NMEA • 1PPS Sync</div>
                </div>

                {/* Cellular Modem */}
                <div
                  onClick={() => {
                    onSelectComponent('cellular_modem');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all"
                >
                  <div className="text-purple-300 font-bold text-xs">4G LTE-M / NB-IoT</div>
                  <div className="text-[10px] text-slate-400 mt-1">MQTT TLS 1.3 • SMA Antenna</div>
                </div>
              </div>
            </div>

            {/* Column 3: Analytical Sensor Front-Ends */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold border-b border-rose-500/30 pb-2">
                <Activity className="w-4 h-4" />
                <span>ENVIRONMENTAL & GAS SENSORS</span>
              </div>

              {/* PM Sensor */}
              <div
                onClick={() => {
                  onSelectComponent('pm_sensor');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/40 hover:border-rose-400 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="text-rose-300 font-bold text-xs mb-1">Laser OPC Nephelometer</div>
                <div className="text-[10px] text-slate-400">PM1.0, PM2.5, PM10 • 16 Size Bins • UART</div>
              </div>

              {/* Electrochemical Gas Cluster */}
              <div
                onClick={() => {
                  onSelectComponent('gas_no2');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="text-amber-300 font-bold text-xs mb-1">4-Electrode Gas Manifold</div>
                <div className="text-[10px] text-slate-400">NO₂, CO, SO₂, O₃ • 24-Bit Nanoamp AFE</div>
              </div>

              {/* Met Sensors */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => {
                    onSelectComponent('wind_anemometer');
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-sky-500/40 hover:border-sky-400 cursor-pointer"
                >
                  <div className="text-sky-300 font-bold text-[11px]">3-Cup Anemometer</div>
                  <div className="text-[9px] text-slate-400">Pulse Counter</div>
                </div>
                <div
                  onClick={() => {
                    onSelectComponent('wind_vane');
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer"
                >
                  <div className="text-cyan-300 font-bold text-[11px]">Aerodynamic Vane</div>
                  <div className="text-[9px] text-slate-400">12-Bit Magnetic</div>
                </div>
              </div>

              <div
                onClick={() => {
                  onSelectComponent('env_temp_rh');
                  onClose();
                }}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-teal-500/40 hover:border-teal-400 cursor-pointer"
              >
                <div className="text-teal-300 font-bold text-xs">SHT45 Temp & RH Probe</div>
                <div className="text-[10px] text-slate-400">I2C Fast Mode • Solar Radiation Screen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400">
          <span>Click any block to jump directly to its 3D physical component in the viewport</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Back to 3D View
          </button>
        </div>
      </div>
    </div>
  );
};

