"use client";

import ProductCard from "./product-card";
import { Product } from "@/lib/api/admin/admin.type";
import { deleteProduct } from "@/lib/actions/admin.action";
import SearchBar from "./searchbar";

type ProductProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductProps) {
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      {products.length === 0 ? (
        <div className="card-glass py-16 text-center text-white/40 font-sarabun">
          ไม่พบสินค้า
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
