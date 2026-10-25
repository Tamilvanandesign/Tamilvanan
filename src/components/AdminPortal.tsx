import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Enquiry, EnquiryStatus, Product } from '../types';
import { 
  ShieldCheck, Search, Filter, Download, Plus, Trash2, Edit3, CheckCircle, 
  Clock, AlertCircle, Save, Phone, Mail, MapPin, Eye, Lock, RefreshCw, Smartphone, Laptop
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    enquiries, 
    updateEnquiryStatus, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    contactConfig, 
    updateContactConfig,
    resetContactConfig,
    showToast 
  } = useApp();

  // Authentication state (simple passcode protection)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'enquiries' | 'products' | 'contact' | 'export'>('enquiries');

  // Enquiry filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newStatus, setNewStatus] = useState<EnquiryStatus>('Under Review');
  const [statusNote, setStatusNote] = useState('');

  // Product management state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    brand: 'Dell',
    model: '',
    category: 'Business / Professional',
    condition: 'Refurbished - Grade A',
    processor: '',
    ram: '16 GB DDR4',
    storage: '512 GB SSD',
    screenSize: '14.0" FHD',
    price: 24999,
    originalPrice: 65000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    highlights: ['Refurbished Tested', 'Original Charger Included']
  });

  // Contact settings state
  const [contactForm, setContactForm] = useState(contactConfig);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin code is 'admin' or 'tts2026' or 'tts'
    if (passcode === 'admin' || passcode === 'tts2026' || passcode === 'tts' || passcode === 'tamiltech') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Admin access granted', 'success');
    } else {
      setAuthError('Invalid admin passcode. Default passcodes: "admin" or "tts2026"');
    }
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    updateEnquiryStatus(selectedEnquiry.id, newStatus, statusNote.trim() || undefined);
    setStatusNote('');
    // refresh selected enquiry
    const updated = enquiries.find(item => item.id === selectedEnquiry.id);
    if (updated) setSelectedEnquiry({ ...updated, status: newStatus });
  };

  const handleSaveContactConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactConfig(contactForm);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.model || !productForm.processor || !productForm.price) {
      showToast('Please fill in Model, Processor, and Price', 'error');
      return;
    }
    addProduct(productForm);
    setIsAddingProduct(false);
    setProductForm({
      brand: 'Dell',
      model: '',
      category: 'Business / Professional',
      condition: 'Refurbished - Grade A',
      processor: '',
      ram: '16 GB DDR4',
      storage: '512 GB SSD',
      screenSize: '14.0" FHD',
      price: 24999,
      warranty: 'Testing warranty as per seller inspection',
      availability: 'In Stock',
      imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      highlights: ['Refurbished Tested', 'Original Charger Included']
    });
  };

  const handleExportCSV = () => {
    const headers = ['Enquiry ID', 'Date', 'Customer Name', 'Mobile', 'Email', 'Location', 'Service Type', 'Status', 'Description'];
    const rows = enquiries.map(e => [
      `"${e.id}"`,
      `"${e.createdAt}"`,
      `"${e.customerName}"`,
      `"${e.mobileNumber}"`,
      `"${e.email || ''}"`,
      `"${e.location}"`,
      `"${e.serviceType}"`,
      `"${e.status}"`,
      `"${e.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tamil-tech-solutions-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported enquiries to CSV', 'success');
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.id.toLowerCase().includes(query) ||
      item.customerName.toLowerCase().includes(query) ||
      item.mobileNumber.includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.serviceType.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Tamil Tech Solutions</h2>
          <p className="text-xs text-slate-500 mt-1">Owner Admin Management Portal</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Default passcode: <code className="font-bold text-slate-700">admin</code> or <code className="font-bold text-slate-700">tts2026</code>
              </p>
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              Sign In to Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar */}
      <div className="bg-[#0B192C] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-black tracking-tight">Business Admin Operations Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage live enquiries, update repair timelines, edit laptop catalogue, and update contact placeholders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setAdminTab('enquiries')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            adminTab === 'enquiries'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Customer Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            adminTab === 'products'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Laptop Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('contact')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            adminTab === 'contact'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Contact Placeholders & Settings</span>
        </button>

        <button
          onClick={() => setAdminTab('export')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            adminTab === 'export'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export / Google Sheets Backup</span>
        </button>
      </div>

      {/* Tab 1: Enquiries Management */}
      {adminTab === 'enquiries' && (
        <div className="space-y-6">
          {/* Filters & Actions */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex-1 w-full sm:w-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by ID, Customer Name, Mobile, Location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Received">Received</option>
                <option value="Under Review">Under Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for Customer">Waiting for Customer</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Enquiries Table & Detail Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No enquiries found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enquiry) => {
                        const isSelected = selectedEnquiry?.id === enquiry.id;
                        return (
                          <tr
                            key={enquiry.id}
                            className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                              isSelected ? 'bg-cyan-50/60 font-semibold' : ''
                            }`}
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setNewStatus(enquiry.status);
                            }}
                          >
                            <td className="p-3 font-mono font-bold text-cyan-800">
                              {enquiry.id}
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-slate-900">{enquiry.customerName}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{enquiry.mobileNumber}</p>
                            </td>
                            <td className="p-3 text-slate-700">{enquiry.serviceType}</td>
                            <td className="p-3 text-slate-600">{enquiry.location}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-800">
                                {enquiry.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEnquiry(enquiry);
                                  setNewStatus(enquiry.status);
                                }}
                                className="px-2.5 py-1 text-[11px] font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-md"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail & Status Update Panel */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
              {selectedEnquiry ? (
                <div className="space-y-4 text-xs">
                  <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-black text-sm text-cyan-900">{selectedEnquiry.id}</span>
                      <p className="text-[10px] text-slate-400">{selectedEnquiry.createdAt}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                      {selectedEnquiry.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Customer</span>
                      <p className="font-bold text-slate-900">{selectedEnquiry.customerName}</p>
                      <p className="text-slate-600 font-mono">{selectedEnquiry.mobileNumber} · {selectedEnquiry.email || 'No email'}</p>
                      <p className="text-slate-500">{selectedEnquiry.location} · Prefers {selectedEnquiry.preferredContact}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Requirement Details</span>
                      <p className="p-2.5 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-200">
                        {selectedEnquiry.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Update Form */}
                  <form onSubmit={handleUpdateStatus} className="pt-3 border-t border-slate-200 space-y-3">
                    <h4 className="font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                      Update Status & Add Technician Log
                    </h4>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">New Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as EnquiryStatus)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800"
                      >
                        <option value="Received">Received</option>
                        <option value="Under Review">Under Review</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Waiting for Customer">Waiting for Customer</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                        Technician Activity Note (Customer Visible)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Diagnostic complete. Replaced display cable flex and thermal paste."
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-sm transition-colors"
                    >
                      Save Status Update
                    </button>
                  </form>

                  {/* Timeline History */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Timeline History</span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {selectedEnquiry.timeline.map((item, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 rounded text-[11px] border border-slate-200">
                          <div className="flex justify-between font-bold text-slate-800">
                            <span>{item.status}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                          </div>
                          <p className="text-slate-600 text-[10px] mt-0.5">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Select any enquiry from the table to view full details and update progress.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Laptop Catalogue Management */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Active Laptop Stock Catalogue</h3>
              <p className="text-xs text-slate-500">Add, edit, or delete listings displayed on the Buy & Sell page.</p>
            </div>
            <button
              onClick={() => setIsAddingProduct(!isAddingProduct)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingProduct ? 'Close Form' : 'Add New Laptop Listing'}</span>
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <form onSubmit={handleAddProductSubmit} className="bg-slate-50 border border-slate-300 p-6 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Create New Laptop Listing</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value as any })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Acer">Acer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Latitude 7490 Ultrabook"
                    value={productForm.model}
                    onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Condition</label>
                  <select
                    value={productForm.condition}
                    onChange={(e) => setProductForm({ ...productForm, condition: e.target.value as any })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="Refurbished - Grade A">Refurbished - Grade A</option>
                    <option value="Tested Pre-Owned">Tested Pre-Owned</option>
                    <option value="Brand New Sealed">Brand New Sealed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Processor</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Intel Core i5 8th Gen"
                    value={productForm.processor}
                    onChange={(e) => setProductForm({ ...productForm, processor: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">RAM & Storage</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="RAM (16 GB)"
                      value={productForm.ram}
                      onChange={(e) => setProductForm({ ...productForm, ram: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="SSD (512 GB)"
                      value={productForm.storage}
                      onChange={(e) => setProductForm({ ...productForm, storage: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Selling Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="22000"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-sm"
                >
                  Add Product to Catalogue
                </button>
              </div>
            </form>
          )}

          {/* Products List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-cyan-800 text-xs">{p.brand}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                      {p.condition}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.model}</h4>
                  <p className="text-xs text-slate-600 mt-1">{p.processor} · {p.ram} · {p.storage}</p>
                  <p className="text-base font-extrabold text-cyan-700 mt-2">
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">{p.availability}</span>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Contact Placeholders & Settings */}
      {adminTab === 'contact' && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Contact Information & Placeholders</h3>
            <p className="text-xs text-slate-500 mt-1">
              Update your real contact details here. When updated, every button, WhatsApp link, email link, and map link across the entire website updates immediately!
            </p>
          </div>

          <form onSubmit={handleSaveContactConfig} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210 or 919876543210"
                value={contactForm.whatsappNumber}
                onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Include country code (e.g. 91 for India).
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Business Phone Number
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={contactForm.phoneNumber}
                onChange={(e) => setContactForm({ ...contactForm, phoneNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Business Email
              </label>
              <input
                type="email"
                placeholder="e.g. contact@tamiltechsolutions.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Business Address
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 12, Main Road, Chennai / Villupuram / Kallakurichi / Salem, Tamil Nadu"
                value={contactForm.address}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Maps Verified Link
              </label>
              <input
                type="text"
                placeholder="e.g. https://maps.google.com/?q=Tamil+Tech+Solutions..."
                value={contactForm.googleMapsUrl}
                onChange={(e) => setContactForm({ ...contactForm, googleMapsUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={resetContactConfig}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Placeholders</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Export & Google Sheets Integration */}
      {adminTab === 'export' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 max-w-3xl">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Enquiries Backup & Google Sheets Sync</h3>
            <p className="text-xs text-slate-500 mt-1">
              Download your complete customer database in CSV format. You can import this directly into Google Sheets or Excel with one click.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <p className="font-bold text-slate-800">Current Database Status:</p>
            <p className="text-slate-600">• Total Registered Enquiries: <strong>{enquiries.length}</strong></p>
            <p className="text-slate-600">• Storage engine: Persistent Local Storage & Full-stack Sync</p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download All Enquiries as CSV</span>
          </button>
        </div>
      )}
    </div>
  );
};
