import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Laptop, ShoppingBag, ArrowLeftRight, Building2, Search, Filter, 
  CheckCircle2, AlertCircle, MessageSquare, Send, Check, ShieldCheck, Tag, Sparkles
} from 'lucide-react';
import { Product, LaptopCategory, LaptopCondition } from '../types';
import { buildWhatsAppUrl, getPreFilledWhatsAppMessage } from '../utils/whatsapp';

export const BuySellPage: React.FC = () => {
  const { products, addEnquiry, contactConfig, showToast } = useApp();

  // Active section tab inside Buy & Sell
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'bulk'>('buy');

  // Search & Filters for Buy
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sell Form State
  const [sellForm, setSellForm] = useState({
    customerName: '',
    mobileNumber: '',
    email: '',
    location: 'Chennai',
    brandModel: '',
    processorRamStorage: '',
    laptopAge: '1 - 2 Years',
    physicalCondition: 'Good - Minor normal scuffs',
    batteryCondition: 'Normal backup (2-3 hours)',
    expectedPrice: '',
    accessories: 'Original Charger',
    additionalNotes: ''
  });
  const [sellSubmittedId, setSellSubmittedId] = useState<string | null>(null);

  // Bulk Supply Form State
  const [bulkForm, setBulkForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    mobileNumber: '',
    quantity: '10 - 25 Units',
    preferredBrand: 'Dell / Lenovo / HP Mix',
    specsRequired: 'Intel Core i5, 16GB RAM, 256GB/512GB SSD',
    devicePreference: 'Refurbished' as const,
    budgetRange: '₹20,000 - ₹30,000 per unit',
    deliveryLocation: 'Chennai',
    gstRequirement: true,
    procurementNotes: ''
  });
  const [bulkSubmittedId, setBulkSubmittedId] = useState<string | null>(null);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.processor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
    const matchesCondition = selectedCondition === 'All' || p.condition === selectedCondition;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCondition && matchesCategory;
  });

  const handleEnquireProductWhatsApp = (p: Product) => {
    const msg = `Hello Tamil Tech Solutions! I am interested in purchasing this laptop:
Model: ${p.brand} ${p.model}
Specs: ${p.processor}, ${p.ram}, ${p.storage}
Condition: ${p.condition}
Price: ₹${p.price.toLocaleString('en-IN')}
Please let me know if this is currently available in stock.`;

    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, msg), '_blank');
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.customerName || !sellForm.mobileNumber || !sellForm.brandModel) {
      showToast('Please fill in required customer and laptop information', 'error');
      return;
    }

    const cleanMobile = sellForm.mobileNumber.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      showToast('Please provide a valid 10-digit mobile number', 'error');
      return;
    }

    const newEnquiry = addEnquiry({
      customerName: sellForm.customerName.trim(),
      mobileNumber: cleanMobile,
      email: sellForm.email.trim() || undefined,
      location: sellForm.location,
      serviceType: 'Sell or Exchange Laptop',
      preferredContact: 'WhatsApp',
      description: `Evaluation request to sell/exchange laptop. Brand/Model: ${sellForm.brandModel}. Specs: ${sellForm.processorRamStorage}. Age: ${sellForm.laptopAge}. Condition: ${sellForm.physicalCondition}. Battery: ${sellForm.batteryCondition}. Expected: ₹${sellForm.expectedPrice || 'Open to quote'}. Accessories: ${sellForm.accessories}. Notes: ${sellForm.additionalNotes}`,
      sellDetails: {
        brandModel: sellForm.brandModel,
        processorRamStorage: sellForm.processorRamStorage,
        age: sellForm.laptopAge,
        physicalCondition: sellForm.physicalCondition,
        batteryCondition: sellForm.batteryCondition,
        expectedPrice: sellForm.expectedPrice,
        accessoriesIncluded: sellForm.accessories
      }
    });

    setSellSubmittedId(newEnquiry.id);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkForm.companyName || !bulkForm.contactPerson || !bulkForm.mobileNumber) {
      showToast('Please fill in company name, contact person, and mobile number', 'error');
      return;
    }

    const cleanMobile = bulkForm.mobileNumber.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    const newEnquiry = addEnquiry({
      customerName: `${bulkForm.contactPerson} (${bulkForm.companyName})`,
      mobileNumber: cleanMobile,
      email: bulkForm.email.trim() || undefined,
      location: bulkForm.deliveryLocation,
      serviceType: 'Corporate Bulk Supply',
      preferredContact: 'WhatsApp',
      description: `Corporate bulk supply quotation request for ${bulkForm.quantity} units. Company: ${bulkForm.companyName}. Preferred Brand: ${bulkForm.preferredBrand}. Specs: ${bulkForm.specsRequired}. Preference: ${bulkForm.devicePreference}. Budget: ${bulkForm.budgetRange}. GST Required: ${bulkForm.gstRequirement ? 'Yes' : 'No'}. Delivery: ${bulkForm.deliveryLocation}. Notes: ${bulkForm.procurementNotes}`,
      bulkDetails: {
        companyName: bulkForm.companyName,
        contactPerson: bulkForm.contactPerson,
        quantity: bulkForm.quantity,
        preferredBrand: bulkForm.preferredBrand,
        specsRequired: bulkForm.specsRequired,
        devicePreference: bulkForm.devicePreference,
        budgetRange: bulkForm.budgetRange,
        gstRequirement: bulkForm.gstRequirement
      }
    });

    setBulkSubmittedId(newEnquiry.id);
  };

  const handleWhatsAppSellHandoff = () => {
    if (!sellSubmittedId) return;
    const msg = `Hello Tamil Tech Solutions! I submitted a laptop sell/exchange evaluation.
Enquiry ID: ${sellSubmittedId}
Name: ${sellForm.customerName}
Model: ${sellForm.brandModel}
Specs: ${sellForm.processorRamStorage}
Location: ${sellForm.location}
Expected Price: ₹${sellForm.expectedPrice || 'As evaluated'}`;
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, msg), '_blank');
  };

  const handleWhatsAppBulkHandoff = () => {
    if (!bulkSubmittedId) return;
    const msg = `Hello Tamil Tech Solutions! We requested a Corporate Bulk Supply quotation.
Enquiry ID: ${bulkSubmittedId}
Company: ${bulkForm.companyName}
Contact: ${bulkForm.contactPerson}
Quantity: ${bulkForm.quantity}
Specs: ${bulkForm.specsRequired}`;
    window.open(buildWhatsAppUrl(contactConfig.whatsappNumber, msg), '_blank');
  };

  return (
    <div className="space-y-12 py-10">
      {/* Page Title & Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-700 mb-2">
            Laptop Marketplace &amp; Solutions
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Buy, Sell &amp; Corporate Supply
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Certified refurbished laptops, tested pre-owned systems, transparent trade-ins, and institutional bulk supply in Tamil Nadu.
          </p>
        </div>

        {/* 3 Main Segmented Action Tabs */}
        <div className="flex items-center justify-center p-1.5 bg-slate-200/80 rounded-2xl max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'buy'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-cyan-600" />
            <span>Buy Laptops ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'sell'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-500" />
            <span>Sell or Exchange</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'bulk'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Corporate Bulk</span>
          </button>
        </div>
      </section>

      {/* SECTION A: BUY LAPTOPS */}
      {activeTab === 'buy' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Search & Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search model, brand (Dell, HP, ThinkPad), processor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700"
              >
                <option value="All">All Brands</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="HP">HP</option>
                <option value="Acer">Acer</option>
                <option value="ASUS">ASUS</option>
              </select>

              {/* Condition Filter */}
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700"
              >
                <option value="All">All Conditions</option>
                <option value="Refurbished - Grade A">Refurbished - Grade A</option>
                <option value="Tested Pre-Owned">Tested Pre-Owned</option>
                <option value="Brand New Sealed">Brand New Sealed</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700"
              >
                <option value="All">All Categories</option>
                <option value="Budget / Students">Budget / Students</option>
                <option value="Business / Professional">Business / Professional</option>
              </select>
            </div>
          </div>

          {/* Product Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image with condition kicker */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={`${product.brand} ${product.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B192C]/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {product.brand}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {product.condition}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {product.model}
                      </h3>
                      {/* Quiet metadata line without static pill enclosures */}
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span>{product.screenSize}</span>
                        <span>·</span>
                        <span>{product.category}</span>
                      </div>
                    </div>

                    {/* Hardware Specifications Grid */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Processor:</span>
                        <span className="font-semibold text-slate-900 text-right">{product.processor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Memory (RAM):</span>
                        <span className="font-semibold text-slate-900">{product.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fast Storage:</span>
                        <span className="font-semibold text-slate-900">{product.storage}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1 text-xs text-slate-600">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Warranty & Availability Notice */}
                    <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                      <span>{product.warranty}</span>
                      <span className="font-semibold text-emerald-700">{product.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button Footer */}
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Selling Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnquireProductWhatsApp(product)}
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              <p>No laptops found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('All');
                  setSelectedCondition('All');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-cyan-700 font-bold underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* SECTION B: SELL OR EXCHANGE YOUR LAPTOP */}
      {activeTab === 'sell' && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
            <div className="text-center max-w-lg mx-auto mb-8">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sell or Exchange Your Laptop
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Get a transparent preliminary valuation for your used laptop. We buy Dell, HP, Lenovo, ASUS, Acer and Apple laptops in any working state.
              </p>
            </div>

            {sellSubmittedId ? (
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Device Details Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your laptop valuation request has been logged under enquiry ID:
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-300 inline-block font-mono font-black text-xl text-cyan-800">
                  {sellSubmittedId}
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left">
                  <strong>Notice:</strong> Submitted details are for preliminary evaluation. The final purchase offer depends on physical device inspection, motherboard check, and hardware verification at our branch.
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={handleWhatsAppSellHandoff}
                    className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send on WhatsApp for Fast Quote</span>
                  </button>
                  <button
                    onClick={() => setSellSubmittedId(null)}
                    className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Submit Another Device
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="space-y-4 text-xs">
                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={sellForm.customerName}
                      onChange={(e) => setSellForm({ ...sellForm, customerName: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={sellForm.mobileNumber}
                      onChange={(e) => setSellForm({ ...sellForm, mobileNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. anand@example.com"
                      value={sellForm.email}
                      onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your City / Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={sellForm.location}
                      onChange={(e) => setSellForm({ ...sellForm, location: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Villupuram">Villupuram</option>
                      <option value="Kallakurichi">Kallakurichi</option>
                      <option value="Salem">Salem</option>
                      <option value="Other Tamil Nadu">Other Tamil Nadu District</option>
                    </select>
                  </div>
                </div>

                {/* Laptop Specs */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-3">
                    Laptop Specifications &amp; Condition
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Laptop Brand &amp; Exact Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. HP Pavilion 15-ec / Dell Inspiron 3505"
                        value={sellForm.brandModel}
                        onChange={(e) => setSellForm({ ...sellForm, brandModel: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Processor, RAM &amp; Storage
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ryzen 5, 8GB RAM, 512GB SSD"
                        value={sellForm.processorRamStorage}
                        onChange={(e) => setSellForm({ ...sellForm, processorRamStorage: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Laptop Age
                      </label>
                      <select
                        value={sellForm.laptopAge}
                        onChange={(e) => setSellForm({ ...sellForm, laptopAge: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      >
                        <option value="Less than 1 Year">Less than 1 Year</option>
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="2 - 4 Years">2 - 4 Years</option>
                        <option value="4+ Years">4+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Physical Cosmetic Condition
                      </label>
                      <select
                        value={sellForm.physicalCondition}
                        onChange={(e) => setSellForm({ ...sellForm, physicalCondition: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      >
                        <option value="Like New - Flawless">Like New - Flawless</option>
                        <option value="Good - Minor normal scuffs">Good - Minor normal scuffs</option>
                        <option value="Fair - Noticeable scratches / body wear">Fair - Noticeable scratches / body wear</option>
                        <option value="Damaged - Cracked body or broken hinge">Damaged - Cracked body or broken hinge</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Battery Backup Condition
                      </label>
                      <select
                        value={sellForm.batteryCondition}
                        onChange={(e) => setSellForm({ ...sellForm, batteryCondition: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      >
                        <option value="Excellent (3+ hours)">Excellent (3+ hours)</option>
                        <option value="Normal backup (1.5 - 3 hours)">Normal backup (1.5 - 3 hours)</option>
                        <option value="Weak (Under 45 mins)">Weak (Under 45 mins)</option>
                        <option value="Dead / Works only on charger">Dead / Works only on charger</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Expected Selling Price (INR ₹)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 18000 (or leave blank for best quote)"
                        value={sellForm.expectedPrice}
                        onChange={(e) => setSellForm({ ...sellForm, expectedPrice: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Accessories Included &amp; Additional Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Original box available, Dell backpack included, bill copy available..."
                    value={sellForm.additionalNotes}
                    onChange={(e) => setSellForm({ ...sellForm, additionalNotes: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Disclaimer:</strong> Submitted details are for preliminary valuation. The final binding offer is determined strictly upon physical diagnosis and hardware verification by our technician.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Laptop Details for Evaluation</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* SECTION C: CORPORATE & BULK SUPPLY */}
      {activeTab === 'bulk' && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
            <div className="text-center max-w-lg mx-auto mb-8">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Corporate &amp; Bulk Laptop Supply
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Institutional quotations for IT enterprises, offices, computer labs, colleges, and regional resellers.
              </p>
            </div>

            {bulkSubmittedId ? (
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Bulk Quotation Request Registered!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your institutional supply ticket has been assigned enquiry ID:
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-300 inline-block font-mono font-black text-xl text-indigo-900">
                  {bulkSubmittedId}
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Our commercial sales executive will review stock availability across Chennai, Villupuram, Kallakurichi, and Salem and prepare an itemized quote.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={handleWhatsAppBulkHandoff}
                    className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Quote Request on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setBulkSubmittedId(null)}
                    className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Create Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Company / Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vertex Technologies Pvt Ltd"
                      value={bulkForm.companyName}
                      onChange={(e) => setBulkForm({ ...bulkForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Murugan (IT Admin)"
                      value={bulkForm.contactPerson}
                      onChange={(e) => setBulkForm({ ...bulkForm, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Business Phone / Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={bulkForm.mobileNumber}
                      onChange={(e) => setBulkForm({ ...bulkForm, mobileNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. admin@company.com"
                      value={bulkForm.email}
                      onChange={(e) => setBulkForm({ ...bulkForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Required Quantity <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bulkForm.quantity}
                      onChange={(e) => setBulkForm({ ...bulkForm, quantity: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    >
                      <option value="5 - 10 Units">5 - 10 Units</option>
                      <option value="10 - 25 Units">10 - 25 Units</option>
                      <option value="25 - 50 Units">25 - 50 Units</option>
                      <option value="50+ Units">50+ Units (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Device Preference
                    </label>
                    <select
                      value={bulkForm.devicePreference}
                      onChange={(e) => setBulkForm({ ...bulkForm, devicePreference: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    >
                      <option value="Refurbished">Refurbished Grade A (Best Value)</option>
                      <option value="Brand New">Brand New Commercial</option>
                      <option value="Pre-Owned">Pre-Owned Budget</option>
                      <option value="Mix / Best Value">Mix / Best Value Recommendation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dell Latitude, ThinkPad, HP"
                      value={bulkForm.preferredBrand}
                      onChange={(e) => setBulkForm({ ...bulkForm, preferredBrand: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Required Hardware Specifications
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Core i5, 16GB RAM, 512GB SSD, FHD display"
                      value={bulkForm.specsRequired}
                      onChange={(e) => setBulkForm({ ...bulkForm, specsRequired: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Estimated Budget Range
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹22,000 to ₹28,000 per system"
                      value={bulkForm.budgetRange}
                      onChange={(e) => setBulkForm({ ...bulkForm, budgetRange: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bulkForm.deliveryLocation}
                      onChange={(e) => setBulkForm({ ...bulkForm, deliveryLocation: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Villupuram">Villupuram</option>
                      <option value="Kallakurichi">Kallakurichi</option>
                      <option value="Salem">Salem</option>
                      <option value="Other Tamil Nadu Location">Other Tamil Nadu Location</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bulkForm.gstRequirement}
                        onChange={(e) => setBulkForm({ ...bulkForm, gstRequirement: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="font-semibold text-slate-800">GST Invoice / Commercial Procurement Required</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Procurement Timeline or Special Remarks
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Needed within 10 days for new batch of interns..."
                    value={bulkForm.procurementNotes}
                    onChange={(e) => setBulkForm({ ...bulkForm, procurementNotes: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Bulk Quotation</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
