import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductModal } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gemstone.toLowerCase().includes(q) ||
      p.metal.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl z-10 p-6 max-h-[85vh] flex flex-col">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search by diamond, emerald, rings, choker, gold..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-600 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto text-xs text-zinc-400 border-b border-zinc-900">
          <span className="shrink-0 text-zinc-500">Popular:</span>
          {['Solitaire', 'Emerald Choker', 'Polki', 'Platinum Ring', 'Mangalsutra', 'Kada'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-300 transition-colors shrink-0 text-[11px]"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto mt-4 divide-y divide-zinc-900 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No fine jewellery pieces matching "{query}". Try searching "Ring", "Choker", or "Diamond".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  openProductModal(p);
                }}
                className="pt-3 pb-3 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/40 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                    <img src={p.images.primary} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-zinc-200 group-hover:text-amber-300 transition-colors">
                      {p.name}
                    </h4>
                    <div className="text-[11px] text-zinc-500">
                      {p.metalPurity} · {p.gemstone}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-amber-300">
                    {formatINR(p.priceINR)}
                  </div>
                  <span className="text-[10px] text-zinc-500 flex items-center justify-end gap-1 group-hover:text-amber-400">
                    <span>View Piece</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
