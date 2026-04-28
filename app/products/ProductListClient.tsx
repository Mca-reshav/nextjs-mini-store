"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { apiServices } from "@/services/api";
import { useRouter } from "next/navigation";
import { routePath } from "@/types/route";

export default function ProductListClient({
  initialProducts,
  category,
}: {
  initialProducts: Product[];
  category?: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedBrand, setSelectedBrand] = useState("");

  const brands = useMemo(
    () =>
      [...new Set(initialProducts.map((p) => p.brand).filter(Boolean))],
    [initialProducts]
  );

  const categories = useMemo(
    () => [...new Set(initialProducts.map((p) => p.category))],
    [initialProducts]
  );

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setProducts(initialProducts);
        return;
      }

      setLoading(true);
      const res = await apiServices.searchProducts(query);
      setProducts(res.products);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, initialProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true;

      const matchBrand = selectedBrand
        ? p.brand === selectedBrand
        : true;

      return matchCategory && matchBrand;
    });
  }, [products, selectedCategory, selectedBrand]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <aside className="border p-4 rounded-lg h-fit space-y-4 sticky top-24 bg-white">
        <h2 className="font-semibold text-lg">Filters</h2>

        <section>
          <label className="text-sm font-medium">Category</label>
          <select
            className="w-full border p-2 mt-1 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={`cat-${c}`} value={c}>
                {c}
              </option>
            ))}
          </select>
        </section>

        <section>
          <label className="text-sm font-medium">Brand</label>
          <select
            className="w-full border p-2 mt-1 rounded"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All</option>
            {brands.map((b) => (
              <option key={`brand-${b}`} value={b}>
                {b}
              </option>
            ))}
          </select>
        </section>

        <button
          onClick={() => {
            setSelectedCategory("");
            setSelectedBrand("");
            setQuery("");
            setProducts(initialProducts);

            router.push(routePath.products);
          }}
          className="w-full text-sm border py-2 rounded hover:bg-gray-100"
        >
          Reset Filters
        </button>
      </aside>

      <section className="md:col-span-3">

        <div className="sticky top-20 bg-white pb-3 z-10">
          <input
            placeholder="Search products..."
            className="border px-3 py-2 w-full rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {loading && <p className="mt-3">Loading...</p>}

        <section
          aria-label="Product List"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4"
        >
          {filteredProducts.map((p) => (
            <article key={p.id}>
              <ProductCard product={p} />
            </article>
          ))}
        </section>

        {!filteredProducts.length && (
          <p className="mt-4 text-gray-500">No products found</p>
        )}
      </section>
    </main>
  );
}