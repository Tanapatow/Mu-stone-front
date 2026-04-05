import OrderHistoryHeader from "@/components/features/admin/history/order-history-header";
import OrderTable from "@/components/features/admin/history/order-table";
import { getAdminOrders } from "@/lib/actions/order.action";

export default async function HistoryPage() {
  const { orders, meta } = await getAdminOrders({ page: 1, limit: 10 });

  return (
    <div className="min-h-screen pt-10 mx-auto w-full max-w-6xl flex flex-col gap-6 px-4">
      <OrderHistoryHeader />
      <OrderTable initialOrders={orders} initialMeta={meta} />
    </div>
  );
}
