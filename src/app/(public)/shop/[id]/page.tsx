import { auth } from "@/lib/auth/auth";
import { productService } from "@/lib/api/product/product.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductDetail from "@/components/shop/product-detail";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const session = await auth();
  const result = await productService.getById(id).catch(() => null);
  if (!result) notFound();
  const product = result.data;
  if (!product) notFound();
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/auth-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed" />
      <main className=" min-h-screen px-6 pt-24 pb-10 max-w-5xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 font-['Sarabun'] transition-colors mb-8"
        >
          <ChevronLeft size={14} />
          Back to Products
        </Link>

        <ProductDetail product={product} isLoggedIn={!!session} />
      </main>
    </>
  );
}
