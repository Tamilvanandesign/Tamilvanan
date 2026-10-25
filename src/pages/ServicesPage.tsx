import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, Monitor, Building2, Laptop, CheckCircle2, ArrowRight, 
  MessageSquare, HardDrive, ShieldCheck, Cpu, Wifi, Printer, RefreshCw, FileText
} from 'lucide-react';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const ServicesPage: React.FC = () => {
  const { openEnquiryModal, contactConfig } = useApp();

  const handleWhatsApp = (topic: 'repair' | 'support' | 'bulk' | 'refurbished', detail: string) => {
    const text = getPreFilledWhatsAppMessage(topic, detail);
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, text), '_blank');
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full mb-3">
          <Wrench className="w-3.5 h-3.5 text-cyan-700" />
          <span>Professional IT Engineering & Repair</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Comprehensive Services & IT Support
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          From micro-soldering motherboard diagnostics to high-speed NVMe SSD upgrades, office network deployments, and certified refurbished systems across Chennai, Villupuram, Kallakurichi, and Salem.
        </p>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category A: Laptop & Desktop Repair */}
        <section id="laptop-repair" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-cyan-400 flex items-center justify-center shrink-0 shadow-md">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Category A</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Laptop &amp; Desktop Repair Services
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Comprehensive hardware diagnostics, physical repairs, and operating system troubleshooting.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openEnquiryModal('Laptop & Desktop Repair', 'General Laptop/Desktop repair diagnosis request')}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
              >
                Request a Service
              </button>
              <button
                onClick={() => handleWhatsApp('repair', 'Laptop & Desktop Repair')}
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Offerings list */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Cpu className="w-4 h-4 text-cyan-600" />
                <span>Hardware Diagnosis</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thorough bench testing for power failure, no-display issues, intermittent freezing, and motherboard component faults.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <HardDrive className="w-4 h-4 text-cyan-600" />
                <span>RAM &amp; SSD Upgrades</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transform sluggish computers with fast NVMe/SATA SSDs and DDR4/DDR5 RAM expansion for immediate 5x–10x speed boost.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Monitor className="w-4 h-4 text-cyan-600" />
                <span>Display &amp; Parts Repair</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replacement of broken laptop LCD/LED screens, unresponsive keyboards, weak batteries, trackpads, and cooling fans where supported.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>OS &amp; Malware Recovery</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Genuine OS installation, driver updates, virus & malware cleaning, and preliminary data backup & recovery assessment.
              </p>
            </div>
          </div>
        </section>

        {/* Category B: Home & Office IT Support */}
        <section id="office-it-support" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center shrink-0 shadow-md">
                <Monitor className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Category B</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Home &amp; Office IT Support
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  On-site and remote setup for computers, printers, network routers, and office software.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openEnquiryModal('Home & Office IT Support', 'Home or Office IT assistance request')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
              >
                Request a Service
              </button>
              <button
                onClick={() => handleWhatsApp('support', 'Home & Office IT Support')}
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Laptop className="w-4 h-4 text-teal-600" />
                <span>Computer Setup</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fresh PC unboxing, system configuration, user profiles, bloatware removal, and essential work software installation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Printer className="w-4 h-4 text-teal-600" />
                <span>Printer Installation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wired USB and wireless Wi-Fi printer installation, multi-system network spooler sharing, and scanner driver troubleshooting.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Wifi className="w-4 h-4 text-teal-600" />
                <span>Wi-Fi &amp; Networking</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Router configuration, mesh Wi-Fi extensions, LAN cable crimping, IP conflicts, and reliable internet connectivity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <RefreshCw className="w-4 h-4 text-teal-600" />
                <span>Remote / On-site Help</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Remote desktop troubleshooting where suitable, or scheduled on-site visits across Chennai, Villupuram, Kallakurichi, and Salem.
              </p>
            </div>
          </div>
        </section>

        {/* Category C: Corporate IT Support */}
        <section id="corporate-it" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-indigo-400 flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Category C</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Corporate IT Support &amp; Maintenance
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Reliable IT infrastructure maintenance, desktop deployment, and office support plans.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openEnquiryModal('Corporate Bulk Supply', 'Corporate IT support & AMC quotation')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
              >
                Request a Service
              </button>
              <button
                onClick={() => handleWhatsApp('bulk', 'Corporate IT Support')}
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 mb-2">Business Computer Maintenance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Preventative maintenance, hardware health audits, thermal cleaning, and OS patch management to reduce employee downtime.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 mb-2">Workstation Deployment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized OS imaging, software provisioning, and desk setups for onboarding new team members smoothly.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 mb-2">Support Plans &amp; Custom Quotations</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flexible scheduled maintenance proposals and tailored service level quotations designed for growing Tamil Nadu businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Category D: Refurbished & Pre-Owned Laptop Services */}
        <section id="refurbished-services" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                <Laptop className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Category D</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Refurbished &amp; Pre-Owned Laptop Services
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Strict multi-point hardware inspection, testing, and performance optimization before handover.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openEnquiryModal('Refurbished Laptop Enquiry', 'Refurbished laptop stock and pricing request')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
              >
                Request a Service
              </button>
              <button
                onClick={() => handleWhatsApp('refurbished', 'Available Refurbished Stock')}
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">1. Rigorous Inspection</p>
              <p className="text-slate-600">Motherboard health check, stress tests, keyboard key tester, and battery cycle analysis.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">2. Transparent Grading</p>
              <p className="text-slate-600">Accurate description of cosmetic condition, ports, and display condition with no deceptive editing.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">3. Custom Upgrades</p>
              <p className="text-slate-600">Option to customize SSD size (256GB / 512GB / 1TB) and RAM (8GB / 16GB / 32GB) before purchase.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">4. Testing Verification</p>
              <p className="text-slate-600">Testing warranty as per seller inspection note, giving customers confidence in their investment.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
