import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Eye, Maximize2 } from 'lucide-react';
import { PortfolioItem } from '../types/index.ts';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Royal Heritage Nuptials',
    category: 'Ceremony',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'Intricate golden kohl eyes framed by micro-fine jewelry setting, paired with a long-wear velvet crimson lip.',
    lighting: 'Golden Hour Palace Courtyard',
    accent: 'Antique Gold & Rose Velvet',
  },
  {
    id: 'port-2',
    title: 'Gossamer Lakefront Vows',
    category: 'Ceremony',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'Translucent skin with dewy moisture barrier, soft champagne highlights catching water reflections.',
    lighting: 'Overcast Soft Ambient Morning',
    accent: 'Luminous Pearl & Nude Silk',
  },
  {
    id: 'port-3',
    title: 'Grand Ballroom Reception Gala',
    category: 'Reception',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'Chandelier-reflective diamond lid topper with sculpted cheekbones that withstand 8 hours of dancing.',
    lighting: 'Crystal Chandelier Warm Tungsten',
    accent: 'Champagne Shimmer & Cocoa',
  },
  {
    id: 'port-4',
    title: 'Couture Veil Editorial',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'High-fashion editorial monochrome palette, graphic soft-wing liner, and micro-powdered poreless finish.',
    lighting: 'Direct Studio Strobe & Reflector',
    accent: 'Monochrome Terracotta',
  },
  {
    id: 'port-5',
    title: 'Sun-Drenched Sangeet Celebration',
    category: 'Pre-Wedding',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'Vibrant copper-bronze wash with illuminated cheek apples, waterproof lash seal, and stain-proof gloss.',
    lighting: 'Sunset Floral Canopy',
    accent: 'Molten Copper & Coral Nude',
  },
  {
    id: 'port-6',
    title: 'Twilight Champagne Soirée',
    category: 'Reception',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    artistNote: 'Sultry smoky eye with micro-fine gold glint and sculpted contour tailored for evening flash photography.',
    lighting: 'Twilight Ambience & Candle Glow',
    accent: 'Smoky Charcoal & Warm Nude',
  },
];

export const PortfolioSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Ceremony', 'Reception', 'Editorial', 'Pre-Wedding'];

  const filteredItems =
    selectedFilter === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="portfolio" className="relative py-28 md:py-36 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#dfbe85]/15 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
              Editorial Portfolio
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight">
            Curated Bridal Archives
          </h2>
        </div>

        {/* Category Filters (Clean Segmented Tabs per Frontend Constitution) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-sans rounded-full transition-all duration-300 ${
                selectedFilter === cat
                  ? 'bg-[#dfbe85] text-[#0c0a09] font-medium shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Magazine-Style Bento Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map((item, index) => {
          // Asymmetric editorial styling: 1st and 4th items have taller presence
          const isLarge = index === 0 || index === 3;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveItem(item)}
              className={`group relative overflow-hidden rounded-2xl bg-[#14100d] border border-white/10 shadow-xl cursor-pointer ${
                isLarge ? 'md:row-span-2 aspect-[3/4]' : 'aspect-[4/3] md:aspect-[3/4]'
              }`}
            >
              {/* Image with zoom on hover */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Hover Golden Brush Stroke Reveal line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#dfbe85] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Editorial Card Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#dfbe85] mb-1">
                  {item.category} · {item.lighting}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#fcefe3] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 font-sans mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {item.artistNote}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-[#dfbe85] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-sans tracking-wide">View Look Architecture</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen High-Resolution Editorial Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#120e0b] border border-[#dfbe85]/30 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left: Large Image View */}
              <div className="md:col-span-7 relative aspect-[4/5] md:aspect-auto h-full min-h-[350px] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Modal Right: Editorial Architecture Dossier */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
                      {activeItem.category} Archive
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white">
                    {activeItem.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-[#dfbe85]/40 my-4" />

                  <p className="text-sm text-white/70 font-sans leading-relaxed">
                    {activeItem.artistNote}
                  </p>

                  <div className="mt-6 space-y-3 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-white/40 block">Lighting Environment</span>
                      <span className="text-[#f5ebe1] font-serif">{activeItem.lighting}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Palette Signature</span>
                      <span className="text-[#dfbe85] font-serif">{activeItem.accent}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <a
                    href="#contact"
                    onClick={() => setActiveItem(null)}
                    className="w-full block text-center py-2.5 rounded-full bg-[#dfbe85] text-[#0c0a09] font-medium text-xs tracking-wider uppercase hover:bg-white transition-colors"
                  >
                    Request Similar Look For Your Wedding
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
