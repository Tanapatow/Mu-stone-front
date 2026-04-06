"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProduct } from "@/lib/actions/admin.action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Plus } from "lucide-react";

type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  stock: number;
  stoneType: string;
  benefit: string;
  images: File[];
};

const inputClass =
  "px-3 py-2.5 rounded-xl text-sm w-full bg-white/5 text-cream border border-gold/20 placeholder:text-white/20 font-sarabun transition-all duration-200 focus:outline-none focus:border-gold/55 [color-scheme:dark]";
const labelClass = "text-xs text-white/55 font-sarabun tracking-wide";

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
    } catch (error) {
      console.error("สร้างสินค้าไม่สำเร็จ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sarabun font-semibold text-navy bg-gradient-to-br from-gold to-gold-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer">
          <Plus size={15} />
          เพิ่มสินค้า
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-lg bg-gradient-to-br from-[#1a144a] to-[#0b082a] border border-gold/15 text-cream"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="font-sarabun text-gold">
            สร้างสินค้า
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>ชื่อสินค้า</label>
            <input
              {...register("name", { required: true })}
              placeholder="ชื่อสินค้า"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-red-400 font-sarabun">
                กรอกชื่อสินค้า
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>รายละเอียด</label>
            <textarea
              {...register("description")}
              placeholder="รายละเอียด"
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>ราคา</label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="ราคา"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>จำนวน</label>
              <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                placeholder="จำนวน"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>ประเภทหิน</label>
            <input
              {...register("stoneType")}
              placeholder="ประเภทหิน"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>ประโยชน์</label>
            <textarea
              {...register("benefit")}
              placeholder="ประโยชน์"
              rows={2}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>รูปภาพสินค้า</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังเพิ่มสินค้า...
              </span>
            ) : (
              "บันทึก"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
