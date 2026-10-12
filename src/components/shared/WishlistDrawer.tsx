import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatINR } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    openProductModal,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-zinc-950 text-white h-full flex flex-col shadow-2xl border-l border-zinc-800 z-10">
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <h3 className="font-serif text-lg tracking-wide">Saved Wishlist ({wishlist.length})</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-900">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                <Heart className="w-8 h-8 text-zinc-600" />
              </div>
              <h4 className="font-serif text-lg text-zinc-300">Your wishlist is empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs mt-1">
                Tap the heart icon on any jewellery piece to curate your personal collection.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 group">
                <div
                  className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/80 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductModal(product);
                  }}
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="font-serif text-sm font-medium text-zinc-200 line-clamp-1 hover:text-amber-300 cursor-pointer"
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductModal(product);
                        }}
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {product.metalPurity} · {product.gemstone}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-sm font-semibold text-amber-300">
                      {formatINR(product.priceINR)}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(product);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
