import { MetadataRoute } from "next";
import { apiServices } from "@/services/api";
import { BASE_URL } from "@/lib/config";
import { Product } from "@/types/product";
import { routePath } from "@/types/route";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await apiServices.getProducts();
  const productUrls = data.products.map((product: Product) => ({
    url: `${BASE_URL}${routePath.products}/${product.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${routePath.products}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${routePath.about}`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}