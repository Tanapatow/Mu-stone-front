import type { Product, ProductImage } from "../product/product.type";

export type CheckoutResponse = {
  orderId: string;
  paymentUrl: string;
};

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";

export type OrderTab = "ALL" | "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  };
};
export type OrderUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  shippingAddressSnapshot: string;
  stripeSessionId: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  user?: OrderUser;
};
