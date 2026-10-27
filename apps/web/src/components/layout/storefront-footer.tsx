'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Home,
  Store,
  LayoutGrid,
  Tag,
  User,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '@/components/ui/container';

export function StorefrontFooter() {
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/catalog') && !pathname.includes('deals');
  const isCategories = pathname.startsWith('/categories');
  const isDeals = pathname.includes('deals');
  const isAccount =
    pathname.startsWith('/account') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <>
      <footer className="bg-white border-t border-slate-200 mt-auto pb-16 sm:pb-0">
        {/* Main Desktop Footer */}
        <div className="py-12 lg:py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
              {/* Column 1: Brand Info & Direct Contacts */}
              <div className="lg:col-span-2 space-y-4">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-lg shadow-xs">
                    L
                  </div>
                  <span className="font-heading font-black text-xl text-slate-900 tracking-tight">
                    Lanka<span className="text-brand-primary">Direct</span>
                  </span>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
                  LankaDirect is your trusted Sri Lankan online retail store delivering quality products directly to your doorstep via reliable courier partners across the island.
                </p>

                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>+94 11 234 5678 (Hotline)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>support@lankadirect.lk</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>Colombo 03, Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>Mon - Sat 08:30 AM - 06:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="hidden sm:block">
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-3.5 tracking-tight">
                  Quick Links
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li>
                    <Link href="/about" className="hover:text-brand-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-brand-primary transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-brand-primary transition-colors">
                      FAQs & Store Policies
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog" className="hover:text-brand-primary transition-colors">
                      All Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="hover:text-brand-primary transition-colors">
                      Track Order via Courier
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Customer Care & Delivery */}
              <div className="hidden sm:block">
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-3.5 tracking-tight">
                  Customer Care & Delivery
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li>
                    <Link href="/shipping" className="hover:text-brand-primary transition-colors">
                      Shipping Information
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="hover:text-brand-primary transition-colors">
                      Delivery through third-party courier services island-wide
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="hover:text-brand-primary transition-colors">
                      Return & Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-brand-primary transition-colors">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-brand-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Accepted Payment Methods */}
              <div className="hidden sm:block">
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-3.5 tracking-tight">
                  Accepted Payment Methods
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Safe & encrypted payments with regional gateways:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Visa', 'MasterCard', 'Koko Pay', 'Mintpay', 'Bank Transfer'].map((m) => (
                    <span
                      key={m}
                      className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-brand-hover text-xs font-semibold text-center">
                  Cash on Delivery (COD) Available
                </div>
              </div>

              {/* Mobile Accordion Sections */}
              <div className="sm:hidden col-span-1 divide-y divide-slate-200 border-y border-slate-200 -mx-4 px-4">
                {[
                  {
                    id: 'about',
                    title: 'About Us',
                    links: [
                      { label: 'Our Story', href: '/about' },
                      { label: 'Contact Us', href: '/contact' },
                      { label: 'Store Policies', href: '/faq' },
                    ],
                  },
                  {
                    id: 'shipping',
                    title: 'Shipping & Courier Policy',
                    links: [
                      { label: 'Courier Partners in Sri Lanka', href: '/shipping' },
                      { label: 'Colombo & Outstation Rates', href: '/shipping' },
                      { label: 'Tracking Support', href: '/orders' },
                    ],
                  },
                  {
                    id: 'returns',
                    title: 'Returns & Exchanges',
                    links: [
                      { label: '7-Day Return Assistance', href: '/returns' },
                      { label: 'Terms & Conditions', href: '/terms' },
                      { label: 'Privacy Policy', href: '/privacy' },
                    ],
                  },
                  {
                    id: 'contact',
                    title: 'Contact Us',
                    links: [
                      { label: 'WhatsApp Helpline', href: '/contact' },
                      { label: 'Customer Care Call Center', href: '/contact' },
                      { label: 'Colombo Storefront Office', href: '/contact' },
                    ],
                  },
                ].map((sec) => (
                  <div key={sec.id} className="py-3">
                    <button
                      onClick={() => toggleAccordion(sec.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-slate-900"
                    >
                      <span>{sec.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion === sec.id ? 'rotate-180 text-brand-primary' : ''
                          }`}
                      />
                    </button>
                    {openAccordion === sec.id && (
                      <div className="pt-2 pb-1 pl-1 space-y-2">
                        {sec.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            className="block text-xs text-slate-600 hover:text-brand-primary"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Payment Pill Strip */}
              <div className="sm:hidden pt-4 text-center">
                <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                  {['Visa', 'Mastercard', 'Koko', 'Mintpay'].map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <span className="inline-block px-3 py-1 rounded bg-orange-50 border border-orange-200 text-brand-primary text-[11px] font-bold">
                  Cash On Delivery
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-200 py-4 bg-slate-50 text-[11px] text-slate-500">
          <Container className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p>© 2025 LankaDirect PVT LTD. All rights reserved. A Direct-Infra company.</p>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Direct Courier Delivery</span>
            </div>
          </Container>
        </div>
      </footer>

      {/* Fixed Sticky Mobile Bottom Navigation Bar (Matching Stitch Mobile Artboard) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-1.5 px-3 shadow-lg flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${isHome ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'text-brand-primary' : 'text-slate-400'}`} />
          <span>Home</span>
        </Link>

        <Link
          href="/catalog"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${isShop ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
        >
          <Store className={`w-5 h-5 ${isShop ? 'text-brand-primary' : 'text-slate-400'}`} />
          <span>Shop</span>
        </Link>

        <Link
          href="/categories/home-kitchen"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${isCategories ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
        >
          <LayoutGrid className={`w-5 h-5 ${isCategories ? 'text-brand-primary' : 'text-slate-400'}`} />
          <span>Categories</span>
        </Link>

        <Link
          href="/catalog?deals=true"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${isDeals ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
        >
          <Tag className={`w-5 h-5 ${isDeals ? 'text-brand-primary' : 'text-slate-400'}`} />
          <span>Deals</span>
        </Link>

        <Link
          href="/account"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${isAccount ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
        >
          <User className={`w-5 h-5 ${isAccount ? 'text-brand-primary' : 'text-slate-400'}`} />
          <span>Account</span>
        </Link>
      </div>
    </>
  );
}
