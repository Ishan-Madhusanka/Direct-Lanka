'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Heart,
  ShoppingCart,
  Zap,
  Check,
  CheckCircle2,
  Package,
  Share2,
  ArrowLeft,
  ZoomIn,
  MessageCircleQuestion,
  Star,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatLKR } from '@/lib/utils';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [pairsWellAdded, setPairsWellAdded] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const unitPrice = 4950;
  const originalPrice = 5800;
  const savings = originalPrice - unitPrice;
  const totalPrice = unitPrice * quantity;

  // 4 Gallery Images from Artboard
  const galleryImages = [
    '/images/kettle-thumb-1.jpg',
    '/images/kettle-thumb-2.jpg',
    '/images/kettle-thumb-3.jpg',
    '/images/kettle-thumb-4.jpg',
  ];

  // Technical Specifications
  const technicalSpecs = [
    { label: 'Capacity', value: '1.8 Litres' },
    { label: 'Power Rating', value: '1500W (220-240V)' },
    { label: 'Housing Material', value: 'Food-Grade SS & BPA-Free' },
    { label: 'Base Type', value: '360° Cordless Pirouette' },
    { label: 'Safety Protections', value: 'Auto Shut-Off & Boil-Dry Protection', fullWidth: true },
  ];

  // Recommendations "You May Also Like"
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Dilmah Ceylon Pure Black Tea 500g Pouch',
      tag: 'Grocery',
      price: 'Rs. 2,150',
      image: '/images/product-tea.jpg',
    },
    {
      id: 'rec-2',
      title: 'Borosil Airtight Glass Container Set (3-Piece)',
      tag: 'Kitchen',
      price: 'Rs. 4,200',
      image: '/images/product-storage.jpg',
    },
    {
      id: 'rec-3',
      title: 'Tefal 24cm Induction Non-Stick Frying Pan',
      tag: 'Cookware',
      price: 'Rs. 7,200',
      image: '/images/product-pan.jpg',
    },
    {
      id: 'rec-4',
      title: 'Preethi 750W Mixer Grinder with 3 Jars',
      tag: 'Appliances',
      price: 'Rs. 18,900',
      image: '/images/product-grinder.jpg',
    },
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-24 sm:pb-16">
      {/* ======================================================== */}
      {/* 1. Mobile Top Navigation Bar (Artboard Reference) */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/catalog" className="p-1 -ml-1 text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-heading font-bold text-sm text-slate-900">
          Product Details
        </span>
        <div className="flex items-center gap-3">
          <button className="text-slate-600 hover:text-slate-900">
            <Share2 className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
            IM
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Sub-Header & Breadcrumb Bar (Desktop & Mobile) */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200/80 py-2.5">
        <Container>
          <div className="flex items-center justify-between text-xs">
            {/* Desktop Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 flex-wrap">
              <Link href="/" className="hover:text-brand-primary flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/categories/home-kitchen" className="hover:text-brand-primary">
                Home & Kitchen
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/categories/home-kitchen" className="hover:text-brand-primary">
                Small Kitchen Appliances
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900 line-clamp-1">
                Singer 1.8L Electric Kettle
              </span>
            </div>

            {/* Mobile Breadcrumb */}
            <div className="sm:hidden flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Link href="/" className="hover:text-brand-primary">Home</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <Link href="/categories/home-kitchen" className="hover:text-brand-primary">Home & Kitchen</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-semibold">Kettles</span>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-red-500"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 3. Main Product Grid: Gallery + Purchasing Details */}
      {/* ======================================================== */}
      <Container className="pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ======================================================== */}
          {/* Left Column: Image Gallery & Technical Specs (Desktop) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Image Container */}
            <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              {/* Badges on Image */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-black shadow-xs">
                  15% OFF
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white text-slate-800 border border-slate-200 text-[11px] font-bold shadow-xs">
                  Genuine Warranty
                </span>
              </div>

              {/* Mobile Slide Indicator */}
              <div className="sm:hidden absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                {selectedImage + 1}/4
              </div>

              {/* Zoom Trigger Button */}
              <button
                className="hidden sm:flex absolute bottom-3.5 right-3.5 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-xs items-center justify-center text-slate-700 hover:text-brand-primary border border-slate-200 shadow-xs transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Main Image Aspect Box */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full bg-slate-50">
                <Image
                  src={galleryImages[selectedImage]}
                  alt="Singer 1.8L Stainless Steel Electric Kettle"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Mobile Dots Pagination */}
              <div className="sm:hidden flex items-center justify-center gap-1.5 py-2.5 bg-white border-t border-slate-100">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      selectedImage === idx
                        ? 'w-6 bg-brand-primary'
                        : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop 4-Thumbnail Row */}
            <div className="hidden sm:grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? 'border-brand-primary shadow-xs ring-2 ring-brand-primary/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Desktop Technical Specifications Box */}
            <div className="hidden sm:block rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Technical Specifications
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {technicalSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl bg-slate-50 border border-slate-100 ${
                      spec.fullWidth ? 'col-span-2' : ''
                    }`}
                  >
                    <span className="block text-[11px] text-slate-400 font-medium">
                      {spec.label}
                    </span>
                    <span className="block font-heading font-bold text-slate-900 mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Right Column: Pricing, Details & Purchase Box */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-5">
            {/* Brand, Model & SKU Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-brand-hover">
                  SINGER BRAND
                </span>
                <span className="sm:hidden text-xs text-slate-400 font-medium">
                  Model: EK-18SS
                </span>
              </div>
              <span className="hidden sm:inline text-xs text-slate-400 font-mono">
                SKU: SIN-KT-1800
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Singer 1.8L Stainless Steel Cordless Fast Boil Electric Kettle
            </h1>

            {/* Stock Dispatch Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>In Stock – Islandwide Courier Dispatch</span>
            </div>

            {/* Pricing Box (Lavender/Soft container from Artboard) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/60 via-amber-50/40 to-slate-50 border border-orange-200/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-heading font-black text-2xl sm:text-3xl text-brand-primary">
                  Rs. 4,950
                </span>
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  Rs. 5,800
                </span>
                <span className="sm:hidden px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700">
                  Islandwide Delivery
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                <span>Save Rs. {savings.toLocaleString()} (15% OFF)</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed for modern Sri Lankan kitchens, the Singer 1.8L Electric Kettle features food-grade stainless steel construction, 1500W rapid boil technology, and automatic shut-off with boil-dry protection. Ideal for daily tea, coffee, and cooking preparation.
            </p>

            {/* Warehouse Stock Availability Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <span className="text-slate-500">Stock Availability:</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>28 units available in warehouse</span>
              </span>
            </div>

            {/* Mobile 3 Feature Stat Cards */}
            <div className="sm:hidden grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block font-heading font-black text-sm text-slate-900">1.8 Litres</span>
                <span className="text-[10px] text-slate-500 font-medium">Capacity</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block font-heading font-black text-sm text-slate-900">1500W</span>
                <span className="text-[10px] text-slate-500 font-medium">Fast Boil</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block font-heading font-black text-sm text-slate-900">SS304</span>
                <span className="text-[10px] text-slate-500 font-medium">Food Grade</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-bold text-slate-700">Quantity</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-heading font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    disabled={quantity >= 5}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">Max 5 units per order</span>
              </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden sm:grid grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="h-12 font-bold shadow-md"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>Add to Cart</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 font-bold border-slate-300 text-slate-900 hover:border-brand-primary"
              >
                <Zap className="w-4 h-4 mr-2 text-brand-primary fill-brand-primary" />
                <span>Buy Now</span>
              </Button>
            </div>

            {/* Added to Cart Feedback Toast */}
            {addedToCart && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Added {quantity} unit(s) of Singer Kettle to your shopping cart!</span>
              </div>
            )}

            {/* 4 Trust Badges Box (Desktop & Mobile) */}
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-4 sm:p-5 space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Islandwide Third-Party Delivery</span>
                  <span className="text-[11px] text-slate-600 leading-relaxed block">
                    Dispatched within 24–48 hours via leading courier services.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Cash on Delivery Available</span>
                  <span className="text-[11px] text-slate-600 leading-relaxed block">
                    Pay safely at your doorstep across Sri Lanka.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">7-Day Inspection Policy</span>
                  <span className="text-[11px] text-slate-600 leading-relaxed block">
                    Standard inspection and hassle-free returns apply.
                  </span>
                </div>
              </div>
            </div>

            {/* Questions Banner (Desktop) */}
            <div className="hidden sm:flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <MessageCircleQuestion className="w-4 h-4 text-brand-primary" />
                <span>Have questions about this item? Our Colombo call support is ready to help</span>
              </div>
              <Link href="/contact" className="font-bold text-brand-primary hover:underline shrink-0">
                Inquire →
              </Link>
            </div>

            {/* Mobile Accordions */}
            <div className="sm:hidden divide-y divide-slate-200 border-y border-slate-200 text-xs">
              {[
                {
                  id: 'overview',
                  title: 'Product Overview',
                  content:
                    'Equipped with a concealed 1500W heating element, 360-degree swivel base, and easy-pour spout with integrated removable mesh filter. Auto shut-off triggers within seconds of boiling.',
                },
                {
                  id: 'specs',
                  title: 'Technical Specifications',
                  content:
                    'Capacity: 1.8 Litres | Power: 1500W (220-240V) | Material: SS304 Food-Grade Stainless Steel | Cord Length: 0.75m with cord wrap storage.',
                },
                {
                  id: 'delivery',
                  title: 'Delivery Information',
                  content:
                    'Delivery fee: Rs. 350 within Colombo, Rs. 550 outstations. Dispatched via PromptX / Domex courier partners with tracking SMS.',
                },
                {
                  id: 'returns',
                  title: 'Returns Policy',
                  content:
                    '7-day replacement guarantee for manufacturer defects. Supported by Singer Sri Lanka authorized service centers nationwide.',
                },
              ].map((acc) => (
                <div key={acc.id} className="py-3">
                  <button
                    onClick={() => toggleAccordion(acc.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-900"
                  >
                    <span>{acc.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openAccordion === acc.id ? 'rotate-180 text-brand-primary' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === acc.id && (
                    <p className="pt-2 text-slate-600 leading-relaxed text-[11px]">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile "Pairs Well With" Upsell Card */}
            <div className="sm:hidden rounded-2xl border border-orange-200 bg-orange-50/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-900">
                    Pairs Well With
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Essential companion for pure Ceylon tea brewing
                  </p>
                </div>
                <span className="text-[10px] font-bold text-brand-primary uppercase">
                  Special Bundle
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-orange-200/80">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <Image src="/images/product-tea.jpg" alt="Dilmah Tea" fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">
                      TOP RECOMMENDATION
                    </span>
                    <span className="font-heading font-bold text-xs text-slate-900 block line-clamp-1">
                      Dilmah Premium Ceylon Tea
                    </span>
                    <span className="text-[10px] text-slate-400 block">400g Loose Tea Pouch</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-bold text-xs text-brand-primary">Rs. 890</span>
                      <span className="text-[10px] text-slate-400 line-through">Rs. 950</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setPairsWellAdded(!pairsWellAdded)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    pairsWellAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orange-100 text-brand-primary hover:bg-brand-primary hover:text-white'
                  }`}
                >
                  {pairsWellAdded ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile Bottom Security Notice */}
            <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted & Secure Checkout • Verified Sri Lankan Merchant</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Recommendations Section ("You May Also Like") */}
        {/* ======================================================== */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                RECOMMENDATIONS
              </span>
              <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight mt-0.5">
                You May Also Like
              </h2>
            </div>

            <Link
              href="/categories/home-kitchen"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-hover transition-colors"
            >
              <span>Explore Category</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 hover:border-brand-primary/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white text-[10px] font-bold text-slate-700 border border-slate-200">
                      {rec.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {rec.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>In Stock</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                  <span className="font-heading font-black text-sm sm:text-base text-slate-900">
                    {rec.price}
                  </span>
                  <button
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-brand-primary flex items-center justify-center transition-colors cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* ======================================================== */}
      {/* 5. Mobile Fixed Sticky Bottom Purchase Bar */}
      {/* ======================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="shrink-0">
          <span className="text-[10px] text-slate-400 font-medium block">Total Price</span>
          <span className="font-heading font-black text-base text-slate-900 leading-tight">
            Rs. {totalPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            className="flex-1 h-11 text-xs font-bold bg-blue-50 text-slate-800 hover:bg-blue-100 border border-blue-200"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            <span>Cart</span>
          </Button>

          <Button
            onClick={handleAddToCart}
            className="flex-1 h-11 text-xs font-bold shadow-md"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
