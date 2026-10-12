import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  CheckCircle,
  Gem,
  Eye,
  Sliders,
  Send,
  ShieldCheck,
  Check,
  Code2,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { DESIGN_CONCEPTS, AGENCY_INFO } from '../../data/concepts';
import { DesignId } from '../../types/jewellery';

export const DemoHub: React.FC = () => {
  const { setActiveDesign, showNotification } = useShop();

  const [agencyContactOpen, setAgencyContactOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientBrand, setClientBrand] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDesign, setPreferredDesign] = useState('Noir Luxe (Auriga Jewels)');
  const [submitted, setSubmitted] = useState(false);

  const handleStartProject = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Project brief submitted to OBVERRA DIGITAL executive team.');
    setTimeout(() => {
      setSubmitted(false);
      setAgencyContactOpen(false);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-white selection:bg-sky-500/20 selection:text-white font-jakarta">
      {/* 1. AGENCY HEADER */}
      <header className="sticky top-0 z-40 bg-[#050814]/90 backdrop-blur-md border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Agency Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-black font-bold shadow-lg shadow-sky-500/20">
              <span className="font-mono text-base tracking-tighter">OD</span>
            </div>
            <div>
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-white block leading-none">
                OBVERRA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-sky-400 uppercase block mt-1 font-medium">
                DIGITAL
              </span>
            </div>
          </div>

          {/* Hub Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-zinc-400">
            <a href="#concepts" className="hover:text-sky-400 transition-colors">
              The 4 Designs
            </a>
            <a href="#matrix" className="hover:text-sky-400 transition-colors">
              Comparison Matrix
            </a>
            <a href="#technology" className="hover:text-sky-400 transition-colors">
              Architecture & 3D
            </a>
            <a href="#about-agency" className="hover:text-sky-400 transition-colors">
              About Agency
            </a>
          </nav>

          {/* Primary CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAgencyContactOpen(true)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black shadow-lg shadow-sky-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </header>

      {/* 2. DEMO HUB HERO */}
      <section className="relative pt-20 pb-28 overflow-hidden border-b border-sky-950">
        {/* Dynamic ambient lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-sky-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs tracking-widest uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OBVERRA Fine Joaillerie Innovation Suite</span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.06] text-white max-w-4xl mx-auto">
            Four Visions. <br className="hidden sm:inline" />
            <span className="italic bg-gradient-to-r from-sky-200 via-blue-200 to-amber-200 bg-clip-text text-transparent">
              One Extraordinary
            </span>{' '}
            Jewellery Experience.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {AGENCY_INFO.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#concepts"
              className="px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black flex items-center gap-2 shadow-xl shadow-sky-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore All Designs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setAgencyContactOpen(true)}
              className="px-8 py-4 rounded-full text-xs font-medium tracking-wider uppercase border border-sky-500/40 text-white hover:bg-sky-500/10 flex items-center gap-2 transition-colors"
            >
              <span>Start Your Jewellery Project</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto border-t border-sky-950">
            {AGENCY_INFO.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-base sm:text-lg font-bold text-sky-300">
                  {metric.value}
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUR MASTER PREVIEW CARDS */}
      <section id="concepts" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
            Client Direction Showcase
          </span>
          <h2 className="font-cormorant text-3xl sm:text-5xl text-white">
            Choose Your Creative Direction
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Each concept features an independent design language, bespoke color harmonies, tailored typography, custom 3D WebGL scenes, and complete e-commerce checkout.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {DESIGN_CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className="rounded-3xl border border-sky-900/40 bg-[#090E1E] overflow-hidden flex flex-col justify-between shadow-2xl hover:border-sky-500/60 transition-all duration-300 group"
            >
              {/* Screenshot-Style Live Rendered Visual Preview */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/80 border-b border-sky-950">
                {/* Visual Representation tailored to each concept */}
                {concept.id === 'design-a' && (
                  <div className="w-full h-full relative bg-[#0A0A0C] p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">
                      <span className="font-cinzel text-xs font-bold tracking-widest">
                        AURIGA JEWELS
                      </span>
                      <span className="text-[10px] uppercase font-mono">Noir Luxe</span>
                    </div>
                    <div className="relative z-10 space-y-2 max-w-xs">
                      <span className="text-[9px] tracking-widest text-[#D4AF37] uppercase">
                        TIMELESS BEAUTY
                      </span>
                      <div className="font-cormorant text-2xl text-[#F5E6BE] leading-tight">
                        Jewellery That Tells Your Story
                      </div>
                      <div className="text-[10px] text-[#D4AF37]/80 font-mono">
                        5000+ Happy Customers · 100% Certified
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                      alt="Noir Luxe Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
                  </div>
                )}

                {concept.id === 'design-b' && (
                  <div className="w-full h-full relative bg-[#FAF7F2] p-6 flex flex-col justify-between text-[#2C2621]">
                    <div className="flex justify-between items-center text-[#9C7A4A] border-b border-[#E8DEC8] pb-3">
                      <span className="font-playfair text-xs font-bold tracking-widest">
                        VELORA FINE JEWELLERY
                      </span>
                      <span className="text-[10px] uppercase font-mono">Ivory Elegance</span>
                    </div>
                    <div className="relative z-10 space-y-2 max-w-xs">
                      <span className="text-[9px] tracking-widest text-[#9C7A4A] uppercase font-semibold">
                        ELEGANCE IN EVERY DETAIL
                      </span>
                      <div className="font-playfair text-2xl text-[#2C2621] leading-tight">
                        Modern Jewellery for Every Moment
                      </div>
                      <div className="text-[10px] text-[#6D6256]">
                        Arched Editorial · South Sea Pearls
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
                      alt="Ivory Elegance Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none" />
                  </div>
                )}

                {concept.id === 'design-c' && (
                  <div className="w-full h-full relative bg-[#07160F] p-6 flex flex-col justify-between text-[#F7E7B4]">
                    <div className="flex justify-between items-center text-[#E5B94E] border-b border-[#E5B94E]/25 pb-3">
                      <span className="font-cinzel text-xs font-bold tracking-widest">
                        RAJATVAM JEWELS
                      </span>
                      <span className="text-[10px] uppercase font-mono">Royal Heritage</span>
                    </div>
                    <div className="relative z-10 space-y-2 max-w-xs">
                      <span className="text-[9px] tracking-widest text-[#E5B94E] uppercase">
                        TRADITION MEETS MODERNITY
                      </span>
                      <div className="font-cormorant text-2xl text-[#F7E7B4] leading-tight">
                        Heritage Crafted for Today
                      </div>
                      <div className="text-[10px] text-[#E5B94E]/80 font-mono">
                        25+ Years · 10,000+ Happy Brides · BIS 916
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                      alt="Royal Heritage Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07160F] via-[#07160F]/80 to-transparent pointer-events-none" />
                  </div>
                )}

                {concept.id === 'design-d' && (
                  <div className="w-full h-full relative bg-[#040711] p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-center text-sky-400 border-b border-sky-900/40 pb-3">
                      <span className="font-cinzel text-xs font-bold tracking-widest">
                        LUMIERE JEWELLERY
                      </span>
                      <span className="text-[10px] uppercase font-mono">Future Luxe</span>
                    </div>
                    <div className="relative z-10 space-y-2 max-w-xs">
                      <span className="text-[9px] tracking-widest text-sky-400 uppercase">
                        LUXURY • CRAFTSMANSHIP • FOREVER
                      </span>
                      <div className="font-cormorant text-2xl text-white leading-tight">
                        More Than Jewellery, It's a Feeling
                      </div>
                      <div className="text-[10px] text-sky-200/70 font-mono">
                        3D Generative Form · Pt 950 Mobius Loop
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                      alt="Future Luxe Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#040711] via-[#040711]/80 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Badge Top Left */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide">
                  {concept.code} · {concept.badge}
                </div>
              </div>

              {/* Card Meta & Action Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl text-white font-medium">
                      {concept.brandName}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {concept.primaryPalette.map((col, idx) => (
                        <div
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {concept.creativeDirection}. {concept.vibe}.
                  </p>

                  <div className="pt-2 text-[11px] text-zinc-400">
                    <span className="text-sky-400 font-medium">Target Demographics: </span>
                    <span>{concept.targetAudience}</span>
                  </div>
                </div>

                {/* Double CTA Buttons: Explore Design & View Full Website */}
                <div className="pt-4 border-t border-sky-950 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveDesign(concept.id)}
                    className="flex-1 py-3 px-5 rounded-xl font-medium text-xs tracking-wider uppercase bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    <span>Explore Design</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveDesign(concept.id)}
                    className="py-3 px-5 rounded-xl font-medium text-xs tracking-wider uppercase border border-sky-500/40 text-white hover:bg-sky-500/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Full Website</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DESIGN COMPARISON MATRIX SECTION */}
      <section id="matrix" className="py-24 bg-[#030611] border-t border-b border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              Strategic Evaluation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-white">
              Concept Comparison Matrix
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light">
              Compare stylistic pillars, typography systems, 3D implementations, and market positioning across all four luxury concepts.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-sky-900/40 bg-[#070D1E] shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-sky-900/50 bg-[#091124] text-sky-300 font-mono uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5">Design A (Noir Luxe)</th>
                  <th className="p-4 sm:p-5">Design B (Ivory Elegance)</th>
                  <th className="p-4 sm:p-5">Design C (Royal Heritage)</th>
                  <th className="p-4 sm:p-5">Design D (Future Luxe)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-950 text-zinc-300">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Brand Name</td>
                  <td className="p-4 sm:p-5 text-[#D4AF37] font-serif">AURIGA JEWELS</td>
                  <td className="p-4 sm:p-5 text-[#9C7A4A] font-serif">VELORA FINE JEWELLERY</td>
                  <td className="p-4 sm:p-5 text-[#E5B94E] font-serif">RAJATVAM JEWELS</td>
                  <td className="p-4 sm:p-5 text-sky-400 font-serif">LUMIERE JEWELLERY</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Visual Vibe</td>
                  <td className="p-4 sm:p-5">Obsidian, Midnight & Gold</td>
                  <td className="p-4 sm:p-5">Warm Ivory, Pearl & Linen</td>
                  <td className="p-4 sm:p-5">Royal Emerald & Antique Gold</td>
                  <td className="p-4 sm:p-5">Cosmic Blue & Platinum</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Typography</td>
                  <td className="p-4 sm:p-5 font-serif">Cormorant Garamond + Cinzel</td>
                  <td className="p-4 sm:p-5 font-serif">Playfair Display + Outfit</td>
                  <td className="p-4 sm:p-5 font-serif">Cormorant + Cinzel Royal</td>
                  <td className="p-4 sm:p-5 font-sans">Cinzel + Modern Sans</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Interactive 3D</td>
                  <td className="p-4 sm:p-5">Solitaire Diamond Ring Studio</td>
                  <td className="p-4 sm:p-5">Cushion Halo Rose Gold 3D</td>
                  <td className="p-4 sm:p-5">Royal Emerald & Polki Pendant</td>
                  <td className="p-4 sm:p-5">Orbital Mobius Platinum Ring</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Primary Hero Product</td>
                  <td className="p-4 sm:p-5">1.80 ct Diamond Solitaire</td>
                  <td className="p-4 sm:p-5">South Sea Pearl Choker</td>
                  <td className="p-4 sm:p-5">Zambian Emerald Bridal Haar</td>
                  <td className="p-4 sm:p-5">Sculptural Platinum Solitaire</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Ideal Jeweller</td>
                  <td className="p-4 sm:p-5">Global Fine Jewellery House</td>
                  <td className="p-4 sm:p-5">Boutique Contemporary Bridal</td>
                  <td className="p-4 sm:p-5">Heritage Indian Bridal Atelier</td>
                  <td className="p-4 sm:p-5">Avant-Garde Architectural Studio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY & ARCHITECTURE SECTION */}
      <section id="technology" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
            Engineered by OBVERRA DIGITAL
          </span>
          <h2 className="font-cormorant text-3xl sm:text-5xl text-white">
            Enterprise Architecture & Three.js 3D Engine
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Built using modern, stable web standards with seamless hardware acceleration, real-time lighting physics, and responsive e-commerce checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#090E1E] border border-sky-900/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white">Three.js & WebGL 3D Refraction</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              True diamond dispersion, IOR 2.417 refraction, physical metal roughness switching, and studio rim lighting rendered directly in the browser with zero plugin dependencies.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#090E1E] border border-sky-900/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white">Complete E-Commerce Flow</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cart drawers, Indian Rupee (₹) price formatting, wishlist toggling, variant metal selectors, ring sizing guides, and demo checkout order simulation with celebratory confetti.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#090E1E] border border-sky-900/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white">100% Calibrated Mobile UX</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Strictly verified on 320px, 375px, 390px, 430px, tablet, and 1440px desktop screens. Discreet mobile-safe navigation with zero clipping or layout overflow.
            </p>
          </div>
        </div>
      </section>

      {/* 6. AGENCY FOOTER */}
      <footer id="about-agency" className="bg-[#02040A] border-t border-sky-950 py-16 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-black font-bold">
                OD
              </div>
              <span className="font-cinzel text-lg font-bold tracking-widest text-white">
                OBVERRA DIGITAL
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Award-winning digital creative agency partnering with world-class fine jewellery brands, couture ateliers, and luxury maisons.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-widest mb-4">
              Demo Websites
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveDesign('design-a')} className="hover:text-white">
                  Concept A: Noir Luxe (Auriga)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveDesign('design-b')} className="hover:text-white">
                  Concept B: Ivory Elegance (Velora)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveDesign('design-c')} className="hover:text-white">
                  Concept C: Royal Heritage (Rajatvam)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveDesign('design-d')} className="hover:text-white">
                  Concept D: Future Luxe (Lumiere)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-widest mb-4">
              Agency Services
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>High-Joaillerie E-Commerce Design</li>
              <li>WebGL & 3D Interactive Configuration</li>
              <li>Luxury Brand Identity & Editorial Systems</li>
              <li>Custom ERP & Inventory Synchronization</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-widest">
              Initiate Consultation
            </h4>
            <p className="text-xs text-zinc-500">
              Ready to elevate your fine jewellery house into an iconic digital flagship?
            </p>
            <button
              onClick={() => setAgencyContactOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-sky-500 text-black hover:bg-white transition-colors"
            >
              Contact OBVERRA Partners
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-sky-950/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600">
          <div>© 2026 OBVERRA DIGITAL · All 4 Jewellery Showcase Concepts Rights Reserved</div>
          <div>Developed with React, Next.js App Standards, Three.js & Tailwind CSS</div>
        </div>
      </footer>

      {/* Agency Project Inquiry Modal */}
      {agencyContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setAgencyContactOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#070D1E] text-white rounded-3xl border border-sky-900 shadow-2xl z-10 p-6 md:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white">Project Inquiry Received</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you, {clientName}. Our Creative Director will contact you within 24 hours to arrange an in-person or virtual proposal workshop.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStartProject} className="space-y-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sky-400 font-medium font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OBVERRA DIGITAL Agency Engagement</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Start Your Jewellery Project</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Tell us about your brand and vision. We will engineer a custom digital experience tailored to your jewellery collections.
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Preferred Concept Direction:</label>
                  <select
                    value={preferredDesign}
                    onChange={(e) => setPreferredDesign(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A1229] border border-sky-900 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option>Noir Luxe (Auriga Jewels — Ultra Luxury Obsidian)</option>
                    <option>Ivory Elegance (Velora — Contemporary Boutique)</option>
                    <option>Royal Heritage (Rajatvam — Indian Bridal & Polki)</option>
                    <option>Future Luxe (Lumiere — Sculptural Avant-Garde)</option>
                    <option>Custom Fusion Architecture</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Your Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="Founder / Director"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A1229] border border-sky-900 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Brand Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Gems"
                      value={clientBrand}
                      onChange={(e) => setClientBrand(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A1229] border border-sky-900 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Work Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="director@finejewellery.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A1229] border border-sky-900 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAgencyContactOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 rounded-xl font-medium text-xs tracking-wider uppercase bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    <span>Submit Project Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
