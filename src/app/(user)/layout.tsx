import { auth } from "@/lib/auth/auth";
import UserNavbar from "@/components/layouts/user/user-navbar";
import { cartService } from "@/lib/api/cart/cart.service";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let cartCount = 0;
  if (session) {
    const cart = await cartService.getCart().catch(() => null);
    cartCount = cart?.items?.length ?? 0;
  }

  return (
    <div className="min-h-screen bg-[url('/auth-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <UserNavbar session={session} cartCount={cartCount} />
      <main>{children}</main>
    </div>
  );
}
