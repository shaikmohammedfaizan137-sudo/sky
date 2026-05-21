"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, UtensilsCrossed, Car, BedDouble, Star, Coffee } from "lucide-react";

const badges = [
  { icon: Star,            label: "Luxury Stays",   sub: "Premium experience"       },
  { icon: Wifi,            label: "Free WiFi",       sub: "Ultra-fast broadband"     },
  { icon: UtensilsCrossed, label: "Fine Dining",     sub: "Multi-cuisine restaurant" },
  { icon: Car,             label: "Free Parking",    sub: "Secure on-site parking"   },
  { icon: BedDouble,       label: "Spacious Rooms",  sub: "160–240 m² suites"       },
  { icon: Coffee,          label: "Daily Breakfast", sub: "Freshly served each day"  },
];

export function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <section ref={ref} className="border-y border-[#1E3328]/60 bg-[#0A0F0D]">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-[#1E3328]/60">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="flex flex-col items-center gap-2.5 px-4 py-7 group cursor-default"
            >
              <b.icon size={16} className="text-[#C9A84C] group-hover:scale-110 transition-transform duration-300" />
              <div className="text-center">
                <p className="text-white text-[0.75rem] font-medium tracking-wide font-inter">{b.label}</p>
                <p className="text-white/30 text-[0.6rem] font-light mt-0.5 font-inter">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
