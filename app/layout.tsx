import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "WebMarket Pro",
  description: "Satış getiren profesyonel web siteleri.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}