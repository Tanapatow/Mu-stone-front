'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Product } from '@/lib/api/admin/admin.type';
import ProductEdit from './product-edit';

type ProductCardProps = {
  product: Product;
  onDelete: (id: string) => void;
};

const formatPrice = (price: number) => {
  return `฿ ${price.toFixed(2)}`;
};

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="w-full max-w-150 rounded-lg bg-white">
      <div className="relative h-60 w-full overflow-hidden rounded-lg bg-black">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="px-4 pb-4 pt-3">
        <h2 className="truncate text-lg font-medium text-neutral-600 underline underline-offset-2">
          {product.name}
        </h2>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-[#d8a62b]">
            {formatPrice(Number(product.price))}
          </p>
          <p className="text-sm text-neutral-400">
            คงเหลือ {product.stock} ชิ้น
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 w-full">
          {/* Edit Dialog */}
          <ProductEdit product={product} />

          {/* Delete Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-red-400 text-xl text-red-500 transition hover:bg-red-50 hover:cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                ลบ
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>ยืนยันการลบสินค้า</DialogTitle>
                <DialogDescription>
                  คุณต้องการลบสินค้า {product.name} ใช่หรือไม่
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">ยกเลิก</Button>
                </DialogClose>
                <Button
                  onClick={() => onDelete(product.id)}
                  variant="destructive"
                >
                  ยืนยัน
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <p className="sr-only">{product.description}</p>
      </div>
    </div>
  );
}
