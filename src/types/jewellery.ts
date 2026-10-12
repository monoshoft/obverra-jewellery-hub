export type JewelleryCategory = 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'mangalsutra' 
  | 'bridal-sets' 
  | 'custom';

export type MetalType = '18k-yellow-gold' | '18k-rose-gold' | '18k-white-gold' | '22k-antique-gold' | 'platinum-950';

export interface Product {
  id: string;
  name: string;
  designOrigin: 'noir-luxe' | 'ivory-elegance' | 'royal-heritage' | 'future-luxe' | 'all';
  category: JewelleryCategory;
  priceINR: number;
  originalPriceINR?: number;
  tagline: string;
  description: string;
  metal: MetalType;
  metalPurity: string;
  gemstone: string;
  caratWeight?: string;
  diamondCut?: string;
  certification: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  images: {
    primary: string;
    secondary?: string;
    model?: string;
    has3DModel?: boolean;
  };
  details: {
    grossWeight: string;
    netGoldWeight: string;
    diamondClarity?: string;
    dimensions?: string;
    makingCharges?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: MetalType;
}

export type DesignId = 'hub' | 'design-a' | 'design-b' | 'design-c' | 'design-d';

export interface DesignConcept {
  id: DesignId;
  code: string;
  brandName: string;
  subBrand: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  creativeDirection: string;
  targetAudience: string;
  primaryPalette: string[];
  vibe: string;
  badge: string;
  accentColor: string;
  bgTone: string;
}
