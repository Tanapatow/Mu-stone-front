'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Pencil, Search, Trash2, Upload } from 'lucide-react';

export type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

type ProductProps = {
  title: string;
  subtitle: string;
  addButtonText: string;
  searchPlaceholder?: string;
  products: ProductItem[];
};

type ProductCardProps = {
  product: ProductItem;
  onDelete: (id: string) => void;
  onUploadClick: (id: string) => void;
  onImageUpload: (id: string, event: ChangeEvent<HTMLInputElement>) => void;
  registerInputRef: (id: string, element: HTMLInputElement | null) => void;
};

const formatPrice = (price: number) => {
  return `฿${price.toFixed(2)}`;
};

function ProductCard({
  product,
  onDelete,
  onUploadClick,
  onImageUpload,
  registerInputRef,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-200 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
      <div className="relative h-120 w-full overflow-hidden rounded-lg bg-black">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />

        <button
          type="button"
          title="อัปโหลดรูป"
          onClick={() => onUploadClick(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white"
        >
          <Upload className="h-4 w-4" />
        </button>

        <input
          ref={(element) => registerInputRef(product.id, element)}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onImageUpload(product.id, event)}
        />
      </div>

      <div className="px-4 pb-4 pt-3">
        <h2 className="truncate text-2xl font-medium text-neutral-600 underline underline-offset-2">
          {product.name}
        </h2>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-[#d8a62b]">
            {formatPrice(product.price)}
          </p>
          <p className="text-lg text-neutral-400">
            คงเหลือ {product.stock} ชิ้น
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400 text-xl font-medium text-blue-500 transition hover:bg-blue-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            แก้ไข
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 text-red-500 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="sr-only">{product.description}</p>
      </div>
    </div>
  );
}

export default function Product({
  title,
  subtitle,
  addButtonText,
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
    <section className="min-h-screen bg-[#ececec] px-6 py-7 md:px-10">
      <div className="mx-auto w-full">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-[56px] font-bold leading-none text-black">
              {title}
            </h1>
            <p className="mt-4 text-[18px] text-neutral-700">{subtitle}</p>
          </div>

          <button
            type="button"
            className="h-14 rounded-2xl bg-[#3b82f6] px-7 text-[18px] font-medium text-white transition hover:bg-[#2563eb]"
          >
            {addButtonText}
          </button>
        </div>

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
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
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
