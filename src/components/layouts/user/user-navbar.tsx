"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Order", href: "/order" },
  { label: "Cart", href: "/cart" },
  { label: "Account", href: "/account" },
  { label: "Logout", href: "/logout" },
];

const DROPDOWN_ITEMS = [
  { label: "บัญชีของฉัน", href: "/account" },
  { label: "การซื้อของฉัน", href: "/order" },
  { label: "รายการที่ชอบ", href: "/wishlist" },
  { label: "การตั้งค่า", href: "/settings" },
];

export default function UserNavbar() {
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
            font-['Sarabun']
            transition-all duration-200
            focus:border-[rgba(201,162,39,0.4)]
            focus:bg-[rgba(255,255,255,0.1)]
          "
        />
        <Search
          size={15}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        />
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 ml-auto">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="
              px-3 py-2 rounded-lg text-sm font-['Sarabun']
              text-white/60 no-underline
              transition-all duration-200
              hover:text-white/90 hover:bg-white/5
            "
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Hamburger + Dropdown */}
      <div className="relative ml-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            w-9 h-9 flex items-center justify-center rounded-lg
            text-[var(--gold)] hover:bg-white/5
            transition-all duration-200
          "
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute right-0 top-12 z-50 w-52 rounded-2xl overflow-hidden py-2"
              style={{
                background: "rgba(245,240,232,0.97)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                border: "1px solid rgba(201,162,39,0.15)",
              }}
            >
              {DROPDOWN_ITEMS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    block px-5 py-3.5 text-sm font-['Sarabun']
                    text-[#1a1a2e] no-underline
                    transition-colors duration-150
                    hover:bg-[rgba(201,162,39,0.1)] hover:text-[#7a5c0a]
                  "
                >
                  {label}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
