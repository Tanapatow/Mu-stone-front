"use client";

import Image from "next/image";

const CARD_SRC = "/tarot-card.png";

export default function TarotCards() {
  return (
    <div
      className="absolute right-[12vw] top-1/2 w-[560px] h-[560px] z-10 animate-cards-float
                 max-md:right-1/2 max-md:translate-x-1/2 max-md:top-auto max-md:bottom-4"
      aria-hidden
    >
      {/* Glow */}
      <div className="absolute inset-[-60px] rounded-full pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12)_0%,rgba(74,26,110,0.25)_40%,transparent_70%)]" />

      {/* Card back */}
      <div className="absolute right-0 top-10 z-[1] w-[320px] h-[480px] rotate-[10deg] brightness-[0.55] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <Image
          loading="eager"
          src={CARD_SRC}
          alt=""
          fill
          className="object-contain"
          sizes="320px"
        />
      </div>

      {/* Card front */}
      <div className="absolute left-0 top-1 z-[2] w-[352px] h-[528px] -rotate-[6deg] drop-shadow-[0_24px_48px_rgba(0,0,0,0.7)] drop-shadow-[0_0_20px_rgba(201,162,39,0.2)]">
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
