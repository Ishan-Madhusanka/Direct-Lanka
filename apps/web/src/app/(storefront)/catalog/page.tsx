import React from 'react';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatLKR } from '@/lib/utils';

export default function CatalogPage() {
  const catalogProducts = [
    {
      id: 'prod-001',
      title: 'Premium Ceylon Cinnamon Sticks (Grade ALBA - 250g)',
      category: 'Spices & Gourmet',
      priceCents: 155000,
      originalPriceCents: 185000,
      stockStatus: 'In Stock',
      rating: 4.9,
    },
    {
      id: 'prod-002',
      title: 'Ergonomic Breathable Mesh Desk Chair - Colombo Series',
      category: 'Home & Office',
      priceCents: 2450000,
      stockStatus: 'In Stock',
      rating: 4.8,
    },
    {
      id: 'prod-003',
      title: 'Wireless Fast Charging Station 3-in-1 (Universal)',
      category: 'Electronics',
      priceCents: 590000,
      originalPriceCents: 680000,
      stockStatus: 'Low Stock',
      rating: 4.7,
    },
    {
      id: 'prod-004',
      title: 'Pure Organic Virgin Coconut Oil (500ml Cold Pressed)',
      category: 'Health & Wellness',
      priceCents: 145000,
      stockStatus: 'In Stock',
      rating: 5.0,
    },
    {
      id: 'prod-005',
      title: 'Stainless Steel Double Wall Vacuum Insulated Flask (750ml)',
      category: 'Home & Kitchen',
      priceCents: 320000,
      stockStatus: 'In Stock',
      rating: 4.6,
    },
    {
      id: 'prod-006',
      title: 'Smart LED Desk Lamp with USB Charging Port & Touch Dimmer',
      category: 'Electronics',
      priceCents: 475000,
      originalPriceCents: 550000,
      stockStatus: 'In Stock',
      rating: 4.8,
    },
  ];

  return (
    <div className="py-8">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-brand-muted mb-2">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-text font-medium">Catalog</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-brand-text">
                Product Catalog
              </h1>
              <p className="text-sm text-brand-muted mt-1">
                Showing {catalogProducts.length} verified products with island-wide COD
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort: Featured
              </Button>
            </div>
          </div>
        </div>

        {/* Content Layout with Filter Sidebar and Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Column */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <div className="p-4 border-b border-brand-border flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-brand-text flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                  Filter Products
                </span>
                <button className="text-xs text-brand-primary hover:underline font-medium">
                  Reset All
                </button>
              </div>

              <div className="p-4 space-y-6 text-sm">
                {/* Categories */}
                <div>
                  <h4 className="font-heading font-semibold text-xs text-brand-text uppercase tracking-wider mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {['All Categories', 'Electronics', 'Home & Office', 'Spices & Ceylon', 'Health & Wellness', 'Home & Kitchen'].map(
                      (cat, idx) => (
                        <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer text-brand-text hover:text-brand-primary">
                          <input
                            type="checkbox"
                            defaultChecked={idx === 0}
                            className="rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                          />
                          <span>{cat}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="border-t border-brand-subtle pt-4">
                  <h4 className="font-heading font-semibold text-xs text-brand-text uppercase tracking-wider mb-3">
                    Price Range (LKR)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="number"
                      placeholder="Min (Rs.)"
                      className="h-8 px-2 rounded border border-brand-border bg-brand-surface text-brand-text"
                    />
                    <input
                      type="number"
                      placeholder="Max (Rs.)"
                      className="h-8 px-2 rounded border border-brand-border bg-brand-surface text-brand-text"
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="border-t border-brand-subtle pt-4">
                  <h4 className="font-heading font-semibold text-xs text-brand-text uppercase tracking-wider mb-3">
                    Delivery & Stock
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                      />
                      <span>Cash On Delivery</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                      />
                      <span>In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Product Grid Column */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {catalogProducts.map((prod) => (
                <Card
                  key={prod.id}
                  className="group overflow-hidden flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-md transition-all"
                >
                  <div>
                    {/* Placeholder Frame */}
                    <div className="aspect-square bg-slate-100 flex items-center justify-center border-b border-brand-border/60 relative">
                      <span className="text-3xl text-slate-300 font-bold font-heading">
                        LankaDirect
                      </span>
                      <div className="absolute top-2.5 right-2.5">
                        <Badge
                          variant={prod.stockStatus === 'In Stock' ? 'success' : 'warning'}
                          className="text-[10px]"
                        >
                          {prod.stockStatus}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="pt-4 space-y-1.5">
                      <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">
                        {prod.category}
                      </span>
                      <h3 className="font-heading font-semibold text-sm text-brand-text group-hover:text-brand-primary transition-colors line-clamp-2">
                        {prod.title}
                      </h3>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="font-heading font-bold text-base text-brand-text">
                          {formatLKR(prod.priceCents)}
                        </span>
                        {prod.originalPriceCents && (
                          <span className="text-xs text-brand-muted line-through">
                            {formatLKR(prod.originalPriceCents)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-4 pt-0">
                    <Button size="sm" className="w-full text-xs">
                      View Product
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
