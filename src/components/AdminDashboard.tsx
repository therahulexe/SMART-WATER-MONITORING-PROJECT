import React, { useState } from 'react';
import { useAuth, PlumbingZone, LeakIncident } from '../context/AuthContext';
import {
  ShieldAlert,
  Power,
  Settings,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Activity,
  Wrench,
  Search,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    zones,
    toggleSolenoid,
    updateZoneThresholds,
    incidents,
    updateIncidentStatus,
    auditLogs
  } = useAuth();

  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0].id);
  const [editingThresholds, setEditingThresholds] = useState<Record<string, { normal: number; warning: number }>>(() => {
    const init: Record<string, { normal: number; warning: number }> = {};
    zones.forEach((z) => {
      init[z.id] = { normal: z.normalThreshold, warning: z.warningThreshold };
    });
    return init;
  });

  const [incidentFilter, setIncidentFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const handleSaveThreshold = (zoneId: string) => {
    const val = editingThresholds[zoneId];
    if (val) {
      updateZoneThresholds(zoneId, val.normal, val.warning);
    }
  };

  /**
   * Helper function that formats the current real-time sensor state data
   * into a valid, RFC 4180-compliant CSV string with comprehensive headers,
   * safe numeric formatting (fixed precision and NaN protection), and timestamps.
   */
  const formatSensorDataToCSV = (
    sensorZones: PlumbingZone[],
    snapshotDate: Date = new Date()
  ): string => {
    const isoTimestamp = snapshotDate.toISOString();
    const readableTimestamp = snapshotDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const headers = [
      'Zone ID',
      'Zone Name',
      'Campus Location',
      'Pipe Diameter / Spec',
      'Live Flow Rate (L/min)',
      'Estimated Flow Rate (L/hour)',
      'Solenoid Valve State',
      'Normal Limit (L/min)',
      'Warning Threshold (L/min)',
      'Operational Status',
      'Threshold Variance (L/min)',
      'Last Field Inspection',
      'Snapshot Timestamp (ISO 8601)',
      'Local Formatted Time'
    ].join(',');

    const escapeCSV = (value: unknown): string => {
      if (value === null || value === undefined) return '""';
      const str = String(value);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = sensorZones.map((z) => {
      const rawFlow = typeof z.flowRate === 'number' && !Number.isNaN(z.flowRate) ? z.flowRate : 0;
      const normalLimit = typeof z.normalThreshold === 'number' && !Number.isNaN(z.normalThreshold) ? z.normalThreshold : 0;
      const warningLimit = typeof z.warningThreshold === 'number' && !Number.isNaN(z.warningThreshold) ? z.warningThreshold : 0;

      const isOpen = z.solenoidStatus === 'open';
      const isCritical = isOpen && rawFlow > warningLimit;
      const isWarning = isOpen && rawFlow > normalLimit;

      let status = 'NORMAL';
      if (!isOpen) {
        status = 'VALVE CUT OFF / ISOLATED';
      } else if (isCritical) {
        status = 'CRITICAL HIGH FLOW';
      } else if (isWarning) {
        status = 'ELEVATED WARNING';
      }

      const flowRateFormatted = rawFlow.toFixed(2);
      const hourlyFlowFormatted = (rawFlow * 60).toFixed(1);
      const normalFormatted = normalLimit.toFixed(1);
      const warningFormatted = warningLimit.toFixed(1);

      const varianceVal = rawFlow - normalLimit;
      const varianceFormatted = varianceVal >= 0 ? `+${varianceVal.toFixed(2)}` : varianceVal.toFixed(2);

      return [
        escapeCSV(z.id),
        escapeCSV(z.name),
        escapeCSV(z.location),
        escapeCSV(z.pipeDiameter),
        flowRateFormatted,
        hourlyFlowFormatted,
        isOpen ? 'OPEN' : 'CLOSED',
        normalFormatted,
        warningFormatted,
        escapeCSV(status),
        escapeCSV(varianceFormatted),
        escapeCSV(z.lastInspection),
        escapeCSV(isoTimestamp),
        escapeCSV(readableTimestamp)
      ].join(',');
    });

    return [headers, ...rows].join('\r\n');
  };

  const exportSensorReport = () => {
    const csvContent = formatSensorDataToCSV(zones);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nmit_sensor_telemetry_report_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const exportIncidentReport = () => {
    const headers = 'ID,Zone,Fixture,ReportedBy,Severity,FlowRate,Status,ReportedAt,Notes\n';
    const rows = incidents
      .map(
        (i) =>
          `"${i.id}","${i.zone}","${i.fixture}","${i.reportedBy}","${i.severity}",${i.flowRate},"${i.status}","${i.reportedAt}","${i.notes.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `water_incidents_report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredIncidents = incidents.filter((i) => {
    if (incidentFilter === 'all') return true;
    return i.status === incidentFilter;
  });

  return (
    <section id="admin-console" className="py-12 bg-slate-100/80 border-b border-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Admin Header Banner */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src="/nmit-logo.jpeg"
              alt="NMIT Logo"
              className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white p-1 border border-slate-700 shadow-md shrink-0 hidden sm:block hover:scale-105 transition-transform"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                <span>Facility Supervisor &amp; Lab Administrator Console</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Campus Plumbing &amp; Sensor Operations Center
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-white font-medium">{currentUser?.name}</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser?.title}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-sky-300">4 Active Telemetry Zones</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={exportSensorReport}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer hover:shadow-indigo-500/20"
              title="Download real-time sensor telemetry and valve state as CSV"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </>
              )}
            </button>
            <button
              onClick={exportIncidentReport}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Export resident incident logs as CSV"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export Incident Log</span>
            </button>
          </div>
        </div>

        {/* 1. Multi-Zone Plumbing Telemetry & Solenoid Cut-off Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <span>Multi-Zone Fluid Telemetry &amp; Motorized Solenoid Actuators</span>
              </h3>
              <p className="text-xs text-slate-500">
                Click any zone's power switch to actuate the motorized cutoff valve and isolate the water line.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                BACnet/Modbus Protocol Active
              </span>
              <button
                onClick={exportSensorReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-2xs hover:border-indigo-300 transition-colors cursor-pointer"
                title="Download current real-time sensor telemetry CSV report"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map((zone) => {
              const isOpen = zone.solenoidStatus === 'open';
              const isWarning = isOpen && zone.flowRate > zone.normalThreshold;
              const isCritical = isOpen && zone.flowRate > zone.warningThreshold;

              return (
                <div
                  key={zone.id}
                  className={`p-5 rounded-xl border bg-white shadow-2xs space-y-4 transition-all ${
                    !isOpen
                      ? 'border-slate-300 bg-slate-50/60 opacity-80'
                      : isCritical
                      ? 'border-rose-400 ring-2 ring-rose-500/20'
                      : isWarning
                      ? 'border-amber-400 ring-1 ring-amber-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-slate-500 block">
                        {zone.pipeDiameter}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {zone.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {zone.location}
                      </span>
                    </div>

                    {/* Motorized Solenoid Actuator Button */}
                    <button
                      onClick={() => toggleSolenoid(zone.id)}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        isOpen
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-700 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800 border border-rose-300'
                      }`}
                      title={isOpen ? 'Click to trigger Emergency Cutoff' : 'Click to Reopen Valve'}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Live Flow
                      </span>
                      <div className="text-xl font-extrabold font-mono text-slate-900 tabular-nums">
                        {zone.flowRate.toFixed(1)}{' '}
                        <span className="text-xs font-normal text-slate-500">L/m</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Solenoid State
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isOpen ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isOpen ? '● OPEN' : '✕ CUT OFF'}
                      </span>
                    </div>
                  </div>

                  {/* Threshold Indicators */}
                  <div className="text-[11px] text-slate-500 font-mono flex justify-between bg-slate-50 p-2 rounded-md">
                    <span>Norm: ≤{zone.normalThreshold}L</span>
                    <span>Warn: &gt;{zone.warningThreshold}L</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Threshold Calibration (Left) & Leak Dispatch Queue (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Zone Calibration & Threshold Overrides (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-700" />
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Global Zone Threshold Calibration
                </h4>
                <p className="text-xs text-slate-500">
                  Override alarm levels for specific hydraulic branch lines.
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Target Plumbing Zone:
              </label>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.pipeDiameter})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Normal Ceiling Threshold:</span>
                  <span className="font-mono text-emerald-700">
                    {editingThresholds[selectedZoneId]?.normal.toFixed(1) || selectedZone.normalThreshold} L/min
                  </span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="10.0"
                  step="0.5"
                  value={editingThresholds[selectedZoneId]?.normal || selectedZone.normalThreshold}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setEditingThresholds((prev) => ({
                      ...prev,
                      [selectedZoneId]: {
                        ...prev[selectedZoneId],
                        normal: val
                      }
                    }));
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Critical High Alert Threshold:</span>
                  <span className="font-mono text-amber-700">
                    {editingThresholds[selectedZoneId]?.warning.toFixed(1) || selectedZone.warningThreshold} L/min
                  </span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="16.0"
                  step="0.5"
                  value={editingThresholds[selectedZoneId]?.warning || selectedZone.warningThreshold}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setEditingThresholds((prev) => ({
                      ...prev,
                      [selectedZoneId]: {
                        ...prev[selectedZoneId],
                        warning: val
                      }
                    }));
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <button
                onClick={() => handleSaveThreshold(selectedZoneId)}
                className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Apply Threshold Calibration to {selectedZone.name.split(' ')[0]}
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Sensor K-Factor Standard:</span>
              <p className="text-[11px] leading-relaxed">
                YF-S201 factory calibration: 7.5 pulses per L/min. Changes take effect on the attached Arduino listener immediately.
              </p>
            </div>
          </div>

          {/* Right: Resident Incident Queue & Plumber Dispatch (7 cols) */}
          <div className="lg:col-span-7 p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-700" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Resident Leak Incident Queue
                  </h4>
                  <p className="text-xs text-slate-500">
                    Manage plumbing reports filed by students and staff.
                  </p>
                </div>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs">
                {(['all', 'pending', 'investigating', 'resolved'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setIncidentFilter(filter)}
                    className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                      incidentFilter === filter
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredIncidents.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  No incidents matching status filter "{incidentFilter}".
                </div>
              ) : (
                filteredIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-4 border border-slate-200 rounded-xl space-y-2.5 hover:border-slate-300 transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-slate-900 font-mono">
                            {inc.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span
                            className={`font-semibold uppercase text-[10px] px-1.5 py-0.2 rounded ${
                              inc.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : inc.severity === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {inc.severity}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 text-[11px]">{inc.reportedAt}</span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                          {inc.fixture}
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          Zone: {inc.zone} · Reporter: {inc.reportedBy}
                        </p>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <select
                          value={inc.status}
                          onChange={(e) =>
                            updateIncidentStatus(inc.id, e.target.value as LeakIncident['status'])
                          }
                          className={`text-xs font-semibold p-1.5 rounded-lg border cursor-pointer ${
                            inc.status === 'resolved'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : inc.status === 'investigating'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                      {inc.notes}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 3. System Audit Log */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Real-Time Security &amp; Operations Audit Trail</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Tamper-evident system log
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs max-h-32 overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-slate-600 text-[11px]">
                <span className="text-slate-400 shrink-0">{log.time}</span>
                <span className="font-semibold text-slate-800 shrink-0">{log.actor}:</span>
                <span className="text-slate-700">{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
