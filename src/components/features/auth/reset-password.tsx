"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Lock } from "lucide-react";
import { useTransition, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/schemas/auth.schema";
import { resetPassword } from "@/lib/actions/auth.action";

const inputClass = `
  pl-10 py-3 rounded-xl text-sm w-full
  bg-white/5 text-cream
  border border-gold/20
  placeholder:text-white/20 font-sarabun
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-gold/15
  focus-visible:border-gold/55
`;

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    startTransition(async () => {
      const res = await resetPassword(token, data.password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError("root", {
          message: "ลิงก์หมดอายุหรือไม่ถูกต้อง กรุณาขอใหม่อีกครั้ง",
        });
      }
    });
  };

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[url('/hero-bg.png')] bg-cover bg-center">
        <div className="card-glass w-full max-w-md text-center">
          <p className="text-white/50 font-sarabun">ลิงก์ไม่ถูกต้องครับ</p>
          <Link
            href="/forgot-password"
            className="text-sm text-gold hover:text-gold-light font-sarabun transition-colors mt-3 block"
          >
            ขอลิงก์ใหม่
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[url('/hero-bg.png')] bg-cover bg-center">
      <div className="card-glass w-full max-w-md flex flex-col gap-6">
        <div>
          <h1 className="dashboard-title">ตั้งรหัสผ่านใหม่</h1>
          <p className="dashboard-subtitle">กรอกรหัสผ่านใหม่ของคุณ</p>
        </div>

        {success ? (
          <div className="p-4 rounded-xl text-center bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-400 font-sarabun">
              เปลี่ยนรหัสผ่านสำเร็จ! กำลังพาไปหน้าหลัก...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <p className="mb-3 text-xs text-red-400 font-sarabun">
                {errors.root.message}
              </p>
            )}
            <FieldGroup className="flex flex-col gap-4">
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs text-cream/55 font-sarabun tracking-wide"
                    >
                      รหัสผ่านใหม่
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Lock
                        size={15}
                        className="absolute left-3.5 text-gold/50 pointer-events-none z-10"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className={inputClass}
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
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs text-cream/55 font-sarabun tracking-wide"
                    >
                      ยืนยันรหัสผ่านใหม่
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Lock
                        size={15}
                        className="absolute left-3.5 text-gold/50 pointer-events-none z-10"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className={inputClass}
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

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 rounded-xl font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark shadow-[0_4px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size={14} className="animate-spin" />
                    กำลังบันทึก...
                  </span>
                ) : (
                  "ตั้งรหัสผ่านใหม่"
                )}
              </button>
            </FieldGroup>
          </form>
        )}

        <p className="text-center text-xs text-white/30 font-sarabun">
          <Link
            href="/forgot-password"
            className="text-gold hover:text-gold-light transition-colors"
          >
            ขอลิงก์ใหม่
          </Link>
        </p>
      </div>
    </main>
  );
}
