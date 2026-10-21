import React from 'react';
import { LIMITATIONS } from '../data/projectData';
import { AlertCircle, ArrowUpRight, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const LimitationsFuture: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
            Section 7
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            7. System Limitations &amp; Future Engineering Scope
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            An honest, rigorous academic assessment of the prototype's operational constraints as articulated in Section 7 of the implementation guide.
          </p>
        </div>

        {/* The 3 Core Limitations from PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {LIMITATIONS.map((lim, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Limitation 0{idx + 1}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {lim.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lim.description}
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-slate-800 block">
                  Proposed Engineering Mitigation:
                </span>
                <span className="text-slate-600 leading-relaxed block">
                  {lim.mitigation}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Future Scope: Version 2 Roadmap */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-700" />
            <h3 className="text-base font-bold text-slate-900">
              Future Iteration Concepts (Phase 2 Design)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-2xl">
            Building upon the baseline Arduino + Python architecture to turn diagnostic telemetry into an autonomous water conservation appliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-700" />
                <span>12V Solenoid Auto-Cutoff</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Integrate an electro-mechanical brass solenoid valve. When high flow persists for &gt; 2 minutes, Arduino sends a HIGH signal via a MOSFET relay to shut off main water feed automatically.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-700" />
                <span>ESP32 Wi-Fi &amp; MQTT Telemetry</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Replace USB serial tethering with an ESP32 microcontroller broadcasting MQTT messages over Wi-Fi directly to a home dashboard or cloud database.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                <span>Acoustic Vibration Validation</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Add an acoustic piezo sensor to the pipe elbow to verify whether high pulse frequency corresponds to laminar pipe flow or micro-vibrations from pump pressure ripples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
