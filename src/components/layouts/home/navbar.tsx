"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import AuthModal from "@/components/features/auth/auth-login-modal";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav
        className="
        fixed top-0 left-0 right-0 z-40
        flex items-center justify-between
        px-8 md:px-12 h-16
        bg-[rgba(11,14,42,0.85)] backdrop-blur-md
        border-b border-[rgba(201,162,39,0.15)]
      "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span
            className="
            w-9 h-9 rounded-full flex items-center justify-center text-xl
            border-2 border-[var(--gold)]
            bg-[radial-gradient(circle,var(--purple),var(--navy))]
          "
          >
            🔮
          </span>
          <span className="font-['Cinzel_Decorative'] text-[1.05rem] text-[var(--gold-light)] tracking-wide">
            Mu Stone
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="cart"
            className="
              w-9 h-9 rounded-full flex items-center justify-center
              text-white/60 hover:text-white/90
              hover:bg-white/8
              transition-all duration-200
            "
          >
            <ShoppingBag size={18} />
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="
              px-5 py-2 rounded-lg cursor-pointer
              border border-[rgba(201,162,39,0.6)] bg-transparent
              text-[#e8c96a] font-['Cinzel'] text-[0.78rem] tracking-[0.06em]
              transition-all duration-200
              hover:bg-[rgba(201,162,39,0.12)]
              active:scale-[0.97]
            "
          >
            Sign In
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoogleLogin={() => {
          /* TODO */
        }}
        onAppleLogin={() => {
          /* TODO */
        }}
      />
    </>
  );
}
