import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#ede4d8] bg-[#f5efe6] py-12 px-6 text-[#4a5d73] text-xs font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <p className="font-serif text-lg tracking-[0.2em] text-[#0f1b2b] uppercase font-medium">
            ÉLÉGANCE
          </p>
          <p className="text-[#4a5d73] text-[11px]">
            Haute Couture Bridal Artistry & Bespoke Makeovers
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase text-[#1b2a41] font-medium">
          <a href="#bridal-makeup" className="hover:text-[#c5a059] transition-colors">
            Aesthetics
          </a>
          <a href="#runway" className="hover:text-[#c5a059] transition-colors">
            The Runway
          </a>
          <a href="#packages" className="hover:text-[#c5a059] transition-colors">
            Packages
          </a>
          <a href="#contact" className="hover:text-[#c5a059] transition-colors">
            Consultation
          </a>
        </div>

        <div className="text-[11px] text-[#4a5d73]">
          © {new Date().getFullYear()} Maison Élégance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
