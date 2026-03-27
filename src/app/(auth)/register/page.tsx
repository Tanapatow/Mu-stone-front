import RegisterForm from "@/components/features/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
