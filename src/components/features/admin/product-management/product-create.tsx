'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createProduct } from '@/lib/actions/admin.action';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  stock: number;
  stoneType: string;
  benefit: string;
  images: File[];
};

export default function ProductCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductDTO>();
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: CreateProductDTO) => {
    try {
      await createProduct(data);
      setOpen(false);

      reset();
      console.log('สร้างสินค้าสำเร็จ');
    } catch (error) {
      console.log('สร้างสินค้าไม่สำเร็จ', error);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* ✅ Trigger */}
        <DialogTrigger asChild onClick={() => setOpen(!open)}>
          <button className="h-14 rounded-2xl bg-primary px-7 text-[18px] font-medium text-white transition hover:bg-primary/80 hover:cursor-pointer">
            + เพิ่มสินค้า
          </button>
        </DialogTrigger>

        {/* ✅ Content */}
        <DialogContent
          className="max-w-lg"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>สร้างสินค้า</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register('name', { required: true })}
              placeholder="ชื่อสินค้า"
              className="w-full rounded-lg border px-3 py-2"
            />
            {errors.name && (
              <p className="text-white bg-red-500 p-2 rounded-lg text-xs">
                กรอกชื่อสินค้า
              </p>
            )}

            <textarea
              {...register('description')}
              placeholder="รายละเอียด"
              className="w-full rounded-lg border px-3 py-2"
            />

            <input
              type="number"
              {...register('price', {
                required: true,
              })}
              placeholder="ราคา"
              className="w-full rounded-lg border px-3 py-2"
            />

            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              placeholder="จำนวน"
              className="w-full rounded-lg border px-3 py-2"
            />

            <input
              {...register('stoneType')}
              placeholder="ประเภทหิน"
              className="w-full rounded-lg border px-3 py-2"
            />

            <textarea
              {...register('benefit')}
              placeholder="ประโยชน์"
              className="w-full rounded-lg border px-3 py-2"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              {...register('images')}
              className="w-full rounded-lg border px-3 py-2"
            />

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2 text-white hover:cursor-pointer disabled:cursor-not-allowed 
             disabled:opacity-50 "
              >
                {isSubmitting ? 'กำลังเพิ่มสินค้า...' : 'บันทึก'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
