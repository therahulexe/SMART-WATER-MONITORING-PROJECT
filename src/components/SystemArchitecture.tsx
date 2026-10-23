import React, { useState } from 'react';
import {
  HOW_IT_WORKS_STEPS,
  MATERIALS_LIST,
  ARDUINO_CODE_SNIPPET,
  PYTHON_CODE_SNIPPET
} from '../data/projectData';
import {
  Check,
  Copy,
  Layers,
  Terminal,
  Cpu,
  ArrowRight,
  Database,
  Radio,
  MonitorCheck
} from 'lucide-react';
import telemetryDiagramImg from '../assets/images/telemetry_flow_diagram_1792774566708.jpg';

export const SystemArchitecture: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'arduino' | 'python'>('arduino');
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleCopyCode = () => {
    const textToCopy =
      activeCodeTab === 'arduino' ? ARDUINO_CODE_SNIPPET : PYTHON_CODE_SNIPPET;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
            Section 3 &amp; 4
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How the System Works &amp; Materials Required
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            The end-to-end signal pipeline from the fluid rotor to the Python warning display, alongside the complete bill of hardware materials.
          </p>
        </div>

        {/* Isometric Architecture Blueprint Graphic */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-700">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Campus Telemetry Schematic &amp; Hardware Interconnect
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Continuous water distribution pipeline with Hall-effect sensing &amp; serial monitoring
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Full Signal Loop: Sensor → MCU → UART → Console</span>
            </div>
          </div>

          <div className="relative aspect-16/9 max-h-[480px] w-full bg-slate-950 overflow-hidden group">
            <img
              src={telemetryDiagramImg}
              alt="Smart Water Monitoring Isometric System Diagram"
              className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-500"
            />
            {/* Soft gradient edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            {/* Schematic HUD Overlay Callouts */}
            <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-white">1. Reservoir Supply</span>
                <span className="text-slate-400 hidden md:inline">→ Gravity / mains header pipe</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-yellow-400" />
                <span className="font-semibold text-white">2. YF-S201 Rotor</span>
                <span className="text-slate-400 hidden md:inline">→ 450 pulses/liter calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-white">3. Arduino Uno R3</span>
                <span className="text-slate-400 hidden md:inline">→ Interrupt Pin 2</span>
              </div>
              <div className="flex items-center gap-2">
                <MonitorCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">4. Python Telemetry</span>
                <span className="text-slate-400 hidden md:inline">→ 9600 Baud threshold alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. How the System Works: 4-Step Interactive Pipeline */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-700" />
              <span>3. How the System Works</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Click any stage below to inspect technical mechanics
            </span>
          </div>

          {/* Step Selector Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const isSelected = activeStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-sky-600 ring-2 ring-sky-600/20 shadow-xs'
                      : 'bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Step 0{step.stepNumber}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {step.shortTitle}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Box */}
          {(() => {
            const current = HOW_IT_WORKS_STEPS.find((s) => s.stepNumber === activeStep)!;
            return (
              <div className="p-6 bg-white border border-slate-200/90 rounded-xl shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold text-sky-700 tracking-wide uppercase">
                      Pipeline Phase 0{current.stepNumber}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {current.title}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-500 italic max-w-md">
                    "{current.description}"
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Report Statement
                    </h5>
                    <p className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-800 font-medium">
                      {current.stepNumber}. {current.description}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Technical Implementation
                    </h5>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                      {current.technicalDetail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4. Materials Required Table */}
        <div className="mb-14">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-700" />
              <span>4. Materials Required</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Exact component list specified in the project report for sensor interfacing and host software monitoring.
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200/90 rounded-xl shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/75 border-b border-slate-200 text-xs font-semibold text-slate-700">
                <tr>
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Specification &amp; Model</th>
                  <th className="py-3 px-4">Purpose in System</th>
                  <th className="py-3 px-4 text-right">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {MATERIALS_LIST.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                      {item.specification}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {item.purpose}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-right whitespace-nowrap font-medium text-slate-800">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Code & Logic Inspector */}
        <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-md">
          {/* Code Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
                Implementation Code
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setActiveCodeTab('arduino')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                    activeCodeTab === 'arduino'
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Arduino Sketch (.ino)
                </button>
                <button
                  onClick={() => setActiveCodeTab('python')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                    activeCodeTab === 'python'
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Python Monitor (.py)
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium transition-colors cursor-pointer"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-5 font-mono text-xs overflow-x-auto max-h-[380px] bg-slate-950 text-slate-300 leading-relaxed selection:bg-sky-900 selection:text-white">
            <pre>
              <code>
                {activeCodeTab === 'arduino'
                  ? ARDUINO_CODE_SNIPPET
                  : PYTHON_CODE_SNIPPET}
              </code>
            </pre>
          </div>

          {/* Code Footnote */}
          <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>
              {activeCodeTab === 'arduino'
                ? 'Calculates flow rate using YF-S201 formula: Flow Rate (L/min) = (Pulse Count / 7.5)'
                : 'Host script reads COM3 at 9600 baud, checks thresholds (Normal <= 6, Warning 6-10, High > 10)'}
            </span>
            <span className="hidden sm:inline text-slate-500 font-mono">
              NMIT Implementation Guide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
