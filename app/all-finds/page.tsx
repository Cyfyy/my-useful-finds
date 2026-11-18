import type { Metadata } from "next";
import AllFindsClient from "./AllFindsClient";

export const metadata: Metadata = {
  title: "All Finds",
  description:
    "Browse the complete My Useful Finds collection of thoughtfully selected home essentials, tech accessories, practical products, and everyday discoveries.",

  openGraph: {
    title: "All Finds | My Useful Finds",
    description:
      "Explore our collection of useful products, home essentials, tech accessories, and everyday discoveries.",
    siteName: "My Useful Finds",
    locale: "en_PH",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "All Finds | My Useful Finds",
    description:
      "Explore useful products, home essentials, tech accessories, and everyday discoveries.",
  },
};

export default function AllFindsPage() {
  return <AllFindsClient />;
}