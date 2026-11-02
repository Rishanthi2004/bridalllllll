import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Star } from 'lucide-react';

export const AboutArtistSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-rotating quote / feature highlights every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const philosophyPillars = [
    { title: 'Bespoke Micro-Shading', desc: 'Custom pigmentation blended to mirror individual skin undertones.' },
    { title: '18-Hour Humidity Seal', desc: 'Weightless micro-mist barrier tested through tropical humidity.' },
    { title: 'Couture Veil Integration', desc: 'Flawless synergy between heirloom jewelry, veils, and angles.' },
  ];

  return (
    <section id="about" className="relative py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-radial from-[#dfbe85]/25 to-transparent blur-3xl pointer-events-none"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left: Artist Portrait with Light Sweep */}
        <div className="lg:col-span-5 relative max-w-sm mx-auto lg:max-w-none w-full">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#14100d] border border-[#dfbe85]/30 shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
              alt="Maison Master Bridal Makeup Artist Aria Laurent"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter contrast-[1.08] transition-transform duration-700 group-hover:scale-104"
            />

            {/* Studio Light Beam Sweep */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-25 pointer-events-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Artist Info */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#dfbe85] animate-ping" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfbe85] font-sans">
                  Master Artist & Creative Director
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white font-normal">
                Aria Laurent
              </h3>
              <p className="text-[11px] text-white/60 font-sans mt-0.5">
                Paris & International Atelier
              </p>
            </div>
          </motion.div>

          {/* Rotating Atelier Crest */}
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#14100d]/90 backdrop-blur-md border border-[#dfbe85]/40 flex items-center justify-center p-1.5 shadow-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-1"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="aboutTextPath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text fill="#dfbe85" fontSize="8.5" fontFamily="Cormorant Garamond, serif" letterSpacing="2.2">
                  <textPath href="#aboutTextPath" startOffset="0%">
                    ÉLÉGANCE · HAUTE ARTISTRY ·
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-tr from-[#38260b] to-[#d4af37] p-1 flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fff8eb]" />
            </motion.div>
          </div>

          {/* Feature Badge */}
          <div className="absolute -bottom-2 -left-2 px-2.5 py-1 rounded-full bg-black/80 border border-[#dfbe85]/30 backdrop-blur-md text-[10px] font-sans text-[#dfbe85] flex items-center gap-1 shadow-lg">
            <Star className="w-2.5 h-2.5 fill-[#dfbe85]" />
            <span>Vogue Featured</span>
          </div>
        </div>

        {/* Right: Minimalist Philosophy (Short & Crisp) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#dfbe85] font-sans">
              About The Artist
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#faf8f5] tracking-tight leading-snug">
            "Bridal beauty is the unveiling of your most luminous self."
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed">
            Trained in Paris and Milan, Aria Laurent crafts weightless, couture radiance balanced for heirloom jewelry, banquet lighting, and 18-hour ceremonial wear.
          </p>

          {/* Auto-Cycling Principles */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-[#dfbe85]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#dfbe85] font-sans">
                Signature Principles
              </span>
              <div className="flex items-center gap-1">
                {philosophyPillars.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeTab === i ? 'w-5 bg-[#dfbe85]' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-serif text-base text-white">
                0{activeTab + 1}. {philosophyPillars[activeTab].title}
              </h4>
              <p className="text-xs text-white/60 font-sans mt-0.5">
                {philosophyPillars[activeTab].desc}
              </p>
            </motion.div>
          </div>

          {/* Credentials */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
            <div>
              <span className="font-serif text-2xl text-[#dfbe85] block tabular-nums">
                12+
              </span>
              <span className="text-[11px] text-white/50 font-sans block">
                Haute Seasons
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#dfbe85] block tabular-nums">
                450+
              </span>
              <span className="text-[11px] text-white/50 font-sans block">
                Brides Styled
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#dfbe85] block tabular-nums">
                100%
              </span>
              <span className="text-[11px] text-white/50 font-sans block">
                Couture Care
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
