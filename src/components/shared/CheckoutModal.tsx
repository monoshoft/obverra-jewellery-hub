import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Truck, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';
import { formatINR } from '../../data/products';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotalINR, clearCart, showNotification } = useShop();

  const [fullName, setFullName] = useState('Ananya Singhania');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [address, setAddress] = useState('Flat 1402, Altamount Towers, Altamount Road');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400026');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `OBV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);

    // Fire celebratory luxury gold confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5E6BE', '#FFFFFF', '#059669'],
      });
    } catch {
      // safe fallback
    }

    clearCart();
    showNotification(`Order ${generatedId} placed in demo mode!`);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl z-10 max-h-[92vh] overflow-y-auto p-6 md:p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
                Simulation Completed · Demo Order Confirmed
              </span>
              <h3 className="font-serif text-3xl text-white">Thank You, {fullName.split(' ')[0]}</h3>
              <p className="text-zinc-400 text-xs max-w-md mx-auto">
                Your order <span className="font-mono text-amber-300 font-bold">{orderId}</span> has been logged in prototype demonstration mode.
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Order Reference</span>
                <span className="font-mono text-amber-300 font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Delivery Address</span>
                <span className="text-zinc-200 text-right">{address}, {city} - {pincode}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Payment Option</span>
                <span className="text-zinc-200">
                  {paymentMethod === 'cod' ? 'Armored Courier Inspection on Delivery' : 'Instant Demo Digital Transfer'}
                </span>
              </div>
              <div className="flex justify-between font-medium text-sm pt-1">
                <span className="text-zinc-300">Total Valuation</span>
                <span className="font-mono text-amber-300 font-bold">{formatINR(cartTotalINR)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl text-xs font-medium uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 transition-all"
              >
                Return to Showcase Experience
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted Demo Checkout</span>
              </div>
              <h3 className="font-serif text-2xl text-white mt-1">Complete Your Acquisition</h3>
              <p className="text-xs text-zinc-400">
                Notice: This checkout is an interactive demonstration prototype for OBVERRA DIGITAL. No real monetary transactions will occur.
              </p>
            </div>

            {/* Order Preview Strip */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400">Items in Bag: </span>
                <span className="text-white font-medium">{cart.length} Pieces</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400">Total: </span>
                <span className="font-mono text-base font-bold text-amber-300">{formatINR(cartTotalINR)}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-semibold text-zinc-300 tracking-wider">
                1. Recipient & Vault Delivery Address
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Phone (for Armored Delivery OTP)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Street Address / Penthouse / Suite</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-semibold text-zinc-300 tracking-wider">
                2. Select Settlement Method (Demo)
              </h4>

              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-zinc-800 bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-medium text-white">
                        Armored Courier Inspection on Delivery (COD)
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Inspect jewellery authenticity with assay specialist before payment.
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-amber-500"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-zinc-800 bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-medium text-white">Instant UPI / Net Banking (Demo Simulation)</div>
                      <div className="text-[11px] text-zinc-400">Google Pay, PhonePe, HDFC, ICICI, Axis Bank</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-amber-500"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-medium text-xs tracking-wider uppercase bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
            >
              <span>Place Demo Order ({formatINR(cartTotalINR)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
