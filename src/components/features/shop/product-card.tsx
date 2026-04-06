"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api/product/product.type";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
  isLoggedIn?: boolean;
  onAddToCart?: (product: Product) => void;
};

const mainImage = (product: Product) =>
  product.images.find((img) => img.isMain)?.url ??
  product.images[0]?.url ??
  "/placeholder.png";

export default function ProductCard({
  product,
  isLoggedIn,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-[linear-gradient(160deg,rgba(26,20,74,0.8)_0%,rgba(11,8,42,0.9)_100%)] border border-[rgba(201,162,39,0.15)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(201,162,39,0.25)] transition-all duration-300">
      <Link href={`/shop/${product.id}`}>
        <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
          <Image
            src={mainImage(product)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(to_top,rgba(11,8,42,0.7)_0%,transparent_60%)]" />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-sarabun text-cream truncate">
          {product.name}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold font-sarabun text-gold">
            ฿{product.price.toLocaleString()}
          </span>

          <span className="text-xs text-white/35 font-sarabun">
            คงเหลือ {product.stock}
          </span>
        </div>

        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!isLoggedIn || product.stock === 0}
          className="w-full py-2 rounded-lg mt-1 font-sarabun text-xs font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed bg-[linear-gradient(135deg,#c9a227_0%,#7a5c0a_100%)] shadow-[0_2px_12px_rgba(201,162,39,0.25)]"
        >
          <ShoppingCart size={13} className="mr-1.5 inline" />

          {product.stock === 0
            ? "สินค้าหมด"
            : isLoggedIn
              ? "เพิ่มลงตะกร้า"
              : "เข้าสู่ระบบเพื่อซื้อ"}
        </Button>
      </div>
    </div>
  );
}
