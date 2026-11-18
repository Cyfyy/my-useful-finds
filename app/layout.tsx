import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "My Useful Finds | Discover Things That Make Life Better",
    template: "%s | My Useful Finds",
  },

  description:
    "Discover thoughtfully selected products, useful gadgets, home essentials, and everyday finds at My Useful Finds.",

  applicationName: "My Useful Finds",

  keywords: [
    "useful finds",
    "home essentials",
    "kitchen finds",
    "tech accessories",
    "everyday products",
    "product discoveries",
    "practical home products",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "My Useful Finds | Discover Things That Make Life Better",
    description:
      "Explore thoughtfully selected home essentials, useful gadgets, and everyday products worth discovering.",
    siteName: "My Useful Finds",
    locale: "en_PH",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Useful Finds",
    description:
      "Discover useful products, home essentials, and everyday finds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
