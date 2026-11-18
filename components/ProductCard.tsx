import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  "home-kitchen": "Home & Kitchen",
  "tech-desk": "Tech & Desk",
  "everyday-finds": "Everyday Finds",
  "beauty-skincare": "Beauty & Skincare",
  "fitness-wellness": "Fitness & Wellness",
};

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabel =
    categoryLabels[product.category] ?? product.category.replaceAll("-", " ");

  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-card-image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="product-card-image">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.imageAlt}
              loading="lazy"
            />
          ) : (
            <div className="product-image-placeholder">
              <span>my useful finds.</span>
            </div>
          )}

          <span className="product-card-image-action" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.6} />
          </span>
        </div>
      </Link>

      <div className="product-card-content">
        <div className="product-card-meta">
          <p className="product-card-category">{categoryLabel}</p>
          {product.brand && (
            <span className="product-card-brand">{product.brand}</span>
          )}
        </div>

        <h3 className="product-card-title">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="product-card-description">
          {product.description}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="product-card-link"
        >
          DISCOVER THIS FIND
          <ArrowUpRight size={15} strokeWidth={1.7} />
        </Link>
      </div>
    </article>
  );
}
