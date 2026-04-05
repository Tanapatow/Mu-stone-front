"use client";

import PredictedResult from "./predicted-result";
import ProductRecommend from "./product-recommend";
import type { FortunePredictResponse } from "@/lib/api/fortune/fortune.type";

type PredictPageClientProps = {
  data: FortunePredictResponse;
  fortuneId: string;
};

export default function PredictPageClient({
  data,
  fortuneId,
}: PredictPageClientProps) {
  const { cards, recommendedProducts, predictionText } = data;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[url('/shop_bg.png')] bg-cover bg-center bg-no-repeat" />
      <main className="min-h-screen px-6 py-10 pt-24 max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-xs text-gold/60 font-sarabun tracking-[0.3em] uppercase px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            ✦ ไพ่พยากรณ์ ✦
          </p>
          <h1 className="font-cinzel-d text-4xl text-gold leading-snug [text-shadow:0_0_40px_rgba(201,162,39,0.5),0_0_80px_rgba(201,162,39,0.2)]">
            คำทำนายจากดวงดาว
          </h1>
          <p className="text-sm text-white/50 font-sarabun max-w-md leading-relaxed">
            บันทึกการเดินทางแห่งจิตวิญญาณของคุณ ผ่านพลังงานแห่งไพ่ทาโรต์
          </p>
          <div className="w-24 h-px mt-2 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <div className="card-glass flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-4 md:w-56 shrink-0 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-semibold text-gold font-sarabun text-center tracking-wide">
              ✦ ไพ่ที่จับได้ ✦
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            {cards.map((item) => (
              <div
                key={item.id}
                className="transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <PredictedResult {...item} />
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-cream font-sarabun">
                คำทำนายของคุณ
              </p>
              <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-gold to-transparent" />
            </div>
            {predictionText.split("\n\n").map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-0.5 shrink-0 rounded-full bg-gradient-to-b from-gold to-transparent mt-1" />
                <p className="text-sm text-white/75 font-sarabun leading-8 tracking-wide">
                  {p}
                </p>
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gold/15">
              <span className="text-lg">🔮</span>
              <p className="text-xs text-white/30 font-sarabun">
                คำทำนายนี้สร้างขึ้นจากพลังงานของไพ่ทั้ง {cards.length}{" "}
                ใบที่คุณเลือก
              </p>
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="relative p-5 rounded-2xl overflow-hidden border border-gold/20 bg-black/40 backdrop-blur-xl text-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.4),transparent_70%)]" />
              <h2 className="relative font-sarabun text-2xl text-gold mb-1 font-semibold [text-shadow:0_0_28px_rgba(201,162,39,0.45)]">
                ✨ ของมูเสริมดวงที่คัดมาแล้ว
              </h2>
              <p className="relative text-sm text-white/70 font-sarabun">
                เครื่องรางยอดนิยม • เสริมโชคลาภ การเงิน และความรัก
              </p>
            </div>
            <div className="card-glass grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedProducts.map((el) => (
                <ProductRecommend
                  key={el.id}
                  productId={el.id}
                  productName={el.name}
                  productImage={el.imageUrl}
                  price={el.price}
                  fortuneId={fortuneId}
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative card-glass text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(201,162,39,0.2),transparent_70%)]" />
          <p className="relative text-white/60 font-sarabun text-sm italic leading-relaxed">
            &quot;จักรวาลอยู่ภายในตัวเรา เราถูกสร้างขึ้นจากผงธุลีแห่งดวงดาว
            และเราคือหนทางที่จักรวาลใช้เพื่อรับรู้ตัวตนของมันเอง&quot;
          </p>
        </div>
      </main>
    </div>
  );
}
