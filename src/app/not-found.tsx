import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="th">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/hero-bg.png')] bg-cover bg-center bg-navy">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
            <p className="text-xs text-gold/60 font-sarabun tracking-[0.3em] uppercase px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              ✦ 404 ✦
            </p>
            <h1 className="font-cinzel-d text-5xl text-gold [text-shadow:0_0_40px_rgba(201,162,39,0.5)]">
              ไม่พบหน้านี้
            </h1>
            <p className="text-sm text-white/50 font-sarabun max-w-sm leading-relaxed">
              หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบ หรือไม่มีอยู่ในจักรวาลนี้
            </p>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(201,162,39,0.35)]"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
