import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/data/products";

export const dynamic = "force-static";

const baseUrl = "https://my-useful-finds.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/all-finds`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap =
    getPublishedProducts().map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.dateAdded),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...productPages];
}
