import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Check,
  Crown,
  ArrowRight,
  Clock,
  Star,
  Gem,
  Camera,
} from 'lucide-react';

interface BridalPackage {
  id: string;
  badge: string;
  name: string;
  subtitle: string;
  duration: string;
  idealFor: string;
  image: string;
  features: string[];
  serviceValue: string;
}

export const BridalPackagesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ceremony' | 'multi'>('all');
  const [activeTab, setActiveTab] = useState<'packages' | 'journey' | 'reviews'>('packages');

  const packages: BridalPackage[] = [
    {
      id: 'royal-muhurtham',
      badge: 'Most Revered',
      name: 'Imperial Muhurtham',
      subtitle: 'Temple Heritage Grandeur',
      duration: '4.5 Hours',
      idealFor: 'Traditional Muhurtham & Pheras',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      features: [
        '18-Hour Tearproof & Sweat-Lock Base',
        '24K Antique Gold & Bronze Eye Artistry',
        'Silk Saree Architecture & Stay-Flat Pinning',
        'Bridal Emergency Touch-Up Kit Included',
      ],
      serviceValue: 'Royal Heritage Bridal Package',
    },
    {
      id: 'red-carpet-reception',
      badge: 'High Fashion',
      name: 'Red Carpet Reception',
      subtitle: 'Luminous Glass-Skin Glamour',
      duration: '3.5 Hours',
      idealFor: 'Sangeet & Grand Reception',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85',
      features: [
        '3D Sculpted Glass-Skin Highlighter',
        'Diamond Pigment Smokey Cut-Crease',
        'Hollywood Waves or Regal Crown Updo',
        'Designer Lehenga Drape & Body Shimmer',
      ],
      serviceValue: 'Haute Glass-Skin Minimalist',
    },
    {
      id: 'destination-suite',
      badge: 'Ultimate VIP',
      name: 'Destination Suite',
      subtitle: 'Full 3-Event Bridal Retinue',
      duration: '3 Full Days',
      idealFor: 'Palace & Resort Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      features: [
        'All 3 Events (Mehendi, Sangeet & Wedding)',
        'Bespoke Face-Mapping Prior to Wedding',
        'Mother-of-Bride Vanity Styling Included',
        'Unlimited Stage & Mandap Touch-Ups',
      ],
      serviceValue: 'Destination Bridal Weekend',
    },
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Skin Diagnosis',
      description: 'Face-mapping & undertone analysis tailored to your venue lighting.',
      icon: Gem,
    },
    {
      step: '02',
      title: 'The Haute Trial',
      description: 'Testing exact base formulas and lash weights for zero wedding-day guesswork.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Morning Sanctum',
      description: 'Calming aromatherapy, depuffing prep, and precision couture styling.',
      icon: Crown,
    },
    {
      step: '04',
      title: '4K Camera Lock',
      description: '18-hour setting veil verified through cine lenses with touch-up kit.',
      icon: Camera,
    },
  ];

  const brideReviews = [
    {
      quote: 'My Muhurtham makeup didn’t move through 4 hours of temple heat. My saree pleats stayed razor-sharp until midnight!',
      bride: 'Dr. Radhika & Vikram',
      location: 'The Leela Palace, Chennai',
    },
    {
      quote: 'The skin looked like real, luminous skin in 4K videos, not heavy paint. Best decision of our wedding!',
      bride: 'Ananya & Siddharth',
      location: 'Taj Falaknuma Palace, Hyderabad',
    },
    {
      quote: 'From first consultation to final veil drape, the calming energy and perfection made me feel like royalty.',
      bride: 'Pooja & Rohan',
      location: 'Umaid Bhawan Palace, Jodhpur',
    },
  ];

  const filteredPackages =
    selectedCategory === 'all'
      ? packages
      : selectedCategory === 'ceremony'
      ? packages.filter((p) => p.id !== 'destination-suite')
      : packages.filter((p) => p.id === 'destination-suite');

  const scrollToBooking = (packageName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const select = document.querySelector('select') as HTMLSelectElement | null;
        if (select) {
          select.value = packageName;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 500);
    }
  };

  return (
    <section id="packages" className="relative py-14 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#0c0a09] via-[#140f0c] to-[#0c0a09] overflow-hidden">
      {/* Animated Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#dfbe85]/15 via-[#d4af37]/20 to-[#dfbe85]/15 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Crisp & Simple) */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbe85]/10 border border-[#dfbe85]/30 mb-2 backdrop-blur-sm"
          >
            <Crown className="w-3.5 h-3.5 text-[#dfbe85]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfbe85] font-sans font-medium">
              Bespoke Experiences
            </span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf8f5] tracking-tight">
            Bridal Collections
          </h2>

          {/* Navigation Pill Switcher */}
          <div className="mt-5 inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'packages'
                  ? 'bg-gradient-to-r from-[#dfbe85] to-[#d4af37] text-[#0c0a09] font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'journey'
                  ? 'bg-gradient-to-r from-[#dfbe85] to-[#d4af37] text-[#0c0a09] font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              4-Step Journey
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-[#dfbe85] to-[#d4af37] text-[#0c0a09] font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Tab 1: Packages (Compact & Sleek) */}
        {activeTab === 'packages' && (
          <div>
            {/* Filter buttons */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'all'
                    ? 'border-[#dfbe85] text-[#dfbe85] bg-[#dfbe85]/10'
                    : 'border-white/10 text-white/50 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('ceremony')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'ceremony'
                    ? 'border-[#dfbe85] text-[#dfbe85] bg-[#dfbe85]/10'
                    : 'border-white/10 text-white/50 hover:text-white'
                }`}
              >
                Single Event
              </button>
              <button
                onClick={() => setSelectedCategory('multi')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'multi'
                    ? 'border-[#dfbe85] text-[#dfbe85] bg-[#dfbe85]/10'
                    : 'border-white/10 text-white/50 hover:text-white'
                }`}
              >
                Multi-Day
              </button>
            </div>

            {/* 3 Luxury Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              <AnimatePresence mode="popLayout">
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl bg-gradient-to-b from-[#1a1410] via-[#120e0b] to-[#0d0a08] border border-[#dfbe85]/20 hover:border-[#dfbe85]/50 transition-all duration-300 p-5 flex flex-col justify-between shadow-xl group overflow-hidden"
                  >
                    {/* Image Banner */}
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 shadow">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 filter brightness-[0.9]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-black/20 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0c0a09]/80 backdrop-blur-md border border-[#dfbe85]/40 text-[#dfbe85] text-[10px] uppercase font-medium flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                        <span>{pkg.badge}</span>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white/80 text-[10px] font-sans flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#dfbe85]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="font-serif text-xl text-[#faf8f5] group-hover:text-[#dfbe85] transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-[11px] text-[#dfbe85]/80 font-sans mt-0.5">
                          {pkg.idealFor}
                        </p>
                      </div>

                      {/* Features List (Short & Crisp) */}
                      <div className="space-y-1.5 pt-1">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#dfbe85]/15 text-[#dfbe85] flex items-center justify-center shrink-0">
                              <Check className="w-2 h-2" />
                            </div>
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking CTA Button */}
                    <div className="pt-4 mt-4 border-t border-[#dfbe85]/15">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => scrollToBooking(pkg.serviceValue)}
                        className="w-full py-2.5 px-3 rounded-full bg-gradient-to-r from-[#dfbe85] via-[#f7e3af] to-[#d4af37] text-[#0c0a09] font-medium text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-102 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Reserve Experience</span>
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Tab 2: The 4-Step Bridal Journey (Compact Cards) */}
        {activeTab === 'journey' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {journeySteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#18120e] to-[#0e0b08] border border-[#dfbe85]/20 shadow-lg relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#dfbe85]/15 border border-[#dfbe85]/30 flex items-center justify-center text-[#dfbe85] mb-3">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfbe85]">
                    Step {step.step}
                  </span>
                  <h3 className="font-serif text-lg text-white mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/60 font-sans mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Tab 3: Reviews (Concise Golden Quotes) */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {brideReviews.map((rev, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#18120e] to-[#0e0b08] border border-[#dfbe85]/20 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#dfbe85] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#dfbe85]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-white/90 leading-snug">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="font-medium text-xs text-[#dfbe85]">{rev.bride}</div>
                  <div className="text-[10px] text-white/50">{rev.location}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
