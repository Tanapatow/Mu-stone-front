export type OrderStatus = 'DELIVERED' | 'SHIPPED' | 'PENDING' | 'CANCELLED';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING';
export type PaymentIconType = 'qr' | 'bank' | 'card';
export type HistoryInnerTab = 'orders' | 'payments';

export type HistoryOrderItem = {
  id: string;
  orderCode: string;
  customerName: string;
  orderDate: string;
  total: number;
  status: OrderStatus;
};

export type PaymentItem = {
  id: string;
  channel: string;
  amount: number;
  status: PaymentStatus;
  proofLabel: string;
  icon: PaymentIconType;
};

export type PaymentSummary = {
  totalAmount: number;
  successCount: number;
  pendingCount: number;
  downloadText: string;
};

export type HistoryCardProps = {
  orders: HistoryOrderItem[];
  payments: PaymentItem[];
  paymentSummary: PaymentSummary;
  totalOrders: number;
  itemsPerPage?: number;
  defaultTab?: HistoryInnerTab;
};
