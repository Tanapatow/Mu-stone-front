export default function LoadingPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen text-white bg-[url('/hero-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
        {/* Crystal ball */}
        <div className="relative w-36 h-36">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-mustone-purple/40 blur-xl animate-pulse" />

          {/* Ball */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold/20 via-mustone-purple/60 to-navy shadow-[0_0_60px_rgba(201,162,39,0.3),inset_0_0_40px_rgba(74,26,110,0.5)] animate-[nebulaPulse_3s_ease-in-out_infinite]">
            {/* Inner light */}
            <div className="absolute top-4 left-5 w-6 h-6 rounded-full bg-white/20 blur-md" />
            <div className="absolute top-6 left-7 w-3 h-3 rounded-full bg-white/30 blur-sm" />
          </div>

          {/* Orbiting dot */}
          <div className="absolute inset-0 rounded-full animate-[spiralSpin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.8)]" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-2">
          {["✦", "✧", "✦"].map((star, i) => (
            <span
              key={i}
              className="text-gold animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {star}
            </span>
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <p className="font-cinzel-d text-xl text-gold [text-shadow:0_0_20px_rgba(201,162,39,0.5)]">
            กำลังอ่านดวงชะตา
          </p>
          <p className="text-sm text-white/60 font-sarabun leading-relaxed max-w-xs">
            ดวงดาวกำลังเปิดเผยเส้นทางชีวิตของคุณ
            <br />
            โปรดรอสักครู่...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
