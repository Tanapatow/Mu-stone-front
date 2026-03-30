import type { Product } from "../product/product.type";

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product & {
    images: { url: string; isMain: boolean }[];
  };
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
};
