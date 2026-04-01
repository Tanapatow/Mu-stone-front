"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/actions/auth.action";
import type { Session } from "next-auth";
import CartSlidePanel from "@/components/features/cart/cart-slide-panel";

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
  const [search, setSearch] = useState("");
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
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 no-underline"
        >
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{
              border: "2px solid var(--gold)",
              background: "radial-gradient(circle, var(--purple), var(--navy))",
            }}
          >
            🔮
          </span>
          <span className="font-['Cinzel_Decorative'] text-[1rem] text-(--gold-light) tracking-wide">
            Mu Stone
          </span>
        </Link>

        {/* Search */}
        <div className="relative flex-1 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-4 pr-10 py-2 rounded-xl text-sm
              bg-[rgba(255,255,255,0.07)] text-[var(--cream)]
              border border-[rgba(255,255,255,0.1)]
              outline-none placeholder:text-white/30
              font-['Sarabun'] transition-all duration-200
              focus:border-[rgba(201,162,39,0.4)]
              focus:bg-[rgba(255,255,255,0.1)]
            "
          />
          <Search
            size={15}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
        </div>

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
              className="px-4 py-2 rounded-lg text-sm font-['Sarabun'] text-white/50 hover:text-white/80 transition-colors"
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
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
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
                            className="absolute top-2 right-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
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
