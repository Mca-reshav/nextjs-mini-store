import { Product } from "@/types/product";
import { routePath } from "@/types/route";

const BASE_URL = "https://dummyjson.com";

const endPoints = {
    products: routePath.products,
    productById: (id: string | number) => `${routePath.products}/${id}`,
    searchProducts: (query: string) => `${routePath.products}/search?q=${query}`,
};

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        // cache: "no-store",
    });

    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
}

export const apiServices = {
    getProducts: () => fetchAPI<{ products: Product[] }>(endPoints.products),

    getProduct: (id: string | number) =>
        fetchAPI<Product>(endPoints.productById(id)),

    searchProducts: (query: string) =>
        fetchAPI<{ products: Product[] }>(endPoints.searchProducts(query)),
};