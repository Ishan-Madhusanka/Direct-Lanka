import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Truck, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export function StorefrontFooter() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      {/* Trust & Guarantee Section */}
      <div className="border-b border-brand-subtle py-8 bg-brand-bg/50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-brand-primary shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-brand-text">
                  Island-wide Delivery
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Fast courier dispatch to all 25 districts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-brand-text">
                  Cash on Delivery (COD)
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Pay cash at your doorstep safely
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-brand-text">
                  Friendly Support
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Direct hotline support in Sinhala & English
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-brand-text">
                  Genuine Guarantee
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Original products with verified warranty
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-bold text-lg">
                  L
                </div>
                <span className="font-heading font-bold text-xl text-brand-text">
                  Lanka<span className="text-brand-primary">Direct</span>
                </span>
              </Link>
              <p className="text-sm text-brand-muted max-w-sm mb-4 leading-relaxed">
                LankaDirect is a direct-to-customer online store delivering quality goods across Sri Lanka with transparent pricing in Sri Lankan Rupees (LKR) and reliable cash-on-delivery.
              </p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span>Colombo, Western Province, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <span>contact@lankadirect.lk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-heading font-semibold text-sm text-brand-text mb-3">
                Shopping
              </h5>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li>
                  <Link href="/catalog" className="hover:text-brand-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?deals=true" className="hover:text-brand-primary transition-colors">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-brand-primary transition-colors">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" className="hover:text-brand-primary transition-colors">
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h5 className="font-heading font-semibold text-sm text-brand-text mb-3">
                Customer Care
              </h5>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li>
                  <Link href="/orders/track" className="hover:text-brand-primary transition-colors">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-brand-primary transition-colors">
                    Delivery Rates & Times
                  </Link>
                </li>
                <li>
                  <Link href="/returns-policy" className="hover:text-brand-primary transition-colors">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-brand-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Policy */}
            <div>
              <h5 className="font-heading font-semibold text-sm text-brand-text mb-3">
                Store Policies
              </h5>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li>
                  <Link href="/terms" className="hover:text-brand-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-brand-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cod-policy" className="hover:text-brand-primary transition-colors">
                    Cash On Delivery Terms
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-brand-primary font-medium hover:underline">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border py-4 bg-brand-bg text-center text-xs text-brand-muted">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} LankaDirect (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs">
            <span>Prices in Sri Lankan Rupees (LKR)</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Island-wide Courier Delivery</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
