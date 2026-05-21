"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Wifi, UtensilsCrossed, ParkingCircle, Bell, Users, Clock, Coffee, ShoppingBag, Star } from "lucide-react";

const amenities = [
  { icon: Star,            title: "Luxury Stays",     body: "Immerse yourself in premium comfort across our three distinct room categories — each crafted with impeccable attention to detail." },
  { icon: UtensilsCrossed, title: "Fine Dining",       body: "Savour the finest Indian, Asian, and Chinese cuisine at Manu's Indian Spices — our in-house multi-cuisine restaurant." },
  { icon: ParkingCircle,   title: "Free Parking",      body: "Secure, spacious on-site parking at no additional charge for all our guests and their vehicles." },
  { icon: Wifi,            title: "High-Speed WiFi",   body: "Blazing-fast complimentary WiFi throughout the property — perfect for business and leisure alike." },
  { icon: Bell,            title: "24/7 Concierge",    body: "Our expert team is ready to fulfil every request — from recommendations to curated local experiences." },
  { icon: Users,           title: "Family Friendly",   body: "Spacious accommodations and thoughtful amenities designed for families travelling with children." },
  { icon: Clock,           title: "24/7 Front Desk",   body: "Round-the-clock reception ensuring seamless check-in, check-out, and assistance at any hour." },
  { icon: Coffee,          title: "Daily Breakfast",   body: "A curated morning spread featuring local favourites and international classics, served fresh each day." },
  { icon: ShoppingBag,     title: "Room Service",      body: "In-room dining available throughout the day — indulge in our full menu from the comfort of your room." },
];

export function AmenitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section id="amenities" className="sec bg-[#0A0F0D] overflow-hidden">
      <div className="wrap">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow block mb-4">Amenities</span>
            <div className="w-5 h-px bg-[#C9A84C] mb-7 opacity-70" />
            <h2 className="font-playfair text-[2.8rem] md:text-[3.4rem] text-white leading-[1.1] max-w-lg">
              Every Comfort,<br />
              <em className="not-italic text-[#C9A84C]">Thoughtfully</em> Curated.
            </h2>
          </motion.div>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1E3328]/40">
          {amenities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.055, duration: 0.6 }}
              className="group bg-[#0A0F0D] hover:bg-[#0F1A16] transition-colors duration-300 p-8 flex flex-col gap-5"
            >
              <div className="w-9 h-9 rounded-full border border-[#C9A84C]/15 group-hover:border-[#C9A84C]/40 flex items-center justify-center transition-colors duration-400 shrink-0">
                <a.icon size={15} className="text-[#C9A84C]" />
              </div>
              <div>
                <h3 className="font-playfair text-[1.05rem] text-white mb-2">{a.title}</h3>
                <p className="text-white/35 text-[0.78rem] font-light leading-[1.8] font-inter">{a.body}</p>
              </div>
              <div className="w-0 h-px bg-[#C9A84C]/50 group-hover:w-7 transition-all duration-500 mt-auto" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
