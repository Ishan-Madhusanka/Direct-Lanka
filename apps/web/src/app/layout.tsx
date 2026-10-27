import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LankaDirect | Sri Lanka Direct-to-Customer Online Store',
  description:
    'LankaDirect is your premier direct-to-customer online store in Sri Lanka with Island-wide Cash on Delivery and transparent LKR pricing.',
  keywords: [
    'Sri Lanka shopping',
    'LankaDirect',
    'Cash on delivery Sri Lanka',
    'LKR e-commerce',
    'Colombo online shopping',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
