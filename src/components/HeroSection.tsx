import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  // User's uploaded bridal makeup video asset
  const uploadedVideo = '/assets/aistudio/Video_Project_f6a8eda6.mp4';
  const highEndBridalPortrait = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85';

  const [videoSrc] = useState<string>(uploadedVideo);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Trigger opening luxury brush sweep reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse coordinates for interactive spotlight glow on the full-screen video
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-[#0c0a09]"
    >
      {/* 1. Ultra Full-Screen Edge-to-Edge Cinematic Video with Luxury Effects */}
      <div className="absolute inset-0 z-0 bg-[#0c0a09] overflow-hidden">
        {/* High-res bridal image fallback */}
        <img
          src={highEndBridalPortrait}
          alt="Bridal Beauty Campaign Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-105"
        />

        {/* Full-Screen Video (Desktop scaled to 180%-195% to fill 100% full screen edge-to-edge; mobile remains untouched at 135%) */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover scale-[1.35] sm:scale-[1.28] lg:min-w-full lg:min-h-full lg:w-screen lg:h-screen lg:scale-[1.8] xl:scale-[1.95] transition-all duration-1000 filter brightness-[0.88] contrast-[1.12] ${
            isVideoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Interactive Luxury Spotlight Caustic Glow (Follows cursor) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 420px at ${mousePos.x}% ${mousePos.y}%, rgba(223, 190, 133, 0.22) 0%, rgba(212, 175, 55, 0.08) 45%, transparent 70%)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Cinematic Anamorphic Horizontal Golden Flare Streak */}
        <div className="absolute top-1/2 inset-x-0 h-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#dfbe85]/15 to-transparent blur-3xl pointer-events-none" />

        {/* Ambient Film Grain & Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,10,9,0.85)_100%)] pointer-events-none" />

        {/* Floating Ambient Gold Sparks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-[#fff8eb] rounded-full blur-[0.5px] opacity-80 animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#dfbe85] rounded-full blur-[1px] opacity-70 animate-pulse" />
          <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-[#fff] rounded-full opacity-90 animate-ping" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      {/* 2. Opening Curtain Brush Wipe Reveal */}
      <AnimatePresence>
        {!hasRevealed && (
          <motion.div
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 bg-[#0c0a09] origin-right pointer-events-none flex items-center justify-center"
          >
            <div className="flex items-center gap-2 text-[#dfbe85] font-serif tracking-[0.3em] uppercase text-xs">
              <Sparkles className="w-4 h-4 animate-spin text-[#d4af37]" />
              <span>Unveiling Haute Artistry</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Spacer for fixed navbar */}
      <div className="h-20" />

      {/* 3. Hero Center Visual Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center text-center">
        {/* Subtle Brand Tagline with Shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mb-4"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#dfbe85] font-sans font-light drop-shadow-md">
            Haute Couture Bridal Atelier
          </span>
        </motion.div>

        {/* Short Heading: 'The Art of Bridal Beauty' */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#faf8f5] max-w-4xl text-balance drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]"
        >
          The Art of Bridal Beauty
        </motion.h1>

        {/* One small button: 'Explore Our Work' */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex items-center justify-center"
        >
          <button
            onClick={onExploreClick}
            className="group relative px-7 py-3 text-xs md:text-sm uppercase tracking-[0.2em] font-sans font-medium text-[#0c0a09] bg-gradient-to-r from-[#dfbe85] via-[#f7e3af] to-[#d4af37] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#0c0a09] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-10" />
    </section>
  );
};
