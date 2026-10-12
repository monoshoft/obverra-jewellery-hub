import React, { useState } from 'react';
import { Sparkles, Layers, ChevronUp, ChevronDown, Home } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { DesignId } from '../../types/jewellery';

export const DiscreetDemoBar: React.FC = () => {
  const { activeDesign, setActiveDesign } = useShop();
  const [isExpanded, setIsExpanded] = useState(false);

  const designs: { id: DesignId; label: string; name: string; color: string }[] = [
    { id: 'hub', label: 'HUB', name: 'Demo Hub', color: '#38BDF8' },
    { id: 'design-a', label: 'A', name: 'Noir Luxe (Auriga)', color: '#D4AF37' },
    { id: 'design-b', label: 'B', name: 'Ivory Elegance (Velora)', color: '#9C7A4A' },
    { id: 'design-c', label: 'C', name: 'Royal Heritage (Rajatvam)', color: '#10B981' },
    { id: 'design-d', label: 'D', name: 'Future Luxe (Lumiere)', color: '#60A5FA' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* Expanded Popover */}
      {isExpanded && (
        <div className="mb-2 p-2.5 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl space-y-1.5 w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="px-2 py-1 flex items-center justify-between border-b border-zinc-800/80">
            <span className="text-[10px] font-sans font-semibold tracking-wider text-zinc-400 uppercase">
              OBVERRA Digital Hub
            </span>
            <span className="text-[10px] text-zinc-500">4 Concepts</span>
          </div>

          <div className="space-y-1">
            {designs.map((item) => {
              const isActive = activeDesign === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDesign(item.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold shadow-inner'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <span className="text-[10px] text-zinc-400 uppercase font-mono">Live</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Discreet Trigger Button */}
      <div className="flex items-center gap-1.5 bg-black/80 hover:bg-black backdrop-blur-md border border-white/10 hover:border-amber-500/40 p-1.5 rounded-full shadow-xl transition-all duration-300">
        <button
          onClick={() => setActiveDesign('hub')}
          title="Return to OBVERRA Demo Hub"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeDesign === 'hub' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-zinc-300 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline font-sans text-[11px] tracking-wide">Demo Hub</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-300 hover:bg-zinc-900 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-sans font-medium tracking-wide">
            Switch Concept
          </span>
          {isExpanded ? <ChevronDown className="w-3 h-3 text-zinc-400" /> : <ChevronUp className="w-3 h-3 text-zinc-400" />}
        </button>
      </div>
    </div>
  );
};
