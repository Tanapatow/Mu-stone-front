import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getMyFortuneLogs } from "@/lib/actions/fortune.action";
import FortuneHistoryClient from "@/components/features/fortune/fortune-history-client";

export default async function FortuneHistoryPage() {
  const session = await auth();
  if (!session) redirect("/");

  const logs = await getMyFortuneLogs();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="dashboard-header">
        <h1 className="dashboard-title">ประวัติดูดวง</h1>
        <p className="dashboard-subtitle">{logs.length} รายการ</p>
      </div>
      <FortuneHistoryClient logs={logs} />
    </div>
  );
}
