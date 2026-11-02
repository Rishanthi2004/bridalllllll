import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const RealisticCompactMirror: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex flex-col items-center select-none">
      <div
        className="relative h-60 w-60 md:h-72 md:w-72 flex items-center justify-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to open / close compact mirror"
      >
        {/* Ambient shadow underneath */}
        <div className="absolute bottom-6 h-6 w-48 rounded-full bg-black/60 blur-lg transition-transform duration-500 group-hover:scale-105" />

        {/* 1. Base Pan (Holds the pressed powder) */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#38260b] via-[#85601d] via-[#d4af37] to-[#e8cb85] p-2.5 shadow-2xl border border-[#ffe4a0]/40">
          {/* Inner golden bezel */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1c1407] to-[#362509] p-3 flex items-center justify-center shadow-inner relative overflow-hidden">
            {/* Fine Pressed Setting Powder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f2e4d8] via-[#e8d2c0] to-[#dbc2ae] shadow-inner relative flex items-center justify-center overflow-hidden">
              {/* Powder grain texture simulation */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Embossed Bridal Motif on pressed powder */}
              <div className="relative text-center opacity-40 mix-blend-multiply">
                <span className="font-serif italic text-sm md:text-base tracking-[0.2em] text-[#594032]">
                  Élégance
                </span>
                <div className="text-[8px] tracking-widest text-[#594032] uppercase">
                  Poudre Translucide
                </div>
              </div>

              {/* Shimmer particles on powder surface */}
              <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full opacity-80 animate-ping" />
              <div className="absolute bottom-8 left-10 w-1.5 h-1.5 bg-white/90 rounded-full blur-[0.5px]" />
            </div>

            {/* Click hinge clasp at bottom */}
            <div className="absolute bottom-0.5 w-6 h-1.5 bg-gradient-to-r from-[#6b4e18] via-[#ffe39e] to-[#6b4e18] rounded-t-sm" />
          </div>
        </div>

        {/* 2. Top Lid (Hinged at top: swings open/closed) */}
        <motion.div
          className="absolute top-2 w-48 h-48 md:w-56 md:h-56 rounded-full origin-top cursor-pointer"
          animate={{
            rotateX: isOpen ? 68 : 0,
            y: isOpen ? -38 : 0,
            scaleY: isOpen ? 0.92 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Lid Exterior / Mirror Surface when rotated */}
          {isOpen ? (
            /* Mirror View when Open */
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3a280c] via-[#85601d] via-[#d4af37] to-[#e8cb85] p-2.5 shadow-2xl border border-[#ffe4a0]/40 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1a202c] via-[#4a5568] via-[#e2e8f0] to-[#f8fafc] p-2 relative overflow-hidden shadow-inner flex items-center justify-center">
                {/* Mirror Specular Sheen & Light Beam */}
                <div className="absolute -top-12 -left-12 w-32 h-64 bg-white/40 blur-md transform rotate-45 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />

                {/* Reflection Aura */}
                <div className="text-center select-none opacity-80">
                  <Sparkles className="w-4 h-4 mx-auto text-[#dfbe85] mb-1 opacity-70 animate-pulse" />
                  <span className="font-serif italic text-xs tracking-wider text-white drop-shadow">
                    HD Pure Mirror
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Closed Lid Exterior (Champagne Gold Engraved Crest) */
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffd880] via-[#c99e38] via-[#755214] to-[#402b07] p-3 shadow-2xl border border-[#fff2c2] flex items-center justify-center relative">
              <div className="absolute inset-2 rounded-full border border-white/30" />
              <div className="text-center">
                <span className="font-serif text-lg tracking-[0.3em] text-[#241704] font-bold">
                  ÉLÉGANCE
                </span>
                <p className="text-[9px] tracking-widest text-[#241704]/80 uppercase mt-0.5">
                  Atelier Bridal
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="text-[11px] font-sans tracking-wide text-[#dfbe85] flex items-center gap-2">
        <span>Illuminating Powder Compact</span>
        <span className="text-white/40">·</span>
        <span className="text-white/50">{isOpen ? 'Click to Close' : 'Click to Open'}</span>
      </div>
    </div>
  );
};
