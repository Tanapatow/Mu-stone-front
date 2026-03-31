'use client';

import Link from 'next/link';

export function HomeContent() {
  return (
    <div className="relative z-10 px-[6vw] max-w-[50%] max-md:max-w-full max-md:pb-90">
      {/* Badge */}
      <div
        className="
          inline-flex items-center gap-2 mb-6
          px-3.5 py-1.25 rounded-full
          border border-[rgba(201,162,39,0.4)]
          bg-[rgba(201,162,39,0.08)]
          text-(--gold-light) text-[0.72rem] tracking-[0.12em] uppercase
          opacity-0 animate-fade-slide-in
        "
        style={{ animationDelay: '0.2s' }}
      >
        ✦ &nbsp; ศาสตร์แห่งดวงดาว &nbsp; ✦
      </div>

      {/* Title */}
      <h1
        className="
          font-['Cinzel_Decorative'] font-bold leading-[1.1]
          text-[clamp(2.2rem,4.5vw,3.6rem)]
          text-(--gold) mb-[1.4rem]
          opacity-0 animate-fade-slide-in
        "
        style={{
          textShadow:
            '0 0 40px rgba(201,162,39,0.5), 0 0 80px rgba(201,162,39,0.2)',
          animationDelay: '0.4s',
        }}
      >
        Discover Your
        <br />
        Cosmic Path
      </h1>

      {/* Description */}
      <p
        className="
          font-['Sarabun'] font-light leading-[1.75]
          text-[clamp(0.88rem,1.2vw,1rem)]
          text-[rgba(245,240,232,0.75)]
          max-w-110 mb-[2.4rem]
          opacity-0 animate-fade-slide-in
        "
        style={{ animationDelay: '0.6s' }}
      >
        เชื่อมต่อกับพลังของจักรวาล ค้นพบความลึกลับของดวงชะตา
        และเปิดเผยเส้นทางชีวิตของคุณผ่านศาสตร์ไพ่ทาโรต์และโหราศาสตร์
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-wrap gap-3.5 opacity-0 animate-fade-slide-in"
        style={{ animationDelay: '0.8s' }}
      >
        <Link
          href="/fortune/cards"
          className="
            relative overflow-hidden
            px-7.5 py-3.25 rounded-lg
            font-['Sarabun'] font-semibold text-[0.95rem] tracking-[0.04em]
            text-(--navy) no-underline
            transition-all duration-200
            hover:-translate-y-0.5
          "
          style={{
            background:
              'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
            boxShadow: '0 4px 24px rgba(201,162,39,0.4)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              '0 8px 32px rgba(201,162,39,0.55)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              '0 4px 24px rgba(201,162,39,0.4)';
          }}
        >
          ทำนายดวง
        </Link>

        <Link
          href="/shop"
          className="
            px-7.5 py-3.25 rounded-lg
            font-['Sarabun'] text-[0.95rem] tracking-[0.04em]
            text-(--cream) no-underline
            border border-[rgba(255,255,255,0.2)]
            bg-[rgba(255,255,255,0.05)] backdrop-blur-md
            transition-all duration-200
            hover:bg-[rgba(255,255,255,0.1)]
            hover:border-[rgba(255,255,255,0.4)]
            hover:-translate-y-0.5
          "
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
