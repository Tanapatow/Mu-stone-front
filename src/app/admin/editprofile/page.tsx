import AdminAccount from '@/components/features/admin/editprofile/admin-account';
import { getMe } from '@/lib/actions/user.action';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function AdminEditProfilePage() {
  const session = await auth();
  if (!session) redirect('/');

  const user = await getMe();
  if (!user) redirect('/');
  return (
    <div className="px-8 mx-auto w-full h-screen max-w-310 space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
        แก้ไขข้อมูลส่วนตัว
      </h1>
      <AdminAccount user={user} />
    </div>
  );
}
