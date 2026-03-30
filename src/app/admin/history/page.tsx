import HistoryCard from '@/components/features/admin/history/history-card';
import {
  mockOrders,
  mockPayments,
  paymentSummary,
} from '@/components/data/admin/history/admin-history.data';

export default function HistoryPage() {
  return (
    <HistoryCard
      defaultTab="orders"
      itemsPerPage={5}
      orders={mockOrders}
      payments={mockPayments}
      paymentSummary={paymentSummary}
      totalOrders={1248}
    />
  );
}
