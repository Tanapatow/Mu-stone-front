import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getMyOrders } from "@/lib/actions/order.action";
import OrderList from "@/components/features/dashboard/order-list";

export default async function OrderPage() {
  const session = await auth();
  if (!session) redirect("/");

  const orders = await getMyOrders();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="dashboard-header">
        <h1 className="dashboard-title">การสั่งซื้อของฉัน</h1>

        <p className="dashboard-subtitle">{orders.length} รายการ</p>
      </div>

      <div className="card-glass">
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
