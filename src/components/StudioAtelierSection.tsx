import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Flame } from 'lucide-react';
import { RealisticEyeshadowPalette } from './RealisticEyeshadowPalette.tsx';
import { RealisticLipstick } from './RealisticLipstick.tsx';
import { RealisticCompactMirror } from './RealisticCompactMirror.tsx';

type LightingMood = 'morning' | 'golden' | 'candlelit';

export const StudioAtelierSection: React.FC = () => {
  const [mood, setMood] = useState<LightingMood>('golden');
  const [isSprayed, setIsSprayed] = useState(false);
  const [spongeBouncing, setSpongeBouncing] = useState(false);

  const triggerPerfumeSpray = () => {
    setIsSprayed(true);
    setTimeout(() => setIsSprayed(false), 1600);
  };

  const triggerSpongeBounce = () => {
    setSpongeBouncing(true);
    setTimeout(() => setSpongeBouncing(false), 900);
  };

  // Background ambiance depending on lighting mood
  const moodStyles = {
    morning: {
      bg: 'from-[#141210] via-[#1a1715] to-[#0c0a09]',
      glow: 'rgba(255, 245, 230, 0.08)',
      label: 'Morning Suite · Soft Diffused Daylight',
    },
    golden: {
      bg: 'from-[#1f1710] via-[#17120d] to-[#0c0a09]',
      glow: 'rgba(212, 175, 55, 0.12)',
      label: 'Golden Hour · Warm Sunlit Glow',
    },
    candlelit: {
      bg: 'from-[#170e0a] via-[#120b08] to-[#0c0a09]',
      glow: 'rgba(224, 112, 64, 0.12)',
      label: 'Candlelit Banquet · Dramatic Intimacy',
    },
  };

  return (
    <section
      id="atelier"
      className={`relative py-28 md:py-36 px-4 md:px-8 transition-colors duration-1000 bg-gradient-to-b ${moodStyles[mood].bg}`}
    >
      {/* Ambient Lighting Glow from Studio Lamps */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${moodStyles[mood].glow} 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header & Studio Mood Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#dfbe85]/15 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
                The Master Atelier
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight">
              Artisan Cosmetic Instruments
            </h2>
            <p className="mt-2 text-sm text-white/60 font-sans max-w-xl">
              Every formula is custom hand-blended. Interact with our luxury cosmetic collection.
            </p>
          </div>

          {/* Studio Lighting Mood Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
            <button
              onClick={() => setMood('morning')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                mood === 'morning' ? 'bg-[#dfbe85] text-[#0c0a09] font-medium' : 'text-white/70 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Morning</span>
            </button>
            <button
              onClick={() => setMood('golden')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                mood === 'golden' ? 'bg-[#dfbe85] text-[#0c0a09] font-medium' : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Golden</span>
            </button>
            <button
              onClick={() => setMood('candlelit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                mood === 'candlelit' ? 'bg-[#dfbe85] text-[#0c0a09] font-medium' : 'text-white/70 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Candlelit</span>
            </button>
          </div>
        </div>

        {/* Studio Composition: Palette, Perfume, Blender & Lipsticks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Eyeshadow Palette (Takes center-left) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <RealisticEyeshadowPalette />
          </div>

          {/* Interactive Beauty Product Ensemble (Takes right side) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
            {/* 1. Realistic Velvet Lipstick */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm flex flex-col items-center">
              <RealisticLipstick />
            </div>

            {/* 2. Realistic Compact Mirror */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm flex flex-col items-center">
              <RealisticCompactMirror />
            </div>

            {/* 3. Luxury Crystalline Perfume Bottle (Tap to Spray Mist!) */}
            <div
              onClick={triggerPerfumeSpray}
              className="p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm flex flex-col items-center cursor-pointer group select-none relative overflow-hidden"
              title="Click to release artisanal fragrance mist"
            >
              {/* Perfume Mist Particles Simulation */}
              <AnimatePresence>
                {isSprayed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2, y: 10 }}
                    animate={{ opacity: 0.9, scale: 1.5, y: -45 }}
                    exit={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute top-8 pointer-events-none z-30"
                  >
                    <div className="w-20 h-16 rounded-full bg-gradient-to-t from-transparent via-[#dfbe85]/40 to-white/60 blur-md" />
                    <Sparkles className="w-4 h-4 text-[#fff] absolute top-2 left-6 animate-ping" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Glass Flacon SVG */}
              <div className="relative w-28 h-40 flex items-center justify-center">
                <svg
                  width="110"
                  height="160"
                  viewBox="0 0 110 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto filter drop-shadow-xl"
                >
                  <defs>
                    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="25%" stopColor="rgba(223,190,133,0.3)" />
                      <stop offset="70%" stopColor="rgba(180,140,80,0.15)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
                    </linearGradient>
                    <linearGradient id="goldSprayer" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7a5818" />
                      <stop offset="30%" stopColor="#f7deb6" />
                      <stop offset="70%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#543b0d" />
                    </linearGradient>
                  </defs>

                  {/* Golden Atomizer Sprayer & Cap */}
                  <rect x="42" y="12" width="26" height="18" rx="2" fill="url(#goldSprayer)" />
                  <rect x="46" y="2" width="18" height="10" rx="1" fill="url(#goldSprayer)" />
                  <circle cx="55" cy="7" r="1.5" fill="#362406" />

                  {/* Fluted Faceted Heavy Crystal Bottle */}
                  <rect
                    x="16"
                    y="30"
                    width="78"
                    height="120"
                    rx="14"
                    fill="url(#glassGrad)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  />

                  {/* Inner Fragrance Liquid (Warm Amber Essence) */}
                  <rect
                    x="22"
                    y="55"
                    width="66"
                    height="88"
                    rx="8"
                    fill="rgba(223, 190, 133, 0.4)"
                  />

                  {/* Glass Specular Highlights */}
                  <path d="M22 36 L22 144" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />
                  <path d="M88 36 L88 144" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />

                  {/* Central Label */}
                  <rect x="30" y="70" width="50" height="35" rx="3" fill="#0f0c0a" stroke="#dfbe85" strokeWidth="0.8" />
                  <text x="55" y="85" textAnchor="middle" fill="#dfbe85" fontSize="7" fontFamily="Cormorant Garamond, serif" fontWeight="bold" letterSpacing="1">
                    ÉLÉGANCE
                  </text>
                  <text x="55" y="95" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Plus Jakarta Sans, sans-serif" opacity="0.7" letterSpacing="0.5">
                    EAU DE BRIDE
                  </text>
                </svg>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs font-serif text-[#f5ebe1]">Bridal Aura Essence</p>
                <span className="text-[10px] text-[#dfbe85]">{isSprayed ? '✨ Mist Released' : 'Tap to Spray'}</span>
              </div>
            </div>

            {/* 4. Realistic Beauty Blender / Sponge (Gentle Bounce on Tap!) */}
            <div
              onClick={triggerSpongeBounce}
              className="p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm flex flex-col items-center cursor-pointer group select-none"
              title="Click to bounce beauty blender"
            >
              <div className="h-40 flex items-center justify-center">
                <motion.div
                  animate={
                    spongeBouncing
                      ? {
                          y: [-25, 0, -12, 0],
                          scaleX: [0.9, 1.15, 0.96, 1],
                          scaleY: [1.15, 0.85, 1.05, 1],
                        }
                      : { y: 0 }
                  }
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="relative w-20 h-28 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 30%, #f0c5be 0%, #db9086 45%, #914840 100%)',
                    clipPath: 'polygon(50% 0%, 90% 40%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 10% 40%)',
                    borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
                  }}
                >
                  {/* Sponge Micro-Pore Texture */}
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.5) 1px, transparent 1px)',
                      backgroundSize: '2.5px 2.5px',
                    }}
                  />
                  {/* Highlight */}
                  <div className="absolute top-2 left-3 w-6 h-10 bg-white/35 rounded-full blur-[2px] transform -rotate-12" />
                </motion.div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs font-serif text-[#f5ebe1]">Micro-Flock Blender</p>
                <span className="text-[10px] text-[#dfbe85]">{spongeBouncing ? 'Bouncing' : 'Tap to Bounce'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
