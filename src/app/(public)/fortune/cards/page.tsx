'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const PickTarotCard = dynamic(
  () => import('@/components/features/fortune/pick-tarot-card'),
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
        <h1
          className="
          font-['Cinzel_Decorative'] font-bold leading-[1.1]
          text-[clamp(2.2rem,4.5vw,3.6rem)]
          text-(--gold) mb-[1.4rem]
          opacity-0 animate-fade-slide-in
        "
          style={{
            textShadow:
              '0 0 40px rgba(201,162,39,0.5), 0 0 80px rgba(201,162,39,0.2)',
            animationDelay: '0.4s',
          }}
        >
          The Celestial Spread
        </h1>
        <h2 className="text-gray-300 opacity-80 font-semibold mt-4">
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
