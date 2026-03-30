import Image from 'next/image';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black/60 text-white">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        sizes="80px"
        className="object-cover -z-10"
        priority
      />
      <div className="flex flex-col items-center gap-6 text-center">
        {/* 🔮 ลูกแก้ว */}
        <div className="relative">
          <div className="w-26 h-26 rounded-full bg-linear-to-br from-purple-300 via-purple-500 to-purple-900 blur-sm opacity-70 animate-pulse"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-white via-purple-400 to-purple-800 shadow-[0_0_40px_#a855f7] animate-bounce"></div>
          </div>
        </div>

        {/* ✨ ข้อความ */}
        <div className="text-lg leading-relaxed">
          <p>
            โปรดรอสักครู่
            <span className="inline-block animate-pulse">...</span>
          </p>
          <p>ขณะนี้ดวงชะตาของท่านกำลังถูกกำหนดโดยเรา</p>
        </div>
      </div>
    </div>
  );
}
