'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  CheckCircle2,
  X,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Zap,
  HelpCircle,
  AlertCircle,
  Eye,
  Home,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatLKR } from '@/lib/utils';

interface SearchProduct {
  id: string;
  title: string;
  shortTitle?: string;
  brand: string;
  category: string;
  specs: string;
  deliveryTag: string;
  mobileDeliveryTag?: string;
  badge?: string;
  mobileBadge?: string;
  badgeVariant?: 'red' | 'dark' | 'green';
  priceCents: number;
  originalPriceCents?: number | null;
  image: string;
  inStock: boolean;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get('q') || searchParams.get('search') || 'electric kettle';

  const [queryInput, setQueryInput] = useState<string>(urlQuery);
  const [activeQuery, setActiveQuery] = useState<string>(urlQuery);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number>(2000);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Small Kitchen Appliances',
    'Cookware & Accessories',
  ]);
  const [sortBy, setSortBy] = useState<string>('best-match');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [showEmptyPreview, setShowEmptyPreview] = useState<boolean>(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  // 8 Exact Products from Stitch Artboard (Desktop & Mobile)
  const searchResults: SearchProduct[] = [
    {
      id: 'kettle-1',
      title: 'Singer 1.8L Stainless Steel Electric Kettle',
      shortTitle: '1.8L Stainless Kettle',
      brand: 'SINGER',
      category: 'Small Kitchen Appliances',
      specs: '1500W • 2 Yr Warranty • Auto Cut-off',
      deliveryTag: 'In Stock • Colombo Express',
      mobileDeliveryTag: 'In Stock • Colombo Express',
      badge: 'SAVE 15%',
      mobileBadge: '-15%',
      badgeVariant: 'red',
      priceCents: 495000,
      originalPriceCents: 580000,
      image: '/images/product-kettle.jpg',
      inStock: true,
    },
    {
      id: 'kettle-2',
      title: 'Prestige 1.5L Cordless Electric Glass Kettle with LED',
      shortTitle: '1.5L Glass Kettle',
      brand: 'PRESTIGE',
      category: 'Small Kitchen Appliances',
      specs: 'Borosilicate Glass • 1800W • Blue Illumination',
      deliveryTag: 'In Stock • Islandwide 48h',
      mobileDeliveryTag: 'In Stock • 24h Islandwide',
      mobileBadge: 'Fast Ship',
      badgeVariant: 'green',
      priceCents: 620000,
      originalPriceCents: null,
      image: '/images/kettle-glass.jpg',
      inStock: true,
    },
    {
      id: 'kettle-3',
      title: 'Prestige Electric Gooseneck Drip Kettle 1.0L',
      shortTitle: 'Gooseneck Kettle',
      brand: 'PRESTIGE',
      category: 'Cookware & Accessories',
      specs: 'Precision Flow • Matte Finish • Fast Strix Base',
      deliveryTag: 'In Stock • Only 4 Left',
      mobileDeliveryTag: 'In Stock • Only 3 left',
      badge: 'Barista Choice',
      mobileBadge: 'Premium',
      badgeVariant: 'dark',
      priceCents: 845000,
      originalPriceCents: null,
      image: '/images/kettle-gooseneck.jpg',
      inStock: true,
    },
    {
      id: 'kettle-4',
      title: 'Singer 1.7L Fast Boil Cordless Jug Kettle',
      shortTitle: '1.7L Jug Kettle',
      brand: 'SINGER',
      category: 'Small Kitchen Appliances',
      specs: 'Water Level Window • 2000W • Washable Filter',
      deliveryTag: 'In Stock • Best Seller',
      mobileDeliveryTag: 'In Stock • Colombo Central',
      priceCents: 420000,
      originalPriceCents: 460000,
      image: '/images/kettle-jug.jpg',
      inStock: true,
    },
    {
      id: 'kettle-5',
      title: 'Panasonic 1.6L Stainless Steel Thermal Electric Kettle',
      shortTitle: '1.6L Stainless Kettle',
      brand: 'PANASONIC',
      category: 'Small Kitchen Appliances',
      specs: 'Double Wall Insulation • Keep Warm 3h • 2200W',
      deliveryTag: 'In Stock • Premium Line',
      mobileDeliveryTag: 'In Stock • Premium Line',
      badge: 'JAPAN TECH',
      mobileBadge: 'JAPAN TECH',
      badgeVariant: 'green',
      priceCents: 980000,
      originalPriceCents: null,
      image: '/images/kettle-thermal.jpg',
      inStock: true,
    },
    {
      id: 'kettle-6',
      title: 'Philips Daily Collection 1.6L Plastic Electric Kettle',
      shortTitle: '1.5L Kettle',
      brand: 'PHILIPS',
      category: 'Small Kitchen Appliances',
      specs: 'Food-Grade Plastic • Easy Fill Lid • 2 Yr Warranty',
      deliveryTag: 'In Stock • Colombo Central Hub',
      mobileDeliveryTag: 'In Stock • Official Warranty',
      priceCents: 590000,
      originalPriceCents: 659000,
      image: '/images/kettle-white.jpg',
      inStock: true,
    },
    {
      id: 'kettle-7',
      title: 'Prestige Dual-Wall Cool Touch 1.8L Kettle',
      shortTitle: '1.8L Cool Touch Kettle',
      brand: 'PRESTIGE',
      category: 'Cookware & Accessories',
      specs: 'Anti-Scald Outer • SS 304 Inner Pot • 1800W',
      deliveryTag: 'In Stock • Family Safe',
      mobileDeliveryTag: 'In Stock • Family Safe',
      priceCents: 740000,
      originalPriceCents: null,
      image: '/images/kettle-cooltouch.jpg',
      inStock: true,
    },
    {
      id: 'kettle-8',
      title: 'Singer Compact 1.0L Travel Kettle',
      shortTitle: '1.0L Travel Kettle',
      brand: 'SINGER',
      category: 'Small Kitchen Appliances',
      specs: 'Lightweight • Concealed Element • 1000W',
      deliveryTag: 'In Stock • Colombo Express',
      mobileDeliveryTag: 'In Stock • Express Dispatch',
      badge: 'COMPACT',
      mobileBadge: 'Travel',
      badgeVariant: 'dark',
      priceCents: 360000,
      originalPriceCents: null,
      image: '/images/kettle-travel.jpg',
      inStock: true,
    },
  ];

  // Brands with counts
  const availableBrands = [
    { name: 'Singer', count: 3 },
    { name: 'Prestige', count: 2 },
    { name: 'Panasonic', count: 2 },
    { name: 'Philips', count: 1 },
  ];

  // Related Searches
  const relatedSearches = ['tea infuser', 'mixer grinder', 'coffee maker', 'thermos flask', 'blender'];
  const mobilePairedSearches = ['Ceylon Tea', 'Mixer Grinder', 'Borosil Containers'];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  const toggleCategory = (catName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      setActiveQuery(queryInput.trim());
      if (queryInput.trim().toLowerCase() === 'xyz') {
        setShowEmptyPreview(true);
      } else {
        setShowEmptyPreview(false);
      }
    }
  };

  const handleResetFilters = () => {
    setInStockOnly(true);
    setMinPrice(2000);
    setMaxPrice(15000);
    setSelectedBrands([]);
    setSelectedCategories(['Small Kitchen Appliances', 'Cookware & Accessories']);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (showEmptyPreview || activeQuery.toLowerCase() === 'xyz') {
      return [];
    }

    return searchResults.filter((p) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.some((b) => b.toLowerCase() === p.brand.toLowerCase())) {
        return false;
      }
      // Price filter
      const priceRupees = p.priceCents / 100;
      if (priceRupees < minPrice || priceRupees > maxPrice) {
        return false;
      }
      // In Stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    });
  }, [searchResults, selectedCategories, selectedBrands, minPrice, maxPrice, inStockOnly, showEmptyPreview, activeQuery]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-20">
      {/* ======================================================== */}
      {/* 1. Mobile Search Bar Header */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-3 py-2.5 flex items-center gap-2 sticky top-0 z-40">
        <Link href="/" className="p-1 text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-9 pr-8 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-900 font-semibold focus:outline-none focus:border-brand-primary"
            />
            {queryInput && (
              <button
                type="button"
                onClick={() => setQueryInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <Button type="submit" size="sm" className="h-10 px-4 rounded-full text-xs font-bold">
            Search
          </Button>
        </form>
      </div>

      {/* ======================================================== */}
      {/* 2. Breadcrumbs & Sub-Header */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200/80 py-2.5">
        <Container>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-brand-primary flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">Search Results</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sri Lanka Authorized Retail Stock</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 3. Query Title Banner Section (Desktop & Mobile) */}
      {/* ======================================================== */}
      <div className="py-6 sm:py-8 border-b border-slate-200/60 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                <span>VERIFIED CATALOG QUERY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight">
                Results for <span className="text-brand-primary">&ldquo;{activeQuery}&rdquo;</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {filteredProducts.length} products found matching your search across authorized Sri Lankan retail partners
              </p>
            </div>

            {/* Desktop Quick-Search Pill */}
            <div className="hidden sm:flex items-center gap-2">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 shadow-xs focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all"
              >
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none w-48"
                  placeholder="Refine search..."
                />
                {queryInput && (
                  <button
                    type="button"
                    onClick={() => setQueryInput('')}
                    className="text-slate-400 hover:text-slate-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Mobile Summary Status Pill */}
          <div className="sm:hidden flex items-center justify-between pt-3 text-xs font-semibold text-slate-700 border-t border-slate-100 mt-3">
            <span>8 items found for &ldquo;{activeQuery}&rdquo;</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Express Islandwide</span>
            </span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 4. Main Body: Sidebar Filters + Products Grid */}
      {/* ======================================================== */}
      <Container className="pt-6">
        {/* Mobile Filter Chips & Trigger */}
        <div className="sm:hidden flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs font-semibold">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111827] text-white shrink-0 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            <span className="w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
              2
            </span>
          </button>

          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
            <span>Price &lt; Rs. 6,000</span>
            <X className="w-3 h-3 text-slate-400" />
          </span>

          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>In Stock Only</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ======================================================== */}
          {/* Left Sidebar Filters (Desktop Artboard) */}
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

              {/* Categories */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Categories
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Small Kitchen Appliances', count: 5 },
                    { name: 'Cookware & Accessories', count: 3 },
                  ].map((cat) => (
                    <label
                      key={cat.name}
                      onClick={() => toggleCategory(cat.name)}
                      className="flex items-center justify-between text-xs cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          readOnly
                          className="w-4 h-4 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                        />
                        <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Price Range
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">LKR</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Rs. {minPrice.toLocaleString()}</span>
                  <span>Rs. {maxPrice.toLocaleString()}</span>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full relative my-2">
                  <div className="absolute left-0 right-1/4 h-full bg-brand-primary rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-brand-primary rounded-full shadow-xs"></div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="text"
                    readOnly
                    value={`Rs. ${minPrice.toLocaleString()}`}
                    className="w-1/2 h-8 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold text-center"
                  />
                  <span className="text-slate-400">to</span>
                  <input
                    type="text"
                    readOnly
                    value={`Rs. ${maxPrice.toLocaleString()}`}
                    className="w-1/2 h-8 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold text-center"
                  />
                </div>
              </div>

              {/* In Stock Only Toggle */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-xs text-slate-900">
                      In Stock Only
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Ready for swift courier dispatch
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                    inStockOnly ? 'bg-brand-primary' : 'bg-slate-200'
                  }`}
                  aria-label="Toggle in stock"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      inStockOnly ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Brand Filter */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Brand
                </h4>
                {availableBrands.map((b) => (
                  <label
                    key={b.name}
                    onClick={() => toggleBrand(b.name)}
                    className="flex items-center justify-between text-xs cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.name)}
                        readOnly
                        className="w-4 h-4 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                      />
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                        {b.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">({b.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Official Warranty Callout */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-900 font-heading font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Official Warranty</span>
              </div>
              <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                All electric kettles come with genuine 1–2 year local service warranty.
              </p>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* Right Product Grid Area */}
          {/* ======================================================== */}
          <main className="lg:col-span-3 space-y-6">
            {/* Desktop Sort Pills Bar */}
            <div className="hidden lg:flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-2">Sort by:</span>
                {[
                  { id: 'best-match', label: 'BEST MATCH' },
                  { id: 'price-asc', label: 'Price: Low to High' },
                  { id: 'price-desc', label: 'Price: High to Low' },
                  { id: 'newest', label: 'Newest' },
                ].map((sort) => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sortBy === sort.id
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Showing {filteredProducts.length} of 8 items
              </span>
            </div>

            {/* Zero State or 8 Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xs my-6">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-xs">
                  <Search className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    No products found for &ldquo;{activeQuery}&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    We couldn&apos;t find any items matching your spelling. Check for typos or try broader keywords like tea, kitchen appliances, or blenders.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <Button
                    onClick={() => {
                      setQueryInput('electric kettle');
                      setActiveQuery('electric kettle');
                      setShowEmptyPreview(false);
                      handleResetFilters();
                    }}
                    size="sm"
                    className="font-bold text-xs"
                  >
                    Clear search & View all
                  </Button>
                  <Link href="/catalog?category=ceylon-grocery">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-semibold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Ceylon Grocery
                    </Button>
                  </Link>
                  <Link href="/categories/home-kitchen">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-semibold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Home & Kitchen
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((p) => {
                  const isFav = favorites[p.id];
                  const activeBadge = p.mobileBadge || p.badge;
                  const activeDelivery = p.mobileDeliveryTag || p.deliveryTag;

                  return (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-lg transition-all group"
                    >
                      <div>
                        {/* Product Image Frame */}
                        <Link href="/products/singer-electric-kettle" className="block relative aspect-square bg-slate-50 overflow-hidden">
                          <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Left Badge */}
                        {activeBadge && (
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black shadow-xs ${
                                p.badgeVariant === 'red'
                                  ? 'bg-red-600 text-white'
                                  : p.badgeVariant === 'green'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#111827] text-white'
                              }`}
                            >
                              <span className="hidden sm:inline">{p.badge || activeBadge}</span>
                              <span className="sm:hidden">{p.mobileBadge || activeBadge}</span>
                            </span>
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(p.id);
                          }}
                          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFav ? 'fill-red-500 text-red-500' : ''
                            }`}
                          />
                        </button>
                      </Link>

                      {/* Meta Info */}
                      <div className="p-3 sm:p-4 space-y-1 sm:space-y-1.5">
                        {/* Mobile Brand Name Label */}
                        <span className="sm:hidden text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          {p.brand}
                        </span>

                        {/* Delivery Status Tag (Desktop is top, Mobile is below title) */}
                        <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{p.deliveryTag}</span>
                        </div>

                        {/* Title */}
                        <Link href="/products/singer-electric-kettle">
                          <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                            <span className="hidden sm:inline">{p.title}</span>
                            <span className="sm:hidden">{p.shortTitle || p.title}</span>
                          </h3>
                        </Link>

                        {/* Delivery Status Tag (Mobile) */}
                        <div className="sm:hidden flex items-center gap-1 text-[10px] text-emerald-700 font-semibold pt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span className="truncate">{activeDelivery}</span>
                        </div>

                        {/* Specs bullet list (Desktop only) */}
                        <p className="hidden sm:block text-[11px] text-slate-400 line-clamp-1">
                          {p.specs}
                        </p>

                        {/* Price */}
                        <div className="pt-1 flex items-baseline gap-1.5 sm:gap-2">
                          <span className="font-heading font-black text-sm sm:text-lg text-brand-primary">
                            {formatLKR(p.priceCents)}
                          </span>
                          {p.originalPriceCents && (
                            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                              {formatLKR(p.originalPriceCents)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-3 sm:p-4 pt-0">
                      <Button
                        size="sm"
                        className="w-full text-xs font-bold h-8 sm:h-10 shadow-xs active:scale-[0.98] rounded-xl"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">+ Add</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            )}

            {/* Mobile "Frequently paired with kettles" (Stitch Artboard) */}
            <div className="sm:hidden p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="text-brand-primary text-sm">📍</span>
                <span>Frequently paired with kettles</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {mobilePairedSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQueryInput(term);
                      setActiveQuery(term);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs text-xs font-medium cursor-pointer"
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile "Search Assistance" card with zero-result trigger (Stitch Artboard) */}
            <div className="sm:hidden p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Search className="w-4 h-4 text-brand-primary" />
                <span>Search Assistance</span>
              </div>
              <button
                type="button"
                onClick={() => setShowEmptyPreview(!showEmptyPreview)}
                className="text-xs font-bold text-red-600 underline hover:text-red-700 cursor-pointer"
              >
                {showEmptyPreview ? 'Show Search Results' : 'Preview Zero-Result View'}
              </button>
            </div>

            {/* Related Searches Section (Desktop) */}
            <div className="hidden sm:block p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>Related Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {relatedSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQueryInput(term);
                      setActiveQuery(term);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-brand-primary hover:text-brand-primary transition-colors font-medium cursor-pointer"
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Courier Dispatch Islandwide Callout Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/70 to-amber-50/50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading font-bold text-sm text-slate-900 block">
                    Courier Dispatch Islandwide
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Delivery through third-party courier services islandwide • Fast Colombo, Gampaha & Kandy transit.
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200 font-bold shrink-0 shadow-xs">
                ✔ Cash on Delivery
              </span>
            </div>

            {/* ======================================================== */}
            {/* 5. Empty Search State Preview (UI System state from Artboard) */}
            {/* ======================================================== */}
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Eye className="w-4 h-4 text-brand-primary" />
                  <span>Empty Search State Preview</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px]">
                  UI system state example
                </span>
              </div>

              {/* Zero-Results Empty Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-xs">
                  <Search className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    No products found for &ldquo;xyz&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    We couldn&apos;t find any items matching your spelling. Check for typos or try broader keywords like tea, kitchen appliances, or blenders.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <Button
                    onClick={() => {
                      setQueryInput('electric kettle');
                      setActiveQuery('electric kettle');
                      setShowEmptyPreview(false);
                    }}
                    size="sm"
                    className="font-bold text-xs"
                  >
                    Clear search & View all
                  </Button>
                  <Link href="/catalog?category=ceylon-grocery">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-semibold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Ceylon Grocery
                    </Button>
                  </Link>
                  <Link href="/categories/home-kitchen">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-semibold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Home & Kitchen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 6. Mobile Filter Drawer Sheet */}
      {/* ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Filter Results
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In Stock */}
            <div className="flex items-center justify-between text-xs font-semibold">
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
                min="3000"
                max="15000"
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
              {availableBrands.map((b) => (
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

            {/* Actions */}
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

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-500 text-xs">
          Loading catalog search results...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
