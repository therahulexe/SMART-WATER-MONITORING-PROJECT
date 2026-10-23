import React from 'react';
import { Activity, Gauge, Cpu, ShieldCheck, ArrowRight, FileText, CheckCircle2, Zap, Radio } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import hardwareTestbedImg from '../assets/images/water_hardware_testbed_1792774566964.jpg';

interface HeroProps {
  onOpenPdf: () => void;
  onLaunchSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPdf, onLaunchSimulator }) => {
  return (
    <section className="relative pt-8 pb-14 bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Sub-Kicker with Prominently Zoomed NMIT Crest Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5 bg-white border border-slate-200/90 rounded-2xl p-2.5 pr-5 shadow-xs w-fit group">
            <img
              src="/nmit-logo.jpeg"
              alt="NMIT Logo"
              className="h-12 sm:h-14 w-auto object-contain rounded-xl bg-white border border-slate-100 p-1 shadow-2xs transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Nitte Meenakshi Institute of Technology
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {PROJECT_METADATA.courseName} · {PROJECT_METADATA.assignment}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs w-fit">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>NSSKC Field Study Telemetry Integration</span>
          </div>
        </div>

        {/* 2-Column Split: Hero Narrative (Left) & Real Lab Testbed Visual (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-3">
              <Radio className="w-3.5 h-3.5 text-sky-600" />
              <span>Real-Time Environmental Engineering Benchmark</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4" style={{ textWrap: 'balance' }}>
              {PROJECT_METADATA.title}
            </h1>

            <p className="text-base sm:text-lg text-sky-900/90 font-medium italic mb-4">
              "{PROJECT_METADATA.tagline}"
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-xl">
              An accessible, low-cost water conservation telemetry bench combining an inline Hall-effect rotor, Arduino Uno interrupt logic, and Python serial monitoring to prevent high-volume faucet neglect, valve leaks, and burst plumbing before runaway municipal water wastage occurs.
            </p>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onLaunchSimulator}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Launch Flow Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPdf}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Open Original Report (PDF)</span>
              </button>

              <a
                href="#architecture"
                className="px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                System Architecture
              </a>
            </div>
          </div>

          {/* Right Visual Column: Live Hardware Testbed Bench Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl group">
              {/* Hardware Testbed Photograph */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                <img
                  src={hardwareTestbedImg}
                  alt="NMIT Smart Water Hardware Testbed Bench with YF-S201 Sensor and Arduino"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Live Telemetry Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-md px-2.5 py-1 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-led" />
                  <span>HARDWARE TESTBED · COM3</span>
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-md px-2 py-1 text-[10px] font-mono text-slate-300">
                  9600 BAUD
                </div>
              </div>

              {/* Hardware Telemetry Strip on Bottom of Card */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 text-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="font-semibold text-white">YF-S201 Inline Flow Turbine</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">4.8 L/min</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500">Signal Pin</span>
                    <span className="text-slate-200">Pin 2 (INT0)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500">Frequency</span>
                    <span className="text-slate-200">36.0 Hz</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500">Status</span>
                    <span className="text-emerald-400 font-semibold">Nominal Flow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI / Specification Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>Sensor Hardware</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              YF-S201
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Hall Effect · 1–30 L/min
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Microcontroller</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              Arduino Uno
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Pin 2 Interrupt · 9600 Baud
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>Warning Threshold</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              &gt; 6 to 10 L/min
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Nominal max: 6.0 L/min
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sustainability Goals</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              SDG 6 &amp; 11
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Clean Water &amp; Sustainable Cities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
