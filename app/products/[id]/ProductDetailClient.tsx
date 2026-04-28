"use client";

import { useCart } from "@/contexts/CartContext";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { Product } from "@/types/product";
import ImageWithLoader from "@/components/ImageWithLoader";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);
  const { run } = useProtectedAction();

  return (
    <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      <section aria-label="Product Details" className="contents">

        <figure>
          <ImageWithLoader
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </figure>

        <article>
          <header>
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <p className="text-gray-500 mt-1">
              {product.brand} • {product.category}
            </p>
          </header>

          <p className="text-yellow-500 mt-2">
            ⭐ {product.rating} / 5 ({product.reviews?.length || 0} reviews)
          </p>

          <div className="mt-3">
            <span className="text-2xl font-bold">
              ₹{product.price}
            </span>
          </div>

          <section className="mt-4">
            <h2 className="sr-only">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>

          <section className="mt-4 text-sm text-gray-600 space-y-1">
            <h2 className="sr-only">Product Info</h2>
            <p>📦 Stock: {product.stock}</p>
            <p>🚚 {product.shippingInformation}</p>
            <p>🛡️ {product.warrantyInformation}</p>
          </section>

          {isInCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => run(() => addToCart(product))}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          )}
        </article>
      </section>

      <section className="md:col-span-2 mt-6" aria-label="Customer Reviews">
        <h2 className="text-xl font-semibold mb-3">
          Customer Reviews
        </h2>

        <div className="space-y-3">
          {product.reviews?.slice(0, 3).map((r: { rating: number, comment: string, reviewerName: string }, i: number) => (
            <article key={i} className="border p-3 rounded">
              <p className="text-yellow-500">⭐ {r.rating}</p>
              <p className="text-sm">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                — {r.reviewerName}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}