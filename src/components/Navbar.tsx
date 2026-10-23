import React, { useState } from 'react';
import { Droplet, FileText, User, ShieldCheck, LogOut, ChevronDown, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenPdf: () => void;
  onOpenLogin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf, onOpenLogin, activeSection }) => {
  const { currentUser, role, logout, switchRole } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const baseLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'simulator', label: 'Flow Simulator' },
    { id: 'warning-levels', label: 'Warning Levels' },
    { id: 'faq', label: 'FAQ' },
    { id: 'sdg-benefits', label: 'Team & SDGs' }
  ];

  // Insert role-specific interface shortcut if logged in
  const navLinks = [
    ...(role === 'admin' ? [{ id: 'admin-console', label: 'Admin Console' }] : []),
    ...(role === 'user' ? [{ id: 'user-portal', label: 'My Portal' }] : []),
    ...baseLinks
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with NMIT Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 group"
        >
          <img
            src="/nmit-logo.jpeg"
            alt="NMIT Logo"
            className="h-11 sm:h-12 w-auto object-contain rounded-lg border border-slate-200/90 bg-white p-1 shadow-xs transition-transform duration-200 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
              NMIT Water Monitor
            </span>
            <span className="hidden sm:inline text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              Implementation Guide
            </span>
          </div>
        </a>

        {/* Zone 2: Single-line clean text links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isRoleTab = link.id === 'admin-console' || link.id === 'user-portal';
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isRoleTab
                    ? role === 'admin'
                      ? 'text-indigo-700 font-bold flex items-center gap-1.5'
                      : 'text-sky-700 font-bold flex items-center gap-1.5'
                    : activeSection === link.id
                    ? 'text-sky-700 font-semibold'
                    : ''
                }`}
              >
                {link.id === 'admin-console' && <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />}
                {link.id === 'user-portal' && <User className="w-3.5 h-3.5 text-sky-700" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Account Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Role Status or Sign In Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  role === 'admin'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
                    : 'bg-sky-50 border-sky-200 text-sky-900 hover:bg-sky-100'
                }`}
              >
                {role === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                ) : (
                  <User className="w-3.5 h-3.5 text-sky-700" />
                )}
                <span className="max-w-[110px] truncate hidden sm:inline">
                  {currentUser.name}
                </span>
                <span className="font-mono uppercase text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/80">
                  {role}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-2 text-xs text-slate-700 space-y-1 z-50">
                  <div className="px-2 py-1.5 border-b border-slate-100">
                    <span className="font-bold text-slate-900 block truncate">{currentUser.name}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{currentUser.email}</span>
                  </div>

                  <div className="pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                    Switch Interface Mode
                  </div>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsDropdownOpen(false);
                      scrollTo('admin-console');
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      role === 'admin' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                      <span>Admin Console</span>
                    </span>
                    {role === 'admin' && <span className="text-[10px] text-indigo-700 font-mono">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('user');
                      setIsDropdownOpen(false);
                      scrollTo('user-portal');
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      role === 'user' ? 'bg-cyan-50 font-bold text-cyan-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Resident Portal</span>
                    </span>
                    {role === 'user' && <span className="text-[10px] text-cyan-700 font-mono">Active</span>}
                  </button>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out &amp; Lock System</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-700" />
              <span>Log In</span>
              <span className="text-[10px] font-mono text-cyan-700 hidden sm:inline">(User / Admin)</span>
            </button>
          )}

          {/* View PDF Button */}
          <button
            onClick={onOpenPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            aria-label="View original PDF report"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">PDF Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
