import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getMyFortuneLogs } from "@/lib/actions/fortune.action";
import FortuneLogList from "@/components/features/fortune/user/fortune-log-list";

export default async function FortuneHistoryPage() {
  const session = await auth();
  if (!session) redirect("/");

  const logs = await getMyFortuneLogs();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          ประวัติดูดวง
        </h1>
        <p className="text-lg text-white/70 font-['Sarabun']">
          {logs.length} รายการ
        </p>
      </div>

      <div
        className="w-full p-6 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <FortuneLogList logs={logs} />
      </div>
    </div>
  );
}
