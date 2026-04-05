import UserTable from "@/components/features/admin/manage-user";
import UserStats from "@/components/features/admin/user.stats";
import { adminService, UserFilter } from "@/lib/api/admin/admin.service";
import Link from "next/link";

type ManageUserPageProps = {
  searchParams: Promise<UserFilter>;
};

export default async function ManageUserPage({
  searchParams,
}: ManageUserPageProps) {
  const filter = await searchParams;
  const [{ data: users, meta }, stats] = await Promise.all([
    adminService.getAllUsers(filter),
    adminService.getUserStats(),
  ]);

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(
      Object.entries(filter).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      }, {}),
    );
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="dashboard-header">
        <h1 className="dashboard-title">จัดการผู้ใช้งาน</h1>
        <p className="dashboard-subtitle">ดูและจัดการบัญชีผู้ใช้ทั้งหมด</p>
      </div>

      <UserStats
        totalItems={stats.totalItems}
        activeCount={stats.activeCount}
      />

      <UserTable users={users} />

      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {meta.hasPreviousPage && (
            <Link
              href={buildPageUrl(meta.currentPage - 1)}
              className="px-3 py-1.5 rounded-lg text-sm font-sarabun font-medium text-white/50 border border-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-200"
            >
              ← ก่อนหน้า
            </Link>
          )}
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={buildPageUrl(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-sarabun transition-all duration-200 border ${
                  meta.currentPage === page
                    ? "bg-gold/20 text-gold border-gold/40"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                }`}
              >
                {page}
              </Link>
            ),
          )}
          {meta.hasNextPage && (
            <Link
              href={buildPageUrl(meta.currentPage + 1)}
              className="px-3 py-1.5 rounded-lg text-sm font-sarabun font-medium text-white/50 border border-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-200"
            >
              ถัดไป →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
