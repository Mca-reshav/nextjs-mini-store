"use client";

import { useCart } from "@/contexts/CartContext";
import ImageWithLoader from "@/components/ImageWithLoader";

export default function CartClient() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (!cart.length) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Your Cart is Empty 🛒
        </h1>
        <p className="text-gray-500">
          Looks like you haven’t added anything yet.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>

        <button
          type="button"
          onClick={() => {
            if (confirm("Clear entire cart?")) clearCart();
          }}
          className="text-sm px-5 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Clear Cart
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <section className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-6 border p-5 rounded"
            >
              <ImageWithLoader
                src={item.thumbnail}
                alt={item.title}
                width={110}
                height={90}
                className="rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="border rounded p-6 sticky top-24 bg-white">
          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">
            Checkout
          </button>
        </aside>
      </section>
    </main>
  );
}