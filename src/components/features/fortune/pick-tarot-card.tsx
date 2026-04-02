"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const simLoading = (second: number = 3) =>
//   new Promise((resolve) => setTimeout(() => resolve(null), second * 1000));

const cards = Array.from({ length: 78 }, (_, i) => ({
  id: i + 1,
  image: "/tarot-cards.png",
}));

export default function PickTarotCard() {
  const router = useRouter();

  // ✅ สุ่ม “ครั้งเดียวตอน mount”
  const [deck] = useState(() => cards);

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

  const handlePredictBtn = async () => {
    // await simLoading(5);
    router.push(`/fortune/predict`);
  };

  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
      <div className="relative w-125 h-125">
        {deck.map((card, index) => {
          const isSelected = selected.includes(card.id);
          const isDisabled = selected.length >= 3 && !isSelected;

          let x = 0;
          let y = 0;
          let rotation = 0;

          if (isSelected) {
            // 👉 การ์ดที่ถูกเลือก → เรียงตรงกลาง
            const selectedIndex = selected.indexOf(card.id);
            const spread = 120;

            x = (selectedIndex - 1) * spread;
            y = 0;
            rotation = 0; // ไม่หมุน
          } else {
            // 👉 การ์ดยังไม่เลือก → อยู่เป็นวง
            const radius = 200;
            const angle = (index / deck.length) * 2 * Math.PI;

            x = radius * Math.cos(angle);
            y = radius * Math.sin(angle);
            rotation = angle + Math.PI / 2;
          }

          return (
            <div
              key={card.id}
              onClick={() => handleSelect(card.id)}
              className={`
            absolute w-20 h-30 rounded-lg cursor-pointer
            border border-gray-600
            transition-all duration-500 ease-out overflow-hidden

            ${isSelected ? "scale-125 z-50 border-purple-400 shadow-xl" : "z-10"}
            ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:-translate-y-1"}
          `}
              style={{
                left: "50%",
                top: "50%",
                transform: `
              translate(-50%, -50%)
              translate(${x}px, ${y}px)
              rotate(${rotation}rad)
            `,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/tarot-card.png"
                  alt="card"
                  fill
                  sizes="80px"
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
        <p className="text-lg text-gray-300 opacity-80 font-saraban">
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
