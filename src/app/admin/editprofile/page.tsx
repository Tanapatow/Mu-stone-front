import AdminAccount from "@/components/features/admin/editprofile/admin-account";
import { getMe } from "@/lib/actions/user.action";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function AdminEditProfilePage() {
  const session = await auth();
  if (!session) redirect("/");

  const user = await getMe();
  if (!user) redirect("/");

  return (
    <div className="min-h-screen pt-10 mx-auto w-full max-w-5xl flex flex-col">
      <div className="dashboard-header">
        <h1 className="dashboard-title">แก้ไขข้อมูลส่วนตัว</h1>

        <p className="dashboard-subtitle">
          จัดการข้อมูลบัญชีและการตั้งค่าส่วนตัวของคุณ
        </p>
      </div>

      <div className="card-glass">
        <AdminAccount user={user} />
      </div>
    </div>
  );
}
