import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/layouts/admin/admin-navbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/');
  if (session.user.role !== 'ADMIN') redirect('/');

  return (
    <div className="flex min-h-screen">
      <AdminNavbar />

      <main className="flex-1 overflow-x-auto">
        <div className="pt-8 bg-[#ececec]">{children}</div>
      </main>
    </div>
  );
}
