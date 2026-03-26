"use server";

import { redirect } from "next/navigation";
import { LoginInput } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";
import { signIn } from "../auth/auth";

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn("credentials", { ...input, redirect: false });
  } catch {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }
  redirect("/");
};
