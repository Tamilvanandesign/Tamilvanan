export type PageId = 'home' | 'services' | 'buysell' | 'about' | 'contact' | 'admin';

export type EnquiryStatus = 
  | 'Received'
  | 'Under Review'
  | 'In Progress'
  | 'Waiting for Customer'
  | 'Completed'
  | 'Cancelled';

export type ServiceType = 
  | 'Laptop & Desktop Repair'
  | 'Refurbished Laptop Enquiry'
  | 'Laptop Purchase'
  | 'Sell or Exchange Laptop'
  | 'Corporate Bulk Supply'
  | 'Home & Office IT Support'
  | 'General IT Consultation';

export interface TimelineEntry {
  date: string;
  status: EnquiryStatus;
  note: string;
}

export interface Enquiry {
  id: string; // e.g. "TTS-2026-1001"
  createdAt: string;
  customerName: string;
  mobileNumber: string;
  email?: string;
  location: string; // Chennai, Villupuram, Kallakurichi, Salem, or Other
  serviceType: ServiceType;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  description: string;
  status: EnquiryStatus;
  timeline: TimelineEntry[];
  
  // Specific fields for Sell Laptop
  sellDetails?: {
    brandModel: string;
    processorRamStorage: string;
    age: string;
    physicalCondition: string;
    batteryCondition: string;
    expectedPrice: string;
    accessoriesIncluded?: string;
  };

  // Specific fields for Bulk Supply
  bulkDetails?: {
    companyName: string;
    contactPerson: string;
    quantity: string;
    preferredBrand: string;
    specsRequired: string;
    devicePreference: 'Refurbished' | 'Pre-Owned' | 'Brand New' | 'Mix / Best Value';
    budgetRange: string;
    gstRequirement: boolean;
  };
}

export type LaptopCondition = 
  | 'Refurbished - Grade A'
  | 'Tested Pre-Owned'
  | 'Brand New Sealed';

export type LaptopCategory = 
  | 'Budget / Students'
  | 'Business / Professional'
  | 'High Performance / Creator'
  | 'Refurbished Best Value';

export interface Product {
  id: string;
  brand: 'HP' | 'Dell' | 'Lenovo' | 'ASUS' | 'Acer' | 'Other';
  model: string;
  category: LaptopCategory;
  condition: LaptopCondition;
  processor: string;
  ram: string;
  storage: string;
  screenSize: string;
  price: number; // in INR ₹
  originalPrice?: number;
  warranty: string;
  availability: 'In Stock' | 'Available on Request' | 'Limited Stock';
  imageUrl: string;
  highlights: string[];
}

export interface ContactConfig {
  whatsappNumber: string; // default placeholder: "[YOUR WHATSAPP NUMBER]"
  phoneNumber: string;   // default placeholder: "[YOUR PHONE NUMBER]"
  email: string;         // default placeholder: "[YOUR BUSINESS EMAIL]"
  address: string;       // default placeholder: "[YOUR BUSINESS ADDRESS]"
  googleMapsUrl: string; // default placeholder: "[YOUR GOOGLE MAPS LINK]"
}

export interface ServiceLocationInfo {
  city: 'Chennai' | 'Villupuram' | 'Kallakurichi' | 'Salem';
  title: string;
  state: string;
  coverage: string;
  notes: string;
}
