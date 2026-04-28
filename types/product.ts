export type Product = {
  id: number;
  title: string;
  description: string;

  category: string;
  brand?: string;

  price: number;
  discountPercentage?: number;

  rating: number;
  stock: number;
  availabilityStatus?: string;

  thumbnail: string;
  images?: string[];

  tags?: string[];

  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;

  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];

  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
};