"use server";

import { redirect } from "next/navigation";
import { authService } from "../api/auth/auth.service";
import { auth, signIn, signOut } from "../auth/auth";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn("credentials", { ...input, redirect: false });
  } catch {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin/dashboard");
  redirect("/");
};

export const register = async (input: RegisterInput): Promise<ActionResult> => {
  try {
    const { confirmPassword, ...payload } = input;
    void confirmPassword;
    await authService.register(payload);
  } catch (error) {
    console.error("register error", error);
    return { success: false, code: "REGISTER_FAILED" };
  }
  redirect("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const forgotPassword = async (email: string): Promise<ActionResult> => {
  try {
    const result = await authService.forgotPassword(email);
    console.log("forgotPassword result:", result);
    return { success: true };
  } catch (e) {
    console.log("forgotPassword error:", e);
    return { success: false, code: "FORGOT_PASSWORD_FAILED" };
  }
};

export const resetPassword = async (
  token: string,
  password: string,
): Promise<ActionResult> => {
  try {
    await authService.resetPassword(token, password);
    return { success: true };
  } catch {
    return { success: false, code: "RESET_PASSWORD_FAILED" };
  }
};
