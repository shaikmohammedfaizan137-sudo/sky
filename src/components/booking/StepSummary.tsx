"use client";

import { motion } from "framer-motion";
import { Calendar, Users, BedDouble, MessageSquare, Phone, CheckCircle2 } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { calculatePriceSummary, openWhatsApp } from "@/lib/bookingUtils";
import { formatCurrency, formatDateShort } from "@/lib/utils";

export function StepSummary() {
  const { booking, resetBooking } = useBookingStore();
  const summary = calculatePriceSummary(booking);

  const handleWhatsApp = () => {
    openWhatsApp(booking);
  };

  const guestCount =
    booking.children > 0
      ? `${booking.adults} Adults, ${booking.children} Children`
      : `${booking.adults} Adults`;

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Confirmation header */}
      <div className="flex flex-col items-center text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-14 h-14 rounded-full border border-oak-gold/40 flex items-center justify-center mb-4"
        >
          <CheckCircle2 size={24} className="text-oak-gold" />
        </motion.div>
        <h3 className="font-playfair text-xl text-oak-cream">Booking Summary</h3>
        <p className="text-oak-muted text-sm font-light mt-1">
          Review your details before sending to WhatsApp
        </p>
      </div>

      {/* Details Card */}
      <div className="border border-white/8 rounded-sm overflow-hidden">
        {/* Guest */}
        <div className="flex items-start gap-3 p-4 border-b border-white/5">
          <Users size={14} className="text-oak-gold mt-0.5 shrink-0" />
          <div>
            <p className="text-oak-muted text-[0.65rem] font-light">Guest</p>
            <p className="text-oak-cream text-sm font-medium mt-0.5">{booking.guestName}</p>
            <p className="text-oak-muted text-xs font-light">{booking.guestPhone}</p>
            {booking.guestEmail && (
              <p className="text-oak-muted text-xs font-light">{booking.guestEmail}</p>
            )}
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-start gap-3 p-4 border-b border-white/5">
          <BedDouble size={14} className="text-oak-gold mt-0.5 shrink-0" />
          <div className="w-full">
            <p className="text-oak-muted text-[0.65rem] font-light">Rooms</p>
            {booking.selectedRooms.map((r) => (
              <div key={r.roomId} className="flex justify-between items-center mt-1">
                <p className="text-oak-cream text-sm font-light">
                  {r.roomName} × {r.quantity}
                </p>
                <p className="text-oak-gold text-sm">
                  {formatCurrency(r.pricePerNight * r.quantity)}/night
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-start gap-3 p-4 border-b border-white/5">
          <Calendar size={14} className="text-oak-gold mt-0.5 shrink-0" />
          <div>
            <p className="text-oak-muted text-[0.65rem] font-light">Dates</p>
            <p className="text-oak-cream text-sm mt-0.5">
              {booking.checkIn ? formatDateShort(booking.checkIn) : "—"} →{" "}
              {booking.checkOut ? formatDateShort(booking.checkOut) : "—"}
            </p>
            <p className="text-oak-gold text-xs font-light mt-0.5">
              {summary.nights} night{summary.nights !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Guests count */}
        <div className="flex items-start gap-3 p-4 border-b border-white/5">
          <Users size={14} className="text-oak-gold mt-0.5 shrink-0" />
          <div>
            <p className="text-oak-muted text-[0.65rem] font-light">Guests</p>
            <p className="text-oak-cream text-sm mt-0.5">{guestCount}</p>
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="flex items-start gap-3 p-4 border-b border-white/5">
            <MessageSquare size={14} className="text-oak-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-oak-muted text-[0.65rem] font-light">Special Requests</p>
              <p className="text-oak-muted text-sm font-light mt-0.5">{booking.specialRequests}</p>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="p-4 bg-oak-dark-3">
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-oak-muted font-light">Rooms subtotal</span>
              <span className="text-oak-cream">{formatCurrency(summary.roomsSubtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-oak-muted font-light">GST (12%)</span>
              <span className="text-oak-cream">{formatCurrency(summary.taxAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-oak-muted font-light">Service charge (5%)</span>
              <span className="text-oak-cream">{formatCurrency(summary.serviceFee)}</span>
            </div>
            <div className="flex justify-between pt-2.5 border-t border-white/10">
              <span className="text-oak-cream font-medium">Estimated Total</span>
              <span className="font-playfair text-xl text-oak-gold">
                {formatCurrency(summary.grandTotal)}
              </span>
            </div>
          </div>
          <p className="text-oak-muted text-[0.62rem] font-light mt-3">
            * Final price confirmed by hotel on WhatsApp. Taxes included in estimate.
          </p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleWhatsApp}
        className="relative overflow-hidden w-full py-4 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-inter font-semibold text-sm tracking-wide flex items-center justify-center gap-3 rounded-sm transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Send Booking Request on WhatsApp
      </motion.button>

      <button
        onClick={resetBooking}
        className="text-center text-oak-muted text-xs font-light hover:text-oak-cream transition-colors duration-200 underline underline-offset-2"
      >
        Start a new booking
      </button>
    </div>
  );
}
