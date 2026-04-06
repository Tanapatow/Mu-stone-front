"use client";

import { useState, useTransition } from "react";
import { Eye } from "lucide-react";
import type {
  AdminOrder,
  AdminOrderMeta,
} from "@/lib/api/order/admin-order.type";
import type { OrderStatus, OrderTab } from "@/lib/api/order/order.type";
import type { Order } from "@/lib/api/order/order.type";
import { getAdminOrders, getOrderById } from "@/lib/actions/order.action";
import CancelButton from "./cancel-button";
import ShippedButton from "./shipped-button";
import AdminOrderDetail from "../admin-order-detail";

const TAB_LABELS: { key: OrderTab; label: string }[] = [
  { key: "ALL", label: "ทั้งหมด" },
  { key: "PENDING", label: "รอดำเนินการ" },
  { key: "PAID", label: "ชำระแล้ว" },
  { key: "SHIPPED", label: "จัดส่งแล้ว" },
  { key: "CANCELLED", label: "ยกเลิก" },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  PAID: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  SHIPPED: "bg-green-500/20 text-green-400 border border-green-500/30",
  CANCELLED: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "รอดำเนินการ",
  PAID: "ชำระแล้ว",
  SHIPPED: "จัดส่งแล้ว",
  CANCELLED: "ยกเลิกแล้ว",
};

type OrderTableProps = {
  initialOrders: AdminOrder[];
  initialMeta: AdminOrderMeta;
};

export default function OrderTable({
  initialOrders,
  initialMeta,
}: OrderTableProps) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [meta, setMeta] = useState<AdminOrderMeta>(initialMeta);
  const [activeTab, setActiveTab] = useState<OrderTab>("ALL");
  const [isPending, startTransition] = useTransition();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const fetchOrders = (tab: OrderTab, page = 1) => {
    startTransition(async () => {
      const res = await getAdminOrders({
        page,
        limit: 10,
        status: tab === "ALL" ? undefined : tab,
      });
      setOrders(res.orders);
      setMeta(res.meta);
    });
  };

  const handleTabChange = (tab: OrderTab) => {
    setActiveTab(tab);
    fetchOrders(tab, 1);
  };

  const handlePageChange = (page: number) => {
    fetchOrders(activeTab, page);
  };

  const handleViewDetail = async (orderId: string) => {
    setIsLoadingDetail(true);
    const order = await getOrderById(orderId);
    setIsLoadingDetail(false);
    if (order) setSelectedOrder(order);
  };

  const handleStatusUpdated = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatAmount = (amount: number) =>
    amount.toLocaleString("th-TH", { minimumFractionDigits: 2 });

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {TAB_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-sarabun transition-all duration-200 border ${
                activeTab === key
                  ? "bg-gold/20 text-gold border-gold/40"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card-glass overflow-x-auto">
          <table className="w-full text-sm font-sarabun">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-left">
                <th className="px-4 py-3 font-medium">รหัสออเดอร์</th>
                <th className="px-4 py-3 font-medium">ลูกค้า</th>
                <th className="px-4 py-3 font-medium">วันที่</th>
                <th className="px-4 py-3 font-medium">ยอดรวม</th>
                <th className="px-4 py-3 font-medium">สถานะ</th>
                <th className="px-4 py-3 font-medium text-center">
                  ดูรายละเอียด
                </th>
                <th className="px-4 py-3 font-medium text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody
              className={isPending ? "opacity-50 pointer-events-none" : ""}
            >
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-white/40 font-sarabun"
                  >
                    ไม่พบคำสั่งซื้อ
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
                  >
                    <td className="px-4 py-4 text-gold font-medium">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-4 text-cream">
                      {order.user.firstName} {order.user.lastName}
                    </td>
                    <td className="px-4 py-4 text-white/50">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-cream font-medium">
                      ฿{formatAmount(order.totalAmount)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${STATUS_STYLE[order.status]}`}
                      >
                        {STATUS_LABEL[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleViewDetail(order.id)}
                        disabled={isLoadingDetail}
                        className="p-1.5 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10 transition-all duration-200 disabled:opacity-40"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {order.status === "PAID" ? (
                          <>
                            <CancelButton
                              orderId={order.id}
                              onSuccess={handleStatusUpdated}
                            />
                            <ShippedButton
                              orderId={order.id}
                              onSuccess={handleStatusUpdated}
                            />
                          </>
                        ) : order.status === "PENDING" ? (
                          <CancelButton
                            orderId={order.id}
                            onSuccess={handleStatusUpdated}
                          />
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-white/40 font-sarabun">
              แสดง {orders.length} จาก {meta.totalItems} รายการ
            </p>
            <div className="flex gap-1.5">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === meta.currentPage || isPending}
                    className={`w-8 h-8 rounded-lg text-sm font-sarabun transition-all duration-200 ${
                      page === meta.currentPage
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <AdminOrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </>
  );
}
