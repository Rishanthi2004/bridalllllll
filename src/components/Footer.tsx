import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#dfbe85]/15 bg-[#080605] py-12 px-6 text-white/50 text-xs font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <p className="font-serif text-lg tracking-[0.2em] text-[#faf8f5] uppercase font-light">
            ÉLÉGANCE
          </p>
          <p className="text-white/40 text-[11px]">
            Haute Couture Bridal Artistry & Bespoke Makeovers
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase text-white/60">
          <a href="#bridal-makeup" className="hover:text-[#dfbe85] transition-colors">
            Aesthetics
          </a>
          <a href="#runway" className="hover:text-[#dfbe85] transition-colors">
            The Runway
          </a>
          <a href="#packages" className="hover:text-[#dfbe85] transition-colors">
            Packages
          </a>
          <a href="#contact" className="hover:text-[#dfbe85] transition-colors">
            Consultation
          </a>
        </div>

        <div className="text-[11px] text-white/40">
          © {new Date().getFullYear()} Maison Élégance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
