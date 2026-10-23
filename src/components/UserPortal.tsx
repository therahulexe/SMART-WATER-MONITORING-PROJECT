import React, { useState } from 'react';
import { useAuth, LeakIncident } from '../context/AuthContext';
import {
  Droplet,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Award,
  Sparkles,
  Home
} from 'lucide-react';

export const UserPortal: React.FC = () => {
  const { currentUser, reportLeak, incidents } = useAuth();

  // Personal resident meter simulation state
  const [personalFlow, setPersonalFlow] = useState<number>(3.8);
  const [dailyConsumed, setDailyConsumed] = useState<number>(84);
  const dailyTarget = 120; // 120 Liters daily allowance

  // Report form state
  const [zone, setZone] = useState('Campus Student Dormitory Riser');
  const [fixture, setFixture] = useState('Bathroom 304 Basin Bibcock Tap');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'critical'>('low');
  const [estimatedFlow, setEstimatedFlow] = useState<number>(5.5);
  const [notes, setNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const myIncidents = incidents.filter(
    (i) => i.reporterEmail === currentUser?.email || i.reportedBy.includes(currentUser?.name || '')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    reportLeak({
      zone,
      fixture,
      reportedBy: `${currentUser?.name || 'Resident User'} (${currentUser?.location || 'Campus Resident'})`,
      reporterEmail: currentUser?.email || 'user@nmit.ac.in',
      flowRate: estimatedFlow,
      severity,
      notes
    });

    setNotes('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const budgetPercent = Math.min(100, Math.round((dailyConsumed / dailyTarget) * 100));

  return (
    <section id="user-portal" className="py-12 bg-sky-50/40 border-b border-sky-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* User Portal Header */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src="/nmit-logo.jpeg"
              alt="NMIT Logo"
              className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm shrink-0 hidden sm:block hover:scale-105 transition-transform"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-700 uppercase tracking-wider">
                <Home className="w-4 h-4 text-sky-600" />
                <span>Resident Water Stewardship Portal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Welcome back, {currentUser?.name || 'Student Resident'}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{currentUser?.location}</span>
                <span aria-hidden="true">·</span>
                <span>Assigned Sub-Meter #MTR-B304</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">Goal: ≤ 120 L/day</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-cyan-50 p-3 rounded-xl border border-cyan-200 shrink-0">
            <Award className="w-8 h-8 text-cyan-700 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                Conservation Streak
              </span>
              <span className="text-base font-extrabold text-cyan-900 font-mono">
                6 Days Within Budget
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Personal Metrics & Daily Budget (Left 5) vs Report Leak Form (Right 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: My Tap Telemetry & Budget (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Tap Readout */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  My Fixture Instantaneous Flow
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {personalFlow <= 6.0 ? 'Normal Stream' : 'High Flow'}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
                    {personalFlow.toFixed(1)}{' '}
                    <span className="text-sm font-normal text-slate-500">L/min</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Sensor: YF-S201 (Unit 304 Riser)
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {[0.0, 3.8, 8.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPersonalFlow(rate)}
                      className={`px-2 py-1 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                        personalFlow === rate
                          ? 'bg-cyan-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {rate === 0 ? 'Off' : `${rate}L`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Turn off your faucet while lathering soap or brushing teeth to save ~12 Liters per session.
              </div>
            </div>

            {/* Daily Budget Progress Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Today's Water Budget
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {dailyConsumed} / {dailyTarget} Liters ({budgetPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetPercent > 90
                      ? 'bg-rose-500'
                      : budgetPercent > 70
                      ? 'bg-amber-500'
                      : 'bg-cyan-600'
                  }`}
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-slate-500 text-[11px] block">Remaining Budget</span>
                  <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                    {Math.max(0, dailyTarget - dailyConsumed)} Liters
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-slate-500 text-[11px] block">Weekly Savings</span>
                  <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
                    +142 Liters
                  </span>
                </div>
              </div>
            </div>

            {/* My Filed Reports Tracking */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  My Incident Reports
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {myIncidents.length} Reported
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {myIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{inc.fixture}</span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                          inc.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inc.status === 'investigating'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-1">{inc.notes}</p>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Filed: {inc.reportedAt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Report a Plumbing Leak Form (7 cols) */}
          <div className="lg:col-span-7 p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-sky-700" />
                <span>Report Plumbing Leak or Left-Running Tap</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Notice an unmonitored open tap or hissing pipe joint? Submit a report directly to the Facility Supervisor's queue.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Report submitted successfully! Facility management has been notified.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Building Location / Zone
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  >
                    <option value="Campus Student Dormitory Riser">Campus Student Dormitory (Block B)</option>
                    <option value="NMIT Environmental Science Lab">NMIT Environmental Science Lab</option>
                    <option value="Canteen & Kitchen Main Fixture">Central Dining Hall &amp; Kitchen</option>
                    <option value="NSSKC Field Demo Test Conduits">Outdoor Plumbing &amp; Hydraulics Shed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Affected Fixture (NSSKC Handout)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2nd Floor Sink Bibcock, Shower Riser"
                    value={fixture}
                    onChange={(e) => setFixture(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Observed Severity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'critical'] as const).map((sev) => (
                      <button
                        type="button"
                        key={sev}
                        onClick={() => setSeverity(sev)}
                        className={`p-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                          severity === sev
                            ? sev === 'critical'
                              ? 'bg-rose-600 text-white'
                              : sev === 'medium'
                              ? 'bg-amber-500 text-white'
                              : 'bg-cyan-700 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Estimated Discharge:</span>
                    <span className="font-mono text-cyan-800">{estimatedFlow} L/min</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="18.0"
                    step="0.5"
                    value={estimatedFlow}
                    onChange={(e) => setEstimatedFlow(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Incident Description &amp; Visual Notes
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the leak (e.g. Faucet running with no one present, continuous hissing sound behind wall panel, puddle forming beneath coupling fitting...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-cyan-600/30"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Incident Report to Facility Operations</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
