import UserTable from '@/components/features/admin/manage-user';
import { adminService } from '@/lib/api/admin/admin.service';

// Helper
const getString = (value: string | string[] | undefined) =>
  typeof value === 'string' ? value : undefined;

const getNumber = (value: string | string[] | undefined) =>
  typeof value === 'string' ? Number(value) : undefined;

export default async function ManageUserPage({
  searchParams,
}: PageProps<'/admin/manage-user'>) {
  const { search, page, limit } = await searchParams;
  const params = {
    search: getString(search),
    page: getNumber(page),
    limit: getNumber(limit),
  };
  const { data: users, meta } = await adminService.getAllUsers(params);

  return (
    <div className="flex flex-col px-8 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
        จัดการผู้ใช้งาน
      </h1>
      <UserTable users={users} meta={meta} />
    </div>
  );
}
