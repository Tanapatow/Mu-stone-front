'use client';

import { Pencil, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent } from 'react';
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

type ProductCardProps = {
  product: Product;
  onDelete: (id: string) => void;
  onUploadClick: (id: string) => void;
  onImageUpload: (id: string, event: ChangeEvent<HTMLInputElement>) => void;
  registerInputRef: (id: string, element: HTMLInputElement | null) => void;
};

const formatPrice = (price: number) => {
  return `฿${price.toFixed(2)}`;
};

export default function ProductCard({
  product,
  onDelete,
  onUploadClick,
  onImageUpload,
  registerInputRef,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-150 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
      <div className="relative h-60 w-full overflow-hidden rounded-lg bg-black">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />

        <button
          type="button"
          title="อัปโหลดรูป"
          onClick={() => onUploadClick(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white"
        >
          <Upload className="h-4 w-4" />
        </button>

        <input
          ref={(element) => registerInputRef(product.id, element)}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onImageUpload(product.id, event)}
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

        <div className="mt-4 flex items-center gap-3">
          {/* Edit Button */}
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400 text-xl font-medium text-blue-500 transition hover:bg-blue-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            แก้ไข
          </button>

          {/* Delete Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
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
