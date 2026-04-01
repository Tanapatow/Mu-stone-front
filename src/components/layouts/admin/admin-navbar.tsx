'use client';

import {
  Archive,
  ArrowLeft,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  Package2,
  ShoppingCart,
  UserPen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: 'แดชบอร์ด',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'แก้ไขโปรไฟล์',
    href: '/admin/editprofile',
    icon: UserPen,
  },
  {
    label: 'ประวัติ',
    href: '/admin/history',
    icon: History,
  },
  {
    label: 'สินค้า',
    href: '/admin/product',
    icon: Package,
  },
  {
    label: 'การจัดการสินค้า',
    href: '/admin/manage-user',
    icon: Package2,
  },
  {
    label: 'การจัดการผู้ใช้งาน',
    href: '/admin/manage-user',
    icon: Archive,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-67.5 shrink-0 flex-col bg-[#151515] px-5 py-6 text-white">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-lg font-medium text-white transition hover:text-blue-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>กลับหน้าแรก</span>
      </Link>

      {/* Admin badge */}
      <div
        className="px-3 py-2 rounded-xl mb-6 text-center"
        style={{
          background: 'rgba(201,162,39,0.08)',
          border: '1px solid rgba(201,162,39,0.2)',
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
                background: isActive ? 'rgba(201,162,39,0.1)' : 'transparent',
                color: isActive ? '#c9a227' : 'rgba(245,240,232,0.45)',
                borderLeft: isActive
                  ? '2px solid #c9a227'
                  : '2px solid transparent',
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
