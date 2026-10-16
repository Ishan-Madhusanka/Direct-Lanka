import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatLKR } from '@/lib/utils';

export default function HomePage() {
  const sampleProducts = [
    {
      id: 'prod-001',
      title: 'Premium Ceylon Cinnamon Sticks (Grade ALBA - 250g)',
      category: 'Spices & Gourmet',
      priceCents: 185000, // LKR 1,850.00
      salePriceCents: 155000, // LKR 1,550.00
      badge: 'Hot Deal',
      rating: 4.9,
    },
    {
      id: 'prod-002',
      title: 'Ergonomic Breathable Mesh Desk Chair - Colombo Series',
      category: 'Home & Office',
      priceCents: 2450000, // LKR 24,500.00
      badge: 'Bestseller',
      rating: 4.8,
    },
    {
      id: 'prod-003',
      title: 'Wireless Fast Charging Station 3-in-1 (Universal)',
      category: 'Electronics',
      priceCents: 680000, // LKR 6,800.00
      salePriceCents: 590000, // LKR 5,900.00
      badge: 'Save 13%',
      rating: 4.7,
    },
    {
      id: 'prod-004',
      title: 'Pure Organic Virgin Coconut Oil (500ml Cold Pressed)',
      category: 'Health & Wellness',
      priceCents: 145000, // LKR 1,450.00
      badge: 'Organic',
      rating: 5.0,
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-brand-bg to-brand-bg py-12 lg:py-20 border-b border-brand-border/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-semibold text-brand-hover">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>Sri Lanka Direct-to-Customer Store Baseline</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-text tracking-tight leading-[1.15]">
                Direct Shopping Across Sri Lanka with{' '}
                <span className="text-brand-primary underline decoration-orange-300 underline-offset-4">
                  Cash on Delivery
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover quality products at transparent prices in Sri Lankan Rupees (LKR).
                Enjoy secure checkout, courier tracking, and island-wide delivery.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/catalog">
                  <Button size="lg" className="shadow-md">
                    <ShoppingBag className="w-5 h-5 mr-1" />
                    Browse Catalog
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" size="lg">
                    Admin Portal
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Delivery info pills */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-xs text-brand-muted font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>LKR Standard Pricing</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Courier Tracking</span>
                </div>
              </div>
            </div>

            {/* Architecture / Structure Card */}
            <div className="lg:col-span-5">
              <Card className="shadow-lg border-orange-200/80 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="brand">Frontend Baseline Ready</Badge>
                    <span className="text-xs font-mono text-brand-muted">v1.0.0</span>
                  </div>
                  <CardTitle className="text-xl mt-2">LankaDirect Monorepo Architecture</CardTitle>
                  <CardDescription>
                    Ready for step-by-step UI page integration with Google Stitch artboards.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-brand-bg border border-brand-border space-y-1.5">
                    <div className="font-semibold text-brand-text flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-brand-primary" />
                      <span>Storefront Scope (15 Page Types)</span>
                    </div>
                    <p className="text-brand-muted">
                      Home, Catalog, Category, Search, Product Detail, Cart, Checkout, Order Confirmation, Auth, Account/Orders, Policy pages.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-brand-bg border border-brand-border space-y-1.5">
                    <div className="font-semibold text-brand-text flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-brand-primary" />
                      <span>Owner Admin Scope (12 Page Types)</span>
                    </div>
                    <p className="text-brand-muted">
                      Dashboard, Products, Categories, Inventory, Orders, Customers, Coupons, Sales Reports, Store Settings.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-50/60 border border-orange-200 text-orange-950">
                    <div className="font-semibold">Locked Design Tokens</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white border border-orange-200 font-mono">
                        Primary: #F97316
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-orange-200 font-mono">
                        Currency: LKR
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-orange-200 font-mono">
                        Desktop: 1440px / Mobile: 390px
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Categories */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-brand-text">
                Explore Categories
              </h2>
              <p className="text-sm text-brand-muted mt-0.5">
                Curated collections for everyday lifestyle
              </p>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Electronics', count: '48 items', icon: '⚡' },
              { name: 'Home & Kitchen', count: '120 items', icon: '🏠' },
              { name: 'Spices & Ceylon', count: '35 items', icon: '🌿' },
              { name: 'Fashion & Wear', count: '94 items', icon: '👕' },
              { name: 'Health & Beauty', count: '62 items', icon: '✨' },
              { name: 'Toys & Kids', count: '41 items', icon: '🎁' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/catalog?category=${encodeURIComponent(cat.name.toLowerCase())}`}
                className="group p-4 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:shadow-sm transition-all text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-heading font-semibold text-sm text-brand-text group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-brand-muted mt-1 block">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products Showcase (Using Minor Units LKR) */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-brand-text">
                Featured Products
              </h2>
              <p className="text-sm text-brand-muted mt-0.5">
                Hand-picked quality items with verified customer satisfaction
              </p>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-md transition-all"
              >
                <div>
                  {/* Image Placeholder Frame */}
                  <div className="relative aspect-square bg-slate-100 flex items-center justify-center border-b border-brand-border/60 overflow-hidden">
                    <div className="text-4xl text-slate-300 font-bold font-heading">
                      LankaDirect
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="brand">{product.badge}</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="pt-4 space-y-2">
                    <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-heading font-semibold text-base text-brand-text group-hover:text-brand-primary transition-colors line-clamp-2">
                      {product.title}
                    </h3>

                    {/* Price in LKR formatted from Minor Units */}
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-heading font-bold text-lg text-brand-text">
                        {formatLKR(product.salePriceCents ?? product.priceCents)}
                      </span>
                      {product.salePriceCents && (
                        <span className="text-xs text-brand-muted line-through">
                          {formatLKR(product.priceCents)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>

                <div className="p-5 pt-0">
                  <Button className="w-full text-xs h-9" variant="outline">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Sri Lankan Delivery & Payment Notice */}
      <section>
        <Container>
          <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <h3 className="font-heading font-bold text-2xl">
                  Cash on Delivery Across All Sri Lankan Districts
                </h3>
                <p className="text-orange-100 text-sm max-w-xl leading-relaxed">
                  No credit card required to order! Simply place your order online, track your package via courier tracking reference, and pay in cash when the delivery reaches your door.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link href="/catalog">
                  <Button
                    size="lg"
                    className="bg-white text-brand-text hover:bg-orange-50 font-semibold shadow-lg"
                  >
                    Start Shopping Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
