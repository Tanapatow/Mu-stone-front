"use client";

import { TopSellerProduct } from "@/lib/api/admin/dashboard/dashboard.type";
import { Star } from "lucide-react";
import Image from "next/image";

type TopProductsCardProps = {
  data: TopSellerProduct[];
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586528116311-ad8ed80b561c?w=150&h=150&fit=crop&q=80";

export function TopProductsCard({ data }: TopProductsCardProps) {
  return (
    <div className="card-glass flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-gold fill-gold/20" />
        <p className="text-lg font-semibold text-gold font-sarabun">
          สินค้าขายดี 5 อันดับแรก
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {data?.length === 0 ? (
        <p className="text-center text-white/20 py-10 font-sarabun">
          ยังไม่มีข้อมูลสินค้าขายดี
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {data?.map((product, index) => (
            <div
              key={product.productId}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30 font-sarabun w-4 text-center">
                  {index + 1}
                </span>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/5 relative">
                  <Image
                    src={product.imageUrl || FALLBACK_IMAGE}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-cream font-sarabun line-clamp-1">
                    {product.name}
                  </p>
                  {product.stoneType && (
                    <p className="text-xs text-white/30 font-sarabun">
                      {product.stoneType}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-base font-bold text-gold font-sarabun">
                  {product.totalSold?.toLocaleString() ?? 0}
                </p>
                <p className="text-[10px] text-white/30 font-sarabun">ชิ้น</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
