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
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Root error */}
      {errors.root && (
        <Alert className="mb-4 rounded-xl border-red-500/40 bg-red-950/40">
          <AlertTitle className="text-sm font-['Sarabun'] text-red-300">
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
                  className="
                    pl-10 py-3 rounded-xl text-sm w-full
                    bg-white/5 text-[#f5f0e8]
                    border border-[rgba(201,162,39,0.2)]
                    placeholder:text-white/20 font-['Sarabun']
                    transition-all duration-200
                    focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
                    focus-visible:border-[rgba(201,162,39,0.55)]
                  "
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
                className="text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide"
              >
                รหัสผ่าน
              </FieldLabel>
              <div className="relative flex items-center">
                <Lock
                  size={15}
                  className="absolute left-3.5 text-[rgba(201,162,39,0.5)] pointer-events-none z-10"
                />
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className="
                    pl-10 py-3 rounded-xl text-sm w-full
                    bg-white/5 text-[#f5f0e8]
                    border border-[rgba(201,162,39,0.2)]
                    placeholder:text-white/20 font-['Sarabun']
                    transition-all duration-200
                    focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
                    focus-visible:border-[rgba(201,162,39,0.55)]
                  "
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

        {/* Submit */}
        <Field className="mt-2">
          <Button
            disabled={isPending}
            className="
              w-full py-3 rounded-xl border-0
              font-['Sarabun'] font-semibold text-sm tracking-wide
              text-[#0b0e2a] transition-all duration-200
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
                กำลังเข้าสู่ระบบ...
              </span>
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
