"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions/auth.action";
import { RegisterInput, registerSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Lock, Mail, User, Calendar } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formInputClass,
  formLabelClass,
  formIconClass,
} from "@/lib/constants/form-styles";

type RegisterFormProps = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dob: undefined,
      gender: undefined,
    },
    resolver: zodResolver(registerSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      console.log("data", data);
      const res = await register(data);
      console.log("res", res);
      if (!res?.success) {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      } else {
        onSuccess?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="mb-3 text-xs text-red-400 font-sarabun text-center">
          {errors.root.message}
        </p>
      )}

      <FieldGroup className="flex flex-col gap-3">
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
                <FieldLabel htmlFor={field.name} className={formLabelClass}>
                  ชื่อ
                </FieldLabel>
                <div className="relative flex items-center">
                  <User size={15} className={formIconClass} />
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="ชื่อ"
                    aria-invalid={fieldState.invalid}
                    className={formInputClass}
                  />
                </div>
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
                <FieldLabel htmlFor={field.name} className={formLabelClass}>
                  นามสกุล
                </FieldLabel>
                <div className="relative flex items-center">
                  <User size={15} className={formIconClass} />
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="นามสกุล"
                    aria-invalid={fieldState.invalid}
                    className={formInputClass}
                  />
                </div>
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

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel htmlFor={field.name} className={formLabelClass}>
                อีเมล
              </FieldLabel>
              <div className="relative flex items-center">
                <Mail size={15} className={formIconClass} />
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={fieldState.invalid}
                  className={formInputClass}
                />
              </div>
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs text-red-400 font-sarabun"
                />
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel htmlFor={field.name} className={formLabelClass}>
                รหัสผ่าน
              </FieldLabel>
              <div className="relative flex items-center">
                <Lock size={15} className={formIconClass} />
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className={formInputClass}
                />
              </div>
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs text-red-400 font-sarabun"
                />
              )}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel htmlFor={field.name} className={formLabelClass}>
                ยืนยันรหัสผ่าน
              </FieldLabel>
              <div className="relative flex items-center">
                <Lock size={15} className={formIconClass} />
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className={formInputClass}
                />
              </div>
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs text-red-400 font-sarabun"
                />
              )}
            </Field>
          )}
        />

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
                <FieldLabel htmlFor={field.name} className={formLabelClass}>
                  วันเกิด
                </FieldLabel>
                <div className="relative flex items-center">
                  <Calendar size={15} className={formIconClass} />
                  <Input
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    className={formInputClass}
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                    style={{ colorScheme: "dark" }}
                  />
                </div>
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
                <FieldLabel htmlFor={field.name} className={formLabelClass}>
                  เพศ
                </FieldLabel>
                <select
                  {...field}
                  id={field.name}
                  style={{
                    colorScheme: "dark",
                    background: "rgba(255,255,255,0.05)",
                  }}
                  className="py-3 px-3 rounded-xl text-lg w-full text-cream border border-[rgba(201,162,39,0.2)] font-sarabun transition-all duration-200 focus:outline-none focus:border-[rgba(201,162,39,0.55)]"
                >
                  <option value="" hidden>
                    เลือกเพศ
                  </option>
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

        {/* Submit */}
        <Field className="mt-2">
          <Button
            disabled={isPending}
            className="
              w-full py-3 rounded-xl border-0
              font-sarabun font-semibold text-lg tracking-wide
              text-navy transition-all duration-200
              hover:-translate-y-0.5 active:scale-[0.98]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
            "
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
              boxShadow: isPending
                ? "none"
                : "0 4px 20px rgba(201,162,39,0.35)",
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังสมัครสมาชิก...
              </span>
            ) : (
              "สมัครสมาชิก"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
