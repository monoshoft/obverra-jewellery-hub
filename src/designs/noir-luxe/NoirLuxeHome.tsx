import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  Play,
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Eye,
  Check,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';
import { Jewellery3DViewer } from '../../components/three/Jewellery3DViewer';
import { Product } from '../../types/jewellery';

export const NoirLuxeHome: React.FC = () => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const noirProducts = PRODUCTS.filter(
    (p) => p.designOrigin === 'noir-luxe' || p.designOrigin === 'all'
  );

  const displayedProducts =
    activeCategory === 'all'
      ? noirProducts
      : noirProducts.filter((p) => p.category === activeCategory);

  const heroRingProduct = PRODUCTS.find((p) => p.id === 'auriga-solitaire-aurora') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F5E6BE] selection:bg-[#D4AF37]/30 selection:text-white font-jakarta">
      {/* 1. TOP BAR NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37]">
              {/* Lotus mark */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-1.5">
                <path d="M12 3c1.5 3 4.5 6 7 7-2.5 1-4.5 4-5.5 7-1-3-3-6-5.5-7 2.5-1 5.5-4 4-7z" />
                <path d="M12 17c1.5 2 3.5 3 5 3-1.5 1-4 1-5 1s-3.5 0-5-1c1.5 0 3.5-1 5-3z" />
              </svg>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#F5E6BE] uppercase block leading-none">
                AURIGA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase block mt-1">
                JEWELS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-[#F5E6BE]/70">
            <a href="#home" className="text-[#D4AF37] hover:text-[#F5E6BE] transition-colors">
              Home
            </a>
            <a href="#shop" className="hover:text-[#D4AF37] transition-colors">
              Shop
            </a>
            <a href="#collections" className="hover:text-[#D4AF37] transition-colors">
              Collections
            </a>
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs"
            >
              Custom Jewellery
            </button>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
              Contact
            </a>
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4 text-[#F5E6BE]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-[#D4AF37] transition-colors"
              title="Search Jewellery"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-[#D4AF37] transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#D4AF37] transition-colors relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#F5E6BE] hover:text-[#D4AF37]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0C] border-b border-[#D4AF37]/20 px-6 py-4 space-y-3 text-xs tracking-wider uppercase text-[#F5E6BE]/80">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#D4AF37]"
            >
              Home
            </a>
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#D4AF37]"
            >
              Shop
            </a>
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#D4AF37]"
            >
              Collections
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBespokeOpen(true);
              }}
              className="block py-1 text-left uppercase text-xs hover:text-[#D4AF37]"
            >
              Custom Jewellery
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAppointmentOpen(true);
              }}
              className="block py-1 text-left uppercase text-xs text-[#D4AF37]"
            >
              Book Private Salon Viewing
            </button>
          </div>
        )}
      </header>

      {/* 2. CINEMATIC HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden border-b border-[#D4AF37]/15">
        {/* Background glow & subtle light sweeps */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
                TIMELESS BEAUTY
              </span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] text-[#F5E6BE] tracking-tight">
              Jewellery That Tells Your Story
            </h1>

            <p className="text-[#F5E6BE]/70 text-sm sm:text-base max-w-lg font-light leading-relaxed">
              Exquisite designs crafted for your most precious moments. Hand-selected diamonds and master-cast 18K gold sculpted with uncompromising perfection.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#shop"
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#D4AF37] hover:bg-[#F5E6BE] text-black flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openProductModal(heroRingProduct)}
                className="px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[#D4AF37]/40 text-[#F5E6BE] hover:bg-[#D4AF37]/10 flex items-center gap-2.5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Inspect in 3D</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#D4AF37]/20">
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">
                  5000+
                </div>
                <div className="text-[10px] tracking-wider text-[#F5E6BE]/60 uppercase mt-0.5">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">
                  100%
                </div>
                <div className="text-[10px] tracking-wider text-[#F5E6BE]/60 uppercase mt-0.5">
                  Certified Jewellery
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">
                  50+
                </div>
                <div className="text-[10px] tracking-wider text-[#F5E6BE]/60 uppercase mt-0.5">
                  Exclusive Designs
                </div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37] flex items-center gap-1">
                  <span>5</span>
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <div className="text-[10px] tracking-wider text-[#F5E6BE]/60 uppercase mt-0.5">
                  Customer Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Interactive 3D Ring Model) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-radial from-[#1A1A22] to-[#0A0A0C] shadow-2xl shadow-black">
              {/* 3D WebGL Canvas */}
              <Jewellery3DViewer
                modelType="solitaire-ring"
                initialMetal="yellow-gold"
                height={480}
                autoRotate={true}
                accentColor="#D4AF37"
                interactive={true}
              />

              {/* Floating Ring Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-md border border-[#D4AF37]/30">
                <div className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-semibold">
                  Auriga Signature Solitaire
                </div>
                <div className="font-cormorant text-lg text-white">
                  1.80 ct VVS1 Champagne Solitaire
                </div>
                <div className="font-mono text-xs text-[#D4AF37] mt-0.5">
                  {formatINR(345000)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ICONIC CATEGORY STRIP */}
      <section className="py-12 bg-[#0E0E12] border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6">
            {[
              { id: 'rings', name: 'Rings', icon: '💍', count: '14 Designs' },
              { id: 'necklaces', name: 'Necklaces', icon: '✨', count: '18 Designs' },
              { id: 'earrings', name: 'Earrings', icon: '💎', count: '22 Designs' },
              { id: 'bracelets', name: 'Bracelets', icon: '💫', count: '11 Designs' },
              { id: 'mangalsutra', name: 'Mangalsutra', icon: '🌟', count: '9 Designs' },
              { id: 'custom', name: 'Custom', icon: '⚜️', count: 'Bespoke Atelier' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'custom') {
                    setIsBespokeOpen(true);
                  } else {
                    setActiveCategory(cat.id === activeCategory ? 'all' : cat.id);
                  }
                }}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-lg shadow-[#D4AF37]/10'
                    : 'border-[#D4AF37]/20 bg-[#14141A]/60 hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-cinzel text-xs font-bold text-[#F5E6BE] tracking-wider uppercase">
                  {cat.name}
                </div>
                <div className="text-[10px] text-[#D4AF37]/70 mt-0.5 font-light">
                  {cat.count}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE CATALOGUE GRID */}
      <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#D4AF37]">
              CURATED MASTERPIECES
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-normal text-[#F5E6BE] mt-1">
              Signature Haute Joaillerie
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#F5E6BE]/70 border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => setActiveCategory('rings')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeCategory === 'rings'
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#F5E6BE]/70 border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              Rings
            </button>
            <button
              onClick={() => setActiveCategory('necklaces')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeCategory === 'necklaces'
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#F5E6BE]/70 border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              Necklaces
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#121217] border border-[#D4AF37]/20 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-xl hover:shadow-[#D4AF37]/5"
              >
                {/* Image Section */}
                <div
                  className="relative aspect-4/3 w-full overflow-hidden bg-black/50 cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Pill / Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#F5E6BE]'
                      }`}
                    />
                  </button>

                  {/* 3D Model Quick Indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-[#D4AF37] border border-[#D4AF37]/30">
                    <Sparkles className="w-3 h-3" />
                    <span>3D Model Ready</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-[#D4AF37] tracking-wider uppercase">
                      {product.metalPurity} · {product.gemstone}
                    </div>
                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-cormorant text-xl font-medium text-[#F5E6BE] group-hover:text-[#D4AF37] transition-colors mt-1 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#F5E6BE]/60 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#F5E6BE]/50 uppercase tracking-widest">
                        Pricing
                      </div>
                      <div className="font-mono text-lg font-semibold text-[#D4AF37]">
                        {formatINR(product.priceINR)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openProductModal(product)}
                        className="p-2.5 rounded-xl border border-[#D4AF37]/30 text-[#F5E6BE] hover:bg-[#D4AF37]/10 transition-colors"
                        title="Quick View & 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5E6BE] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md transition-colors"
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

      {/* 5. BRAND HERITAGE & CRAFTSMANSHIP */}
      <section id="about" className="py-20 bg-[#0E0E12] border-t border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
              EXQUISITE CRAFTSMANSHIP
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-[#F5E6BE] leading-tight">
              Where Ancient Metallurgy Meets Modern Laser Setting
            </h2>
            <p className="text-sm text-[#F5E6BE]/70 leading-relaxed font-light">
              Every Auriga jewel is forged by master goldsmiths with over three decades of royal atelier training. We marry micro-pavé optical setting with hand-burnished bezels to achieve maximum refraction and everlasting structural integrity.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Hand-Selected Conflict-Free GIA/IGI Natural Diamonds',
                'BIS 916 & 750 Hallmarked Assay Purity Guarantees',
                'Complimentary Lifetime Cleaning, Inspection & Ultrasonic Restoration',
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-[#F5E6BE]/90">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-[#D4AF37]/30 relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <div className="text-[10px] text-[#D4AF37] tracking-widest uppercase">
                    Master Atelier
                  </div>
                  <div className="font-cormorant text-2xl text-white">
                    320+ Artisan Hours per High-Joaillerie Suite
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NOIR FOOTER */}
      <footer id="contact" className="bg-[#070709] border-t border-[#D4AF37]/15 py-16 text-[#F5E6BE]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#F5E6BE]">
              AURIGA JEWELS
            </div>
            <p className="text-xs text-[#F5E6BE]/60 leading-relaxed">
              Ultra-luxury fine jewellery house crafting monuments of love, celebration and royal prestige.
            </p>
            <div className="text-xs text-[#D4AF37] font-mono">
              Salons in Mumbai, Delhi & London
            </div>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#D4AF37] tracking-widest uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#shop" className="hover:text-[#D4AF37]">Solitaire Engagement Rings</a></li>
              <li><a href="#shop" className="hover:text-[#D4AF37]">Nocturne High Joaillerie Chokers</a></li>
              <li><a href="#shop" className="hover:text-[#D4AF37]">Modern Bezel Mangalsutras</a></li>
              <li><a href="#shop" className="hover:text-[#D4AF37]">Diamond Tennis Bracelets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#D4AF37] tracking-widest uppercase mb-4">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsBespokeOpen(true)} className="hover:text-[#D4AF37]">
                  Custom 3D CAD Commission
                </button>
              </li>
              <li>
                <button onClick={() => setIsAppointmentOpen(true)} className="hover:text-[#D4AF37]">
                  Private Video Concierge
                </button>
              </li>
              <li><a href="#about" className="hover:text-[#D4AF37]">Assay & Hallmarking Verification</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37]">Heirloom Restoration</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              Client Privileges
            </h4>
            <p className="text-xs text-[#F5E6BE]/60">
              Receive private invitations to private viewing auctions and secret vault releases.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="px-3 py-2 bg-[#121218] border border-[#D4AF37]/30 text-xs rounded-l-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => alert('Welcome to Auriga Privileges. Our concierge has registered your address.')}
                className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-r-lg uppercase hover:bg-[#F5E6BE]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F5E6BE]/40">
          <div>© 2026 AURIGA JEWELS · Concept A: Noir Luxe by OBVERRA DIGITAL</div>
          <button
            onClick={() => setActiveDesign('hub')}
            className="mt-2 sm:mt-0 text-[#D4AF37] hover:underline"
          >
            ← Return to OBVERRA Demo Hub
          </button>
        </div>
      </footer>
    </div>
  );
};
