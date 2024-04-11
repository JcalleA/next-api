import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";




export const metadata: Metadata = {
  title: "Shop",
  description: "Tienda Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-neutral-950`}>{children}</body>
    </html>
  );
}
