'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ShieldCheck,
  Truck,
  LayoutDashboard,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function StorefrontHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-surface border-b border-brand-border">
      {/* Top Banner */}
      <div className="bg-brand-text text-white text-xs py-2 px-4">
        <Container className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-brand-primary" />
            <span>Island-wide Sri Lanka delivery • Cash on Delivery (COD) available</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Genuine Products</span>
            </div>
            <span>|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-brand-primary hover:text-brand-hover font-medium transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Store Owner Admin</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3.5">
        <Container className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none group">
            <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-xl shadow-sm group-hover:bg-brand-hover transition-colors">
              L
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-brand-text tracking-tight">
                Lanka<span className="text-brand-primary">Direct</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-muted">
                Online Store • Sri Lanka
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-6">
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
                placeholder="Search products, brands, categories..."
                className="w-full h-10 pl-10 pr-24 rounded-full border border-brand-border bg-brand-bg text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 text-xs h-8"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            {/* Currency Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LKR (රු)</span>
            </div>

            {/* Account Link */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 p-2 rounded-lg text-brand-text hover:bg-brand-bg transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5 text-brand-muted" />
              <span className="hidden md:inline text-sm font-medium">Account</span>
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-50 text-brand-primary hover:bg-orange-100 transition-colors font-medium text-sm"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-brand-primary" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-brand-primary text-white text-[11px] font-bold">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-text hover:bg-brand-bg rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Sub-navigation Links (Desktop) */}
      <div className="hidden lg:block border-t border-brand-subtle bg-brand-surface">
        <Container className="flex items-center justify-between py-2.5 text-sm">
          <nav className="flex items-center gap-6 font-medium text-brand-text">
            <Link
              href="/"
              className="hover:text-brand-primary transition-colors text-brand-primary font-semibold"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="hover:text-brand-primary transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/catalog?category=electronics"
              className="hover:text-brand-primary transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/catalog?category=fashion"
              className="hover:text-brand-primary transition-colors"
            >
              Fashion & Lifestyle
            </Link>
            <Link
              href="/catalog?category=home"
              className="hover:text-brand-primary transition-colors"
            >
              Home & Kitchen
            </Link>
            <Link
              href="/catalog?deals=true"
              className="flex items-center gap-1.5 text-brand-primary hover:text-brand-hover transition-colors font-semibold"
            >
              <span>Hot Deals</span>
              <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                Save
              </Badge>
            </Link>
          </nav>
          <div className="text-xs text-brand-muted">
            Customer Support:{' '}
            <span className="font-semibold text-brand-text">+94 11 234 5678</span>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-brand-surface p-4 shadow-lg">
          <div className="mb-4">
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
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-brand-border bg-brand-bg text-sm text-brand-text"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            </form>
          </div>
          <nav className="flex flex-col gap-3 font-medium text-brand-text">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-primary"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-primary"
            >
              All Products
            </Link>
            <Link
              href="/catalog?deals=true"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-brand-primary font-semibold"
            >
              Hot Deals & Promotions
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-brand-primary font-medium flex items-center gap-2 border-t border-brand-subtle pt-3"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Store Owner Admin Panel</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
