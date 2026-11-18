export type ProductCategory =
  | "home-kitchen"
  | "tech-desk"
  | "everyday-finds"
  | "beauty-skincare"
  | "fitness-wellness";

export type ProductStatus = "draft" | "published";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  description: string;
  image?: string;
  imageAlt: string;
  asin?: string;
  affiliateUrl?: string;
  features?: string[];
  dateAdded: string;
  isFeatured: boolean;
  status: ProductStatus;
}
