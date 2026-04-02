"use server";

import { revalidatePath } from "next/cache";
import { ActionResult } from "./action.type";
import { addressService } from "../api/user/address/address.service";
import { Address } from "../api/user/address/address.type";

export const getAddress = async (): Promise<Address | null> => {
  try {
    return await addressService.getAddress();
  } catch {
    return null;
  }
};

export const upsertAddress = async (
  data: Omit<Address, "id" | "userId">,
): Promise<ActionResult> => {
  try {
    await addressService.upsertAddress(data);
    revalidatePath("/cart");
    revalidatePath("/account"); // เพิ่มด้วยเผื่อใช้ใน dashboard
    return { success: true };
  } catch {
    return { success: false, code: "UPSERT_ADDRESS_FAILED" };
  }
};
