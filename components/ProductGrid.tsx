
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "No finds available yet. Check back soon!",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
