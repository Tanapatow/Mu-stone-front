"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail } from "lucide-react";
import { useTransition, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  pl-10 py-3 rounded-xl text-lg w-full
  bg-white/5 text-[#f5f0e8]
  border border-[rgba(201,162,39,0.2)]
  placeholder:text-white/20 font-['Sarabun']
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
  focus-visible:border-[rgba(201,162,39,0.55)]
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md p-8 rounded-2xl flex flex-col gap-6"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.97) 0%, rgba(11,8,42,0.97) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div>
          <h1 className="font-['Sarabun'] text-xl text-cream mb-1">
            ลืมรหัสผ่าน
          </h1>
          <p className="text-xs text-white/35 font-['Sarabun']">
            กรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้
          </p>
        </div>

        {sent ? (
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            <p className="text-lg text-green-400 font-['Sarabun']">
              ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้วครับ กรุณาตรวจสอบ inbox
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <p className="mb-3 text-xs text-red-400 font-['Sarabun']">
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
                      className="text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide"
                    >
                      อีเมล
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Mail
                        size={15}
                        className="absolute left-3.5 text-[rgba(201,162,39,0.5)] pointer-events-none z-10"
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
                        className="text-xs text-red-400 font-['Sarabun']"
                      />
                    )}
                  </Field>
                )}
              />

              <Button
                disabled={isPending}
                className="w-full py-3 rounded-xl border-0 font-['Sarabun'] font-semibold text-lg text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                  boxShadow: isPending
                    ? "none"
                    : "0 4px 20px rgba(201,162,39,0.35)",
                }}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size={14} className="animate-spin" />
                    กำลังส่ง...
                  </span>
                ) : (
                  "ส่งลิงก์รีเซ็ตรหัสผ่าน"
                )}
              </Button>
            </FieldGroup>
          </form>
        )}

        <p className="text-center text-xs text-white/30 font-['Sarabun']">
          จำรหัสผ่านได้แล้ว?{" "}
          <Link
            href="/"
            className="font-['Sarabun']  text-gold hover:text-gold-light transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </main>
  );
}
