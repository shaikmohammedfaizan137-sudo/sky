"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";

const cuisines = [
  { label: "Indian Cuisine",  sub: "Curries · Biryanis · Tandoor specialities" },
  { label: "Asian Delights",  sub: "Thai · Japanese · Korean" },
  { label: "Chinese Cuisine", sub: "Dim Sum · Stir Fries · Soups" },
];

export function DiningSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="dining" className="sec bg-oak-dark/20 overflow-hidden">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Text col */}
          <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-7">
            <AnimatedText>
              <span className="eyebrow">The Restaurant</span>
              <div className="gold-line mt-3" />
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <h2 className="font-playfair text-3xl md:text-4xl xl:text-5xl text-oak-cream leading-[1.15]">
                A Culinary Journey,{" "}
                <span className="italic text-oak-gold">At Every Meal</span>
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.25}>
              <p className="text-oak-muted-light text-sm md:text-base font-light leading-[1.9]">
                Our in-house restaurant <strong className="text-oak-cream font-medium">Manu's Indian Spices</strong> is more than a place to eat — it's a sensory experience. From warming aromas of traditional Indian curries to the delicate precision of Asian cuisine, every meal is crafted with passion.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.35}>
              <p className="text-oak-muted text-sm md:text-base font-light leading-[1.9]">
                Whether joining us for breakfast before an early flight, a business lunch, or a candlelit dinner — the experience remains unforgettable.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.45}>
              <div ref={ref} className="flex flex-col gap-2.5">
                {cuisines.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.09 + 0.4, duration: 0.55 }}
                    className="flex items-center gap-4 px-4 py-3.5 border border-white/5 hover:border-oak-gold/25 transition-colors duration-300 rounded-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-oak-gold shrink-0" />
                    <div>
                      <p className="text-oak-cream text-sm font-medium">{c.label}</p>
                      <p className="text-oak-muted text-[0.7rem] font-light mt-0.5">{c.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedText>
          </div>

          {/* Image col */}
          <div className="order-1 lg:order-2 relative">
            <AnimatedText direction="right">
              <div className="relative" style={{ aspectRatio: "4/5", maxHeight: "600px" }}>
                <div className="relative h-full rounded-sm overflow-hidden shadow-luxury">
                  <Image
                    src="/images/hotel/hotel_29.jpeg"
                    alt="Manu's Indian Spices restaurant at Hotel Sky Palace — multi-cuisine dining, Shamshabad Hyderabad"
                    fill sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55, duration: 0.7 }}
                  className="absolute -left-4 md:-left-7 -bottom-4 md:-bottom-7 w-40 h-40 md:w-48 md:h-48 rounded-sm overflow-hidden border-4 border-oak-black shadow-luxury"
                >
                  <Image
                    src="/images/hotel/hotel_30.jpeg"
                    alt="Hotel Sky Palace restaurant interior"
                    fill sizes="200px"
                    className="object-cover object-center"
                  />
                </motion.div>
              </div>
            </AnimatedText>
          </div>

        </div>
      </div>
    </section>
  );
}
