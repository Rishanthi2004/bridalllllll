import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

interface Pan {
  id: string;
  name: string;
  hex: string;
  finish: 'Shimmer' | 'Matte' | 'Metallic' | 'Satin';
  description: string;
}

const PANS: Pan[] = [
  { id: 'p1', name: 'Champagne Veil', hex: '#edd6b1', finish: 'Shimmer', description: 'Inner corner & brow bone illumination' },
  { id: 'p2', name: 'Gilded Amber', hex: '#d4af37', finish: 'Metallic', description: 'Center lid couture bridal gleam' },
  { id: 'p3', name: 'Rose Petal Silk', hex: '#c9968d', finish: 'Satin', description: 'Transitional crease warmth' },
  { id: 'p4', name: 'Terracotta Dust', hex: '#9e5a48', finish: 'Matte', description: 'Soft smokey outer contour' },
  { id: 'p5', name: 'Velvet Espresso', hex: '#3b2520', finish: 'Matte', description: 'Intense lashline depth' },
  { id: 'p6', name: 'Celestial Diamond', hex: '#fbf4ea', finish: 'Metallic', description: 'Multidimensional starlight topper' },
];

export const RealisticEyeshadowPalette: React.FC = () => {
  const [activePan, setActivePan] = useState<Pan>(PANS[1]);
  const [swatchSwiped, setSwatchSwiped] = useState(false);

  const handlePanClick = (pan: Pan) => {
    setActivePan(pan);
    setSwatchSwiped(true);
    setTimeout(() => setSwatchSwiped(false), 2400);
  };

  return (
    <div className="relative flex flex-col items-center max-w-xl mx-auto w-full select-none">
      {/* 3D Couture Eyeshadow Palette Container */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#1c1815] via-[#120f0d] to-[#0a0807] p-5 md:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border border-[#dfbe85]/25">
        {/* Gold Inlaid Edge Trim */}
        <div className="absolute inset-1.5 rounded-xl border border-[#d4af37]/20 pointer-events-none" />

        {/* Palette Brand Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#dfbe85]/15">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm md:text-base tracking-[0.2em] text-[#dfbe85] uppercase font-medium">
              Palette Haute Couture
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-[11px] font-sans text-white/50 tracking-wider">Bridal Edition I</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#dfbe85]/80 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>Pure Pigments</span>
          </div>
        </div>

        {/* 6 High-Definition Eyeshadow Pans Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5 md:gap-4">
          {PANS.map((pan) => {
            const isSelected = activePan.id === pan.id;
            return (
              <motion.button
                key={pan.id}
                onClick={() => handlePanClick(pan)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative flex flex-col items-center p-1.5 rounded-lg transition-all duration-300 text-left ${
                  isSelected
                    ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#120f0d] bg-white/[0.04]'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Metallic Bevel Pan Well */}
                <div className="w-full aspect-square rounded-md p-1 bg-gradient-to-tr from-[#000] via-[#241c14] to-[#453625] shadow-inner relative overflow-hidden">
                  {/* Eyeshadow Cake Texture */}
                  <div
                    className="w-full h-full rounded-sm relative shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-102"
                    style={{ backgroundColor: pan.hex }}
                  >
                    {/* Texture overlay according to finish */}
                    {pan.finish === 'Metallic' || pan.finish === 'Shimmer' ? (
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 1px, transparent 1px)',
                          backgroundSize: '3px 3px',
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                    )}

                    {/* Specular Glint */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/30 rounded-full blur-[2px] pointer-events-none" />

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[#dfbe85]">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Pan Caption */}
                <div className="mt-2 text-center w-full">
                  <p className="text-[10px] font-serif text-[#f5ebe1] truncate leading-tight group-hover:text-[#dfbe85] transition-colors">
                    {pan.name}
                  </p>
                  <p className="text-[8px] font-sans text-white/40 tracking-wider uppercase mt-0.5">
                    {pan.finish}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Swatch Preview Strip on Skin */}
        <div className="mt-5 pt-4 border-t border-[#dfbe85]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171310]/80 rounded-xl p-3 px-4">
          <div className="flex items-center gap-3">
            {/* Skin Swatch simulation */}
            <div className="relative w-24 h-7 rounded-full bg-[#d8b093] overflow-hidden shadow-inner flex items-center px-1.5 border border-white/10">
              <motion.div
                key={activePan.id}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '85%', opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-4 rounded-full relative"
                style={{ backgroundColor: activePan.hex }}
              >
                <div className="absolute inset-0 bg-white/20 blur-[1px]" />
              </motion.div>
            </div>

            <div>
              <div className="text-xs font-serif text-[#f5ebe1] flex items-center gap-2">
                <span>{activePan.name}</span>
                <span className="text-[9px] font-sans px-1.5 py-0.2 bg-[#dfbe85]/20 text-[#dfbe85] rounded uppercase tracking-wider">
                  {activePan.finish}
                </span>
              </div>
              <p className="text-[10px] text-white/50">{activePan.description}</p>
            </div>
          </div>

          <span className="text-[10px] text-[#dfbe85]/90 tracking-wide font-sans self-end sm:self-center">
            {swatchSwiped ? 'Pigment Swatched' : 'Tap any shade to test swatch'}
          </span>
        </div>
      </div>
    </div>
  );
};
