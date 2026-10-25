import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, Clock, AlertCircle, Phone, ArrowRight, MessageSquare, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Enquiry, EnquiryStatus } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const TrackEnquirySection: React.FC = () => {
  const { enquiries, getEnquiryByIdAndMobile, getEnquiriesByMobile, contactConfig } = useApp();
  
  const [enquiryId, setEnquiryId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [trackedEnquiry, setTrackedEnquiry] = useState<Enquiry | null>(null);
  const [multipleResults, setMultipleResults] = useState<Enquiry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setErrorMessage('');
    setTrackedEnquiry(null);
    setMultipleResults([]);

    const cleanId = enquiryId.trim();
    const cleanMobile = mobileNumber.replace(/[^0-9]/g, '');

    if (!cleanId && !cleanMobile) {
      setErrorMessage('Please enter either an Enquiry ID (e.g. TTS-2026-1042) or your registered 10-digit mobile number.');
      return;
    }

    if (cleanId && cleanMobile) {
      // Direct 2-factor verification
      const found = getEnquiryByIdAndMobile(cleanId, cleanMobile);
      if (found) {
        setTrackedEnquiry(found);
      } else {
        setErrorMessage(`No record found matching Enquiry ID "${cleanId}" with mobile number "${cleanMobile}". Please verify both entries or contact our support team.`);
      }
    } else if (cleanId && !cleanMobile) {
      // Find by ID, but enforce privacy: prompt for mobile verification!
      const matching = enquiries.find(e => e.id.toUpperCase() === cleanId.toUpperCase());
      if (matching) {
        setErrorMessage(`Enquiry ${cleanId} found. For customer privacy, please enter your registered 10-digit mobile number to view details.`);
      } else {
        setErrorMessage(`Enquiry ID "${cleanId}" not found in our database. Please double-check your ID or try searching with your mobile number.`);
      }
    } else if (!cleanId && cleanMobile) {
      // Search by mobile
      if (cleanMobile.length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      const results = getEnquiriesByMobile(cleanMobile);
      if (results.length === 1) {
        setTrackedEnquiry(results[0]);
      } else if (results.length > 1) {
        setMultipleResults(results);
      } else {
        setErrorMessage(`No enquiries registered with mobile number "${cleanMobile}". If you recently submitted a request, please allow a few minutes or contact support.`);
      }
    }
  };

  const handleSelectFromResult = (enquiry: Enquiry) => {
    setTrackedEnquiry(enquiry);
    setMultipleResults([]);
    setEnquiryId(enquiry.id);
  };

  const handleWhatsAppInquiry = (id: string) => {
    const text = `Hello Tamil Tech Solutions! I am following up on my Enquiry ID: ${id}. Could you please share an update?`;
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, text), '_blank');
  };

  const getStatusColor = (status: EnquiryStatus) => {
    switch (status) {
      case 'Received':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Under Review':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'In Progress':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Waiting for Customer':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Completed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const statusSteps: EnquiryStatus[] = ['Received', 'Under Review', 'In Progress', 'Completed'];

  return (
    <section id="tracking-section" className="py-16 bg-slate-100 border-y border-slate-200 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full mb-3">
            <Search className="w-3.5 h-3.5 text-cyan-700" />
            <span>Real-time Service Tracking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Your Enquiry
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            Check live repair progress, refurbished stock quotations, and bulk IT requests across Chennai, Villupuram, Kallakurichi, and Salem.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Form */}
          <form onSubmit={handleTrack} className="p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Enquiry ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Enquiry ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. TTS-2026-1042"
                  value={enquiryId}
                  onChange={(e) => setEnquiryId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              {/* Registered Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                  <span className="absolute right-3 top-3 text-[11px] text-slate-400 font-medium">
                    (Privacy Check)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500">
                🔒 Customer Privacy Protected: Details are only displayed to verified contact numbers.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </button>
            </div>

            {/* Quick Demo Help Banner */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px]">
                💡 Try sample test ticket: <code className="bg-slate-200/70 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">TTS-2026-1042</code> with mobile <code className="bg-slate-200/70 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">9876543210</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEnquiryId('TTS-2026-1042');
                  setMobileNumber('9876543210');
                }}
                className="text-[11px] font-semibold text-cyan-700 hover:underline"
              >
                Auto-fill Sample
              </button>
            </div>
          </form>

          {/* Error / Validation Feedback */}
          {errorMessage && (
            <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{errorMessage}</p>
                <p className="mt-1 text-slate-600">
                  Need assistance? WhatsApp our support desk at <span className="font-mono">{contactConfig.whatsappNumber}</span>.
                </p>
              </div>
            </div>
          )}

          {/* Multiple Results Found by Mobile */}
          {multipleResults.length > 0 && (
            <div className="p-6 bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Found {multipleResults.length} Enquiries for this Mobile Number:
              </h4>
              <div className="space-y-2">
                {multipleResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:border-cyan-400 transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-xs text-cyan-800">{item.id}</span>
                      <span className="mx-2 text-slate-300">·</span>
                      <span className="text-xs text-slate-700 font-medium">{item.serviceType}</span>
                      <span className="mx-2 text-slate-300">·</span>
                      <span className="text-[11px] text-slate-500">{item.createdAt}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectFromResult(item)}
                      className="px-3 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tracked Result Display */}
          {trackedEnquiry && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Result Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-black text-slate-900 tracking-tight">
                      {trackedEnquiry.id}
                    </span>
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getStatusColor(trackedEnquiry.status)}`}>
                      {trackedEnquiry.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Registered on {trackedEnquiry.createdAt} · Location: <strong className="text-slate-700">{trackedEnquiry.location}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWhatsAppInquiry(trackedEnquiry.id)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600" />
                    <span>WhatsApp Inquiry for this Ticket</span>
                  </button>
                </div>
              </div>

              {/* Progress Stepper */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Service Pipeline Stage</p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {statusSteps.map((step, idx) => {
                    const isCompleted =
                      (trackedEnquiry.status === 'Completed') ||
                      (trackedEnquiry.status === 'In Progress' && idx <= 2) ||
                      (trackedEnquiry.status === 'Under Review' && idx <= 1) ||
                      (trackedEnquiry.status === 'Received' && idx === 0);

                    const isCurrent = trackedEnquiry.status === step;

                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                            isCurrent
                              ? 'bg-cyan-600 text-white ring-4 ring-cyan-100'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted && !isCurrent ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-medium ${isCurrent ? 'text-cyan-700 font-bold' : 'text-slate-600'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">Customer Name:</span>
                  <p className="font-bold text-slate-900">{trackedEnquiry.customerName}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold">Service Type:</span>
                  <p className="font-bold text-slate-900">{trackedEnquiry.serviceType}</p>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-semibold">Problem / Requirement Description:</span>
                  <p className="mt-0.5 text-slate-800 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                    {trackedEnquiry.description}
                  </p>
                </div>
              </div>

              {/* Status Timeline & Technician Activity Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span>Technician Timeline & Updates</span>
                </h4>

                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {trackedEnquiry.timeline.map((entry, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center shrink-0 z-10 shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-cyan-600" />
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{entry.status}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{entry.date}</span>
                        </div>
                        <p className="text-slate-600 leading-normal">{entry.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
