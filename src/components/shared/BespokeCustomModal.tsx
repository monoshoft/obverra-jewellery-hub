import React, { useState } from 'react';
import { X, Sparkles, Gem, Layers, CheckCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BespokeCustomModal: React.FC = () => {
  const { isBespokeOpen, setIsBespokeOpen, showNotification } = useShop();

  const [jewelleryType, setJewelleryType] = useState('Bespoke Solitaire Ring');
  const [metal, setMetal] = useState('18K Warm Champagne Gold');
  const [budgetINR, setBudgetINR] = useState('₹5,00,000 - ₹10,00,000');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBespokeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    showNotification('Custom Jewellery Inquiry submitted to Master Craftsmen.');
    setTimeout(() => {
      setIsSuccess(false);
      setIsBespokeOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsBespokeOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl z-10 p-6 md:p-8">
        <button
          onClick={() => setIsBespokeOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-white">Custom Commission Initialized</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Reference: <span className="font-mono text-amber-300">#CAD-ATELIER-441</span>. Our chief 3D jewellery modeler will prepare initial 360° CAD renders for your bespoke design within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Haute Joaillerie Atelier</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-white">Create Your Custom Jewellery</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Collaborate with our certified gemologists and CAD sculptors to commission a one-of-a-kind heirloom piece.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Creation Category:</label>
                <select
                  value={jewelleryType}
                  onChange={(e) => setJewelleryType(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option>Bespoke Solitaire Ring</option>
                  <option>Bridal Choker & Necklace</option>
                  <option>Heritage Kundan & Polki Set</option>
                  <option>Sculptural Platinum Piece</option>
                  <option>Family Gemstone Resetting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Precious Metal:</label>
                <select
                  value={metal}
                  onChange={(e) => setMetal(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option>18K Warm Champagne Gold</option>
                  <option>22K Royal Indian Antique Gold</option>
                  <option>Platinum Pt 950</option>
                  <option>18K Rose Gold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Estimated Commission Budget:</label>
              <select
                value={budgetINR}
                onChange={(e) => setBudgetINR(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option>₹2,50,000 - ₹5,00,000</option>
                <option>₹5,00,000 - ₹10,00,000</option>
                <option>₹10,00,000 - ₹25,00,000</option>
                <option>₹25,00,000+ (High Joaillerie Suite)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Design Vision & Gemstone Preferences:</label>
              <textarea
                rows={3}
                placeholder="Describe your desired stone cut (e.g. Emerald cut, Oval), carat weight, inspiration or family heirloom requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Your Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Email Address:</label>
                <input
                  type="email"
                  required
                  placeholder="name@luxury.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request 3D CAD Blueprint & Quote</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
