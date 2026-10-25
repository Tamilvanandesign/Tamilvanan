import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, Mail, MessageSquare, MapPin, ExternalLink, Send, 
  CheckCircle2, Clock, ShieldCheck, AlertCircle, Laptop, Settings
} from 'lucide-react';
import { ServiceType } from '../types';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { contactConfig, addEnquiry, showToast, setCurrentPage } = useApp();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    location: 'Chennai',
    serviceType: 'Laptop & Desktop Repair' as ServiceType,
    preferredContact: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email',
    message: ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.message.trim()) {
      showToast('Please fill in your name, mobile number, and enquiry details.', 'error');
      return;
    }

    const cleanMobile = form.mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    const newEnquiry = addEnquiry({
      customerName: form.name.trim(),
      mobileNumber: cleanMobile,
      email: form.email.trim() || undefined,
      location: form.location,
      serviceType: form.serviceType,
      preferredContact: form.preferredContact,
      description: form.message.trim()
    });

    setSubmittedId(newEnquiry.id);
  };

  const handleWhatsAppDirect = () => {
    const text = getPreFilledWhatsAppMessage('general');
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, text), '_blank');
  };

  const handleWhatsAppHandoff = () => {
    if (!submittedId) return;
    const msg = `Hello Tamil Tech Solutions! I submitted a contact enquiry online.
Enquiry ID: ${submittedId}
Name: ${form.name}
Service: ${form.serviceType}
Location: ${form.location}
Message: ${form.message}`;
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, msg), '_blank');
  };

  const isMapsPlaceholder = contactConfig.googleMapsUrl === '[YOUR GOOGLE MAPS LINK]' || !contactConfig.googleMapsUrl;
  const isPhonePlaceholder = contactConfig.phoneNumber === '[YOUR PHONE NUMBER]' || !contactConfig.phoneNumber;

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-700 mb-2">
          Get in Touch
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Tamil Tech Solutions
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          We welcome your enquiries for laptop &amp; desktop repairs, refurbished computer requirements, trade-in valuations, and corporate IT support across Tamil Nadu.
        </p>
      </section>

      {/* Main Contact Grid: Details + Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Methods & Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Cards */}
            <div className="bg-[#0B192C] text-white p-7 rounded-3xl shadow-lg space-y-6">
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">Direct Communication</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect via WhatsApp or email for immediate quotes and service scheduling.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#25D366]/20 text-emerald-400 rounded-xl shrink-0">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">WhatsApp Business</p>
                    <p className="text-[11px] text-slate-400">Primary instant response channel</p>
                    <p className="font-mono text-cyan-400 font-bold mt-1 text-xs">
                      {contactConfig.whatsappNumber}
                    </p>
                    <button
                      onClick={handleWhatsAppDirect}
                      className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                    >
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Phone Call */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                  <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">Telephone Call</p>
                    <p className="text-[11px] text-slate-400">Voice consultation &amp; appointment</p>
                    <p className="font-mono text-slate-300 font-bold mt-1 text-xs">
                      {contactConfig.phoneNumber}
                    </p>
                    {!isPhonePlaceholder && (
                      <a
                        href={`tel:${contactConfig.phoneNumber}`}
                        className="mt-2 inline-block text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                      >
                        Click to Call
                      </a>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">Business Email</p>
                    <p className="text-[11px] text-slate-400">For quotations &amp; corporate RFPs</p>
                    <p className="font-mono text-slate-300 font-bold mt-1 text-xs break-all">
                      {contactConfig.email}
                    </p>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="mt-2 inline-block text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Click to Send Email
                    </a>
                  </div>
                </div>

                {/* Business Address */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">Business Address</p>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed font-mono">
                      {contactConfig.address}
                    </p>
                    <div className="mt-2">
                      {isMapsPlaceholder ? (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Map Location: [YOUR GOOGLE MAPS LINK]
                        </span>
                      ) : (
                        <a
                          href={contactConfig.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Hubs Notice */}
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Regional Service Locations
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-cyan-800">
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Chennai</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Villupuram</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Kallakurichi</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Salem</span>
              </div>
              <div className="pt-2 text-slate-600 leading-relaxed border-t border-slate-200 text-[11px]">
                <strong>Important Note:</strong> On-site visits and physical hardware service availability depend on location and prior appointment confirmation.
              </div>
            </div>
          </div>

          {/* Right Column: Customer Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Send a Service Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill in your details below to generate a tracked service enquiry. Our team will review and reply with options.
                </p>
              </div>

              {submittedId ? (
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Enquiry Submitted Successfully!</h4>
                  <p className="text-xs text-slate-600">
                    Your unique tracking ID has been created:
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-300 inline-block font-mono font-black text-xl text-cyan-800">
                    {submittedId}
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You can track the live progress of your enquiry anytime on our homepage using this ID and your mobile number.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={handleWhatsAppHandoff}
                      className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Follow Up on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmittedId(null)}
                      className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. K. Sivakumar"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                        10-Digit Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sivakumar@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Service Location <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Villupuram">Villupuram</option>
                        <option value="Kallakurichi">Kallakurichi</option>
                        <option value="Salem">Salem</option>
                        <option value="Other Tamil Nadu">Other Tamil Nadu District</option>
                      </select>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Service Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value as ServiceType })}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    >
                      <option value="Laptop & Desktop Repair">Laptop & Desktop Repair</option>
                      <option value="Refurbished Laptop Enquiry">Refurbished Laptop Enquiry</option>
                      <option value="Laptop Purchase">Laptop Purchase</option>
                      <option value="Sell or Exchange Laptop">Sell or Exchange Laptop</option>
                      <option value="Corporate Bulk Supply">Corporate Bulk Supply</option>
                      <option value="Home & Office IT Support">Home & Office IT Support</option>
                      <option value="General IT Consultation">General IT Consultation</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setForm({ ...form, preferredContact: method })}
                          className={`py-2 px-2 text-center rounded-xl border font-bold transition-colors ${
                            form.preferredContact === method
                              ? 'bg-cyan-50 border-cyan-500 text-cyan-800'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Describe Your Computer Requirement or Issue <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Dell laptop not turning on, want price for refurbished ThinkPad with 16GB RAM, or require 10 desktop units for office in Villupuram..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Notice */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 leading-normal text-[11px] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                    <span>
                      On-site visits and service availability depend on the location and appointment confirmation.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Customer Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
