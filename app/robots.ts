import { BASE_URL } from "@/lib/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}