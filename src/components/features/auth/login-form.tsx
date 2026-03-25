'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/actions/auth.action';
import { LoginInput, loginSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';

import { Controller, useForm } from 'react-hook-form';

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await login(data);
      if (!res.success) {
        setError('root', {
          message: 'The email or password you entered is incorrect',
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Submit button */}
          <Field className="mt-4">
            <Button className="rounded-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Logging you in ...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
