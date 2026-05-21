"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { label: "About",    href: "#about" },
  { label: "Rooms",    href: "#rooms" },
  { label: "Location", href: "#location" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBookingStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-700",
          scrolled ? "py-4 glass-nav" : "py-8 bg-transparent"
        )}
      >
        <div className="wrap flex items-center justify-between">

          {/* Left: Luxury Minimal Logo */}
          <Link href="/" className="flex items-center gap-4 shrink-0 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/80 transition-colors duration-500 shadow-gold-glow">
              <Image
                src="/sky/images/logo.png"
                alt="Hotel Sky Palace Logo"
                fill
                className="object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-[1.1rem] tracking-[0.15em] uppercase text-white leading-tight">Hotel Sky Palace</span>
              <span className="text-[0.55rem] tracking-[0.25em] text-[#D4AF37] uppercase font-inter">Elevated Luxury</span>
            </div>
          </Link>

          {/* Center: Menu */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={`/${l.href}`}
                onClick={(e) => handleNavClick(e, l.href)}
                className="nav-link text-[0.7rem] tracking-[0.18em] uppercase font-inter text-white/70 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: Gold Bordered Book Now */}
          <div className="hidden lg:flex shrink-0">
            <button
              onClick={openBooking}
              className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase font-inter text-[#D4AF37] hover:text-white border border-[#D4AF37]/60 hover:border-[#D4AF37] px-7 py-3 transition-all duration-500 shadow-gold-glow bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#010613]/90 flex flex-col pt-32 pb-12 px-8"
          >
            <nav className="flex flex-col gap-8 flex-1 items-center justify-center">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/${l.href}`}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="font-playfair text-4xl text-white/80 hover:text-[#D4AF37] transition-colors block text-center"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center"
            >
              <button
                onClick={() => { setMenuOpen(false); openBooking(); }}
                className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase font-inter text-white bg-[#D4AF37] hover:bg-[#EBD575] border border-[#D4AF37] px-10 py-4 transition-colors duration-300 shadow-gold-glow text-[#010613] w-full"
              >
                Reserve Your Stay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
