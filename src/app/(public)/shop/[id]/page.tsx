import { auth } from "@/lib/auth/auth";
import { productService } from "@/lib/api/product/product.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductDetail from "@/components/shop/product-detail";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ back?: string }>;
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { id } = await params;
  const { back } = await searchParams;
  const session = await auth();
  const result = await productService.getById(id).catch(() => null);
  if (!result) notFound();
  const product = result.data;
  if (!product) notFound();

  const backUrl = back ? decodeURIComponent(back) : "/shop";
  const backLabel = back?.includes("fortune")
    ? "กลับไปหน้าดูดวง"
    : "กลับไปร้านค้า";

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/shop_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed" />
      <main className="min-h-screen px-6 pt-24 pb-10 max-w-5xl mx-auto">
        <Link
          href={backUrl}
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-gold font-sarabun transition-colors mb-8"
        >
          <ChevronLeft size={15} />
          {backLabel}
        </Link>

        <ProductDetail product={product} isLoggedIn={!!session} />
      </main>
    </>
  );
}
