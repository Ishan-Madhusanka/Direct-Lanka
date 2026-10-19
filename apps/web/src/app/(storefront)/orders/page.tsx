'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Copy,
  Download,
  Headphones,
  ShieldCheck,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Eye,
  X,
  Check,
  Hourglass,
  FileText,
  ShoppingBag,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function MyOrdersPage() {
  const router = useRouter();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('#LD-84920');
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled'
  >('pending');

  // Interactive Modals & Toast State
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState('');

  // Editable Order Details State
  const [customerPhone, setCustomerPhone] = useState('+94 77 123 4567');
  const [customerAddress, setCustomerAddress] = useState(
    'No. 42, Galle Road, Colombo 03, Western Province.'
  );
  const [deliveryNotes, setDeliveryNotes] = useState('Call upon arrival at security gate');

  // Copy Order ID to clipboard
  const handleCopyOrderId = (orderId: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2200);
    }
  };

  // Print Order Slip handler
  const handlePrintSlip = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Handle Update Details Form
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateFeedback('Delivery instructions updated successfully!');
    setTimeout(() => {
      setUpdateFeedback('');
      setShowUpdateModal(false);
    }, 1200);
  };

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
            <Link href="/account" className="hover:text-brand-primary transition-colors">
              My Account
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">My Orders</span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Top App Header (Stitch Artboard) */}
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

      {/* ======================================================== */}
      {/* 3. Mobile Back Subheader */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/account" className="p-1 -ml-1 text-slate-700 hover:text-brand-primary">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-heading font-black text-lg text-slate-900 tracking-tight">
            My Orders
          </h2>
        </div>
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-1.5 text-slate-600 hover:text-brand-primary rounded-lg"
          aria-label="Filter orders"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <Container className="pt-4 sm:pt-8 max-w-7xl">
        {/* ======================================================== */}
        {/* 4. Desktop Header Title & Quick Action Desk */}
        {/* ======================================================== */}
        <div className="hidden sm:block mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100/80 text-brand-hover text-[11px] font-bold tracking-wider mb-2">
                <Package className="w-3.5 h-3.5 text-brand-primary" />
                <span>Customer Portal • Order Tracking</span>
              </span>
              <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
                My Orders
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span>1 Order Requiring Confirmation</span>
              </span>

              <button
                onClick={() => setShowHelpModal(true)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-primary hover:text-brand-primary text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-slate-500" />
                <span>Order Help Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Desktop Search & Filter Tabs Bar */}
        {/* ======================================================== */}
        <div className="hidden sm:block mb-8 space-y-4">
          {/* Search Box */}
          <div className="p-2 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-2 max-w-xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (e.g. #LD-84920)..."
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <Button
              onClick={() => {}}
              className="h-9 px-5 rounded-xl text-xs font-bold shadow-xs shrink-0"
            >
              Search
            </Button>
          </div>

          {/* Filter Pills with Counts (Artboard Standard) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Orders', count: 3 },
              { id: 'pending', label: 'Pending Confirmation', count: 1 },
              { id: 'confirmed', label: 'Confirmed', count: 0 },
              { id: 'processing', label: 'Processing', count: 0 },
              { id: 'dispatched', label: 'Dispatched', count: 1 },
              { id: 'delivered', label: 'Delivered', count: 1 },
              { id: 'cancelled', label: 'Cancelled', count: 0 },
            ].map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? f.id === 'pending'
                        ? 'bg-brand-primary text-white shadow-xs'
                        : 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80'
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. Mobile Horizontal Scrollable Filter Tabs */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            All (3)
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedFilter === 'pending'
                ? 'bg-orange-50 border border-orange-200 text-brand-hover'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Pending (1)
          </button>
          <button
            onClick={() => setSelectedFilter('dispatched')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedFilter === 'dispatched'
                ? 'bg-blue-50 border border-blue-200 text-blue-700'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Dispatched
          </button>
          <button
            onClick={() => setSelectedFilter('delivered')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedFilter === 'delivered'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Delivered
          </button>
        </div>

        {/* ======================================================== */}
        {/* 7. Main Grid Layout (Desktop: 8 cols + 4 cols) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================== */}
          {/* Left / Main Column: Active Order Card (lg:col-span-8) */}
          {/* ====================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Order Card: #LD-84920 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                      Order #LD-84920
                    </h2>
                    <button
                      onClick={() => handleCopyOrderId('#LD-84920')}
                      title="Copy Order ID"
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover font-bold text-[11px] inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                      <span>Pending Confirmation</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Placed on May 24, 2025 at 2:45 PM • LankaDirect Express Verification</span>
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={handlePrintSlip}
                  className="hidden sm:inline-flex h-9 px-3.5 rounded-xl text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <span>Download Invoice</span>
                </Button>
              </div>

              {/* ==================================================== */}
              {/* Order Fulfillment Progression Stepper Box */}
              {/* ==================================================== */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900">
                      Order Fulfillment Progression
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Current Stage: Our store team is verifying product stock prior to courier transfer.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200/80 text-[10px] font-bold text-slate-700 shadow-2xs shrink-0">
                    Step 2 of 5 Active
                  </span>
                </div>

                {/* 5-Step Stepper (Desktop Horizontal) */}
                <div className="hidden sm:grid grid-cols-5 gap-2 pt-2 relative">
                  {/* Step 1: Placed */}
                  <div className="text-center space-y-1.5 relative">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xs z-10 relative">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-900">Order Placed</p>
                      <span className="text-[10px] text-slate-400 block">May 24, 2:45 PM</span>
                    </div>
                  </div>

                  {/* Step 2: Confirmation (Active) */}
                  <div className="text-center space-y-1.5 relative">
                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto shadow-xs z-10 relative ring-4 ring-orange-100 animate-pulse">
                      <Hourglass className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="font-heading font-black text-xs text-brand-hover">
                        Pending Confirmation
                      </p>
                      <span className="text-[10px] font-bold text-brand-hover block">
                        Reviewing now
                      </span>
                    </div>
                  </div>

                  {/* Step 3: Processing */}
                  <div className="text-center space-y-1.5 relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto z-10 relative">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-400">Processing</p>
                      <span className="text-[10px] text-slate-400 block">Warehouse pack</span>
                    </div>
                  </div>

                  {/* Step 4: Dispatched */}
                  <div className="text-center space-y-1.5 relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto z-10 relative">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-400">Dispatched</p>
                      <span className="text-[10px] text-slate-400 block">3rd-party courier</span>
                    </div>
                  </div>

                  {/* Step 5: Delivered */}
                  <div className="text-center space-y-1.5 relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto z-10 relative">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-400">Delivered</p>
                      <span className="text-[10px] text-slate-400 block">To Doorstep</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Stepper (Image 2) */}
                <div className="sm:hidden space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-800">Current Step</span>
                    <span className="text-brand-hover font-bold text-[11px]">2 of 5 Steps</span>
                  </div>

                  <div className="flex items-center justify-between relative px-2 pt-1">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shadow-xs z-10">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 h-1 bg-brand-primary mx-1"></div>
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shadow-xs z-10 ring-2 ring-orange-200">
                      <Hourglass className="w-4 h-4" />
                    </div>
                    <div className="flex-1 h-1 bg-slate-200 mx-1"></div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs z-10">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 h-1 bg-slate-200 mx-1"></div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs z-10">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 h-1 bg-slate-200 mx-1"></div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs z-10">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-1 px-1">
                    <span className="text-slate-900">Placed</span>
                    <span className="text-brand-hover">Confirming</span>
                    <span className="text-slate-400">Process</span>
                    <span className="text-slate-400">Dispatch</span>
                    <span className="text-slate-400">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Courier Handover Protocol Notice Callout */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 flex items-start gap-3 text-xs text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="leading-relaxed">
                  <span className="font-heading font-bold text-slate-900">
                    Courier Handover Protocol:{' '}
                  </span>
                  <span>
                    Courier Partner: Handed over to third-party courier upon confirmation. Tracking
                    reference will be sent via SMS directly to your phone.
                  </span>
                </div>
              </div>

              {/* ==================================================== */}
              {/* Purchased Items List (2 Items) */}
              {/* ==================================================== */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Purchased Items (2 items)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Inspected &amp; Guaranteed Authentic
                  </span>
                </div>

                {/* Item 1: Singer Kettle */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                      <Image
                        src="/images/product-kettle.jpg"
                        alt="Singer Kettle"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 text-[10px] font-bold">
                        Appliances
                      </span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                        Singer 1.8L Stainless Steel Cordless Electric Kettle
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        SKU: SIN-KT-1800 • 1 Year Warranty Included
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 block font-medium">Qty: 1</span>
                    <span className="font-heading font-black text-sm sm:text-base text-slate-900 sm:text-slate-900 text-brand-hover">
                      Rs. 4,950
                    </span>
                  </div>
                </div>

                {/* Item 2: Dilmah Ceylon Tea */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                      <Image
                        src="/images/product-tea.jpg"
                        alt="Dilmah Ceylon Tea"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 text-[10px] font-bold">
                        Ceylon Tea &amp; Spices
                      </span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                        Dilmah Single Estate Ceylon Black Tea 500g Tin
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        SKU: DLM-TEA-500 • Harvest Sealed Fresh
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 block font-medium">Qty: 1</span>
                    <span className="font-heading font-black text-sm sm:text-base text-slate-900 sm:text-slate-900 text-brand-hover">
                      Rs. 2,150
                    </span>
                  </div>
                </div>
              </div>

              {/* ==================================================== */}
              {/* Bottom 2-Column Info Grid: Delivery + Payment */}
              {/* ==================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Left Card: Doorstep Delivery Address */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                    <span>Doorstep Delivery Address</span>
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-slate-900 text-sm">
                        Dinuka Fernando
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[10px] font-bold">
                        Primary Address
                      </span>
                    </div>
                    <p>{customerAddress}</p>
                    <p className="font-mono text-[11px] text-slate-400">Postal Code: 00300</p>
                    <p className="flex items-center gap-1.5 pt-1 text-slate-900 font-bold">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{customerPhone}</span>
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Address verified for Pronto &amp; Domex Colombo delivery routes.</span>
                  </div>
                </div>

                {/* Right Card: Payment Summary */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm">
                    <Banknote className="w-4 h-4 text-brand-primary" />
                    <span>Payment Summary</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-slate-900">Rs. 7,100</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Islandwide Courier Fee</span>
                      <span className="font-semibold text-slate-900">Rs. 450</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="font-heading font-bold text-sm text-slate-900">
                        Total Payable
                      </span>
                      <span className="font-heading font-black text-xl text-brand-hover">
                        Rs. 7,550
                      </span>
                    </div>
                  </div>

                  {/* COD Alert Box */}
                  <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 text-xs text-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-heading font-bold text-brand-hover text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Payment Method: Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Payment NOT yet collected. Please pay Rs. 7,550 directly to the courier agent
                      upon parcel delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Card Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/account"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center transition-colors"
                >
                  ← Back to All Orders
                </Link>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowHelpModal(true)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 hover:border-brand-primary hover:text-brand-primary text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contact Store Support</span>
                  </button>

                  <Button
                    onClick={handlePrintSlip}
                    className="flex-1 sm:flex-initial h-10 px-5 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Order Slip</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Download Receipt Action */}
            <div className="sm:hidden space-y-2.5">
              <Button
                onClick={handlePrintSlip}
                className="w-full h-11 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </Button>

              <button
                onClick={() => setShowHelpModal(true)}
                className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-slate-600" />
                <span>Need Help with Order?</span>
              </button>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Past Completed Orders & Support (lg:col-span-4) */}
          {/* ====================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* Past Completed Orders Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Past Completed Orders
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold">2 previous</span>
              </div>

              <div className="space-y-3">
                {/* Past Order 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-900">
                      #LD-82104
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ● Delivered
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Placed on April 12, 2025 • Handled via Domex
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 text-[11px]">Paid via Bank Transfer</span>
                    <span className="font-heading font-black text-slate-900">Rs. 4,200</span>
                  </div>
                </div>

                {/* Past Order 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-900">
                      #LD-79811
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ● Delivered
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Placed on March 02, 2025 • Handled via Pronto
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 text-[11px]">Paid Cash on Delivery (COD)</span>
                    <span className="font-heading font-black text-slate-900">Rs. 3,400</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-9 rounded-xl text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                View All Historical Invoices
              </Button>
            </div>

            {/* Buyer Protection Trust Card (Stitch Artboard) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-900">
                    Buyer Protection
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    Sri Lanka Department of Commerce verified
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>7-day hassle-free replacement on damaged household electronics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Pay safely at your doorstep with physical inspection before cash handover.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Dedicated bilingual hotline: +94 11 234 5678 (Mon–Sat, 8am–8pm).
                  </span>
                </li>
              </ul>
            </div>

            {/* Need Changes Card (Artboard) */}
            <div className="rounded-3xl border border-orange-200/80 bg-orange-50/50 p-5 shadow-xs flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-[10px] uppercase tracking-wider text-brand-hover block">
                  NEED CHANGES?
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  Wrong phone or address on order #LD-84920?
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowUpdateModal(true)}
                className="h-8 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border-slate-200 shrink-0"
              >
                Update Details
              </Button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 8. Mobile Past Orders Section (Image 2) */}
        {/* ======================================================== */}
        <div className="sm:hidden mt-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-base text-slate-900">Past Orders</h3>
            <Link
              href="/orders"
              className="text-xs font-bold text-brand-hover hover:underline"
            >
              View History
            </Link>
          </div>

          {/* Past Order Card #LD-82104 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-black text-sm text-slate-900">#LD-82104</h4>
                <span className="text-[11px] text-slate-400">Apr 12, 2025</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                ● Delivered
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <Image
                    src="/images/product-balm.jpg"
                    alt="Past product"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">1 Item</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Total Paid</span>
                <span className="font-heading font-black text-sm text-slate-900">Rs. 4,200</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                onClick={() => handlePrintSlip()}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Details</span>
              </button>

              <button
                onClick={() => router.push('/catalog')}
                className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-brand-hover font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand-primary" />
                <span>Reorder</span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 9. Modal: Update Order Details */}
      {/* ======================================================== */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Update Order Details
                </h3>
                <span className="text-xs text-slate-400 font-mono">Order: #LD-84920</span>
              </div>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Mobile Number</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Doorstep Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Courier Driver Special Notes</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Call before coming"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl mt-2">
                Save &amp; Notify Dispatch Team
              </Button>

              {updateFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                  ✔ {updateFeedback}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 10. Modal: Order Help Desk */}
      {/* ======================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Order Help Desk
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed">
                Need urgent assistance with order <strong>#LD-84920</strong>? Our bilingual support
                representatives are ready to help.
              </p>

              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100 space-y-1.5">
                <span className="font-bold text-brand-hover block">Hotline Priority Queue:</span>
                <a
                  href="tel:+94112345678"
                  className="text-sm font-heading font-black text-slate-900 hover:text-brand-primary block"
                >
                  +94 11 234 5678
                </a>
                <span className="text-[11px] text-slate-500 block">
                  Available Mon - Sat (8:30 AM - 8:00 PM)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="font-bold text-slate-800 block">Courier Inquiries:</span>
                <p className="text-[11px] text-slate-600">
                  Domex Islandwide Customer Support Hotline: <strong>011 7 704 704</strong>
                </p>
              </div>

              <Button
                onClick={() => setShowHelpModal(false)}
                className="w-full h-11 text-xs font-bold rounded-xl mt-2"
              >
                Close Desk
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Order ID #LD-84920 copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
