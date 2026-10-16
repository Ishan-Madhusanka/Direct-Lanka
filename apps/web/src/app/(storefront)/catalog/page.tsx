'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Search,
  X,
  RefreshCw,
  Home,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatLKR } from '@/lib/utils';

interface CatalogProduct {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  brand: string;
  priceCents: number;
  originalPriceCents?: number | null;
  discountPercent?: number | null;
  image: string;
  inStock: boolean;
  stockLocation?: string;
}

export default function CatalogPage() {
  // Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('500');
  const [maxPrice, setMaxPrice] = useState<string>('50000');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(500);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [preOrder, setPreOrder] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSearchTag, setActiveSearchTag] = useState<string>('Ceylon Specialities');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [visibleMobileCount, setVisibleMobileCount] = useState<number>(6);

  // Available Category Options with Counts (from Artboard)
  const categoryFilters = [
    { key: 'all', label: 'All Categories', count: 148 },
    { key: 'home-kitchen', label: 'Home & Kitchen', count: 42 },
    { key: 'electronics', label: 'Electronics', count: 36 },
    { key: 'fashion', label: 'Fashion & Apparel', count: 28 },
    { key: 'ceylon-grocery', label: 'Ceylon Grocery', count: 24 },
    { key: 'beauty-care', label: 'Beauty & Personal Care', count: 18 },
  ];

  // Featured Brands list (from Artboard)
  const brandList = ['Singer', 'Dilmah', 'Anker', 'Spa Ceylon', 'Philips', 'Richlife', 'DSI'];

  // 12 Catalog Products (Exact products matching the Stitch artboard)
  const allProducts: CatalogProduct[] = [
    {
      id: 'prod-001',
      title: 'Singer 1.8L Stainless Steel Electric Kettle',
      category: 'HOME & KITCHEN',
      categoryKey: 'home-kitchen',
      brand: 'Singer',
      priceCents: 495000,
      originalPriceCents: 580000,
      discountPercent: 15,
      image: '/images/product-kettle.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-002',
      title: 'Dilmah Single Estate Ceylon Tea 500g',
      category: 'CEYLON GROCERY',
      categoryKey: 'ceylon-grocery',
      brand: 'Dilmah',
      priceCents: 215000,
      originalPriceCents: 269000,
      discountPercent: 20,
      image: '/images/product-tea.jpg',
      inStock: true,
      stockLocation: 'Direct Wholesale',
    },
    {
      id: 'prod-003',
      title: 'Anker Soundcore R50i Wireless Earbuds',
      category: 'ELECTRONICS',
      categoryKey: 'electronics',
      brand: 'Anker',
      priceCents: 685000,
      originalPriceCents: 799000,
      discountPercent: 14,
      image: '/images/product-earbuds.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-004',
      title: 'Handloom Cotton Casual Shirt',
      category: 'FASHION & APPAREL',
      categoryKey: 'fashion',
      brand: 'Barefoot Loom',
      priceCents: 420000,
      originalPriceCents: 465000,
      discountPercent: 10,
      image: '/images/bundle-kettle-tea.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-005',
      title: 'Spa Ceylon Coconut Night Balm',
      category: 'BEAUTY & CARE',
      categoryKey: 'beauty-care',
      brand: 'Spa Ceylon',
      priceCents: 390000,
      originalPriceCents: null,
      discountPercent: null,
      image: '/images/product-balm.jpg',
      inStock: true,
      stockLocation: 'Direct Wholesale',
    },
    {
      id: 'prod-006',
      title: 'Philips Daily Mini Food Processor',
      category: 'HOME & KITCHEN',
      categoryKey: 'home-kitchen',
      brand: 'Philips',
      priceCents: 1480000,
      originalPriceCents: 1750000,
      discountPercent: 15,
      image: '/images/product-processor.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-007',
      title: 'Baseus 20,000mAh 65W Power Bank',
      category: 'ELECTRONICS',
      categoryKey: 'electronics',
      brand: 'Anker',
      priceCents: 1250000,
      originalPriceCents: null,
      discountPercent: null,
      image: '/images/product-earbuds.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-008',
      title: 'Organic Ceylon Cinnamon Sticks Box',
      category: 'CEYLON GROCERY',
      categoryKey: 'ceylon-grocery',
      brand: 'Export Grade',
      priceCents: 340000,
      originalPriceCents: 425000,
      discountPercent: 20,
      image: '/images/product-cinnamon.jpg',
      inStock: true,
      stockLocation: 'Southern Estate',
    },
    {
      id: 'prod-009',
      title: 'Tefal Non-Stick Frying Pan 28cm',
      category: 'HOME & KITCHEN',
      categoryKey: 'home-kitchen',
      brand: 'Singer',
      priceCents: 720000,
      originalPriceCents: null,
      discountPercent: null,
      image: '/images/banner-cooker.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-010',
      title: 'Havells 1200W Dry Iron',
      category: 'HOME & KITCHEN',
      categoryKey: 'home-kitchen',
      brand: 'Singer',
      priceCents: 410000,
      originalPriceCents: 465000,
      discountPercent: 10,
      image: '/images/product-kettle.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-011',
      title: 'Richlife Full Cream Milk Powder 1kg',
      category: 'CEYLON GROCERY',
      categoryKey: 'ceylon-grocery',
      brand: 'Richlife',
      priceCents: 189000,
      originalPriceCents: null,
      discountPercent: null,
      image: '/images/banner-pantry.jpg',
      inStock: true,
      stockLocation: 'Direct Wholesale',
    },
    {
      id: 'prod-012',
      title: "DSI Men's Everyday Comfort Sandals",
      category: 'FASHION & APPAREL',
      categoryKey: 'fashion',
      brand: 'DSI',
      priceCents: 315000,
      originalPriceCents: 370000,
      discountPercent: 15,
      image: '/images/bundle-kettle-tea.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
  ];

  // Toggle favorite heart
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle brand filter
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Apply custom price filter
  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = parseInt(minPrice, 10) || 0;
    const max = parseInt(maxPrice, 10) || 1000000;
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMinPrice('500');
    setMaxPrice('50000');
    setAppliedMinPrice(500);
    setAppliedMaxPrice(50000);
    setInStockOnly(true);
    setPreOrder(false);
    setSelectedBrands([]);
    setSearchQuery('');
    setActiveSearchTag('');
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categoryKey !== selectedCategory) {
        return false;
      }
      // Price filter (converting priceCents to Rupees)
      const priceRupees = p.priceCents / 100;
      if (priceRupees < appliedMinPrice || priceRupees > appliedMaxPrice) {
        return false;
      }
      // Availability filter
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [
    allProducts,
    selectedCategory,
    appliedMinPrice,
    appliedMaxPrice,
    inStockOnly,
    selectedBrands,
    searchQuery,
  ]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16">
      {/* ======================================================== */}
      {/* 1. Sub-Header: Breadcrumbs & Courier Dispatch Banner */}
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
              <span className="font-semibold text-slate-900">All Products</span>
              {/* Mobile item count pill */}
              <span className="sm:hidden ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                148 items
              </span>
            </div>

            {/* Courier shipping notice on desktop */}
            <div className="hidden sm:flex items-center gap-2 text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Delivery through third-party courier services islandwide</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-brand-hover font-bold">Islandwide COD Available</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Search Pill & Fast Dispatch Banner */}
      {/* ======================================================== */}
      <div className="lg:hidden px-4 pt-3 space-y-2">
        {/* Active Search Pill */}
        {activeSearchTag && (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeSearchTag}</span>
            </div>
            <button
              onClick={() => setActiveSearchTag('')}
              className="text-slate-400 hover:text-slate-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Courier Dispatch Card (Mobile) */}
        <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between text-xs text-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-brand-primary shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block leading-tight text-slate-900">
                Islandwide Courier Dispatch
              </span>
              <span className="text-[11px] text-slate-500">
                Colombo within 24h • Regional in 48-72h
              </span>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Catalog Title & Subtitle Section */}
      {/* ======================================================== */}
      <div className="py-5 sm:py-7">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                LANKADIRECT CATALOG
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight mt-0.5">
                All Products
              </h1>
            </div>

            <div className="text-xs sm:text-sm text-slate-500 font-medium">
              Showing <strong className="text-slate-900">1–12</strong> of{' '}
              <strong className="text-slate-900">148</strong> verified products
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 4. Main Body: Filters Sidebar + Products Grid */}
      {/* ======================================================== */}
      <Container>
        {/* Mobile Filter & Sort Control Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 h-10 px-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
              <span>Filter</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 pl-3 pr-8 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-800 appearance-none focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Active Filter Chips */}
        <div className="lg:hidden flex flex-wrap gap-2 mb-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-hover font-semibold border border-orange-200">
            <span>Ceylon Tea</span>
            <X className="w-3 h-3 cursor-pointer" />
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-hover font-semibold border border-orange-200">
            <span>In Stock Only</span>
            <X className="w-3 h-3 cursor-pointer" />
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-hover font-semibold border border-orange-200">
            <span>Under Rs. 10,000</span>
            <X className="w-3 h-3 cursor-pointer" />
          </span>
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ======================================================== */}
          {/* Left Sidebar (Desktop Filters) */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                  <span className="font-heading font-bold text-sm text-slate-900">
                    Filters
                  </span>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-brand-primary hover:text-brand-hover transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* 1. CATEGORIES */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  CATEGORIES
                </h4>
                <div className="space-y-1">
                  {categoryFilters.map((cat) => {
                    const isSelected = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-orange-50 text-brand-primary border border-orange-200 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] ${
                            isSelected
                              ? 'bg-brand-primary text-white font-bold'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. PRICE RANGE (LKR) */}
              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    PRICE RANGE (LKR)
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Rs. {appliedMinPrice.toLocaleString()}</span>
                  <span>Rs. {appliedMaxPrice.toLocaleString()}</span>
                </div>

                {/* Range Slider Track */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 relative">
                  <div className="absolute left-0 right-1/4 h-full bg-brand-primary rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                </div>

                {/* Min / Max Inputs */}
                <form onSubmit={handleApplyPrice} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Min (Rs.)
                      </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Max (Rs.)
                      </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="w-full h-9 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Apply Price
                  </Button>
                </form>
              </div>

              {/* 3. AVAILABILITY */}
              <div className="border-t border-slate-100 pt-5 space-y-2.5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  AVAILABILITY
                </h4>
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                    />
                    <span className="font-semibold text-slate-800">In Stock</span>
                  </div>
                  <span className="text-[11px] text-slate-400">132</span>
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={preOrder}
                      onChange={(e) => setPreOrder(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                    />
                    <span className="font-semibold text-slate-800">Pre-Order</span>
                  </div>
                  <span className="text-[11px] text-slate-400">16</span>
                </label>
              </div>

              {/* 4. FEATURED BRANDS */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  FEATURED BRANDS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {brandList.map((brand) => {
                    const isSelected = selectedBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset All Filters button */}
              <Button
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold text-slate-600 gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </Button>
            </div>

            {/* Standard Delivery Promo Box (from Artboard) */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4.5 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-heading font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Standard Delivery</span>
              </div>
              <p className="text-[11px] text-blue-950/80 leading-relaxed">
                All orders dispatch within 24–48 hours via registered Sri Lankan courier partners. Colombo & suburbs receive parcels within 1–2 business days; outstations 3–4 days.
              </p>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* Right Product Grid Area */}
          {/* ======================================================== */}
          <main className="lg:col-span-3 space-y-6">
            {/* Desktop Filter Chips & Sort Toolbar */}
            <div className="hidden lg:flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-semibold mr-1">Active:</span>

                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                    <span>In Stock</span>
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="hover:text-brand-primary cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  <span>
                    Rs. {appliedMinPrice.toLocaleString()} – Rs. {appliedMaxPrice.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      setAppliedMinPrice(500);
                      setAppliedMaxPrice(50000);
                      setMinPrice('500');
                      setMaxPrice('50000');
                    }}
                    className="hover:text-brand-primary cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-hover text-xs font-bold border border-orange-200">
                    <span className="capitalize">{selectedCategory.replace('-', ' ')}</span>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-brand-primary cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown & View Mode Switcher */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Sort By:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-9 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-xs text-brand-primary font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white shadow-xs text-brand-primary font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Grid (3 Columns on Desktop, 2 on Mobile) */}
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

                        {/* Top Left Discount Badge */}
                        {p.discountPercent && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow-xs">
                              -{p.discountPercent}%
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

                      {/* Product Meta Info */}
                      <div className="p-3.5 sm:p-4 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            {p.category}
                          </span>
                          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>In Stock</span>
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h3>

                        {/* Pricing */}
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

                    {/* Add to Cart Orange Button */}
                    <div className="p-3.5 sm:p-4 pt-0">
                      <Button
                        size="sm"
                        className="w-full text-xs font-bold h-9 sm:h-10 shadow-xs active:scale-[0.98]"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state if no products match */}
            {filteredProducts.length === 0 && (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="font-heading font-bold text-lg text-slate-800">
                  No products found
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your filters or price range to find available products.
                </p>
                <Button onClick={handleResetFilters} size="sm" className="mt-4 font-bold">
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Mobile "Showing 6 of 148 products" + Progress + Load More */}
            <div className="lg:hidden py-6 space-y-3 text-center">
              <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-medium">
                <span>Showing 6 of 148 products</span>
                <span className="text-brand-primary font-bold">4% loaded</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[4%] h-full bg-brand-primary rounded-full"></div>
              </div>
              <Button
                variant="outline"
                className="w-full h-11 text-xs font-bold border-slate-300 gap-2 text-slate-800 mt-2"
              >
                <RefreshCw className="w-4 h-4 text-brand-primary" />
                <span>Load More Products</span>
              </Button>
            </div>

            {/* Desktop Pagination (Exact from Artboard) */}
            <div className="hidden lg:flex items-center justify-between pt-6 border-t border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-800">1 to 12</strong> of{' '}
                <strong className="text-slate-800">148</strong> items
              </span>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  className="px-3 h-8 text-xs font-semibold text-slate-400 border-slate-200 disabled:opacity-40"
                >
                  &lt; Previous
                </Button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#111827] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="px-1 text-slate-400">..</span>

                <button
                  onClick={() => setCurrentPage(13)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  13
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 h-8 text-xs font-semibold text-slate-700 border-slate-200 hover:border-brand-primary"
                >
                  Next &gt;
                </Button>
              </div>
            </div>

            {/* Bottom Courier Banner (Exact from Artboard) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    Reliable Islandwide Courier Distribution
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    We partner with prompt regional logistics couriers. Cash on Delivery (COD) available in all 25 districts of Sri Lanka.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-10 px-5 text-xs font-bold border-slate-300 text-slate-800 hover:border-brand-primary"
              >
                Courier Rates & Delivery Days
              </Button>
            </div>
          </main>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 5. Mobile Filter Drawer / Bottom Sheet */}
      {/* ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Filter Catalog
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                CATEGORIES
              </h4>
              <div className="space-y-1">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                      selectedCategory === cat.key
                        ? 'bg-orange-50 text-brand-primary font-bold'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-slate-400">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                PRICE RANGE (LKR)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="h-8 px-2 rounded border border-slate-200"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="h-8 px-2 rounded border border-slate-200"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <label className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-primary accent-brand-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Apply & Close */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Button
                onClick={() => {
                  const min = parseInt(minPrice, 10) || 0;
                  const max = parseInt(maxPrice, 10) || 1000000;
                  setAppliedMinPrice(min);
                  setAppliedMaxPrice(max);
                  setMobileFilterOpen(false);
                }}
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
