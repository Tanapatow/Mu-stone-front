"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { banUser } from "@/lib/actions/admin.action";
import { User } from "@/lib/api/admin/admin.type";

type UserTableProps = {
  users: User[];
};

const ROLE_STYLE: Record<string, string> = {
  ADMIN: "bg-gold/20 text-gold border border-gold/30",
  USER: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

export default function UserTable({ users }: UserTableProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (id: string, isActive: boolean) => {
    startTransition(async () => {
      try {
        const res = await banUser(id, !isActive);
        if (res.success) router.refresh();
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="card-glass overflow-x-auto">
      <table className="w-full text-sm font-sarabun">
        <thead>
          <tr className="border-b border-white/10 text-white/50 text-left">
            <th className="px-4 py-3 font-medium">ชื่อ</th>
            <th className="px-4 py-3 font-medium">อีเมล</th>
            <th className="px-4 py-3 font-medium">บทบาท</th>
            <th className="px-4 py-3 font-medium">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-12 text-white/40">
                ไม่พบผู้ใช้งาน
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
              >
                <td className="px-4 py-4">
                  <p className="text-cream font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {user.id.slice(0, 8).toUpperCase()}
                  </p>
                </td>
                <td className="px-4 py-4 text-white/60">{user.email}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${ROLE_STYLE[String(user.role)] ?? "bg-white/10 text-white/50"}`}
                  >
                    {String(user.role)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleToggle(user.id, user.isActive)}
                    disabled={isPending}
                    className={`w-10 h-5 rounded-full relative transition-all duration-200 disabled:opacity-40 cursor-pointer ${
                      user.isActive ? "bg-gold" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${
                        user.isActive ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
