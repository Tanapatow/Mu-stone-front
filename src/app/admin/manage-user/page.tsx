import UserTable from '@/components/features/admin/manage-user';
import { adminService, UserFilter } from '@/lib/api/admin/admin.service';
import Link from 'next/link';
type ManageUserPageProps = {
  searchParams: Promise<UserFilter>;
};

export default async function ManageUserPage({
  searchParams,
}: ManageUserPageProps) {
  const filter = await searchParams;

  const { data: users, meta } = await adminService.getAllUsers(filter);

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(
      Object.entries(filter).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      }, {}),
    );
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-col px-8 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
        จัดการผู้ใช้งาน
      </h1>

      <UserTable users={users} />

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {meta.hasPreviousPage && (
            <Link
              href={buildPageUrl(meta.currentPage - 1)}
              className="px-3 py-1.5 rounded-lg text-lg font-['Sarabun'] font-medium text-black hover:text-black/50 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              ← ก่อนหน้า
            </Link>
          )}

          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={buildPageUrl(page)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-lg font-['Sarabun'] transition-all duration-200"
                style={{
                  background: meta.currentPage === page ? 'black' : 'white',
                  color: meta.currentPage === page ? 'white' : 'black',
                  border: '1px solid black',
                }}
              >
                {page}
              </Link>
            ),
          )}

          {meta.hasNextPage && (
            <Link
              href={buildPageUrl(meta.currentPage + 1)}
              className="px-3 py-1.5 rounded-lg text-lg font-['Sarabun'] font-medium text-black hover:text-black/50 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              ถัดไป →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
