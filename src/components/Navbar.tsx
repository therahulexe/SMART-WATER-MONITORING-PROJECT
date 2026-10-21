import React from 'react';
import { Droplet, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenPdf: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf, activeSection }) => {
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'simulator', label: 'Flow Simulator' },
    { id: 'warning-levels', label: 'Warning Levels' },
    { id: 'faq', label: 'FAQ' },
    { id: 'sdg-benefits', label: 'Team & SDGs' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-slate-900 hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shadow-xs">
            <Droplet className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-cyan-700 transition-colors">
            Smart Water Monitor
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 font-mono">
            CIV104 Guide
          </span>
        </a>

        {/* Zone 2: 4–5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSection === link.id ? 'text-cyan-700 font-semibold' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPdf}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="View original PDF report"
          >
            <FileText className="w-3.5 h-3.5 text-slate-700" />
            <span>View PDF Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
