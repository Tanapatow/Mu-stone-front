'use client';
import ProductCard from './product-card';
import { ProductResponse } from '@/lib/api/admin/admin.type';
import { deleteProduct } from '@/lib/actions/admin.action';
import SearchBar from './searchbar';

type ProductProps = ProductResponse;

export default function ProductList({ data: productList, meta }: ProductProps) {
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <section className="py-4 px-8">
      <div className="rounded-4xl bg-white">
        <SearchBar />
      </div>

      {productList.length === 0 ? (
        <div className="rounded-[20px] bg-white py-16 text-center text-neutral-500">
          ไม่พบสินค้า
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
