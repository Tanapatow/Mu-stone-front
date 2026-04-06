"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/hero-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <p className="text-xs text-red-400/60 font-sarabun tracking-[0.3em] uppercase px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          ✦ เกิดข้อผิดพลาด ✦
        </p>
        <h1 className="font-cinzel-d text-4xl text-gold [text-shadow:0_0_40px_rgba(201,162,39,0.5)]">
          บางอย่างผิดพลาด
        </h1>
        <p className="text-sm text-white/50 font-sarabun max-w-sm leading-relaxed">
          เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
        </p>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(201,162,39,0.35)]"
          >
            ลองใหม่
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl font-sarabun text-sm text-white/50 border border-white/10 hover:text-white/70 hover:border-white/20 transition-all duration-200"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
