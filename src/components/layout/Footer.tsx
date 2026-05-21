"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const { openBooking } = useBookingStore();

  return (
    <footer className="bg-[#080C0A] text-white pt-20 pb-10 border-t border-[#1E3328]">
      <div className="wrap">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 pb-16 border-b border-[#1E3328]/70">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9 overflow-hidden rounded-full border border-[#C9A84C]/20">
                <Image src="/sky/images/logo.png" alt="Hotel Sky Palace Logo" fill className="object-cover scale-110" />
              </div>
              <div>
                <p className="text-[0.8rem] font-medium tracking-[0.12em] uppercase text-white">Hotel Sky Palace</p>
                <p className="text-[0.55rem] tracking-[0.18em] text-[#C9A84C] uppercase">Sky Group of Hotels</p>
              </div>
            </div>
            <p className="text-white/35 text-[0.82rem] font-light leading-relaxed mb-8 max-w-[220px] font-inter">
              Where every detail is a testament to elegance — luxury, comfort, and heartfelt hospitality in Hyderabad.
            </p>
            <button
              onClick={openBooking}
              className="btn-gold text-[0.65rem] py-2.5 px-5"
            >
              Reserve Your Stay
            </button>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[0.6rem] tracking-widest uppercase text-white/40 mb-6 font-inter">Explore</p>
            <ul className="space-y-3.5">
              {["Accommodations", "About", "Gallery", "Location"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-[0.82rem] text-white/40 hover:text-white transition-colors duration-300 font-inter"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.6rem] tracking-widest uppercase text-white/40 mb-6 font-inter">Contact</p>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-[0.82rem] text-white/40 font-light leading-relaxed font-inter">
                  141 & 142, Plot No 140<br />
                  Madhura Nagar, Shamshabad<br />
                  Telangana 501218
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#C9A84C] shrink-0" />
                <a href="tel:+919014333452" className="text-[0.82rem] text-white/40 hover:text-white transition-colors font-inter">
                  +91 90143 33452
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#C9A84C] shrink-0" />
                <a href="mailto:hotelskypalacehyd@gmail.com" className="text-[0.78rem] text-white/40 hover:text-white transition-colors font-inter">
                  hotelskypalacehyd@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[0.6rem] tracking-widest uppercase text-white/40 mb-6 font-inter">Newsletter</p>
            <p className="text-white/35 text-[0.82rem] font-light mb-5 font-inter">
              Subscribe for exclusive offers and updates.
            </p>
            <form
              className="flex border-b border-[#1E3328] focus-within:border-[#C9A84C]/50 transition-colors duration-300"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent border-none text-white text-[0.82rem] py-2.5 px-0 focus:ring-0 w-full"
              />
              <button type="submit" className="text-[0.6rem] tracking-widest uppercase text-[#C9A84C] hover:text-white px-2 transition-colors shrink-0">
                →
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-[0.65rem] text-white/25 tracking-wide font-inter">
          <p>© {new Date().getFullYear()} Hotel Sky Palace. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
