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
    <section id="packages" className="relative py-14 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#faf8f5] via-[#f5efe6] to-[#faf8f5] overflow-hidden">
      {/* Animated Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#dfbe85]/15 via-[#c5a059]/15 to-[#dfbe85]/15 blur-[120px] pointer-events-none rounded-full"
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
            <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-sans font-medium">
              Bespoke Experiences
            </span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f1b2b] tracking-tight">
            Bridal Collections
          </h2>

          {/* Navigation Pill Switcher */}
          <div className="mt-5 inline-flex items-center p-1 rounded-full bg-[#ede4d8]/70 border border-[#ede4d8] backdrop-blur-md">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'packages'
                  ? 'bg-[#0f1b2b] text-[#faf8f5] font-semibold shadow-sm'
                  : 'text-[#1b2a41]/75 hover:text-[#0f1b2b]'
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'journey'
                  ? 'bg-[#0f1b2b] text-[#faf8f5] font-semibold shadow-sm'
                  : 'text-[#1b2a41]/75 hover:text-[#0f1b2b]'
              }`}
            >
              4-Step Journey
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-[#0f1b2b] text-[#faf8f5] font-semibold shadow-sm'
                  : 'text-[#1b2a41]/75 hover:text-[#0f1b2b]'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Tab 1: Packages */}
        {activeTab === 'packages' && (
          <div>
            {/* Filter buttons */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'all'
                    ? 'border-[#0f1b2b] text-[#faf8f5] bg-[#0f1b2b] font-medium'
                    : 'border-[#ede4d8] text-[#1b2a41] bg-white hover:border-[#c5a059]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('ceremony')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'ceremony'
                    ? 'border-[#0f1b2b] text-[#faf8f5] bg-[#0f1b2b] font-medium'
                    : 'border-[#ede4d8] text-[#1b2a41] bg-white hover:border-[#c5a059]'
                }`}
              >
                Single Event
              </button>
              <button
                onClick={() => setSelectedCategory('multi')}
                className={`text-xs px-3.5 py-1 rounded-full border transition-all ${
                  selectedCategory === 'multi'
                    ? 'border-[#0f1b2b] text-[#faf8f5] bg-[#0f1b2b] font-medium'
                    : 'border-[#ede4d8] text-[#1b2a41] bg-white hover:border-[#c5a059]'
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
                    className="relative rounded-2xl bg-[#ffffff] border border-[#ede4d8] hover:border-[#c5a059]/60 transition-all duration-300 p-5 flex flex-col justify-between shadow-[0_12px_35px_rgba(15,27,43,0.06)] group overflow-hidden"
                  >
                    {/* Image Banner */}
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 shadow-sm">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 filter brightness-[0.95]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0f1b2b]/90 backdrop-blur-md border border-[#c5a059]/40 text-[#faf8f5] text-[10px] uppercase font-medium flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#dfbe85]" />
                        <span>{pkg.badge}</span>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white/90 text-[10px] font-sans flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#dfbe85]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="font-serif text-xl text-[#0f1b2b] group-hover:text-[#c5a059] transition-colors font-medium">
                          {pkg.name}
                        </h3>
                        <p className="text-[11px] text-[#4a5d73] font-sans mt-0.5">
                          {pkg.idealFor}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-1.5 pt-1">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#1b2a41] font-sans">
                            <div className="w-4 h-4 rounded-full bg-[#f5efe6] border border-[#ede4d8] text-[#c5a059] flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking CTA Button */}
                    <div className="pt-4 mt-4 border-t border-[#ede4d8]">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => scrollToBooking(pkg.serviceValue)}
                        className="w-full py-2.5 px-3 rounded-full bg-[#0f1b2b] hover:bg-[#1a2d47] text-[#faf8f5] border border-[#c5a059]/40 font-medium text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(15,27,43,0.18)] hover:scale-102 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Reserve Experience</span>
                        <ArrowRight className="w-3 h-3 text-[#dfbe85]" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Tab 2: The 4-Step Bridal Journey */}
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
                  className="p-5 rounded-2xl bg-[#ffffff] border border-[#ede4d8] shadow-sm relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#f5efe6] border border-[#ede4d8] flex items-center justify-center text-[#c5a059] mb-3">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] font-semibold">
                    Step {step.step}
                  </span>
                  <h3 className="font-serif text-lg text-[#0f1b2b] font-medium mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#4a5d73] font-sans mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Tab 3: Reviews */}
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
                className="p-5 rounded-2xl bg-[#ffffff] border border-[#ede4d8] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#c5a059] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#0f1b2b] leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#ede4d8]">
                  <div className="font-medium text-xs text-[#0f1b2b]">{rev.bride}</div>
                  <div className="text-[10px] text-[#4a5d73]">{rev.location}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
