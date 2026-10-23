import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/projectData';
import { Users, CheckCircle2, Award } from 'lucide-react';

export const TeamWork: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string>('Rahul');

  const currentMember =
    TEAM_MEMBERS.find((m) => m.name === selectedMember) || TEAM_MEMBERS[0];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-1">
            Section 8
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            8. Team Work &amp; Project Contributions
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
            Collaborative division of labor across group members as documented in the official NMIT project submission.
          </p>
        </div>

        {/* Note from report */}
        <p className="text-xs text-slate-500 italic mb-6">
          "The following are suggested roles. Change them if your group divided the work differently."
        </p>

        {/* 2-Column Layout: Table of Members (Left) and Focused Member Duties (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Members Table (7 cols) */}
          <div className="lg:col-span-7 overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-800">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Designated Task (Report)</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TEAM_MEMBERS.map((member) => {
                  const isSelected = selectedMember === member.name;
                  return (
                    <tr
                      key={member.name}
                      onClick={() => setSelectedMember(member.name)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-50/70 font-semibold'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-cyan-700 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <span>{member.name}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-700">
                        {member.task}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedMember(member.name)}
                          className={`text-xs px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-700 text-white'
                              : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'View'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Member Spotlight Box (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-sm">
                  {currentMember.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentMember.name}
                  </h3>
                  <span className="text-xs text-cyan-700 font-semibold">
                    {currentMember.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Award className="w-3.5 h-3.5 text-cyan-600" />
                <span>NMIT Project Group</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Official Task Assignment
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900">
                "{currentMember.task}"
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Work Scope &amp; Deliverables
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentMember.dutySummary}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Milestone task integrated into the implementation guide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
