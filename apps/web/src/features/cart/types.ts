export interface CartItem {
  productId: string;
  sku: string;
  title: string;
  imageUrl?: string;
  unitPriceCents: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotalCents: number;
  estimatedShippingCents: number;
  discountCents: number;
  totalCents: number;
}
