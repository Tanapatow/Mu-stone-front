"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/actions/auth.action";
import type { Session } from "next-auth";

const NAV_ICONS = [
  { icon: "/navicons/chat-icon.png", href: "/chat", label: "Chat" },
  { icon: "/navicons/cart-icon.png", href: "/cart", label: "Cart" },
  { icon: "/navicons/shop-icon.png", href: "/shop", label: "Shop" },
  { icon: "/navicons/account-icon.png", href: "/account", label: "Account" },
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

  return (
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
        <span className="font-['Cinzel_Decorative'] text-[1rem] text-[var(--gold-light)] tracking-wide">
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
            <span className="text-xs font-['Sarabun'] text-[#f5f0e8]/70">
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

        {/* Hamburger with badge */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--gold)] hover:bg-white/5 transition-all duration-200"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Cart badge */}
          {cartCount > 0 && (
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
                {NAV_ICONS.map(({ icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="transition-transform duration-200 hover:scale-110 active:scale-95"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon}
                      alt={label}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
