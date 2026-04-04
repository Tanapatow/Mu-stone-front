import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/actions/cart.action";
import { getAddress } from "@/lib/actions/address.action";
import CartList from "@/components/features/cart/cart-list";
import CartSummary from "@/components/features/cart/cart-summary";
import AddressForm from "@/components/features/cart/address-form";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default async function CartPage() {
  const session = await auth();
  if (!session) redirect("/");

  const [cart, address] = await Promise.all([getCart(), getAddress()]);

  const isEmpty = !cart || cart.items.length === 0;

  // Empty state
  if (isEmpty) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-5">
        <ShoppingBag size={64} className="text-white/10" />

        <div className="text-center">
          <p className="font-sarabun text-xl text-[--color-cream]/50 mb-2">
            ตะกร้าว่างเปล่า
          </p>

          <p className="text-lg text-white/30 font-sarabun">
            ยังไม่มีสินค้าในตะกร้าของคุณ
          </p>
        </div>

        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-xl text-lg font-sarabun font-semibold text-[--color-navy] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] bg-[linear-gradient(135deg,#c9a227_0%,#7a5c0a_100%)] shadow-[0_4px_20px_rgba(201,162,39,0.35)]"
        >
          เลือกซื้อสินค้า
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 pt-24 max-w-6xl mx-auto">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Cart</h1>

        <p className="dashboard-subtitle text-sm mb-8">
          {cart.items.length} รายการ
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          <CartList cart={cart} />

          <div className="card-glass p-5">
            <p className="font-sarabun text-lg text-[--color-cream] mb-4">
              {address ? "ที่อยู่จัดส่ง" : "เพิ่มที่อยู่จัดส่ง"}
            </p>

            <AddressForm address={address} />
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <CartSummary cart={cart} address={address} />
        </div>
      </div>
    </main>
  );
}
