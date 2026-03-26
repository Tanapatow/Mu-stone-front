"use client";

import TarotCards from "@/lib/styles/home-tarot";
import HomeBackground from "./HomeBackground";
import { HomeContent } from "./HomeContent";

export default function HeroSection() {
  return (
    <section
      className="
      relative min-h-screen flex items-center overflow-hidden pt-16
      max-md:[&_.hero-cards]:right-1/2
      max-md:[&_.hero-cards]:translate-x-1/2
    "
    >
      {/* Layer 0 — animated cosmic background */}
      <HomeBackground />
      {/* Layer 1 — text content */}
      <HomeContent />
      {/* Layer 2 — floating tarot cards */}
      <TarotCards />
    </section>
  );
}
