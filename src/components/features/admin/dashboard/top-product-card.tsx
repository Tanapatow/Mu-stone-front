'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopSellerProduct } from '@/lib/api/admin/dashboard/dashboard.type';
import { Star } from 'lucide-react';
import Image from 'next/image';

type TopProductsCardProps = {
  data: TopSellerProduct[];
};

export function TopProductsCard({ data }: TopProductsCardProps) {
  return (
    <Card
      className="rounded-3xl border border-muted/50 shadow-sm"
      style={{
        background:
          'linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)',
        border: '1px solid rgba(201,162,39,0.15)',
      }}
    >
      <CardHeader className="pb-2 px-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gold font-['Sarabun']">
          <Star className="w-5 h-5 text-gold fill-gold/20 stroke-2" />
          สินค้าขายดี 5 อันดับแรก
        </CardTitle>
      </CardHeader>

      <CardContent className="px-7 flex flex-col gap-6">
        {data?.length === 0 && (
          <p className="text-center text-white/20 py-10 font-['Sarabun']">
            ยังไม่มีข้อมูลสินค้าขายดี
          </p>
        )}

        {data?.map((product, index) => {
          const isFirstItem = index === 0;

          // 🌟 1. ต้องประกาศ displayImage ตรงนี้ครับ (ใส่รูปรองรับไว้เผื่อ API ไม่ส่งรูปมา)
          const displayImage =
            product.imageUrl ||
            'https://images.unsplash.com/photo-1586528116311-ad8ed80b561c?w=150&h=150&fit=crop&q=80';

          return (
            <div
              key={product.productId}
              className="flex items-center justify-between"
            >
              {/* ด้านซ้าย: รูปภาพ + ชื่อสินค้า */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-white/5 relative">
                  <Image
                    src={displayImage}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold text-cream font-['Sarabun']">
                    {product.name}
                  </p>
                  {isFirstItem && (
                    <p className="text-[10px] text-white/40 font-['Sarabun'] mt-0.5">
                      ชื่อสินค้า
                    </p>
                  )}
                </div>
              </div>

              {/* ด้านขวา: ยอดขาย */}
              <div className="text-right flex flex-col justify-center">
                <p className="text-2xl font-bold text-gold font-['Sarabun']">
                  {/* 🌟 2. เปลี่ยนจาก product.sales เป็น product.totalSold */}
                  {product.totalSold?.toLocaleString() || 0}
                </p>
                {isFirstItem && (
                  <p className="text-[10px] text-white/40 font-['Sarabun'] mt-0.5">
                    จำนวนที่ขายได้
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
