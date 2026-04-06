"use client";

import {
  Archive,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";

const menuItems = [
  { label: "แดชบอร์ด", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "ประวัติการสั่งซื้อ", href: "/admin/history", icon: History },
  { label: "แก้ไขโปรไฟล์", href: "/admin/editprofile", icon: UserPen },
  { label: "สินค้า", href: "/admin/product", icon: Package },
  { label: "การจัดการผู้ใช้งาน", href: "/admin/manage-user", icon: Archive },
  { label: "แชต", href: "/admin/chat", icon: MessageSquareText },
];

export default function AdminSidebar1() {
  const pathname = usePathname();

  return (
    <aside className="fixed h-screen w-[270px] shrink-0 flex flex-col px-4 py-6 z-10 bg-[linear-gradient(180deg,rgba(11,8,42,0.98)_0%,rgba(6,4,26,0.99)_100%)] border-r border-gold/10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <span className="font-cinzel-d text-sm text-gold/80 group-hover:text-gold transition-colors">
          Mu Stone
        </span>
      </Link>

      {/* Badge */}
      <div className="px-3 py-2 rounded-xl mb-6 text-center bg-gold/8 border border-gold/20">
        <p className="text-xs text-gold font-sarabun font-semibold">
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sarabun transition-all duration-200 border-l-2 ${
                isActive
                  ? "bg-gold/10 text-gold border-gold"
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
      <div className="border-t border-white/5 pt-4">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sarabun text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={15} />
            ออกจากระบบ
          </button>
        </form>
      </div>
    </aside>
  );
}
