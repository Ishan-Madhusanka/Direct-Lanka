'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronRight,
  Package,
  Layers,
  RotateCcw,
  Mail,
  Zap,
  Check,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  // Categories matching the Stitch artboard Department Directory
  const categories = [
    {
      name: 'Electronics',
      subtitle: 'Audio & Gadgets',
      count: '480 items',
      icon: '🎧',
      href: '/catalog?category=electronics',
    },
    {
      name: 'Home & Kitchen',
      subtitle: 'Cookware & Prep',
      count: '1,240 items',
      icon: '🍳',
      href: '/catalog?category=home-kitchen',
    },
    {
      name: 'Fashion & Apparel',
      subtitle: 'Handloom & Wear',
      count: '860 items',
      icon: '👕',
      href: '/catalog?category=fashion',
    },
    {
      name: 'Beauty & Care',
      subtitle: 'Ayurveda & Skin',
      count: '410 items',
      icon: '🌿',
      href: '/catalog?category=beauty-care',
    },
    {
      name: 'Ceylon Grocery',
      subtitle: 'Spices & Staples',
      count: '320 items',
      icon: '🫖',
      href: '/catalog?category=ceylon-grocery',
    },
    {
      name: 'Living & Tools',
      subtitle: 'Hardware & Home',
      count: '590 items',
      icon: '🧰',
      href: '/catalog?category=living-tools',
    },
  ];

  // 4 Featured Products matching the Stitch artboard
  const featuredProducts = [
    {
      id: 'prod-001',
      title: 'Singer 1.8L Stainless Steel Electric Kettle',
      category: 'Home & Kitchen',
      brand: 'Singer Kitchen',
      price: 'Rs. 4,950',
      originalPrice: 'Rs. 5,800',
      discountBadge: '15% OFF',
      badgeVariant: 'danger' as const,
      image: '/images/product-kettle.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-002',
      title: 'Dilmah Single Estate Ceylon Black Tea 500g Tin',
      category: 'Ceylon Grocery',
      brand: 'Dilmah Ceylon',
      price: 'Rs. 2,150',
      originalPrice: null,
      discountBadge: 'Authentic Ceylon',
      badgeVariant: 'success' as const,
      image: '/images/product-tea.jpg',
      inStock: true,
      stockLocation: 'Direct Wholesale',
    },
    {
      id: 'prod-003',
      title: 'Anker Soundcore R50i True Wireless Earbuds',
      category: 'Electronics',
      brand: 'Anker Audio',
      price: 'Rs. 6,850',
      originalPrice: 'Rs. 7,990',
      discountBadge: '14% OFF',
      badgeVariant: 'danger' as const,
      image: '/images/product-earbuds.jpg',
      inStock: true,
      stockLocation: 'Colombo',
    },
    {
      id: 'prod-004',
      title: 'Spices of Ceylon Organic Cinnamon & Cardamom Box',
      category: 'Ceylon Grocery',
      brand: 'Export Grade',
      price: 'Rs. 3,400',
      originalPrice: null,
      discountBadge: 'Certified Organic',
      badgeVariant: 'success' as const,
      image: '/images/product-cinnamon.jpg',
      inStock: true,
      stockLocation: 'Southern Estate',
    },
  ];

  // New Arrivals matching the mobile Stitch artboard
  const newArrivals = [
    {
      id: 'new-001',
      title: 'Handloom Cotton Shirt',
      brand: 'Local Craft',
      price: 'Rs. 4,200',
      tag: 'Handcrafted',
      icon: '👔',
    },
    {
      id: 'new-002',
      title: 'Baseus 20,000mAh Power Bank',
      brand: 'Baseus Official',
      price: 'Rs. 12,500',
      tag: '65W Fast',
      icon: '🔋',
    },
    {
      id: 'new-003',
      title: 'Spa Ceylon Coconut Balm',
      brand: 'Spa Ceylon',
      price: 'Rs. 3,900',
      tag: 'Ayurvedic',
      icon: '🥥',
    },
    {
      id: 'new-004',
      title: 'Philips 450W Food Processor',
      brand: 'Philips Home',
      price: 'Rs. 14,800',
      tag: 'Kitchen Pro',
      icon: '🥣',
    },
  ];

  return (
    <div className="space-y-12 lg:space-y-16 pb-16">
      {/* ======================================================== */}
      {/* 1. Mobile Marquee Flash Banner */}
      {/* ======================================================== */}
      <div className="sm:hidden px-4 pt-3">
        <div className="bg-orange-50 border border-orange-200/80 rounded-full px-3 py-1.5 flex items-center justify-between text-xs text-brand-hover">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            <span>Islandwide Mega Savings Live</span>
          </div>
          <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-orange-200">
            SEE SHOWCASE
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Hero Section (Desktop & Mobile) */}
      {/* ======================================================== */}
      <section className="pt-2 sm:pt-6">
        <Container>
          {/* Mobile Hero View (Artboard Reference) */}
          <div className="lg:hidden rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50/40 border border-orange-200/80 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-white border border-orange-200 font-semibold text-brand-hover">
                Direct-to-Customer Retail
              </span>
              <span className="text-slate-600 font-medium">
                SPOTLIGHT: <strong className="text-brand-primary">Rs. 4,950</strong>
              </span>
            </div>

            <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight leading-snug">
              Authentic Goods at <br />
              <span className="text-brand-primary">Wholesale-Direct</span> Prices
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              Delivered straight to your doorstep across all 25 districts in Sri Lanka with Cash on Delivery.
            </p>

            <Link href="/catalog" className="block">
              <Button size="lg" className="w-full text-sm font-bold shadow-md">
                <span>Shop Today&apos;s Deals</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Desktop Hero View (1440px Artboard Reference) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Hero Text & Value Pills */}
            <div className="col-span-7 flex flex-col justify-between py-4 pr-4">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-brand-hover">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  <span>New Season Retail Arrivals</span>
                </div>

                <h1 className="text-4xl xl:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.12]">
                  Quality Everyday Essentials Delivered Straight to Your Door
                </h1>

                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  Discover authentic electronics, kitchenware, fashion, and Ceylon groceries at retail prices delivered directly to your doorstep across Sri Lanka.
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <Link href="/catalog">
                    <Button size="lg" className="px-7 font-bold shadow-md group">
                      <span>Shop Deals Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link href="/catalog">
                    <Button variant="outline" size="lg" className="px-6 font-semibold">
                      Browse All Categories
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 3 Value Stats Pills */}
              <div className="grid grid-cols-3 gap-3 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-sm text-slate-900 leading-tight">
                      4,200+ Items
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">In stock locally</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-sm text-slate-900 leading-tight">
                      Island Courier
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">All 25 districts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-sm text-slate-900 leading-tight">
                      COD & Online
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Card / Koko / Cash</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Bundle Deal Card */}
            <div className="col-span-5">
              <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-md p-5 flex flex-col justify-between">
                {/* Bundle Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="px-2.5 py-1 rounded bg-[#065F46] text-white text-[10px] font-bold tracking-wider uppercase">
                    FEATURED BUNDLE DEAL
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Bundle Image with Save Pill */}
                <div className="relative my-3 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 group">
                  <Image
                    src="/images/bundle-kettle-tea.jpg"
                    alt="Prestige Electric Kettle + Pure Ceylon Silver Tip Tea Set"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Save Rs. 1,750
                  </div>
                </div>

                {/* Bundle Details & Price */}
                <div className="space-y-2 pt-1">
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-snug line-clamp-2">
                    Prestige Electric Kettle + Pure Ceylon Silver Tip Tea Set
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    Includes 1.7L food-safe stainless steel kettle with automatic dry-boil safety shutoff plus 250g export-grade artisanal loose leaf tea.
                  </p>

                  <div className="pt-2 flex items-baseline gap-2.5">
                    <span className="font-heading font-black text-2xl text-brand-primary">
                      Rs. 8,450
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      Rs. 10,200
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      17% OFF
                    </span>
                  </div>
                </div>

                {/* Bundle Button */}
                <Link href="/products/singer-electric-kettle-1-8l" className="block mt-4">
                  <Button className="w-full h-11 text-sm font-bold shadow-sm">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span>Claim Bundle Deal</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 3. Department Directory - Explore Popular Categories */}
      {/* ======================================================== */}
      <section>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                DEPARTMENT DIRECTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight mt-0.5">
                Explore Popular Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Find everything you need organized by direct-import department.
              </p>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-hover transition-colors"
            >
              <span>View All Departments</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop & Mobile Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-primary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-slate-50 group-hover:bg-orange-50 border border-slate-100 group-hover:border-orange-200 flex items-center justify-center text-2xl mb-2.5 transition-all group-hover:scale-110">
                  {cat.icon}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  {cat.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 4. Curated Selections - Featured Products */}
      {/* ======================================================== */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                CURATED SELECTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight mt-0.5">
                Featured Products
              </h2>
            </div>

            {/* Filter Tabs matching the Stitch artboard */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'bestsellers', label: 'Best Sellers' },
                { id: 'colombo', label: 'Trending in Colombo' },
                { id: 'kitchen', label: 'Kitchen Deals' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {featuredProducts.map((p) => {
              const isFav = favorites[p.id];
              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-lg transition-all group"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="relative aspect-square bg-slate-50 overflow-hidden">
                      <Link href="/products/singer-electric-kettle-1-8l" className="block w-full h-full">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Top Left Discount Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <Badge
                          variant={p.badgeVariant}
                          className="text-[10px] font-bold px-2 py-0.5 shadow-xs"
                        >
                          {p.discountBadge}
                        </Badge>
                      </div>

                      {/* Favorite Heart Button */}
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer"
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
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">
                          {p.brand}
                        </span>
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>In Stock</span>
                        </div>
                      </div>

                      <Link href="/products/singer-electric-kettle-1-8l" className="block">
                        <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h3>
                      </Link>

                      {/* Pricing */}
                      <div className="pt-1.5 flex items-baseline gap-2">
                        <span className="font-heading font-black text-base sm:text-lg text-brand-primary">
                          {p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {p.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Orange Button */}
                  <div className="p-3.5 sm:p-4 pt-0">
                    <Button
                      size="sm"
                      onClick={() => {
                        setCartToast(p.title);
                        setTimeout(() => setCartToast(null), 3500);
                      }}
                      className="w-full text-xs font-bold h-9 sm:h-10 shadow-xs cursor-pointer active:scale-95 transition-transform"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 5. Two Promotional Feature Banners Side-by-Side */}
      {/* ======================================================== */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo 1: Kitchen Essentials Week */}
            <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-r from-orange-50/80 to-amber-50/50 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs overflow-hidden">
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-orange-200 text-xs font-bold text-brand-hover">
                  Seasonal Campaign
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-tight">
                  Kitchen Essentials Week
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Up to 30% off pressure cookers, heavy-duty blenders, food prep accessories, and granite cookware sets.
                </p>
                <Link href="/catalog?category=kitchen-deals" className="inline-block pt-1">
                  <Button size="sm" className="font-bold">
                    <span>Explore Kitchen</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-sm shrink-0 bg-slate-100">
                <Image
                  src="/images/banner-cooker.jpg"
                  alt="Kitchen Essentials Week Multi Cooker"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Promo 2: Ceylon Artisan Pantry */}
            <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs overflow-hidden">
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-800">
                  Direct from Source
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-tight">
                  Ceylon Artisan Pantry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Farm-fresh pure cold-pressed virgin coconut oil, wild forest bee honey, kitul treacle, and stone-ground spices.
                </p>
                <Link href="/catalog?category=pantry" className="inline-block pt-1">
                  <Button
                    size="sm"
                    className="bg-[#111827] text-white hover:bg-slate-800 font-bold"
                  >
                    <span>Shop Pantry</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-sm shrink-0 bg-slate-100">
                <Image
                  src="/images/banner-pantry.jpg"
                  alt="Ceylon Artisan Pantry Virgin Coconut Oil and Bee Honey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 6. New Arrivals (Matching Mobile Artboard) */}
      {/* ======================================================== */}
      <section className="bg-slate-50/60 py-10 border-y border-slate-200/80">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary"></span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight">
                New Arrivals
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
                Just Landed
              </span>
            </div>

            <Link
              href="/catalog?sort=newest"
              className="text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-hover"
            >
              See All &gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-4xl mb-3 relative">
                    <span>{item.icon}</span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white text-[10px] font-bold text-slate-700 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.brand}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <div className="font-heading font-black text-sm sm:text-base text-brand-primary mt-1.5">
                    {item.price}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full text-xs mt-3">
                  + Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 7. Why Shop LankaDirect / Value Propositions Grid */}
      {/* ======================================================== */}
      <section>
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
              OUR SERVICE PROMISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight mt-1">
              Why Shop With LankaDirect
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Direct import pricing with island-wide courier fulfillment and customer care
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-brand-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Curated Quality Essentials
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authentic, quality-checked products direct to your door with trusted island-wide fulfillment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Island-wide Courier Shipping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivery through third-party courier services covering all 25 administrative districts across Sri Lanka.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Secure Payment Options
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convenient Cash on Delivery alongside major credit/debit cards and secure online payment methods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Dedicated Customer Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Helpful hotline and prompt inquiries support for orders across Sri Lanka in Sinhala and English.
              </p>
            </div>
          </div>

          {/* Secondary 4-card Trust Row from Artboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block">Direct Wholesale Sourcing</span>
              <p className="text-slate-500 leading-relaxed">
                We purchase directly from verified manufacturers, cutting retail markups.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block">Live Courier Tracking</span>
              <p className="text-slate-500 leading-relaxed">
                Track your package from Colombo warehouse to your door with tracking reference.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block">Flexible Payment Options</span>
              <p className="text-slate-500 leading-relaxed">
                Pay via COD, Koko 3-month split installments, Mintpay, or Visa/MasterCard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block">7-Day Return Assistance</span>
              <p className="text-slate-500 leading-relaxed">
                Dedicated Colombo hotline and WhatsApp support channel for quick resolution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================== */}
      {/* 8. Newsletter / Weekly Deals Subscription Form */}
      {/* ======================================================== */}
      <section>
        <Container>
          <div className="rounded-3xl bg-slate-100/80 border border-slate-200 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              Stay Updated on Weekly Deals
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
              Get notified as soon as new stock containers clear customs and weekly discounts go live. Zero spam.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you! You are subscribed to LankaDirect weekly deal alerts.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                />
                <Button type="submit" size="md" className="w-full sm:w-auto px-6 h-11 font-bold shrink-0">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* Floating Add to Cart Notification */}
      {cartToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white border border-emerald-300 rounded-2xl shadow-xl p-4 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 line-clamp-1">{cartToast}</p>
              <p className="text-[11px] text-emerald-700 font-medium">Added to shopping cart</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cart"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              className="px-3 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-colors shadow-xs"
            >
              Checkout →
            </Link>
            <button
              onClick={() => setCartToast(null)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
