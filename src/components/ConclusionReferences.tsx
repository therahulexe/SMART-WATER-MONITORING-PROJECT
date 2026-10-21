import React from 'react';
import { PROJECT_METADATA } from '../data/projectData';
import { BookOpen, CheckCircle, FileText, Download, ExternalLink } from 'lucide-react';

interface ConclusionReferencesProps {
  onOpenPdf: () => void;
}

export const ConclusionReferences: React.FC<ConclusionReferencesProps> = ({ onOpenPdf }) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 9. Conclusion (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
                Section 9
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                9. Conclusion
              </h2>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic border-l-2 border-cyan-600 pl-4">
                "{PROJECT_METADATA.conclusion}"
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                  <span>Demonstrated sensor interfacing via pulse interrupts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                  <span>Proved early notification viability on standard desktop hardware.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: References & PDF Download (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
                Academic Citations
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                References
              </h2>
            </div>

            <div className="space-y-3">
              {PROJECT_METADATA.references.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl space-y-1"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-700">
                      [{ref.id}]
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {ref.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pl-6">
                    {ref.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Official Report Callout Card */}
            <div className="p-5 bg-gradient-to-br from-cyan-900 to-slate-900 text-white rounded-xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-300" />
                <h3 className="text-sm font-bold text-white">
                  Official Report Document (PDF)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The original 3-page academic report is embedded in this site for complete verification and offline grading.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={onOpenPdf}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF Viewer</span>
                </button>

                <a
                  href={PROJECT_METADATA.pdfPath}
                  download="Smart_Water_Monitoring_Guide_Report.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Direct Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
