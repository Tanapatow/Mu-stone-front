'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from '@/lib/schemas/user.schema';
import { updateProfile } from '@/lib/actions/user.action';
import type { User } from '@/lib/api/user/user.type';

type AccountFormProps = {
  user: User;
};

export default function AdminAccount({ user }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob ? user.dob.split('T')[0] : '',
      gender: user.gender,
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit = (data: UpdateProfileInput) => {
    startTransition(async () => {
      const res = await updateProfile(data);
      if (!res.success) {
        setError('root', { message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-3/4 mx-auto mt-10 p-6 bg-white border rounded-lg">
        {errors.root && (
          <p className="text-red-500 text-sm mb-3">{errors.root.message}</p>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="block text-lg mb-1">อีเมล</label>
          <input
            value={user.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Firstname */}
        <div className="mb-3">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-lg mb-1">ชื่อ</label>
                <input
                  {...field}
                  id={field.name}
                  placeholder="ชื่อ"
                  className="w-full border rounded px-3 py-2"
                />
                {fieldState.invalid && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Lastname */}
        <div className="mb-3">
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-lg mb-1">นามสกุล</label>
                <input
                  {...field}
                  id={field.name}
                  placeholder="นามสกุล"
                  className="w-full border rounded px-3 py-2"
                />
                {fieldState.invalid && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* DOB */}
        <div className="mb-3">
          <Controller
            control={control}
            name="dob"
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-lg mb-1">วันเกิด</label>
                <input
                  {...field}
                  id={field.name}
                  type="date"
                  className="w-full border rounded px-3 py-2"
                />
                {fieldState.invalid && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-lg mb-1">เพศ</label>
                <select
                  {...field}
                  id={field.name}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="MALE">ชาย</option>
                  <option value="FEMALE">หญิง</option>
                  <option value="OTHER">อื่นๆ</option>
                </select>
                {fieldState.invalid && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {isPending ? 'กำลังบันทึก...' : 'อัปเดตข้อมูล'}
        </button>
      </div>
    </form>
  );
}
