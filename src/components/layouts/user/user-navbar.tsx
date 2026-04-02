"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
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
      <nav
        className="sticky top-0 z-40 flex items-center gap-6 px-6 md:px-10 h-16"
        style={{
          background: "rgba(11,14,42,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}

        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo-mustone.png"
            alt="Mu Stone"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-['Cinzel_Decorative'] text-[1.5rem] text-(--gold-light) tracking-wide">
            Mu Stone
          </span>
        </Link>

        <div className="flex items-center gap-3 ml-auto">
          {session?.user?.firstName && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
              <span className="text-xs font-['Sarabun'] text-cream/70">
                {session.user.firstName}
              </span>
            </div>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-lg font-['Sarabun'] text-white/50 hover:text-white/80 transition-colors"
            >
              Logout
            </button>
          </form>

          {/* Hamburger */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-(--gold) hover:bg-white/5 transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Badge */}
            {cartCount > 0 && !menuOpen && (
              <span
                className="absolute -top-1 -right-1 min-w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
                style={{ background: "#e53e3e" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

            {/* Dropdown */}
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-11 z-50 flex flex-col gap-1 p-1">
                  {NAV_ICONS.map(({ icon, href, label, showBadge, isCart }) =>
                    isCart ? (
                      // Cart icon → เปิด slide panel
                      <button
                        key={label}
                        onClick={() => {
                          setMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
                      >
                        <div
                          className="relative w-20 h-20 rounded-full overflow-hidden my-2"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(74,26,110,0.8), rgba(11,8,42,0.9))",
                            border: "2px solid rgba(201,162,39,0.4)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={icon}
                            alt={label}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {showBadge && cartCount > 0 && (
                          <span
                            className="absolute top-2 right-0 min-w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
                            style={{ background: "#e53e3e" }}
                          >
                            {cartCount > 99 ? "99+" : cartCount}
                          </span>
                        )}
                      </button>
                    ) : (
                      // icon อื่น → navigate ปกติ
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
                      >
                        <div
                          className="relative w-20 h-20 rounded-full overflow-hidden my-2"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(74,26,110,0.8), rgba(11,8,42,0.9))",
                            border: "2px solid rgba(201,162,39,0.4)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={icon}
                            alt={label}
                            className="w-full h-full object-contain"
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

      {/* Cart Slide Panel */}
      <CartSlidePanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
