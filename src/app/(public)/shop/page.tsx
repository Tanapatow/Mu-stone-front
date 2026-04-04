import { auth } from "@/lib/auth/auth";
import { productService } from "@/lib/api/product/product.service";
import type { ProductFilter } from "@/lib/api/product/product.service";
import ProductGrid from "@/components/features/shop/product-grid";
import ProductFilterPanel from "@/components/features/shop/product-filter";
import Link from "next/link";

type ShopPageProps = {
  searchParams: Promise<ProductFilter>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const session = await auth();
  const filter = await searchParams;
  const { data: products, meta } = await productService.getAll(filter);

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(
      Object.entries(filter).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      }, {}),
    );
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[url('/auth-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <main className="px-6 py-10 pt-24 max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="dashboard-header">
          <h1
            className="font-cinzel-d text-3xl md:text-4xl font-bold mb-1"
            style={{
              color: "var(--color-gold)",
              textShadow: "0 0 24px rgba(201,162,39,0.6)",
            }}
          >
            Product
          </h1>

          <p className="dashboard-subtitle text-sm">{meta.totalItems} รายการ</p>
        </div>

        {/* Content */}
        <div className="flex gap-6 flex-1">
          <ProductFilterPanel filter={filter} />
          <ProductGrid products={products} isLoggedIn={!!session} />
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {meta.hasPreviousPage && (
              <Link
                href={buildPageUrl(meta.currentPage - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-sarabun text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                ← ก่อนหน้า
              </Link>
            )}

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (page) => {
                const isActive = meta.currentPage === page;

                return (
                  <Link
                    key={page}
                    href={buildPageUrl(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-sarabun transition-all duration-200 border ${
                      isActive
                        ? "bg-[linear-gradient(135deg,#c9a227,#7a5c0a)] text-[--color-navy] border-[rgba(201,162,39,0.4)]"
                        : "bg-white/5 text-white/50 border-white/10 hover:text-white/80 hover:border-white/20"
                    }`}
                  >
                    {page}
                  </Link>
                );
              },
            )}

            {meta.hasNextPage && (
              <Link
                href={buildPageUrl(meta.currentPage + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-sarabun text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                ถัดไป →
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
