import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Lock,
  Mail,
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = login(email, password);
    if (res.success) {
      setIsLoading(false);
      onClose();
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <img
              src="/nmit-logo.jpeg"
              alt="NMIT Logo"
              className="h-12 sm:h-14 w-auto object-contain rounded-xl bg-white p-1 border border-slate-700 shadow-sm hover:scale-105 transition-transform"
            />
            <div>
              <h3 className="font-bold text-base text-white">
                Account Sign In
              </h3>
              <p className="text-xs text-slate-400">
                Authenticate with your authorized institutional account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="modal-email"
                className="text-xs font-semibold text-slate-700 block mb-1.5"
              >
                Institutional Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="modal-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@nmit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-password"
                className="text-xs font-semibold text-slate-700 block mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="modal-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              <span>{isLoading ? 'Verifying...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          NMIT Water Monitoring System · Role-Based Access Control
        </div>
      </div>
    </div>
  );
};
