import OrderHistoryHeader from '@/components/features/admin/history/order-history-header';
import OrderTable from '@/components/features/admin/history/order-table';

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-8 px-8">
      <OrderHistoryHeader />
      <OrderTable />
    </div>
  );
}
