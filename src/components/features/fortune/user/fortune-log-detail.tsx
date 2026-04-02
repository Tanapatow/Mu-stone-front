"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FortuneLog } from "@/lib/api/fortune/fortune.type";

type FortuneLogDetailProps = {
  log: FortuneLog;
  onClose: () => void;
};

export default function FortuneLogDetail({
  log,
  onClose,
}: FortuneLogDetailProps) {
  const date = new Date(log.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.98) 0%, rgba(11,8,42,0.99) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0"
          style={{
            background: "rgba(11,8,42,0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p className="font-['Sarabun'] text-lg text-[#f5f0e8]">
              {log.topic}
            </p>
            <p className="text-xs text-white/30 font-['Sarabun'] mt-0.5">
              {date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/8 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Cards */}
          <div>
            <p className="text-xs text-white/40 font-['Sarabun'] mb-3">
              ไพ่ที่จับได้
            </p>
            <div className="flex gap-3">
              {log.cards.map((card, i) => (
                <div
                  key={card.id}
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <div
                    className="relative w-full aspect-[2/3] rounded-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(74,26,110,0.8), rgba(11,8,42,0.9))",
                      border: "1px solid rgba(201,162,39,0.3)",
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
                      <div className="w-full h-full flex items-center justify-center text-xs text-white/40 font-['Sarabun'] text-center p-2">
                        {card.nameThai}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-white/60 font-['Sarabun'] text-center">
                    {card.nameThai}
                  </p>
                  <p className="text-[9px] text-white/30 font-['Sarabun'] text-center">
                    {card.baseMeaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs text-white/40 font-['Sarabun'] mb-2">
              คำทำนาย
            </p>
            {log.predictionText.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-lg text-white/70 font-['Sarabun'] leading-relaxed mb-3 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Recommended products */}
          {log.recommendedProducts.length > 0 && (
            <div>
              <p className="text-xs text-white/40 font-['Sarabun'] mb-3">
                หินมงคลที่แนะนำ
              </p>
              <div className="flex flex-col gap-2">
                {log.recommendedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:border-[rgba(201,162,39,0.3)]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-['Sarabun'] text-[#f5f0e8] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#c9a227] font-['Sarabun']">
                        ฿{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
