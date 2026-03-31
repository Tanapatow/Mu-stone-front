import z from "zod";

export const addressSchema = z.object({
  receiverName: z.string().min(1, "กรุณากรอกชื่อผู้รับ"),
  phone: z.string().min(9, "กรุณากรอกเบอร์โทรศัพท์"),
  addressLine1: z.string().min(1, "กรุณากรอกที่อยู่"),
  subDistrict: z.string().min(1, "กรุณากรอกตำบล/แขวง"),
  district: z.string().min(1, "กรุณากรอกอำเภอ/เขต"),
  province: z.string().min(1, "กรุณากรอกจังหวัด"),
  postalCode: z.string().min(5, "กรุณากรอกรหัสไปรษณีย์"),
});

export type AddressInput = z.infer<typeof addressSchema>;
