"use client";

import Link from "next/link";

export function HomeContent() {
  return (
    <div className="relative z-10 px-[6vw] max-w-[50%] max-md:max-w-full max-md:pb-90">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.25 rounded-full border border-gold/40 bg-gold/8 text-gold-light text-[0.72rem] tracking-[0.12em] uppercase opacity-0 animate-fade-slide-in [animation-delay:0.2s]">
        ✦ &nbsp; ศาสตร์แห่งดวงดาว &nbsp; ✦
      </div>

      {/* Title */}
      <h1 className="font-cinzel-d font-bold leading-[1.1] text-[clamp(2.2rem,4.5vw,3.6rem)] mb-[1.4rem] opacity-0 animate-fade-slide-in drop-shadow-[0_0_40px_rgba(201,162,39,0.5)] [animation-delay:0.4s]">
        <span className="text-gold">
          Discover Your
          <br />
          Cosmic Path
        </span>
      </h1>

      {/* Description */}
      <p className="font-sarabun font-light leading-[1.75] text-[clamp(0.88rem,1.2vw,1rem)] text-cream/75 max-w-110 mb-[2.4rem] opacity-0 animate-fade-slide-in [animation-delay:0.6s]">
        เชื่อมต่อกับพลังของจักรวาล ค้นพบความลึกลับของดวงชะตา
        และเปิดเผยเส้นทางชีวิตของคุณผ่านศาสตร์ไพ่ทาโรต์และโหราศาสตร์
      </p>

      {/* CTA */}
      <div className="flex flex-wrap gap-3.5 opacity-0 animate-fade-slide-in [animation-delay:0.8s]">
        <Link
          href="/fortune/cards"
          className="px-7.5 py-3.25 rounded-lg font-sarabun font-semibold text-[0.95rem] tracking-[0.04em] text-navy bg-linear-to-br from-gold to-gold-dark shadow-[0_4px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_8px_32px_rgba(201,162,39,0.55)] hover:-translate-y-0.5 transition-all duration-200"
        >
          ทำนายดวง
        </Link>

        <Link
          href="/shop"
          className="px-7.5 py-3.25 rounded-lg font-sarabun text-[0.95rem] tracking-[0.04em] text-cream border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
