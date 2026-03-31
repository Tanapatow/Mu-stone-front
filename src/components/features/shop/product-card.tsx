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
    <div
      className="group relative flex flex-col rounded-xl overflow-hidden" // ลบ hover:-translate-y-1 ออก
      style={{
        background:
          "linear-gradient(160deg, rgba(26,20,74,0.8) 0%, rgba(11,8,42,0.9) 100%)",
        border: "1px solid rgba(201,162,39,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,162,39,0.25)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)")
      }
    >
      <Link href={`/shop/${product.id}`}>
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
          <Image
            src={mainImage(product)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(11,8,42,0.7) 0%, transparent 60%)",
            }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-['Sarabun'] text-cream truncate">
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-semibold font-['Sarabun']"
            style={{ color: "#c9a227" }}
          >
            ฿{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-white/35 font-['Sarabun']">
            คงเหลือ {product.stock}
          </span>
        </div>

        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!isLoggedIn || product.stock === 0}
          className="
        w-full py-2 rounded-lg border-0 mt-1
        font-['Sarabun'] text-xs font-semibold
        text-navy transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-lg  
        active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer
      "
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
            boxShadow: isLoggedIn ? "0 2px 12px rgba(201,162,39,0.25)" : "none",
          }}
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
