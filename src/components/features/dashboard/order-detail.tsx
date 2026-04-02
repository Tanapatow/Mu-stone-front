"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { Order } from "@/lib/api/order/order.type";
import { ORDER_STATUS_CONFIG } from "@/lib/constants/order.constanct";

type OrderDetailProps = {
  order: Order;
  onClose: () => void;
};

export default function OrderDetail({ order, onClose }: OrderDetailProps) {
  const status = ORDER_STATUS_CONFIG[order.status];
  const date = new Date(order.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.98) 0%, rgba(11,8,42,0.99) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0"
          style={{
            background: "rgba(11,8,42,0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p className="font-['Sarabun'] text-lg text-[#f5f0e8]">
              #{order.id.slice(0, 8).toUpperCase()}
            </p>
            <p className="text-xs text-white/30 font-['Sarabun'] mt-0.5">
              {date}
            </p>
          </div>
          <div className="flex items-center gap-3">
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
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/8 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Items */}
          <div>
            <p className="text-xs text-white/40 font-['Sarabun'] mb-3">
              รายการสินค้า ({order.items.length} รายการ)
            </p>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => {
                const image = item.product.imageUrl ?? "/placeholder.png";
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
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
                        ฿{Number(item.price).toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-semibold font-['Sarabun'] text-[#c9a227] shrink-0">
                      ฿{(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping address */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs text-white/40 font-['Sarabun'] mb-2">
              ที่อยู่จัดส่ง
            </p>
            {order.shippingAddressSnapshot.split("\n").map((line, i) => (
              <p key={i} className="text-xs text-white/60 font-['Sarabun']">
                {line}
              </p>
            ))}
          </div>

          {/* Total */}
          <div
            className="flex justify-between items-center p-4 rounded-xl"
            style={{
              background: "rgba(201,162,39,0.05)",
              border: "1px solid rgba(201,162,39,0.15)",
            }}
          >
            <p className="text-lg text-white/50 font-['Sarabun']">
              ยอดรวมทั้งหมด
            </p>
            <p className="text-lg font-bold font-['Sarabun'] text-[#c9a227]">
              ฿{Number(order.totalAmount).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
