'use client';

import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './product-card';

export type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

type ProductProps = {
  searchPlaceholder?: string;
  products: ProductItem[];
};

export default function ProductList({
  searchPlaceholder = 'ค้นหาสินค้า...',
  products,
}: ProductProps) {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState<ProductItem[]>(products);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
      );
    });
  }, [productList, search]);

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUploadClick = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

  const handleImageUpload = (
    id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setProductList((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, image: previewUrl } : product,
      ),
    );
  };

  const registerInputRef = (id: string, element: HTMLInputElement | null) => {
    fileInputRefs.current[id] = element;
  };

  return (
    <section className="py-4 md:px-10">
      <div className="mx-auto w-full">
        <div className="mb-12 rounded-[20px] bg-white px-5 py-4 shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              placeholder={searchPlaceholder}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-[12px] border border-neutral-500 bg-[#f5f5f5] pl-14 pr-4 text-[17px] text-neutral-800 outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[20px] bg-white py-16 text-center text-neutral-500 shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
            ไม่พบสินค้า
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onUploadClick={handleUploadClick}
                onImageUpload={handleImageUpload}
                registerInputRef={registerInputRef}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
