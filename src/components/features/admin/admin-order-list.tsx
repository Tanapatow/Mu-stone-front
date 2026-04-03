"use client";

import { useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type {
  AdminOrder,
  AdminOrderMeta,
} from "@/lib/api/order/admin-order.type";
import type { Order, OrderStatus } from "@/lib/api/order/order.type";
import { getAdminOrders, getOrderById } from "@/lib/actions/order.action";
import AdminOrderDetail from "./admin-order-detail";
import {
  ORDER_STATUS_CONFIG,
  ORDER_TABS,
} from "@/lib/constants/order.constanct";

type AdminOrderListProps = {
  initialOrders: AdminOrder[];
  initialMeta: AdminOrderMeta;
};

export default function AdminOrderList({
  initialOrders,
  initialMeta,
}: AdminOrderListProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [meta, setMeta] = useState(initialMeta);
  const [activeTab, setActiveTab] = useState<"ALL" | OrderStatus>("ALL");
  const [isPending, startTransition] = useTransition();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = (status?: OrderStatus, page = 1) => {
    startTransition(async () => {
      const res = await getAdminOrders({ status, page, limit: 10 });
      setOrders(res.orders);
      setMeta(res.meta);
    });
  };

  const handleTabChange = (tab: "ALL" | OrderStatus) => {
    setActiveTab(tab);
    fetchOrders(tab === "ALL" ? undefined : tab, 1);
  };

  const handlePageChange = (page: number) => {
    fetchOrders(activeTab === "ALL" ? undefined : activeTab, page);
  };

  const handleView = (orderId: string) => {
    startTransition(async () => {
      const order = await getOrderById(orderId);
      if (order) setSelectedOrder(order);
    });
  };

  const handleStatusUpdated = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10 overflow-x-auto">
          {ORDER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() =>
                handleTabChange(key === "ALL" ? "ALL" : (key as OrderStatus))
              }
              className="px-4 py-2.5 text-xs font-['Sarabun'] whitespace-nowrap transition-all duration-200 border-b-2"
              style={{
                color: activeTab === key ? "#c9a227" : "rgba(245,240,232,0.4)",
                borderBottomColor:
                  activeTab === key ? "#c9a227" : "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_1.5fr_0.8fr_0.8fr_1fr_auto] gap-4 px-4 py-2">
          {["Order ID", "ลูกค้า", "จำนวน", "ยอดรวม", "สถานะ", ""].map(
            (h, i) => (
              <p key={i} className="text-xs text-white/30 font-['Sarabun']">
                {h}
              </p>
            ),
          )}
        </div>

        {/* Orders */}
        <div
          className={`transition-opacity duration-200 flex flex-col gap-2 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          {orders.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-white/30 font-['Sarabun'] text-sm">
                ไม่มีคำสั่งซื้อ
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const status = ORDER_STATUS_CONFIG[order.status];
              const date = new Date(order.createdAt).toLocaleDateString(
                "th-TH",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <div
                  key={order.id}
                  className="grid grid-cols-[1fr_1.5fr_0.8fr_0.8fr_1fr_auto] gap-4 items-center px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,162,39,0.1)",
                  }}
                >
                  {/* Order ID */}
                  <div>
                    <p className="text-xs text-cream font-['Sarabun']">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-white/30 font-['Sarabun']">
                      {date}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="min-w-0">
                    <p className="text-sm text-cream font-['Sarabun'] truncate">
                      {order.user.firstName} {order.user.lastName}
                    </p>
                    <p className="text-xs text-white/30 font-['Sarabun'] truncate">
                      {order.user.email}
                    </p>
                  </div>

                  {/* Items count */}
                  <p className="text-xs text-white/50 font-['Sarabun']">
                    {order._count.items} รายการ
                  </p>

                  {/* Total */}
                  <p className="text-sm font-semibold text-gold font-['Sarabun']">
                    ฿{Number(order.totalAmount).toLocaleString()}
                  </p>

                  {/* Status */}
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-['Sarabun'] font-semibold w-fit"
                    style={{
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}`,
                    }}
                  >
                    {status.label}
                  </span>

                  {/* View */}
                  <button
                    onClick={() => handleView(order.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] text-white/50 hover:text-cream transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Eye size={12} />
                    ดู
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <p className="text-xs text-white/30 font-['Sarabun']">
              แสดง {meta.itemCount} จาก {meta.totalItems} รายการ
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(meta.currentPage - 1)}
                disabled={!meta.hasPreviousPage || isPending}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={isPending}
                    className="w-8 h-8 rounded-lg text-xs font-['Sarabun'] transition-all"
                    style={{
                      background:
                        meta.currentPage === page
                          ? "linear-gradient(135deg, #c9a227, #7a5c0a)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        meta.currentPage === page
                          ? "#0b0e2a"
                          : "rgba(245,240,232,0.45)",
                      border: "1px solid rgba(201,162,39,0.2)",
                    }}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(meta.currentPage + 1)}
                disabled={!meta.hasNextPage || isPending}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order detail modal */}
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
