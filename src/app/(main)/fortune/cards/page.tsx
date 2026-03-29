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
      <div className="my-16 p-8 text-center bg-black/40">
        <h1 className="text-6xl text-white z-50">The Celestial Spread</h1>
        <h2 className="text-white mt-4">
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
