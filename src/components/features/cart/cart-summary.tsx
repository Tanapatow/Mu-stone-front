"use client";

import { useState, useTransition } from "react";
import { CreditCard, MapPin, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cart } from "@/lib/api/cart/cart.type";
import type { Address } from "@/lib/api/user/address/address.type";
import { checkout } from "@/lib/actions/order.action";

type CartSummaryProps = {
  cart: Cart | null;
  address: Address | null;
};

export default function CartSummary({ cart, address }: CartSummaryProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    console.log("handleCheckout called", { address, hasItems });
    startTransition(async () => {
      console.log("startTransition running");
      const res = await checkout();
      console.log("checkout result:", res);
      if (res.success && res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    });
  };
  const hasItems = cart && cart.items.length > 0;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden sticky top-24"
      style={{
        background:
          "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
        border: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="font-['Sarabun'] text-lg text-[#f5f0e8]">
          ยอดที่ต้องชำระ
        </p>
        <p className="text-2xl font-bold font-['Sarabun'] text-[#c9a227] mt-1">
          ฿{Number(cart?.totalPrice ?? 0).toLocaleString()}
        </p>
        <p className="text-xs text-white/30 font-['Sarabun'] mt-0.5">
          ยืนยันคำสั่งซื้อ
        </p>
      </div>

      {/* Address */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#c9a227]" />
            <p className="text-xs text-white/40 font-['Sarabun']">
              ที่อยู่จัดส่ง
            </p>
          </div>
        </div>

        {address ? (
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-semibold font-['Sarabun'] text-[#f5f0e8]">
              {address.receiverName} · {address.phone}
            </p>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.addressLine1}
            </p>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.subDistrict} {address.district} {address.province}{" "}
              {address.postalCode}
            </p>
          </div>
        ) : (
          <p className="text-xs text-white/30 font-['Sarabun']">
            ยังไม่มีที่อยู่จัดส่ง กรุณากรอกด้านซ้าย
          </p>
        )}
      </div>

      {/* Payment method */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <CreditCard size={13} className="text-[#c9a227]" />
          <p className="text-xs text-white/40 font-['Sarabun']">วิธีชำระเงิน</p>
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="w-8 h-5 bg-white rounded flex items-center justify-center shrink-0">
            <span className="text-[#635bff] font-bold text-[9px]">X</span>
          </div>
          <p className="text-xs text-white/60 font-['Sarabun']">
            บัตรเครดิต / เดบิต / PromptPay
          </p>
        </div>
      </div>

      {/* Items summary */}
      {hasItems && (
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-1.5">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-xs font-['Sarabun'] text-white/40"
              >
                <span className="truncate flex-1 mr-2">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="shrink-0">
                  ฿
                  {(
                    Number(item.product.price) * item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex justify-between text-lg font-['Sarabun'] mt-3 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-white/50">ยอดรวม</span>
            <span className="text-[#f5f0e8] font-semibold">
              ฿{Number(cart.totalPrice).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Checkout button */}
      <div className="px-5 py-4 flex flex-col gap-2">
        {error && (
          <p className="text-xs text-red-400 font-['Sarabun'] text-center">
            {error}
          </p>
        )}
        <Button
          onClick={handleCheckout}
          disabled={!address || !hasItems || isPending}
          className="w-full py-3 rounded-xl border-0 font-['Sarabun'] font-semibold text-lg text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
            boxShadow:
              address && hasItems ? "0 4px 20px rgba(201,162,39,0.35)" : "none",
          }}
        >
          {isPending ? "กำลังดำเนินการ..." : "สั่งซื้อสินค้าในตะกร้า"}
        </Button>

        {!address && (
          <p className="text-xs text-white/30 font-['Sarabun'] text-center">
            กรุณากรอกที่อยู่จัดส่งก่อนชำระเงิน
          </p>
        )}
      </div>
    </div>
  );
}
