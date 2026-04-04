"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/schemas/user.schema";
import { updateProfile } from "@/lib/actions/user.action";
import type { User } from "@/lib/api/user/user.type";

type AccountFormProps = {
  user: User;
};

const inputClass =
  "px-3 py-2.5 rounded-xl text-sm w-full bg-white/5 text-cream border border-gold/20 placeholder:text-white/20 font-['Sarabun'] transition-all duration-200 focus:outline-none focus:border-gold/55 colorScheme-dark";
const labelClass = "text-xs text-white/55 font-['Sarabun'] tracking-wide";

export default function AdminAccount({ user }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob ? user.dob.split("T")[0] : "",
      gender: user.gender,
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit = (data: UpdateProfileInput) => {
    startTransition(async () => {
      const res = await updateProfile(data);
      if (!res.success) {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {errors.root && (
        <p className="text-xs text-red-400 font-['Sarabun']">
          {errors.root.message}
        </p>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>อีเมล</label>
        <input
          value={user.email}
          disabled
          className={`${inputClass} opacity-40 cursor-not-allowed`}
        />
      </div>

      {/* firstName + lastName */}
      <div className="flex gap-3">
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>ชื่อ</label>
              <input {...field} placeholder="ชื่อ" className={inputClass} />
              {fieldState.invalid && (
                <p className="text-xs text-red-400 font-['Sarabun']">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>นามสกุล</label>
              <input {...field} placeholder="นามสกุล" className={inputClass} />
              {fieldState.invalid && (
                <p className="text-xs text-red-400 font-['Sarabun']">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* DOB + Gender */}
      <div className="flex gap-3">
        <Controller
          control={control}
          name="dob"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>วันเกิด</label>
              <input
                {...field}
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-400 font-['Sarabun']">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5 flex-1">
              <label className={labelClass}>เพศ</label>
              <select
                {...field}
                className={`${inputClass} [color-scheme:dark]`}
              >
                <option value="MALE">ชาย</option>
                <option value="FEMALE">หญิง</option>
                <option value="OTHER">อื่นๆ</option>
              </select>
              {fieldState.invalid && (
                <p className="text-xs text-red-400 font-['Sarabun']">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 rounded-xl font-['Sarabun'] font-semibold text-sm text-navy bg-gradient-to-br from-gold to-[#7a5c0a] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-2"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader size={14} className="animate-spin" />
            กำลังบันทึก...
          </span>
        ) : (
          "อัปเดตข้อมูล"
        )}
      </button>
    </form>
  );
}
