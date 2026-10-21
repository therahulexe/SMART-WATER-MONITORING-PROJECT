/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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
import { AiAssistant } from './components/AiAssistant';

export default function App() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'architecture',
        'simulator',
        'warning-levels',
        'sdg-benefits',
        'faq'
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
        activeSection={activeSection}
      />

      <main className="flex-1">
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
