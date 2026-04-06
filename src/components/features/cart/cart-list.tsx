"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { removeFromCart, updateQuantity } from "@/lib/actions/cart.action";
import type { Cart } from "@/lib/api/cart/cart.type";

type CartListProps = {
  cart: Cart | null;
};

export default function CartList({ cart }: CartListProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    startTransition(async () => {
      await updateQuantity(productId, quantity);
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      await removeFromCart(productId);
    });
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-white/30 font-sarabun text-lg">
          ตะกร้าสินค้าว่างเปล่า
        </p>
        <Link
          href="/shop"
          className="text-xs text-gold font-sarabun hover:text-cream transition-colors"
        >
          เลือกซื้อสินค้า →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {cart.items.map((item) => {
        const image =
          item.product.images.find((img) => img.isMain)?.url ??
          item.product.images[0]?.url ??
          "/placeholder.png";
        return (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
              border: "1px solid rgba(201,162,39,0.15)",
              opacity: isPending ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/shop/${item.productId}`}>
                <p className="text-lg font-sarabun text-[#f5f0e8] truncate hover:text-[#c9a227] transition-colors">
                  {item.product.name}
                </p>
              </Link>
              <p className="text-xs text-[#c9a227] font-sarabun mt-0.5">
                ฿{Number(item.product.price).toLocaleString()}
              </p>
            </div>

            <div
              className="flex items-center rounded-lg overflow-hidden shrink-0"
              style={{ border: "1px solid rgba(201,162,39,0.2)" }}
            >
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, item.quantity - 1)
                }
                disabled={isPending || item.quantity <= 1}
                className="w-8 h-8 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-sarabun text-[#f5f0e8]">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, item.quantity + 1)
                }
                disabled={isPending || item.quantity >= item.product.stock}
                className="w-8 h-8 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>

            <p className="text-lg font-semibold font-sarabun text-[#f5f0e8] w-20 text-right shrink-0">
              ฿{(Number(item.product.price) * item.quantity).toLocaleString()}
            </p>

            <button
              onClick={() => handleRemove(item.productId)}
              disabled={isPending}
              className="text-white/20 hover:text-red-400 transition-colors shrink-0 disabled:opacity-30"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
