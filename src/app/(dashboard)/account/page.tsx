import { getMe } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import AccountForm from "@/components/features/dashboard/account-form";
import { auth } from "@/lib/auth/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/");

  const user = await getMe();
  if (!user) redirect("/");

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      {/* Header (ชิดซ้ายบน) */}
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          ข้อมูลส่วนตัว
        </h1>
        <p className="text-lg text-white/70 font-['Sarabun']">
          จัดการข้อมูลบัญชีและการตั้งค่าส่วนตัวของคุณ
        </p>
      </div>

      {/* Center area */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full max-w-4xl p-8 rounded-2xl"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
            border: "1px solid rgba(201,162,39,0.15)",
          }}
        >
          <AccountForm user={user} />
        </div>
      </div>
    </div>
  );
}
