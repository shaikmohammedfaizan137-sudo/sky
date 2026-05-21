"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

const perks = [
  "Best rate guaranteed — book direct",
  "Flexible cancellation policy",
  "Personalised pre-arrival concierge",
  "Complimentary room upgrade on availability",
];

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { openBooking } = useBookingStore();

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "560px" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hotel/hotel_27.jpeg"
          alt="Hotel Sky Palace — Book Your Stay"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#080C0A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C0A]/95 via-[#080C0A]/60 to-transparent" />
      </div>

      <div ref={ref} className="relative z-10 wrap sec flex items-center">
        <div className="max-w-lg w-full">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-px bg-[#C9A84C]/70" />
            <span className="eyebrow text-[#C9A84C]/80 text-[0.6rem]">Book Direct · Best Rate Guaranteed</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-playfair text-[2.6rem] md:text-[3.2rem] text-white leading-[1.1] mb-5"
          >
            Your Perfect Stay{" "}
            <em className="not-italic text-[#C9A84C]">Awaits.</em>
          </motion.h2>

          {/* Perks */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="flex flex-col gap-2.5 mb-8"
          >
            {perks.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-[#C9A84C] shrink-0" />
                <span className="text-white/45 text-[0.82rem] font-light font-inter">{p}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <button
              onClick={openBooking}
              className="group flex items-center gap-2.5 bg-[#C9A84C] hover:bg-[#D9BC72] text-[#080C0A] text-[0.65rem] font-medium tracking-[0.14em] uppercase px-6 py-3 transition-colors duration-300"
            >
              <span>Reserve Your Stay</span>
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="tel:+919014333452"
              className="flex items-center gap-2 text-white/50 hover:text-white text-[0.65rem] tracking-[0.14em] uppercase px-5 py-3 border border-white/10 hover:border-white/30 transition-all duration-300 font-inter"
            >
              <Phone size={12} />
              <span>Call to Book</span>
            </a>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-5 pt-6 border-t border-white/8"
          >
            <a href="tel:+919014333452" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/50 flex items-center justify-center transition-colors duration-300">
                <Phone size={12} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-[0.55rem] tracking-widest uppercase text-white/25 font-inter mb-0.5">Call Now</p>
                <p className="text-white text-sm font-medium group-hover:text-[#C9A84C] transition-colors duration-300 font-inter">+91 90143 33452</p>
              </div>
            </a>
            <div className="w-px bg-white/8 hidden sm:block" />
            <a href="https://wa.me/919014333452" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-green-500/20 group-hover:border-green-400/50 flex items-center justify-center transition-colors duration-300">
                <MessageCircle size={12} className="text-green-400" />
              </div>
              <div>
                <p className="text-[0.55rem] tracking-widest uppercase text-white/25 font-inter mb-0.5">WhatsApp</p>
                <p className="text-white text-sm font-medium group-hover:text-green-400 transition-colors duration-300 font-inter">+91 90143 33452</p>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
