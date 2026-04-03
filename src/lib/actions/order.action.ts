"use server";

import { revalidatePath } from "next/cache";
import { orderService } from "../api/order/order.service";
import type { ActionResult } from "./action.type";
import type { Order, OrderStatus } from "../api/order/order.type";
import type { AdminOrderResponse } from "../api/order/admin-order.type";

export type CheckoutActionResult = ActionResult & {
  paymentUrl?: string;
};

export const getMyOrders = async (): Promise<Order[]> => {
  try {
    return await orderService.getMyOrders();
  } catch {
    return [];
  }
};

export const getAdminOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}): Promise<AdminOrderResponse> => {
  try {
    return await orderService.getAllOrders(params);
  } catch {
    return {
      orders: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    return await orderService.getOrderById(id);
  } catch {
    return null;
  }
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<ActionResult> => {
  try {
    await orderService.updateOrderStatus(id, status);
    revalidatePath("/admin/history");
    return { success: true };
  } catch {
    return { success: false, code: "UPDATE_STATUS_FAILED" };
  }
};

export const checkout = async (): Promise<CheckoutActionResult> => {
  try {
    const { paymentUrl } = await orderService.checkout();
    return { success: true, paymentUrl };
  } catch {
    return { success: false, code: "CHECKOUT_FAILED" };
  }
};
