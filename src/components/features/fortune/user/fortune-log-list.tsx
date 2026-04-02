"use client";

import { useState } from "react";
import Image from "next/image";
import type { FortuneLog } from "@/lib/api/fortune/fortune.type";
import FortuneLogDetail from "./fortune-log-detail";
import { Download, Share2, Eye } from "lucide-react";

type FortuneLogListProps = {
  logs: FortuneLog[];
};

export default function FortuneLogList({ logs }: FortuneLogListProps) {
  const [selected, setSelected] = useState<FortuneLog | null>(null);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-white/30 font-['Sarabun'] text-lg">
          ยังไม่มีประวัติการดูดวง
        </p>
      </div>
    );
  }

  return (
    <>
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
              className="flex gap-6 p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(160deg, rgba(26,20,74,0.5) 0%, rgba(11,8,42,0.6) 100%)",
                border: "1px solid rgba(201,162,39,0.15)",
              }}
            >
              {/* Cards stack */}
              <div className="relative w-28 h-40 shrink-0">
                {log.cards.slice(0, 3).map((card, i) => (
                  <div
                    key={card.id}
                    className="absolute rounded-xl overflow-hidden"
                    style={{
                      width: "70px",
                      height: "110px",
                      left: `${i * 18}px`,
                      top: `${i * 4}px`,
                      zIndex: i,
                      transform: `rotate(${(i - 1) * 6}deg)`,
                      border: "2px solid rgba(201,162,39,0.3)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
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
                      <div
                        className="w-full h-full flex items-center justify-center text-[8px] text-white/40 font-['Sarabun'] text-center p-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(74,26,110,0.9), rgba(11,8,42,0.95))",
                        }}
                      >
                        {card.nameThai}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                {/* Card tags */}
                <div>
                  <div className=" flex items-start justify-between gap-2">
                    <h1 className="text-lg text-white font-['Sarabun'] mb-1.5">
                      ไพ่ที่เปิดได้
                    </h1>
                    <p className="text-xs text-white/40 font-['Sarabun'] shrink-0">
                      {date}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {log.cards.map((card) => (
                      <span
                        key={card.id}
                        className="text-xs px-2.5 py-1 rounded-full font-['Sarabun'] text-white/60"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {card.nameThai}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prediction preview */}
                <div>
                  <p className="text-xs text-white/30 font-['Sarabun'] mb-1">
                    ผลลัพธ์
                  </p>
                  <p className="text-lg text-white/60 font-['Sarabun'] line-clamp-2 leading-relaxed">
                    {log.predictionText.split("\n\n")[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => setSelected(log)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                      color: "#0b0e2a",
                    }}
                  >
                    <Eye size={12} />
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <FortuneLogDetail log={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
