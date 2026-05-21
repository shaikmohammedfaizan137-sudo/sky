import { notFound } from "next/navigation";
import Image from "next/image";
import { ROOM_TYPES, getRoomById } from "@/lib/roomData";
import { formatCurrency } from "@/lib/utils";
import { RoomPageClient } from "./RoomPageClient";

export function generateStaticParams() {
  return ROOM_TYPES.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-[#001820] min-h-screen pt-24 pb-24">
      {/* Hero Header */}
      <div className="wrap mb-16">
        <div className="relative w-full h-[50vh] min-h-[400px] bg-[#002530] overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001820] via-[#001820]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="eyebrow text-white mb-4 border border-white/20 inline-block px-3 py-1 bg-black/50 backdrop-blur">
              {room.tagline}
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none mb-2">
              {room.name}
            </h1>
            {room.badge && (
              <span className="text-sm font-medium text-[#A1A1AA] uppercase tracking-widest">
                — {room.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column: Details */}
          <div className="flex-1 space-y-16">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl text-white font-light mb-6">About the Room</h2>
              <p className="text-lg text-[#A1A1AA] font-light leading-relaxed">
                {room.description}
              </p>
            </section>

            {/* Amenities Grid */}
            <section>
              <h2 className="text-2xl text-white font-light mb-6 border-b border-[#003D4C] pb-4">Room Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#A1A1AA]">
                    {/* Placeholder for actual icons, using a simple dot for now, or you can map lucide icons based on amenity.icon */}
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full shrink-0" />
                    <span className="text-sm font-light">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl text-white font-light mb-6 border-b border-[#003D4C] pb-4">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.gallery.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] bg-[#002530] overflow-hidden group">
                    <Image
                      src={img}
                      alt={`${room.name} Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="w-full lg:w-[400px] shrink-0 sticky top-32">
            <div className="bg-[#002530] border border-[#003D4C] p-8 shadow-subtle">
              <div className="mb-8 border-b border-[#003D4C] pb-6">
                <span className="text-3xl text-white font-light">{formatCurrency(room.pricePerNight)}</span>
                <span className="text-sm text-[#A1A1AA] uppercase tracking-wide ml-2">/ night</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between border-b border-[#003D4C] pb-2">
                  <span className="text-[#A1A1AA] text-sm">Room Size</span>
                  <span className="text-white text-sm">{room.size}</span>
                </li>
                <li className="flex justify-between border-b border-[#003D4C] pb-2">
                  <span className="text-[#A1A1AA] text-sm">Bed Type</span>
                  <span className="text-white text-sm">{room.bedType}</span>
                </li>
                <li className="flex justify-between border-b border-[#003D4C] pb-2">
                  <span className="text-[#A1A1AA] text-sm">Max Occupancy</span>
                  <span className="text-white text-sm">{room.maxOccupancy} Guests</span>
                </li>
                <li className="flex justify-between border-b border-[#003D4C] pb-2">
                  <span className="text-[#A1A1AA] text-sm">View</span>
                  <span className="text-white text-sm">{room.view}</span>
                </li>
              </ul>

              <RoomPageClient roomId={room.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
