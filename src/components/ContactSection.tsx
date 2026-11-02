import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { BookingFormData } from '../types/index.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    brideName: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: '',
    serviceType: 'Royal Heritage Bridal Package',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brideName || !formData.email) return;

    const ref = `ELG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-14 md:py-24 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-lg mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5efe6] border border-[#c5a059]/40 mb-2 backdrop-blur-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-sans font-medium">
            Private Consultation
          </span>
        </motion.div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#0f1b2b] tracking-tight">
          Reserve Your Bridal Date
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#4a5d73] font-sans">
          Limited brides accepted each season for undivided artistic devotion.
        </p>
      </div>

      {/* Main Reservation Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl bg-[#ffffff] border border-[#ede4d8] p-5 sm:p-8 shadow-[0_15px_45px_rgba(15,27,43,0.06)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-radial from-[#dfbe85]/15 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="booking-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Bride's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    placeholder="e.g. Vivienne Montgomery"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] placeholder-[#4a5d73]/60 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vivienne@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] placeholder-[#4a5d73]/60 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all [color-scheme:light]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Destination / Venue *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Paris / Chennai / Udaipur"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] placeholder-[#4a5d73]/60 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all"
                    />
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] absolute left-3 top-3" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Experience Package
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all"
                  >
                    <option value="Royal Heritage Bridal Package">Imperial Royal Heritage (Full Ceremony)</option>
                    <option value="Haute Glass-Skin Minimalist">Haute Glass-Skin Minimalist (Reception)</option>
                    <option value="Destination Bridal Weekend">Destination Bridal Weekend (3-Day VIP)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#0f1b2b] font-medium mb-1 font-sans">
                    Special Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ceremony timing, attire details, or skin preferences..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe6]/70 border border-[#ede4d8] text-[#0f1b2b] placeholder-[#4a5d73]/60 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#c5a059] transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#4a5d73] font-sans">
                  Private consultations include digital face-mapping preview.
                </span>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-[#0f1b2b] hover:bg-[#1a2d47] text-[#faf8f5] border border-[#c5a059]/40 font-medium text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(15,27,43,0.2)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#dfbe85]" />
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfbe85]" />
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center max-w-md mx-auto space-y-4"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#f5efe6] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                  Reservation Transmitted
                </span>
                <h3 className="font-serif text-2xl text-[#0f1b2b] font-medium mt-0.5">
                  We Await You, {formData.brideName}
                </h3>
                <p className="mt-1 text-xs text-[#4a5d73] font-sans">
                  A personalized dossier will be dispatched to <strong className="text-[#0f1b2b]">{formData.email}</strong> within 24 hours.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f5efe6] border border-[#ede4d8] text-xs font-mono text-[#0f1b2b] font-semibold">
                Booking Reference: {bookingRef}
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#4a5d73] hover:text-[#0f1b2b] underline underline-offset-4 font-medium"
              >
                Submit another inquiry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
