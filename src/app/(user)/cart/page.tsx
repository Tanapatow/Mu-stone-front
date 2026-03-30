import { auth } from "@/lib/auth/auth";
import { cartService } from "@/lib/api/cart/cart.service";
import { redirect } from "next/navigation";
import CartList from "@/components/features/cart/cart-list";

export default async function CartPage() {
  const session = await auth();
  if (!session) redirect("/");

  const cart = await cartService.getCart().catch(() => null);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1
        className="font-['Cinzel_Decorative'] text-2xl text-gold mb-1"
        style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
      >
        Cart
      </h1>
      <p className="text-xs text-white/35 font-['Sarabun'] mb-8">
        {cart?.items?.length ?? 0} รายการ
      </p>

      <CartList cart={cart} />
    </main>
  );
}
