"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PredictedResult from "./predicted-result";
import ProductRecommend from "./product-recommend";
import type { FortunePredictResponse } from "@/lib/api/fortune/fortune.type";
import { drawFortune } from "@/lib/actions/fortune.action";
import LoadingPage from "@/app/(public)/fortune/loading";

export default function PredictPageClient() {
  const [result, setResult] = useState<FortunePredictResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    drawFortune().then((res) => {
      if (res) setResult(res);
      setLoading(false);
    });
  }, []); // [] ทำให้ fetch แค่ครั้งเดียวตอน mount

  if (loading) {
    return <LoadingPage />;
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50 font-['Sarabun']">
          เกิดข้อผิดพลาด กรุณาลองใหม่
        </p>
      </div>
    );
  }

  const { cards, recommendedProducts, predictionText } = result;

  return (
    <div className="relative min-h-screen font-saraban">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        sizes="100vw"
        className="object-cover -z-10"
        priority
      />

      <div className="relative">
        <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex text-white overflow-hidden">
          {/* LEFT: CARDS */}
          <div className="flex flex-col w-80 p-6 gap-5 bg-gradient-to-b from-white/10 to-white/5 border-r border-white/10">
            {cards.map((item) => (
              <div
                key={item.id}
                className="transition-all duration-300 hover:scale-105 hover:bg-white/10 rounded-xl p-2"
              >
                <PredictedResult {...item} />
              </div>
            ))}
          </div>

          {/* RIGHT: TEXT */}
          <div className="flex items-center justify-center min-h-screen p-6 w-full">
            <div className="max-w-3xl w-full rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl backdrop-blur-lg bg-gradient-to-br from-[#22243D]/70 to-[#3C1642]/70 bg-blend-screen">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
                คำทำนายจากไพ่พยากรณ์
              </h2>
              <div className="space-y-4">
                {predictionText.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-lg leading-relaxed text-white/90 mb-4"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-lg tracking-wide">
              Recommend
            </span>
            <div className="w-10 h-10 border-r-2 border-b-2 border-white/70 rotate-45 rounded-sm shadow-lg" />
          </div>
        </div>
      </div>

      {/* PRODUCT RECOMMEND */}
      <div className="flex flex-col p-8 items-center gap-6 bg-black/60">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl text-white">ของมูที่เราแนะนำ</h1>
          <h3 className="text-lg text-white">
            คัดสรรเครื่องรางแท้ จากแหล่งที่เชื่อถือได้ทั่วโลก
          </h3>
        </div>
        <div className="flex w-full h-full justify-between gap-10 px-24">
          {recommendedProducts.map((el) => (
            <ProductRecommend
              key={el.id}
              productId={el.id}
              productName={el.name}
              productImage={el.imageUrl}
              price={el.price}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="max-w-2/4 text-center">
            <span className="text-4xl text-white font-aclonica">
              &quot;จักรวาลอยู่ภายในตัวเรา เราถูกสร้างขึ้นจาก ผงธุลีแห่งดวงดาว
              และเรา คือหนทางที่จักรวาลใช้เพื่อรับรู้ตัวตนของมันเอง&quot;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
