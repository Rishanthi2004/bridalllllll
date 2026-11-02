import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ZoomIn, ZoomOut, RefreshCw, Wand2 } from 'lucide-react';

export const TransformationSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(52); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // High quality curated bridal imagery (before = natural radiant bare skin; after = royal bridal couture makeover)
  // With verified high availability CDN URLs and graceful SVG/CSS fallback representation
  const beforeImage = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85';
  const afterImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85';

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const autoSweep = () => {
    setSliderPosition(15);
    setTimeout(() => {
      let cur = 15;
      const interval = setInterval(() => {
        cur += 2;
        if (cur >= 85) {
          clearInterval(interval);
          setTimeout(() => setSliderPosition(50), 400);
        } else {
          setSliderPosition(cur);
        }
      }, 25);
    }, 200);
  };

  return (
    <section id="transformations" className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Wand2 className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
            The Transformation
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight text-balance">
          Natural Grace to Regal Splendor
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/60 font-sans font-light">
          We honor authentic bone structure, elevating natural radiance into timeless bridal couture.
        </p>
      </div>

      {/* Main Transformation Interactive Frame */}
      <div className="relative max-w-4xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-[#382b1d] via-[#1a140f] to-[#0c0a09] shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
        {/* Inspection Controls Floating Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#14100d]/90 backdrop-blur-md rounded-t-xl border-b border-[#dfbe85]/15 text-xs">
          <div className="flex items-center gap-3 text-white/70">
            <span className="font-serif italic text-[#dfbe85]">Natural Canvas</span>
            <span className="text-white/30">vs</span>
            <span className="font-serif italic text-[#dfbe85]">Bridal Couture</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => (z === 1 ? 1.4 : 1))}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 transition-colors flex items-center gap-1 text-[11px]"
            >
              {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5 text-[#dfbe85]" /> : <ZoomOut className="w-3.5 h-3.5 text-[#dfbe85]" />}
              <span>{zoomLevel === 1 ? '1.4x Macro' : 'Reset'}</span>
            </button>
            <button
              onClick={autoSweep}
              className="px-2.5 py-1 rounded bg-[#dfbe85]/15 hover:bg-[#dfbe85]/25 text-[#dfbe85] transition-colors flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Brush Wipe</span>
            </button>
          </div>
        </div>

        {/* Comparison Viewer Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden select-none cursor-ew-resize rounded-b-xl bg-[#120e0b]"
        >
          {/* AFTER Image (Full background layer: Bridal Couture) */}
          <div
            className="absolute inset-0 transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={afterImage}
              alt="Bridal Couture Makeover After"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-5 right-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#dfbe85]/30 text-[11px] font-serif text-[#f5ebe1] tracking-wider pointer-events-none">
              After · Haute Bridal
            </div>
          </div>

          {/* BEFORE Image (Clipped layer: Natural Canvas) */}
          <div
            className="absolute inset-0 overflow-hidden transition-transform duration-300"
            style={{
              clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
              transform: `scale(${zoomLevel})`,
            }}
          >
            <img
              src={beforeImage}
              alt="Natural Bride Before Makeover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-[0.95]"
            />
            <div className="absolute bottom-5 left-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-serif text-white/80 tracking-wider pointer-events-none">
              Before · Natural
            </div>
          </div>

          {/* Soft Makeup Brush Wipe Boundary Glow */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: `${sliderPosition}%`,
              width: '40px',
              transform: 'translateX(-50%)',
              background:
                'linear-gradient(90deg, rgba(223, 190, 133, 0) 0%, rgba(223, 190, 133, 0.45) 50%, rgba(223, 190, 133, 0) 100%)',
              filter: 'blur(3px)',
            }}
          />

          {/* Slider Divider Bar with Luxury Brush Handle Control */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-20 flex flex-col items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Golden Hairline Wire */}
            <div className="w-[1.5px] h-full bg-gradient-to-b from-[#ffd880] via-[#d4af37] to-[#8c6a1e] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />

            {/* Center Slider Knob: Styled as a miniature gold brush ferrule */}
            <div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-[#3b2b10] via-[#d4af37] to-[#fff3cc] p-[1.5px] shadow-[0_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#18130f] flex items-center justify-center text-[#dfbe85]">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Methodology Notes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 md:p-6 bg-[#0e0b09] rounded-b-xl border-t border-white/10 text-left">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#dfbe85]">01. Base</span>
            <p className="text-xs text-white/80 font-serif mt-0.5">Hydra-silk micro-buff</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#dfbe85]">02. Eyes</span>
            <p className="text-xs text-white/80 font-serif mt-0.5">Champagne shadow wash</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#dfbe85]">03. Contour</span>
            <p className="text-xs text-white/80 font-serif mt-0.5">Soft-focus dimension</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#dfbe85]">04. Lips</span>
            <p className="text-xs text-white/80 font-serif mt-0.5">18hr velvet satin lock</p>
          </div>
        </div>
      </div>
    </section>
  );
};
