/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthGate } from './components/AuthGate';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AdminDashboard } from './components/AdminDashboard';
import { UserPortal } from './components/UserPortal';
import { ProjectOverview } from './components/ProjectOverview';
import { SystemArchitecture } from './components/SystemArchitecture';
import { WaterFlowSimulator } from './components/WaterFlowSimulator';
import { WarningLevels } from './components/WarningLevels';
import { SdgBenefits } from './components/SdgBenefits';
import { LimitationsFuture } from './components/LimitationsFuture';
import { FaqSection } from './components/FaqSection';
import { TeamWork } from './components/TeamWork';
import { ConclusionReferences } from './components/ConclusionReferences';
import { Footer } from './components/Footer';
import { PdfModal } from './components/PdfModal';
import { LoginModal } from './components/LoginModal';
import { AiAssistant } from './components/AiAssistant';
import { ShieldCheck, User, LogOut, ArrowRightLeft } from 'lucide-react';

function AuthenticatedApp() {
  const { role, currentUser, switchRole, logout } = useAuth();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'admin-console',
        'user-portal',
        'overview',
        'architecture',
        'simulator',
        'warning-levels',
        'faq',
        'sdg-benefits'
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchSimulator = () => {
    const simEl = document.getElementById('simulator');
    if (simEl) {
      simEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar (One-row, 3-zone contract) */}
      <Navbar
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Role Indicator & Fast-Switch Ribbon */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-2.5 px-4 text-xs sticky top-16 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Authenticated Session:</span>
            {role === 'admin' ? (
              <span className="flex items-center gap-1.5 font-bold text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-md border border-indigo-800">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Administrator ({currentUser?.name})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-bold text-sky-300 bg-sky-950 px-2.5 py-0.5 rounded-md border border-sky-800">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Resident User ({currentUser?.name})</span>
              </span>
            )}
            <span className="hidden md:inline text-slate-500 font-mono text-[11px]">
              {currentUser?.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden lg:inline">
              Switch View:
            </span>

            {role === 'admin' ? (
              <button
                onClick={() => switchRole('user')}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-sky-300 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
                title="Switch to Resident User View"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Switch to Resident View</span>
              </button>
            ) : (
              <button
                onClick={() => switchRole('admin')}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-indigo-300 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
                title="Switch to Admin Facility View"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Switch to Admin View</span>
              </button>
            )}

            <button
              onClick={logout}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Distinct Admin Interface: Facility Operations & Multi-Zone Solenoid Controls */}
        {role === 'admin' && <AdminDashboard />}

        {/* Distinct User Interface: Resident Portal, Personal Sub-Meter & Leak Form */}
        {role === 'user' && <UserPortal />}

        {/* Hero Section with KPI Strip */}
        <Hero
          onOpenPdf={() => setIsPdfModalOpen(true)}
          onLaunchSimulator={handleLaunchSimulator}
        />

        {/* 1. Introduction & 2. Aim */}
        <ProjectOverview />

        {/* 3. How the System Works & 4. Materials Required */}
        <SystemArchitecture />

        {/* Interactive Water Flow & Calibration Bench */}
        <WaterFlowSimulator />

        {/* 5. Example Warning Levels */}
        <WarningLevels />

        {/* 6. Benefits & UN SDGs */}
        <SdgBenefits />

        {/* 7. Limitations & Future Roadmap */}
        <LimitationsFuture />

        {/* Frequently Asked Questions (Sensor Tech, Water Quality Standards, Scalability) */}
        <FaqSection />

        {/* 8. Team Work & Suggested Roles */}
        <TeamWork />

        {/* 9. Conclusion & References */}
        <ConclusionReferences onOpenPdf={() => setIsPdfModalOpen(true)} />
      </main>

      {/* Academic Footer */}
      <Footer onOpenPdf={() => setIsPdfModalOpen(true)} />

      {/* Login Credentials Modal (for switching or re-authenticating) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* PDF Modal with Embedded Object & Transcript Fallback */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* Gemini AI Multi-turn Engineering Advisor with Search Grounding */}
      <AiAssistant />
    </div>
  );
}

function MainAppRouter() {
  const { currentUser } = useAuth();

  // ONLY allow access to the website with credentials.
  // Show all the details only after logging in!
  if (!currentUser) {
    return <AuthGate />;
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppRouter />
    </AuthProvider>
  );
}
