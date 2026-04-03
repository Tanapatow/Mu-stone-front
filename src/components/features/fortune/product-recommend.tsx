"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Loader, Check } from "lucide-react";
import { addToCart } from "@/lib/actions/cart.action";

type ProductRecommendProps = {
  productId: string;
  productImage: string;
  productName: string;
  price: number;
};

export default function ProductRecommend({
  productId,
  productName,
  productImage,
  price,
}: ProductRecommendProps) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addToCart(productId);
      if (res.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    });
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
        border: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      {/* Image */}
      <Link
        href={`/shop/${productId}`}
        className="relative w-full aspect-square"
      >
        <Image
          src={productImage}
          alt={productName}
          fill
          className="object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/shop/${productId}`}
            className="text-sm font-['Sarabun'] text-cream hover:text-gold transition-colors line-clamp-2 flex-1"
          >
            {productName}
          </Link>
          <p className="text-sm font-semibold font-['Sarabun'] text-gold shrink-0">
            ฿{Number(price).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="w-full py-2 rounded-xl border-0 font-['Sarabun'] font-semibold text-sm text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
            boxShadow: isPending ? "none" : "0 4px 20px rgba(201,162,39,0.35)",
          }}
        >
          {isPending ? (
            <>
              <Loader size={13} className="animate-spin" /> กำลังเพิ่ม...
            </>
          ) : added ? (
            <>
              <Check size={13} /> เพิ่มแล้ว!
            </>
          ) : (
            <>
              <ShoppingCart size={13} /> เพิ่มลงตะกร้า
            </>
          )}
        </button>
      </div>
    </div>
  );
}
