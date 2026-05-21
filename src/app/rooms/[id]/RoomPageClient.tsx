"use client";

import { useBookingStore } from "@/store/bookingStore";

export function RoomPageClient({ roomId }: { roomId: string }) {
  const { openBooking, addRoom } = useBookingStore();

  return (
    <button
      onClick={() => {
        addRoom(roomId);
        openBooking();
      }}
      className="btn-primary w-full border-[#A1A1AA] hover:border-white transition-colors py-4 text-sm uppercase tracking-widest bg-transparent hover:bg-white hover:text-[#001820]"
    >
      Book Now
    </button>
  );
}
