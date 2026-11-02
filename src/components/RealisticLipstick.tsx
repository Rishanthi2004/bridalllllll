import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Shade {
  id: string;
  name: string;
  colorHex: string;
  finish: string;
}

const SHADES: Shade[] = [
  { id: '1', name: 'Nude Satin 01', colorHex: '#b46d61', finish: 'Velvet Satin' },
  { id: '2', name: 'Imperial Rose 04', colorHex: '#9c3e4c', finish: 'Matte Couture' },
  { id: '3', name: 'Champagne Veil 09', colorHex: '#c78475', finish: 'Luminous Sheer' },
];

export const RealisticLipstick: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShade, setSelectedShade] = useState<Shade>(SHADES[0]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D-styled Luxury Lipstick Construction */}
      <div
        className="relative h-64 w-32 flex flex-col items-center justify-end cursor-pointer group select-none"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to toggle lipstick cap & twist mechanism"
      >
        {/* Ambient Under-shadow */}
        <div
          className="absolute bottom-2 h-4 w-24 rounded-full bg-black/60 blur-md transition-all duration-500 group-hover:scale-110"
        />

        {/* 1. Lipstick Bullet (Revealed when cap opens) */}
        <motion.div
          className="relative z-10 flex flex-col items-center origin-bottom"
          animate={{
            y: isOpen ? -18 : 25,
            scaleY: isOpen ? 1 : 0.4,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Angled teardrop bullet tip */}
          <div
            className="w-10 h-16 rounded-t-full relative overflow-hidden shadow-inner transition-colors duration-500"
            style={{
              backgroundColor: selectedShade.colorHex,
              clipPath: 'polygon(0% 25%, 50% 0%, 100% 15%, 100% 100%, 0% 100%)',
            }}
          >
            {/* Satin velvet sheen highlight streak */}
            <div className="absolute top-0 left-2 w-2 h-full bg-white/35 blur-[1px] transform -skew-x-12" />
            <div className="absolute bottom-0 inset-x-0 h-4 bg-black/25" />
            
            {/* Embossed É monogram */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 text-black/50 font-serif text-xs font-bold">
              É
            </div>
          </div>

          {/* Inner Golden Revolving Neck / Swivel Cylinder */}
          <div className="w-11 h-7 bg-gradient-to-r from-[#99732b] via-[#f7e3af] to-[#7a5719] border-y border-[#5e4312] shadow-sm relative">
            <div className="absolute inset-x-0 top-1 h-[1px] bg-white/60" />
            <div className="absolute inset-x-0 bottom-1 h-[1px] bg-black/40" />
          </div>
        </motion.div>

        {/* 2. Lipstick Cap (Lifts & tilts elegantly when opened) */}
        <motion.div
          className="absolute z-30 w-14 h-32 rounded-t-md origin-bottom cursor-pointer"
          animate={{
            y: isOpen ? -105 : 0,
            rotate: isOpen ? -12 : 0,
            x: isOpen ? -18 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Champagne Gold Fluted Metal Case */}
          <div className="w-full h-full rounded-t-md bg-gradient-to-r from-[#4d3913] via-[#e5c57f] via-[#fff5d6] via-[#d4af37] to-[#593f12] relative shadow-2xl border-t border-[#fbe9b7]">
            {/* Specular reflection line */}
            <div className="absolute top-0 left-3 w-1.5 h-full bg-white/70 blur-[0.5px]" />
            <div className="absolute top-0 right-3 w-1 h-full bg-white/30 blur-[0.5px]" />

            {/* Vertical Fluting ridges */}
            <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[1px] h-full bg-white" />
            </div>

            {/* Stamped Brand Crest on Cap */}
            <div className="absolute inset-x-0 top-6 flex flex-col items-center">
              <span className="font-serif text-[10px] tracking-[0.25em] text-[#2e2008] uppercase font-bold">
                ÉLÉGANCE
              </span>
              <div className="w-6 h-[1px] bg-[#614515] mt-1 opacity-70" />
            </div>
          </div>
        </motion.div>

        {/* 3. Heavyweight Metallic Base / Body */}
        <div className="relative z-20 w-14 h-32 rounded-b-md bg-gradient-to-r from-[#3d2b0e] via-[#deb76a] via-[#fff6db] via-[#c99f30] to-[#45310c] shadow-2xl border-b border-[#291c06] overflow-hidden">
          {/* Specular reflection */}
          <div className="absolute top-0 left-3 w-1.5 h-full bg-white/70 blur-[0.5px]" />

          {/* Magnetic Gold Click Ring */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#291d08] via-[#e8c97e] to-[#241906] border-b border-[#1f1505]" />

          {/* Base bottom engraving */}
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="text-[8px] font-sans tracking-widest text-[#2e2008] font-semibold opacity-75">
              PARIS · 3.5g
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Shade Selector Controls */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          {SHADES.map((shade) => (
            <button
              key={shade.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedShade(shade);
                setIsOpen(true);
              }}
              className={`h-5 w-5 rounded-full transition-all duration-200 border ${
                selectedShade.id === shade.id
                  ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0c0a09] scale-110 border-white'
                  : 'border-white/20 hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: shade.colorHex }}
              title={`${shade.name} (${shade.finish})`}
            />
          ))}
        </div>
        <div className="text-[11px] font-sans tracking-wide text-[#dfbe85] flex items-center gap-1.5">
          <span>{selectedShade.name}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/50">{isOpen ? 'Open' : 'Tap to Reveal'}</span>
        </div>
      </div>
    </div>
  );
};
