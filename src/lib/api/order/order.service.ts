import { api } from "../client";
import type { CheckoutResponse } from "./order.type";

const checkout = () => api.post<CheckoutResponse>("order");

export const orderService = { checkout };
