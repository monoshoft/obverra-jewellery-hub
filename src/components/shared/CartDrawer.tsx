import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatINR } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotalINR,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);

  if (!isCartOpen) return null;

  const discountAmount = promoApplied ? Math.round(cartTotalINR * 0.1) : 0;
  const finalTotal = Math.max(0, cartTotalINR - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'OBVERRA10' || promoCode.trim().toUpperCase() === 'LUXE10') {
      setPromoApplied(true);
    } else {
      alert('Try promo code "OBVERRA10" for 10% demo discount');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-zinc-950 text-white h-full flex flex-col shadow-2xl border-l border-zinc-800 z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg tracking-wide">Shopping Bag ({cart.length})</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-900">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg text-zinc-300">Your bag is empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs mt-1">
                Explore our fine jewellery collections and add high-carat masterpieces to your shopping bag.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 rounded-full text-xs font-medium bg-amber-500 text-black hover:bg-amber-400 transition-colors tracking-wide uppercase"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-4 group">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/80 relative">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-medium text-zinc-200 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {item.product.metalPurity} · {item.selectedSize || 'Standard Size'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/60">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono text-sm font-semibold text-amber-300">
                      {formatINR(item.product.priceINR * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-800/80 bg-zinc-950/90 space-y-4">
            {/* Complimentary Gift Box */}
            <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-zinc-900/70 border border-zinc-800/60">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Complimentary Velvet Gift Box & Ribbon</span>
              </label>
              <input
                type="checkbox"
                checked={includeGiftWrap}
                onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                className="rounded accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (try OBVERRA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 uppercase tracking-wider"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Calculation rows */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">{formatINR(cartTotalINR)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>OBVERRA Privilege Discount (10%)</span>
                  <span className="font-mono">-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Global Courier</span>
                <span className="text-emerald-400 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800/60 text-sm font-medium text-white">
                <span className="font-serif">Estimated Total</span>
                <span className="font-mono text-base font-bold text-amber-300">
                  {formatINR(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all duration-200 active:scale-[0.99]"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Insured Delivery · 15-Day Return Assurance · Certified Assay</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
