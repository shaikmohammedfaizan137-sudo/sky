"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface GalleryImage {
  src: string;
  alt: string;
  h: "short" | "medium" | "tall";
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/sky/images/hotel/hotel_1.jpeg",
    alt: "Hotel Sky Palace — Building Exterior at Night",
    h: "tall",
    category: "Exterior",
  },
  {
    src: "/sky/images/hotel/hotel_2.jpeg",
    alt: "Hotel Sky Palace — Lobby & Hospitality Team",
    h: "medium",
    category: "Lobby",
  },
  {
    src: "/sky/images/hotel/hotel_corridor.png",
    alt: "Hotel Sky Palace — Luxury Corridor Hallway",
    h: "medium",
    category: "Corridor",
  },
  {
    src: "/sky/images/hotel/hotel_3.jpeg",
    alt: "Queen Room — Cosy Interior",
    h: "short",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_4.jpeg",
    alt: "Queen Room — Elegant Bedroom View",
    h: "tall",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_5.jpeg",
    alt: "Queen Room — TV & Work Desk",
    h: "medium",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_6.jpeg",
    alt: "Deluxe Room — Premium King Bed",
    h: "short",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_7.jpeg",
    alt: "Deluxe Room — Premium Interiors",
    h: "tall",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_8.jpeg",
    alt: "Deluxe Room — Sitting Area",
    h: "medium",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_9.jpeg",
    alt: "Deluxe Room — Bedroom Detail",
    h: "short",
    category: "Rooms",
  },
  {
    src: "/sky/images/hotel/hotel_10.jpeg",
    alt: "Superior Suite — Lounge & Décor",
    h: "medium",
    category: "Suites",
  },
  {
    src: "/sky/images/hotel/hotel_11.jpeg",
    alt: "Superior Suite — Spa Bathroom",
    h: "tall",
    category: "Suites",
  },
  {
    src: "/sky/images/hotel/hotel_12.jpeg",
    alt: "Superior Suite — Executive Workspace",
    h: "short",
    category: "Suites",
  },
  {
    src: "/sky/images/hotel/hotel_29.jpeg",
    alt: "Hotel Sky Palace Restaurant — Manu's Indian Spices",
    h: "medium",
    category: "Dining",
  },
  {
    src: "/sky/images/hotel/hotel_30.jpeg",
    alt: "Hotel Sky Palace — Buffet & Dining Counter",
    h: "short",
    category: "Dining",
  },
];

const heightMap: Record<string, string> = {
  short: "h-48",
  medium: "h-64",
  tall: "h-80",
};

export function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="sec bg-oak-black overflow-hidden">
      <div className="wrap">
        {/* Header */}
        <div className="w-full flex justify-center mb-12 md:mb-16">
          <div className="flex flex-col items-center text-center max-w-xl">
            <AnimatedText className="flex flex-col items-center w-full">
              <span className="eyebrow">Visual Journey</span>
              <div className="w-10 h-px bg-oak-gold mt-3" />
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <h2 className="font-playfair text-3xl md:text-4xl xl:text-5xl text-oak-cream mt-6 mb-4 leading-[1.15]">
                Spaces That <span className="italic text-oak-gold">Speak for Themselves</span>
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.25}>
              <p className="text-oak-muted text-sm md:text-base font-light leading-relaxed">
                Step inside. Every photograph tells a story of elegance, comfort, and the Hotel Sky Palace experience.
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="break-inside-avoid mb-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.7 }}
                onClick={() => setLightbox(img.src)}
                className={`relative ${heightMap[img.h]} overflow-hidden rounded-sm cursor-pointer group`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-oak-black/0 group-hover:bg-oak-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 border border-transparent group-hover:border-oak-gold/25 transition-colors duration-300 rounded-sm" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span
                    className="eyebrow text-[0.58rem]"
                    style={{
                      background: "rgba(15,15,15,0.8)",
                      backdropFilter: "blur(8px)",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      display: "inline-block",
                    }}
                  >
                    {img.category}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-oak-black/95 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-oak-cream hover:text-oak-gold transition-colors"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-5xl w-full max-h-[85vh] aspect-video">
            <Image
              src={lightbox}
              alt="Hotel Sky Palace Gallery"
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
