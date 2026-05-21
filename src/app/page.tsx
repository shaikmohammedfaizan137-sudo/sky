"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { LocationSection } from "@/components/sections/LocationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <LocationSection />
    </>
  );
}
