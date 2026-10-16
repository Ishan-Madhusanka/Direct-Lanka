import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names and merges Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats monetary amounts from integer minor units (cents) to Sri Lankan Rupees (LKR)
 * Example: 250000 -> "Rs. 2,500.00" or "LKR 2,500.00"
 */
export function formatLKR(amountInCents: number, prefix: 'LKR' | 'Rs.' = 'LKR'): string {
  const rupees = amountInCents / 100;
  const formattedNumber = new Intl.NumberFormat('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rupees);

  return `${prefix} ${formattedNumber}`;
}

/**
 * Formats timestamps in the Asia/Colombo timezone per specification
 */
export function formatDateLK(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat('en-LK', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
