export interface Product {
  availabilityStatus?: string;
  brand?: string;
  category?: string;
  description?: string;
  dimensions?: { width: number; height: number; depth: number };
  discountPercentage?: number;
  id?: string;
  images?: string[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity?: number;
  price?: number;
  rating?: number;
  returnPolicy?: string;
  reviews?: object[];
  shippingInformation?: string;
  sku?: string;
  stock: number;
  tags?: string[];
  thumbnail?: string;
  title: string;
  warrantyInformation?: string;
  weight?: number;
}
