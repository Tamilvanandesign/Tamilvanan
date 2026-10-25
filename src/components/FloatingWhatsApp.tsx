import React, { useState } from 'react';
import { MessageSquare, X, Wrench, ShoppingBag, ArrowLeftRight, Building2, Monitor, Send, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { contactConfig, updateContactConfig, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfigPrompt, setShowConfigPrompt] = useState(false);
  const [tempNumber, setTempNumber] = useState('');

  const isPlaceholder = contactConfig.whatsappNumber === '[YOUR WHATSAPP NUMBER]' || !contactConfig.whatsappNumber;

  const handleOpenChat = (topic: 'repair' | 'purchase' | 'sell' | 'refurbished' | 'bulk' | 'support' | 'general') => {
    const message = getPreFilledWhatsAppMessage(topic);
    const url = buildWhatsAppUrl(contactConfig.whatsappNumber, message);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempNumber.trim()) return;
    updateContactConfig({ whatsappNumber: tempNumber.trim() });
    setShowConfigPrompt(false);
    showToast(`WhatsApp number updated to ${tempNumber.trim()}`, 'success');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Quick Launcher Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                TTS
              </div>
              <div>
                <h4 className="font-bold text-sm">Tamil Tech Solutions</h4>
                <p className="text-[11px] text-emerald-200">Usually replies in minutes · Tamil Nadu</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice if Placeholder */}
          {isPlaceholder && (
            <div className="bg-amber-50 border-b border-amber-200 p-2.5 px-3 flex items-center justify-between text-[11px] text-amber-900">
              <span>Placeholder active: <code>{contactConfig.whatsappNumber}</code></span>
              <button
                onClick={() => {
                  setTempNumber(contactConfig.whatsappNumber.includes('[') ? '+91 ' : contactConfig.whatsappNumber);
                  setShowConfigPrompt(true);
                }}
                className="font-bold underline text-amber-800 hover:text-amber-950 flex items-center gap-1"
              >
                <Settings className="w-3 h-3" /> Set Number
              </button>
            </div>
          )}

          {/* Edit number modal inline */}
          {showConfigPrompt && (
            <form onSubmit={handleSaveNumber} className="p-3 bg-slate-100 border-b border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="e.g. +91 9876543210"
                value={tempNumber}
                onChange={(e) => setTempNumber(e.target.value)}
                className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                Save
              </button>
            </form>
          )}

          {/* Chat options */}
          <div className="p-3 bg-slate-50 space-y-1.5 max-h-72 overflow-y-auto">
            <p className="text-[11px] font-semibold text-slate-500 uppercase px-1">
              Select your enquiry type:
            </p>

            <button
              onClick={() => handleOpenChat('repair')}
              className="w-full p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left group"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Laptop & Desktop Repair</p>
                <p className="text-[10px] text-slate-500">Screen, battery, motherboard, OS, SSD upgrade</p>
              </div>
            </button>

            <button
              onClick={() => handleOpenChat('refurbished')}
              className="w-full p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left group"
            >
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Buy Refurbished Laptop</p>
                <p className="text-[10px] text-slate-500">Dell, HP, Lenovo ThinkPad certified stock</p>
              </div>
            </button>

            <button
              onClick={() => handleOpenChat('sell')}
              className="w-full p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left group"
            >
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Sell / Exchange Used Laptop</p>
                <p className="text-[10px] text-slate-500">Quick estimate & transparent inspection</p>
              </div>
            </button>

            <button
              onClick={() => handleOpenChat('bulk')}
              className="w-full p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left group"
            >
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Corporate & Bulk Supply</p>
                <p className="text-[10px] text-slate-500">Bulk units for offices, institutions & resellers</p>
              </div>
            </button>

            <button
              onClick={() => handleOpenChat('support')}
              className="w-full p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left group"
            >
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <Monitor className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Home & Office IT Support</p>
                <p className="text-[10px] text-slate-500">Printer, Wi-Fi, network & Windows support</p>
              </div>
            </button>
          </div>

          {/* Direct Chat Button */}
          <div className="p-3 bg-white border-t border-slate-200">
            <button
              onClick={() => handleOpenChat('general')}
              className="w-full py-2 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact us on WhatsApp"
        className="group relative flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />

        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.902 2.796.902 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.789-5.768-5.789zm3.363 8.163c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.115-.515-1.748-.724-2.885-2.502-2.973-2.617-.088-.116-.708-.941-.708-1.794s.446-1.272.605-1.446c.159-.174.346-.217.462-.217l.332.007c.107 0 .252-.041.393.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.102.174.453.748.972 1.211.669.596 1.233.78 1.407.867.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z" />
          <path d="M12.042 2C6.505 2 2 6.505 2 12.042c0 1.98.577 3.824 1.579 5.378L2 22l4.742-1.533A10.007 10.007 0 0 0 12.042 22c5.536 0 10.042-4.506 10.042-10.042C22.084 6.505 17.578 2 12.042 2zm0 18.25c-1.72 0-3.32-.505-4.673-1.373l-.335-.216-3.083.997.994-3.003-.238-.352A8.17 8.17 0 0 1 3.825 12.04c0-4.531 3.686-8.217 8.217-8.217 4.53 0 8.217 3.686 8.217 8.217 0 4.53-3.687 8.21-8.217 8.21z" />
        </svg>

        <span className="font-bold text-sm tracking-wide hidden sm:inline">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
};
