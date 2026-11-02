import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Play, Pause, ZoomIn, X, ChevronRight, ChevronLeft, ShieldCheck, Droplets, Wand2, Star } from 'lucide-react';

interface HotspotItem {
  id: string;
  x: string;
  y: string;
  name: string;
  category: string;
  description: string;
  highlight: string;
  hex: string;
  icon: string;
  badge: string;
}

const KIT_ITEMS: HotspotItem[] = [
  {
    id: 'wand',
    x: '26%',
    y: '33%',
    name: 'Flocked Micro-Buffer Wand',
    category: 'Precision Application',
    description: 'Deposits micro-fine minerals with zero fallout or creasing.',
    highlight: 'Seamless Velvet Finish',
    hex: '#e2a77f',
    icon: 'wand',
    badge: '01 / APPLICATION',
  },
  {
    id: 'gloss',
    x: '53%',
    y: '28%',
    name: 'Lustreglass Prismatic Glaze',
    category: 'High-Impact Lip Formula',
    description: 'Hyper-reflective mirror glaze infused with jojoba oils.',
    highlight: 'Prismatic Wet Sheen',
    hex: '#d87063',
    icon: 'droplet',
    badge: '02 / GLOSS COUTURE',
  },
  {
    id: 'eye-pot',
    x: '78%',
    y: '37%',
    name: 'Dazzleshadow Molten Metal Pot',
    category: 'Crease-Proof Eyelid Foil',
    description: 'Wet-look foiled metallic pearls that ignite under event chandeliers.',
    highlight: '24-Hour Banquet Shimmer',
    hex: '#a35043',
    icon: 'star',
    badge: '03 / FOIL PIGMENT',
  },
  {
    id: 'lipstick',
    x: '62%',
    y: '72%',
    name: 'Powder Kiss Moisture-Matte',
    category: 'Velvet Lipstick Bullet',
    description: 'Weightless blurred terracotta matte with zero dryness.',
    highlight: '18-Hour Cry-Proof Wear',
    hex: '#df7961',
    icon: 'sparkle',
    badge: '04 / LIP BULLET',
  },
  {
    id: 'shockwave',
    x: '46%',
    y: '53%',
    name: '24K Terracotta Mineral Explosion',
    category: 'Haute Micro-Milled Dust',
    description: 'Pure micronized earth pigments suspended in 24K gold light.',
    highlight: 'Sweat & Flash Proof',
    hex: '#e08f65',
    icon: 'flame',
    badge: '05 / PURE MINERAL',
  },
];

export const BridalLooksSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showEnlarged, setShowEnlarged] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeItem = KIT_ITEMS[activeIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic animation loop: cycles every 3.5 seconds with live progress tracking
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const duration = 3500;
    const intervalStep = 50;
    const increment = (intervalStep / duration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, intervalStep);

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KIT_ITEMS.length);
      setProgress(0);
    }, duration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, activeIndex]);

  const selectHotspot = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % KIT_ITEMS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + KIT_ITEMS.length) % KIT_ITEMS.length);
    setProgress(0);
  };

  return (
    <section id="bridal-makeup" className="relative py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Animated Energy Radiance */}
      <motion.div
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.15, 0.35, 0.15],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#dfbe85]/20 via-[#c87c4f]/25 to-transparent rounded-full blur-[100px] pointer-events-none"
      />

      {/* Floating Micro Shimmer Dust (Automatic Animation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${15 + i * 11}%`,
              y: '100%',
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.4, 0.8],
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: i * 1.1,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#dfbe85] shadow-[0_0_8px_#dfbe85]"
          />
        ))}
      </div>

      {/* Section Header with Auto-Animation Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#dfbe85]/15 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Flame className="w-4 h-4 text-[#e08f65]" />
            </motion.div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfbe85] font-sans font-medium">
              Explosive Pigments & Kit
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight">
            Artisan Cosmetic Instruments
          </h2>
        </div>

        {/* Automatic Animation Status & Playback Control */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Animated Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <motion.span
              animate={{ scale: isPlaying ? [1, 1.4, 1] : 1, opacity: isPlaying ? [1, 0.5, 1] : 0.4 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`}
            />
            <span className="text-[11px] font-sans tracking-wider uppercase text-white/70">
              {isPlaying ? 'Auto-Cycle Active' : 'Paused'}
            </span>
          </div>

          {/* Play/Pause Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors"
            title={isPlaying ? 'Pause Auto Animation' : 'Start Auto Animation'}
            aria-label="Toggle auto play"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#dfbe85]" /> : <Play className="w-3.5 h-3.5 text-[#dfbe85]" />}
          </motion.button>
        </div>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Explosive Pigments Image with Automatic Animated Hotspots */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square max-w-[480px] mx-auto rounded-2xl overflow-hidden bg-black/90 border border-[#dfbe85]/30 shadow-[0_0_50px_rgba(200,124,79,0.25)] group">
            
            {/* Automatic Radial Gold & Terracotta Shockwave */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-radial from-[#e08f65]/35 via-[#dfbe85]/15 to-transparent pointer-events-none"
            />

            {/* Continuous Light Sweep Animation across the cosmetic kit */}
            <motion.div
              animate={{
                x: ['-120%', '220%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
              className="absolute inset-y-0 w-32 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10"
            />

            {/* The Explosive Pigment Burst & Cosmetic Kit Image */}
            <motion.img
              src="/assets/aistudio/image_7bb7c2ea.png"
              alt="MAC Cosmetics & Explosive Terracotta Powder Burst"
              animate={{
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.98]"
            />

            {/* Animated Interactive Hotspots */}
            {KIT_ITEMS.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  style={{ top: item.y, left: item.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => selectHotspot(idx)}
                    className="relative focus:outline-none group/pin cursor-pointer"
                    aria-label={item.name}
                  >
                    {/* Pulsing Concentric Outer Ping when selected */}
                    {isSelected && (
                      <>
                        <motion.span
                          animate={{ scale: [1, 2.4], opacity: [0.8, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                          className="absolute -inset-2 rounded-full border-2 border-[#dfbe85] pointer-events-none"
                        />
                        <motion.span
                          animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                          className="absolute -inset-2 rounded-full bg-[#dfbe85]/30 pointer-events-none"
                        />
                      </>
                    )}

                    {/* Constant subtle pulse on inactive hotspots */}
                    {!isSelected && (
                      <span className="absolute -inset-1 rounded-full bg-white/20 animate-ping opacity-50 pointer-events-none" />
                    )}

                    {/* Central Pin Core */}
                    <motion.div
                      animate={{
                        scale: isSelected ? 1.25 : 1,
                        backgroundColor: isSelected ? '#dfbe85' : 'rgba(12, 10, 9, 0.85)',
                        color: isSelected ? '#0c0a09' : '#dfbe85',
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#dfbe85] shadow-[0_0_15px_rgba(223,190,133,0.5)] font-bold text-xs"
                    >
                      {isSelected ? (
                        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                      ) : (
                        <span className="font-mono text-[10px]">{idx + 1}</span>
                      )}
                    </motion.div>
                  </button>

                  {/* Connected Hover/Active Tag */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-[#dfbe85]/40 whitespace-nowrap shadow-xl pointer-events-none hidden sm:block"
                    >
                      <span className="text-[10px] font-sans font-medium text-[#dfbe85] tracking-wider uppercase">
                        {item.name}
                      </span>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Enlarge Lightbox Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEnlarged(true)}
              className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/20 text-white text-xs font-sans flex items-center gap-1.5 transition-colors z-20 shadow-lg"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#dfbe85]" />
              <span className="hidden sm:inline">Enlarge</span>
            </motion.button>

            {/* Bottom Progress Bar inside image frame */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#dfbe85] to-[#c87c4f]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Quick Item Nav Dots with Live Auto-Cycle Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={handlePrev}
              className="p-1 rounded-full text-white/50 hover:text-white transition-colors"
              aria-label="Previous pigment"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {KIT_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => selectHotspot(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-7 bg-gradient-to-r from-[#dfbe85] to-[#c87c4f]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Select ${item.name}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-1 rounded-full text-white/50 hover:text-white transition-colors"
              aria-label="Next pigment"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Automatically Animated Formulation Details Card */}
        <div className="lg:col-span-5">
          <div className="relative bg-[#120f0d]/90 rounded-2xl p-6 sm:p-7 border border-[#dfbe85]/25 shadow-2xl backdrop-blur-xl overflow-hidden">
            
            {/* Subtle background glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeItem.hex }}
            />

            {/* Top Auto-Cycle Countdown Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#dfbe85] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfbe85]" />
                {activeItem.badge}
              </span>
              <span className="text-[11px] font-sans text-white/40">
                0{activeIndex + 1} / 0{KIT_ITEMS.length}
              </span>
            </div>

            {/* Animated Card Content (Smooth Transitions on Auto-Cycle) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c87c4f]/20 border border-[#c87c4f]/40 text-[#dfbe85] text-[10px] uppercase font-mono tracking-wide">
                    {activeItem.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-2 leading-snug">
                    {activeItem.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 font-sans leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* Swatch & Key Highlight */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg shadow-md border border-white/30 shrink-0"
                      style={{ backgroundColor: activeItem.hex }}
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                        Signature Pigment
                      </span>
                      <span className="text-xs font-serif text-white/95">
                        {activeItem.highlight}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-1.5 rounded-full bg-[#dfbe85]/15 text-[#dfbe85]"
                  >
                    <Flame className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Two Simple Feature Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-sans">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#dfbe85] shrink-0" />
                    <span className="text-white/80 truncate">18H Banquet Sealed</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10">
                    <Droplets className="w-3.5 h-3.5 text-[#dfbe85] shrink-0" />
                    <span className="text-white/80 truncate">Micro-Milled Pearl</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Interactive Selector Strip */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-2 font-sans">
                Select Formula to Inspect
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {KIT_ITEMS.map((item, idx) => {
                  const isCur = activeIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => selectHotspot(idx)}
                      className={`relative py-1.5 px-1 rounded-lg text-center transition-all ${
                        isCur
                          ? 'bg-[#dfbe85] text-[#0c0a09] font-medium shadow-md'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] block font-mono">0{idx + 1}</span>
                      {isCur && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 border border-[#dfbe85] rounded-lg pointer-events-none"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Enlarge Modal */}
      <AnimatePresence>
        {showEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEnlarged(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#110e0c] rounded-2xl overflow-hidden border border-[#dfbe85]/40 shadow-2xl"
            >
              <button
                onClick={() => setShowEnlarged(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-square w-full">
                <img
                  src="/assets/aistudio/image_7bb7c2ea.png"
                  alt="High Resolution Explosive Pigments"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-black/80 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-white text-base">
                    Haute Cosmetic Shockwave
                  </h4>
                  <p className="text-xs text-white/60 font-sans">
                    MAC Velvet Bullet, Prismatic Glaze & 24K Micro-Milled Gold Dust
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#dfbe85]/20 text-[#dfbe85] text-xs font-mono">
                  Master Collection
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
