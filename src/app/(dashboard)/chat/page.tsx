import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import ChatBox from "@/components/features/dashboard/chat-box";

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const token = session.user.accessToken ?? "";
  const userId = session.user.id ?? "";
  const firstName = session.user.firstName ?? "U";

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Chat</h1>

        <p className="dashboard-subtitle">ติดต่อสอบถามกับทีมงานของเรา</p>
      </div>

      <div className="flex-1">
        <ChatBox token={token} userId={userId} firstName={firstName} />
      </div>
    </div>
  );
}
