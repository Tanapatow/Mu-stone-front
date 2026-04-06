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
      <div className="dashboard-header">
        <h1 className="dashboard-title">ข้อมูลส่วนตัว</h1>
        <p className="dashboard-subtitle">
          จัดการข้อมูลบัญชีและการตั้งค่าส่วนตัวของคุณ
        </p>
      </div>
      <div className="card-glass">
        <AccountForm user={user} />
      </div>
    </div>
  );
}
