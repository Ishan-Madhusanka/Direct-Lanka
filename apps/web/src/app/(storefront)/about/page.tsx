'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Store,
  ArrowRight,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Headphones,
  MapPin,
  Sparkles,
  Layers,
  Award,
  Search,
  ShoppingBag,
  Flag,
  Check,
  HeartHandshake,
  Tag,
  Mail,
  Flame,
  HelpCircle,
  Eye,
  Radio,
  FileText,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function AboutUsPage() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-24 sm:pb-20 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Desktop Breadcrumbs Bar */}
      {/* ======================================================== */}
      <div className="hidden sm:block border-b border-slate-200/80 bg-white py-3">
        <Container>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">About Us</span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Header Bar (Stitch Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary text-white font-heading font-black flex items-center justify-center text-sm shadow-xs">
            L
          </div>
          <div>
            <h1 className="font-heading font-black text-sm text-slate-900 leading-tight">
              LankaDirect
            </h1>
            <span className="text-[10px] text-slate-400 font-semibold block -mt-0.5">
              Colombo Express
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/search?q=" className="p-1 text-slate-600">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative p-1 text-slate-600">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </Link>
          <Link
            href="/account"
            className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0"
          >
            <Image
              src="/images/dinuka-avatar.jpg"
              alt="Dinuka Fernando"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Subheader Pill */}
      <div className="sm:hidden px-4 pt-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
          <span>About LankaDirect • Est. Colombo</span>
        </span>
      </div>

      <Container className="pt-4 sm:pt-8 max-w-7xl">
        {/* ======================================================== */}
        {/* 3. Hero Section (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Column: Heading, Bio, CTAs & Value Badges */}
          <div className="lg:col-span-7 space-y-5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/80 text-brand-hover text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5 text-brand-primary" />
              <span>ABOUT LANKADIRECT</span>
            </div>

            <div className="sm:hidden">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-hover uppercase tracking-wider">
                <Store className="w-3.5 h-3.5" />
                <span>Authentic Sri Lankan Retail</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.15]">
              Simple, Reliable Online Shopping for Everyday Essentials
            </h1>

            {/* Mobile Quote Callout Card (Artboard) */}
            <div className="sm:hidden p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 italic text-slate-700 text-xs leading-relaxed">
              &ldquo;LankaDirect is a Sri Lankan online retail store offering a convenient way to
              shop for everyday products across multiple categories. Our goal is to provide
              customers with a simple, reliable, and enjoyable online shopping experience.&rdquo;
            </div>

            {/* Desktop Description Paragraph */}
            <p className="hidden sm:block text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              LankaDirect is a Sri Lankan online retail store offering a convenient way to shop for
              everyday products across multiple categories. Our goal is to provide customers with a
              simple, reliable, and enjoyable online shopping experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-6 rounded-xl text-sm font-bold shadow-xs flex items-center justify-center gap-2">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/contact" className="hidden sm:inline-block">
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-xl text-sm font-bold border-slate-200 text-slate-800 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Contact Store Team</span>
                </Button>
              </Link>
            </div>

            {/* Trust Checks Row (Desktop) */}
            <div className="hidden sm:flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct Wholesale Sourced</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Islandwide Parcel Handover</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Clear LKR Currency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            {/* Desktop Visual Showcase Image */}
            <div className="hidden sm:block relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/about-showcase.jpg"
                  alt="Curated Sri Lankan Essentials"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* Floating Top Watermark */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-heading font-black text-slate-800 shadow-xs">
                  LankaDirect • About
                </div>

                {/* Floating Bottom Pill Badge (Stitch Artboard) */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
                        Everyday Variety
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">
                        Household • Tea • Kitchenware
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                    Everyday Value
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Hero Courier Image (Stitch Artboard) */}
            <div className="sm:hidden relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/about-delivery.jpg"
                  alt="Direct from island hubs to doorstep"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-xs font-bold">
                  <Truck className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Direct from island hubs right to your doorstep</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Section: Who We Are & What We Sell (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
            <span className="font-bold text-[11px] uppercase tracking-wider text-brand-hover block">
              OUR OPERATING FOUNDATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              Who We Are &amp; What We Sell
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Curated retail inventory managed directly for Sri Lankan families seeking convenience,
              quality, and dependable order fulfillment.
            </p>
          </div>

          {/* 3 Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 relative hover:border-brand-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-primary flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                01 / SUPPLY MODEL
              </span>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Direct Retail Model
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We curate items directly from wholesale distributors and suppliers to offer
                straightforward everyday value to Sri Lankan households.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 relative hover:border-brand-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                02 / EXTENSIVE RANGE
              </span>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Multi-Category Convenience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From kitchenware and appliances to Ceylon groceries and lifestyle items, all
                available under one digital storefront.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 relative hover:border-brand-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                03 / HANDS-ON QUALITY
              </span>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Single Store Ownership
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Independently owned and managed with care, ensuring direct oversight over product
                additions, pricing, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Mobile Category Grid (Stitch Mobile Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">What We Sell</h3>
              <p className="text-[11px] text-slate-500">Everyday household essentials curated for you</p>
            </div>
            <span className="text-xs font-bold text-brand-hover">4 Categories</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/catalog?category=kitchen"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Home &amp; Kitchen</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Cookware, storage &amp; lifestyle gear</p>
              </div>
            </Link>

            <Link
              href="/catalog?category=electronics"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Electronics</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Smart accessories &amp; audio tech</p>
              </div>
            </Link>

            <Link
              href="/catalog?category=groceries"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Ceylon Groceries</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Regional spices &amp; pantry staples</p>
              </div>
            </Link>

            <Link
              href="/catalog?category=living"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Fashion &amp; Living</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Breezy apparel &amp; personal care</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. Section: Guiding North Star, Mission & Vision */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Our Guiding North Star */}
            <div className="rounded-3xl border border-indigo-100 bg-[#EEF2FF]/60 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                  PURPOSE DRIVEN
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight">
                  Our Guiding North Star
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Serving modern consumers with transparent e-commerce standards, clear pricing,
                  and reliable access across regional and urban Sri Lanka.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-indigo-100/80">
                <div className="w-9 h-9 rounded-full bg-brand-primary text-white font-heading font-black text-xs flex items-center justify-center shadow-xs">
                  LD
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xs text-slate-900">
                    LankaDirect Store Team
                  </h5>
                  <span className="text-[11px] text-slate-500">Customer-First Operations</span>
                </div>
              </div>
            </div>

            {/* Card 2: Our Mission */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                    <Flag className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CORE MISSION
                  </span>
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To make quality consumer goods easily accessible to customers across all 25
                  districts in Sri Lanka through a hassle-free digital retail storefront.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                <span>All 25 Administrative Districts Reached</span>
              </div>
            </div>

            {/* Card 3: Our Vision */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    FUTURE VISION
                  </span>
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To become Sri Lanka&apos;s most trusted, transparent direct-to-consumer online store
                  recognized for honest pricing and dependable order fulfillment.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Radical Honesty &amp; Dependability</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. Section: Why Shop With Us (4 Cards Grid) */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
            <span className="font-bold text-[11px] uppercase tracking-wider text-brand-hover block">
              CUSTOMER FIRST ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              Why Shop With Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Built around clarity, straightforward logistics, and responsive support for peace of
              mind at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Honest Everyday Value
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent LKR pricing with no hidden checkout surcharges, ensuring you always
                  know exactly what you pay.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 pt-2 border-t border-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>No surprises at checkout</span>
              </span>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Doorstep Courier Transit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Islandwide transit handled carefully with packages safely handed over to
                  established 3rd-party couriers.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 pt-2 border-t border-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Islandwide coverage</span>
              </span>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Banknote className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Flexible Payment Convenience
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pay via Cash on Delivery upon arrival or select secure online card checkout based
                  on your personal preference.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 pt-2 border-t border-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>COD or card payments</span>
              </span>
            </div>

            {/* Card 4 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Dedicated Support
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accessible inquiries and direct assistance whenever you need help with an order,
                  item details, or returns.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 pt-2 border-t border-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Responsive store team</span>
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 8. Mobile Inspection Trust Banner (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
              <Image
                src="/images/about-inspection.jpg"
                alt="Colombo Operations Hub Inspection"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Colombo Operations Hub</span>
              </span>
              <h4 className="font-heading font-bold text-xs text-slate-900 mt-0.5">
                Carefully inspected before every dispatch
              </h4>
              <p className="text-[10px] text-slate-500">Quality check standard for all 25 districts</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. Bottom CTA Banner: Ready to discover essentials? */}
        {/* ======================================================== */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl mb-12">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-xl">
              <span className="font-bold text-[11px] uppercase tracking-wider text-orange-400 block">
                START BROWSING TODAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
                Ready to discover everyday essentials?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Browse our diverse categories of curated household products, kitchen supplies, tea,
                and grocery items.
              </p>
            </div>

            <Link href="/catalog" className="shrink-0">
              <Button className="h-12 px-7 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2">
                <span>Shop All Products</span>
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
