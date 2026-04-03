import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const userRoutes = [
  "/cart",
  "/order",
  "/account",
  "/address",
  "/fortune-history",
  "/chat",
];
const authRoutes = ["/forgot-password", "/reset-password"];

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;
  const isAuthenticated = !!session;
  const role = session?.user?.role;

  // Admin routes — ต้อง login และต้องเป็น ADMIN
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!isAuthenticated) return NextResponse.redirect(new URL("/", req.url));
    if (role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // ถ้า login แล้วเป็น ADMIN และเข้า / ให้ redirect ไป admin
  if (pathname === "/" && isAuthenticated && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // User routes — ต้อง login
  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));
  if (isUserRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Auth routes — ถ้า login แล้วให้ redirect ออก
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    if (role === "ADMIN")
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
