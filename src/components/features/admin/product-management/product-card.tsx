"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/lib/api/admin/admin.type";
import ProductEdit from "./product-edit";

type ProductCardProps = {
  product: Product;
  onDelete: (id: string) => void;
};

const formatPrice = (price: number) => `฿ ${price.toFixed(2)}`;

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="card-glass flex flex-col gap-4 p-0 overflow-hidden">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        <h2 className="truncate text-base font-semibold text-cream font-sarabun">
          {product.name}
        </h2>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gold font-sarabun">
            {formatPrice(Number(product.price))}
          </p>
          <p className="text-xs text-white/40 font-sarabun">
            คงเหลือ {product.stock} ชิ้น
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          <ProductEdit product={product} />

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-sarabun font-medium text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                ลบ
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-[#1a144a] to-[#0b082a] border border-gold/15 text-cream">
              <DialogHeader>
                <DialogTitle className="font-sarabun text-gold">
                  ยืนยันการลบสินค้า
                </DialogTitle>
                <DialogDescription className="font-sarabun text-white/50">
                  คุณต้องการลบสินค้า {product.name} ใช่หรือไม่?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="font-sarabun border-white/20 text-white/70 hover:bg-white/10"
                  >
                    ยกเลิก
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => onDelete(product.id)}
                  variant="destructive"
                  className="font-sarabun"
                >
                  ยืนยัน
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
