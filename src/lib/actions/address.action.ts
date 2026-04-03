"use server";

import { revalidatePath } from "next/cache";
import { ActionResult } from "./action.type";
import { addressService } from "../api/user/address/address.service";
import type { Address } from "../api/user/address/address.type";
import type { AddressInput } from "../schemas/address.schema";

export const getAddresses = async (): Promise<Address[]> => {
  try {
    return await addressService.getAddresses();
  } catch {
    return [];
  }
};

// ยังคงเพื่อ backward compat กับ cart page
export const getAddress = async (): Promise<Address | null> => {
  try {
    const addresses = await addressService.getAddresses();
    return addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;
  } catch {
    return null;
  }
};

export const createAddress = async (
  data: AddressInput,
): Promise<ActionResult> => {
  try {
    await addressService.createAddress({ ...data, isDefault: true });
    revalidatePath("/cart");
    revalidatePath("/address");
    return { success: true };
  } catch {
    return { success: false, code: "CREATE_ADDRESS_FAILED" };
  }
};

export const updateAddress = async (
  addressId: string,
  data: Partial<AddressInput>,
): Promise<ActionResult> => {
  try {
    await addressService.updateAddress(addressId, data);
    revalidatePath("/cart");
    revalidatePath("/address");
    return { success: true };
  } catch {
    return { success: false, code: "UPDATE_ADDRESS_FAILED" };
  }
};

export const setDefaultAddress = async (
  addressId: string,
): Promise<ActionResult> => {
  try {
    await addressService.setDefault(addressId);
    revalidatePath("/cart");
    revalidatePath("/address");
    return { success: true };
  } catch {
    return { success: false, code: "SET_DEFAULT_FAILED" };
  }
};

export const deleteAddress = async (
  addressId: string,
): Promise<ActionResult> => {
  try {
    await addressService.deleteAddress(addressId);
    revalidatePath("/cart");
    revalidatePath("/address");
    return { success: true };
  } catch {
    return { success: false, code: "DELETE_ADDRESS_FAILED" };
  }
};

// backward compat
export const upsertAddress = async (
  data: AddressInput,
): Promise<ActionResult> => {
  return createAddress(data);
};
