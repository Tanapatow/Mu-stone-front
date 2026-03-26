import z from "zod";

export type LoginFormProps = {
  onSuccess?: () => void; // ← modal จะส่ง onClose มาให้
};

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
