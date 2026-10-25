import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BrandPackModal } from './components/BrandPackModal';
import { GoogleSitesGuideModal } from './components/GoogleSitesGuideModal';
import { EnquiryModal } from './components/EnquiryModal';
import { PrivacyPolicyModal } from './pages/PrivacyPolicyModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { BuySellPage } from './pages/BuySellPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './components/AdminPortal';
import { CheckCircle2, AlertCircle, Info, Sparkles, Globe } from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentPage, toast } = useApp();

  const [isBrandPackOpen, setIsBrandPackOpen] = useState(false);
  const [isGoogleSitesGuideOpen, setIsGoogleSitesGuideOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const scrollToTracking = () => {
    const el = document.getElementById('tracking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-bold ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-200 border-emerald-800'
                : toast.type === 'error'
                ? 'bg-red-950 text-red-200 border-red-800'
                : 'bg-slate-950 text-cyan-300 border-slate-800'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenBrandPack={() => setIsBrandPackOpen(true)}
        onOpenGoogleSitesGuide={() => setIsGoogleSitesGuideOpen(true)}
        onScrollToTracking={scrollToTracking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'buysell' && <BuySellPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && <AdminPortal />}
      </main>

      {/* Persistent Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenGoogleSitesGuide={() => setIsGoogleSitesGuideOpen(true)}
        onOpenBrandPack={() => setIsBrandPackOpen(true)}
      />

      {/* Interactive Global Modals */}
      <BrandPackModal
        isOpen={isBrandPackOpen}
        onClose={() => setIsBrandPackOpen(false)}
      />

      <GoogleSitesGuideModal
        isOpen={isGoogleSitesGuideOpen}
        onClose={() => setIsGoogleSitesGuideOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <EnquiryModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
