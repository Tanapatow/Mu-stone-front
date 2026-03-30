"use server";

import { revalidatePath } from "next/cache";
import { cartService } from "../api/cart/cart.service";
import { ActionResult } from "./action.type";

export const addToCart = async (
  productId: string,
  quantity = 1,
): Promise<ActionResult> => {
  try {
    await cartService.addToCart(productId, quantity);
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, code: "ADD_TO_CART_FAILED" };
  }
};

export const updateQuantity = async (
  productId: string,
  quantity: number,
): Promise<ActionResult> => {
  try {
    await cartService.updateQuantity(productId, quantity);
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, code: "UPDATE_QUANTITY_FAILED" };
  }
};

export const removeFromCart = async (
  productId: string,
): Promise<ActionResult> => {
  try {
    await cartService.removeItem(productId);
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, code: "REMOVE_ITEM_FAILED" };
  }
};
