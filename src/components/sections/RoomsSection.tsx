"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROOM_TYPES } from "@/lib/roomData";
import { formatCurrency } from "@/lib/utils";
import { useBookingStore } from "@/store/bookingStore";

function RoomCard({ room, index }: { room: (typeof ROOM_TYPES)[0]; index: number }) {
  const { openBooking, addRoom } = useBookingStore();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col bg-[#0F1A16] border border-[#1E3328] overflow-hidden transition-all duration-500 hover:border-[#264035] hover:shadow-hover"
    >
      {/* Badge */}
      {room.badge && (
        <div className="absolute top-4 left-4 z-10 bg-[#C9A84C] text-[#0A0F0D] text-[0.55rem] tracking-widest uppercase px-2.5 py-1 font-medium font-inter">
          {room.badge}
        </div>
      )}

      {/* Image */}
      <Link href={`/rooms/${room.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-7">
        <div className="mb-5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link href={`/rooms/${room.id}`}>
              <h3 className="font-playfair text-[1.4rem] text-white group-hover:text-[#C9A84C] transition-colors duration-300">
                {room.name}
              </h3>
            </Link>
          </div>
          <p className="text-[0.7rem] tracking-wide text-white/30 font-inter uppercase">{room.size} · {room.bedType}</p>
        </div>

        <p className="text-white/40 text-[0.82rem] font-light leading-[1.8] mb-7 font-inter line-clamp-3">
          {room.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#1E3328]">
          <div>
            <span className="font-playfair text-xl text-white">{formatCurrency(room.pricePerNight)}</span>
            <span className="text-[0.6rem] text-white/30 tracking-widest uppercase ml-2 font-inter">/ night</span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href={`/rooms/${room.id}`}
              className="text-[0.62rem] uppercase tracking-widest text-white/30 hover:text-white transition-colors font-inter"
            >
              Details
            </Link>
            <button
              onClick={() => { addRoom(room.id); openBooking(); }}
              className="btn-gold text-[0.62rem] py-2 px-4"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function RoomsSection() {
  return (
    <section id="rooms" className="sec bg-[#0F1A16]">
      <div className="wrap">
        {/* Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow block mb-4">Accommodations</span>
              <div className="w-5 h-px bg-[#C9A84C] mb-6 opacity-70" />
              <h2 className="font-playfair text-[2.8rem] md:text-[3.4rem] text-white leading-[1.1]">
                Rooms Designed<br />
                for <em className="not-italic text-[#C9A84C]">Rest</em> & Refinement.
              </h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/35 font-light max-w-xs text-sm font-inter leading-relaxed"
          >
            Each room offers a careful balance of comfort, natural light, and premium amenities.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {ROOM_TYPES.map((room, i) => (
            <div key={room.id} className="relative">
              <RoomCard room={room} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
