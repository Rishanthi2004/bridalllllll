import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Pigments & Kit', href: '#bridal-makeup' },
    { label: 'The Runway', href: '#runway' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0a09]/85 backdrop-blur-md border-b border-[#dfbe85]/15 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#faf8f5] uppercase font-light whitespace-nowrap shrink-0 hover:text-[#dfbe85] transition-colors"
        >
          ÉLÉGANCE
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-sans tracking-widest uppercase text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#dfbe85] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#dfbe85] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookClick}
            className="px-4 py-2 text-xs font-sans uppercase tracking-[0.15em] font-medium text-[#0c0a09] bg-gradient-to-r from-[#dfbe85] to-[#d4af37] rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-102 active:scale-98 transition-all whitespace-nowrap shrink-0"
          >
            Reserve Date
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0a09]/95 backdrop-blur-xl border-b border-[#dfbe85]/20 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-white/80 hover:text-[#dfbe85] py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
