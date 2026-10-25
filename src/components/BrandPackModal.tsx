import React, { useState } from 'react';
import { Logo } from './Logo';
import { X, Copy, Check, Download, Sparkles, Smartphone, CreditCard, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BrandPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandPackModal: React.FC<BrandPackModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const svgCode = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ttsBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0B192C"/>
      <stop offset="100%" stopColor="#1E3E62"/>
    </linearGradient>
    <linearGradient id="ttsCyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#06B6D4"/>
      <stop offset="100%" stopColor="#38BDF8"/>
    </linearGradient>
    <linearGradient id="ttsAmberAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F59E0B"/>
      <stop offset="100%" stopColor="#D97706"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="92" height="92" rx="22" fill="url(#ttsBgGrad)" stroke="#0891B2" stroke-width="2"/>
  <path d="M16 30H28L36 38" stroke="#06B6D4" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
  <circle cx="16" cy="30" r="2.5" fill="#38BDF8"/>
  <path d="M84 70H72L64 62" stroke="#06B6D4" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
  <circle cx="84" cy="70" r="2.5" fill="#38BDF8"/>
  <rect x="24" y="24" width="52" height="34" rx="4" fill="#030712" stroke="url(#ttsCyanGlow)" stroke-width="2"/>
  <path d="M18 61C18 59.8954 18.8954 59 20 59H80C81.1046 59 82 59.8954 82 61L86 67C86 68.6569 84.6569 70 83 70H17C15.3431 70 14 68.6569 14 67L18 61Z" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
  <rect x="42" y="61" width="16" height="3" rx="1.5" fill="url(#ttsAmberAccent)"/>
  <path d="M30 31H38M34 31V48" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M45 29H55M50 29V50" stroke="url(#ttsAmberAccent)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M68 34C67 32 64.5 31 62 31C59.5 31 58 32.5 58 34.5C58 37 60 38 63 39.5C66.5 41 68 42.5 68 45C68 47.5 66 49 63 49C60 49 58 47.5 57 45.5" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="50" cy="51" r="1.5" fill="#F59E0B"/>
</svg>`;

  const handleCopySVG = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    showToast('SVG vector logo code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tamil-tech-solutions-logo.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Tamil Tech Solutions logo downloaded', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Tamil Tech Solutions – Official Brand Assets</h3>
              <p className="text-xs text-slate-300">Original TTS Monogram & Laptop Tech Identity Pack</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Logo Showcase Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Background Version */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center gap-3 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Light Theme / Invoices / Stationery</span>
              <Logo variant="full" size="lg" theme="light" />
            </div>

            {/* Dark Background Version */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center gap-3 shadow-inner">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dark Theme / Social Media / Digital</span>
              <Logo variant="full" size="lg" theme="dark" />
            </div>
          </div>

          {/* Real-World Application Previews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* WhatsApp Business Avatar */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-3">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Business Profile</span>
              </div>
              <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center p-2 shadow-md">
                <Logo variant="icon-only" size="md" />
              </div>
              <span className="mt-3 text-xs font-bold text-slate-800">Tamil Tech Solutions</span>
              <span className="text-[10px] text-emerald-600 font-medium">Verified IT Business Account</span>
            </div>

            {/* Visiting Card Preview */}
            <div className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col justify-between shadow-md">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 mb-2">
                <CreditCard className="w-4 h-4" />
                <span>Visiting Card (Front Preview)</span>
              </div>
              <Logo variant="compact" size="sm" theme="dark" />
              <div className="mt-4 pt-2 border-t border-slate-700 text-[10px] text-slate-300">
                <p className="font-semibold text-amber-400">Chennai · Villupuram · Kallakurichi · Salem</p>
                <p className="text-slate-400">Sales · Service · Refurbished · IT Support</p>
              </div>
            </div>

            {/* Social Media Banner / Square */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center text-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                <Share2 className="w-4 h-4 text-cyan-600" />
                <span>Social Media & Icons</span>
              </div>
              <Logo variant="icon-only" size="lg" />
              <div className="mt-2 text-center">
                <span className="text-xs font-bold text-slate-800">TTS Tech Emblem</span>
                <p className="text-[11px] text-slate-500">512×512 HD Icon Ready</p>
              </div>
            </div>
          </div>

          {/* Color Palette Information */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Official Brand Color Palette</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#0B192C] border border-slate-300 shadow-xs" />
                <div>
                  <p className="font-bold text-slate-900">Navy Blue</p>
                  <p className="font-mono text-[10px] text-slate-500">#0B192C</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#06B6D4] border border-slate-300 shadow-xs" />
                <div>
                  <p className="font-bold text-slate-900">Cyan Blue</p>
                  <p className="font-mono text-[10px] text-slate-500">#06B6D4</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#F59E0B] border border-slate-300 shadow-xs" />
                <div>
                  <p className="font-bold text-slate-900">Accent Amber</p>
                  <p className="font-mono text-[10px] text-slate-500">#F59E0B</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-300 shadow-xs" />
                <div>
                  <p className="font-bold text-slate-900">Clean White</p>
                  <p className="font-mono text-[10px] text-slate-500">#FFFFFF</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions: Copy SVG & Download */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Clean scalable vector SVG format for billboards, stamps, web, and printing.
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopySVG}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied SVG!' : 'Copy SVG Code'}</span>
              </button>
              <button
                onClick={handleDownloadSVG}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download SVG File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
