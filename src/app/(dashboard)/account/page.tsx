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
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">ข้อมูลส่วนตัว</h1>

        <p className="dashboard-subtitle">
          จัดการข้อมูลบัญชีและการตั้งค่าส่วนตัวของคุณ
        </p>
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl p-8 rounded-2xl border border-[rgba(201,162,39,0.15)] bg-[linear-gradient(160deg,rgba(26,20,74,0.7)_0%,rgba(11,8,42,0.8)_100%)]">
          <AccountForm user={user} />
        </div>
      </div>
    </div>
  );
}
