import z from "zod";

export type LoginFormProps = {
  onSuccess?: () => void;
};

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const registerSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .regex(/^[0-9a-zA-Z]{6,}/, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว"),
    confirmPassword: z.string(),
    firstName: z.string().min(4, "ชื่อต้องมีอย่างน้อย 4 ตัวอักษร"),
    lastName: z.string().min(4, "นามสกุลต้องมีอย่างน้อย 4 ตัวอักษร"),
    dob: z.date(),
    gender: z.enum(["FEMALE", "MALE", "OTHER"]),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterInput, "confirmPassword">;
