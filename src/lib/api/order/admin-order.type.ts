import type { OrderStatus } from "./order.type";

export type AdminOrderUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AdminOrder = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  shippingAddressSnapshot: string;
  stripeSessionId: string | null;
  createdAt: string;
  user: AdminOrderUser;
  _count: { items: number };
};

export type AdminOrderMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type AdminOrderResponse = {
  orders: AdminOrder[];
  meta: AdminOrderMeta;
};
