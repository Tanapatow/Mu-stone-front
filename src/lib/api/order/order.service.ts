import { api } from "../client";
import type { CheckoutResponse, Order, OrderStatus } from "./order.type";
import type { AdminOrderResponse } from "./admin-order.type";

const getMyOrders = () => api.get<Order[]>("order/me");

const checkout = () => api.post<CheckoutResponse>("order");

const getAllOrders = (params?: {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.status) query.set("status", params.status);
  return api.get<AdminOrderResponse>(`order/admin/all?${query.toString()}`);
};

const getOrderById = (id: string) => api.get<Order>(`order/${id}`);

const updateOrderStatus = (id: string, status: OrderStatus) =>
  api.patch<Order>(`order/admin/${id}/status`, { status });

export const orderService = {
  getMyOrders,
  checkout,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
