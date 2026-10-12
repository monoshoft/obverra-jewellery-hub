import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  ArrowRight,
  Play,
  ShieldCheck,
  Truck,
  RotateCw,
  CreditCard,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';
import { Jewellery3DViewer } from '../../components/three/Jewellery3DViewer';

export const IvoryEleganceHome: React.FC = () => {
  const {
    openProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    setIsAppointmentOpen,
    cartCount,
    wishlist,
    setActiveDesign,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'bridal' | 'everyday'>('bridal');

  const ivoryProducts = PRODUCTS.filter(
    (p) => p.designOrigin === 'ivory-elegance' || p.designOrigin === 'all'
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2621] selection:bg-[#9C7A4A]/20 selection:text-[#2C2621] font-outfit">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#9C7A4A]/40 flex items-center justify-center bg-[#F4ECE1] text-[#9C7A4A]">
              {/* Petal emblem */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z" />
                <path d="M12 22a4 4 0 0 1-4-4c0-3 4-6 4-6s4 3 4 6a4 4 0 0 1-4 4z" />
                <path d="M2 12a4 4 0 0 1 4-4c3 0 6 4 6 4s-3 4-6 4a4 4 0 0 1-4-4z" />
                <path d="M22 12a4 4 0 0 1-4 4c-3 0-6-4-6-4s3-4 6-4a4 4 0 0 1 4 4z" />
              </svg>
            </div>
            <div>
              <span className="font-playfair text-xl sm:text-2xl font-semibold tracking-[0.15em] text-[#2C2621] uppercase block leading-none">
                VELORA
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#9C7A4A] uppercase block mt-1 font-medium">
                FINE JEWELLERY
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-[#5C5248]">
            <a href="#home" className="text-[#9C7A4A] font-semibold border-b border-[#9C7A4A] pb-0.5">
              Home
            </a>
            <a href="#shop" className="hover:text-[#9C7A4A] transition-colors">
              Shop
            </a>
            <a href="#collections" className="hover:text-[#9C7A4A] transition-colors">
              Collections
            </a>
            <a href="#wedding" className="hover:text-[#9C7A4A] transition-colors">
              Wedding
            </a>
            <a href="#about" className="hover:text-[#9C7A4A] transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-[#9C7A4A] transition-colors">
              Contact
            </a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-4 text-[#2C2621]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-[#9C7A4A] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-[#9C7A4A] transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9C7A4A]" />
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#9C7A4A] transition-colors relative"
              title="Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9C7A4A] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAppointmentOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#9C7A4A] text-[#9C7A4A] hover:bg-[#9C7A4A] hover:text-white transition-colors text-xs font-medium tracking-wide"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* 2. EDITORIAL HERO (Archway Layout with Model + 3D Feature) */}
      <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-[#2C2621]">
              Modern Jewellery for <br />
              <span className="italic font-light text-[#9C7A4A]">Every Moment</span>
            </h1>

            <p className="text-[#6D6256] text-sm sm:text-base max-w-md font-light leading-relaxed">
              Elegant designs, handcrafted with love for your special moments. From whisper-thin diamond halos to South Sea pearl statement chokers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#shop"
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#2C2621] hover:bg-[#9C7A4A] text-white flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#categories"
                className="px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[#9C7A4A]/40 text-[#2C2621] hover:bg-[#F4ECE1] flex items-center gap-2.5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#9C7A4A]/20 flex items-center justify-center text-[#9C7A4A]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Explore Collection</span>
              </a>
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#E8DEC8]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#9C7A4A] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4A4036]">
                  Certified Jewellery
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#9C7A4A] shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4A4036]">
                  Free Insured Shipping
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#9C7A4A] shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4A4036]">
                  Secure Payment
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#9C7A4A] shrink-0">
                  <RotateCw className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4A4036]">
                  Lifetime Exchange
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Arch Portrait with Model */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Arched image container */}
              <div className="w-full aspect-3/4 rounded-t-[180px] rounded-b-3xl overflow-hidden border-2 border-[#E8DEC8] shadow-2xl relative bg-[#F4ECE1]">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
                  alt="Velora Fine Jewellery Model"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Badge */}
                <div className="absolute top-1/3 -right-2 transform translate-x-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#E8DEC8] max-w-[170px]">
                  <div className="text-[10px] text-[#9C7A4A] font-semibold uppercase tracking-wider">
                    Elegance In Every Detail
                  </div>
                  <div className="font-playfair text-xs text-[#2C2621] mt-0.5">
                    Basra Pearl & Polki Radiance Choker
                  </div>
                </div>

                {/* Bottom slider arrows */}
                <div className="absolute bottom-4 right-4 flex gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-[#E8DEC8]">
                  <button className="w-7 h-7 rounded-full hover:bg-[#F4ECE1] flex items-center justify-center text-[#2C2621]">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 rounded-full hover:bg-[#F4ECE1] flex items-center justify-center text-[#2C2621]">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHED CATEGORIES ROW ("Shop by Category") */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-2xl sm:text-3xl text-center text-[#2C2621] mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {[
            {
              name: 'Rings',
              img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Necklaces',
              img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Earrings',
              img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Bracelets',
              img: 'https://images.unsplash.com/photo-1611591475871-70bf8cfb471c?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Mangalsutra',
              img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Wedding Sets',
              img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="group cursor-pointer text-center flex flex-col items-center"
              onClick={() => {
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-full aspect-3/4 rounded-t-full rounded-b-2xl overflow-hidden border border-[#E8DEC8] bg-[#F4ECE1] group-hover:shadow-lg transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-playfair text-sm font-medium text-[#2C2621] mt-3 group-hover:text-[#9C7A4A] transition-colors">
                {cat.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEDICATED 3D ATELIER SHOWCASE (VELORA EDITORIAL) */}
      <section className="py-16 bg-[#F4ECE1]/60 border-t border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9C7A4A]">
              PRECISION CRAFT IN 3D
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#2C2621]">
              Inspect Every Facet in Real-Time WebGL
            </h2>
            <p className="text-xs sm:text-sm text-[#6D6256] leading-relaxed">
              Experience Velora’s signature cushion halo in interactive 3D. Switch between 18K yellow gold, romantic rose gold, white gold, and platinum to find your perfect finish.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2C2621] text-white hover:bg-[#9C7A4A] transition-colors"
              >
                Book Bridal Consultation
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E8DEC8] bg-white shadow-xl overflow-hidden">
              <Jewellery3DViewer
                modelType="solitaire-ring"
                initialMetal="rose-gold"
                height={400}
                autoRotate={true}
                interactive={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP CATALOGUE */}
      <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9C7A4A]">
              TIMELESS SELECTION
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#2C2621] mt-1">
              Curated Fine Jewellery
            </h2>
          </div>

          <div className="flex gap-2 p-1 bg-[#F4ECE1] rounded-full border border-[#E8DEC8]">
            <button
              onClick={() => setActiveTab('bridal')}
              className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'bridal' ? 'bg-white text-[#2C2621] shadow-xs' : 'text-[#6D6256]'
              }`}
            >
              Bridal Edit
            </button>
            <button
              onClick={() => setActiveTab('everyday')}
              className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'everyday' ? 'bg-white text-[#2C2621] shadow-xs' : 'text-[#6D6256]'
              }`}
            >
              Everyday Luxury
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ivoryProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border border-[#E8DEC8] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="relative aspect-4/3 w-full overflow-hidden bg-[#F4ECE1] cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-white/90 text-[#9C7A4A] border border-[#E8DEC8]">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DEC8] text-[#2C2621] hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#6D6256]'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-[#9C7A4A] tracking-wider uppercase font-medium">
                      {product.metalPurity} · {product.gemstone}
                    </div>
                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-playfair text-xl font-medium text-[#2C2621] group-hover:text-[#9C7A4A] transition-colors mt-1 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6D6256] line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#8C7E70] uppercase tracking-wider">
                        Price
                      </div>
                      <div className="font-mono text-lg font-semibold text-[#2C2621]">
                        {formatINR(product.priceINR)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openProductModal(product)}
                        className="p-2.5 rounded-xl border border-[#E8DEC8] text-[#2C2621] hover:bg-[#F4ECE1] transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 rounded-xl bg-[#2C2621] hover:bg-[#9C7A4A] text-white font-medium text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-xs transition-colors"
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

      {/* 6. BOUTIQUE FOOTER */}
      <footer id="contact" className="bg-[#F4ECE1] border-t border-[#E8DEC8] py-16 text-[#5C5248]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="font-playfair text-xl font-semibold tracking-wider text-[#2C2621]">
              VELORA FINE JEWELLERY
            </div>
            <p className="text-xs leading-relaxed text-[#6D6256]">
              A contemporary jewellery boutique dedicated to gentle luxury, ethical craftsmanship, and heartfelt moments.
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-xs font-semibold text-[#2C2621] tracking-widest uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#shop" className="hover:text-[#9C7A4A]">Bridal Edit</a></li>
              <li><a href="#shop" className="hover:text-[#9C7A4A]">South Sea Pearl Chokers</a></li>
              <li><a href="#shop" className="hover:text-[#9C7A4A]">Rose Gold Halos</a></li>
              <li><a href="#shop" className="hover:text-[#9C7A4A]">Daily Diamond Bands</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-xs font-semibold text-[#2C2621] tracking-widest uppercase mb-4">
              Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsAppointmentOpen(true)} className="hover:text-[#9C7A4A]">
                  Book Salon Appointment
                </button>
              </li>
              <li><a href="#home" className="hover:text-[#9C7A4A]">Complimentary Ring Sizing</a></li>
              <li><a href="#home" className="hover:text-[#9C7A4A]">Shipping & Returns Policy</a></li>
              <li><a href="#home" className="hover:text-[#9C7A4A]">Care & Assay Certification</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-playfair text-xs font-semibold text-[#2C2621] tracking-widest uppercase">
              The Velora Journal
            </h4>
            <p className="text-xs text-[#6D6256]">
              Stories of modern brides, gemstone secrets, and seasonal styling edits.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-white border border-[#E8DEC8] text-xs rounded-l-lg text-[#2C2621] focus:outline-none focus:border-[#9C7A4A]"
              />
              <button
                onClick={() => alert('Thank you for subscribing to The Velora Journal.')}
                className="px-4 py-2 bg-[#2C2621] text-white text-xs font-medium rounded-r-lg uppercase hover:bg-[#9C7A4A]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7E70]">
          <div>© 2026 VELORA FINE JEWELLERY · Concept B: Ivory Elegance by OBVERRA DIGITAL</div>
          <button
            onClick={() => setActiveDesign('hub')}
            className="mt-2 sm:mt-0 text-[#9C7A4A] hover:underline"
          >
            ← Return to OBVERRA Demo Hub
          </button>
        </div>
      </footer>
    </div>
  );
};
