import Link from "next/link";
import { CheckCircle } from "lucide-react";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <div
        className="flex flex-col items-center gap-5 p-10 rounded-2xl max-w-md w-full text-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.9) 0%, rgba(11,8,42,0.95) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <CheckCircle size={56} className="text-[#c9a227]" />

        <div>
          <h1 className="font-['Cinzel_Decorative'] text-xl text-[#f5f0e8] mb-2">
            ชำระเงินสำเร็จ
          </h1>
          <p className="text-sm text-white/50 font-['Sarabun']">
            ขอบคุณสำหรับคำสั่งซื้อของคุณ เราจะดำเนินการจัดส่งโดยเร็วที่สุด
          </p>
        </div>

        {session_id && (
          <p className="text-xs text-white/25 font-['Sarabun'] break-all">
            Session: {session_id}
          </p>
        )}

        <div className="flex flex-col gap-2 w-full">
          <Link
            href="/order"
            className="w-full py-3 rounded-xl text-sm font-['Sarabun'] font-semibold text-navy text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
              boxShadow: "0 4px 20px rgba(201,162,39,0.35)",
            }}
          >
            ดูคำสั่งซื้อของฉัน
          </Link>
          <Link
            href="/shop"
            className="w-full py-3 rounded-xl text-sm font-['Sarabun'] text-white/50 text-center border border-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-200"
          >
            เลือกซื้อสินค้าต่อ
          </Link>
        </div>
      </div>
    </main>
  );
}
