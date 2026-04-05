"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";
import {
  User,
  MapPin,
  History,
  ShoppingBag,
  MessageCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import type { Session } from "next-auth";

const NAV_ITEMS = [
  { label: "บัญชีของฉัน", href: "/account", icon: User },
  { label: "ที่อยู่จัดส่ง", href: "/address", icon: MapPin },
  { label: "ประวัติดวง", href: "/fortune-history", icon: History },
  { label: "การสั่งซื้อของฉัน", href: "/order", icon: ShoppingBag },
  { label: "Chat", href: "/chat", icon: MessageCircle },
];

type DashboardSidebarProps = {
  session: Session | null;
};

export default function DashboardSidebar({ session }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 min-h-screen flex flex-col bg-[linear-gradient(180deg,rgba(11,8,42,0.98)_0%,rgba(6,4,26,0.99)_100%)] border-r border-[rgba(201,162,39,0.1)]">
      {/* Back */}
      <div className="px-4 pt-6 pb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 font-sarabun transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Home
        </Link>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center gap-2 px-4 py-6 border-b border-white/5">
        <div className="text-center">
          <p className="text-lg font-sarabun text-cream">
            {session?.user?.firstName} {session?.user?.lastName}
          </p>
          <p className="text-xs text-white/30 font-sarabun truncate max-w-[140px]">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-lg font-sarabun transition-all duration-200 border-l-2 ${
                isActive
                  ? "bg-[rgba(201,162,39,0.1)] text-gold border-[--color-gold]"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-lg font-sarabun text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={15} />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
