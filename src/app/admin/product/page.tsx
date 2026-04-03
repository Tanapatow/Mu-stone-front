import ProductCreate from '@/components/features/admin/product-management/product-create';
import ProductList from '@/components/features/admin/product-management/product-list';
import { adminService, ProductFilter } from '@/lib/api/admin/admin.service';
import Link from 'next/link';

type ShopPageProps = {
  searchParams: Promise<ProductFilter>;
};

export default async function ProductPage({ searchParams }: ShopPageProps) {
  const filter = await searchParams;
  const { data: products, meta } = await adminService.getAllProduct(filter);

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(
      Object.entries(filter).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      }, {}),
    );
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  return (
    <>
      <div className="flex justify-between gap-8 px-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
            สินค้า
          </h1>
          <p className="text-base text-neutral-700 md:text-lg">
            จัดการสินค้าคงคลัง
          </p>
        </div>
        <ProductCreate />
      </div>
      <ProductList products={products} />
      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {meta.hasPreviousPage && (
            <Link
              href={buildPageUrl(meta.currentPage - 1)}
              className="px-3 py-1.5 rounded-lg text-lg font-['Sarabun'] font-medium text-black hover:text-black/50 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              ← ก่อนหน้า
            </Link>
          )}

          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={buildPageUrl(page)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-lg font-['Sarabun'] transition-all duration-200"
                style={{
                  background: meta.currentPage === page ? 'black' : 'white',
                  color: meta.currentPage === page ? 'white' : 'black',
                  border: '1px solid black',
                }}
              >
                {page}
              </Link>
            ),
          )}

          {meta.hasNextPage && (
            <Link
              href={buildPageUrl(meta.currentPage + 1)}
              className="px-3 py-1.5 rounded-lg text-lg font-['Sarabun'] font-medium text-black hover:text-black/50 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              ถัดไป →
            </Link>
          )}
        </div>
      )}
    </>
  );
}
