import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="relative flex items-center justify-center h-screen text-white">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        sizes="100vw"
        className="object-cover -z-10"
        priority
      />

      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="flex flex-col items-center gap-6 text-center">
        {/* 🔮 ลูกแก้ว */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-[linear-gradient(to_bottom_right,#d8b4fe,#a855f7,#581c87)] blur-sm opacity-70 animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[linear-gradient(to_bottom_right,#ffffff,#c084fc,#6b21a8)] shadow-[0_0_40px_#a855f7] animate-bounce" />
          </div>
        </div>

        {/* ✨ ข้อความ */}
        <div className="text-lg leading-relaxed font-sarabun">
          <p>
            โปรดรอสักครู่
            <span className="inline-block animate-pulse">...</span>
          </p>
          <p className="text-white/70">
            ขณะนี้ดวงชะตาของท่านกำลังถูกกำหนดโดยเรา
          </p>
        </div>
      </div>
    </div>
  );
}
