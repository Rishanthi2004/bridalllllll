export interface BridalLook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  palette: {
    name: string;
    hex: string;
  }[];
  techniques: string[];
  finish: string;
  duration: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Ceremony' | 'Reception' | 'Editorial' | 'Pre-Wedding';
  image: string;
  artistNote: string;
  lighting: string;
  accent: string;
}

export interface StudioTool {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
}

export interface BookingFormData {
  brideName: string;
  email: string;
  phone: string;
  weddingDate: string;
  location: string;
  serviceType: string;
  notes: string;
}
