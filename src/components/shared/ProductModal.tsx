import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Sparkles, Check, Calendar, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Jewellery3DViewer } from '../three/Jewellery3DViewer';
import { formatINR } from '../../data/products';
import { MetalType } from '../../types/jewellery';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsAppointmentOpen,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'photo' | '3d'>('photo');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('18k-yellow-gold');
  const [selectedSize, setSelectedSize] = useState('US 7 (54mm)');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isSaved = isInWishlist(selectedProduct.id);

  // Decide 3D model type based on product category
  let modelType: 'solitaire-ring' | 'emerald-pendant' | 'orbital-ring' | 'gemstone' = 'solitaire-ring';
  if (selectedProduct.designOrigin === 'royal-heritage' || selectedProduct.category === 'necklaces') {
    modelType = 'emerald-pendant';
  } else if (selectedProduct.designOrigin === 'future-luxe') {
    modelType = 'orbital-ring';
  }

  const sizes = [
    'US 5 (49mm)',
    'US 6 (52mm)',
    'US 7 (54mm)',
    'US 8 (57mm)',
    'US 9 (59mm)',
    'Custom Size (Concierge)',
  ];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize, selectedMetal);
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeProductModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-zinc-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column (Left) */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-zinc-900/50 border-b lg:border-b-0 lg:border-r border-zinc-800/80">
          <div>
            {/* View Switcher: Photography vs 3D Interactive */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab('photo')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'photo'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                }`}
              >
                High-Res Studio View
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  activeTab === '3d'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive 3D Atelier</span>
              </button>
            </div>

            {/* Media Display */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-zinc-800/80 flex items-center justify-center">
              {activeTab === 'photo' ? (
                <img
                  src={selectedProduct.images.primary}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full">
                  <Jewellery3DViewer
                    modelType={modelType}
                    height="100%"
                    autoRotate={true}
                    interactive={true}
                  />
                </div>
              )}

              {/* Wishlist button overlay */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="absolute top-4 left-4 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isSaved ? 'text-rose-500 fill-rose-500' : 'text-zinc-300'
                  }`}
                />
              </button>

              {/* Badge */}
              {selectedProduct.badge && (
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-sans tracking-wide">
                  {selectedProduct.badge}
                </div>
              )}
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-zinc-800/60 text-center text-[11px] text-zinc-400">
            <div className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span>{selectedProduct.certification}</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
              <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span>Conflict-Free Diamonds</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
              <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span>Lifetime Maintenance</span>
            </div>
          </div>
        </div>

        {/* Details & Purchase Column (Right) */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header / Title / Pricing */}
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 tracking-wider uppercase font-medium">
                <span>{selectedProduct.category.toUpperCase()}</span>
                <span>·</span>
                <span>{selectedProduct.metalPurity}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white mt-1">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{selectedProduct.tagline}</p>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-mono text-2xl md:text-3xl font-bold text-amber-300">
                  {formatINR(selectedProduct.priceINR)}
                </span>
                {selectedProduct.originalPriceINR && (
                  <span className="font-mono text-base text-zinc-500 line-through">
                    {formatINR(selectedProduct.originalPriceINR)}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 ml-auto">
                  Taxes Included · Free Shipping
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Metal Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Precious Metal Finish:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: '18k-yellow-gold', label: '18K Yellow Gold' },
                  { id: '18k-rose-gold', label: '18K Rose Gold' },
                  { id: '18k-white-gold', label: '18K White Gold' },
                  { id: 'platinum-950', label: 'Platinum Pt 950' },
                  { id: '22k-antique-gold', label: '22K Antique Gold' },
                ].map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => setSelectedMetal(metal.id as MetalType)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all ${
                      selectedMetal === metal.id
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {metal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector for Rings */}
            {selectedProduct.category === 'rings' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Select Ring Size:</label>
                  <button
                    onClick={() => alert('OBVERRA Ring Sizing: Standard Indian sizes range from 10 to 22. A complimentary ring sizing kit is dispatched with your order confirmation.')}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-semibold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Specs Accordion */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2 text-xs">
              <h4 className="font-serif text-zinc-200 text-sm mb-2">Artisan Specifications</h4>
              <div className="grid grid-cols-2 gap-y-1.5 text-zinc-400">
                <div>
                  Gross Weight: <span className="text-zinc-200">{selectedProduct.details.grossWeight}</span>
                </div>
                <div>
                  Net Gold: <span className="text-zinc-200">{selectedProduct.details.netGoldWeight}</span>
                </div>
                {selectedProduct.caratWeight && (
                  <div>
                    Diamond Carat: <span className="text-zinc-200">{selectedProduct.caratWeight}</span>
                  </div>
                )}
                {selectedProduct.details.diamondClarity && (
                  <div>
                    Diamond Grade: <span className="text-zinc-200">{selectedProduct.details.diamondClarity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-3">
            <div className="flex gap-3">
              <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-mono text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl font-medium text-xs tracking-wider uppercase bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
              >
                <span>Add to Shopping Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                closeProductModal();
                setIsAppointmentOpen(true);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Private Video Consultation for this Piece</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
