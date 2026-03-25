import LoginForm from '@/components/features/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
