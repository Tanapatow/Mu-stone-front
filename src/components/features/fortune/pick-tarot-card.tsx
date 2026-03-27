'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const cards = Array.from({ length: 78 }, (_, i) => ({
  id: i + 1,
  image: '/tarot-cards.png',
}));

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// const simLoading = () => {};

export default function PickTarotCard() {
  const router = useRouter();
  // ✅ สุ่ม “ครั้งเดียวตอน mount”
  const [deck] = useState(() => shuffle(cards));

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    // ✅ ถ้ากดซ้ำ → ยกเลิก
    if (selected.includes(id)) {
      const newSelected = selected.filter((item) => item !== id);
      setSelected(newSelected);
      return;
    }

    // ❌ ถ้าเลือกครบ 3 แล้ว → ห้ามเพิ่ม
    if (selected.length >= 3) return;

    // ✅ เพิ่มเข้าไป
    const newSelected = [...selected, id];
    setSelected(newSelected);
  };

  const handlePredictBtn = () => {
    setTimeout(() => {
      router.push(`/fortune/predict`);
    }, 800);
  };
  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
      <div className="relative w-125 h-125">
        {deck.map((card, index) => {
          const isSelected = selected.includes(card.id);
          const isDisabled = selected.length >= 3 && !isSelected;

          const radius = 200; // ขนาดวง
          const angle = (index / deck.length) * 2 * Math.PI;
          const offset = isSelected ? 30 : 0;

          let x = (radius + offset) * Math.cos(angle);
          let y = (radius + offset) * Math.sin(angle);

          if (isSelected) {
            const selectedIndex = selected.indexOf(card.id);
            const spread = 60;

            x = (selectedIndex - 1) * spread;
            y = 0;
          }

          return (
            <div
              key={card.id}
              onClick={() => handleSelect(card.id)}
              className={`
          absolute w-20 h-30 rounded-lg cursor-pointer
          border border-gray-600
          transition-all duration-300 overflow-hidden

          ${isSelected ? '-translate-y-6 scale-110 border-purple-400 shadow-xl' : ''}
          ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-1'}
        `}
              style={{
                left: '50%',
                top: '50%',
                transform: `
                  translate(-50%, -50%)
                  translate(${x}px, ${y}px)
                  rotate(${angle + Math.PI / 2}rad)
                `,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/tarot-card.png"
                  alt="card"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-black/60 backdrop-blur-md p-6 rounded-xl w-100 flex flex-col gap-2 ml-auto">
        <h2 className="text-xl font-semibold mb-2 text-white font-saraban">
          ไกด์
        </h2>
        <p className="text-sm text-gray-300 opacity-80 font-saraban">
          ขณะนี้คุณกำลังใช้ผังไพ่แบบ Celtic Crossจงเลือกไพ่ 3 ใบ
          เพื่อเริ่มต้นการหยั่งรู้สายใยแห่งจักรวาล
        </p>

        <div className="mt-4 text-white font-roboto">
          {selected.length} / 3 Selected
        </div>

        <button
          className="
          relative
          px-6 py-3
          rounded-2xl
          font-semibold
          text-yellow-300
          bg-linear-to-r from-purple-950 to-indigo-950
          shadow-lg
          hover:scale-105
          hover:shadow-purple-500/30
          hover:cursor-pointer
          transition-all duration-300
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:scale-100
          disabled:hover:shadow-none
          "
          disabled={selected.length < 3}
          onClick={handlePredictBtn}
        >
          <span className="flex items-center justify-center gap-2 font-saraban">
            ทำนายผลเลย ✨
          </span>
        </button>
      </div>
    </div>
  );
}
