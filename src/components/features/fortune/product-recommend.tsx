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
  fortuneId?: string | null;
};

export default function ProductRecommend({
  productId,
  productName,
  productImage,
  price,
  fortuneId,
}: ProductRecommendProps) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const backUrl = fortuneId
    ? `/fortune/predict?id=${fortuneId}`
    : "/fortune/predict";

  const productUrl = `/shop/${productId}?back=${encodeURIComponent(backUrl)}`;

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
    <div className="card-glass flex flex-col p-0 overflow-hidden hover:-translate-y-1 transition-all duration-200">
      <Link href={productUrl} className="relative w-full aspect-square">
        <Image
          src={productImage}
          alt={productName}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={productUrl}
            className="text-sm font-sarabun text-cream hover:text-gold transition-colors line-clamp-2 flex-1"
          >
            {productName}
          </Link>
          <p className="text-sm font-semibold font-sarabun text-gold shrink-0">
            ฿{Number(price).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="w-full py-2 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark shadow-[0_4px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader size={13} className="animate-spin" />
              กำลังเพิ่ม...
            </>
          ) : added ? (
            <>
              <Check size={13} />
              เพิ่มแล้ว!
            </>
          ) : (
            <>
              <ShoppingCart size={13} />
              เพิ่มลงตะกร้า
            </>
          )}
        </button>
      </div>
    </div>
  );
}
