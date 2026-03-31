"use server";

import { orderService } from "../api/order/order.service";
import type { ActionResult } from "./action.type";

export type CheckoutActionResult = ActionResult & {
  paymentUrl?: string;
};

export const checkout = async (): Promise<CheckoutActionResult> => {
  try {
    const { paymentUrl } = await orderService.checkout();
    return { success: true, paymentUrl };
  } catch {
    return { success: false, code: "CHECKOUT_FAILED" };
  }
};
