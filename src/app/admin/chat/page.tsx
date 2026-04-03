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
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          แชท
        </h1>
        <p className="text-sm text-white/70 font-['Sarabun']">
          {rooms.length} ห้องแชท
        </p>
      </div>

      <AdminChat rooms={rooms} token={token} adminId={adminId} />
    </div>
  );
}
