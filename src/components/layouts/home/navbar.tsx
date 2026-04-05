"use client";

import AuthModal from "@/components/features/auth/auth-login-and-regis-modal";
import { logout } from "@/lib/actions/auth.action";
import { LogOut, ShoppingBag, User } from "lucide-react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  session: Session | null;
};

export default function Navbar({ session }: NavbarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const user = session?.user;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-12 h-16 bg-navy/85 backdrop-blur-md border-b border-gold/15">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo-mustone.png"
            alt="Mu Stone"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-cinzel-d text-[1.05rem] text-gold-light tracking-wide">
            Mu Stone
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            aria-label="cart"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white/90 hover:bg-white/8 transition-all duration-200"
          >
            <ShoppingBag size={18} />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5">
                <User size={14} className="text-gold/70" />
                <span className="text-xs font-sarabun text-cream/70">
                  {user.firstName}
                </span>
              </div>

              <form action={logout}>
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/8 transition-all duration-200"
                  aria-label="logout"
                >
                  <LogOut size={16} />
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2 rounded-lg cursor-pointer border border-gold/60 bg-transparent text-gold-light font-cinzel text-[0.78rem] tracking-[0.06em] hover:bg-gold/12 active:scale-[0.97] transition-all duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
