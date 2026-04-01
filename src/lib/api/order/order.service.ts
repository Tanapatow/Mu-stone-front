import { api } from "../client";
import type { CheckoutResponse, Order } from "./order.type";

const getMyOrders = () => api.get<Order[]>("order");
const checkout = () => api.post<CheckoutResponse>("order");

export const orderService = { getMyOrders, checkout };
