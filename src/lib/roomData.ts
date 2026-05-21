export interface RoomAmenity {
  icon: string;
  label: string;
}

export interface RoomType {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bedType: string;
  view: string;
  pricePerNight: number;
  maxOccupancy: number;
  size: string;
  image: string;
  gallery: string[];
  amenities: RoomAmenity[];
  badge?: string;
}

export const ROOM_TYPES: RoomType[] = [
  {
    id: "queen-room",
    name: "Queen Room",
    tagline: "Elegant Comfort",
    bedType: "1 Full Bed",
    view: "City View",
    description:
      "A generously proportioned 160 m² retreat featuring a plush full bed, marble floors, and a serene city-view workspace. Designed for the discerning traveler who expects refined comfort at every turn.",
    pricePerNight: 1289,
    maxOccupancy: 2,
    size: "160 m²",
    image: "/sky/images/hotel/hotel_31.jpeg",
    gallery: [
      "/sky/images/hotel/hotel_31.jpeg",
      "/sky/images/hotel/hotel_12.jpeg",
      "/sky/images/hotel/hotel_13.jpeg",
      "/sky/images/hotel/hotel_14.jpeg",
      "/sky/images/hotel/hotel_15.jpeg",
    ],
    amenities: [
      { icon: "ac", label: "Air Conditioning" },
      { icon: "tv", label: "Flat-Screen TV" },
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "coffee", label: "Tea / Coffee Maker" },
      { icon: "bath", label: "Private Bathroom" },
      { icon: "lounge", label: "Sitting Area" },
      { icon: "safe", label: "Wake-up Service" },
      { icon: "dining", label: "Dining Area" },
    ],
    badge: "Most Popular",
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    tagline: "Elevated Luxury",
    bedType: "1 King Bed",
    view: "City View",
    description:
      "An expansive 210 m² sanctuary with a commanding king bed, tile and marble floors, and sweeping city views. Every detail — from the electric kettle to the sofa — is curated for the modern luxury traveler.",
    pricePerNight: 1670,
    maxOccupancy: 3,
    size: "210 m²",
    image: "/sky/images/hotel/hotel_16.jpeg",
    gallery: [
      "/sky/images/hotel/hotel_16.jpeg",
      "/sky/images/hotel/hotel_17.jpeg",
      "/sky/images/hotel/hotel_18.jpeg",
      "/sky/images/hotel/hotel_19.jpeg",
      "/sky/images/hotel/hotel_20.jpeg",
    ],
    amenities: [
      { icon: "ac", label: "Air Conditioning" },
      { icon: "tv", label: "Flat-Screen TV" },
      { icon: "wifi", label: "Ultra-Fast WiFi" },
      { icon: "coffee", label: "Electric Kettle" },
      { icon: "bath", label: "Shower + Toiletries" },
      { icon: "lounge", label: "Sofa + Sitting Area" },
      { icon: "minibar", label: "Satellite Channels" },
      { icon: "dining", label: "Dining Table" },
    ],
    badge: "Best Value",
  },
  {
    id: "superior-suite",
    name: "Superior Suite",
    tagline: "The Pinnacle of Luxury",
    bedType: "1 Queen Bed",
    view: "City View",
    description:
      "Our crown jewel — a palatial 240 m² suite offering city views, a private dining area, sofa lounge, and an indulgent marble bathroom. Elevator access, impeccable linens, and unrivaled airport-side opulence.",
    pricePerNight: 1876,
    maxOccupancy: 4,
    size: "240 m²",
    image: "/sky/images/hotel/hotel_21.jpeg",
    gallery: [
      "/sky/images/hotel/hotel_21.jpeg",
      "/sky/images/hotel/hotel_22.jpeg",
      "/sky/images/hotel/hotel_23.jpeg",
      "/sky/images/hotel/hotel_24.jpeg",
      "/sky/images/hotel/hotel_25.jpeg",
    ],
    amenities: [
      { icon: "ac", label: "Air Conditioning" },
      { icon: "tv", label: "Flat-Screen TV" },
      { icon: "wifi", label: "Dedicated WiFi" },
      { icon: "coffee", label: "Tea / Coffee + Kettle" },
      { icon: "bath", label: "Spa Bathroom" },
      { icon: "lounge", label: "Private Lounge" },
      { icon: "dining", label: "Private Dining Area" },
      { icon: "concierge", label: "Elevator Access" },
    ],
    badge: "Signature Stay",
  },
];

export const TAX_RATE = 0.12; // 12% GST
export const SERVICE_FEE = 0.05; // 5% service charge

export function getRoomById(id: string): RoomType | undefined {
  return ROOM_TYPES.find((r) => r.id === id);
}
