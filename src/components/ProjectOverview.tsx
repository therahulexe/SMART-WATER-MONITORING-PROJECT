import React from 'react';
import { Target, HelpCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

export const ProjectOverview: React.FC = () => {
  return (
    <section id="overview" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
            Section 1 &amp; 2
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Project Overview &amp; Research Aim
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            Establishing the context, societal need, and primary objective for an accessible, low-cost water flow alert mechanism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 1. Introduction (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-base">
                <HelpCircle className="w-5 h-5 text-sky-700 shrink-0" />
                <h3>1. Introduction</h3>
              </div>
              
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                <p>
                  Water is important in our daily lives, so we should avoid wasting it. Sometimes water keeps flowing because a tap is left open or a plumbing problem is not noticed quickly. For this implementation guide, we suggest a simple system that measures water flow and gives a warning when the flow seems unusually high.
                </p>
                <p>
                  The <span className="font-semibold text-slate-900">NSSKC visit handout</span> mentions plumbing parts such as taps, pipes, valves and fittings. These can help us think about where water is used and where monitoring might be useful. Our group should add any specific lab observation only if we actually noticed it during the visit.
                </p>
              </div>

              {/* Contextual NSSKC Field Takeaways */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  NSSKC Plumbing Field Study Points
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block">Taps &amp; Bibcocks</span>
                    <span className="text-slate-500 text-[11px]">Primary point of domestic user neglect</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block">Conduit Pipes</span>
                    <span className="text-slate-500 text-[11px]">Concealed walls &amp; riser joints</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block">Isolation Valves</span>
                    <span className="text-slate-500 text-[11px]">Gate &amp; ball valve shutoffs</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block">Couplings &amp; Tees</span>
                    <span className="text-slate-500 text-[11px]">Common failure zones under pressure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Unnoticed Flow is Hazardous */}
            <div className="p-5 border border-slate-200 rounded-xl bg-white space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">The Problem of Silent Wastage</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A single tap left running at standard mains pressure can waste 6 to 10 liters every single minute — dissipating over 400 liters in just 45 minutes. In student housing, schools, and institutional labs, taps left ajar over weekends regularly waste thousands of liters of treated municipal water.
              </p>
            </div>
          </div>

          {/* Right Column: 2. Aim & Core Hypothesis (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800">
              <div className="flex items-center gap-2 mb-3 font-semibold text-base text-sky-400">
                <Target className="w-5 h-5 text-sky-400 shrink-0" />
                <h3>2. Aim</h3>
              </div>
              <p className="text-base font-medium text-white leading-relaxed mb-6">
                "{PROJECT_METADATA.aim}"
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Demonstrate sensor hardware telemetry without expensive industrial flow instrumentation.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Bridge microcontrollers (Arduino) with standard desktop software (Python) via USB serial.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Empower users with clear, actionable warnings before wastage causes structural or environmental damage.</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                <Wrench className="w-4 h-4 text-slate-600" />
                <span>Practical Lab Approach</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than building a complex or costly system, this engineering guide emphasizes minimalism: off-the-shelf components, clear logic, and reproducible code that any student or homeowner can deploy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
