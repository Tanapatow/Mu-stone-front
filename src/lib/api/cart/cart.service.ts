import { api } from "../client";
import type { Cart } from "./cart.type";

const getCart = () => api.get<Cart>("cart");

const addToCart = (productId: string, quantity = 1) =>
  api.post<Cart>("cart/add", { productId, quantity });

const updateQuantity = (productId: string, quantity: number) =>
  api.patch<Cart>(`cart/items/${productId}`, { quantity });

const removeItem = (productId: string) =>
  api.delete<Cart>(`cart/items/${productId}`);

export const cartService = { getCart, addToCart, updateQuantity, removeItem };
