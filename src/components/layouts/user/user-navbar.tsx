"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/actions/auth.action";
import type { Session } from "next-auth";
import CartSlidePanel from "@/components/features/cart/cart-slide-panel";
import Image from "next/image";

const NAV_ICONS = [
  {
    icon: "/navicons/account-icon.png",
    href: "/dashboard",
    label: "Dashboard",
    showBadge: false,
    isCart: false,
  },
  {
    icon: "/navicons/cart-icon.png",
    href: "",
    label: "Cart",
    showBadge: true,
    isCart: true,
  },
  {
    icon: "/navicons/shop-icon.png",
    href: "/shop",
    label: "Shop",
    showBadge: false,
    isCart: false,
  },
  {
    icon: "/navicons/chat-icon.png",
    href: "/chat",
    label: "Chat",
    showBadge: false,
    isCart: false,
  },
];

type UserNavbarProps = {
  session: Session | null;
  cartCount?: number;
};

export default function UserNavbar({
  session,
  cartCount = 0,
}: UserNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center gap-6 px-6 md:px-10 h-16 bg-navy/97 backdrop-blur-md border-b border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo-mustone.png"
            alt="Mu Stone"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-cinzel-d text-2xl text-gold-light tracking-wide">
            Mu Stone
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3 ml-auto">
          {session?.user?.firstName && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
              <span className="text-xs font-sarabun text-cream/70">
                {session.user.firstName}
              </span>
            </div>
          )}

          <form action={logout}>
            <button className="px-4 py-2 rounded-lg text-sm font-sarabun text-white/50 hover:text-white/80 transition-colors">
              ออกจากระบบ
            </button>
          </form>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gold hover:bg-white/5 transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {cartCount > 0 && !menuOpen && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1 bg-red-500">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-11 z-50 flex flex-col gap-1 p-1">
                  {NAV_ICONS.map(({ icon, href, label, showBadge, isCart }) =>
                    isCart ? (
                      <button
                        key={label}
                        onClick={() => {
                          setMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
                      >
                        <div className="relative w-20 h-20 rounded-full overflow-hidden my-2 bg-[radial-gradient(circle,rgba(74,26,110,0.8),rgba(11,8,42,0.9))] border-2 border-gold/40">
                          <Image
                            src={icon}
                            alt={label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        {showBadge && cartCount > 0 && (
                          <span className="absolute top-2 right-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1 bg-red-500">
                            {cartCount > 99 ? "99+" : cartCount}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
                      >
                        <div className="relative w-20 h-20 rounded-full overflow-hidden my-2 bg-[radial-gradient(circle,rgba(74,26,110,0.8),rgba(11,8,42,0.9))] border-2 border-gold/40">
                          <Image
                            src={icon}
                            alt={label}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <CartSlidePanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
