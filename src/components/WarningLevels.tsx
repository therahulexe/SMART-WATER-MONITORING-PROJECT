import React from 'react';
import { WARNING_LEVELS } from '../data/projectData';
import { AlertCircle, Sliders, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export const WarningLevels: React.FC = () => {
  return (
    <section id="warning-levels" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
            Section 5
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            5. Example Warning Levels &amp; Thresholds
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            Establishing the empirical baseline for categorizing fluid movement into nominal usage, elevated warnings, and critical flow alerts.
          </p>
        </div>

        {/* Report Excerpt Notice */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900">
            <span className="font-bold block mb-0.5">Note from Official Report:</span>
            <em>"These numbers are only sample values for a demonstration. The group should test and adjust them for the sensor and setup before using them."</em>
          </div>
        </div>

        {/* Primary Warning Levels Table (Matching PDF exactly) */}
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-2xs mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-800">
              <tr>
                <th className="py-3.5 px-6">Flow reading</th>
                <th className="py-3.5 px-6">Display</th>
                <th className="py-3.5 px-6">Operating Context &amp; Significance</th>
                <th className="py-3.5 px-6">Action Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {WARNING_LEVELS.map((level, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap text-base">
                    {level.flowRange}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {level.status === 'normal' && (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-700">Normal</span>
                        </>
                      )}
                      {level.status === 'warning' && (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span className="font-semibold text-amber-800">Warning</span>
                        </>
                      )}
                      {level.status === 'high' && (
                        <>
                          <AlertOctagon className="w-4 h-4 text-rose-600" />
                          <span className="font-semibold text-rose-700">
                            High flow — check if expected
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs sm:text-sm text-slate-600 max-w-sm">
                    {level.description}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-700 max-w-xs font-medium">
                    {level.suggestedAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calibration & Fluid Dynamics Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Sensor Calibration Math</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">The 7.5 Pulse Constant</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The YF-S201 generates approx. 450 pulses per liter of water. Thus, pulse frequency is defined as <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">f (Hz) = 7.5 × Q (L/min)</code>. Empirical testing with a 5-liter volumetric bucket allows the group to fine-tune this multiplier.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Pressure &amp; Pipe Diameter</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">NSSKC Plumbing Correlation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plumbing systems observed during the NSSKC visit use 1/2" and 3/4" pipelines. At standard 2.5 bar water pressure, a fully opened bibcock tap releases 8–12 L/min, validating why &gt;10 L/min indicates extreme flow or unconstrained discharge.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Time-Duration Windowing</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Preventing Spurious Alerts</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              In real deployments, the software applies a sustained timer window (e.g., warning triggers only if flow remains high for &gt; 30 continuous seconds) to distinguish between filling a cooking pot and an abandoned open tap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
