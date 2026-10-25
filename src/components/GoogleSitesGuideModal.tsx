import React, { useState } from 'react';
import { X, Globe, FileSpreadsheet, ExternalLink, CheckCircle2, AlertTriangle, Layers, BookOpen, Key, Link2 } from 'lucide-react';

interface GoogleSitesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSitesGuideModal: React.FC<GoogleSitesGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'forms' | 'domain' | 'limitations'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Google Sites Turnkey Blueprint & Deployment Guide</h3>
              <p className="text-xs text-slate-300">Free & Low-Cost Business Setup for Tamil Tech Solutions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Architecture & Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pages'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Page-by-Page Layout</span>
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'forms'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>3. Google Forms & Sheets DB</span>
          </button>

          <button
            onClick={() => setActiveTab('domain')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'domain'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>4. Custom Domain & Publish</span>
          </button>

          <button
            onClick={() => setActiveTab('limitations')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'limitations'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>5. Limitations & Workarounds</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200">
                <h4 className="font-bold text-cyan-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  Why Google Sites is 100% Free for Tamil Tech Solutions
                </h4>
                <p className="text-xs text-cyan-800">
                  Google Sites provides zero server hosting costs, automatic SSL security certificates, unlimited bandwidth, and seamless integration with Google Forms and Google Sheets.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">Step-by-Step Implementation Roadmap</h4>
                <ol className="space-y-3 list-decimal list-inside text-xs text-slate-600">
                  <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Create a New Site in Google Sites:</strong> Go to <code className="text-cyan-700 font-mono">sites.google.com/new</code> while logged into your business Google Account. Choose "Blank" site.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Upload Brand Logo:</strong> In the top-left of the site header, click "Add logo" and upload the official Tamil Tech Solutions logo SVG/PNG (exported from the Brand Pack modal). Add the business title: <em>Tamil Tech Solutions</em>.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Apply Brand Colors:</strong> In the right sidebar, click <strong>Themes &gt; Custom</strong>. Set Primary Color to Navy Blue (<code className="font-mono text-cyan-700">#0B192C</code>), Accent to Cyan (<code className="font-mono text-cyan-700">#06B6D4</code>) and Amber CTA (<code className="font-mono text-amber-600">#F59E0B</code>).
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Configure Navigation:</strong> Add 5 pages under "Pages": Home, Services, Buy & Sell, About Us, Contact. Set navigation to "Top" with a brand accent color.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-5">
              <h4 className="font-bold text-slate-900">Replicating Each Page Structure on Google Sites</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 text-cyan-700">1. Homepage Layout</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>• <strong>Header:</strong> Banner format with Headline: <em>"Complete Laptop & Desktop Solutions Under One Roof"</em>.</li>
                    <li>• <strong>Buttons:</strong> Insert button widget for "Contact on WhatsApp" (link to <code className="font-mono text-slate-700">https://wa.me/[YOUR_NUMBER]</code>).</li>
                    <li>• <strong>5 Service Cards:</strong> Use Google Sites' 4-item or 3-item block template with icons.</li>
                    <li>• <strong>Locations:</strong> Chennai, Villupuram, Kallakurichi, Salem in a 4-column layout.</li>
                    <li>• <strong>Embed:</strong> Insert Google Form for enquiry submission.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 text-cyan-700">2. Services Page</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>• <strong>Section A:</strong> Laptop & Desktop Repair (collapsible text widget for diagnosis, RAM/SSD upgrade, OS install).</li>
                    <li>• <strong>Section B:</strong> Home & Office IT Support (Printer, Wi-Fi, Computer setup).</li>
                    <li>• <strong>Section C:</strong> Corporate IT Support (Bulk maintenance, deployment).</li>
                    <li>• <strong>Section D:</strong> Refurbished Laptop Services (Testing standards, stock info).</li>
                    <li>• Add a "Request Service" button after each block linking to WhatsApp.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 text-cyan-700">3. Buy & Sell Page</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>• <strong>Buy Section:</strong> Image + text blocks showcasing available HP, Dell, Lenovo, ASUS, Acer models with specifications and INR pricing.</li>
                    <li>• <strong>Sell Section:</strong> Embed the "Sell Your Laptop" Google Form.</li>
                    <li>• <strong>Bulk Supply:</strong> Embed the "Corporate Bulk Quotation" Google Form.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 text-cyan-700">4. About & Contact Pages</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>• <strong>About:</strong> Mission, transparent customer values across Chennai, Villupuram, Kallakurichi, Salem (no fake histories).</li>
                    <li>• <strong>Contact:</strong> Direct click-to-WhatsApp, click-to-call, click-to-email.</li>
                    <li>• <strong>Google Maps:</strong> Use native Google Sites "Map" widget to pin your location!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Setting up the Enquiry Database via Google Forms & Sheets</h4>
              <p className="text-xs text-slate-600">
                To collect, store, and manage enquiries with zero monthly fees, follow this proven architecture:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">Step 1: Create Google Form</p>
                  <p className="text-slate-600">
                    Create form fields: Full Name, Mobile Number, Email (Optional), Location (Chennai, Villupuram, Kallakurichi, Salem), Service Required (Repair, Refurbished, Sell, Bulk, IT Support), Problem / Requirement Description.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">Step 2: Connect to Google Sheets Database</p>
                  <p className="text-slate-600">
                    In Google Forms, switch to the <strong>Responses</strong> tab and click <strong>"Link to Sheets"</strong>. This automatically saves every customer enquiry in real-time as a secure spreadsheet row!
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">Step 3: Unique Enquiry ID Auto-Generation (Google Apps Script)</p>
                  <p className="text-slate-600">
                    In your connected Google Sheet, go to <strong>Extensions &gt; Apps Script</strong>. Paste this simple 5-line script to assign automated IDs like <code className="font-mono text-cyan-700">TTS-2026-XXXX</code> and send an instant email notification to the owner:
                  </p>
                  <pre className="mt-2 p-2 bg-slate-900 text-cyan-300 rounded font-mono text-[11px] overflow-x-auto">
{`function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = e.range.getRow();
  var enquiryId = "TTS-2026-" + (1000 + row);
  sheet.getRange(row, 1).setValue(enquiryId); // Writes ID to column A
  
  // Optional: Send owner instant notification
  MailApp.sendEmail("[YOUR BUSINESS EMAIL]", "New TTS Enquiry: " + enquiryId, 
    "New service enquiry received. Check spreadsheet for details.");
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'domain' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Publishing & Connecting a Custom Domain</h4>
              <p className="text-slate-600">
                You can publish for free on Google's URL (<code className="font-mono">sites.google.com/view/tamiltechsolutions</code>) or connect a custom domain like <code className="font-mono text-cyan-700">tamiltechsolutions.in</code> for just ₹400-₹800/year.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">1. Publish in Google Sites</p>
                  <p className="text-slate-600">Click the purple <strong>Publish</strong> button at the top right. Set your web address: <code className="font-mono text-slate-800">tamiltechsolutions</code>.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">2. Assign Custom Domain</p>
                  <p className="text-slate-600">Click the gear icon <strong>Settings &gt; Custom domains &gt; Start setup</strong>. Enter your domain (e.g., <code className="font-mono text-slate-800">www.tamiltechsolutions.in</code>).</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">3. Update DNS at your Domain Registrar (GoDaddy, Namecheap, Hostinger)</p>
                  <p className="text-slate-600">
                    Add a CNAME record: <code className="font-mono font-bold text-slate-900">Host: www</code> pointing to <code className="font-mono font-bold text-cyan-700">ghs.googlehosted.com</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'limitations' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-900 mb-1">Google Sites Technical Limitations & Honest Workarounds</h5>
                  <p className="text-amber-800 leading-relaxed">
                    As requested in your brief, here are the exact platform constraints of Google Sites and how to handle them without breaking your workflow:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="font-bold text-slate-900 mb-1">Limitation 1: Dynamic Enquiry Tracking</p>
                  <p className="text-slate-600">
                    Google Sites does <strong>not</strong> support server-side databases (Node.js/SQL) directly inside page blocks.
                  </p>
                  <p className="mt-2 text-cyan-700 font-semibold">
                    ✓ Recommended Solution: Embed Google Sheets Web App OR host this React web application on free hosting (Google Cloud Run / Vercel / Netlify) which connects to our tracking system!
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="font-bold text-slate-900 mb-1">Limitation 2: Floating WhatsApp Button</p>
                  <p className="text-slate-600">
                    Google Sites doesn't have native fixed-position floating HTML elements on all pages.
                  </p>
                  <p className="mt-2 text-cyan-700 font-semibold">
                    ✓ Recommended Solution: Add a high-visibility sticky banner at the top and bottom of each page with a bold WhatsApp CTA button, or embed the small custom HTML snippet provided in this app.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="font-bold text-slate-900 mb-1">Limitation 3: Dynamic Product Inventory Filter</p>
                  <p className="text-slate-600">
                    Google Sites cannot automatically filter products by price or RAM in real-time without custom iframe embeds.
                  </p>
                  <p className="mt-2 text-cyan-700 font-semibold">
                    ✓ Recommended Solution: Group laptops into clean visual sub-sections (e.g. "Laptops under ₹25,000", "Business ThinkPads & Latitudes", "Student Editions").
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="font-bold text-slate-900 mb-1">Limitation 4: Real-time Customer Privacy Protection</p>
                  <p className="text-slate-600">
                    Never make your master Google Sheet public, as that would expose other customers' phone numbers.
                  </p>
                  <p className="mt-2 text-cyan-700 font-semibold">
                    ✓ Recommended Solution: Keep the sheet private to your email. Send status updates directly via WhatsApp or automated Google Apps Script emails.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500">Tamil Tech Solutions · Zero-Cost Launch Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
