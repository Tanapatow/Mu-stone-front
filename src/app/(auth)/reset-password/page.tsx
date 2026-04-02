// "use client";

// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader, Lock } from "lucide-react";
// import { useTransition, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   resetPasswordSchema,
//   type ResetPasswordInput,
// } from "@/lib/schemas/auth.schema";
// import { resetPassword } from "@/lib/actions/auth.action";

// const inputClass = `
//   pl-10 py-3 rounded-xl text-lg w-full
//   bg-white/5 text-[#f5f0e8]
//   border border-[rgba(201,162,39,0.2)]
//   placeholder:text-white/20 font-['Sarabun']
//   transition-all duration-200
//   focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
//   focus-visible:border-[rgba(201,162,39,0.55)]
// `;

// export default function ResetPasswordPage() {
//   const [isPending, startTransition] = useTransition();
//   const [success, setSuccess] = useState(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token") ?? "";

//   const {
//     handleSubmit,
//     control,
//     setError,
//     formState: { errors },
//   } = useForm<ResetPasswordInput>({
//     defaultValues: { password: "", confirmPassword: "" },
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   const onSubmit = (data: ResetPasswordInput) => {
//     startTransition(async () => {
//       const res = await resetPassword(token, data.password);
//       if (res.success) {
//         setSuccess(true);
//         setTimeout(() => router.push("/"), 2000);
//       } else {
//         setError("root", {
//           message: "ลิงก์หมดอายุหรือไม่ถูกต้อง กรุณาขอใหม่อีกครั้ง",
//         });
//       }
//     });
//   };

//   if (!token) {
//     return (
//       <main className="min-h-screen flex items-center justify-center px-4">
//         <p className="text-white/50 font-['Sarabun']">ลิงก์ไม่ถูกต้องครับ</p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center px-4">
//       <div
//         className="w-full max-w-md p-8 rounded-2xl flex flex-col gap-6"
//         style={{
//           background:
//             "linear-gradient(160deg, rgba(26,20,74,0.97) 0%, rgba(11,8,42,0.97) 100%)",
//           border: "1px solid rgba(201,162,39,0.2)",
//           boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
//         }}
//       >
//         <div>
//           <h1 className="font-['Sarabun'] text-xl text-cream mb-1">
//             ตั้งรหัสผ่านใหม่
//           </h1>
//           <p className="text-xs text-white/35 font-['Sarabun']">
//             กรอกรหัสผ่านใหม่ของคุณ
//           </p>
//         </div>

//         {success ? (
//           <div
//             className="p-4 rounded-xl text-center"
//             style={{
//               background: "rgba(34,197,94,0.1)",
//               border: "1px solid rgba(34,197,94,0.3)",
//             }}
//           >
//             <p className="text-lg text-green-400 font-['Sarabun']">
//               เปลี่ยนรหัสผ่านสำเร็จ! กำลังพาไปหน้าหลัก...
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {errors.root && (
//               <p className="mb-3 text-xs text-red-400 font-['Sarabun']">
//                 {errors.root.message}
//               </p>
//             )}
//             <FieldGroup className="flex flex-col gap-4">
//               <Controller
//                 control={control}
//                 name="password"
//                 render={({ field, fieldState }) => (
//                   <Field
//                     data-invalid={fieldState.invalid}
//                     className="flex flex-col gap-1.5"
//                   >
//                     <FieldLabel
//                       htmlFor={field.name}
//                       className="text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide"
//                     >
//                       รหัสผ่านใหม่
//                     </FieldLabel>
//                     <div className="relative flex items-center">
//                       <Lock
//                         size={15}
//                         className="absolute left-3.5 text-[rgba(201,162,39,0.5)] pointer-events-none z-10"
//                       />
//                       <Input
//                         {...field}
//                         id={field.name}
//                         type="password"
//                         placeholder="••••••••"
//                         aria-invalid={fieldState.invalid}
//                         className={inputClass}
//                       />
//                     </div>
//                     {fieldState.invalid && (
//                       <FieldError
//                         errors={[fieldState.error]}
//                         className="text-xs text-red-400 font-['Sarabun']"
//                       />
//                     )}
//                   </Field>
//                 )}
//               />

//               <Controller
//                 control={control}
//                 name="confirmPassword"
//                 render={({ field, fieldState }) => (
//                   <Field
//                     data-invalid={fieldState.invalid}
//                     className="flex flex-col gap-1.5"
//                   >
//                     <FieldLabel
//                       htmlFor={field.name}
//                       className="text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide"
//                     >
//                       ยืนยันรหัสผ่านใหม่
//                     </FieldLabel>
//                     <div className="relative flex items-center">
//                       <Lock
//                         size={15}
//                         className="absolute left-3.5 text-[rgba(201,162,39,0.5)] pointer-events-none z-10"
//                       />
//                       <Input
//                         {...field}
//                         id={field.name}
//                         type="password"
//                         placeholder="••••••••"
//                         aria-invalid={fieldState.invalid}
//                         className={inputClass}
//                       />
//                     </div>
//                     {fieldState.invalid && (
//                       <FieldError
//                         errors={[fieldState.error]}
//                         className="text-xs text-red-400 font-['Sarabun']"
//                       />
//                     )}
//                   </Field>
//                 )}
//               />

//               <Button
//                 disabled={isPending}
//                 className="w-full py-3 rounded-xl border-0 font-['Sarabun'] font-semibold text-lg text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
//                   boxShadow: isPending
//                     ? "none"
//                     : "0 4px 20px rgba(201,162,39,0.35)",
//                 }}
//               >
//                 {isPending ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <Loader size={14} className="animate-spin" />
//                     กำลังบันทึก...
//                   </span>
//                 ) : (
//                   "ตั้งรหัสผ่านใหม่"
//                 )}
//               </Button>
//             </FieldGroup>
//           </form>
//         )}

//         <p className="text-center text-xs text-white/30 font-['Sarabun']">
//           <Link
//             href="/forgot-password"
//             className="text-gold hover:text-gold-light transition-colors"
//           >
//             ขอลิงก์ใหม่
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }
export default function ResetPassword() {
  return <div>ResetPassword</div>;
}
