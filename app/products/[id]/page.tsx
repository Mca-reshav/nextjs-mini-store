import { apiServices } from "@/services/api";
import ProductDetailClient from "./ProductDetailClient";
import { routePath } from "@/types/route";
import { BASE_URL } from "@/lib/config";

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const product = await apiServices.getProduct(id);

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `${BASE_URL}${routePath.products}/${id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: any) {
  const { id } = await params,
    product = await apiServices.getProduct(id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            image: product.thumbnail,
            description: product.description,
            brand: product.brand,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}