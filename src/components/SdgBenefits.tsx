import React from 'react';
import { BENEFITS } from '../data/projectData';
import { Globe, Droplet, Building2, CheckCircle2, TrendingDown } from 'lucide-react';

export const SdgBenefits: React.FC = () => {
  return (
    <section id="sdg-benefits" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
            Section 6
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            6. Benefits &amp; Sustainable Development Goals
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            Connecting an accessible hardware-software prototyping project to tangible environmental preservation and global sustainability targets.
          </p>
        </div>

        {/* Benefits Grid (From Report Bullet Points) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BENEFITS.slice(0, 3).map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-50 border border-slate-200/90 rounded-xl space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold font-mono text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
              <div className="pt-2 text-xs font-medium text-sky-800 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>{benefit.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* UN Sustainable Development Goals Deep Dive */}
        <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white rounded-2xl shadow-sm border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>UN Agenda 2030 Alignment</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Global Impact: SDG 6 &amp; SDG 11
              </h3>
            </div>
            <p className="text-xs text-slate-300 max-w-md">
              This project guide directly champions awareness of United Nations Sustainable Development Goals by preventing the loss of treated freshwater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SDG 6 Card */}
            <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Droplet className="w-6 h-6 fill-white text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Sustainable Development Goal 6
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Clean Water and Sanitation
                  </h4>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-white">Target 6.4:</strong> Substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater.
                </p>
                <p className="text-slate-400">
                  Municipal water treatment and distribution require enormous amounts of electrical energy and chemical purification. Reducing unnoticed wastage in residential and institutional buildings directly reduces the draw on aquifers and municipal reservoirs.
                </p>
              </div>
            </div>

            {/* SDG 11 Card */}
            <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-300 uppercase">
                    Sustainable Development Goal 11
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Sustainable Cities and Communities
                  </h4>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-white">Target 11.6:</strong> Reduce the adverse per capita environmental impact of cities, including through smart urban resource stewardship.
                </p>
                <p className="text-slate-400">
                  Smart cities depend on distributed telemetry. A system that can be built by students for under $15 democratizes telemetry, enabling small dormitories, community centers, and local schools to prevent catastrophic water damage and resource waste.
                </p>
              </div>
            </div>
          </div>

          {/* Quantitative Conservation Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Standard dripping faucets waste up to 20 liters/day; an unnoticed running tap wastes over 5,000 liters in a weekend.
              </span>
            </div>
            <span className="font-mono text-cyan-300">
              NMIT Environmental Science &amp; Sustainability
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
