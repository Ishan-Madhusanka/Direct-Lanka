'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  X,
  Upload,
  CloudUpload,
  Sparkles,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Code,
  Tag,
  ShieldAlert,
  Eye,
  CheckCircle2,
  Truck,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Layers,
  Lock,
  Boxes,
  HelpCircle,
  Clock,
  Bookmark,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Form State
  const [productTitle, setProductTitle] = useState(
    'Singer 1.8L Stainless Steel Cordless Fast Boil Electric Kettle'
  );
  const [category, setCategory] = useState('Home & Kitchen > Small Appliances / Kettles');
  const [sku, setSku] = useState('SIN-KT-1800');
  const [description, setDescription] = useState(
    'Designed for modern Sri Lankan kitchens, the Singer 1.8L Electric Kettle features food-grade stainless steel construction, 1500W rapid boil technology, and automatic shut-off with boil-dry protection. Ideal for daily tea, coffee, and cooking preparation.'
  );

  // Bullet Point Highlights
  const [highlights, setHighlights] = useState<string[]>([
    '1.8L Capacity',
    '1500W Rapid Boil',
    'SS304 Food Grade Steel',
    '360° Cordless Base',
  ]);
  const [newHighlight, setNewHighlight] = useState('');
  const [isAddingHighlight, setIsAddingHighlight] = useState(false);

  // Gallery
  const [galleryImages, setGalleryImages] = useState<
    { id: string; src: string; isMain: boolean; title: string }[]
  >([
    {
      id: 'img-1',
      src: '/images/product-kettle.jpg',
      isMain: true,
      title: 'Countertop Main View',
    },
    {
      id: 'img-2',
      src: '/images/kettle-thumb-1.jpg',
      isMain: false,
      title: '360 Base Connector',
    },
    {
      id: 'img-3',
      src: '/images/kettle-thumb-2.jpg',
      isMain: false,
      title: 'Lifestyle Tea Pouring',
    },
    {
      id: 'img-4',
      src: '/images/kettle-thumb-3.jpg',
      isMain: false,
      title: 'Interior Food-grade Steel',
    },
  ]);

  // Inventory & Stock
  const [availableUnits, setAvailableUnits] = useState(28);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [dispatchStatus, setDispatchStatus] = useState<'immediate' | 'out_of_stock'>(
    'immediate'
  );

  // Pricing & Margins
  const [wholesaleCost, setWholesaleCost] = useState(3800);
  const [regularPriceMRP, setRegularPriceMRP] = useState(5800);
  const [sellingPrice, setSellingPrice] = useState(4950);

  // Store Visibility
  const [visibilityStatus, setVisibilityStatus] = useState<
    'active' | 'draft' | 'inactive'
  >('active');
  const [featureOnHomepage, setFeatureOnHomepage] = useState(true);

  // Interactive feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profit & Margin computations
  const netProfit = useMemo(() => {
    return Math.max(0, sellingPrice - wholesaleCost);
  }, [sellingPrice, wholesaleCost]);

  const marginPercentage = useMemo(() => {
    if (sellingPrice <= 0) return 0;
    return ((netProfit / sellingPrice) * 100).toFixed(1);
  }, [netProfit, sellingPrice]);

  const wholesalePercentage = useMemo(() => {
    if (sellingPrice <= 0) return 0;
    return (((sellingPrice - netProfit) / sellingPrice) * 100).toFixed(1);
  }, [netProfit, sellingPrice]);

  // Handlers
  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights((prev) => [...prev, newHighlight.trim()]);
      setNewHighlight('');
      setIsAddingHighlight(false);
      showToast('Bullet highlight added.');
    }
  };

  const handleSetMainImage = (id: string) => {
    setGalleryImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
    showToast('Main cover image updated.');
  };

  const handleRemoveImage = (id: string) => {
    if (galleryImages.length <= 1) {
      showToast('Catalog item requires at least 1 image.');
      return;
    }
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
    showToast('Image removed from gallery.');
  };

  const handleSaveAndPublish = () => {
    showToast('Product "Singer 1.8L Kettle" saved & published to live storefront!');
    setTimeout(() => {
      router.push('/admin/products');
    }, 1500);
  };

  const handleSaveDraft = () => {
    setVisibilityStatus('draft');
    showToast('Saved product internally as Draft.');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP BREADCRUMB & HEADER (1440px Artboard)                             */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Link
            href="/admin/products"
            className="hover:text-brand-primary flex items-center gap-1.5 transition-colors"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Products</span>
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">
            Edit Product ({productTitle.slice(0, 48)}...)
          </span>
        </div>

        {/* Title & Actions Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Edit Product
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Active Catalog Item</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold">
              {sku}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/admin/products">
              <Button
                variant="outline"
                className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
                <span>Cancel</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 text-slate-500" />
              <span>Save as Draft</span>
            </Button>

            <Button
              onClick={handleSaveAndPublish}
              className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              <span>Save & Publish Product</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE TOP BAR (390px Artboard)                                           */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-2">
        <div className="flex items-center justify-between py-1 border-b border-slate-200">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Products</span>
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Autosaved 1m ago</span>
          </div>
        </div>

        {/* Mobile Visibility Segmented Control */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Product Visibility
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              ✓ Live in Colombo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            {(['active', 'draft', 'inactive'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setVisibilityStatus(s)}
                className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  visibilityStatus === s
                    ? 'bg-white text-brand-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s === 'inactive' ? 'Archived' : s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs">
            <input
              type="checkbox"
              id="mobileFeatureHome"
              checked={featureOnHomepage}
              onChange={(e) => setFeatureOnHomepage(e.target.checked)}
              className="w-4 h-4 rounded text-brand-primary accent-brand-primary"
            />
            <label htmlFor="mobileFeatureHome" className="font-bold text-slate-800 cursor-pointer">
              Feature on Storefront Homepage
              <span className="block text-[10px] text-slate-400 font-normal">
                Elevates priority in curated Sri Lankan deals feed
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN TWO-COLUMN WORKSPACE                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 lg:pb-6">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Main Form Specs & Images (col-span-8)                      */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Basic Product Information */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Basic Product Information
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Core naming, merchandising category, and customer-facing specs
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-brand-primary">
                * Required fields
              </span>
            </div>

            {/* Product Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {productTitle.length} / 120
                </span>
              </div>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                maxLength={120}
                className="w-full h-10 px-3.5 rounded-xl border border-indigo-200 bg-indigo-50/20 text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                placeholder="Descriptive product title with brand and key specs..."
              />
              <p className="text-[10px] text-slate-400">
                Descriptive titles with brand and key specs perform 38% better in search
              </p>
            </div>

            {/* Category & SKU row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Store Category */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs">
                  Store Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
                >
                  <option value="Home & Kitchen > Small Appliances / Kettles">
                    Home & Kitchen &gt; Small Appliances / Kettles
                  </option>
                  <option value="Foods & Grocery > Ceylon Tea">
                    Foods & Grocery &gt; Ceylon Tea
                  </option>
                  <option value="Electronics > Audio & Headphones">
                    Electronics &gt; Audio & Headphones
                  </option>
                  <option value="Fashion & Apparel > Handloom Menswear">
                    Fashion & Apparel &gt; Handloom Menswear
                  </option>
                  <option value="Beauty & Care > Ayurvedic Wellness">
                    Beauty & Care &gt; Ayurvedic Wellness
                  </option>
                </select>
              </div>

              {/* SKU Code */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800">
                    SKU Code <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Internal Tracking
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full h-10 pl-3 pr-20 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSku(`SIN-KT-${Math.floor(1000 + Math.random() * 9000)}`);
                      showToast('Generated fresh supplier SKU.');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-primary hover:underline"
                  >
                    Regenerate
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Unique store SKU assigned to supplier batch SIN-Colombo-2024
                </p>
              </div>
            </div>

            {/* Full Product Description with Toolbar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  Full Product Description <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  <span>Rich text format</span>
                  <span>•</span>
                  <span>HTML Markdown Supported</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden focus-within:border-brand-primary">
                {/* Rich text formatting bar */}
                <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-2 text-slate-600">
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs font-black"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs italic"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs"
                    title="Bulleted List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs"
                    title="Insert Link"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 text-xs"
                    title="Clear Formatting"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 text-xs text-slate-800 leading-relaxed focus:outline-none resize-y"
                  placeholder="Describe materials, warranty, power wattage, and usage benefits..."
                />
              </div>
            </div>

            {/* Bullet Point Highlights */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  Bullet Point Highlights
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Shown prominently next to price on storefront
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                    <span>{h}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-slate-400 hover:text-red-500 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {isAddingHighlight ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="e.g. 2-Year Singer Warranty"
                      className="h-8 px-3 rounded-full border border-brand-primary text-xs font-semibold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="h-8 px-3 rounded-full bg-brand-primary text-white text-xs font-bold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingHighlight(false)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingHighlight(true)}
                    className="h-8 px-3 rounded-full border border-dashed border-slate-300 text-slate-600 hover:border-brand-primary hover:text-brand-primary text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>+ Add Feature</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: Product Media & Images */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Product Media & Images
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Recommended 800×800px or larger square format (PNG, JPG up to 5MB)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600">
                {galleryImages.length} of 8 uploaded
              </span>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className={`group relative rounded-2xl overflow-hidden aspect-square bg-slate-100 border transition-all ${
                    img.isMain
                      ? 'border-brand-primary shadow-xs ring-2 ring-brand-primary/20'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Image src={img.src} alt={img.title} fill className="object-cover" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    {img.isMain ? (
                      <span className="px-2 py-0.5 rounded-full bg-brand-primary text-white text-[9px] font-black tracking-wider uppercase shadow-xs">
                        ★ Main Image
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetMainImage(img.id)}
                        className="opacity-0 group-hover:opacity-100 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-bold hover:bg-brand-primary transition-opacity"
                      >
                        Set Main
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="w-5 h-5 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Drag & Drop Tile */}
              {galleryImages.length < 8 && (
                <label className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-primary aspect-square bg-slate-50/60 hover:bg-orange-50/30 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors group">
                  <CloudUpload className="w-6 h-6 text-slate-400 group-hover:text-brand-primary transition-colors" />
                  <span className="font-heading font-black text-xs text-slate-700 mt-1.5 block">
                    Upload Image
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Drag & drop
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const newImg = {
                          id: `img-${Date.now()}`,
                          src: '/images/kettle-thumb-4.jpg',
                          isMain: false,
                          title: 'Newly Uploaded Angle',
                        };
                        setGalleryImages((prev) => [...prev, newImg]);
                        showToast('New photo uploaded to gallery.');
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <p className="text-[11px] text-slate-400 font-medium pt-1">
              Drag to reorder. Tap main badge to change cover.
            </p>
          </div>

          {/* CARD 3: Inventory & Stock Management */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Inventory & Stock Management
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Live warehouse availability and automated stock depletion alerts
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                In Stock (Healthy)
              </span>
            </div>

            {/* Units & Threshold */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs">
                  Available Units <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={availableUnits}
                    onChange={(e) => setAvailableUnits(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                    Units
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Units physically stationed at Colombo Central Hub
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs">
                  Low Stock Threshold
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                    Warn
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Admin dashboard banner triggers when inventory hits 5 units
                </p>
              </div>
            </div>

            {/* Storefront Dispatch Status */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-800 text-xs block">
                Storefront Dispatch Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                    dispatchStatus === 'immediate'
                      ? 'border-brand-primary bg-orange-50/40 text-slate-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="dispatchStatus"
                    checked={dispatchStatus === 'immediate'}
                    onChange={() => setDispatchStatus('immediate')}
                    className="mt-0.5 text-brand-primary accent-brand-primary"
                  />
                  <div>
                    <span className="font-heading font-black text-xs block leading-tight">
                      Available for immediate dispatch
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      Same-day courier pickup in Western Province
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                    dispatchStatus === 'out_of_stock'
                      ? 'border-brand-primary bg-orange-50/40 text-slate-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="dispatchStatus"
                    checked={dispatchStatus === 'out_of_stock'}
                    onChange={() => setDispatchStatus('out_of_stock')}
                    className="mt-0.5 text-brand-primary accent-brand-primary"
                  />
                  <div>
                    <span className="font-heading font-black text-xs block leading-tight">
                      Temporarily Out of Stock
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      Disables &lsquo;Buy Now&rsquo; button on customer site
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Courier Transit Callout */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <Truck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-bold">Courier Note:</strong> Item
                packaged in manufacturer protective carton with foam lining. Ready for
                3rd-party logistics courier transit.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT RAIL: Pricing, Margin Widget, Visibility (col-span-4)              */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARD 1: Pricing & Margins */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-brand-hover text-[10px] font-black uppercase tracking-wider">
                  Owner Eyes Only • Private
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                LKR Currency
              </span>
            </div>

            <div>
              <h3 className="font-heading font-black text-sm text-slate-900">
                Pricing & Margins
              </h3>
              <p className="text-[11px] text-slate-400">
                Real-time profit computation per unit sale
              </p>
            </div>

            {/* Inputs: Cost, MRP, Selling Price */}
            <div className="space-y-3">
              {/* Wholesale Cost */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Wholesale Purchase Cost <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Supplier Invoice</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={wholesaleCost}
                    onChange={(e) => setWholesaleCost(Number(e.target.value))}
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Regular Price (M.R.P.) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Regular Price (M.R.P.) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Strikethrough Price</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={regularPriceMRP}
                    onChange={(e) => setRegularPriceMRP(Number(e.target.value))}
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Selling Price */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-900">
                    Discounted / Active Selling Price
                  </label>
                  <span className="text-[10px] font-bold text-brand-primary">
                    Customer Pays
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full h-10 pl-10 pr-3 rounded-xl border-2 border-brand-primary/40 font-mono text-base font-black text-brand-hover focus:outline-none focus:border-brand-primary bg-orange-50/20"
                  />
                </div>
              </div>
            </div>

            {/* Unit Margin Widget */}
            <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Gross Margin per Unit
                </span>
                <span className="px-2 py-0.5 rounded-full bg-brand-primary text-white text-[11px] font-black">
                  {marginPercentage}% Margin
                </span>
              </div>

              <div>
                <p className="font-heading font-black text-lg text-slate-900">
                  Net Profit:{' '}
                  <span className="text-brand-primary">
                    Rs. {netProfit.toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex">
                <div
                  className="h-full bg-slate-400"
                  style={{ width: `${wholesalePercentage}%` }}
                  title={`Wholesale Cost: ${wholesalePercentage}%`}
                ></div>
                <div
                  className="h-full bg-brand-primary"
                  style={{ width: `${marginPercentage}%` }}
                  title={`Net Profit: ${marginPercentage}%`}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>Wholesale Cost ({wholesalePercentage}%)</span>
                <span>Net Profit ({marginPercentage}%)</span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-orange-200/50">
                Selling at <strong className="text-slate-900 font-bold">Rs. {sellingPrice.toLocaleString()}</strong> - Cost <strong className="text-slate-900 font-bold">Rs. {wholesaleCost.toLocaleString()}</strong> = <strong className="text-brand-primary font-bold">Rs. {netProfit.toLocaleString()}</strong> net earnings per checkout before courier dispatch fee.
              </p>
            </div>
          </div>

          {/* CARD 2: Store Visibility & Status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div>
              <h3 className="font-heading font-black text-sm text-slate-900">
                Store Visibility & Status
              </h3>
              <p className="text-[11px] text-slate-400">
                Manage customer availability
              </p>
            </div>

            {/* Radio Group */}
            <div className="space-y-2">
              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                  visibilityStatus === 'active'
                    ? 'border-brand-primary bg-orange-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityStatus === 'active'}
                  onChange={() => setVisibilityStatus('active')}
                  className="mt-0.5 text-brand-primary accent-brand-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-900">
                      Active
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Visible to all shoppers on customer store
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                  visibilityStatus === 'draft'
                    ? 'border-brand-primary bg-orange-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityStatus === 'draft'}
                  onChange={() => setVisibilityStatus('draft')}
                  className="mt-0.5 text-brand-primary accent-brand-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-900">
                      Draft
                    </span>
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Saved internally, hidden from storefront
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                  visibilityStatus === 'inactive'
                    ? 'border-brand-primary bg-orange-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityStatus === 'inactive'}
                  onChange={() => setVisibilityStatus('inactive')}
                  className="mt-0.5 text-brand-primary accent-brand-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-900">
                      Inactive
                    </span>
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Archived / unlisted from browse catalog
                  </span>
                </div>
              </label>
            </div>

            {/* Feature on homepage checkbox */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="desktopFeatureHome"
                checked={featureOnHomepage}
                onChange={(e) => setFeatureOnHomepage(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-brand-primary accent-brand-primary"
              />
              <label htmlFor="desktopFeatureHome" className="text-xs font-bold text-slate-800 cursor-pointer">
                Feature on Homepage
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                  Highlight inside &lsquo;Featured Deals&rsquo; carousel banner
                </span>
              </label>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Last modified: 2 hours ago by Store Admin</span>
            </div>
          </div>

          {/* Desktop Right Rail Action Buttons */}
          <div className="space-y-2.5">
            <Button
              onClick={handleSaveAndPublish}
              className="w-full h-10 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>

            <Link href="/products/1" target="_blank" className="block">
              <Button
                variant="outline"
                className="w-full h-10 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Preview on Customer Store</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Button>
            </Link>

            <p className="text-[10px] text-slate-400 text-center font-medium">
              Direct synchronization to Colombo storefront
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM ACTIONS (<1024px)                                    */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-xl flex items-center gap-2.5">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          className="flex-1 h-10 rounded-xl border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
        >
          <Bookmark className="w-3.5 h-3.5 mr-1" />
          <span>Save Draft</span>
        </Button>

        <Button
          onClick={handleSaveAndPublish}
          className="flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Save & Publish</span>
        </Button>
      </div>
    </div>
  );
}
