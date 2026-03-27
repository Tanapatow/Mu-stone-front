import z from "zod";

export type LoginFormProps = {
  onSuccess?: () => void;
};

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().regex(/^[0-9a-zA-Z]{6,}$/),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  dob: z.date(),
  gender: z.enum(["FEMALE", "MALE", "OTHER"]),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
