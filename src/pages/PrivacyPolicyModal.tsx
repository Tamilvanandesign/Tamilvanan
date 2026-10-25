import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base">Privacy Policy &amp; Service Terms</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Customer Information &amp; Data Privacy</h4>
            <p>
              Tamil Tech Solutions collects only essential information (customer name, contact mobile number, location, and device details) required to process repairs, evaluate laptops for purchase, or provide quotations. We do not sell, rent, or publicly display your contact information.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Enquiry Tracking Protection</h4>
            <p>
              To protect client privacy, enquiry tracking records are restricted. Tracking status requires either the unique Enquiry ID along with the registered mobile number for two-factor verification, preventing unauthorized access by third parties.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Device Valuations &amp; Testing</h4>
            <p>
              Online valuations submitted through the "Sell or Exchange" form are strictly preliminary estimates. The final purchase or exchange value is determined only after physical inspection, diagnostic motherboard testing, and serial number verification at our branch.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">4. Data Backup Responsibility</h4>
            <p>
              While our technicians handle hardware with utmost care, customers are advised to back up critical personal files before submitting devices for OS reinstallation or storage-related repairs. Preliminary data assessment is conducted where supported.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">5. Service Coverage &amp; On-Site Visits</h4>
            <p>
              On-site technical support across Chennai, Villupuram, Kallakurichi, and Salem is scheduled subject to location accessibility and prior appointment confirmation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
