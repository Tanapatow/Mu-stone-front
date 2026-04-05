import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import AdminSidebar1 from "@/components/layouts/admin/admin-navbar1";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen flex bg-[url('/admin-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <AdminSidebar1 />
      <main className="flex-1 ml-[270px] min-h-screen px-8 py-10">
        <div className="w-full max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
