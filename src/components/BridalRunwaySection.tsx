import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface BridalRunwayLook {
  id: string;
  title: string;
  ceremony: string;
  image: string;
  palette: string[];
  spotlights: {
    title: string;
    description: string;
    x: number;
    y: number;
  }[];
  techniques: {
    icon: string;
    name: string;
  }[];
}

export const BridalRunwaySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runwayLooks: BridalRunwayLook[] = [
    {
      id: 'heritage-muhurtham',
      title: 'Imperial Muhurtham',
      ceremony: 'Morning Temple Vows',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      palette: ['#c99738', '#8a1c14', '#e8d3b0', '#2d1810'],
      spotlights: [
        {
          title: '24K Temple Eyes',
          description: 'Antique gold leaf & smoked kohl for warm temple lighting.',
          x: 48,
          y: 28,
        },
        {
          title: 'Tearproof Base',
          description: '18-hour sweatproof formula immune to tears and humidity.',
          x: 42,
          y: 42,
        },
        {
          title: 'Mathapatti Pinning',
          description: 'Weight-balanced anchors for heavy gold ornaments.',
          x: 52,
          y: 18,
        },
        {
          title: 'Saree Architecture',
          description: 'Accordion pleats with invisible stay-flat security.',
          x: 62,
          y: 72,
        },
      ],
      techniques: [
        { icon: '✨', name: 'Micro-Airbrush Base' },
        { icon: '👑', name: 'Fresh Veni Floral Styling' },
        { icon: '💎', name: 'Jewelry Balance' },
      ],
    },
    {
      id: 'celestial-reception',
      title: 'Celestial Reception',
      ceremony: 'Grand Evening Gala',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1600&q=85',
      palette: ['#dfbe85', '#d4af37', '#6b3040', '#1c1318'],
      spotlights: [
        {
          title: 'Diamond Glow',
          description: 'High-point strobe capturing crystal chandelier light.',
          x: 45,
          y: 34,
        },
        {
          title: 'Smokey Cut-Crease',
          description: 'Multidimensional sparkle with 24-hour crease-free lock.',
          x: 55,
          y: 30,
        },
        {
          title: 'Hollywood Waves',
          description: 'Heat-sculpted glossy curls with anti-frizz polymer.',
          x: 68,
          y: 45,
        },
      ],
      techniques: [
        { icon: '🌟', name: 'Glass-Skin Glaze' },
        { icon: '💄', name: 'Transfer-Proof Lip' },
        { icon: '✨', name: 'Body Shimmer Decolletage' },
      ],
    },
    {
      id: 'regal-lehenga',
      title: 'Royal Noor Pheras',
      ceremony: 'Dusk Ceremony',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
      palette: ['#a82d35', '#e2be79', '#42161b', '#181012'],
      spotlights: [
        {
          title: 'Crimson Velvet Lip',
          description: 'Long-wear ruby matte that stays fresh through dining.',
          x: 51,
          y: 52,
        },
        {
          title: 'Heirloom Contouring',
          description: 'Sculpted cheekbones for 4K photography.',
          x: 46,
          y: 42,
        },
        {
          title: 'Double Dupatta',
          description: 'Weightless head veil paired with structured shoulder drape.',
          x: 65,
          y: 55,
        },
      ],
      techniques: [
        { icon: '⚜️', name: 'Regal Sculpting' },
        { icon: '📿', name: 'Polki Anchoring' },
        { icon: '🛡️', name: 'Heat & Sweat Guard' },
      ],
    },
    {
      id: 'modern-glass-skin',
      title: 'Haute Editorial Nude',
      ceremony: 'Intimate Ceremony',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
      palette: ['#f2e3d5', '#d49b8a', '#caa772', '#221915'],
      spotlights: [
        {
          title: 'Dewy Glass Skin',
          description: 'Hydrated natural glow without mask-like heaviness.',
          x: 44,
          y: 38,
        },
        {
          title: 'Feathered Brows',
          description: 'Micro-stroke architecture for youthful lift.',
          x: 42,
          y: 24,
        },
        {
          title: 'Cashmere Tint',
          description: 'Soft blurred-edge rose petals on cheeks and lips.',
          x: 50,
          y: 46,
        },
      ],
      techniques: [
        { icon: '🌸', name: 'Hydra-Serum Prep' },
        { icon: '✨', name: 'No-Makeup Base' },
        { icon: '🌿', name: 'Floral Hair Accents' },
      ],
    },
  ];

  // Auto-advance runway slide every 5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % runwayLooks.length);
      setActivePin(null);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, runwayLooks.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % runwayLooks.length);
    setActivePin(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + runwayLooks.length) % runwayLooks.length);
    setActivePin(null);
  };

  const currentLook = runwayLooks[currentIndex];

  const artistryLayers = [
    { step: '01', name: 'Hydra-Infusion', detail: 'Micro-hyaluronic acid & gold primer plump skin.' },
    { step: '02', name: '18H Micro-Base', detail: 'Featherlight silicone-veil locks out sweat.' },
    { step: '03', name: '3D Eye Couture', detail: 'Crushed pearl layering for 4K cameras.' },
    { step: '04', name: 'Veil & Saree Fix', detail: 'Stay-flat precision pinning & ornament balance.' },
  ];

  return (
    <section
      id="runway"
      className="relative py-14 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#0c0a09] via-[#140e0b] to-[#0c0a09] overflow-hidden"
    >
      {/* Dynamic Animated Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#dfbe85]/15 via-[#d4af37]/20 to-[#dfbe85]/15 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Compact & Punchy) */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbe85]/10 border border-[#dfbe85]/30 mb-2 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfbe85] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfbe85] font-sans font-medium">
              Live Spotlight Theater
            </span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight">
            The Bridal Runway
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-white/60 font-sans">
            Tap the glowing points to uncover secret techniques and formulas.
          </p>
        </div>

        {/* Main Interactive Animated Stage */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#1c1511] via-[#120e0b] to-[#0a0807] border border-[#dfbe85]/25 p-4 sm:p-6 shadow-2xl overflow-hidden">
          {/* Top Stage Control Bar */}
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#dfbe85]/15">
            {/* Slide Indicator Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {runwayLooks.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActivePin(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 ${
                    currentIndex === idx
                      ? 'bg-gradient-to-r from-[#dfbe85] to-[#d4af37] text-[#0c0a09] font-medium shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="font-serif text-[11px]">{`0${idx + 1}`}</span>
                  <span>{look.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Play/Pause & Arrows */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full bg-white/[0.05] border border-[#dfbe85]/30 text-[#dfbe85] hover:bg-[#dfbe85]/20 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:text-white transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Split Visual & Editorial Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] w-full rounded-xl overflow-hidden shadow-xl border border-[#dfbe85]/30 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLook.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentLook.image}
                      alt={currentLook.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
                    />

                    {/* Studio Light Sweep */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', repeatDelay: 2 }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-black/20 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Hotspot Pins */}
                {currentLook.spotlights.map((spot, i) => {
                  const isActive = activePin === i;
                  return (
                    <div
                      key={i}
                      className="absolute z-30"
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    >
                      <button
                        onClick={() => setActivePin(isActive ? null : i)}
                        className="relative group/pin focus:outline-none -translate-x-1/2 -translate-y-1/2"
                        aria-label={spot.title}
                      >
                        <span className="absolute -inset-1.5 rounded-full bg-[#dfbe85]/40 animate-ping opacity-75" />
                        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#dfbe85] to-[#d4af37] text-[#0c0a09] shadow-[0_0_15px_rgba(212,175,55,0.7)] group-hover/pin:scale-125 transition-transform duration-300">
                          <Sparkles className="w-3 h-3" />
                        </span>
                      </button>

                      {/* Detail Popover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.92 }}
                            className="absolute z-40 left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 sm:w-64 p-3 rounded-xl bg-[#0c0a09]/95 backdrop-blur-xl border border-[#dfbe85]/50 shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#dfbe85]/20">
                              <span className="text-[9px] uppercase tracking-widest text-[#dfbe85] font-sans">
                                Secret Technique
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePin(null);
                                }}
                                className="text-white/40 hover:text-white text-xs px-1"
                              >
                                ✕
                              </button>
                            </div>
                            <h4 className="font-serif text-xs font-semibold text-[#faf8f5] mt-0.5">{spot.title}</h4>
                            <p className="text-[11px] text-white/70 font-sans mt-1 leading-normal">
                              {spot.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Bottom Bar on Photo */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0c0a09]/80 backdrop-blur-md border border-white/10 text-[11px]">
                  <span className="text-white/80 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe85] animate-pulse" />
                    <span>Tap golden spots for details</span>
                  </span>
                  <span className="text-[#dfbe85] font-serif text-[10px] uppercase tracking-widest">
                    4K Ultra-HD
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Column */}
            <div className="lg:col-span-5 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLook.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
                      {currentLook.ceremony}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#faf8f5] mt-0.5">
                      {currentLook.title}
                    </h3>
                  </div>

                  {/* Palette Swatches */}
                  <div className="flex items-center gap-2">
                    {currentLook.palette.map((color, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.25 }}
                        className="w-5 h-5 rounded-full border border-white/20 shadow inline-block"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Technique Badges (Compact) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {currentLook.techniques.map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="p-2 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2 text-xs text-white/80"
                      >
                        <span>{tech.icon}</span>
                        <span className="truncate">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-1">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#dfbe85] via-[#f7e3af] to-[#d4af37] text-[#0c0a09] font-medium text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                    >
                      <span>Reserve This Look</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Layer Pills (Sleek, Compact, No Endless Walls of Text) */}
          <div className="mt-6 pt-5 border-t border-[#dfbe85]/15">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#dfbe85]" />
              <span className="text-xs uppercase tracking-wider text-white/80 font-sans">
                4-Phase Longevity Architecture
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {artistryLayers.map((layer, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-2.5 rounded-lg text-left transition-all ${
                    activeLayer === idx
                      ? 'bg-[#dfbe85]/15 border border-[#dfbe85]/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-white/[0.02] border border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-widest text-[#dfbe85]">
                    Step {layer.step}
                  </div>
                  <div className="font-serif text-xs text-[#faf8f5] mt-0.5">{layer.name}</div>
                  <div className="text-[10px] text-white/50 font-sans mt-0.5 truncate">
                    {layer.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist Metrics Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-serif text-xl sm:text-2xl text-[#dfbe85]">850+</div>
            <div className="text-[10px] uppercase text-white/50 mt-0.5">Brides Styled</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-serif text-xl sm:text-2xl text-[#dfbe85]">18 Hours</div>
            <div className="text-[10px] uppercase text-white/50 mt-0.5">Tear & Cry Proof</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-serif text-xl sm:text-2xl text-[#dfbe85]">4K Cine</div>
            <div className="text-[10px] uppercase text-white/50 mt-0.5">Zero Flashback</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-serif text-xl sm:text-2xl text-[#dfbe85]">100%</div>
            <div className="text-[10px] uppercase text-white/50 mt-0.5">VIP Devotion</div>
          </div>
        </div>
      </div>
    </section>
  );
};
