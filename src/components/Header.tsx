import React, { useState } from 'react';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { MessageSquare, Search, Menu, X, Shield, Sparkles, Globe, PhoneCall } from 'lucide-react';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

interface HeaderProps {
  onOpenBrandPack: () => void;
  onOpenGoogleSitesGuide: () => void;
  onScrollToTracking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBrandPack,
  onOpenGoogleSitesGuide,
  onScrollToTracking,
}) => {
  const { currentPage, setCurrentPage, contactConfig } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'buysell', label: 'Buy & Sell' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackClick = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        onScrollToTracking();
      }, 150);
    } else {
      onScrollToTracking();
    }
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const url = buildWhatsAppUrl(contactConfig.whatsappNumber, getPreFilledWhatsAppMessage('general'));
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0B192C] text-white border-b border-slate-800 shadow-md">
      {/* Top Utility Bar for Service Hub Locations & Quick Action Tools */}
      <div className="hidden lg:block bg-[#07111E] text-slate-400 border-b border-slate-800/80 text-[11px] py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-300 font-semibold">Service Hubs:</span>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-medium">Chennai</span>
              <span>·</span>
              <span className="text-cyan-400 font-medium">Villupuram</span>
              <span>·</span>
              <span className="text-cyan-400 font-medium">Kallakurichi</span>
              <span>·</span>
              <span className="text-cyan-400 font-medium">Salem</span>
              <span className="text-slate-500">(Tamil Nadu)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBrandPack}
              className="text-slate-300 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Official TTS Logo & Brand Pack</span>
            </button>
            <span>|</span>
            <button
              onClick={onOpenGoogleSitesGuide}
              className="text-slate-300 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Google Sites Blueprint & Free Hosting</span>
            </button>
            <span>|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Owner Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none"
        >
          <Logo variant="full" theme="dark" size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1 focus:outline-none ${
                  isActive ? 'text-cyan-400' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className="hidden md:flex items-center gap-3">
          {/* Track Your Enquiry Link */}
          <button
            onClick={handleTrackClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/80 rounded-lg transition-colors shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Your Enquiry</span>
          </button>

          {/* WhatsApp Us CTA Button */}
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 text-slate-950 fill-current" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleTrackClick}
            className="p-2 text-cyan-400 hover:bg-slate-800 rounded-lg"
            title="Track Enquiry"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  currentPage === item.id
                    ? 'bg-cyan-950/70 text-cyan-400 border border-cyan-800/50'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {currentPage === item.id && <span className="text-cyan-400">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={handleTrackClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-lg text-xs font-bold"
            >
              <Search className="w-4 h-4" />
              <span>Track Your Enquiry Status</span>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Contact Us on WhatsApp</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-1 text-[11px] text-slate-400">
            <button
              onClick={() => {
                onOpenBrandPack();
                setMobileMenuOpen(false);
              }}
              className="py-1 text-left hover:text-cyan-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>TTS Brand Logo & Vector Pack</span>
            </button>

            <button
              onClick={() => {
                onOpenGoogleSitesGuide();
                setMobileMenuOpen(false);
              }}
              className="py-1 text-left hover:text-cyan-300 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Sites Compatibility Guide</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="py-1 text-left hover:text-amber-400 flex items-center gap-1.5 text-slate-300"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
