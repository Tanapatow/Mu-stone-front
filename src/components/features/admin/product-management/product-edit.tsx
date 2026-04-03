'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateProduct } from '@/lib/actions/admin.action';
import { Product, UpdateProductDto } from '@/lib/api/admin/admin.type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ProductProps = {
  product: Product;
};

export default function ProductEdit({ product }: ProductProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductDto>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      stoneType: product.stoneType,
      benefit: product.benefit,
    },
  });
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: UpdateProductDto) => {
    try {
      await updateProduct(data, product.id);
      setOpen(false);

      reset();
      console.log('แก้ไขสินค้าสำเร็จ');
    } catch (error) {
      console.log('แก้ไขสินค้าไม่สำเร็จ', error);
    }
  };
  return (
    <div className="flex-1">
      <Dialog open={open} onOpenChange={setOpen}>
        {/* ✅ Trigger */}
        <DialogTrigger asChild onClick={() => setOpen(!open)}>
          <button
            type="button"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-blue-400 text-xl font-medium text-blue-500 transition hover:bg-blue-50 hover:cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            แก้ไข
          </button>
        </DialogTrigger>

        {/* ✅ Content */}
        <DialogContent
          className="max-w-lg"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">แก้ไขสินค้า</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <p>ชื่อสินค้า</p>
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
            </div>

            <div>
              <p>รายละเอียดสินค้า</p>
              <textarea
                {...register('description')}
                placeholder="รายละเอียดสินค้า"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <p>ราคา</p>
              <input
                type="number"
                {...register('price', {
                  required: true,
                })}
                placeholder="ราคา"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <p>จำนวน</p>
              <input
                type="number"
                {...register('stock', { valueAsNumber: true })}
                placeholder="จำนวน"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <p>ประเภทหิน</p>
              <input
                {...register('stoneType')}
                placeholder="ประเภทหิน"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <p>ประโยชน์</p>
              <textarea
                {...register('benefit')}
                placeholder="ประโยชน์"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <p>รูปภาพสินค้า</p>
              <input
                type="file"
                multiple
                accept="image/*"
                {...register('images')}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2 text-white hover:cursor-pointer disabled:cursor-not-allowed 
             disabled:opacity-50 "
              >
                {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
