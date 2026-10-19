'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  HelpCircle,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Package,
} from 'lucide-react';
import { Container } from '@/components/ui/container';

export function StorefrontHeader() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    'All Categories',
    'Electronics',
    'Home & Kitchen',
    'Fashion',
    'Beauty & Personal Care',
    'Grocery & Essentials',
    'Living & Tools',
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* 1. Top Notice Announcement Strip */}
      <div className="bg-[#111827] text-slate-200 text-xs py-2 px-4 border-b border-gray-800">
        <Container className="flex items-center justify-center text-center text-[11px] sm:text-xs font-normal tracking-wide">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Island-wide doorstep courier delivery across Sri Lanka</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-slate-300">Standard courier rates applied at checkout</span>
          </div>
        </Container>
      </div>

      {/* 2. Mobile Fast Delivery Strip */}
      <div className="sm:hidden bg-brand-primary text-white text-xs py-1.5 px-3 flex items-center justify-center gap-1.5 font-medium">
        <Truck className="w-3.5 h-3.5" />
        <span className="text-[11px]">Island-wide courier delivery • Fast & reliable</span>
      </div>

      {/* 3. Main Header Bar */}
      <div className="py-3 sm:py-3.5 border-b border-slate-100 bg-white">
        <Container className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-brand-primary rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 select-none shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-xl shadow-xs group-hover:bg-brand-hover transition-colors">
                <span className="transform -rotate-6">L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl sm:text-2xl leading-none text-slate-900 tracking-tight">
                  Lanka<span className="text-brand-primary">Direct</span>
                </span>
                <span className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 mt-0.5">
                  Direct Retail • Sri Lanka
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar with Category Dropdown (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/catalog?search=${encodeURIComponent(
                    searchQuery.trim()
                  )}`;
                }
              }}
              className="flex w-full h-11 items-center rounded-lg border border-slate-300 bg-white focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all overflow-hidden"
            >
              {/* Category Dropdown inside search */}
              <div className="relative border-r border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 pl-3.5 pr-8 text-xs font-semibold text-slate-700 bg-transparent cursor-pointer appearance-none focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 h-full px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />

              {/* Orange Search Submit Button */}
              <button
                type="submit"
                aria-label="Submit search"
                className="h-full px-5 bg-brand-primary hover:bg-brand-hover text-white transition-colors flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Right: Deliver To + Help + Account + Cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Deliver to Pin (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
              <div className="text-xs leading-tight">
                <span className="block text-[11px] text-slate-400 font-normal">Deliver to:</span>
                <span className="block font-bold text-slate-900">Colombo, WP</span>
              </div>
            </div>

            {/* Categories Link (Desktop) */}
            <Link
              href="/catalog"
              className="hidden xl:inline-block text-xs font-semibold text-slate-700 hover:text-brand-primary transition-colors"
            >
              Categories
            </Link>

            {/* Account Link (Desktop) */}
            <Link
              href="/account"
              className="hidden lg:inline-block text-xs font-semibold text-slate-700 hover:text-brand-primary transition-colors"
            >
              Account
            </Link>

            {/* My Orders Link */}
            <Link
              href="/orders"
              className={`hidden sm:inline-flex items-center text-xs font-semibold transition-colors ${
                pathname.startsWith('/orders') || pathname === '/account/orders'
                  ? 'text-brand-primary font-bold'
                  : 'text-slate-700 hover:text-brand-primary'
              }`}
            >
              My Orders
            </Link>

            {/* About Us Link (Active on /about) */}
            <Link
              href="/about"
              className={`hidden md:inline-flex items-center text-xs font-semibold transition-colors ${
                pathname === '/about'
                  ? 'text-brand-primary font-bold'
                  : 'text-slate-700 hover:text-brand-primary'
              }`}
            >
              About Us
            </Link>

            {/* Contact Us Link */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center text-xs font-semibold text-slate-700 hover:text-brand-primary transition-colors"
            >
              Contact Us
            </Link>

            {/* Help & Support Link */}
            <Link
              href="/faq"
              className="hidden xl:inline-flex items-center text-xs font-semibold text-slate-700 hover:text-brand-primary transition-colors"
            >
              Help &amp; Support
            </Link>

            {/* Cart Icon / Pill */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-700 hover:text-brand-primary transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Profile Avatar (Stitch Artboard) */}
            <Link
              href="/account"
              className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-2xs"
            >
              <Image
                src="/images/dinuka-avatar.jpg"
                alt="Dinuka Fernando"
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </Container>
      </div>

      {/* 4. Mobile Search Bar (Visible only on mobile/tablet) */}
      <div className="lg:hidden p-3 bg-white border-b border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/catalog?search=${encodeURIComponent(
                searchQuery.trim()
              )}`;
            }
          }}
          className="relative w-full"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* 5. Category Navigation Bar (Desktop) */}
      <div className="hidden lg:block border-b border-slate-200 bg-white">
        <Container className="flex items-center justify-between text-xs font-semibold text-slate-700 py-2.5">
          <nav className="flex items-center gap-6 xl:gap-8">
            <Link
              href="/catalog"
              className="flex items-center gap-1.5 text-slate-900 hover:text-brand-primary transition-colors"
            >
              <Menu className="w-3.5 h-3.5 text-slate-500" />
              <span>All Categories</span>
            </Link>
            <Link href="/catalog?category=electronics" className="hover:text-brand-primary transition-colors">
              Electronics
            </Link>
            <Link href="/categories/home-kitchen" className="hover:text-brand-primary transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/catalog?category=fashion" className="hover:text-brand-primary transition-colors">
              Fashion
            </Link>
            <Link href="/catalog?category=beauty-care" className="hover:text-brand-primary transition-colors">
              Beauty & Personal Care
            </Link>
            <Link href="/catalog?category=grocery-essentials" className="hover:text-brand-primary transition-colors">
              Grocery & Essentials
            </Link>
            <Link
              href="/catalog?deals=true"
              className="text-brand-primary hover:text-brand-hover font-bold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deals of the Week</span>
            </Link>
          </nav>
        </Container>
      </div>

      {/* 6. Courier & Trust Micro-strip (Desktop) */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-600 py-1.5">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span>
              <strong className="text-slate-800">Courier Shipping:</strong> Delivery through third-party courier services across Sri Lanka
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <div className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Genuine Retail Stock</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
              <span>Sri Lanka Wide Fulfillment</span>
            </div>
          </div>
        </Container>
      </div>

      {/* 7. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white p-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-brand-primary" />
              <span>Deliver to: Colombo, WP</span>
            </div>
            <Link
              href="/admin"
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              Admin Portal
            </Link>
          </div>
          <nav className="flex flex-col gap-2.5 text-sm font-medium text-slate-800">
            {categories.map((c) => (
              <Link
                key={c}
                href={`/catalog?category=${encodeURIComponent(c.toLowerCase())}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-brand-primary transition-colors flex items-center justify-between"
              >
                <span>{c}</span>
                <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400" />
              </Link>
            ))}
            <Link
              href="/catalog?deals=true"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-brand-primary font-bold border-t border-slate-100 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deals of the Week</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
