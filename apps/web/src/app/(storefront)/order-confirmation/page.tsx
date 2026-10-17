'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Truck,
  Phone,
  Printer,
  Download,
  Mail,
  Copy,
  Check,
  CreditCard,
  MapPin,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Info,
  AlertCircle,
  Headphones,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '#LD-84920';
  const customerName = searchParams.get('name') || 'Dinuka';
  const fullName = searchParams.get('fullName') || 'Dinuka Fernando';
  const phone = searchParams.get('phone') || '+94 77 123 4567';
  const address = searchParams.get('address') || 'No. 42, Galle Road, Colombo 03';
  const province = searchParams.get('province') || 'Western Province, Sri Lanka';

  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId.replace('#', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const purchasedItems = [
    {
      id: 'kettle-1',
      title: 'Singer 1.8L Stainless Steel Cordless Electric Kettle',
      mobileTitle: 'Singer 1.8L Stainles...',
      sku: 'SKU: SIN-KT-1800',
      quantity: 1,
      priceCents: 495000,
      image: '/images/product-kettle.jpg',
    },
    {
      id: 'tea-1',
      title: 'Dilmah Single Estate Ceylon Black Tea 500g Tin',
      mobileTitle: 'Dilmah Ceylon Tea 5...',
      sku: 'SKU: DLM-TEA-500',
      quantity: 1,
      priceCents: 215000,
      image: '/images/product-tea.jpg',
    },
  ];

  const subtotalCents = 710000;
  const courierFeeCents = 45000;
  const totalPayableCents = 755000;

  const formatPrice = (cents: number) => `Rs. ${(cents / 100).toLocaleString()}`;

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-20 text-slate-900 font-sans">
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
            <span className="font-semibold text-slate-900">Order Confirmation</span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Header Bar & Status */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-700 p-1 -ml-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading font-black text-sm text-slate-900 leading-tight">
              LankaDirect
            </h1>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              Order Confirmation
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
          <span>Pending Confirmation</span>
        </span>
      </div>

      <Container className="pt-4 sm:pt-8">
        <div className="space-y-6">
          {/* ======================================================== */}
          {/* 3. Top Hero Card (Desktop Artboard) */}
          {/* ======================================================== */}
          <div className="hidden sm:block rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                      Thank you for your order, {customerName}!
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-xs font-bold border border-orange-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                      <span>Status: Pending Confirmation</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your order <strong className="text-slate-900 font-bold">{orderId}</strong> has been received and is pending confirmation.
                  </p>
                </div>
              </div>

              {/* Print Receipt button */}
              <Button
                variant="outline"
                onClick={handlePrint}
                className="hidden md:flex items-center gap-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs h-10 px-4 rounded-xl shadow-xs"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Receipt</span>
              </Button>
            </div>

            {/* Fulfillment Notice Container */}
            <div className="p-4 rounded-2xl bg-[#FFF7ED]/70 border border-orange-200/70 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  Fulfillment Notice
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Our store team will verify your items and hand them over to our third-party courier partner for doorstep delivery across Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 4. Mobile Top Success Card (Mobile Artboard) */}
          {/* ======================================================== */}
          <div className="sm:hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs space-y-3.5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-xl text-slate-900">
                Order Placed Successfully!
              </h2>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Order Reference</span>
                <button
                  onClick={handleCopyOrderId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs transition-colors"
                  title="Copy Order ID"
                >
                  <span>{orderId}</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-brand-hover text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              <span>Pending Confirmation</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              We will prepare your package and hand it to our third-party courier service.
            </p>
          </div>

          {/* ======================================================== */}
          {/* 5. Mobile Payment Mode Card (Mobile Artboard) */}
          {/* ======================================================== */}
          <div className="sm:hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Payment Mode
                  </span>
                  <span className="font-heading font-bold text-xs text-slate-900 block">
                    Cash on Delivery
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Pay on Delivery
              </span>
            </div>

            <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100 text-[11px] text-slate-700 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
              <span>
                Amount due upon parcel delivery: <strong>{formatPrice(totalPayableCents)}</strong>. No online payment was charged.
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 6. Main Content 2-Column Grid (Desktop & Mobile) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ====================================================== */}
            {/* Left Column: Order Reference, Items & Progress */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card 1: Order Reference & Payment Method (Desktop Artboard) */}
              <div className="hidden sm:block rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Order Reference
                    </span>
                    <span className="font-heading font-black text-xl text-brand-primary">
                      {orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Placed Date
                    </span>
                    <span className="font-heading font-bold text-sm text-slate-900">
                      May 24, 2025
                    </span>
                  </div>
                </div>

                {/* Payment Method Details Box */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                      PAYMENT METHOD
                    </span>
                    <span className="inline-flex items-center gap-1 font-heading font-bold text-xs text-brand-hover">
                      <span>💵</span>
                      <span>Cash on Delivery (COD)</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-2 pt-1">
                    <AlertCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span>
                      Please prepare exact amount of <strong className="text-slate-900">{formatPrice(totalPayableCents)}</strong> in cash for the courier agent upon arrival. Payment has <strong className="text-red-600 font-bold">NOT YET</strong> been collected.
                    </span>
                  </p>
                </div>
              </div>

              {/* Card 2: Purchased Items (2) (Desktop & Mobile) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-heading font-black text-sm sm:text-base text-slate-900">
                    Purchased Items ({purchasedItems.length})
                  </h3>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-400">
                    Direct Retail Inventory
                  </span>
                  <span className="sm:hidden inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Confirmed</span>
                  </span>
                </div>

                {/* Items list */}
                <div className="divide-y divide-slate-100">
                  {purchasedItems.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                            <span className="hidden sm:inline">{item.title}</span>
                            <span className="sm:hidden">{item.mobileTitle}</span>
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                              {item.sku}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-heading font-bold text-sm sm:text-base text-slate-900 block">
                          {formatPrice(item.priceCents)}
                        </span>
                        <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">
                          {formatPrice(item.priceCents)} each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Sub-table */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">{formatPrice(subtotalCents)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>Island-wide Courier Standard</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </span>
                    <span className="font-bold text-slate-900">{formatPrice(courierFeeCents)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="font-heading font-black text-sm sm:text-base text-slate-900 block">
                        Total Payable
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Includes all local taxes &amp; packaging
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-xl sm:text-2xl text-brand-hover">
                        {formatPrice(totalPayableCents)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold block sm:inline sm:ml-1">
                        Pay via COD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Order Progress Bar / Stepper (Desktop Artboard) */}
              <div className="hidden sm:block rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="font-heading font-black text-base text-slate-900">
                  Order Progress
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  {/* Step 1 */}
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-full bg-brand-primary text-white font-heading font-bold text-sm flex items-center justify-center mx-auto shadow-xs">
                      1
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-slate-900 block">
                        Order Placed
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold block">
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-full bg-orange-100 text-brand-hover font-heading font-bold text-sm flex items-center justify-center mx-auto border-2 border-brand-primary">
                      2
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-slate-900 block">
                        Verification
                      </span>
                      <span className="text-[11px] text-brand-primary font-bold block">
                        In Progress
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 font-heading font-bold text-sm flex items-center justify-center mx-auto">
                      3
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-slate-400 block">
                        Courier Handover
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* Right Column: Destination, Fulfillment & Help */}
            {/* ====================================================== */}
            <div className="lg:col-span-5 space-y-5">
              {/* Card 1: Shipping Destination (Desktop & Mobile) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                    <h3 className="font-heading font-black text-sm sm:text-base text-slate-900">
                      Shipping Destination
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                    Doorstep Delivery
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <strong className="font-heading font-bold text-sm text-slate-900">
                      {fullName}
                    </strong>
                    <span className="sm:hidden px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                      Home
                    </span>
                  </div>
                  <p className="text-slate-600 leading-snug">{address}</p>
                  <p className="text-slate-600">{province}</p>
                  <p className="text-slate-800 font-semibold pt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{phone}</span>
                  </p>
                </div>

                {/* Mobile Call Note */}
                <div className="sm:hidden p-2.5 rounded-xl bg-orange-50/80 border border-orange-100 flex items-center gap-2 text-[11px] text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>Courier will call before arrival.</span>
                </div>
              </div>

              {/* Card 2: Courier Fulfillment Details (Desktop) */}
              <div className="hidden sm:block rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Courier Fulfillment Details
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Your parcel will be handed over to a third-party courier service. The delivery agent will contact you on your mobile number prior to final delivery.
                </p>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estimated Transit: 2–4 Business Days</span>
                  </div>
                  <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                    Delivery schedules depend on regional courier runs in Western Province. You will receive an SMS alert once the parcel is dispatched from our Colombo fulfillment hub.
                  </p>
                </div>
              </div>

              {/* Card 3: Customer Help & Inquiries (Desktop) */}
              <div className="hidden sm:block rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Customer Help &amp; Inquiries
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Have a question about your order? Reach our customer care with your Order ID{' '}
                  <strong className="text-slate-900 font-bold">{orderId}</strong>.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="tel:+94112345678"
                    className="h-10 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60 text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>011 234 5678</span>
                  </a>

                  <a
                    href="mailto:support@lankadirect.lk"
                    className="h-10 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60 text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Support</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons (Desktop & Mobile) */}
              <div className="space-y-3 pt-2">
                <Link href="/" className="block">
                  <Button className="w-full h-12 text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Button>
                </Link>

                <div className="hidden sm:grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="h-10 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Receipt</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="h-10 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download Invoice</span>
                  </Button>
                </div>

                <Link
                  href="/account"
                  className="sm:hidden block w-full py-2.5 text-center text-xs font-bold text-slate-700 border border-slate-200 rounded-xl bg-white shadow-xs"
                >
                  📄 View Order Details
                </Link>

                <div className="hidden sm:block text-center pt-1">
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors"
                  >
                    <span>View Order Details in My Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Mobile Trust Strip */}
              <div className="sm:hidden flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-3">
                <span className="flex items-center gap-1 text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Buyer Protected</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Islandwide Dispatch</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-slate-400 text-xs">
          Loading order confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
