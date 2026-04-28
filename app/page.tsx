import { apiServices } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";
import { routePath } from "@/types/route";

export const metadata = {
  title: "Home | Mini Store",
  description: "Explore top products at Mini Store",
};

export default async function Home() {
  const data = await apiServices.getProducts();
  const products = data.products;

  const featured = products.slice(0, 6);

  const categories = [...new Set(products.map((p: Product) => p.category))].slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      <section className="relative rounded overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next Favorite Product
          </h1>

          <p className="text-lg opacity-90 mb-6">
            Shop trending items across categories with best deals
          </p>

          <Link
            href={routePath.products}
            className="bg-white text-black px-6 py-3 rounded font-medium hover:scale-105 transition"
          >
            Explore Products →
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat: string) => (
            <Link
              key={cat}
              href={`${routePath.products}?category=${cat}`}
              className="border rounded p-4 text-center hover:shadow-md hover:bg-gray-50 transition capitalize"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Featured Products
          </h2>

          <Link href={routePath.products} className="text-blue-500 text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="preview"
            />
          ))}
        </div>
      </section>
    </div>
  );
}