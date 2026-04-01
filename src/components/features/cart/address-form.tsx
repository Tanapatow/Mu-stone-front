"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil, MapPin } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addressSchema, type AddressInput } from "@/lib/schemas/address.schema";
import { upsertAddress } from "@/lib/actions/address.action";
import { Address } from "@/lib/api/user/address/address.type";

type AddressFormProps = {
  address: Address | null;
};

const inputClass = `
  px-3 py-2.5 rounded-xl text-sm w-full
  bg-white/5 text-[#f5f0e8]
  border border-[rgba(201,162,39,0.2)]
  placeholder:text-white/20 font-['Sarabun']
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
  focus-visible:border-[rgba(201,162,39,0.55)]
`;

const labelClass =
  "text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide";

export default function AddressForm({ address }: AddressFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(!address); // ถ้าไม่มีที่อยู่ → เปิด form เลย

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<AddressInput>({
    defaultValues: {
      receiverName: address?.receiverName ?? "",
      phone: address?.phone ?? "",
      addressLine1: address?.addressLine1 ?? "",
      subDistrict: address?.subDistrict ?? "",
      district: address?.district ?? "",
      province: address?.province ?? "",
      postalCode: address?.postalCode ?? "",
    },
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressInput) => {
    startTransition(async () => {
      const res = await upsertAddress(data);
      if (!res.success) {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      } else {
        setIsEditing(false);
      }
    });
  };

  // มีที่อยู่แล้ว และไม่ได้กำลังแก้ไข → แสดงที่อยู่
  if (address && !isEditing) {
    return (
      <div className="flex flex-col gap-4 ">
        {/* Address card */}
        <div
          className="relative flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all duration-200"
          style={{
            background: "rgba(201,162,39,0.05)",
            border: "2px solid rgba(201,162,39,0.4)",
          }}
        >
          {/* Selected indicator */}
          <div
            className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #c9a227, #7a5c0a)",
              boxShadow: "0 0 8px rgba(201,162,39,0.4)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-navy" />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold font-['Sarabun'] text-[#f5f0e8]">
                {address.receiverName}
              </p>
              <span className="text-white/30 text-xs">·</span>
              <p className="text-sm font-['Sarabun'] text-white/60">
                {address.phone}
              </p>
            </div>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.addressLine1}
            </p>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.subDistrict} {address.district} {address.province}{" "}
              {address.postalCode}
            </p>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs text-[#c9a227] hover:text-[#f5f0e8] transition-colors shrink-0"
          >
            <Pencil size={12} />
            แก้ไข
          </button>
        </div>

        {/*  placeholder */}
        <button
          className="flex items-center justify-center gap-2 p-4 rounded-xl text-xs font-['Sarabun'] text-white/30 hover:text-white/60 transition-all duration-200"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
          disabled
          title="รองรับหลายที่อยู่ในอนาคต"
        >
          <MapPin size={13} />+ เพิ่มที่อยู่ใหม่
        </button>
      </div>
    );
  }

  // ไม่มีที่อยู่ หรือกำลังแก้ไข → แสดง form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="mb-3 text-xs text-red-400 font-['Sarabun']">
          {errors.root.message}
        </p>
      )}

      <FieldGroup className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Controller
            control={control}
            name="receiverName"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  ชื่อผู้รับ
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="ชื่อ-นามสกุล"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  เบอร์โทรศัพท์
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="08x-xxx-xxxx"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={control}
          name="addressLine1"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel htmlFor={field.name} className={labelClass}>
                ที่อยู่
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="บ้านเลขที่ ถนน ซอย"
                className={inputClass}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs text-red-400 font-['Sarabun']"
                />
              )}
            </Field>
          )}
        />

        <div className="flex gap-3">
          <Controller
            control={control}
            name="subDistrict"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  ตำบล/แขวง
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="ตำบล/แขวง"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="district"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  อำเภอ/เขต
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="อำเภอ/เขต"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Controller
            control={control}
            name="province"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  จังหวัด
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="จังหวัด"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="postalCode"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 flex-1"
              >
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  รหัสไปรษณีย์
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="10000"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-400 font-['Sarabun']"
                  />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex gap-3 mt-2">
          {address && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-['Sarabun'] text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20 transition-all"
            >
              ยกเลิก
            </button>
          )}
          <Button
            disabled={isPending}
            className="flex-1 py-2.5 rounded-xl border-0 font-['Sarabun'] font-semibold text-sm text-navy transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
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
                กำลังบันทึก...
              </span>
            ) : (
              "บันทึกที่อยู่"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
