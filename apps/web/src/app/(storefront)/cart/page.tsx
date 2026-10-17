'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Package,
  Headphones,
  ArrowRight,
  ArrowLeft,
  Lock,
  Tag,
  CheckCircle2,
  Info,
  ChevronDown,
  ShoppingBag,
  RotateCcw,
  CreditCard,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  title: string;
  sku: string;
  brand: string;
  mobileBadge: string;
  mobileBadgeColor: 'orange' | 'green';
  tagDesktop: string;
  tagMobile: string;
  priceCents: number;
  originalPriceCents?: number | null;
  mobileSubtitle?: string;
  image: string;
  quantity: number;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-kettle',
    title: 'Singer 1.8L Stainless Steel Cordless Electric Kettle',
    sku: 'SIN-KT-1800',
    brand: 'Singer',
    mobileBadge: 'SINGER',
    mobileBadgeColor: 'orange',
    tagDesktop: 'In Stock - Colombo Express',
    tagMobile: 'In Stock • Warranty 1 Yr',
    priceCents: 495000,
    originalPriceCents: 549000,
    image: '/images/product-kettle.jpg',
    quantity: 1,
  },
  {
    id: 'cart-tea',
    title: 'Dilmah Single Estate Ceylon Black Tea 500g Tin',
    sku: 'DLM-TEA-500',
    brand: 'Dilmah',
    mobileBadge: 'CEYLON PURE',
    mobileBadgeColor: 'green',
    tagDesktop: 'In Stock',
    tagMobile: 'In Stock • Nuwara Eliya',
    priceCents: 215000,
    originalPriceCents: null,
    mobileSubtitle: 'Export Grade',
    image: '/images/product-tea.jpg',
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [demoEmpty, setDemoEmpty] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoDiscountCents, setPromoDiscountCents] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [mobilePromoOpen, setMobilePromoOpen] = useState<boolean>(false);

  // Formatting helper
  const formatPrice = (cents: number) => `Rs. ${(cents / 100).toLocaleString()}`;

  // Update item quantity
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, Math.min(10, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove single item
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Restore sample items
  const restoreSampleItems = () => {
    setCartItems(INITIAL_CART_ITEMS);
    setDemoEmpty(false);
  };

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toUpperCase();

    if (!cleanCode) {
      setPromoError('Please enter a voucher code');
      return;
    }

    if (cleanCode === 'LANKA2024' || cleanCode === 'LANKA10' || cleanCode === 'DIRECT5') {
      const discount = Math.round(itemsSubtotalCents * 0.1); // 10% discount
      setPromoDiscountCents(discount);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid or expired coupon code');
    }
  };

  // Calculations
  const activeItems = demoEmpty ? [] : cartItems;
  const totalItemCount = activeItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotalCents = activeItems.reduce(
    (acc, item) => acc + item.priceCents * item.quantity,
    0
  );
  const finalTotalCents = Math.max(0, itemsSubtotalCents - promoDiscountCents);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-24 sm:pb-20 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Mobile Islandwide Header Banner (Stitch Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-[#F97316] text-white text-[11px] font-bold px-3 py-1.5 flex items-center justify-center gap-1.5 tracking-wide">
        <Truck className="w-3.5 h-3.5" />
        <span>Islandwide courier delivery • Fast &amp; reliable</span>
      </div>

      {/* ======================================================== */}
      {/* 2. Desktop Breadcrumbs Bar & Rates Notice */}
      {/* ======================================================== */}
      <div className="hidden sm:block border-b border-slate-200/80 bg-white py-3">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            {/* Breadcrumb links */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Link href="/" className="hover:text-brand-primary transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="font-semibold text-slate-800">Shopping Cart</span>
            </div>

            {/* Courier policy note */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standard domestic courier rates applied at checkout based on delivery district</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 3. Mobile Back Navigation & Cart Header Bar */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              href="/catalog"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-base text-slate-900">
                  My Cart ({totalItemCount})
                </h1>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Colombo Express Ready</span>
              </div>
            </div>
          </div>

          {/* Mobile Demo Empty State Toggle Pill */}
          <button
            onClick={() => setDemoEmpty(!demoEmpty)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-[11px] font-bold border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-brand-primary" />
            <span>{demoEmpty ? 'View Cart' : 'Demo Empty'}</span>
          </button>
        </div>
      </div>

      <Container className="pt-4 sm:pt-8">
        {/* ======================================================== */}
        {/* 4. Desktop Page Heading + State Switcher Tabs */}
        {/* ======================================================== */}
        <div className="hidden sm:flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-brand-hover text-xs font-bold tracking-wide">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Interactive State Toggle Pills (From Stitch Artboard) */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setDemoEmpty(false)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                !demoEmpty
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Active Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setDemoEmpty(true)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                demoEmpty
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Empty Cart State
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Mobile Islandwide Transit Banner */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-4 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900">
              Islandwide Courier Transit
            </h4>
            <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
              Orders dispatched through vetted third-party courier partners across all 25 districts in Sri Lanka.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. Active Cart vs Empty Cart UI Display */}
        {/* ======================================================== */}
        {activeItems.length === 0 ? (
          /* Empty Cart State Screen (Desktop & Mobile) */
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-xs my-6">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-brand-primary flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
                Your Shopping Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                You don&apos;t have any products in your cart yet. Browse our curated catalog of authentic Ceylon tea, quality home kitchen appliances, and electronics.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/catalog">
                <Button className="font-bold text-xs h-10 px-6 rounded-xl shadow-xs">
                  Browse Catalog
                </Button>
              </Link>
              <Link href="/categories/home-kitchen">
                <Button
                  variant="outline"
                  className="font-bold text-xs h-10 px-5 rounded-xl border-slate-200 hover:bg-slate-50"
                >
                  Home &amp; Kitchen
                </Button>
              </Link>
              <button
                onClick={restoreSampleItems}
                className="px-4 py-2 text-xs font-bold text-brand-primary hover:text-brand-hover hover:underline transition-colors cursor-pointer"
              >
                Restore 2 Sample Items
              </button>
            </div>
          </div>
        ) : (
          /* Two Column Grid: Cart Items List + Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ======================================================== */}
            {/* Left Column: Cart Items (lg:col-span-8) */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 space-y-5">
              {/* Mobile Header Row */}
              <div className="sm:hidden flex items-center justify-between text-xs pb-1">
                <span className="font-heading font-bold text-slate-800">
                  Items Selected for Dispatch
                </span>
                <button
                  onClick={clearCart}
                  className="font-semibold text-red-600 hover:text-red-700 active:scale-95 transition-transform"
                >
                  Clear all
                </button>
              </div>

              {/* Desktop Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4">
                <div className="col-span-6">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-right">SUBTOTAL</div>
              </div>

              {/* Items Card Container */}
              <div className="space-y-3 sm:space-y-4">
                {activeItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs hover:border-slate-300 transition-all"
                  >
                    {/* Desktop Row View */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center gap-4">
                        <Link
                          href="/products/singer-electric-kettle"
                          className="relative w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 group"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="space-y-1">
                          {/* Stock pill */}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{item.tagDesktop}</span>
                          </span>

                          <Link
                            href="/products/singer-electric-kettle"
                            className="font-heading font-bold text-sm text-slate-900 hover:text-brand-primary transition-colors block line-clamp-2 leading-snug"
                          >
                            {item.title}
                          </Link>

                          <span className="text-[11px] font-mono text-slate-400 block">
                            SKU: {item.sku}
                          </span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-center font-heading font-bold text-sm text-slate-900">
                        {formatPrice(item.priceCents)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-span-2 flex justify-center">
                        <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/70 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center font-bold text-xs text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Line Subtotal + Remove Link */}
                      <div className="col-span-2 text-right space-y-1">
                        <div className="font-heading font-black text-sm text-brand-hover">
                          {formatPrice(item.priceCents * item.quantity)}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-600 transition-colors font-medium cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Card View (Matches Stitch 390px Artboard) */}
                    <div className="sm:hidden space-y-3">
                      <div className="flex gap-3 items-start">
                        {/* Image Frame with Brand Badge */}
                        <div className="relative w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          {/* Top-Left Brand Pill Badge */}
                          <div className="absolute top-1.5 left-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wide text-white shadow-xs ${
                                item.mobileBadgeColor === 'orange'
                                  ? 'bg-[#F97316]'
                                  : 'bg-[#15803D]'
                              }`}
                            >
                              {item.mobileBadge}
                            </span>
                          </div>
                        </div>

                        {/* Title, tags and remove */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="font-heading font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 p-1 -mt-1 -mr-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Subtitle / Region tag */}
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold mt-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{item.tagMobile}</span>
                          </div>

                          {/* Price Row */}
                          <div className="flex items-baseline justify-between mt-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-heading font-black text-sm text-brand-hover">
                                {formatPrice(item.priceCents)}
                              </span>
                              {item.originalPriceCents && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  {formatPrice(item.originalPriceCents)}
                                </span>
                              )}
                            </div>
                            {item.mobileSubtitle && (
                              <span className="text-[10px] text-slate-500 font-medium">
                                {item.mobileSubtitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Quantity Stepper Row */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-500">Quantity</span>
                        <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/80 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Bottom Actions: Continue Shopping & Clear Cart */}
              <div className="hidden sm:flex items-center justify-between pt-2">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cart</span>
                </button>
              </div>

              {/* 3 Trust Badges Grid (Desktop & Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 sm:pt-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      100% Genuine Goods
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Direct warranty from brand importers
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Careful Packaging
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Tamper-evident sealed courier boxes
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Island Support
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Colombo phone &amp; WhatsApp helpdesk
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Right Column: Order Summary (lg:col-span-4) */}
            {/* ======================================================== */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <h2 className="font-heading font-black text-base sm:text-lg text-slate-900">
                    Order Summary
                  </h2>
                  <CreditCard className="w-4 h-4 text-slate-400" />
                </div>

                {/* Subtotal line */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Items Subtotal</span>
                    <span className="font-heading font-bold text-sm text-slate-900">
                      {formatPrice(itemsSubtotalCents)}
                    </span>
                  </div>

                  {/* Courier delivery notice */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <span>Courier Delivery</span>
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-[11px] text-emerald-600 font-bold block">
                        Islandwide Courier
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 italic">
                      Calculated at checkout
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                      <span>Promo Discount (10%)</span>
                      <span>-{formatPrice(promoDiscountCents)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code Box (Desktop & Mobile) */}
                <div className="pt-2 border-t border-slate-100">
                  {/* Mobile Collapsible Header */}
                  <div className="sm:hidden mb-2">
                    <button
                      type="button"
                      onClick={() => setMobilePromoOpen(!mobilePromoOpen)}
                      className="w-full flex items-center justify-between text-xs font-bold text-slate-800"
                    >
                      <div className="flex items-center gap-1.5 text-brand-primary">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Have a Voucher or Promo Code?</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          mobilePromoOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Promo Input Box (Always visible on Desktop, collapsible on mobile) */}
                  <div
                    className={`${
                      mobilePromoOpen ? 'block' : 'hidden sm:block'
                    } rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 space-y-2`}
                  >
                    <span className="hidden sm:block text-[11px] font-bold text-slate-700">
                      Have a Promo or Gift Voucher?
                    </span>
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="ENTER PROMO CODE"
                        className="flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-mono uppercase font-semibold text-slate-900 placeholder:text-slate-400 placeholder:normal-case focus:outline-none focus:border-brand-primary"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="h-9 px-4 rounded-lg bg-[#1E293B] hover:bg-slate-900 text-white font-bold text-xs"
                      >
                        Apply
                      </Button>
                    </form>
                    {promoError && (
                      <span className="text-[10px] text-red-500 font-semibold block">
                        {promoError}
                      </span>
                    )}
                    {promoApplied && (
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        ✔ Voucher LANKA2024 applied successfully!
                      </span>
                    )}
                  </div>
                </div>

                {/* Total (before shipping) */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 block">
                        Total (before shipping)
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Taxes included where applicable
                      </span>
                    </div>
                    <span className="font-heading font-black text-xl sm:text-2xl text-brand-hover">
                      {formatPrice(finalTotalCents)}
                    </span>
                  </div>
                </div>

                {/* Desktop Checkout Button */}
                <div className="hidden sm:block pt-1">
                  <Link href="/checkout" className="block">
                    <Button className="w-full h-11 text-sm font-bold shadow-md rounded-xl active:scale-[0.99] flex items-center justify-center gap-2">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Courier Safe Delivery Badge */}
                <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] text-slate-600 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Delivered safely through third-party courier services across Sri Lanka.</span>
                </div>

                {/* Accepted Payment Methods */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Accepted Payment Methods:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Cash on Delivery', 'Visa / Mastercard', 'Koko Pay', 'Bank Transfer'].map(
                      (method) => (
                        <span
                          key={method}
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold"
                        >
                          {method}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Bank-grade SSL Note */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-center flex items-center justify-center gap-2 text-xs text-slate-500 shadow-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">
                  Bank-grade 256-bit SSL encrypted transaction with regional Sri Lankan gateways
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* ======================================================== */}
      {/* 7. Mobile Sticky Bottom Checkout Bar (Stitch Artboard) */}
      {/* ======================================================== */}
      {activeItems.length > 0 && (
        <div className="sm:hidden fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2.5 shadow-xl flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">
              Total (Excl. shipping)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-black text-lg text-brand-hover">
                {formatPrice(finalTotalCents)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <span>⚡ Ready for Dispatch</span>
            </span>
          </div>

          <Link href="/checkout" className="flex-1 max-w-[200px]">
            <Button className="w-full h-10 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1 active:scale-95">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
