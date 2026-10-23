import React, { useState } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'embed' | 'transcript'>('embed');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300">
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/nmit-logo.jpeg"
              alt="NMIT Logo"
              className="h-10 sm:h-11 w-auto object-contain rounded-lg bg-white p-1 border border-slate-700 shadow-xs"
            />
            <div className="truncate">
              <span className="font-bold text-sm block truncate">
                NMIT_Water_Monitoring_Implementation_Guide.pdf
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                NMIT Environmental Science and Sustainability · Implementation Guide
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex p-0.5 bg-slate-800 rounded-lg text-xs mr-2">
              <button
                onClick={() => setViewMode('embed')}
                className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  viewMode === 'embed'
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setViewMode('transcript')}
                className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  viewMode === 'transcript'
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Transcript
              </button>
            </div>

            <a
              href={PROJECT_METADATA.pdfPath}
              download="NMIT_Water_Monitoring_Guide.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={PROJECT_METADATA.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 bg-slate-100 overflow-hidden relative">
          {viewMode === 'embed' ? (
            <div className="w-full h-full flex flex-col">
              <object
                data={`${PROJECT_METADATA.pdfPath}#view=FitH`}
                type="application/pdf"
                className="w-full h-full flex-1"
              >
                <div className="p-8 text-center max-w-lg mx-auto my-auto space-y-4">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    PDF Preview in Browser
                  </h3>
                  <p className="text-xs text-slate-600">
                    Your browser's built-in PDF viewer is either loading or sandboxed. You can download the report directly or switch to the full text transcript.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <a
                      href={PROJECT_METADATA.pdfPath}
                      download
                      className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-semibold"
                    >
                      Download PDF Document
                    </a>
                    <button
                      onClick={() => setViewMode('transcript')}
                      className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Read Full Transcript
                    </button>
                  </div>
                </div>
              </object>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6 max-w-4xl mx-auto space-y-8 bg-white my-4 rounded-xl border border-slate-200 shadow-xs">
              {/* Transcript Page 1 */}
              <div className="border-b border-slate-200 pb-8 space-y-4 text-center">
                <div className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">
                  Page 1 of 3
                </div>
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:scale-105 transition-transform duration-200">
                    <img
                      src="/nmit-logo.jpeg"
                      alt="NMIT Logo"
                      className="h-20 sm:h-24 w-auto object-contain"
                    />
                  </div>
                </div>
                <div className="text-sm font-semibold text-cyan-800 uppercase tracking-wide">
                  ENGINEERING IMPLEMENTATION GUIDE
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  NMIT Water Monitoring System
                </h2>
                <div className="text-sm text-slate-600 font-medium">
                  Environmental Science and Sustainability
                </div>
                <div className="max-w-md mx-auto p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Group Members</span>
                  <span className="text-slate-900 font-medium">
                    Rahul (Admin &amp; Lead Developer), Sushanth, Rohan, Jilani, Adthiya, Soyug
                  </span>
                </div>
                <p className="text-sm italic text-slate-600">
                  "A simple idea to help notice unnecessary water flow."
                </p>
              </div>

              {/* Transcript Page 2 */}
              <div className="border-b border-slate-200 pb-8 space-y-6 text-sm text-slate-700">
                <div className="text-xs font-semibold text-cyan-700 uppercase tracking-widest text-center">
                  Page 2 of 3
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">1. Introduction</h3>
                  <p className="leading-relaxed">
                    Water is important in our daily lives, so we should avoid wasting it. Sometimes water keeps flowing because a tap is left open or a plumbing problem is not noticed quickly. For this implementation guide, we suggest a simple system that measures water flow and gives a warning when the flow seems unusually high.
                  </p>
                  <p className="leading-relaxed mt-2">
                    The NSSKC visit handout mentions plumbing parts such as taps, pipes, valves and fittings. These can help us think about where water is used and where monitoring might be useful. Our group should add any specific lab observation only if we actually noticed it during the visit.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">2. Aim</h3>
                  <p className="leading-relaxed">
                    To show how a flow sensor, Arduino and a simple Python program can help users notice unusually high water flow.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">3. How the System Works</h3>
                  <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>A water-flow sensor measures the movement of water.</li>
                    <li>An Arduino reads the sensor signal and sends the reading to a computer.</li>
                    <li>A Python program displays the flow reading.</li>
                    <li>If the reading stays higher than the chosen limit, the program shows a warning so someone can check the tap or pipe.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">4. Materials Required</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Water-flow sensor (for example, a YF-S201-type sensor)</li>
                    <li>Arduino Uno</li>
                    <li>USB cable and connecting wires</li>
                    <li>Computer with Python installed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">5. Example Warning Levels</h3>
                  <p className="text-xs text-slate-500 italic mb-2">
                    These numbers are only sample values for a demonstration. The group should test and adjust them for the sensor and setup before using them.
                  </p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-2 bg-slate-100 p-2 font-bold text-slate-900 border-b border-slate-200">
                      <span>Flow reading</span>
                      <span>Display</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span>Up to 6 L/min</span>
                      <span className="font-semibold text-emerald-700">Normal</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span>Above 6 to 10 L/min</span>
                      <span className="font-semibold text-amber-700">Warning</span>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                      <span>Above 10 L/min</span>
                      <span className="font-semibold text-rose-700">High flow — check if expected</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">6. Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Makes unusual water flow easier to notice.</li>
                    <li>May help people respond to a possible plumbing issue sooner.</li>
                    <li>Connects a practical water-saving idea with basic programming.</li>
                    <li>Supports awareness of SDG 6: Clean Water and Sanitation, and SDG 11: Sustainable Cities and Communities.</li>
                  </ul>
                </div>
              </div>

              {/* Transcript Page 3 */}
              <div className="pb-6 space-y-6 text-sm text-slate-700">
                <div className="text-xs font-semibold text-cyan-700 uppercase tracking-widest text-center">
                  Page 3 of 3
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">7. Limitations</h3>
                  <p className="leading-relaxed">
                    The system cannot repair a leak by itself, and a high reading does not always mean there is a leak. The sensor also needs to be tested so that its readings are reasonably accurate.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">8. Team Work</h3>
                  <p className="text-xs text-slate-500 italic mb-2">
                    The following are suggested roles. Change them if your group divided the work differently.
                  </p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-2 bg-slate-100 p-2 font-bold text-slate-900 border-b border-slate-200">
                      <span>Member</span>
                      <span>Task</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100 bg-cyan-50/50">
                      <span className="font-bold text-cyan-900">Rahul (Admin &amp; Lead Developer)</span>
                      <span className="font-medium text-slate-900">System Administrator &amp; Lead Developer of this website; report QA</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span className="font-semibold">Sushanth</span>
                      <span>Coordinate the group</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span className="font-semibold">Rohan</span>
                      <span>Help connect the sensor and Arduino</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span className="font-semibold">Jilani</span>
                      <span>Check the sensor readings</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 border-b border-slate-100">
                      <span className="font-semibold">Adthiya</span>
                      <span>Run the Python program</span>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                      <span className="font-semibold">Soyug</span>
                      <span>Collect notes and help with the presentation</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">9. Conclusion</h3>
                  <p className="leading-relaxed">
                    The NMIT Water Monitoring System is a simple idea for reducing unnoticed water wastage. A sensor and Arduino can measure flow, while a Python program can show a warning when flow stays unusually high. The system would need to be tested before we can say how well it works, but it shows how technology can support careful water use.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">References</h3>
                  <ol className="list-decimal list-inside space-y-1 pl-2 text-xs">
                    <li>NMIT Project Guide Handout, Environmental Science and Sustainability, provided for the assignment.</li>
                    <li>NSSKC Visit Handout, provided for the assignment.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Complete verified transcript of NMIT Implementation Guide</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-md transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
