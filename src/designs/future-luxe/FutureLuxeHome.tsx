import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  ArrowRight,
  Play,
  Sparkles,
  RotateCw,
  Eye,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';
import { Jewellery3DViewer } from '../../components/three/Jewellery3DViewer';

export const FutureLuxeHome: React.FC = () => {
  const {
    openProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    setIsAppointmentOpen,
    setIsBespokeOpen,
    cartCount,
    wishlist,
    setActiveDesign,
  } = useShop();

  const [activeSlide, setActiveSlide] = useState(1);

  const futureProducts = PRODUCTS.filter(
    (p) => p.designOrigin === 'future-luxe' || p.designOrigin === 'all'
  );

  const orbitalRing = PRODUCTS.find((p) => p.id === 'lumiere-orbital-ring') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#040711] text-[#E2ECFC] selection:bg-sky-500/20 selection:text-white font-jakarta">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#040711]/90 backdrop-blur-md border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-sky-400/40 flex items-center justify-center bg-sky-500/10 text-sky-400">
              {/* Starburst Diamond Mark */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-1.5">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-white uppercase block leading-none">
                LUMIERE
              </span>
              <span className="text-[9px] tracking-[0.35em] text-sky-400 uppercase block mt-1">
                JEWELLERY
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-sky-200/70">
            <a href="#home" className="text-white hover:text-sky-300 transition-colors">
              Home
            </a>
            <a href="#shop" className="hover:text-white transition-colors">
              Shop
            </a>
            <a href="#collections" className="hover:text-white transition-colors">
              Collections
            </a>
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="hover:text-white transition-colors uppercase text-xs tracking-widest"
            >
              Custom
            </button>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-sky-400 transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-sky-400 transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-400" />
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-sky-400 transition-colors relative"
              title="Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-400 text-black text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAppointmentOpen(true)}
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-300 hover:bg-sky-400 hover:text-black transition-all text-xs font-semibold tracking-wider"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </header>

      {/* 2. FUTURISTIC COSMIC HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden border-b border-sky-950">
        {/* Deep space cosmic radial aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(56,189,248,0.15)_0%,rgba(4,7,17,1)_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400">
                LUXURY • CRAFTSMANSHIP • FOREVER
              </span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] text-white">
              More Than Jewellery, <br />
              <span className="italic font-light text-sky-300">It's a Feeling</span>
            </h1>

            <p className="text-sky-200/70 text-sm sm:text-base max-w-lg font-light leading-relaxed">
              Contemporary designs with timeless elegance. Made to celebrate you. Kinetic tension settings and aerospace platinum forged for eternity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#shop"
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white hover:bg-sky-200 text-black flex items-center gap-2 shadow-lg shadow-sky-500/10 transition-all transform hover:-translate-y-0.5"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openProductModal(orbitalRing)}
                className="px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase border border-sky-400/40 text-white hover:bg-sky-500/10 flex items-center gap-2.5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Our Process</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Orbital Floating Jewellery Scene + Vertical Pagination */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 bg-radial from-[#0E172E] to-[#040711] shadow-2xl">
              {/* 3D WebGL Canvas for Orbital Ring */}
              <Jewellery3DViewer
                modelType="orbital-ring"
                initialMetal="platinum"
                height={460}
                autoRotate={true}
                accentColor="#60A5FA"
                interactive={true}
              />

              {/* Vertical pagination 01, 02, 03 (Matches Screenshot D) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col items-center gap-2 text-xs font-mono text-sky-400/60 pointer-events-none">
                <span className={activeSlide === 1 ? 'text-white font-bold' : ''}>01</span>
                <div className="w-px h-6 bg-sky-500/30" />
                <span className={activeSlide === 2 ? 'text-white font-bold' : ''}>02</span>
                <span className={activeSlide === 3 ? 'text-white font-bold' : ''}>03</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. HERO FLOATING FEATURE CARDS (Matches Screenshot D: 3D Custom Design, Premium Craftsmanship, Lifetime Support) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setIsBespokeOpen(true)}
              className="p-5 rounded-2xl bg-[#091124]/80 border border-sky-900/40 hover:border-sky-400/60 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div>
                <h4 className="font-cinzel text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  3D Custom Design
                </h4>
                <p className="text-xs text-sky-200/60 mt-1">
                  Create your dream jewellery with our 3D experts.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-[#091124]/80 border border-sky-900/40 hover:border-sky-400/60 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div>
                <h4 className="font-cinzel text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  Premium Craftsmanship
                </h4>
                <p className="text-xs text-sky-200/60 mt-1">
                  Handcrafted by skilled artisans with laser precision.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => alert('Lumiere Lifetime Support: Every platinum creation includes complimentary biannual prong inspection, rhodium replating, and assay certification.')}
              className="p-5 rounded-2xl bg-[#091124]/80 border border-sky-900/40 hover:border-sky-400/60 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div>
                <h4 className="font-cinzel text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  Lifetime Support
                </h4>
                <p className="text-xs text-sky-200/60 mt-1">
                  Care, maintenance and support always guaranteed.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCULPTURAL & BESPOKE CATALOGUE */}
      <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-400">
              AVANT-GARDE ATELIER
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-normal text-white mt-1">
              Sculptural Creations
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500 text-black hover:bg-white transition-colors"
            >
              Custom 3D Commission
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#080E1E] border border-sky-900/40 overflow-hidden flex flex-col justify-between hover:border-sky-400/60 shadow-lg hover:shadow-sky-500/5 transition-all duration-300"
              >
                <div
                  className="relative aspect-4/3 w-full overflow-hidden bg-black/60 cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-black/80 text-sky-300 border border-sky-500/30">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'text-rose-500 fill-rose-500' : 'text-sky-200'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-sky-400 tracking-wider uppercase">
                      {product.metalPurity} · {product.gemstone}
                    </div>
                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-cormorant text-xl font-medium text-white group-hover:text-sky-300 transition-colors mt-1 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-sky-200/60 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sky-950 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-sky-400/60 uppercase tracking-widest">
                        Acquisition
                      </div>
                      <div className="font-mono text-lg font-semibold text-sky-300">
                        {formatINR(product.priceINR)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openProductModal(product)}
                        className="p-2.5 rounded-xl border border-sky-800 text-sky-200 hover:bg-sky-500/10 transition-colors"
                        title="View & 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-sky-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CRAFT & LABORATORY */}
      <section id="about" className="py-20 bg-[#070D1C] border-t border-b border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400">
              ALGORITHMIC ARCHITECTURE
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-white leading-tight">
              Where Kinetic Tension Replaces Traditional Prongs
            </h2>
            <p className="text-sm text-sky-200/70 leading-relaxed font-light">
              Lumiere redefines the high-jewellery silhouette. By employing high-tensile platinum alloys and generative computational topology, our solitaires float weightlessly between continuous mobius bands.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border border-sky-400 text-sky-300 hover:bg-sky-400 hover:text-black transition-all"
              >
                Book Virtual Laboratory Consultation
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-sky-900/50 aspect-4/3 shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
              alt="Lumiere Jewellery Craft"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. FUTURE LUXE FOOTER */}
      <footer id="contact" className="bg-[#03050C] border-t border-sky-950 py-16 text-sky-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="font-cinzel text-xl font-bold tracking-[0.2em] text-white">
              LUMIERE JEWELLERY
            </div>
            <p className="text-xs leading-relaxed">
              Avant-garde fine joaillerie house synthesizing computational design, aerospace platinum, and rare diamond geology.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-sky-400 tracking-widest uppercase mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#shop" className="hover:text-white">Dyson Sphere Solitaires</a></li>
              <li><a href="#shop" className="hover:text-white">Vector Light Suspension Chokers</a></li>
              <li><a href="#shop" className="hover:text-white">Hexagonal Starlight Climbers</a></li>
              <li><a href="#shop" className="hover:text-white">Continuum Kinetic Cuffs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-sky-400 tracking-widest uppercase mb-4">
              Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsAppointmentOpen(true)} className="hover:text-white">
                  Virtual 3D Video Suite
                </button>
              </li>
              <li>
                <button onClick={() => setIsBespokeOpen(true)} className="hover:text-white">
                  CAD Generative Commission
                </button>
              </li>
              <li><a href="#about" className="hover:text-white">Type IIa Diamond Verification</a></li>
              <li><a href="#about" className="hover:text-white">Platinum Pt 950 Assay Purity</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-semibold text-sky-400 tracking-widest uppercase">
              Lumiere Quantum Dispatch
            </h4>
            <p className="text-xs">
              Private invitations to limited sculptural batch releases.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="px-3 py-2 bg-[#091124] border border-sky-900 text-xs rounded-l-lg text-white focus:outline-none focus:border-sky-400"
              />
              <button
                onClick={() => alert('Subscribed to Lumiere Quantum Dispatch.')}
                className="px-4 py-2 bg-sky-400 text-black text-xs font-bold rounded-r-lg uppercase hover:bg-white"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-sky-950 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sky-400/40">
          <div>© 2026 LUMIERE JEWELLERY · Concept D: Future Luxe by OBVERRA DIGITAL</div>
          <button
            onClick={() => setActiveDesign('hub')}
            className="mt-2 sm:mt-0 text-sky-400 hover:underline"
          >
            ← Return to OBVERRA Demo Hub
          </button>
        </div>
      </footer>
    </div>
  );
};
