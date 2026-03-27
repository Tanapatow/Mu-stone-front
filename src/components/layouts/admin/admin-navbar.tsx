'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  ShoppingCart,
  UserPen,
  WalletCards,
} from 'lucide-react';

const menuItems = [
  {
    label: 'แดชบอร์ด',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'แก้ไขโปรไฟล์',
    href: '/admin/edit-profile',
    icon: UserPen,
  },
  {
    label: 'จัดการออเดอร์',
    href: '/admin/manage-order',
    icon: ShoppingCart,
  },
  {
    label: 'ประวัติ',
    href: '/admin/history',
    icon: History,
  },
  {
    label: 'สินค้า',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'แชต',
    href: '/admin/chat',
    icon: MessageSquareText,
  },
  {
    label: 'การชำระเงิน',
    href: '/admin/payment',
    icon: WalletCards,
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-90 flex-col bg-[#151515] px-6 py-7 text-white">
      <Link
        href="/"
        className="mb-15 flex items-center gap-3 text-4xl font-medium text-white transition hover:text-blue-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="flex flex-col">กลับหน้าแรก</span>
      </Link>

      <nav className="flex flex-1 flex-col">
        <div className="space-y-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-3xl font-medium transition ${
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
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-3xl font-medium text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
