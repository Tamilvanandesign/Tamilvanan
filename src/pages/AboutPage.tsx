import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { 
  ShieldCheck, CheckCircle2, MapPin, Laptop, HeartHandshake, 
  MessageSquare, Users, Sparkles, ArrowRight 
} from 'lucide-react';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, contactConfig } = useApp();

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(contactConfig.whatsappNumber, getPreFilledWhatsAppMessage('general'));
    window.open(url, '_blank');
  };

  const principles = [
    {
      title: 'Customer-First Technical Guidance',
      desc: 'We explain the real fault in straightforward language so you can make informed decisions rather than guessing.'
    },
    {
      title: 'Transparent Pricing & Diagnostics',
      desc: 'Detailed quotations outlining part replacement costs and labor beforehand. No surprise fees.'
    },
    {
      title: 'Practical, Value-Focused Solutions',
      desc: 'When an inexpensive SSD upgrade or RAM expansion can make your existing laptop 5x faster, we recommend that instead of pressuring you to buy a costly new machine.'
    },
    {
      title: 'Accessible Support Across Tamil Nadu',
      desc: 'Active service coverage connecting Chennai, Villupuram, Kallakurichi, and Salem with convenient pickup, delivery, and communication.'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B192C] via-[#0E2440] to-[#071324] text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block">
              About Our Business
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Tamil Tech Solutions
            </h1>
            <p className="text-cyan-300 font-bold text-base tracking-wide">
              Your Trusted IT Partner
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
              Tamil Tech Solutions is an independent IT services, computer hardware repair, refurbished laptop sales, and corporate technology provider based in Tamil Nadu, serving Chennai, Villupuram, Kallakurichi, and Salem.
            </p>
          </div>

          <div className="shrink-0 p-6 bg-slate-900/80 rounded-2xl border border-slate-700/80 shadow-inner flex flex-col items-center">
            <Logo variant="icon-only" size="xl" />
            <span className="mt-3 text-xs font-mono font-bold text-slate-300">TTS Tech Identity</span>
          </div>
        </div>
      </section>

      {/* Core Mission & Realistic Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Business Focus &amp; Commitment
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              In today's fast-moving digital world, reliable computing technology is essential for students taking online classes, working professionals, and growing commercial enterprises. However, finding transparent laptop repair services, tested refurbished computers with genuine condition reports, and dependable IT support can often be frustrating.
            </p>
            <p>
              <strong>Tamil Tech Solutions</strong> was established to bridge this gap. We provide honest technical assessments, quality parts, and dependable computing systems tailored to your real everyday needs. Whether you bring us a laptop with a failing motherboard, need an office printer and local network configured, or require 20 enterprise laptops for your expanding startup, our focus remains straightforward: practical solutions and open communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 mb-1">Serving Individuals &amp; Students</h4>
              <p className="text-xs text-slate-600">
                Budget laptops, fast SSD upgrades, thermal servicing, and OS installations to keep your studies and remote work running smoothly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 mb-1">Serving Businesses &amp; Offices</h4>
              <p className="text-xs text-slate-600">
                Workstation deployments, corporate bulk laptop supplies, printer sharing, Wi-Fi networks, and preventative computer care.
              </p>
            </div>
          </div>
        </div>

        {/* Core Operating Principles */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-700 mb-1">Our Operating Standards</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">How We Work With You</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{p.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-10">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Realistic Commitment Notice */}
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-300 text-xs text-slate-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Authentic Business Transparency</p>
            <p className="text-slate-600 leading-relaxed">
              We do not fabricate years of history, fake awards, or artificial customer counts. We measure our success solely by delivering dependable computer repairs, tested laptops that perform as described, and respectful service to every client in Chennai, Villupuram, Kallakurichi, and Salem.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
          >
            <span>Get in Touch With Our Team</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </section>
    </div>
  );
};
