"use server";

import { revalidatePath } from "next/cache";
import { userService } from "../api/user/user.service";
import type { User, UpdateUserPayload } from "../api/user/user.type";
import type { ActionResult } from "./action.type";

export const getMe = async (): Promise<User | null> => {
  try {
    return await userService.getMe();
  } catch {
    return null;
  }
};

export const updateProfile = async (
  data: UpdateUserPayload,
): Promise<ActionResult> => {
  try {
    await userService.updateProfile(data);
    revalidatePath("/account");
    return { success: true };
  } catch {
    return { success: false, code: "UPDATE_PROFILE_FAILED" };
  }
};
