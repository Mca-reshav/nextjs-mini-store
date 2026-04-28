import { apiServices } from "@/services/api";
import ProductListClient from "./ProductListClient";
import { BASE_URL } from "@/lib/config";
import { routePath } from "@/types/route";

export const metadata = {
  title: "Products",
  description: "Browse all products",
  alternates: {
    canonical: `${BASE_URL}${routePath.products}`,
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams,
    data = await apiServices.getProducts(),
    category = params?.category || "";

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      <ProductListClient
        initialProducts={data.products}
        category={category}
      />
    </div>
  );
}