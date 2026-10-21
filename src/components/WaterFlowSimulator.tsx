import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  AlertTriangle,
  CheckCircle,
  AlertOctagon,
  RotateCcw,
  Play,
  Pause,
  Clock,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

interface ScenarioPreset {
  id: string;
  name: string;
  flow: number;
  category: string;
  description: string;
}

const PRESETS: ScenarioPreset[] = [
  {
    id: 'off',
    name: 'Closed Tap',
    flow: 0.0,
    category: 'Idle',
    description: 'Tap tightly closed. Zero flow velocity and zero sensor pulses.'
  },
  {
    id: 'drip',
    name: 'Slow Leak / Drip',
    flow: 1.2,
    category: 'Seepage',
    description: 'Worn bibcock washer or pinhole seal seepage.'
  },
  {
    id: 'normal',
    name: 'Standard Handwash',
    flow: 4.5,
    category: 'Normal Domestic',
    description: 'Gentle domestic aerated stream for handwashing or rinsing.'
  },
  {
    id: 'warning',
    name: 'High Faucet / Tap Ajar',
    flow: 8.2,
    category: 'Elevated Warning',
    description: 'Sink tap opened fully or bathroom tap left running unmonitored.'
  },
  {
    id: 'burst',
    name: 'Burst Pipe / Runaway',
    flow: 14.5,
    category: 'High Flow Emergency',
    description: 'Conduit fracture, loose coupling fitting, or open main hose.'
  }
];

export const WaterFlowSimulator: React.FC = () => {
  // Simulator State
  const [flowRate, setFlowRate] = useState<number>(4.5);
  const [normalThreshold, setNormalThreshold] = useState<number>(6.0);
  const [warningThreshold, setWarningThreshold] = useState<number>(10.0);
  const [isLiveRunning, setIsLiveRunning] = useState<boolean>(true);
  const [durationHours, setDurationHours] = useState<number>(1.0);
  const [accumulatedLiters, setAccumulatedLiters] = useState<number>(24.8);

  // Serial logs
  const [serialLogs, setSerialLogs] = useState<string[]>([
    '[INIT] Baud rate: 9600 bps | Interrupt attached: Pin 2',
    '[ARDUINO] System booted. Calibration factor: 7.5 pulses/(L/min)'
  ]);

  // Turbine rotation angle in SVG
  const [turbineAngle, setTurbineAngle] = useState<number>(0);
  const requestRef = useRef<number | null>(null);

  // Status calculation
  const getStatus = (flow: number) => {
    if (flow <= normalThreshold) {
      return {
        level: 'Normal',
        code: 'normal',
        colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-emerald-700',
        message: 'Flow is within expected normal domestic limits (Up to 6 L/min).',
        action: 'Routine operation — no intervention required.'
      };
    } else if (flow <= warningThreshold) {
      return {
        level: 'Warning',
        code: 'warning',
        colorClass: 'text-amber-800 bg-amber-50 border-amber-200',
        badgeBg: 'bg-amber-600',
        badgeText: 'text-amber-800',
        message: 'Elevated flow detected (Above 6 to 10 L/min). Tap may be left running.',
        action: 'Check taps and valves in the vicinity to verify intentional usage.'
      };
    } else {
      return {
        level: 'High flow — check if expected',
        code: 'high',
        colorClass: 'text-rose-800 bg-rose-50 border-rose-200',
        badgeBg: 'bg-rose-600',
        badgeText: 'text-rose-800',
        message: 'Critical high flow (Above 10 L/min). Immediate inspection required!',
        action: 'Inspect main line for burst fittings or disconnected pipes.'
      };
    }
  };

  const currentStatus = getStatus(flowRate);

  // Calculate pulses per second: f (Hz) = 7.5 * Q (L/min)
  const pulseFrequencyHz = Math.round(flowRate * 7.5 * 10) / 10;

  // Animate turbine rotation based on flow
  useEffect(() => {
    let lastTime = performance.now();

    const animateTurbine = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isLiveRunning && flowRate > 0) {
        // Rotational speed proportional to flow rate
        const speedMultiplier = flowRate * 45; // deg/sec
        setTurbineAngle((prev) => (prev + speedMultiplier * dt) % 360);
      }

      requestRef.current = requestAnimationFrame(animateTurbine);
    };

    requestRef.current = requestAnimationFrame(animateTurbine);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [flowRate, isLiveRunning]);

  // Log serial packets on timer
  useEffect(() => {
    if (!isLiveRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const pulsesPerSec = Math.round(flowRate * 7.5);

      // Accumulate volume
      setAccumulatedLiters((prev) => prev + (flowRate / 60));

      let logMessage = '';
      if (flowRate === 0) {
        logMessage = `[${timeStr}] IDLE | Flow: 0.00 L/min | Pulses: 0 Hz`;
      } else if (flowRate <= normalThreshold) {
        logMessage = `[${timeStr}] FLOW: ${flowRate.toFixed(2)} L/min | Pulses: ${pulsesPerSec}Hz | [NORMAL]`;
      } else if (flowRate <= warningThreshold) {
        logMessage = `[${timeStr}] FLOW: ${flowRate.toFixed(2)} L/min | Pulses: ${pulsesPerSec}Hz | [WARNING: Flow > ${normalThreshold} L/min]`;
      } else {
        logMessage = `[${timeStr}] FLOW: ${flowRate.toFixed(2)} L/min | Pulses: ${pulsesPerSec}Hz | [ALERT: High flow > ${warningThreshold} L/min]`;
      }

      setSerialLogs((prev) => [logMessage, ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [flowRate, isLiveRunning, normalThreshold, warningThreshold]);

  // Wastage calculations
  const totalWastedLiters = Math.round(flowRate * 60 * durationHours);
  const bucketsWasted = Math.round((totalWastedLiters / 20) * 10) / 10; // 20L standard bucket
  const estimatedCost = (totalWastedLiters * 0.0035).toFixed(2); // ~$3.50 per 1000L municipal tariff

  const resetDefaults = () => {
    setFlowRate(4.5);
    setNormalThreshold(6.0);
    setWarningThreshold(10.0);
    setDurationHours(1.0);
    setSerialLogs((prev) => ['[RESET] Reset thresholds to report default values.', ...prev.slice(0, 19)]);
  };

  return (
    <section id="simulator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
              Interactive Diagnostic Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Interactive Water Flow &amp; Warning Simulator
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
              Test real flow rates, observe the YF-S201 turbine pulse output, and calibrate thresholds as prescribed in Section 5 of the implementation guide.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsLiveRunning(!isLiveRunning)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {isLiveRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-600" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Resume Stream</span>
                </>
              )}
            </button>
            <button
              onClick={resetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Strip */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Simulate Plumbing Scenarios
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PRESETS.map((preset) => {
              const isSelected = Math.abs(flowRate - preset.flow) < 0.1;
              return (
                <button
                  key={preset.id}
                  onClick={() => setFlowRate(preset.flow)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/80 border-cyan-600 ring-1 ring-cyan-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {preset.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900 tabular-nums">
                      {preset.flow} L/m
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {preset.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Visual Stage (Left) & Controls/Diagnostics (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Visual Pipe Stage & Sensor Turbine (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Pipe & Sensor Cross-Section Stage */}
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-white relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    Inline Flow Chamber
                  </span>
                  <span className="text-slate-500 text-xs">·</span>
                  <span className="text-xs text-slate-400 font-mono">DN15 (1/2" Thread)</span>
                </div>
                <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="tabular-nums">{pulseFrequencyHz} Hz</span>
                  <span className="text-slate-400 text-[11px]">(F = 7.5 × Q)</span>
                </div>
              </div>

              {/* Graphic Pipe Chamber with SVG Turbine */}
              <div className="relative h-44 bg-slate-950/90 rounded-lg border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
                {/* Horizontal Water Flow Stream */}
                <div
                  className="absolute inset-y-8 left-0 right-0 transition-opacity duration-300"
                  style={{
                    backgroundColor: flowRate > 0 ? '#0284c7' : '#1e293b',
                    opacity: flowRate > 0 ? Math.min(0.25 + flowRate * 0.04, 0.85) : 0.15
                  }}
                >
                  {/* Flow wave ripples if water is moving */}
                  {flowRate > 0 && isLiveRunning && (
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 40px)`,
                        animation: `flowAnimation ${Math.max(0.2, 2.5 - flowRate * 0.14)}s linear infinite`
                      }}
                    />
                  )}
                </div>

                {/* Pipe Walls (Top and Bottom metallic borders) */}
                <div className="absolute top-8 left-0 right-0 h-1.5 bg-slate-700 border-b border-slate-600" />
                <div className="absolute bottom-8 left-0 right-0 h-1.5 bg-slate-700 border-t border-slate-600" />

                {/* Sensor Body Housing */}
                <div className="relative z-10 w-28 h-28 rounded-2xl bg-slate-800 border-2 border-slate-600 shadow-xl flex flex-col items-center justify-center p-2">
                  <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1">
                    YF-S201
                  </div>

                  {/* Rotating Turbine Rotor */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-cyan-400"
                      style={{
                        transform: `rotate(${turbineAngle}deg)`,
                        transition: isLiveRunning && flowRate > 0 ? 'none' : 'transform 0.3s ease-out'
                      }}
                    >
                      <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                      {/* 6 Turbine Blades */}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <g key={i} transform={`rotate(${angle} 50 50)`}>
                          <path
                            d="M 50 36 C 47 25, 43 14, 48 8 C 53 14, 52 25, 50 36 Z"
                            fill="#38bdf8"
                          />
                        </g>
                      ))}
                      <circle cx="50" cy="50" r="5" fill="#38bdf8" />
                    </svg>
                  </div>

                  <div className="text-[9px] font-mono text-slate-400 mt-1">
                    {flowRate > 0 ? 'Turbine Spinning' : 'Stationary'}
                  </div>
                </div>

                {/* Direction Arrows */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-cyan-400/80 font-mono text-xs">
                  <span>INLET</span>
                  <span>→</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-cyan-400/80 font-mono text-xs">
                  <span>→</span>
                  <span>OUTLET</span>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`mt-4 p-4 rounded-lg border flex items-start justify-between gap-4 transition-colors ${currentStatus.colorClass}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {currentStatus.code === 'normal' && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {currentStatus.code === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                    {currentStatus.code === 'high' && (
                      <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <span className="font-bold text-sm tracking-tight">
                      Display: {currentStatus.level}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{currentStatus.message}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider block opacity-75">
                    Recommended Action
                  </span>
                  <span className="text-xs font-medium block">
                    {currentStatus.action}
                  </span>
                </div>
              </div>
            </div>

            {/* Serial Output Feed (Terminal) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-slate-400 text-[11px] font-semibold">
                  Arduino Serial Monitor (9600 Baud · COM3)
                </span>
                <span className="text-[10px] text-slate-500">
                  {isLiveRunning ? 'Live Stream Active' : 'Stream Paused'}
                </span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {serialLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      log.includes('ALERT')
                        ? 'text-rose-400 font-semibold'
                        : log.includes('WARNING')
                        ? 'text-amber-300'
                        : log.includes('NORMAL')
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Controls, Threshold Customizer & Impact Deck (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Flow Control Slider */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="flowSlider"
                  className="text-sm font-bold text-slate-900 flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-cyan-700" />
                  <span>Adjust Water Flow Rate</span>
                </label>
                <div className="text-xl font-extrabold text-cyan-800 font-mono tabular-nums">
                  {flowRate.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-500">L/min</span>
                </div>
              </div>

              <div>
                <input
                  id="flowSlider"
                  type="range"
                  min="0.0"
                  max="18.0"
                  step="0.1"
                  value={flowRate}
                  onChange={(e) => setFlowRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-600 mt-1.5">
                  <span>0.0 L/m (Off)</span>
                  <span className="text-emerald-800 font-semibold">6.0 L/m (Normal Max)</span>
                  <span className="text-amber-800 font-semibold">10.0 L/m (Warning Max)</span>
                  <span>18.0 L/m (Max)</span>
                </div>
              </div>

              {/* Instantaneous Conversions */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Hourly Discharge</span>
                  <span className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                    {(flowRate * 60).toFixed(0)} L/hr
                  </span>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Estimated Pulses</span>
                  <span className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                    {Math.round(flowRate * 7.5 * 60)} /min
                  </span>
                </div>
              </div>
            </div>

            {/* Threshold Adjuster (From Section 5 Note) */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  Calibrate Demonstration Thresholds
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                As noted in Section 5: <em>"These numbers are only sample values for a demonstration. The group should test and adjust them for the sensor and setup before using them."</em>
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Normal Ceiling Limit:</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {normalThreshold.toFixed(1)} L/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="8.0"
                    step="0.5"
                    value={normalThreshold}
                    onChange={(e) => setNormalThreshold(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Warning Ceiling Limit:</span>
                    <span className="font-mono font-bold text-amber-700 tabular-nums">
                      {warningThreshold.toFixed(1)} L/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="14.0"
                    step="0.5"
                    value={warningThreshold}
                    onChange={(e) => setWarningThreshold(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              </div>
            </div>

            {/* Wastage Calculator Card */}
            <div className="p-5 bg-gradient-to-br from-cyan-900 to-slate-900 text-white rounded-xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-cyan-300" />
                  <span>Wastage Impact Calculator</span>
                </div>
                <span className="text-xs font-mono text-cyan-200">
                  {durationHours} hour{durationHours > 1 ? 's' : ''}
                </span>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1.5">
                  If this flow continues unaddressed for:
                </label>
                <div className="flex gap-1.5">
                  {[0.25, 1, 4, 12, 24].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setDurationHours(hrs)}
                      className={`flex-1 py-1 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                        durationHours === hrs
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {hrs < 1 ? '15m' : `${hrs}h`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-800/80 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-cyan-200 block">Total Water Lost</span>
                  <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
                    {totalWastedLiters.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-cyan-300">Liters</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-cyan-200 block">Standard 20L Buckets</span>
                  <div className="text-2xl font-extrabold font-mono text-cyan-300 tabular-nums">
                    {bucketsWasted.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-cyan-100/90 leading-relaxed bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/50">
                Early notification from the Python program helps stop this loss in minutes rather than letting taps discharge hundreds of liters unnoticed.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS keyframes for flow wave animation */}
      <style>{`
        @keyframes flowAnimation {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
      `}</style>
    </section>
  );
};
