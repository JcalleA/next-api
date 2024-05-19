import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Suspense } from 'react'
import { Pixelfacebook } from "@/components/pixel/Pixelfacebook";





export const metadata: Metadata = {
  title: "Bin You",
  description: "Tienda Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-neutral-950  bg-gradient-radial  from-slate-200 to-slate-300 `}>
        <Suspense fallback={null}>
          {children}
          <Pixelfacebook />
        </Suspense>
      </body>
    </html>
  );
}
