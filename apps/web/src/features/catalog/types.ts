export interface CatalogFilterState {
  search?: string;
  categorySlug?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  inStockOnly?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'bestseller';
  page: number;
}
