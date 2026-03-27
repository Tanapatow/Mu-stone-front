import AdminNavbar from '@/components/layouts/admin/admin-navbar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#e9e9e9]">
      <div className="flex min-h-screen">
        <AdminNavbar />
        <main className="flex-1 overflow-x-auto">
          <div className="min-h-screen px-6 py-8 md:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
