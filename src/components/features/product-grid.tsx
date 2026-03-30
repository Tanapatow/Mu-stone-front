"use client";

import type { Product } from "@/lib/api/product/product.type";
import ProductCard from "./product-card";
import { addToCart } from "@/lib/actions/cart.action";
import { useTransition } from "react";

type ProductGridProps = {
  products: Product[];
  isLoggedIn?: boolean;
};

export default function ProductGrid({
  products,
  isLoggedIn,
}: ProductGridProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (product: Product) => {
    startTransition(async () => {
      await addToCart(product.id, 1);
    });
  };

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-white/30 font-['Sarabun'] text-sm">ไม่พบสินค้า</p>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isLoggedIn={isLoggedIn}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
