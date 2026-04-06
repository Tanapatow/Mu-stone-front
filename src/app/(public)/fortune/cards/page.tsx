"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const PickTarotCard = dynamic(
  () => import("@/components/features/fortune/pick-tarot-card"),
  { ssr: false },
);

export default function CardPage() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        className="object-cover -z-10"
        priority
      />

      <div className="mb-8 p-8 text-center bg-black/40">
        <h1 className="font-cinzel-d font-bold leading-[1.1] text-[clamp(2.2rem,4.5vw,3.6rem)] mb-[1.4rem] opacity-0 animate-fade-slide-in drop-shadow-[0_0_40px_rgba(201,162,39,0.5)] [animation-delay:0.4s] text-gold [text-shadow:0_0_28px_rgba(201,162,39,0.45)]">
          The Celestial Spread
        </h1>
        <h2 className="text-cream/80 font-semibold mt-4 font-sarabun">
          จดจ่อพลังของคุณไปที่คำถามของคุณ จากกระจกสะท้อนวิญญาณทั้ง 78 ใบ
          จงเลือกไพ่ที่เรียกหาคุณ
        </h2>
      </div>

      <div>
        <PickTarotCard />
      </div>
    </div>
  );
}
