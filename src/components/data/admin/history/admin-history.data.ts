import type {
  HistoryOrderItem,
  PaymentItem,
  PaymentSummary,
} from '@/components/features/admin/history/history-types';

export const mockOrders: HistoryOrderItem[] = [
  {
    id: '1',
    orderCode: '#ORD-2024-001',
    customerName: 'วิภาดา ดิษยบัน',
    orderDate: '2023-10-12',
    total: 12450,
    status: 'DELIVERED',
  },
  {
    id: '2',
    orderCode: '#ORD-2024-002',
    customerName: 'ธนากร สุขสวัสดิ์',
    orderDate: '2023-10-14',
    total: 8200,
    status: 'SHIPPED',
  },
  {
    id: '3',
    orderCode: '#ORD-2024-003',
    customerName: 'ธนากร สุขสวัสดิ์',
    orderDate: '2023-10-14',
    total: 8200,
    status: 'PENDING',
  },
  {
    id: '4',
    orderCode: '#ORD-2024-004',
    customerName: 'ธนากร สุขสวัสดิ์',
    orderDate: '2023-10-14',
    total: 250,
    status: 'SHIPPED',
  },
  {
    id: '5',
    orderCode: '#ORD-2024-005',
    customerName: 'ธนากร สุขสวัสดิ์สวัสดีตอนบ่าย',
    orderDate: '2023-10-14',
    total: 8200,
    status: 'CANCELLED',
  },
  {
    id: '6',
    orderCode: '#ORD-2024-006',
    customerName: 'ปาริฉัตร มณีวงศ์',
    orderDate: '2023-10-15',
    total: 4590,
    status: 'PENDING',
  },
  {
    id: '7',
    orderCode: '#ORD-2024-007',
    customerName: 'กิตติพงษ์ วัฒนชัย',
    orderDate: '2023-10-15',
    total: 9990,
    status: 'DELIVERED',
  },
  {
    id: '8',
    orderCode: '#ORD-2024-008',
    customerName: 'สุภาวดี ศิริกุล',
    orderDate: '2023-10-16',
    total: 1790,
    status: 'SHIPPED',
  },
];

export const mockPayments: PaymentItem[] = [
  {
    id: '1',
    channel: 'Thai QR',
    amount: 1299,
    status: 'SUCCESS',
    proofLabel: 'ดู',
    icon: 'qr',
  },
  {
    id: '2',
    channel: 'โอนผ่านธนาคาร',
    amount: 4500,
    status: 'SUCCESS',
    proofLabel: 'ดู',
    icon: 'bank',
  },
  {
    id: '3',
    channel: 'บัตรเครดิต',
    amount: 599,
    status: 'FAILED',
    proofLabel: 'ไม่มีไฟล์',
    icon: 'card',
  },
];

export const paymentSummary: PaymentSummary = {
  totalAmount: 124500,
  successCount: 118,
  pendingCount: 4,
  downloadText: 'ดาวน์โหลดรายงาน (PDF)',
};
