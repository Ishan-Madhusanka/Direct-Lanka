import { DeliveryZone, PaymentMethod } from '@lankadirect/contracts';

export interface CheckoutFormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  deliveryZone: DeliveryZone;
  paymentMethod: PaymentMethod;
  notes?: string;
}
