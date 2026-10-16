/**
 * LankaDirect Shared Contracts & API Enums
 * Source of truth for both apps/web and apps/api.
 */

export const CURRENCY = 'LKR' as const;
export type CurrencyCode = typeof CURRENCY;

/**
 * Status Enums defined in LankaDirect Specification
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED'
}

export enum PaymentStatus {
  UNPAID = 'UNPAID', // Default for Cash on Delivery (COD) until courier remittance
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export enum PaymentMethod {
  COD = 'COD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CARD = 'CARD'
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export enum DeliveryZone {
  COLOMBO_SUBURBS = 'COLOMBO_SUBURBS',
  GREATER_COLOMBO = 'GREATER_COLOMBO',
  OUTSTATION = 'OUTSTATION'
}

/**
 * Basic Entity Contracts (Minor units / cents for all monetary numbers)
 */
export interface ProductImageContract {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
}

export interface CategoryContract {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
}

export interface ProductContract {
  id: string;
  title: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  priceCents: number; // Stored in cents (e.g. LKR 2500.00 = 250000)
  salePriceCents?: number | null;
  stockQuantity: number;
  isActive: boolean;
  images: ProductImageContract[];
  createdAt: string; // ISO 8601 UTC
  updatedAt: string;
}

export interface AddressContract {
  id?: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  deliveryZone: DeliveryZone;
}

export interface OrderItemSnapshot {
  id: string;
  productId: string;
  sku: string;
  title: string;
  unitPriceCents: number;
  quantity: number;
  subtotalCents: number;
}

export interface OrderContract {
  id: string;
  orderNumber: string;
  userId?: string | null;
  isGuest: boolean;
  contactEmail: string;
  contactPhone: string;
  shippingAddress: AddressContract;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotalCents: number;
  shippingFeeCents: number;
  discountCents: number;
  totalCents: number;
  items: OrderItemSnapshot[];
  courierTrackingNumber?: string | null;
  createdAt: string;
}

/**
 * Standard API Pagination & Response Contracts
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown> | null;
}
