import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotelskypalace.com"),
  title: {
    default: "Hotel Sky Palace | Luxury Hotel in Hyderabad",
    template: "%s | Hotel Sky Palace",
  },
  description:
    "Hotel Sky Palace — an oasis of refined luxury in Shamshabad, Hyderabad. Indulge in spacious rooms (160–240 m²), exquisite multi-cuisine dining, and world-class hospitality. Book direct for the best rates. Call +91 90143 33452.",
  keywords: [
    "hotel near hyderabad airport",
    "luxury hotel shamshabad",
    "airport hotel hyderabad",
    "hotel in shamshabad hyderabad",
    "hotels near RGIA hyderabad",
    "hotel sky palace hyderabad",
    "hotel sky palace",
    "shamshabad hotel telangana",
    "business hotel hyderabad airport",
    "hotel near rajiv gandhi international airport",
    "luxury stay near hyderabad airport",
  ],
  openGraph: {
    title: "Hotel Sky Palace | Luxury Hotel in Hyderabad",
    description:
      "Discover the art of refined luxury at Hotel Sky Palace, Shamshabad, Hyderabad. Queen, Deluxe & Suite rooms from ₹3,999/night. Book direct for the best rate. Call +91 90143 33452.",
    type: "website",
    locale: "en_IN",
    siteName: "Hotel Sky Palace",
    images: [
      {
        url: "/sky/images/hotel/hotel_31.jpeg",
        width: 1200,
        height: 630,
        alt: "Hotel Sky Palace — Luxury Airport Hotel, Shamshabad Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Sky Palace | Luxury Airport Hotel Hyderabad",
    description:
      "Premium airport hotel in Shamshabad, Hyderabad. Elegant rooms from ₹3,999/night. Book direct — best rate guaranteed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: "Hotel Sky Palace" }],
  category: "hospitality",
  alternates: {
    canonical: "https://www.hotelskypalace.com",
  },
};

// JSON-LD structured data for local business + hotel
const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel Sky Palace",
  description:
    "Hotel Sky Palace, Shamshabad, Hyderabad — a luxury haven offering elegantly appointed rooms, fine multi-cuisine dining, and heartfelt hospitality. Your comfort is our highest honour.",
  url: "https://www.hotelskypalace.com",
  telephone: "+919014333452",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "141 & 142, Plot No 140, Madhura Nagar",
    addressLocality: "Shamshabad",
    addressRegion: "Telangana",
    postalCode: "501218",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.2312,
    longitude: 78.4209,
  },
  starRating: {
    "@type": "Rating",
    ratingValue: "4.9",
    bestRating: "5",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi",        value: true },
    { "@type": "LocationFeatureSpecification", name: "Airport Shuttle",  value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking",     value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant",       value: true },
    { "@type": "LocationFeatureSpecification", name: "24-hour Front Desk", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room Service",     value: true },
  ],
  containsPlace: [
    {
      "@type": "HotelRoom",
      name: "Queen Room",
      description: "160 m² city view room with 1 full bed",
      occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
    },
    {
      "@type": "HotelRoom",
      name: "Deluxe Room",
      description: "210 m² city view room with 1 king bed",
      occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
    },
    {
      "@type": "HotelRoom",
      name: "Superior Suite",
      description: "240 m² signature city view suite",
      occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
    },
  ],
  sameAs: [
    "https://wa.me/919014333452",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#001820" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BookingModal />
      </body>
    </html>
  );
}
