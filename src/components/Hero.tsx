import React from 'react';
import { Activity, Gauge, Cpu, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

interface HeroProps {
  onOpenPdf: () => void;
  onLaunchSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPdf, onLaunchSimulator }) => {
  return (
    <section className="relative pt-10 pb-14 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Sub-Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-4">
          <span className="text-cyan-700 font-semibold">{PROJECT_METADATA.assignment}</span>
          <span aria-hidden="true">·</span>
          <span>{PROJECT_METADATA.courseName} ({PROJECT_METADATA.courseCode})</span>
          <span aria-hidden="true">·</span>
          <span>NSSKC Technical Field Study Integration</span>
        </div>

        {/* Main Title & Tagline */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4" style={{ textWrap: 'balance' }}>
            {PROJECT_METADATA.title}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-800 font-medium italic mb-4">
            "{PROJECT_METADATA.tagline}"
          </p>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            A practical environmental engineering system combining an inline Hall-effect water flow sensor, Arduino Uno microcontroller, and a Python telemetry script to instantly detect high-volume faucet neglect, leaking valves, and pipe failures.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3.5 mb-12">
          <button
            onClick={onLaunchSimulator}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Launch Flow Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPdf}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Open Original Report (PDF)</span>
          </button>

          <a
            href="#overview"
            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Read Methodology
          </a>
        </div>

        {/* Full-width 4-Column KPI / Specification Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Activity className="w-3.5 h-3.5 text-cyan-600" />
              <span>Sensor Hardware</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              YF-S201
            </div>
            <div className="text-xs text-slate-500">
              Hall Effect (1–30 L/min)
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Microcontroller</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              Arduino Uno
            </div>
            <div className="text-xs text-slate-500">
              Pin 2 Interrupt · 9600 Baud
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>Warning Threshold</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              &gt; 6 to 10 L/min
            </div>
            <div className="text-xs text-slate-500">
              Normal max: 6.0 L/min
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sustainability Goals</span>
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              SDG 6 &amp; 11
            </div>
            <div className="text-xs text-slate-500">
              Clean Water &amp; Smart Cities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
