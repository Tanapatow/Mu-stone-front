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

export const authService = { login, register };
