"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addressSchema, type AddressInput } from "@/lib/schemas/address.schema";
import { createAddress, updateAddress } from "@/lib/actions/address.action";
import type { Address } from "@/lib/api/user/address/address.type";

type AddressFormModalProps = {
  address: Address | null;
  onClose: () => void;
};

const inputClass = `
  px-3 py-2.5 rounded-xl text-sm w-full
  bg-white/5 text-cream
  border border-[rgba(201,162,39,0.2)]
  placeholder:text-white/20 font-['Sarabun']
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-[rgba(201,162,39,0.15)]
  focus-visible:border-[rgba(201,162,39,0.55)]
`;

const labelClass =
  "text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide";

export default function AddressFormModal({
  address,
  onClose,
}: AddressFormModalProps) {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<AddressInput>({
    defaultValues: {
      title: address?.title ?? "บ้าน",
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
      const res = address
        ? await updateAddress(address.id, data)
        : await createAddress(data);
      if (!res.success) {
        setError("root", { message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
      } else {
        onClose();
      }
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.98) 0%, rgba(11,8,42,0.99) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <p className="font-['Sarabun'] text-sm font-semibold text-cream">
            {address ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <p className="mb-3 text-xs text-red-400 font-['Sarabun']">
                {errors.root.message}
              </p>
            )}
            <FieldGroup className="flex flex-col gap-3">
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5"
                  >
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      ชื่อที่อยู่
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="เช่น บ้าน, ที่ทำงาน"
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
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-['Sarabun'] text-white/40 border border-white/10 hover:text-white/70 transition-all"
                >
                  ยกเลิก
                </button>
                <Button
                  disabled={isPending}
                  className="flex-1 py-2.5 rounded-xl border-0 font-['Sarabun'] font-semibold text-sm text-navy transition-all hover:-translate-y-0.5 disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
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
        </div>
      </div>
    </>
  );
}
