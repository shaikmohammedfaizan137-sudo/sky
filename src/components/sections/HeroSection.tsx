"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useBookingStore } from "@/store/bookingStore";
import { Star, CalendarDays, Users } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const { openBooking } = useBookingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ultra-subtle dust motes catching the light
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; maxAlpha: number }[] = [];
    for (let i = 0; i < 70; i++) { // More dots
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1, // Larger dots
        vx: (Math.random() - 0.5) * 0.3, // Faster
        vy: -Math.random() * 0.3 - 0.1,
        alpha: Math.random() * 0.4 + 0.1, // Start visible
        maxAlpha: Math.random() * 0.5 + 0.3, // More opaque
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle pulse effect
        p.alpha += (Math.random() - 0.5) * 0.02;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 188, 122, ${p.alpha})`; // Visible gold dots
        ctx.fill();
        
        // Add strong glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(214, 188, 122, ${p.alpha * 1.5})`;
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[850px] flex flex-col justify-center overflow-hidden bg-[#01040a]">
      
      {/* Cinematic Background with Slow Zoom */}
      <motion.div 
        className="absolute inset-0 z-0 origin-[50%_40%]"
        animate={{ scale: [1, 1.1] }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
      >
        <Image
          src="/images/hotel/hotel_31.jpeg"
          alt="Hotel Sky Palace Luxury Room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Ultra-Premium Overlays for Depth and Contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#01040a]/95 via-[#01040a]/60 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#01040a] via-transparent to-[#01040a]/50" />
      <div className="absolute inset-0 z-0 bg-[#01040a]/20 mix-blend-multiply" />
      
      {/* Dramatic Cinematic Lighting */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#c2a353]/10 blur-[130px] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-15%] w-[40%] h-[40%] rounded-full bg-[#0c2b5c]/30 blur-[140px] mix-blend-screen pointer-events-none z-0" />

      {/* Atmospheric Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

      {/* Main Content */}
      <div className="relative z-10 wrap w-full mt-[-8vh]">
        <div className="max-w-5xl">
          
          {/* Eyebrow / Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-5 mb-10"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2a353]/20 bg-white/[0.02] backdrop-blur-md shadow-gold-glow">
              <Star size={10} className="text-[#c2a353] fill-[#c2a353]" />
              <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[#c2a353] font-medium font-inter">5-Star Experience</span>
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-[#c2a353]/50 to-transparent" />
            <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/40 font-inter">Shamshabad, Hyderabad</span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="font-playfair text-[4.2rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] text-white leading-[0.9] tracking-[-0.02em] mb-10 text-balance"
          >
            Experience <br className="hidden md:block" />
            the Art of <br />
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#e3cba8] via-[#d6bc7a] to-[#8a7131] pr-4">
              Refined
            </em> Luxury.
          </motion.h1>

          {/* Minimalist Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-white/50 text-base md:text-lg font-light leading-[1.8] max-w-xl font-inter mb-14"
          >
            Where exceptional design meets impeccable service. Step into a world of timeless elegance, meticulously crafted for the modern connoisseur.
          </motion.p>
        </div>
      </div>

      {/* Floating Glassmorphic Booking Card (Aman / Apple style) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20 flex justify-center px-4"
      >
        <div className="glass-panel rounded-xl p-2 md:p-3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-4xl w-full animate-float shadow-luxury relative overflow-hidden">
          
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c2a353]/30 to-transparent" />

          <div className="flex items-center gap-8 md:gap-14 w-full px-6 py-4 md:py-2">
            
            {/* Check-In */}
            <div className="flex items-center gap-5 group cursor-pointer w-1/2 md:w-auto">
              <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#c2a353]/50 group-hover:bg-[#c2a353]/5 transition-all duration-500">
                <CalendarDays size={14} className="text-[#c2a353]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] tracking-[0.25em] uppercase text-white/30 mb-0.5 group-hover:text-[#c2a353]/70 transition-colors duration-500">Check In</span>
                <span className="text-[0.8rem] font-light tracking-wide text-white font-inter">Select Date</span>
              </div>
            </div>

            <div className="w-px h-10 bg-white/5 hidden md:block" />

            {/* Guests */}
            <div className="flex items-center gap-5 group cursor-pointer w-1/2 md:w-auto">
              <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#c2a353]/50 group-hover:bg-[#c2a353]/5 transition-all duration-500">
                <Users size={14} className="text-[#c2a353]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] tracking-[0.25em] uppercase text-white/30 mb-0.5 group-hover:text-[#c2a353]/70 transition-colors duration-500">Guests</span>
                <span className="text-[0.8rem] font-light tracking-wide text-white font-inter">2 Adults, 1 Room</span>
              </div>
            </div>
          </div>

          <button onClick={openBooking} className="btn-primary whitespace-nowrap w-full md:w-auto text-[0.65rem] py-5 px-10 rounded-lg shrink-0">
            <span>Check Availability</span>
          </button>
        </div>
      </motion.div>

      {/* Razor-thin Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="absolute right-10 md:right-16 bottom-[40%] md:bottom-[45%] z-20 hidden lg:flex flex-col items-center gap-6"
      >
        <span className="text-[0.45rem] tracking-[0.4em] uppercase text-white/20 rotate-90 origin-center mb-10 whitespace-nowrap font-inter">Discover</span>
        <motion.div
          animate={{ height: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-[#c2a353]/60 to-transparent origin-top"
          style={{ height: "100px" }}
        />
      </motion.div>
      
    </section>
  );
}
