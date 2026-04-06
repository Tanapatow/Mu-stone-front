import { RegisterPayload } from "@/lib/schemas/auth.schema";
import { api } from "../client";
import type { User } from "../user/user.type";

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User; expiresIn: number }>(
    "auth/login",
    input,
  );

const register = (input: RegisterPayload) =>
  api.post<void>("auth/register", input);

const forgotPassword = (email: string) =>
  api.post<void>("auth/forgot-password", { email });

const resetPassword = (token: string, password: string) =>
  api.post<void>("auth/reset-password", { token, password });

const googleLogin = (token: string) =>
  api.post<{ accessToken: string; user: User; expiresIn: number }>(
    "auth/google/login",
    { token },
  );

export const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  googleLogin,
};
