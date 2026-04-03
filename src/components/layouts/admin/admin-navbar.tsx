"use client";

import {
  ArrowLeft,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";

const menuItems = [
  { label: "แดชบอร์ด", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "ประวัติ", href: "/admin/history", icon: History },
  { label: "สินค้า", href: "/admin/product", icon: Package },
  { label: "แชต", href: "/admin/chat", icon: MessageSquareText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed h-screen w-67.5 shrink-0 flex flex-col px-4 py-6 z-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,8,42,0.98) 0%, rgba(6,4,26,0.99) 100%)",
        borderRight: "1px solid rgba(201,162,39,0.1)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        {/* <ArrowLeft
          size={16}
          className="text-white/40 group-hover:text-gold transition-colors"
        /> */}
        <span className="font-['Cinzel_Decorative'] text-sm text-gold/80 group-hover:text-gold transition-colors">
          Mu Stone
        </span>
      </Link>

      {/* Admin badge */}
      <div
        className="px-3 py-2 rounded-xl mb-6 text-center"
        style={{
          background: "rgba(201,162,39,0.08)",
          border: "1px solid rgba(201,162,39,0.2)",
        }}
      >
        <p className="text-xs text-gold font-['Sarabun'] font-semibold">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-['Sarabun'] transition-all duration-200"
              style={{
                background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                color: isActive ? "#c9a227" : "rgba(245,240,232,0.45)",
                borderLeft: isActive
                  ? "2px solid #c9a227"
                  : "2px solid transparent",
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/5 pt-4">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-['Sarabun'] text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={15} />
            ออกจากระบบ
          </button>
        </form>
      </div>
    </aside>
  );
}
