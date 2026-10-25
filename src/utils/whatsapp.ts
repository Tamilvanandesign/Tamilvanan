import { ServiceType } from '../types';

export const buildWhatsAppUrl = (
  whatsappNumber: string,
  message: string
): string => {
  // If the number is still a placeholder like [YOUR WHATSAPP NUMBER],
  // we handle it cleanly by opening WhatsApp with pre-filled text or prompting
  let cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  
  if (cleanNumber.length === 10) {
    cleanNumber = `91${cleanNumber}`;
  }
  
  if (cleanNumber && cleanNumber.length >= 10) {
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
  
  // Direct universal link with text
  return `https://api.whatsapp.com/send?text=${encodedText}`;
};

export const getPreFilledWhatsAppMessage = (
  topic: 
    | 'repair'
    | 'purchase'
    | 'sell'
    | 'refurbished'
    | 'bulk'
    | 'support'
    | 'general',
  customDetails?: string
): string => {
  switch (topic) {
    case 'repair':
      return `Hello Tamil Tech Solutions! I would like to enquire about Laptop/Desktop Repair service in Tamil Nadu.${customDetails ? ` Details: ${customDetails}` : ''}`;
    
    case 'purchase':
      return `Hello Tamil Tech Solutions! I am looking to purchase a laptop.${customDetails ? ` Specifications/Model: ${customDetails}` : ''} Please share current availability and pricing.`;

    case 'refurbished':
      return `Hello Tamil Tech Solutions! I want to check available stock of Refurbished / Pre-Owned Laptops with warranty details.`;

    case 'sell':
      return `Hello Tamil Tech Solutions! I want to sell/exchange my used laptop.${customDetails ? ` Device details: ${customDetails}` : ''} Please let me know how to get an evaluation.`;

    case 'bulk':
      return `Hello Tamil Tech Solutions! We require a Corporate / Bulk Supply quotation for laptops/desktops.${customDetails ? ` Requirement: ${customDetails}` : ''}`;

    case 'support':
      return `Hello Tamil Tech Solutions! I need Home / Office IT Support (Network, OS, Printer, Setup).${customDetails ? ` Details: ${customDetails}` : ''}`;

    default:
      return `Hello Tamil Tech Solutions! I have an IT service enquiry.`;
  }
};
