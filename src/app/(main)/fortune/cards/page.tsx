import PickTarotCard from '@/components/features/fortune/pick-tarot-card';
import HeroBackground from '@/components/home/HomeBackground';

export default function CardPage() {
  return (
    <>
      <HeroBackground />
      <div>
        <div className="mt-30">
          <h1>The Celestial Spread</h1>
          <h2>
            จดจ่อพลังของคุณไปที่คำถามของคุณ จากกระจกสะท้อนวิญญาณทั้ง 78 ใบ
            จงเลือกไพ่ที่เรียกหาคุณ
          </h2>
        </div>
        <div className="flex flex-col">
          <PickTarotCard />
        </div>
      </div>
    </>
  );
}
