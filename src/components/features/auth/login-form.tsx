"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth.action";
import {
  LoginFormProps,
  LoginInput,
  loginSchema,
} from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const inputClass = `
  pl-10 py-3 rounded-xl text-sm w-full
  bg-white/5 text-cream
  border border-gold/20
  placeholder:text-white/20 font-sarabun
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-gold/15
  focus-visible:border-gold/55
`;

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await login(data);
      if (!res.success) {
        setError("root", { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      } else {
        onSuccess?.();
      }
    });
  };

  const handleGoogleLogin = () => {
    startGoogleTransition(async () => {
      await signIn("google", { callbackUrl: "/" });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <Alert className="mb-4 rounded-xl border-red-500/40 bg-red-950/40">
          <AlertTitle className="text-sm font-sarabun text-red-300">
            {errors.root.message}
          </AlertTitle>
        </Alert>
      )}

      <FieldGroup className="flex flex-col gap-4">
        {/* Email */}
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

        {/* Password */}
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
                รหัสผ่าน
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

        {/* Submit */}
        <Field className="mt-2">
          <Button
            disabled={isPending || isGooglePending}
            className="w-full py-3 rounded-xl border-0 font-sarabun font-semibold text-sm text-navy bg-gradient-to-br from-gold to-gold-dark shadow-[0_4px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังเข้าสู่ระบบ...
              </span>
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </Field>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 font-sarabun">หรือ</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending || isGooglePending}
          className="w-full py-2.5 rounded-xl font-sarabun text-sm text-white/70 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isGooglePending ? (
            <span className="flex items-center gap-2">
              <Loader size={14} className="animate-spin" />
              กำลังเข้าสู่ระบบ...
            </span>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84z"
                />
              </svg>
              เข้าสู่ระบบด้วย Google
            </>
          )}
        </button>

        <p className="text-center text-xs text-white/30 font-sarabun">
          <Link
            href="/forgot-password"
            className="text-gold hover:text-gold-light transition-colors"
          >
            ลืมรหัสผ่าน?
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
