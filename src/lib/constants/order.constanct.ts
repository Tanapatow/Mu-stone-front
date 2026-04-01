import type { OrderStatus, OrderTab } from "@/lib/api/order/order.type";

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  PENDING: {
    label: "รอชำระเงิน",
    color: "rgba(234,179,8,0.9)",
    bg: "rgba(234,179,8,0.1)",
  },
  PAID: {
    label: "รอตรวจสอบ",
    color: "rgba(59,130,246,0.9)",
    bg: "rgba(59,130,246,0.1)",
  },
  SHIPPED: {
    label: "จัดส่งแล้ว",
    color: "rgba(34,197,94,0.9)",
    bg: "rgba(34,197,94,0.1)",
  },
  CANCELLED: {
    label: "ยกเลิก",
    color: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.1)",
  },
};

export const ORDER_TABS: { key: OrderTab; label: string }[] = [
  { key: "ALL", label: "ทั้งหมด" },
  { key: "PENDING", label: "รอชำระเงิน" },
  { key: "PAID", label: "รอตรวจสอบ" },
  { key: "SHIPPED", label: "จัดส่งแล้ว" },
  { key: "CANCELLED", label: "ยกเลิก" },
];
