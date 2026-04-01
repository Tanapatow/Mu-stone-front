import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/layouts/dashboard/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: "url('/user-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <DashboardSidebar session={session} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
