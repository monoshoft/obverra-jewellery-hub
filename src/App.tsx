import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { DemoHub } from './components/hub/DemoHub';
import { NoirLuxeHome } from './designs/noir-luxe/NoirLuxeHome';
import { IvoryEleganceHome } from './designs/ivory-elegance/IvoryEleganceHome';
import { RoyalHeritageHome } from './designs/royal-heritage/RoyalHeritageHome';
import { FutureLuxeHome } from './designs/future-luxe/FutureLuxeHome';
import { CartDrawer } from './components/shared/CartDrawer';
import { WishlistDrawer } from './components/shared/WishlistDrawer';
import { ProductModal } from './components/shared/ProductModal';
import { AppointmentModal } from './components/shared/AppointmentModal';
import { BespokeCustomModal } from './components/shared/BespokeCustomModal';
import { CheckoutModal } from './components/shared/CheckoutModal';
import { SearchModal } from './components/shared/SearchModal';
import { DiscreetDemoBar } from './components/shared/DiscreetDemoBar';

const MainLayout: React.FC = () => {
  const { activeDesign, notification } = useShop();

  const renderActiveView = () => {
    switch (activeDesign) {
      case 'design-a':
        return <NoirLuxeHome />;
      case 'design-b':
        return <IvoryEleganceHome />;
      case 'design-c':
        return <RoyalHeritageHome />;
      case 'design-d':
        return <FutureLuxeHome />;
      case 'hub':
      default:
        return <DemoHub />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Active Design Render */}
      {renderActiveView()}

      {/* Floating Discreet Switcher Bar */}
      <DiscreetDemoBar />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductModal />
      <AppointmentModal />
      <BespokeCustomModal />
      <CheckoutModal />
      <SearchModal />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-zinc-950/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-sans animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
