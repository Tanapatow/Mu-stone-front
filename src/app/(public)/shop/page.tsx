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
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/shop_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <main className="min-h-screen px-6 py-10 pt-24 max-w-6xl mx-auto flex flex-col">
        <div className="mb-8">
          <h1
            className="font-['Cinzel_Decorative'] text-2xl font-bold text-gold mb-1"
            style={{ textShadow: "0 0 24px rgba(201,162,39,0.6)" }}
          >
            Product
          </h1>
          <p className="text-xs text-white/35 font-['Sarabun']">
            {meta.totalItems} รายการ
          </p>
        </div>

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
                className="px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                ← ก่อนหน้า
              </Link>
            )}

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Link
                  key={page}
                  href={buildPageUrl(page)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-['Sarabun'] transition-all duration-200"
                  style={{
                    background:
                      meta.currentPage === page
                        ? "linear-gradient(135deg, #c9a227, #7a5c0a)"
                        : "rgba(255,255,255,0.05)",
                    color:
                      meta.currentPage === page
                        ? "#0b0e2a"
                        : "rgba(245,240,232,0.45)",
                    border: "1px solid rgba(201,162,39,0.2)",
                  }}
                >
                  {page}
                </Link>
              ),
            )}

            {meta.hasNextPage && (
              <Link
                href={buildPageUrl(meta.currentPage + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                ถัดไป →
              </Link>
            )}
          </div>
        )}
      </main>
    </>
  );
}
