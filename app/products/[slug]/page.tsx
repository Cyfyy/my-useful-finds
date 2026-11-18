import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import {
  getProductBySlug,
  getPublishedProducts,
} from "@/data/products";

import type { ProductCategory } from "@/types/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryLabels: Record<ProductCategory, string> = {
  "home-kitchen": "Home & Kitchen",
  "tech-desk": "Tech & Desk",
  "everyday-finds": "Everyday Finds",
  "beauty-skincare": "Beauty & Skincare",
  "fitness-wellness": "Fitness & Wellness",
};

// Generate a static page for every published product.
export function generateStaticParams() {
  return getPublishedProducts().map((product) => ({
    slug: product.slug,
  }));
}

// Disable unknown product URLs.
export const dynamicParams = false;

// Generate SEO metadata for each product page.
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,

    openGraph: {
      title: product.name,
      description: product.description,
      siteName: "My Useful Finds",
      locale: "en_PH",
      type: "website",
    },

    twitter: {
      card: "summary",
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryLabel = categoryLabels[product.category];

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">

        {/* Breadcrumb navigation */}
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/all-finds">All Finds</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-detail">

          {/* Product image */}
          <div className="product-detail-image">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.imageAlt}
                fetchPriority="high"
              />
            ) : (
              <div className="product-image-placeholder">
                <span>my useful finds.</span>
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="product-detail-content">

            <div className="product-detail-meta">
              <p className="product-detail-category">
                {categoryLabel}
              </p>

              {product.brand && (
                <span className="product-detail-brand">
                  {product.brand}
                </span>
              )}
            </div>

            <h1>{product.name}</h1>

            <p className="product-detail-description">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <section className="product-features">
                <h2>What makes it useful?</h2>

                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <span className="product-feature-icon">
                        <Check size={15} strokeWidth={2} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.affiliateUrl && (
              <div className="product-purchase-section">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="product-amazon-button"
                >
                  VIEW ON AMAZON
                  <ArrowUpRight size={17} />
                </a>

                <p className="product-affiliate-disclosure">
                  As an Amazon Associate I earn from qualifying
                  purchases. Some links on this page are affiliate
                  links, which means I may earn a commission at no
                  additional cost to you.
                </p>
              </div>
            )}

            <Link href="/all-finds" className="product-back-link">
              <ArrowLeft size={16} />
              BACK TO ALL FINDS
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
