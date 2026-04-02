'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, type ChangeEvent } from 'react';
import ProductCard from './product-card';
import { Product } from '@/lib/api/admin/admin.type';
import { deleteProduct } from '@/lib/actions/admin.action';
import SearchBar from './searchbar';

type ProductProps = {
  data: Product[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export default function ProductList({ data: productList, meta }: ProductProps) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  const handleUploadClick = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

  const registerInputRef = (id: string, element: HTMLInputElement | null) => {
    fileInputRefs.current[id] = element;
  };

  return (
    <section className="py-4 md:px-10">
      <div className="mx-auto w-full">
        <div className="mb-12 rounded-[20px] bg-white px-5 py-4 shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
          <div className="relative">
            <SearchBar />
          </div>
        </div>

        {productList.length === 0 ? (
          <div className="rounded-[20px] bg-white py-16 text-center text-neutral-500 shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
            ไม่พบสินค้า
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {productList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                registerInputRef={registerInputRef}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
