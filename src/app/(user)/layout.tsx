import UserNavbar from "@/components/layouts/user/user-navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNavbar />
      <main>{children}</main>
    </>
  );
}
