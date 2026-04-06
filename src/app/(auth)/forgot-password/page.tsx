"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail } from "lucide-react";
import { useTransition, useState } from "react";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth.schema";
import { forgotPassword } from "@/lib/actions/auth.action";

const inputClass = `
  pl-10 py-3 rounded-xl text-sm w-full
  bg-white/5 text-cream
  border border-gold/20
  placeholder:text-white/20 font-sarabun
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-gold/15
  focus-visible:border-gold/55
`;

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    startTransition(async () => {
      const res = await forgotPassword(data.email);
      if (res.success) {
        setSent(true);
      } else {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[url('/hero-bg.png')] bg-cover bg-center">
      <div className="card-glass w-full max-w-md flex flex-col gap-6">
        <div>
          <h1 className="dashboard-title">ลืมรหัสผ่าน</h1>
          <p className="dashboard-subtitle">
            กรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl text-center bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-400 font-sarabun">
              ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้วครับ กรุณาตรวจสอบ inbox
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
                name="email"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs text-cream/55 font-sarabun tracking-wide"
                    >
                      อีเมล
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Mail
                        size={15}
                        className="absolute left-3.5 text-gold/50 pointer-events-none z-10"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="your@email.com"
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
                    กำลังส่ง...
                  </span>
                ) : (
                  "ส่งลิงก์รีเซ็ตรหัสผ่าน"
                )}
              </button>
            </FieldGroup>
          </form>
        )}

        <p className="text-center text-xs text-white/30 font-sarabun">
          จำรหัสผ่านได้แล้ว?{" "}
          <Link
            href="/"
            className="text-gold hover:text-gold-light transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </main>
  );
}
