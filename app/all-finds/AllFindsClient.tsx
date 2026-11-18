"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpDown, SlidersHorizontal } from "lucide-react";

import ProductGrid from "@/components/ProductGrid";
import { searchProducts } from "@/data/products";
import type { ProductCategory } from "@/types/product";

const categories: {
  label: string;
  value: ProductCategory | "all";
}[] = [
  { label: "All Finds", value: "all" },
  { label: "Home & Kitchen", value: "home-kitchen" },
  { label: "Tech & Desk", value: "tech-desk" },
  { label: "Everyday Finds", value: "everyday-finds" },
  { label: "Beauty & Skincare", value: "beauty-skincare" },
  { label: "Fitness & Wellness", value: "fitness-wellness" },
];

type SortOption = "newest" | "alphabetical";

export default function AllFindsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | "all">("all");
  const [sortOption, setSortOption] =
    useState<SortOption>("newest");

  const displayedProducts = useMemo(() => {
    let results = searchProducts(searchQuery);

    if (selectedCategory !== "all") {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    results = [...results];

    if (sortOption === "newest") {
      results.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() -
          new Date(a.dateAdded).getTime()
      );
    } else {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [searchQuery, selectedCategory, sortOption]);

  const activeCategoryName =
    categories.find((category) => category.value === selectedCategory)
      ?.label ?? "All Finds";

  return (
    <main className="all-finds-page">
      <div className="container">
        <header className="all-finds-header">
          <span className="eyebrow">THE COMPLETE COLLECTION</span>

          <h1>All the useful finds.</h1>

          <p>
            Explore thoughtfully selected products, practical discoveries,
            and little things that can make everyday life better.
          </p>
        </header>

        <section className="all-finds-controls">
          <div className="all-finds-search">
            <Search size={19} strokeWidth={1.6} />

            <input
              type="search"
              placeholder="Search products, brands, or useful features..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search all finds"
            />

            {searchQuery && (
              <button
                type="button"
                className="clear-search-button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="all-finds-filter-heading">
            <div className="filter-heading-label">
              <SlidersHorizontal size={16} />
              <span>BROWSE BY CATEGORY</span>
            </div>
          </div>

          <div className="category-filters" aria-label="Product categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                className={`category-filter ${
                  selectedCategory === category.value
                    ? "category-filter-active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.value)}
                aria-pressed={selectedCategory === category.value}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        <section className="all-finds-results">
          <div className="all-finds-results-heading">
            <div>
              <span className="eyebrow">EXPLORE OUR FINDS</span>

              <h2>{activeCategoryName}.</h2>

              <p className="all-finds-count">
                {displayedProducts.length}{" "}
                {displayedProducts.length === 1 ? "product" : "products"} found
                {searchQuery.trim()
                  ? ` for "${searchQuery.trim()}"`
                  : ""}
              </p>
            </div>

            <label className="sort-control">
              <span>
                <ArrowUpDown size={15} />
                SORT BY
              </span>

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as SortOption)
                }
                aria-label="Sort products"
              >
                <option value="newest">Newest first</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </label>
          </div>

          <ProductGrid
            products={displayedProducts}
            emptyMessage="We couldn't find any products matching your search. Try a different keyword or category."
          />
        </section>
      </div>
    </main>
  );
}
