import { auth } from "@/lib/auth/auth";
import Navbar from "@/components/layouts/home/navbar";
import UserNavbar from "@/components/layouts/user/user-navbar";
import { cartService } from "@/lib/api/cart/cart.service";

export default async function PublicLayout({
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
    <>
      {session ? (
        <UserNavbar session={session} cartCount={cartCount} />
      ) : (
        <Navbar session={session} />
      )}
      {children}
    </>
  );
}
