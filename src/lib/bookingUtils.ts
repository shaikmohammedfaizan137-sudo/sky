import { formatCurrency, formatDateShort, calculateNights } from "./utils";
import { TAX_RATE, SERVICE_FEE } from "./roomData";

export interface SelectedRoom {
  roomId: string;
  roomName: string;
  pricePerNight: number;
  quantity: number;
}

export interface BookingDetails {
  selectedRooms: SelectedRoom[];
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
}

export interface PriceSummary {
  nights: number;
  roomsSubtotal: number;
  taxAmount: number;
  serviceFee: number;
  grandTotal: number;
}

export function calculatePriceSummary(
  booking: BookingDetails
): PriceSummary {
  const nights =
    booking.checkIn && booking.checkOut
      ? calculateNights(booking.checkIn, booking.checkOut)
      : 0;

  const roomsSubtotal = booking.selectedRooms.reduce(
    (sum, room) => sum + room.pricePerNight * room.quantity * Math.max(nights, 1),
    0
  );

  const taxAmount = Math.round(roomsSubtotal * TAX_RATE);
  const serviceFee = Math.round(roomsSubtotal * SERVICE_FEE);
  const grandTotal = roomsSubtotal + taxAmount + serviceFee;

  return { nights, roomsSubtotal, taxAmount, serviceFee, grandTotal };
}

export function generateWhatsAppMessage(booking: BookingDetails): string {
  const { nights, grandTotal } = calculatePriceSummary(booking);
  const roomsList = booking.selectedRooms
    .map((r) => `  • ${r.roomName} × ${r.quantity} (${formatCurrency(r.pricePerNight)}/night each)`)
    .join("\n");

  const guestCount =
    booking.children > 0
      ? `${booking.adults} Adults, ${booking.children} Children`
      : `${booking.adults} Adults`;

  const message = `Hello Hotel Sky Palace,

I would like to request a booking.

👤 *Guest Name:*
${booking.guestName}

📞 *Phone:*
${booking.guestPhone}

📧 *Email:*
${booking.guestEmail || "Not provided"}

🛏️ *Rooms Selected:*
${roomsList}

📅 *Check-In:*
${booking.checkIn ? formatDateShort(booking.checkIn) : "TBD"}

📅 *Check-Out:*
${booking.checkOut ? formatDateShort(booking.checkOut) : "TBD"}

👥 *Guests:*
${guestCount}

🌙 *Number of Nights:*
${nights} Night${nights !== 1 ? "s" : ""}

💰 *Estimated Total:*
${formatCurrency(grandTotal)} (incl. taxes & service fee)

💬 *Special Requests:*
${booking.specialRequests || "None"}

Please confirm availability.

Thank you! 🙏`;

  return message;
}

export function openWhatsApp(booking: BookingDetails): void {
  const message = generateWhatsAppMessage(booking);
  const encoded = encodeURIComponent(message);
  const phone = "919014333452";
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, "_blank");
}
