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

    // ถ้าครบ 3 ใบ → ไปหน้า result
    if (newSelected.length === 3) {
      setTimeout(() => {
        // router.push(`/tarot/result?cards=${newSelected.join(',')}`);
      }, 800);
    }
  };
  return (
    <div className="min-h-screen bg-purple-950 text-white p-6">
      <h1 className="text-center text-2xl mb-6">เลือกไพ่ 3 ใบ</h1>

      <div className="relative w-full max-w-5xl mx-auto h-105 mt-10">
        {[0, 1, 2, 3].map((row) => {
          const rowCards = deck.slice(row * 20, row * 20 + 20);

          return (
            <div
              key={row}
              className="absolute left-1/2 -translate-x-1/2 flex"
              style={{
                top: `${row * 70}px`, // ระยะห่างแต่ละแถว
                zIndex: row, // แถวล่างสุดอยู่บนสุด
              }}
            >
              {rowCards.map((card, index) => {
                const isSelected = selected.includes(card.id);
                const isDisabled = selected.length >= 3 && !isSelected;

                return (
                  <div
                    key={card.id}
                    onClick={() => handleSelect(card.id)}
                    className={`
                          w-24 h-36 rounded-lg cursor-pointer
                          border border-gray-600
                          transition-all duration-300 overflow-hidden
  
                          ${isSelected ? '-translate-y-6 scale-110 border-purple-400 shadow-xl' : ''}
                          ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-1'}
                      `}
                    style={{
                      marginLeft: index === 0 ? 0 : -40,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/tarot-card.png"
                        alt="tarot-card"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">เลือกแล้ว {selected.length} / 3 ใบ</div>
    </div>
  );
}
