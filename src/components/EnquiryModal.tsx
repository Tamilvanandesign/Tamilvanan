import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageSquare, Send, ShieldCheck, Laptop } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const EnquiryModal: React.FC = () => {
  const { activeEnquiryModal, closeEnquiryModal, addEnquiry, contactConfig, showToast } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Chennai');
  const [serviceType, setServiceType] = useState<ServiceType>('Laptop & Desktop Repair');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [description, setDescription] = useState('');

  // Confirmation state
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (activeEnquiryModal.prefilledService) {
      setServiceType(activeEnquiryModal.prefilledService);
    }
    if (activeEnquiryModal.prefilledSubject) {
      setDescription(activeEnquiryModal.prefilledSubject);
    }
  }, [activeEnquiryModal]);

  if (!activeEnquiryModal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !mobileNumber.trim() || !description.trim()) {
      showToast('Please fill in your name, mobile number, and requirement details.', 'error');
      return;
    }

    const cleanMobile = mobileNumber.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    const newEnquiry = addEnquiry({
      customerName: customerName.trim(),
      mobileNumber: cleanMobile,
      email: email.trim() || undefined,
      location,
      serviceType,
      preferredContact,
      description: description.trim()
    });

    setSubmittedId(newEnquiry.id);
  };

  const handleOpenWhatsAppConfirmation = () => {
    if (!submittedId) return;
    const msg = `Hello Tamil Tech Solutions! I just submitted an enquiry online.
Enquiry ID: ${submittedId}
Name: ${customerName}
Service: ${serviceType}
Location: ${location}
Requirement: ${description}`;
    
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, msg), '_blank');
    handleClose();
  };

  const handleClose = () => {
    setSubmittedId(null);
    setCustomerName('');
    setMobileNumber('');
    setEmail('');
    setDescription('');
    closeEnquiryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base">Request IT Service / Quotation</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedId ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900">Enquiry Registered!</h4>
              <p className="mt-1 text-xs text-slate-600">
                Your service enquiry has been logged securely in our system.
              </p>
              <div className="mt-4 p-3 bg-slate-100 rounded-xl inline-block border border-slate-300">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Your Unique Enquiry ID</span>
                <span className="text-xl font-mono font-extrabold text-cyan-800 tracking-wider">
                  {submittedId}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Save this ID to check your live service status anytime on our website under <strong>"Track Your Enquiry"</strong>.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleOpenWhatsAppConfirmation}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp for Instant Response</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Customer Name */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Mobile Number & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  10-Digit Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Location & Service Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Chennai">Chennai</option>
                  <option value="Villupuram">Villupuram</option>
                  <option value="Kallakurichi">Kallakurichi</option>
                  <option value="Salem">Salem</option>
                  <option value="Other Tamil Nadu">Other Tamil Nadu Location</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                    onClick={() => setPreferredContact(method)}
                    className={`py-2 px-2 text-center rounded-lg border font-semibold transition-colors ${
                      preferredContact === method
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                Requirement / Problem Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Laptop brand/model, issue faced, required RAM/SSD upgrade, or bulk quotation specs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Notice */}
            <p className="text-[11px] text-slate-500 leading-tight">
              Notice: On-site visits and hardware service availability depend on technician schedule and location confirmation.
            </p>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Service Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
