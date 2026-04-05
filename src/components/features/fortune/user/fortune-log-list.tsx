"use client";

import Image from "next/image";
import type { FortuneLog } from "@/lib/api/fortune/fortune.type";
import { Eye } from "lucide-react";

type FortuneLogListProps = {
  logs: FortuneLog[];
  onSelect: (log: FortuneLog) => void;
};

export default function FortuneLogList({
  logs,
  onSelect,
}: FortuneLogListProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-white/30 font-sarabun text-lg">
          ยังไม่มีประวัติการดูดวง
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {logs.map((log) => {
        const date = new Date(log.createdAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={log.id}
            className="flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#1a144a]/50 to-[#0b082a]/60 border border-gold/15"
          >
            <div className="relative w-28 h-40 shrink-0">
              {log.cards.slice(0, 3).map((card, i) => (
                <div
                  key={card.id}
                  className="absolute w-[70px] h-[110px] rounded-xl overflow-hidden border-2 border-gold/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                  style={{
                    left: `${i * 18}px`,
                    top: `${i * 4}px`,
                    transform: `rotate(${(i - 1) * 6}deg)`,
                    zIndex: i,
                  }}
                >
                  {card.imagePath ? (
                    <Image
                      src={card.imagePath}
                      alt={card.nameThai}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-white/40 font-sarabun text-center p-1 bg-gradient-to-br from-mustone-purple/90 to-navy">
                      {card.nameThai}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base text-white font-sarabun mb-1.5">
                  ไพ่ที่เปิดได้
                </h2>
                <p className="text-xs text-white/40 font-sarabun shrink-0">
                  {date}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {log.cards.map((card) => (
                  <span
                    key={card.id}
                    className="text-xs px-2.5 py-1 rounded-full font-sarabun text-white/60 bg-white/5 border border-white/10"
                  >
                    {card.nameThai}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/60 font-sarabun line-clamp-2 leading-relaxed">
                {log.predictionText.split("\n\n")[0]}
              </p>
              <button
                onClick={() => onSelect(log)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sarabun font-semibold w-fit bg-gradient-to-br from-gold to-gold-dark text-navy hover:-translate-y-0.5 transition-all duration-200"
              >
                <Eye size={12} />
                ดูรายละเอียด
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
