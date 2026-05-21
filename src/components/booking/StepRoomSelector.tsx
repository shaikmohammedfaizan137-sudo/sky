"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus, Check, Users, Maximize2 } from "lucide-react";
import { ROOM_TYPES } from "@/lib/roomData";
import { formatCurrency } from "@/lib/utils";
import { useBookingStore } from "@/store/bookingStore";

export function StepRoomSelector() {
  const { booking, addRoom, removeRoom, updateRoomQuantity } = useBookingStore();

  const getQuantity = (roomId: string) =>
    booking.selectedRooms.find((r) => r.roomId === roomId)?.quantity ?? 0;

  return (
    <div className="p-6 flex flex-col gap-4">
      <p className="text-oak-muted text-sm font-light">
        Choose your room type and quantity. Mix and match for larger groups.
      </p>

      {ROOM_TYPES.map((room, i) => {
        const qty = getQuantity(room.id);
        const selected = qty > 0;

        return (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`relative border rounded-sm overflow-hidden transition-all duration-300 ${
              selected
                ? "border-oak-gold/50 bg-oak-dark-3"
                : "border-white/8 bg-oak-dark-2 hover:border-white/15"
            }`}
          >
            {/* Selected indicator */}
            {selected && (
              <div className="absolute top-3 right-3 z-10 w-5 h-5 rounded-full bg-oak-gold flex items-center justify-center">
                <Check size={10} className="text-oak-black" />
              </div>
            )}

            <div className="flex gap-0">
              {/* Image */}
              <div className="relative w-32 md:w-40 shrink-0">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="160px"
                  className="object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    {room.badge && (
                      <span className="label-luxury text-[0.55rem] text-oak-gold/80 block mb-1">
                        {room.badge}
                      </span>
                    )}
                    <h3 className="font-playfair text-oak-cream text-lg">{room.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[0.65rem] text-oak-muted">
                  <span className="flex items-center gap-1">
                    <Users size={10} className="text-oak-gold" />
                    Up to {room.maxOccupancy}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 size={10} className="text-oak-gold" />
                    {room.size}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <div>
                    <span className="font-playfair text-oak-gold text-lg">
                      {formatCurrency(room.pricePerNight)}
                    </span>
                    <span className="text-oak-muted text-[0.62rem] font-light ml-1">
                      / night
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateRoomQuantity(room.id, qty - 1)}
                      disabled={qty === 0}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        qty > 0
                          ? "border-oak-gold/50 text-oak-gold hover:bg-oak-gold/10"
                          : "border-white/10 text-oak-muted/30 cursor-not-allowed"
                      }`}
                    >
                      <Minus size={11} />
                    </motion.button>

                    <motion.span
                      key={qty}
                      initial={{ scale: 1.3, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-6 text-center font-inter text-sm text-oak-cream font-medium"
                    >
                      {qty}
                    </motion.span>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => (qty === 0 ? addRoom(room.id) : updateRoomQuantity(room.id, qty + 1))}
                      className="w-7 h-7 rounded-full border border-oak-gold/50 text-oak-gold hover:bg-oak-gold/10 flex items-center justify-center transition-all duration-200"
                    >
                      <Plus size={11} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Selection summary */}
      {booking.selectedRooms.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border border-oak-gold/20 bg-oak-gold/5 rounded-sm"
        >
          <p className="label-luxury text-[0.6rem] mb-2">Selected:</p>
          {booking.selectedRooms.map((r) => (
            <div key={r.roomId} className="flex justify-between text-sm">
              <span className="text-oak-cream font-light">
                {r.roomName} × {r.quantity}
              </span>
              <span className="text-oak-gold">
                {formatCurrency(r.pricePerNight * r.quantity)}/night
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
