import React from 'react';
import { Droplet, FileText, ArrowUp } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

interface FooterProps {
  onOpenPdf: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdf }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <img
                src="/nmit-logo.jpeg"
                alt="NMIT Logo"
                className="h-10 sm:h-11 w-auto object-contain rounded-lg bg-white p-1 shadow-xs hover:scale-105 transition-transform"
              />
              <span>{PROJECT_METADATA.title}</span>
            </div>
            <p className="text-xs text-slate-400">
              {PROJECT_METADATA.courseName} · {PROJECT_METADATA.assignment}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenPdf}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Original PDF Report</span>
            </button>
            <span className="text-slate-700">·</span>
            <a
              href="#simulator"
              className="hover:text-white transition-colors"
            >
              Interactive Simulator
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="#warning-levels"
              className="hover:text-white transition-colors"
            >
              Warning Levels
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="#faq"
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Group Members: Rahul (Admin &amp; Lead Developer), Sushanth, Rohan, Jilani, Adthiya, Soyug
          </div>
          <div>
            Supports UN SDG 6: Clean Water and Sanitation &amp; SDG 11: Sustainable Cities
          </div>
        </div>
      </div>
    </footer>
  );
};
