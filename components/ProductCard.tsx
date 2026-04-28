"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import Image from "next/image";
import { routePath } from "@/types/route";

export default function ProductCard({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "preview";
}) {
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCart();
  const { run } = useProtectedAction();

  const isInCart = cart.some((item) => item.id === product.id);

  const discountedPrice = (
    product.price -
    (product.price * (product.discountPercentage || 0)) / 100
  ).toFixed(2);

  return (
    <div
      onClick={() => router.push(`${routePath.products}/${product.id}`)}
      className="group border rounded p-4 shadow hover:shadow-xl transition bg-white cursor-pointer"
    >
      <div className="relative overflow-hidden rounded">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="mt-3">
        <h2 className="font-semibold line-clamp-1">{product.title}</h2>

        <p className="text-xs text-gray-500 capitalize">
          {product.category} • {product.brand}
        </p>

        <p className="text-yellow-500 text-sm mt-1">
          ⭐ {product.rating}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-lg">₹{discountedPrice}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{product.price}
          </span>
        </div>
      </div>

      {variant === "default" && (
        <div
          className="mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          {isInCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-full py-2 rounded bg-red-500 text-white text-sm"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={() => run(() => addToCart(product))}
              className="w-full py-2 rounded bg-green-500 text-white text-sm"
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}