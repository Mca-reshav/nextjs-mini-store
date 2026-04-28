import CartClient from "./CartClient";
import { BASE_URL } from "@/lib/config";

export const metadata = {
  title: "Cart",
  description: "Review items in your shopping cart and proceed to checkout.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${BASE_URL}/cart`,
  },
};

export default function CartPage() {
  return <CartClient />;
}