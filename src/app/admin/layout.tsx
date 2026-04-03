import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layouts/admin/admin-navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: "url('/admin-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-67.5">{children}</main>
    </div>
  );
}
