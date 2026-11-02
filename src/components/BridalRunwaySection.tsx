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
      className="relative py-14 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#faf8f5] via-[#f5efe6] to-[#faf8f5] overflow-hidden"
    >
      {/* Dynamic Animated Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#dfbe85]/15 via-[#c5a059]/15 to-[#dfbe85]/15 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5efe6] border border-[#c5a059]/40 mb-2 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-sans font-medium">
              Live Spotlight Theater
            </span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f1b2b] tracking-tight">
            The Bridal Runway
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#4a5d73] font-sans">
            Tap the glowing points to uncover secret techniques and formulas.
          </p>
        </div>

        {/* Main Interactive Animated Stage */}
        <div className="relative rounded-2xl bg-[#ffffff] border border-[#ede4d8] p-4 sm:p-6 shadow-[0_15px_45px_rgba(15,27,43,0.06)] overflow-hidden">
          {/* Top Stage Control Bar */}
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#ede4d8]">
            {/* Slide Indicator Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {runwayLooks.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActivePin(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 ${
                    currentIndex === idx
                      ? 'bg-[#0f1b2b] text-[#faf8f5] font-semibold shadow-sm'
                      : 'bg-[#f5efe6] text-[#1b2a41] hover:text-[#0f1b2b] border border-[#ede4d8]'
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
                className="p-1.5 rounded-full bg-[#f5efe6] border border-[#ede4d8] text-[#0f1b2b] hover:bg-[#ede4d8] transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-[#f5efe6] border border-[#ede4d8] text-[#1b2a41] hover:text-[#0f1b2b] transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-[#f5efe6] border border-[#ede4d8] text-[#1b2a41] hover:text-[#0f1b2b] transition-all"
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
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] w-full rounded-xl overflow-hidden shadow-xl border border-[#ede4d8] group">
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
                      className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                    />

                    {/* Studio Light Sweep */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', repeatDelay: 2 }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
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
                        className="relative group/pin focus:outline-none -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        aria-label={spot.title}
                      >
                        <span className="absolute -inset-1.5 rounded-full bg-[#dfbe85]/40 animate-ping opacity-75" />
                        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#0f1b2b] text-[#faf8f5] border border-[#c5a059] shadow-[0_2px_10px_rgba(0,0,0,0.4)] group-hover/pin:scale-125 transition-transform duration-300">
                          <Sparkles className="w-3 h-3 text-[#c5a059]" />
                        </span>
                      </button>

                      {/* Detail Popover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.92 }}
                            className="absolute z-40 left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 sm:w-64 p-3 rounded-xl bg-[#ffffff] backdrop-blur-xl border border-[#ede4d8] shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#ede4d8]">
                              <span className="text-[9px] uppercase tracking-widest text-[#c5a059] font-sans font-semibold">
                                Secret Technique
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePin(null);
                                }}
                                className="text-[#4a5d73] hover:text-[#0f1b2b] text-xs px-1"
                              >
                                ✕
                              </button>
                            </div>
                            <h4 className="font-serif text-xs font-semibold text-[#0f1b2b] mt-0.5">{spot.title}</h4>
                            <p className="text-[11px] text-[#1b2a41]/85 font-sans mt-1 leading-normal">
                              {spot.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Bottom Bar on Photo */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0f1b2b]/85 backdrop-blur-md border border-white/10 text-[11px] text-white">
                  <span className="text-white/90 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe85] animate-pulse" />
                    <span>Tap golden spots for details</span>
                  </span>
                  <span className="text-[#dfbe85] font-serif text-[10px] uppercase tracking-widest font-medium">
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
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-sans font-medium">
                      {currentLook.ceremony}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#0f1b2b] mt-0.5">
                      {currentLook.title}
                    </h3>
                  </div>

                  {/* Palette Swatches */}
                  <div className="flex items-center gap-2">
                    {currentLook.palette.map((color, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.25 }}
                        className="w-5 h-5 rounded-full border border-black/10 shadow-sm inline-block"
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
                        className="p-2 rounded-lg bg-[#f5efe6] border border-[#ede4d8] flex items-center gap-2 text-xs text-[#0f1b2b]"
                      >
                        <span>{tech.icon}</span>
                        <span className="truncate font-medium">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-1">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0f1b2b] hover:bg-[#1a2d47] text-[#faf8f5] border border-[#c5a059]/40 font-medium text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(15,27,43,0.2)] hover:scale-105 transition-all"
                    >
                      <span>Reserve This Look</span>
                      <ArrowRight className="w-3 h-3 text-[#dfbe85]" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Layer Pills */}
          <div className="mt-6 pt-5 border-t border-[#ede4d8]">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-xs uppercase tracking-wider text-[#0f1b2b] font-sans font-semibold">
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
                      ? 'bg-[#f5efe6] border-2 border-[#c5a059] shadow-sm'
                      : 'bg-[#f5efe6]/60 border border-[#ede4d8] hover:border-[#c5a059]/50'
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-widest text-[#c5a059] font-semibold">
                    Step {layer.step}
                  </div>
                  <div className="font-serif text-xs text-[#0f1b2b] font-medium mt-0.5">{layer.name}</div>
                  <div className="text-[10px] text-[#4a5d73] font-sans mt-0.5 truncate">
                    {layer.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist Metrics Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[#ffffff] border border-[#ede4d8] shadow-sm">
            <div className="font-serif text-xl sm:text-2xl text-[#0f1b2b] font-medium">850+</div>
            <div className="text-[10px] uppercase text-[#4a5d73] mt-0.5 font-sans font-medium">Brides Styled</div>
          </div>
          <div className="p-3 rounded-lg bg-[#ffffff] border border-[#ede4d8] shadow-sm">
            <div className="font-serif text-xl sm:text-2xl text-[#0f1b2b] font-medium">18 Hours</div>
            <div className="text-[10px] uppercase text-[#4a5d73] mt-0.5 font-sans font-medium">Tear & Cry Proof</div>
          </div>
          <div className="p-3 rounded-lg bg-[#ffffff] border border-[#ede4d8] shadow-sm">
            <div className="font-serif text-xl sm:text-2xl text-[#0f1b2b] font-medium">4K Cine</div>
            <div className="text-[10px] uppercase text-[#4a5d73] mt-0.5 font-sans font-medium">Zero Flashback</div>
          </div>
          <div className="p-3 rounded-lg bg-[#ffffff] border border-[#ede4d8] shadow-sm">
            <div className="font-serif text-xl sm:text-2xl text-[#0f1b2b] font-medium">100%</div>
            <div className="text-[10px] uppercase text-[#4a5d73] mt-0.5 font-sans font-medium">VIP Devotion</div>
          </div>
        </div>
      </div>
    </section>
  );
};
