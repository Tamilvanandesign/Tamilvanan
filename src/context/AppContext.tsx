import React, { createContext, useContext, useState, useEffect } from 'react';
import { Enquiry, Product, ContactConfig, EnquiryStatus, ServiceType, PageId } from '../types';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  contactConfig: ContactConfig;
  updateContactConfig: (config: Partial<ContactConfig>) => void;
  resetContactConfig: () => void;
  
  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'timeline'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, note?: string) => boolean;
  getEnquiryByIdAndMobile: (id: string, mobile: string) => Enquiry | null;
  getEnquiriesByMobile: (mobile: string) => Enquiry[];
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  
  // Quick Enquiry Modal Trigger
  activeEnquiryModal: {
    isOpen: boolean;
    prefilledService?: ServiceType;
    prefilledSubject?: string;
  };
  openEnquiryModal: (service?: ServiceType, subject?: string) => void;
  closeEnquiryModal: () => void;
  
  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  whatsappNumber: '+91 9787174038',
  phoneNumber: '+91 9787174038',
  email: 'tamilvanan13998@gmail.com',
  address: 'Anna Nagar, Chennai, Tamil Nadu - 600040, India',
  googleMapsUrl: 'https://maps.google.com/?q=Anna+Nagar,+Chennai,+Tamil+Nadu',
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    brand: 'Dell',
    model: 'Latitude 7490 Business Ultrabook',
    category: 'Business / Professional',
    condition: 'Refurbished - Grade A',
    processor: 'Intel Core i5 8th Gen (Quad-Core 3.6GHz)',
    ram: '16 GB DDR4',
    storage: '512 GB NVMe High-Speed SSD',
    screenSize: '14.0" Full HD Anti-Glare IPS',
    price: 21999,
    originalPrice: 78000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    highlights: ['Magnesium Alloy Chassis', 'Backlit Keyboard', 'Type-C Thunderbolt', 'Original Dell Charger']
  },
  {
    id: 'prod-2',
    brand: 'Lenovo',
    model: 'ThinkPad T480 Legendary Workhorse',
    category: 'Business / Professional',
    condition: 'Refurbished - Grade A',
    processor: 'Intel Core i5 8th Gen vPro',
    ram: '16 GB DDR4 (Upgradable to 32GB)',
    storage: '256 GB NVMe SSD + Extra Bay',
    screenSize: '14.0" FHD Display',
    price: 22500,
    originalPrice: 85000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    highlights: ['Spill-resistant Keyboard', 'Dual Battery System', 'Military-grade Durability', 'HDMI & Type-C']
  },
  {
    id: 'prod-3',
    brand: 'HP',
    model: 'EliteBook 840 G5 Premium Metallic',
    category: 'Business / Professional',
    condition: 'Refurbished - Grade A',
    processor: 'Intel Core i7 8th Gen',
    ram: '16 GB DDR4',
    storage: '512 GB M.2 NVMe SSD',
    screenSize: '14.0" Full HD Narrow Bezel',
    price: 26999,
    originalPrice: 94000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'Limited Stock',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bang & Olufsen Audio', 'Full Aluminium Unibody', 'Fingerprint Reader', 'Excellent Battery Health']
  },
  {
    id: 'prod-4',
    brand: 'Acer',
    model: 'Extensa 15 Student & Home Edition',
    category: 'Budget / Students',
    condition: 'Tested Pre-Owned',
    processor: 'Intel Core i3 10th Gen',
    ram: '8 GB DDR4',
    storage: '256 GB SSD + 1TB HDD',
    screenSize: '15.6" Full HD with Numpad',
    price: 17499,
    originalPrice: 38000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    highlights: ['Full Numeric Keypad', 'Fast Boot SSD', 'Large 15.6" Screen for Coding & Classes', 'Tested Clean Unit']
  },
  {
    id: 'prod-5',
    brand: 'HP',
    model: 'ProBook 440 G8 Slim Business',
    category: 'Business / Professional',
    condition: 'Refurbished - Grade A',
    processor: 'Intel Core i5 11th Gen with Iris Xe',
    ram: '16 GB DDR4',
    storage: '512 GB PCIe NVMe SSD',
    screenSize: '14.0" FHD Micro-Edge',
    price: 33500,
    originalPrice: 72000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'Available on Request',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    highlights: ['11th Gen Power', 'Iris Xe Graphics', 'Ultra-thin profile', 'Quiet Dual-Fan Cooling']
  },
  {
    id: 'prod-6',
    brand: 'Dell',
    model: 'Vostro 3510 Multi-Tasker',
    category: 'Budget / Students',
    condition: 'Refurbished - Grade A',
    processor: 'Intel Core i5 11th Gen',
    ram: '8 GB DDR4 (Upgraded to 16GB available)',
    storage: '512 GB NVMe SSD',
    screenSize: '15.6" Anti-Glare LED',
    price: 29999,
    originalPrice: 58000,
    warranty: 'Testing warranty as per seller inspection',
    availability: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Fast Charging Support', 'Ergonomic Lift Hinge', '15.6" Large Display', 'Original Power Adapter']
  }
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'TTS-2026-1042',
    createdAt: '2026-10-24 11:30 AM',
    customerName: 'Karthik Raja',
    mobileNumber: '9876543210',
    email: 'karthik.r@example.com',
    location: 'Chennai',
    serviceType: 'Laptop & Desktop Repair',
    preferredContact: 'WhatsApp',
    description: 'Dell Inspiron laptop screen blinking and thermal overheating shutdown after 20 minutes of usage.',
    status: 'In Progress',
    timeline: [
      { date: '2026-10-24 11:30 AM', status: 'Received', note: 'Enquiry received online. Initial diagnosis scheduled.' },
      { date: '2026-10-24 02:15 PM', status: 'Under Review', note: 'Hardware technician reviewed. Suspected heatsink thermal paste drying + display cable flex issue.' },
      { date: '2026-10-25 09:00 AM', status: 'In Progress', note: 'Thermal module repasted with Arctic MX-4. Display panel connector under bench testing.' }
    ]
  },
  {
    id: 'TTS-2026-1041',
    createdAt: '2026-10-23 04:15 PM',
    customerName: 'Sundararajan M',
    mobileNumber: '9443312345',
    email: 'sundar.vpm@example.com',
    location: 'Villupuram',
    serviceType: 'Refurbished Laptop Enquiry',
    preferredContact: 'Phone Call',
    description: 'Looking for 3 refurbished ThinkPad or Dell laptops with 16GB RAM for accounting office.',
    status: 'Waiting for Customer',
    timeline: [
      { date: '2026-10-23 04:15 PM', status: 'Received', note: 'Enquiry logged for office laptops.' },
      { date: '2026-10-24 10:00 AM', status: 'Under Review', note: 'Stock availability verified in Chennai/Villupuram hubs.' },
      { date: '2026-10-24 03:30 PM', status: 'Waiting for Customer', note: 'Quotation sent via WhatsApp. Awaiting customer confirmation on screen size preference.' }
    ]
  },
  {
    id: 'TTS-2026-1039',
    createdAt: '2026-10-21 02:00 PM',
    customerName: 'Venkatesh Babu',
    mobileNumber: '9788012345',
    location: 'Salem',
    serviceType: 'Home & Office IT Support',
    preferredContact: 'WhatsApp',
    description: 'Wi-Fi mesh and network printer setup for 8 office desktop computers.',
    status: 'Completed',
    timeline: [
      { date: '2026-10-21 02:00 PM', status: 'Received', note: 'Office network setup request logged.' },
      { date: '2026-10-21 04:00 PM', status: 'In Progress', note: 'On-site engineer visited and configured gateway, static IPs, and shared printer spooler.' },
      { date: '2026-10-22 11:00 AM', status: 'Completed', note: 'All 8 systems tested printing and file sharing successfully. Ticket resolved.' }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  
  // Contact Config
  const [contactConfig, setContactConfig] = useState<ContactConfig>(() => {
    try {
      const saved = localStorage.getItem('tts_contact_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.whatsappNumber || 
          parsed.whatsappNumber.includes('[') || 
          parsed.email?.includes('[') ||
          parsed.address?.includes('[')
        ) {
          localStorage.setItem('tts_contact_config', JSON.stringify(DEFAULT_CONTACT_CONFIG));
          return DEFAULT_CONTACT_CONFIG;
        }
        return parsed;
      }
      return DEFAULT_CONTACT_CONFIG;
    } catch {
      return DEFAULT_CONTACT_CONFIG;
    }
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('tts_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('tts_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Modal & Toast
  const [activeEnquiryModal, setActiveEnquiryModal] = useState<{
    isOpen: boolean;
    prefilledService?: ServiceType;
    prefilledSubject?: string;
  }>({ isOpen: false });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tts_contact_config', JSON.stringify(contactConfig));
    } catch (e) {
      console.warn('Error saving contact config', e);
    }
  }, [contactConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('tts_enquiries', JSON.stringify(enquiries));
    } catch (e) {
      console.warn('Error saving enquiries', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('tts_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Error saving products', e);
    }
  }, [products]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const updateContactConfig = (config: Partial<ContactConfig>) => {
    setContactConfig(prev => ({ ...prev, ...config }));
    showToast('Contact settings updated successfully', 'success');
  };

  const resetContactConfig = () => {
    setContactConfig(DEFAULT_CONTACT_CONFIG);
    showToast('Contact settings reset to defaults', 'info');
  };

  const addEnquiry = (data: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'timeline'>): Enquiry => {
    const nextNumber = 1000 + enquiries.length + 1;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
    
    const newEnquiry: Enquiry = {
      ...data,
      id: `TTS-2026-${nextNumber}`,
      createdAt: formattedDate,
      status: 'Received',
      timeline: [
        {
          date: formattedDate,
          status: 'Received',
          note: 'Enquiry successfully submitted and registered in Tamil Tech Solutions system.'
        }
      ]
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, newStatus: EnquiryStatus, note?: string): boolean => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

    let updated = false;
    setEnquiries(prev => prev.map(item => {
      if (item.id.toLowerCase() === id.toLowerCase()) {
        updated = true;
        const newTimelineEntry: { date: string; status: EnquiryStatus; note: string } = {
          date: formattedDate,
          status: newStatus,
          note: note || `Status updated to ${newStatus}`
        };
        return {
          ...item,
          status: newStatus,
          timeline: [...item.timeline, newTimelineEntry]
        };
      }
      return item;
    }));

    if (updated) {
      showToast(`Enquiry ${id} status updated to "${newStatus}"`, 'success');
    }
    return updated;
  };

  const getEnquiryByIdAndMobile = (id: string, mobile: string): Enquiry | null => {
    const cleanId = id.trim().toUpperCase();
    const cleanMobile = mobile.replace(/[^0-9]/g, '');

    const found = enquiries.find(e => {
      const matchId = e.id.toUpperCase() === cleanId;
      const cleanEnquiryMobile = e.mobileNumber.replace(/[^0-9]/g, '');
      const matchMobile = cleanEnquiryMobile.endsWith(cleanMobile) || cleanMobile.endsWith(cleanEnquiryMobile);
      return matchId && matchMobile;
    });

    return found || null;
  };

  const getEnquiriesByMobile = (mobile: string): Enquiry[] => {
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (!cleanMobile || cleanMobile.length < 5) return [];

    return enquiries.filter(e => {
      const cleanEnquiryMobile = e.mobileNumber.replace(/[^0-9]/g, '');
      return cleanEnquiryMobile.endsWith(cleanMobile) || cleanMobile.endsWith(cleanEnquiryMobile);
    });
  };

  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added ${newProduct.brand} ${newProduct.model} to catalogue`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, partial: Partial<Product>): boolean => {
    let updated = false;
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        updated = true;
        return { ...p, ...partial };
      }
      return p;
    }));
    if (updated) showToast('Product updated successfully', 'success');
    return updated;
  };

  const deleteProduct = (id: string): boolean => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalogue', 'info');
    return true;
  };

  const openEnquiryModal = (service?: ServiceType, subject?: string) => {
    setActiveEnquiryModal({
      isOpen: true,
      prefilledService: service,
      prefilledSubject: subject
    });
  };

  const closeEnquiryModal = () => {
    setActiveEnquiryModal({ isOpen: false });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        contactConfig,
        updateContactConfig,
        resetContactConfig,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        getEnquiryByIdAndMobile,
        getEnquiriesByMobile,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        activeEnquiryModal,
        openEnquiryModal,
        closeEnquiryModal,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
