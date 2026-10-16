'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  ChevronRight,
  Truck,
  Zap,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Heart,
  ShoppingCart,
  Star,
  Check,
  CheckCircle2,
  Package,
  X,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatLKR } from '@/lib/utils';

interface KitchenProduct {
  id: string;
  title: string;
  brand: string;
  subcategory: string;
  priceCents: number;
  originalPriceCents?: number | null;
  discountPercent?: number | null;
  badge?: string;
  badgeColor?: 'red' | 'dark' | 'green' | 'orange';
  deliveryTag: string;
  rating: number;
  reviewsCount: number;
  image: string;
  inStock: boolean;
}

export default function HomeKitchenCategoryPage() {
  // Subcategory and filter state
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number>(1000);
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(6);

  // Subcategories matching Stitch Artboard
  const subcategories = [
    { key: 'all', label: 'All Home & Kitchen', shortLabel: 'All', count: 42 },
    { key: 'cookware', label: 'Cookware & Pans', shortLabel: 'Cookware', count: 14 },
    { key: 'appliances', label: 'Small Kitchen Appliances', shortLabel: 'Appliances', count: 12 },
    { key: 'storage', label: 'Storage & Containers', shortLabel: 'Storage', count: 9 },
    { key: 'dinnerware', label: 'Dinnerware & Cutlery', shortLabel: 'Dinnerware', count: 7 },
  ];

  // Authorized Brands
  const authorizedBrands = [
    { name: 'Singer', count: 8 },
    { name: 'Philips', count: 6 },
    { name: 'Tefal', count: 5 },
    { name: 'Preethi', count: 4 },
    { name: 'Panasonic', count: 7 },
  ];

  // 9 Products from the Stitch Artboard
  const products: KitchenProduct[] = [
    {
      id: 'hk-001',
      title: 'Singer 1.8L Stainless Steel Electric Kettle',
      brand: 'SINGER',
      subcategory: 'appliances',
      priceCents: 495000,
      originalPriceCents: 580000,
      discountPercent: 15,
      deliveryTag: 'In Stock • Colombo Express',
      rating: 4.8,
      reviewsCount: 123,
      image: '/images/product-kettle.jpg',
      inStock: true,
    },
    {
      id: 'hk-002',
      title: 'Philips Daily Collection Mini Food Processor 450W',
      brand: 'PHILIPS',
      subcategory: 'appliances',
      priceCents: 1480000,
      originalPriceCents: null,
      discountPercent: null,
      badge: 'Popular',
      badgeColor: 'dark',
      deliveryTag: 'In Stock • 2-Day',
      rating: 4.9,
      reviewsCount: 84,
      image: '/images/product-processor.jpg',
      inStock: true,
    },
    {
      id: 'hk-003',
      title: 'Tefal Primary Non-Stick 28cm Frying Pan',
      brand: 'TEFAL',
      subcategory: 'cookware',
      priceCents: 720000,
      originalPriceCents: 800000,
      discountPercent: 10,
      deliveryTag: 'In Stock • Express',
      rating: 4.7,
      reviewsCount: 93,
      image: '/images/product-pan.jpg',
      inStock: true,
    },
    {
      id: 'hk-004',
      title: 'Preethi Eco Twin 550W Mixer Grinder 2-Jar',
      brand: 'PREETHI',
      subcategory: 'appliances',
      priceCents: 1890000,
      originalPriceCents: null,
      discountPercent: null,
      badge: 'Top Choice',
      badgeColor: 'green',
      deliveryTag: 'In Stock',
      rating: 4.8,
      reviewsCount: 142,
      image: '/images/product-grinder.jpg',
      inStock: true,
    },
    {
      id: 'hk-005',
      title: 'Prestige Hard Anodized 3L Pressure Cooker',
      brand: 'PRESTIGE',
      subcategory: 'cookware',
      priceCents: 865000,
      originalPriceCents: null,
      discountPercent: null,
      deliveryTag: 'In Stock • Colombo',
      rating: 4.9,
      reviewsCount: 210,
      image: '/images/product-cooker.jpg',
      inStock: true,
    },
    {
      id: 'hk-006',
      title: 'Borosil Glass Airtight Storage Container Set of 3',
      brand: 'BOROSIL',
      subcategory: 'storage',
      priceCents: 420000,
      originalPriceCents: 495000,
      discountPercent: 15,
      deliveryTag: 'In Stock • 24h Dispatch',
      rating: 4.6,
      reviewsCount: 45,
      image: '/images/product-storage.jpg',
      inStock: true,
    },
    {
      id: 'hk-007',
      title: 'Panasonic Automatic Electric Rice Cooker 1.8L',
      brand: 'PANASONIC',
      subcategory: 'appliances',
      priceCents: 1150000,
      originalPriceCents: null,
      discountPercent: null,
      badge: 'Best Seller',
      badgeColor: 'orange',
      deliveryTag: 'In Stock • Colombo',
      rating: 4.9,
      reviewsCount: 342,
      image: '/images/product-ricecooker.jpg',
      inStock: true,
    },
    {
      id: 'hk-008',
      title: 'Stainless Steel Double Layer Dish Rack Drainer',
      brand: 'GENERIC IMPORT',
      subcategory: 'storage',
      priceCents: 590000,
      originalPriceCents: null,
      discountPercent: null,
      deliveryTag: 'In Stock',
      rating: 4.7,
      reviewsCount: 68,
      image: '/images/product-dishrack.jpg',
      inStock: true,
    },
    {
      id: 'hk-009',
      title: 'Manual Stainless Steel Spice & Coffee Grinder',
      brand: 'CEYLON CRAFT',
      subcategory: 'appliances',
      priceCents: 285000,
      originalPriceCents: null,
      discountPercent: null,
      deliveryTag: 'In Stock • Colombo Express',
      rating: 4.6,
      reviewsCount: 51,
      image: '/images/product-spicegrinder.jpg',
      inStock: true,
    },
  ];

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle Brand
  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSubcategory('all');
    setInStockOnly(true);
    setMinPrice(1000);
    setMaxPrice(40000);
    setSelectedBrands([]);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
        return false;
      }
      const priceRupees = p.priceCents / 100;
      if (priceRupees < minPrice || priceRupees > maxPrice) {
        return false;
      }
      if (inStockOnly && !p.inStock) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      return true;
    });
  }, [products, selectedSubcategory, minPrice, maxPrice, inStockOnly, selectedBrands]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16">
      {/* ======================================================== */}
      {/* 1. Sub-Header: Breadcrumbs & Courier Live Tracking Strip */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200/80 py-2.5">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            {/* Breadcrumb Links */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Link href="/" className="hover:text-brand-primary flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/catalog" className="hover:text-brand-primary">
                Categories
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">Home & Kitchen</span>
            </div>

            {/* Courier transit tracking note */}
            <div className="hidden sm:flex items-center gap-2 text-slate-600 font-medium">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Third-party courier transit tracking updated daily</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Category Header Banner & Standard Courier Network */}
      {/* ======================================================== */}
      <div className="py-6 sm:py-8">
        <Container>
          {/* Desktop Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Heading & Subcategory Pills */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-brand-hover">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Domestic Living & Cookware Essentials</span>
                </div>

                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight">
                    Home & Kitchen Essentials
                  </h1>
                  <span className="sm:hidden px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                    42 items
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Discover high-quality kitchenware, cookware, and everyday domestic appliances sourced directly for Sri Lankan households. Reliable quality backed by simple, direct customer fulfillment.
                </p>

                {/* Mobile Insured Dispatch Pill */}
                <div className="sm:hidden flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Islandwide insured dispatch • Official agent warranty included</span>
                </div>
              </div>

              {/* Sub-category Pills (Desktop & Mobile Scrollable) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
                {subcategories.map((sc) => {
                  const isActive = selectedSubcategory === sc.key;
                  return (
                    <button
                      key={sc.key}
                      onClick={() => setSelectedSubcategory(sc.key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#111827] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="hidden sm:inline">{sc.label}</span>
                      <span className="sm:hidden">{sc.shortLabel}</span>
                      <span className="opacity-70 ml-1.5 font-normal">({sc.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Standard Courier Network Card (Desktop Artboard) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>Islandwide Active</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-tight">
                    Standard Courier Network
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Direct ground logistics dispatch from western province storage straight to any Sri Lankan postcode.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200/60 mt-3 text-xs">
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Colombo Suburbs</span>
                  <span className="block font-heading font-black text-sm text-slate-900">
                    24–48 Hrs
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Outstation Deliveries</span>
                  <span className="block font-heading font-black text-sm text-slate-900">
                    2–4 Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 3. Mobile Express Banner & Filter Control */}
      {/* ======================================================== */}
      <Container>
        <div className="lg:hidden space-y-3 mb-4">
          {/* Mobile Express Flash Strip */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-xs font-semibold text-brand-hover">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-brand-primary" />
              <span>Colombo: Same-day & 24h Express Available</span>
            </div>
            <button className="text-[11px] font-bold underline">Check PIN</button>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 h-10 px-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <span>Filters</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
            </button>

            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-800 appearance-none focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Desktop 2-Column: Sidebar Filters + Products Grid */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ======================================================== */}
          {/* Left Sidebar (Desktop Filters) */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5 sticky top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                  <span className="font-heading font-bold text-sm text-slate-900">
                    Filters
                  </span>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-brand-primary hover:text-brand-hover transition-colors cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* 1. Subcategories */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Subcategories
                </h4>
                <div className="space-y-2">
                  {subcategories.map((sc) => {
                    const isChecked = selectedSubcategory === sc.key;
                    return (
                      <label
                        key={sc.key}
                        onClick={() => setSelectedSubcategory(sc.key)}
                        className="flex items-center justify-between text-xs cursor-pointer select-none group"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="w-4 h-4 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                          />
                          <span
                            className={`font-semibold transition-colors ${
                              isChecked
                                ? 'text-brand-primary font-bold'
                                : 'text-slate-700 group-hover:text-slate-900'
                            }`}
                          >
                            {sc.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">{sc.count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. In Stock Only Toggle Switch */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="block font-heading font-bold text-xs text-slate-900">
                    In Stock Only
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Instant courier dispatch
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                    inStockOnly ? 'bg-brand-primary' : 'bg-slate-200'
                  }`}
                  aria-label="Toggle in stock only"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      inStockOnly ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Price Range Slider */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Price Range
                  </h4>
                  <span className="font-bold text-brand-primary text-xs">
                    Rs. {minPrice.toLocaleString()} – Rs. {maxPrice.toLocaleString()}
                  </span>
                </div>

                {/* Range Slider Track */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full relative my-2">
                  <div className="absolute left-0 right-1/5 h-full bg-brand-primary rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                  <div className="absolute right-1/5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span>Rs. 1,000</span>
                  <span>Rs. 40,000</span>
                </div>
              </div>

              {/* 4. Authorized Brands */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Authorized Brands
                </h4>
                {authorizedBrands.map((b) => {
                  const isChecked = selectedBrands.includes(b.name);
                  return (
                    <label
                      key={b.name}
                      onClick={() => toggleBrand(b.name)}
                      className="flex items-center justify-between text-xs cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="w-4 h-4 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                        />
                        <span
                          className={`font-semibold transition-colors ${
                            isChecked ? 'text-brand-primary font-bold' : 'text-slate-700'
                          }`}
                        >
                          {b.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{b.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Local Warranty Assured Box */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4.5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-heading font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Local Warranty Assured</span>
              </div>
              <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                All electric appliances include official agent warranties valid across authorized repair centers in Sri Lanka.
              </p>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* Right Area: Toolbar, Notice, and 3x3 Products Grid */}
          {/* ======================================================== */}
          <main className="lg:col-span-3 space-y-5">
            {/* Desktop Toolbar: Product Count & Sort */}
            <div className="hidden lg:flex items-center justify-between pb-1">
              <div className="flex items-center gap-2.5">
                <span className="font-heading font-bold text-lg text-slate-900">
                  42 Products found
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  Showing 1–9
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 pl-3 pr-8 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer shadow-xs"
                  >
                    <option value="featured">Featured Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Customer Rating</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Notice Strip: Delivery and Cash on Delivery */}
            <div className="p-3.5 rounded-xl bg-orange-50/80 border border-orange-200/80 flex items-center gap-3 text-xs text-slate-800">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-brand-primary shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <p className="leading-relaxed">
                <strong className="text-slate-900 font-bold">Notice:</strong> Delivery through third-party courier services across Sri Lanka. Cash on Delivery supported islandwide.
              </p>
            </div>

            {/* 3x3 Products Grid (Desktop) / 2-Columns (Mobile) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
              {filteredProducts.map((p) => {
                const isFav = favorites[p.id];
                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-lg transition-all group"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="relative aspect-square bg-slate-50 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Left Discount Badge or Label */}
                        {p.discountPercent && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow-xs">
                              -{p.discountPercent}% OFF
                            </span>
                          </div>
                        )}
                        {p.badge && (
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-white text-[10px] font-black shadow-xs ${
                                p.badgeColor === 'green'
                                  ? 'bg-emerald-600'
                                  : p.badgeColor === 'orange'
                                  ? 'bg-brand-primary'
                                  : 'bg-[#111827]'
                              }`}
                            >
                              {p.badge}
                            </span>
                          </div>
                        )}

                        {/* Favorite Heart Button */}
                        <button
                          onClick={() => toggleFavorite(p.id)}
                          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer"
                          aria-label="Add to favorites"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFav ? 'fill-red-500 text-red-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product Meta */}
                      <div className="p-3.5 sm:p-4 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {p.brand}
                        </span>

                        <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h3>

                        {/* Mobile Star Rating (Artboard) */}
                        <div className="sm:hidden flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{p.rating}</span>
                          <span className="text-slate-400 font-normal">({p.reviewsCount})</span>
                        </div>

                        {/* Delivery Status Tag */}
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{p.deliveryTag}</span>
                        </div>

                        {/* Price */}
                        <div className="pt-1.5 flex items-baseline gap-2">
                          <span className="font-heading font-black text-base sm:text-lg text-brand-primary">
                            {formatLKR(p.priceCents)}
                          </span>
                          {p.originalPriceCents && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatLKR(p.originalPriceCents)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-3.5 sm:p-4 pt-0">
                      <Button
                        size="sm"
                        className="w-full text-xs font-bold h-9 sm:h-10 shadow-xs active:scale-[0.98]"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">+ Add</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Progress Bar & Load More Button */}
            <div className="lg:hidden py-6 space-y-3 text-center">
              <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-medium">
                <span>Showing 6 of 42 items</span>
                <span className="text-brand-primary font-bold">14%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-brand-primary rounded-full"></div>
              </div>
              <Button
                variant="outline"
                className="w-full h-11 text-xs font-bold border-slate-300 gap-1.5 text-slate-800 mt-2"
              >
                <ChevronDown className="w-4 h-4 text-brand-primary" />
                <span>Load More Products (36)</span>
              </Button>
            </div>

            {/* Desktop Pagination Bar (Showing 1–9 of 42 products) */}
            <div className="hidden lg:flex items-center justify-between pt-6 border-t border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-800">1 – 9</strong> of{' '}
                <strong className="text-slate-800">42</strong> products
              </span>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  className="px-3 h-8 text-xs font-semibold text-slate-400 border-slate-200 disabled:opacity-40"
                >
                  &lt;
                </Button>

                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-brand-primary text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="px-1 text-slate-400">..</span>

                <button
                  onClick={() => setCurrentPage(5)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  5
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 h-8 text-xs font-semibold text-slate-700 border-slate-200 hover:border-brand-primary"
                >
                  &gt;
                </Button>
              </div>
            </div>

            {/* Bottom Card: Household Logistics Direct to Doorstep (Desktop Artboard) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    Household Logistics Direct to Doorstep
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    All cookware and kitchen appliances are packed with corner protection before handling by certified courier partners.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-10 px-5 text-xs font-bold border-slate-300 text-slate-800 hover:border-brand-primary"
              >
                Check Transit Times
              </Button>
            </div>

            {/* Mobile Fast Islandwide Courier Fleet Box (Mobile Artboard) */}
            <div className="sm:hidden rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900">
                <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span>Fast Islandwide Courier Fleet</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Dispatched safely via PromptX, Domex & Fardar. Cash on Delivery available across all 25 districts.
              </p>
            </div>
          </main>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 5. Mobile Filter Drawer Bottom Sheet */}
      {/* ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Filter Kitchenware
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subcategories */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                SUBCATEGORIES
              </h4>
              <div className="space-y-1">
                {subcategories.map((sc) => (
                  <button
                    key={sc.key}
                    onClick={() => {
                      setSelectedSubcategory(sc.key);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                      selectedSubcategory === sc.key
                        ? 'bg-orange-50 text-brand-primary font-bold'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{sc.label}</span>
                    <span className="text-[10px] text-slate-400">({sc.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-semibold">
              <span>In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-primary accent-brand-primary"
              />
            </div>

            {/* Price Range */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                PRICE RANGE (LKR)
              </h4>
              <div className="flex justify-between text-xs text-brand-primary font-bold mb-2">
                <span>Rs. {minPrice.toLocaleString()}</span>
                <span>Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="40000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-brand-primary"
              />
            </div>

            {/* Brands */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                BRANDS
              </h4>
              {authorizedBrands.map((b) => (
                <label key={b.name} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b.name)}
                      onChange={() => toggleBrand(b.name)}
                      className="rounded accent-brand-primary"
                    />
                    <span>{b.name}</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">({b.count})</span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full font-bold text-xs"
              >
                Apply Filters
              </Button>
              <Button
                onClick={() => {
                  handleResetFilters();
                  setMobileFilterOpen(false);
                }}
                variant="outline"
                className="w-full font-bold text-xs"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
