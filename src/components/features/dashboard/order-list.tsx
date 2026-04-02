"use client";

import { useState } from "react";
import Image from "next/image";
import type { Order, OrderTab } from "@/lib/api/order/order.type";
import {
  ORDER_STATUS_CONFIG,
  ORDER_TABS,
} from "@/lib/constants/order.constanct";
import OrderDetail from "./order-detail";

type OrderListProps = {
  orders: Order[];
};

export default function OrderList({ orders }: OrderListProps) {
  const [activeTab, setActiveTab] = useState<OrderTab>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/10 overflow-x-auto">
        {ORDER_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2.5 text-xs font-['Sarabun'] whitespace-nowrap transition-all duration-200 border-b-2"
            style={{
              color: activeTab === key ? "#c9a227" : "rgba(245,240,232,0.4)",
              borderBottomColor: activeTab === key ? "#c9a227" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-white/30 font-['Sarabun'] text-lg">
            ไม่มีคำสั่งซื้อ
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => {
            const status = ORDER_STATUS_CONFIG[order.status];
            const date = new Date(order.createdAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div
                key={order.id}
                className="flex flex-col gap-4 p-5 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,162,39,0.1)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/50 font-['Sarabun']">
                      ORDER ID: #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-white/30 font-['Sarabun']">
                      {date}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-['Sarabun'] font-semibold"
                    style={{
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}`,
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3">
                  {order.items.map((item) => {
                    const image = item.product.imageUrl ?? "/placeholder.png";
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-['Sarabun'] text-[#f5f0e8] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-white/40 font-['Sarabun']">
                            จำนวน {item.quantity} ชิ้น
                          </p>
                        </div>
                        <p className="text-lg font-semibold font-['Sarabun'] text-[#c9a227] shrink-0">
                          ฿
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="text-xs text-white/30 font-['Sarabun'] truncate flex-1 mr-4">
                    {order.shippingAddressSnapshot.split("\n")[0]}
                  </p>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-lg font-semibold font-['Sarabun'] text-[#f5f0e8]">
                      ฿{Number(order.totalAmount).toLocaleString()}
                    </p>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs font-['Sarabun'] text-[#c9a227] hover:text-[#f5f0e8] transition-colors"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
