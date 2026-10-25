import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, ShoppingBag, Laptop, Building2, Monitor, ArrowRight, 
  MapPin, CheckCircle2, ShieldAlert, Sparkles, MessageSquare, ExternalLink, Cpu, HelpCircle
} from 'lucide-react';
import { TrackEnquirySection } from '../components/TrackEnquirySection';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { setCurrentPage, openEnquiryModal, contactConfig } = useApp();

  const handleWhatsAppHero = () => {
    const url = buildWhatsAppUrl(contactConfig.whatsappNumber, getPreFilledWhatsAppMessage('general'));
    window.open(url, '_blank');
  };

  const services = [
    {
      id: 'repair',
      icon: Wrench,
      title: 'Laptop & Desktop Repair',
      desc: 'Hardware diagnosis, motherboard troubleshooting, display/keyboard replacement, thermal servicing, and OS installations.',
      page: 'services' as const,
      category: 'Laptop & Desktop Repair' as const
    },
    {
      id: 'buysell',
      icon: ShoppingBag,
      title: 'Laptop Buy & Sell',
      desc: 'Sell your pre-owned laptop for a fair evaluation, or browse thoroughly tested machines for home, study, and office.',
      page: 'buysell' as const,
      category: 'Laptop Purchase' as const
    },
    {
      id: 'refurbished',
      icon: Laptop,
      title: 'Refurbished & Pre-Owned Laptops',
      desc: 'Tested enterprise-grade business laptops (Dell Latitude, ThinkPad, HP EliteBook) delivering premium speed at budget-friendly prices.',
      page: 'buysell' as const,
      category: 'Refurbished Laptop Enquiry' as const
    },
    {
      id: 'bulk',
      icon: Building2,
      title: 'Corporate & Bulk Laptop Supply',
      desc: 'Bulk computer supply for IT offices, schools, colleges, and commercial setups with structured quotes and custom specifications.',
      page: 'buysell' as const,
      category: 'Corporate Bulk Supply' as const
    },
    {
      id: 'it-support',
      icon: Monitor,
      title: 'Home & Office IT Support',
      desc: 'Comprehensive computer setup, Wi-Fi networking, shared printer configuration, data backup assistance, and troubleshooting.',
      page: 'services' as const,
      category: 'Home & Office IT Support' as const
    }
  ];

  const reasons = [
    {
      title: 'Affordable & Transparent Pricing',
      desc: 'Clear quotations without hidden repair markups. We communicate component costs and labor openly.'
    },
    {
      title: 'Solutions for Individuals & Businesses',
      desc: 'From a single student looking for a study laptop to companies outfitting a 30-seat office.'
    },
    {
      title: 'Single-Piece & Bulk Laptop Orders',
      desc: 'Flexible purchasing whether you need just one refurbished unit or dozens for office deployment.'
    },
    {
      title: 'Support for Home & Office Users',
      desc: 'Practical assistance for network setups, printer drivers, OS crashes, and slow performance.'
    },
    {
      title: 'Assistance with New, Refurbished & Pre-Owned',
      desc: 'Objective recommendations matching your real budget rather than pushing high-margin brand new models.'
    },
    {
      title: 'Enquiry Tracking & Easy Communication',
      desc: 'Unique tracking ID for every request, transparent timeline updates, and direct WhatsApp contact.'
    }
  ];

  const locations = [
    {
      city: 'Chennai',
      type: 'Headquarters & Hub',
      coverage: 'Anna Nagar workshop & service center. On-site IT repairs, refurbished stock hub, and bulk supply across Greater Chennai.'
    },
    {
      city: 'Villupuram',
      type: 'District Center',
      coverage: 'Complete desktop/laptop troubleshooting, student laptops, printer & network setups.'
    },
    {
      city: 'Kallakurichi',
      type: 'Regional Center',
      coverage: 'Home visits upon appointment, hardware diagnosis, and refurbished laptop delivery.'
    },
    {
      city: 'Salem',
      type: 'Western Hub',
      coverage: 'Commercial IT assistance, small business computer maintenance, and bulk hardware supply.'
    }
  ];

  const isMapsPlaceholder = contactConfig.googleMapsUrl === '[YOUR GOOGLE MAPS LINK]' || !contactConfig.googleMapsUrl;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B192C] via-[#0E2440] to-[#071324] text-white pt-20 pb-24 overflow-hidden border-b border-cyan-950">
        {/* Subtle Tech Circuit Grid Background Graphic */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Tagline / Kicker without static pill enclosure */}
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Tamil Nadu IT Partner</span>
              <span className="text-slate-500">/</span>
              <span>Chennai · Villupuram · Kallakurichi · Salem</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Complete Laptop &amp; Desktop Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">Under One Roof</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              From laptop repairs and refurbished computers to corporate bulk supply and home or office IT support, Tamil Tech Solutions provides practical and affordable technology solutions.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-900/30 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('buysell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-sm rounded-xl border border-slate-700 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Buy or Sell a Laptop</span>
              </button>

              <button
                onClick={handleWhatsAppHero}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
                <span>Contact Us on WhatsApp</span>
              </button>
            </div>

            {/* Quiet reassurance bar */}
            <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Transparent Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Live Ticket Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Tested Quality Parts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Categories (5 attractive service cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-700 mb-2">Our Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Computer Services
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Professional assistance tailored to individuals, students, home offices, and corporate organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-xl hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentPage(item.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-cyan-700 transition-colors flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                  </button>

                  <button
                    onClick={() => openEnquiryModal(item.category)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Tamil Tech Solutions? */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase block mb-2">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Why Choose Tamil Tech Solutions?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              We stand for honest evaluations, transparent technical advice, and practical solutions without exaggerated claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">{r.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 text-xs text-slate-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Owner Assurance Policy:</strong> We do not make false warranty or turnaround time claims. Every quote and timeframe is shared transparently after physical device diagnosis.
            </span>
          </div>
        </div>
      </section>

      {/* Service Locations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-700 mb-2">Tamil Nadu Footprint</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Service Locations
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Active technical services, repair pickups, and delivery across key Tamil Nadu districts.
            </p>
          </div>

          <div>
            {isMapsPlaceholder ? (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Google Maps Location: [YOUR GOOGLE MAPS LINK]</span>
              </div>
            ) : (
              <a
                href={contactConfig.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Verified Business Location on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-cyan-50 text-cyan-700 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{loc.type}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{loc.city}</h3>
                <p className="text-[11px] text-cyan-700 font-semibold mb-3">Tamil Nadu, India</p>
                <p className="text-xs text-slate-600 leading-relaxed">{loc.coverage}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEnquiryModal('Laptop & Desktop Repair', `Enquiry for ${loc.city} branch`)}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 transition-colors"
                >
                  <span>Book Service in {loc.city}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Service Coverage Note:</strong> On-site technician visits are scheduled based on location distance and appointment confirmation. Outstation delivery is supported for refurbished laptops.
          </span>
        </div>
      </section>

      {/* Embedded Customer Enquiry Tracking Section */}
      <TrackEnquirySection />

      {/* Bottom Conversion CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-[#0B192C] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Need Quick Assistance?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Talk directly with Tamil Tech Solutions today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you need urgent laptop repair, want to enquire about refurbished ThinkPad stock, or need a corporate bulk quotation, we are ready to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => openEnquiryModal()}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors text-center"
            >
              Submit Service Request
            </button>
            <button
              onClick={handleWhatsAppHero}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              <span>WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
