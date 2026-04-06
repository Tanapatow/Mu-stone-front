"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";
import { drawFortune } from "@/lib/actions/fortune.action";
import { Loader } from "lucide-react";
import LoadingOverlay from "@/components/ui/loading-overlay";

const cards = Array.from({ length: 78 }, (_, i) => ({ id: i + 1 }));

export default function PickTarotCard() {
  const router = useRouter();
  const [deck] = useState(() => cards);
  const [selected, setSelected] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (id: number) => {
    if (isPending) return;
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    if (selected.length >= 3) return;
    setSelected([...selected, id]);
  };

  const handlePredictBtn = () => {
    startTransition(async () => {
      const result = await drawFortune();
      if (result?.id) {
        router.push(`/fortune/predict?id=${result.id}`);
      }
    });
  };

  return (
    <>
      {isPending && <LoadingOverlay message="กำลังอ่านดวงชะตา..." />}

      <div className="flex items-center justify-between max-w-6xl mx-auto w-full px-6">
        <div className="relative w-125 h-125">
          {deck.map((card, index) => {
            const isSelected = selected.includes(card.id);
            const isDisabled = selected.length >= 3 && !isSelected;
            let x = 0,
              y = 0,
              rotation = 0;

            if (isSelected) {
              x = (selected.indexOf(card.id) - 1) * 120;
            } else {
              const angle = (index / deck.length) * 2 * Math.PI;
              x = 200 * Math.cos(angle);
              y = 200 * Math.sin(angle);
              rotation = angle + Math.PI / 2;
            }

            return (
              <div
                key={card.id}
                onClick={() => handleSelect(card.id)}
                className={`absolute w-20 h-30 rounded-lg cursor-pointer border transition-all duration-500 ease-out overflow-hidden
                  ${isSelected ? "scale-125 z-50 border-gold shadow-[0_0_20px_rgba(201,162,39,0.4)]" : "z-10 border-white/20"}
                  ${isDisabled || isPending ? "opacity-40 cursor-not-allowed" : "hover:-translate-y-1"}
                `}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}rad)`,
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

        <div className="card-glass w-100 flex flex-col gap-3 ml-auto">
          <p className="text-xs text-gold/60 font-sarabun tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-center w-fit mx-auto">
            ✦ คู่มือการเลือกไพ่ ✦
          </p>
          <h2 className="text-lg font-semibold text-gold font-sarabun text-center">
            ไกด์
          </h2>
          <p className="text-sm text-white/70 font-sarabun leading-relaxed">
            ขณะนี้คุณกำลังใช้ผังไพ่แบบ Celtic Cross จงเลือกไพ่ 3 ใบ
            เพื่อเริ่มต้นการหยั่งรู้สายใยแห่งจักรวาล
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg border transition-all duration-300 flex items-center justify-center text-xs font-sarabun ${
                  i < selected.length
                    ? "bg-gold/20 border-gold/60 text-gold"
                    : "bg-white/5 border-white/10 text-white/20"
                }`}
              >
                {i < selected.length ? "✦" : i + 1}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 font-sarabun text-center">
            {selected.length} / 3 ใบที่เลือก
          </p>
          <button
            disabled={selected.length < 3 || isPending}
            onClick={handlePredictBtn}
            className="w-full py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-2 shadow-[0_4px_20px_rgba(201,162,39,0.35)]"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังอ่านดวง...
              </span>
            ) : (
              "ทำนายผลเลย ✨"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
