import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getAdminRooms } from "@/lib/actions/chat.action";
import AdminChat from "@/components/features/admin/admin-chat";

export default async function AdminChatPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const rooms = await getAdminRooms();
  const token = session.user.accessToken ?? "";
  const adminId = session.user.id ?? "";

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="dashboard-header">
        <h1 className="dashboard-title">แชท</h1>

        <p className="dashboard-subtitle">{rooms.length} ห้องแชท</p>
      </div>

      <div className="flex-1">
        <AdminChat rooms={rooms} token={token} adminId={adminId} />
      </div>
    </div>
  );
}
