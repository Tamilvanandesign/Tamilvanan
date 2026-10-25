import React from 'react';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { MapPin, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenGoogleSitesGuide: () => void;
  onOpenBrandPack: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyPolicy,
  onOpenGoogleSitesGuide,
  onOpenBrandPack,
}) => {
  const { setCurrentPage, contactConfig } = useApp();

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(contactConfig.whatsappNumber, getPreFilledWhatsAppMessage('general'));
    window.open(url, '_blank');
  };

  const isMapsPlaceholder = contactConfig.googleMapsUrl === '[YOUR GOOGLE MAPS LINK]' || !contactConfig.googleMapsUrl;

  return (
    <footer className="bg-[#0B192C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" theme="dark" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Tamil Tech Solutions provides reliable, practical, and affordable laptop and desktop repair, refurbished computer sales, corporate bulk supply, and home/office IT support across Tamil Nadu.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="text-cyan-400 font-semibold">Service Coverage:</span>
              <span>Chennai</span>
              <span>·</span>
              <span>Villupuram</span>
              <span>·</span>
              <span>Kallakurichi</span>
              <span>·</span>
              <span>Salem</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Business</span>
              </button>
              <button
                onClick={onOpenBrandPack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Brand Identity</span>
              </button>
            </div>
          </div>

          {/* Column 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-500" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-500" /> IT Services & Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('buysell')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-500" /> Buy & Sell Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-500" /> About Tamil Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-500" /> Contact & Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Owner Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Offerings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Laptop & Desktop Repair</li>
              <li>• Refurbished Laptops (Tested)</li>
              <li>• Used Laptop Buy & Exchange</li>
              <li>• Corporate Bulk IT Supply</li>
              <li>• Home & Office IT Network Setup</li>
              <li>• SSD & RAM Performance Upgrades</li>
              <li>• OS & Software Troubleshooting</li>
            </ul>
          </div>

          {/* Column 5: Business Contact Placeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <div className="space-y-2.5 text-xs">
              {/* WhatsApp */}
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">WhatsApp</p>
                  <button
                    onClick={handleWhatsApp}
                    className="text-cyan-400 hover:underline font-mono text-[11px]"
                  >
                    {contactConfig.whatsappNumber}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Email</p>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-slate-300 hover:text-cyan-400 break-all font-mono text-[11px]"
                  >
                    {contactConfig.email}
                  </a>
                </div>
              </div>

              {/* Business Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Business Address</p>
                  <p className="text-slate-300 text-[11px] leading-tight font-mono">
                    {contactConfig.address}
                  </p>
                </div>
              </div>

              {/* Google Maps Link */}
              <div className="pt-1">
                {isMapsPlaceholder ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Maps: [YOUR GOOGLE MAPS LINK]</span>
                  </span>
                ) : (
                  <a
                    href={contactConfig.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open Verified Google Maps Location</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Tamil Tech Solutions. All rights reserved.</p>
            <p className="text-[11px] text-slate-600">
              Serving Chennai, Villupuram, Kallakurichi, and Salem, Tamil Nadu, India.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-slate-300 transition-colors underline"
            >
              Privacy Policy & Terms
            </button>
            <span>·</span>
            <button
              onClick={onOpenGoogleSitesGuide}
              className="hover:text-slate-300 transition-colors"
            >
              Google Sites Setup Guide
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-amber-400 transition-colors"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
