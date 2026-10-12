import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  ArrowRight,
  Play,
  Star,
  ShieldCheck,
  Sparkles,
  RotateCw,
  Eye,
  Check,
  Calendar,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';
import { Jewellery3DViewer } from '../../components/three/Jewellery3DViewer';

export const RoyalHeritageHome: React.FC = () => {
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

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showHero3DModal, setShowHero3DModal] = useState(false);

  const heritageProducts = PRODUCTS.filter(
    (p) => p.designOrigin === 'royal-heritage' || p.designOrigin === 'all'
  );

  const displayedProducts =
    activeCategory === 'all'
      ? heritageProducts
      : heritageProducts.filter((p) => p.category === activeCategory);

  const emeraldNecklace = PRODUCTS.find((p) => p.id === 'rajatvam-maharani-haar') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#07160F] text-[#F7E7B4] selection:bg-[#E5B94E]/30 selection:text-white font-jakarta">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#07160F]/90 backdrop-blur-md border-b border-[#E5B94E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#E5B94E]/40 flex items-center justify-center bg-[#E5B94E]/10 text-[#E5B94E]">
              {/* Royal Indian Lotus Emblem */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-1.5">
                <path d="M12 2C8 6 4 10 4 15a8 8 0 0 0 16 0c0-5-4-9-8-13z" />
                <path d="M12 12c-2 2-2 5 0 7 2-2 2-5 0-7z" />
              </svg>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F7E7B4] uppercase block leading-none">
                RAJATVAM
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#E5B94E] uppercase block mt-1">
                JEWELS
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-widest uppercase text-[#F7E7B4]/70">
            <a href="#home" className="text-[#E5B94E] hover:text-white transition-colors">
              Home
            </a>
            <a href="#collections" className="hover:text-[#E5B94E] transition-colors">
              Collections
            </a>
            <a href="#shop" className="hover:text-[#E5B94E] transition-colors">
              Shop
            </a>
            <a href="#bridal" className="hover:text-[#E5B94E] transition-colors">
              Bridal
            </a>
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="hover:text-[#E5B94E] transition-colors uppercase text-xs tracking-widest"
            >
              Custom
            </button>
            <a href="#about" className="hover:text-[#E5B94E] transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-[#E5B94E] transition-colors">
              Contact
            </a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-4 text-[#F7E7B4]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-[#E5B94E] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-[#E5B94E] transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5B94E]" />
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#E5B94E] transition-colors relative"
              title="Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5B94E] text-[#07160F] text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAppointmentOpen(true)}
              className="hidden sm:inline-flex px-5 py-2 rounded-full border border-[#E5B94E] text-[#E5B94E] hover:bg-[#E5B94E] hover:text-[#07160F] transition-all text-xs font-semibold tracking-wider uppercase"
            >
              Consult Now
            </button>
          </div>
        </div>
      </header>

      {/* 2. ROYAL EMERALD HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden border-b border-[#E5B94E]/20">
        {/* Emerald Velvet Luxury Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15)_0%,rgba(7,22,15,1)_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E5B94E]">
                TRADITION MEETS MODERNITY
              </span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] text-[#F7E7B4]">
              Heritage Crafted for <br />
              <span className="italic font-light text-[#E5B94E]">Today</span>
            </h1>

            <p className="text-[#F7E7B4]/75 text-sm sm:text-base max-w-lg font-light leading-relaxed">
              From timeless traditions to modern expressions, discover jewellery that stays with you forever. Heirloom 22K antique gold, uncut syndicate Polki diamonds, and royal Zambian emeralds.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#bridal"
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E5B94E] hover:bg-[#F7E7B4] text-[#07160F] flex items-center gap-2 shadow-lg shadow-[#E5B94E]/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Bridal Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openProductModal(emeraldNecklace)}
                className="px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[#E5B94E]/40 text-[#F7E7B4] hover:bg-[#E5B94E]/10 flex items-center gap-2.5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#E5B94E]/20 flex items-center justify-center text-[#E5B94E]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#E5B94E]/20">
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#E5B94E]">
                  25+
                </div>
                <div className="text-[10px] tracking-wider text-[#F7E7B4]/60 uppercase mt-0.5">
                  Years of Excellence
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#E5B94E]">
                  10,000+
                </div>
                <div className="text-[10px] tracking-wider text-[#F7E7B4]/60 uppercase mt-0.5">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#E5B94E]">
                  100%
                </div>
                <div className="text-[10px] tracking-wider text-[#F7E7B4]/60 uppercase mt-0.5">
                  Hallmarked Gold
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#E5B94E]">
                  Global
                </div>
                <div className="text-[10px] tracking-wider text-[#F7E7B4]/60 uppercase mt-0.5">
                  Insured Shipping
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Emerald Velvet Bust + 3D View 360° Circular Badge */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden border border-[#E5B94E]/40 shadow-2xl bg-[#0B2318]">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
                alt="Rajatvam Emerald Maharani Choker"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07160F] via-transparent to-transparent opacity-80" />

              {/* Interactive 3D View Floating Circular Widget (Matches Screenshot C!) */}
              <div
                onClick={() => openProductModal(emeraldNecklace)}
                className="absolute bottom-6 right-6 p-4 rounded-full bg-[#07160F]/90 backdrop-blur-md border border-[#E5B94E]/60 shadow-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center text-center w-28 h-28"
              >
                <div className="text-[9px] uppercase tracking-wider text-[#E5B94E] font-semibold">
                  3D View
                </div>
                <div className="my-1">
                  {/* Rotating 360 gold ring icon */}
                  <RotateCw className="w-6 h-6 text-[#E5B94E] animate-spin" />
                </div>
                <div className="text-[10px] font-mono font-bold text-white tracking-widest">
                  360° Live
                </div>
              </div>

              {/* Bottom description pill */}
              <div className="absolute bottom-6 left-6 max-w-xs">
                <span className="text-[10px] tracking-widest uppercase text-[#E5B94E] font-medium">
                  The Imperial Choker
                </span>
                <h3 className="font-cormorant text-xl text-white">
                  Carved Zambian Emeralds & Polki
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS PILL CARDS (Matches Screenshot C) */}
      <section id="collections" className="py-12 bg-[#0A1F15] border-b border-[#E5B94E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cormorant text-2xl text-[#F7E7B4] mb-6">
            Featured Collections
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              {
                title: 'Bridal Collection',
                img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
              },
              {
                title: 'Gold Jewellery',
                img: 'https://images.unsplash.com/photo-1611591475871-70bf8cfb471c?auto=format&fit=crop&w=500&q=80',
              },
              {
                title: 'Diamond Jewellery',
                img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80',
              },
              {
                title: 'Temple Jewellery',
                img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80',
              },
              {
                title: 'Custom Designs',
                img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80',
              },
            ].map((col, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (col.title === 'Custom Designs') {
                    setIsBespokeOpen(true);
                  } else {
                    const el = document.getElementById('shop');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E5B94E]/25 bg-[#07160F] transition-all hover:border-[#E5B94E] hover:shadow-lg"
              >
                <div className="aspect-16/10 w-full overflow-hidden bg-black/40">
                  <img
                    src={col.img}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-cinzel text-xs font-semibold text-[#F7E7B4] group-hover:text-[#E5B94E] transition-colors">
                    {col.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HERITAGE BRIDAL & POLKI CATALOGUE */}
      <section id="bridal" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E5B94E]">
              ROYAL RAJPUTANA & MUGHAL ATELIER
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-normal text-[#F7E7B4] mt-1">
              Heirloom Indian Jewellery
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'necklaces', 'bracelets', 'earrings'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#E5B94E] text-[#07160F] font-bold'
                    : 'text-[#F7E7B4]/70 border border-[#E5B94E]/30 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Pieces' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#0B2318] border border-[#E5B94E]/25 overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#E5B94E]/70 transition-all duration-300"
              >
                <div
                  className="relative aspect-4/3 w-full overflow-hidden bg-[#07160F] cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-[#07160F]/90 text-[#E5B94E] border border-[#E5B94E]/40">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#07160F]/80 backdrop-blur-md border border-[#E5B94E]/30 text-white hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#F7E7B4]'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-[#E5B94E] tracking-wider uppercase">
                      {product.metalPurity} · {product.gemstone}
                    </div>
                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-cormorant text-xl font-medium text-[#F7E7B4] group-hover:text-[#E5B94E] transition-colors mt-1 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#F7E7B4]/65 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5B94E]/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#F7E7B4]/50 uppercase tracking-widest">
                        Valuation
                      </div>
                      <div className="font-mono text-lg font-semibold text-[#E5B94E]">
                        {formatINR(product.priceINR)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openProductModal(product)}
                        className="p-2.5 rounded-xl border border-[#E5B94E]/40 text-[#F7E7B4] hover:bg-[#E5B94E]/10 transition-colors"
                        title="Inspect in 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 rounded-xl bg-[#E5B94E] hover:bg-[#F7E7B4] text-[#07160F] font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MEET OUR ARTISANS */}
      <section id="about" className="py-20 bg-[#0A1F15] border-t border-b border-[#E5B94E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E5B94E]">
              GENERATIONS OF GOLDSMITHS
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-[#F7E7B4] leading-tight">
              Preserving Rajasthan’s Kundan, Meenakari & Temple Heritage
            </h2>
            <p className="text-sm text-[#F7E7B4]/75 leading-relaxed font-light">
              In an era of mass casting, Rajatvam continues the sacred tradition of hand-sculpted gold repoussé. Every Kundan setting uses 24-karat pure gold foil to cradle syndicate Polki diamonds, protected by vibrant polychrome Meenakari enameling on the reverse.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsBespokeOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E5B94E] text-[#07160F] hover:bg-[#F7E7B4] transition-all"
              >
                Commission Bespoke Bridal Set
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#E5B94E]/30 relative aspect-4/3 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80"
              alt="Artisans at Rajatvam"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. ROYAL FOOTER */}
      <footer id="contact" className="bg-[#05100B] border-t border-[#E5B94E]/20 py-16 text-[#F7E7B4]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#F7E7B4]">
              RAJATVAM JEWELS
            </div>
            <p className="text-xs text-[#F7E7B4]/60 leading-relaxed">
              Royal Indian bridal and traditional gold atelier. Guarding sacred craftsmanship for modern dynasties.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#E5B94E] tracking-widest uppercase mb-4">
              Bridal Ateliers
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#bridal" className="hover:text-[#E5B94E]">Kundan & Polki Chokers</a></li>
              <li><a href="#bridal" className="hover:text-[#E5B94E]">Temple Nakshi Kadas</a></li>
              <li><a href="#bridal" className="hover:text-[#E5B94E]">Padmavati Jhumkas</a></li>
              <li><a href="#bridal" className="hover:text-[#E5B94E]">Auspicious Mangalsutras</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#E5B94E] tracking-widest uppercase mb-4">
              Royal Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsAppointmentOpen(true)} className="hover:text-[#E5B94E]">
                  Bridal Trousseau Appointment
                </button>
              </li>
              <li>
                <button onClick={() => setIsBespokeOpen(true)} className="hover:text-[#E5B94E]">
                  Custom Family Heirloom Design
                </button>
              </li>
              <li><a href="#about" className="hover:text-[#E5B94E]">BIS 916 Hallmark Assay</a></li>
              <li><a href="#about" className="hover:text-[#E5B94E]">Global Insured Escort Delivery</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-semibold text-[#E5B94E] tracking-widest uppercase">
              Join the Royal Court
            </h4>
            <p className="text-xs text-[#F7E7B4]/60">
              Private previews of festive Polki collections before public showcase.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="px-3 py-2 bg-[#0B2318] border border-[#E5B94E]/30 text-xs rounded-l-lg text-white focus:outline-none focus:border-[#E5B94E]"
              />
              <button
                onClick={() => alert('Honoured to welcome you to Rajatvam Jewels.')}
                className="px-4 py-2 bg-[#E5B94E] text-[#07160F] text-xs font-bold rounded-r-lg uppercase hover:bg-[#F7E7B4]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-[#E5B94E]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7E7B4]/40">
          <div>© 2026 RAJATVAM JEWELS · Concept C: Royal Heritage by OBVERRA DIGITAL</div>
          <button
            onClick={() => setActiveDesign('hub')}
            className="mt-2 sm:mt-0 text-[#E5B94E] hover:underline"
          >
            ← Return to OBVERRA Demo Hub
          </button>
        </div>
      </footer>
    </div>
  );
};
