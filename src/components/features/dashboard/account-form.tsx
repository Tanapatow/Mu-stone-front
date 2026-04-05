"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
  "px-3 py-2.5 rounded-xl text-sm w-full bg-white/5 text-cream border border-gold/20 placeholder:text-white/20 font-sarabun transition-all duration-200 focus-visible:ring-0 focus-visible:border-gold/55 [color-scheme:dark]";

const labelClass = "text-xs text-cream/55 font-sarabun tracking-wide";

export default function AccountForm({ user }: AccountFormProps) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="mb-3 text-xs text-red-400 font-sarabun">
          {errors.root.message}
        </p>
      )}

      <FieldGroup className="flex flex-col gap-4">
        {/* Email */}
        <Field className="flex flex-col gap-1.5">
          <label className={labelClass}>อีเมล</label>
          <input
            value={user.email}
            disabled
            className={`${inputClass} opacity-40 cursor-not-allowed`}
          />
        </Field>

        {/* ชื่อ + นามสกุล */}
        <div className="flex gap-3">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  ชื่อ
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="ชื่อ"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-sarabun"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  นามสกุล
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="นามสกุล"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-sarabun"
                  />
                )}
              </Field>
            )}
          />
        </div>

        {/* วันเกิด + เพศ */}
        <div className="flex gap-3">
          <Controller
            control={control}
            name="dob"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  วันเกิด
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="date"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-sarabun"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  เพศ
                </FieldLabel>
                <select {...field} id={field.name} className={inputClass}>
                  <option value="MALE">ชาย</option>
                  <option value="FEMALE">หญิง</option>
                  <option value="OTHER">อื่นๆ</option>
                </select>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-sarabun"
                  />
                )}
              </Field>
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark shadow-[0_4px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-2"
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
      </FieldGroup>
    </form>
  );
}
