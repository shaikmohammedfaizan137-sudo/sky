"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function LocationSection() {
  return (
    <section id="location" className="sec bg-[#001218]">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[500px] bg-[#001e28] relative border border-[#003D4C] shadow-luxury overflow-hidden"
          >
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#D1AB3C]/40 z-10" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#D1AB3C]/40 z-10" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#D1AB3C]/40 z-10" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#D1AB3C]/40 z-10" />

            <iframe
              src="https://www.google.com/maps?q=Hotel+Sky+Palace,+141+and+142,+Plot+No+140,+Madhura+Nagar,+Shamshabad,+Hyderabad,+Telangana+501218&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) contrast(1.1) brightness(0.7) hue-rotate(160deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Text Content */}
          <div>
            <AnimatedText>
              <span className="eyebrow block mb-4">Find Us</span>
              <div className="w-10 h-px bg-gradient-to-r from-[#D1AB3C] to-transparent mt-2 mb-6" />
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <h2 className="text-4xl md:text-5xl text-white font-light leading-[1.1] mb-6 tracking-tight">
                Perfectly <span className="font-medium">Positioned.</span>
              </h2>
            </AnimatedText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-[#8AA4AD] font-light leading-relaxed text-base">
                Nestled in the peaceful locality of Madhura Nagar, Shamshabad, Hotel Sky Palace offers you the perfect blend of serenity and city accessibility — a true escape from the ordinary.
              </p>

              <div className="space-y-5 pt-6 border-t border-[#003D4C]">

                {/* Hotel Address */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#001e28] flex items-center justify-center shrink-0 border border-[#D1AB3C]/20 group-hover:border-[#D1AB3C]/50 transition-colors duration-300">
                    <MapPin size={16} className="text-[#D1AB3C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Hotel Sky Palace</h3>
                    <p className="text-[#8AA4AD] text-sm font-light leading-relaxed">
                      141 & 142, Plot No 140, Madhura Nagar,<br />
                      Shamshabad, Hyderabad, Telangana 501218
                    </p>
                  </div>
                </motion.div>

                {/* City Center */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#001e28] flex items-center justify-center shrink-0 border border-[#D1AB3C]/20 group-hover:border-[#D1AB3C]/50 transition-colors duration-300">
                    <Navigation size={16} className="text-[#D1AB3C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">City Center (Banjara Hills / Jubilee Hills)</h3>
                    <p className="text-[#8AA4AD] text-sm font-light">25 km away — ~40 minutes via PVNR Expressway</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#001e28] flex items-center justify-center shrink-0 border border-[#D1AB3C]/20 group-hover:border-[#D1AB3C]/50 transition-colors duration-300">
                    <Phone size={16} className="text-[#D1AB3C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Contact & Reservations</h3>
                    <a href="tel:+919014333452" className="text-[#8AA4AD] text-sm font-light hover:text-[#D1AB3C] transition-colors duration-300">
                      +91 90143 33452
                    </a>
                  </div>
                </motion.div>

              </div>

              {/* Get Directions CTA */}
              <motion.a
                href="https://maps.google.com/?q=Hotel+Sky+Palace,+141+and+142,+Plot+No+140,+Madhura+Nagar,+Shamshabad,+Hyderabad,+Telangana+501218"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="inline-flex items-center gap-3 mt-2 text-[0.72rem] uppercase tracking-widest text-[#D1AB3C] hover:text-[#E2BD50] transition-colors duration-300 group"
              >
                <span>Get Directions</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >→</motion.span>
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
