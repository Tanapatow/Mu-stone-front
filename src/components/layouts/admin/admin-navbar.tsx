'use client';

import {
  ArrowLeft,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
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
    label: 'แชต',
    href: '/admin/chat',
    icon: MessageSquareText,
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen fixed w-67.5 shrink-0 flex-col bg-[#151515] px-5 py-6 text-white">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-lg font-medium text-white transition hover:text-blue-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>กลับหน้าแรก</span>
      </Link>

      <nav className="flex flex-1 flex-col">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-lg font-medium text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
