import { auth } from "@/lib/auth/auth";
import { productService } from "@/lib/api/product/product.service";
import type { ProductFilter } from "@/lib/api/product/product.service";
import ProductGrid from "@/components/features/shop/product-grid";
import ProductFilterPanel from "@/components/features/shop/product-filter";

type ShopPageProps = {
  searchParams: Promise<ProductFilter>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const session = await auth();
  const filter = await searchParams;
  const { data: products, meta } = await productService.getAll(filter);

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
      <main className="min-h-screen px-6 py-10 pt-24 max-w-6xl mx-auto">
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

        <div className="flex gap-6">
          <ProductFilterPanel filter={filter} />
          <ProductGrid products={products} isLoggedIn={!!session} />
        </div>
      </main>
    </>
  );
}
