"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition, useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/actions/cart.action";
import type { Cart } from "@/lib/api/cart/cart.type";
import { Button } from "@/components/ui/button";

type CartSlidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSlidePanel({
  isOpen,
  onClose,
}: CartSlidePanelProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      startTransition(async () => {
        const data = await getCart();
        setCart(data);
      });
    }
  }, [isOpen]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    startTransition(async () => {
      await updateQuantity(productId, quantity);
      const data = await getCart();
      setCart(data);
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      await removeFromCart(productId);
      const data = await getCart();
      setCart(data);
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-300"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.98) 0%, rgba(11,8,42,0.99) 100%)",
          borderLeft: "1px solid rgba(201,162,39,0.2)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-[#c9a227]" />
            <h2 className="font-['Sarabun'] text-lg text-[#f5f0e8]">
              ตะกร้าสินค้า
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/8 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <ShoppingBag size={40} className="text-white/10" />
              <p className="text-white/30 font-['Sarabun'] text-lg">
                ตะกร้าสินค้าว่างเปล่า
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-xs text-[#c9a227] font-['Sarabun'] hover:text-[#f5f0e8] transition-colors"
              >
                เลือกซื้อสินค้า →
              </Link>
            </div>
          ) : (
            cart.items.map((item) => {
              const image =
                item.product.images.find((img) => img.isMain)?.url ??
                item.product.images[0]?.url ??
                "/placeholder.png";
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,162,39,0.1)",
                    opacity: isPending ? 0.6 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  <Link href={`/shop/${item.productId}`} onClick={onClose}>
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-['Sarabun'] text-[#f5f0e8] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[#c9a227] font-['Sarabun'] mt-0.5">
                      ฿{Number(item.product.price).toLocaleString()}
                    </p>
                    <div
                      className="flex items-center mt-1.5 rounded-lg overflow-hidden w-fit"
                      style={{ border: "1px solid rgba(201,162,39,0.2)" }}
                    >
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity - 1,
                          )
                        }
                        disabled={isPending || item.quantity <= 1}
                        className="w-6 h-6 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30 text-xs"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-['Sarabun'] text-[#f5f0e8]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity + 1,
                          )
                        }
                        disabled={
                          isPending || item.quantity >= item.product.stock
                        }
                        className="w-6 h-6 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-xs font-semibold font-['Sarabun'] text-[#f5f0e8]">
                      ฿
                      {(
                        Number(item.product.price) * item.quantity
                      ).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      disabled={isPending}
                      className="text-white/20 hover:text-red-400 transition-colors disabled:opacity-30"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="px-5 py-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex justify-between text-lg font-['Sarabun']">
              <span className="text-white/50">รวมทั้งหมด</span>
              <span className="text-[#f5f0e8] font-semibold">
                ฿{Number(cart.totalPrice).toLocaleString()}
              </span>
            </div>
            <Link href="/cart" onClick={onClose}>
              <Button
                className="w-full py-3 rounded-xl border-0 font-['Sarabun'] font-semibold text-lg text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                  boxShadow: "0 4px 20px rgba(201,162,39,0.35)",
                }}
              >
                ดำเนินการสั่งซื้อ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
