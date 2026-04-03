import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getAdminOrders } from "@/lib/actions/order.action";
import AdminOrderList from "@/components/features/admin/admin-order-list";

export default async function AdminHistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { orders, meta } = await getAdminOrders({ page: 1, limit: 10 });

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      {/* Header */}
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          คำสั่งซื้อทั้งหมด
        </h1>
        <p className="text-sm text-white/70 font-['Sarabun']">
          {meta.totalItems} รายการ
        </p>
      </div>

      {/* Orders */}
      <div
        className="w-full p-6 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <AdminOrderList initialOrders={orders} initialMeta={meta} />
      </div>
    </div>
  );
}
