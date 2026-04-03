"use client";

import { useState, useTransition } from "react";
import { X, Package } from "lucide-react";
import Image from "next/image";
import type { Order, OrderStatus } from "@/lib/api/order/order.type";
import { updateOrderStatus } from "@/lib/actions/order.action";
import { ORDER_STATUS_CONFIG } from "@/lib/constants/order.constanct";

type AdminOrderDetailProps = {
  order: Order;
  onClose: () => void;
  onStatusUpdated: (orderId: string, status: OrderStatus) => void;
};

const STATUS_STEPS: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "CANCELLED"];

export default function AdminOrderDetail({
  order,
  onClose,
  onStatusUpdated,
}: AdminOrderDetailProps) {
  const [pendingStatus, setPendingStatus] = useState<OrderStatus>(order.status);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const date = new Date(order.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleStatusChange = (status: OrderStatus) => {
    startTransition(async () => {
      const res = await updateOrderStatus(order.id, status);
      if (res.success) {
        setCurrentStatus(status);
        setPendingStatus(status);
        onStatusUpdated(order.id, status);
      } else {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  const statusConfig = ORDER_STATUS_CONFIG[currentStatus];

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
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
            <p className="font-['Cinzel_Decorative'] text-sm text-cream">
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
                background: statusConfig.bg,
                color: statusConfig.color,
                border: `1px solid ${statusConfig.color}`,
              }}
            >
              {statusConfig.label}
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
          {error && (
            <p className="text-xs text-red-400 font-['Sarabun']">{error}</p>
          )}

          {/* Status update */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs text-white/40 font-['Sarabun'] mb-3">
              อัปเดตสถานะ
            </p>
            <div className="flex gap-2 flex-wrap mb-3">
              {STATUS_STEPS.filter((s) => s !== "PENDING").map((status) => {
                const config = ORDER_STATUS_CONFIG[status];
                const isSelected = pendingStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => setPendingStatus(status)}
                    disabled={currentStatus === "CANCELLED"}
                    className="px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: isSelected
                        ? config.bg
                        : "rgba(255,255,255,0.05)",
                      color: isSelected
                        ? config.color
                        : "rgba(245,240,232,0.4)",
                      border: `1px solid ${isSelected ? config.color : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Save button — แสดงเฉพาะเมื่อเลือกสถานะใหม่ที่ต่างจากปัจจุบัน */}
            {pendingStatus !== currentStatus && (
              <button
                onClick={() => handleStatusChange(pendingStatus)}
                disabled={isPending}
                className="w-full py-2 rounded-xl text-sm font-['Sarabun'] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                  boxShadow: "0 4px 20px rgba(201,162,39,0.35)",
                }}
              >
                {isPending ? "กำลังบันทึก..." : "บันทึกสถานะ"}
              </button>
            )}
          </div>
          {/* Customer info */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs text-white/40 font-['Sarabun'] mb-2">
              ข้อมูลลูกค้า
            </p>
            <p className="text-sm font-semibold text-cream font-['Sarabun']">
              {order.user?.firstName} {order.user?.lastName}
            </p>
            <p className="text-xs text-white/40 font-['Sarabun']">
              {order.user?.email}
            </p>
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

          {/* Items */}
          <div>
            <p className="text-xs text-white/40 font-['Sarabun'] mb-3">
              รายการสินค้า ({order.items.length} รายการ)
            </p>
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    {item.product.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Package size={16} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream font-['Sarabun'] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-white/40 font-['Sarabun']">
                      ฿{Number(item.price).toLocaleString()} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gold font-['Sarabun'] shrink-0">
                    ฿{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div
            className="flex justify-between items-center p-4 rounded-xl"
            style={{
              background: "rgba(201,162,39,0.05)",
              border: "1px solid rgba(201,162,39,0.15)",
            }}
          >
            <p className="text-sm text-white/50 font-['Sarabun']">
              ยอดรวมทั้งหมด
            </p>
            <p className="text-lg font-bold text-gold font-['Sarabun']">
              ฿{Number(order.totalAmount).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
