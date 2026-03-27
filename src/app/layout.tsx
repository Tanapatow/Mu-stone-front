import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { aclonica, roboto, saraban } from "@/styles/font";
import { Cinzel, Cinzel_Decorative, Sarabun } from "next/font/google";
import Navbar from "@/components/layouts/home/navbar";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
});
const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-d",
});
const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sarabun",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${cinzel.variable} ${cinzelDecorative.variable} ${sarabun.variable}`}
    >
      <body
        className={cn(
          "antialiased",
          roboto.variable,
          saraban.variable,
          aclonica.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
