"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="sec bg-[#0A0F0D]">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="eyebrow block mb-5">Our Story</span>
            <div className="w-6 h-px bg-[#C9A84C] mb-8 opacity-70" />
            <h2 className="font-playfair text-[2.8rem] md:text-[3.4rem] text-white leading-[1.1] mb-8">
              A Sanctuary<br />
              of <em className="not-italic text-[#C9A84C]">Modern</em> Luxury.
            </h2>

            <div className="space-y-5 text-white/45 text-[0.9rem] font-light leading-[1.9] font-inter">
              <p>
                Nestled in the heart of Shamshabad, Hyderabad, Hotel Sky Palace is a celebration of refined hospitality. Every detail — from our meticulously designed interiors to our warm, personal service — has been crafted to elevate your experience.
              </p>
              <p>
                Whether you are here on business, leisure, or a blissful escape, we offer spacious rooms, exquisite dining, and world-class amenities that make every moment feel extraordinary.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-[#1E3328]">
              {[
                { num: "100%", label: "Guest Satisfaction" },
                { num: "24/7", label: "Premium Service" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-playfair text-3xl text-white font-light mb-1">{s.num}</p>
                  <p className="text-[0.6rem] tracking-widest uppercase text-white/30 font-inter">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Images */}
          <div className="relative h-[520px] lg:h-[620px] w-full">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 right-0 w-[85%] h-[78%] overflow-hidden"
            >
              <Image
                src="/images/recpection"
                alt="Hotel Sky Palace Reception"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A0F0D]/30" />
            </motion.div>

            {/* Accent small image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.25, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bottom-0 left-0 w-[52%] h-[45%] overflow-hidden border-4 border-[#0A0F0D] shadow-luxury"
            >
              <Image
                src="/images/waiting area"
                alt="Hotel Sky Palace waiting area"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bottom-[45%] left-[52%] w-px h-16 bg-gradient-to-b from-[#C9A84C]/60 to-transparent origin-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
