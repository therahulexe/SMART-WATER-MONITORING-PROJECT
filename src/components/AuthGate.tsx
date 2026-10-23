import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Droplet,
  Lock,
  Mail,
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';

export const AuthGate: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const result = login(email, password);
    if (!result.success) {
      setErrorMsg(result.error || 'Invalid credentials. Access denied.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white flex flex-col justify-between p-4 sm:p-6 md:p-10">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <img
            src="/nmit-logo.jpeg"
            alt="NMIT Logo"
            className="h-12 sm:h-14 w-auto object-contain rounded-xl bg-white p-1 border border-slate-700 shadow-md hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-bold text-base sm:text-lg text-white tracking-tight block">
              NMIT Water Monitoring System
            </span>
            <span className="text-xs text-cyan-300 font-medium">
              Environmental Science &amp; Sustainability
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Restricted Portal</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md mx-auto w-full my-auto py-12">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
          {/* Card Header */}
          <div className="space-y-3 text-center">
            <div className="w-32 h-24 sm:w-36 sm:h-28 rounded-2xl bg-white border border-slate-300 p-2.5 flex items-center justify-center mx-auto shadow-lg hover:scale-105 transition-transform duration-200">
              <img
                src="/nmit-logo.jpeg"
                alt="NMIT Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                NMIT Water Portal Sign In
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto mt-1">
                Please enter your authorized institutional credentials to view telemetry streams and system controls.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Private Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="user-email"
                className="text-xs text-slate-300 font-semibold block mb-1.5"
              >
                Institutional Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="user-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@nmit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="user-password"
                  className="text-xs text-slate-300 font-semibold"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="user-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm mt-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            Encrypted session · System telemetry protected by role-based access control
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        NMIT Environmental Science and Sustainability · Engineering Implementation Guide
      </div>
    </div>
  );
};
