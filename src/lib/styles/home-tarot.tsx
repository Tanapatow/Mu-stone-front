"use client";

import Image from "next/image";

const CARD_SRC = "/tarot-card.png";

export default function TarotCards() {
  return (
    <div
      className="absolute right-[12vw] top-1/2 w-140 h-140 z-10 animate-cards-float
                 max-md:right-1/2 max-md:translate-x-1/2 max-md:top-auto max-md:bottom-4"
      aria-hidden
    >
      {/* Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "-60px",
          background:
            "radial-gradient(ellipse at center, rgba(201,162,39,0.12) 0%, rgba(74,26,110,0.25) 40%, transparent 70%)",
        }}
      />

      {/* Card back — rotated right, dimmed */}
      <div
        className="absolute right-0 top-10 z-1 w-[320px] h-120"
        style={{
          transform: "rotate(10deg)",
          filter: "brightness(0.55) drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
        }}
      >
        <Image
          loading="eager"
          src={CARD_SRC}
          alt=""
          fill
          className="object-contain"
          sizes="320px"
        />
      </div>

      {/* Card front — rotated left, full brightness */}
      <div
        className="absolute left-0 top-1 z-2 w-88 h-132"
        style={{
          transform: "rotate(-6deg)",
          filter:
            "drop-shadow(0 24px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(201,162,39,0.2))",
        }}
      >
        <Image
          loading="eager"
          src={CARD_SRC}
          alt="Tarot card"
          fill
          sizes="352px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
