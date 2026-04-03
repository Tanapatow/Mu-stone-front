"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
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

const inputClass = `
  px-3 py-2.5 rounded-xl text-lg w-full
  bg-white/5 text-[#f5f0e8]
  border border-[rgba(201,162,39,0.2)]
  placeholder:text-white/20 font-['Sarabun']
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
  focus-visible:border-[rgba(201,162,39,0.55)]
`;

const labelClass =
  "text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide";

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
      console.log("data", data);
      const res = await updateProfile(data);
      if (!res.success) {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="mb-3 text-xs text-red-400 font-['Sarabun']">
          {errors.root.message}
        </p>
      )}

      <FieldGroup className="flex flex-col gap-4">
        {/* Email — readonly */}
        <Field className="flex flex-col gap-1.5">
          <label className={labelClass}>อีเมล</label>
          <input
            value={user.email}
            disabled
            className={`${inputClass} opacity-40 cursor-not-allowed`}
          />
        </Field>

        {/* firstName + lastName */}
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
                    className="text-xs text-red-400 font-['Sarabun']"
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
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
        </div>

        {/* DOB + Gender */}
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
                  style={{ colorScheme: "dark" }}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
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
                <select
                  {...field}
                  id={field.name}
                  className="px-3 py-2.5 rounded-xl text-lg w-full bg-[rgba(11,8,42,0.95)] text-[#f5f0e8] border border-[rgba(201,162,39,0.2)] font-['Sarabun'] transition-all duration-200 focus:outline-none focus:border-[rgba(201,162,39,0.55)]"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="MALE">ชาย</option>
                  <option value="FEMALE">หญิง</option>
                  <option value="OTHER">อื่นๆ</option>
                </select>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
        </div>

        <Button
          disabled={isPending}
          className="w-full py-2.5 rounded-xl border-0 font-['Sarabun'] font-semibold text-lg text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
            boxShadow: isPending ? "none" : "0 4px 20px rgba(201,162,39,0.35)",
          }}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader size={14} className="animate-spin" />
              กำลังบันทึก...
            </span>
          ) : (
            "อัปเดตข้อมูล"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
