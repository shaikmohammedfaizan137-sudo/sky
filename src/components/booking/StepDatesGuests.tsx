"use client";

import { motion } from "framer-motion";
import { addDays, format } from "date-fns";
import { Calendar, Users, Plus, Minus } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { calculateNights } from "@/lib/utils";

function CounterField({
  label,
  sub,
  value,
  onIncrease,
  onDecrease,
  min,
  max,
}: {
  label: string;
  sub: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-white/8 rounded-sm hover:border-white/15 transition-colors duration-200">
      <div>
        <p className="text-oak-cream text-sm font-medium">{label}</p>
        <p className="text-oak-muted text-xs font-light mt-0.5">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onDecrease}
          disabled={value <= min}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
            value > min
              ? "border-oak-gold/50 text-oak-gold hover:bg-oak-gold/10"
              : "border-white/10 text-oak-muted/30 cursor-not-allowed"
          }`}
        >
          <Minus size={12} />
        </motion.button>
        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 text-center font-playfair text-xl text-oak-cream"
        >
          {value}
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onIncrease}
          disabled={value >= max}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
            value < max
              ? "border-oak-gold/50 text-oak-gold hover:bg-oak-gold/10"
              : "border-white/10 text-oak-muted/30 cursor-not-allowed"
          }`}
        >
          <Plus size={12} />
        </motion.button>
      </div>
    </div>
  );
}

export function StepDatesGuests() {
  const { booking, setCheckIn, setCheckOut, setAdults, setChildren } =
    useBookingStore();

  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const nights =
    booking.checkIn && booking.checkOut
      ? calculateNights(booking.checkIn, booking.checkOut)
      : 0;

  return (
    <div className="p-6 flex flex-col gap-6">
      <p className="text-oak-muted text-sm font-light">
        Select your check-in and check-out dates, and the number of guests.
      </p>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check-In */}
        <div className="flex flex-col gap-2">
          <label className="label-luxury flex items-center gap-2">
            <Calendar size={11} />
            Check-In
          </label>
          <input
            type="date"
            min={today}
            value={booking.checkIn ? format(booking.checkIn, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const d = e.target.value ? new Date(e.target.value) : null;
              setCheckIn(d);
              // Auto-set checkout if needed
              if (d && booking.checkOut && booking.checkOut <= d) {
                setCheckOut(addDays(d, 1));
              }
            }}
            className="bg-oak-dark-2 border border-white/10 rounded-sm px-4 py-3 text-oak-cream text-sm font-light focus:outline-none focus:border-oak-gold/50 transition-colors duration-200 w-full"
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col gap-2">
          <label className="label-luxury flex items-center gap-2">
            <Calendar size={11} />
            Check-Out
          </label>
          <input
            type="date"
            min={
              booking.checkIn
                ? format(addDays(booking.checkIn, 1), "yyyy-MM-dd")
                : tomorrow
            }
            value={
              booking.checkOut ? format(booking.checkOut, "yyyy-MM-dd") : ""
            }
            onChange={(e) =>
              setCheckOut(e.target.value ? new Date(e.target.value) : null)
            }
            className="bg-oak-dark-2 border border-white/10 rounded-sm px-4 py-3 text-oak-cream text-sm font-light focus:outline-none focus:border-oak-gold/50 transition-colors duration-200 w-full"
          />
        </div>
      </div>

      {/* Nights display */}
      {nights > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
        >
          <div className="w-2 h-2 rounded-full bg-oak-gold" />
          <span className="text-oak-gold font-medium">{nights}</span>
          <span className="text-oak-muted font-light">
            night{nights !== 1 ? "s" : ""} selected
          </span>
        </motion.div>
      )}

      {/* Guests */}
      <div className="flex flex-col gap-3">
        <p className="label-luxury flex items-center gap-2">
          <Users size={11} />
          Guests
        </p>
        <CounterField
          label="Adults"
          sub="Age 18+"
          value={booking.adults}
          onIncrease={() => setAdults(booking.adults + 1)}
          onDecrease={() => setAdults(Math.max(1, booking.adults - 1))}
          min={1}
          max={10}
        />
        <CounterField
          label="Children"
          sub="Under 18"
          value={booking.children}
          onIncrease={() => setChildren(booking.children + 1)}
          onDecrease={() => setChildren(Math.max(0, booking.children - 1))}
          min={0}
          max={6}
        />
      </div>
    </div>
  );
}
