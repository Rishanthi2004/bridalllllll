/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { CosmeticDustCanvas } from './components/CosmeticDustCanvas.tsx';
import { TravelingMakeupBrush } from './components/TravelingMakeupBrush.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BridalLooksSection } from './components/BridalLooksSection.tsx';
import { BridalRunwaySection } from './components/BridalRunwaySection.tsx';
import { BridalPackagesSection } from './components/BridalPackagesSection.tsx';
import { AboutArtistSection } from './components/AboutArtistSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const scrollToExplore = () => {
    const el = document.getElementById('bridal-makeup');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a09] text-[#f7ebe1] selection:bg-[#d4af37]/30 selection:text-[#fff8f0] overflow-x-hidden font-sans">
      {/* 1. Global Cosmetic Powder Particle Canvas */}
      <CosmeticDustCanvas />

      {/* 2. Global Scroll-Synchronized Physical Traveling Makeup Brush (Starts at Section 2) */}
      <TravelingMakeupBrush />

      {/* 3. Luxury Top Navigation */}
      <Navbar onBookClick={scrollToBooking} />

      {/* 4. Full Haute Couture Bridal Journey */}
      <main>
        {/* Section 1: Hero with Full-Screen Cinematic Video & Light Effects */}
        <HeroSection onExploreClick={scrollToExplore} />

        {/* Section 2: Signature Bridal Aesthetics */}
        <BridalLooksSection />

        {/* Section 3: Live Haute Bridal Runway & Artistry Spotlight Theater */}
        <BridalRunwaySection />

        {/* Section 4: Bespoke Bridal Packages & Experience Journey */}
        <BridalPackagesSection />

        {/* Section 5: About The Master Artist */}
        <AboutArtistSection />

        {/* Section 6: Private Bridal Consultation Booking */}
        <ContactSection />
      </main>

      {/* 5. Minimal Editorial Footer */}
      <Footer />
    </div>
  );
}
