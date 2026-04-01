import z from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  dob: z.string().min(1, "กรุณากรอกวันเกิด"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
