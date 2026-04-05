export default function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-100  flex flex-col items-center justify-center bg-navy/80 backdrop-blur-md">
      <div className="relative w-28 h-28 mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-mustone-purple/40 blur-xl animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold/20 via-mustone-purple/60 to-navy shadow-[0_0_60px_rgba(201,162,39,0.3)] animate-[nebulaPulse_3s_ease-in-out_infinite]">
          <div className="absolute top-3 left-4 w-5 h-5 rounded-full bg-white/20 blur-md" />
        </div>
        <div className="absolute inset-0 rounded-full animate-[spiralSpin_3s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.8)]" />
        </div>
      </div>

      <p className="font-cinzel-d text-lg text-gold [text-shadow:0_0_20px_rgba(201,162,39,0.5)] mb-2">
        {message ?? "กำลังโหลด..."}
      </p>
      <p className="text-sm text-white/60 font-sarabun">
        ดวงดาวกำลังเปิดเผยเส้นทางชีวิตของคุณ...
      </p>

      <div className="flex items-center gap-2 mt-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
