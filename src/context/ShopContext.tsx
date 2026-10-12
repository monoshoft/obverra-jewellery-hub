import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, DesignId, MetalType } from '../types/jewellery';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  activeDesign: DesignId;
  setActiveDesign: (design: DesignId) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotalINR: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedMetal?: MetalType) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  
  isAppointmentOpen: boolean;
  setIsAppointmentOpen: (open: boolean) => void;
  
  isBespokeOpen: boolean;
  setIsBespokeOpen: (open: boolean) => void;
  
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  notification: string | null;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Read hash on mount
  const getInitialDesign = (): DesignId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['design-a', 'design-b', 'design-c', 'design-d', 'hub'].includes(hash)) {
        return hash as DesignId;
      }
    }
    return 'hub';
  };

  const [activeDesign, setActiveDesignState] = useState<DesignId>(getInitialDesign);
  const [cart, setCart] = useState<CartItem[]>([
    // Initial sample piece in cart for instant demo delight
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedSize: 'US 7 (54mm)',
      selectedMetal: '18k-yellow-gold',
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([PRODUCTS[1].id, PRODUCTS[5].id]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Sync hash with activeDesign
  const setActiveDesign = (design: DesignId) => {
    setActiveDesignState(design);
    if (typeof window !== 'undefined') {
      window.location.hash = design;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['design-a', 'design-b', 'design-c', 'design-d', 'hub'].includes(hash)) {
        setActiveDesignState(hash as DesignId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (product: Product, quantity = 1, selectedSize = 'Standard Size', selectedMetal?: MetalType) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedSize, selectedMetal: selectedMetal || product.metal }];
    });
    showNotification(`Added "${product.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from shopping bag.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from saved wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to your private wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalINR = cart.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        activeDesign,
        setActiveDesign,
        cart,
        cartCount,
        cartTotalINR,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        selectedProduct,
        openProductModal,
        closeProductModal,
        isAppointmentOpen,
        setIsAppointmentOpen,
        isBespokeOpen,
        setIsBespokeOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
