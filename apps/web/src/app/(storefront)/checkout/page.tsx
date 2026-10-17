'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Banknote,
  Building,
  HelpCircle,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

// Sri Lankan Provinces and their respective Districts
const SRI_LANKA_REGIONS: Record<string, string[]> = {
  'Western Province': ['Colombo', 'Gampaha', 'Kalutara'],
  'Central Province': ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Southern Province': ['Galle', 'Matara', 'Hambantota'],
  'North Western Province': ['Kurunegala', 'Puttalam'],
  'Sabaragamuwa Province': ['Ratnapura', 'Kegalle'],
  'North Central Province': ['Anuradhapura', 'Polonnaruwa'],
  'Uva Province': ['Badulla', 'Monaragala'],
  'Northern Province': ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  'Eastern Province': ['Trincomalee', 'Batticaloa', 'Ampara'],
};

export default function CheckoutPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('kamal.perera@gmail.com');
  const [fullName, setFullName] = useState('Kamal Perera');
  const [phone, setPhone] = useState('77 123 4567');
  const [streetAddress, setStreetAddress] = useState('No. 42/B, Galle Road, Apartment 4-C');
  const [province, setProvince] = useState('Western Province');
  const [district, setDistrict] = useState('Colombo');
  const [city, setCity] = useState('Colombo 03 / Kollupitiya');
  const [postalCode, setPostalCode] = useState('00300');
  const [deliveryNote, setDeliveryNote] = useState(
    'Near Kollupitiya junction, call before arrival, deliver to security post if unavailable.'
  );

  // Payment method: 'COD' | 'CARD' | 'BANK'
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'BANK'>('COD');
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscountCents, setPromoDiscountCents] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Mobile accordion toggle
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static cart items matching Stitch Artboard
  const cartItems = [
    {
      id: 'item-kettle',
      title: 'Singer 1.8L Stainless Steel Kettle',
      mobileTitle: 'Singer 1.8L Cordless Kettle',
      modelSubtitle: 'Model: EK-180 • 1 Year Warranty',
      mobileSubtitle: 'Qty: 1 • Model EK-18',
      priceCents: 495000,
      quantity: 1,
      image: '/images/product-kettle.jpg',
    },
    {
      id: 'item-tea',
      title: 'Dilmah Ceylon Black Tea 500g',
      mobileTitle: 'Dilmah Ceylon Premium...',
      modelSubtitle: 'Single Origin • Fresh Harvest Foil Pack',
      mobileSubtitle: 'Qty: 1 • 400g Tin',
      priceCents: 215000,
      quantity: 1,
      image: '/images/product-tea.jpg',
    },
  ];

  // Calculate delivery fee based on district
  const courierFeeCents = useMemo(() => {
    if (district === 'Colombo') return 45000; // Rs. 450
    if (district === 'Gampaha' || district === 'Kalutara') return 45000; // Rs. 450
    return 65000; // Rs. 650 Outstation standard
  }, [district]);

  // Totals
  const subtotalCents = 710000; // Rs. 7,100
  const deliveryDiscountCents = promoApplied ? courierFeeCents : 0;
  const totalPayableCents = subtotalCents + courierFeeCents - deliveryDiscountCents - promoDiscountCents;

  const formatPrice = (cents: number) => `Rs. ${(cents / 100).toLocaleString()}`;

  // Handle Province change -> auto-select first district of that province
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProv = e.target.value;
    setProvince(newProv);
    const districts = SRI_LANKA_REGIONS[newProv] || [];
    if (districts.length > 0) {
      setDistrict(districts[0]);
    }
  };

  // Promo code apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FREESHIP' || clean === 'LANKA2024') {
      setPromoApplied(true);
      setPromoMessage('Free Shipping promotion applied!');
    } else if (clean === 'LANKA10') {
      setPromoDiscountCents(71000); // 10% off subtotal
      setPromoApplied(true);
      setPromoMessage('10% discount applied!');
    } else {
      setPromoMessage('Invalid voucher code');
    }
  };

  // Place Order handler
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert('Please agree to the Store Policies and Terms of Purchase to proceed.');
      return;
    }

    setIsSubmitting(true);
    // Simulate order placement and redirect
    setTimeout(() => {
      const orderId = 'LD-' + Math.floor(10000 + Math.random() * 90000);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-28 sm:pb-20 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Desktop & Mobile Step / Progress Header */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <Container>
          <div className="flex items-center justify-between">
            {/* Step indicators */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Cart</span>
              </Link>

              <span className="text-slate-300">›</span>

              <div className="flex items-center gap-1.5 text-brand-primary font-bold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/80">
                <Truck className="w-3.5 h-3.5 text-brand-primary" />
                <span>2. Delivery &amp; Details</span>
              </div>

              <span className="text-slate-300 hidden sm:inline">›</span>

              <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
                <CreditCard className="w-3.5 h-3.5" />
                <span>3. Payment Finalization</span>
              </div>
            </div>

            {/* Right-aligned SSL security note */}
            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-xs font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure 256-Bit SSL Encryption</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Flash Banner (Stitch Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-[#FFF7ED] border-b border-orange-200/70 px-4 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-brand-hover">
        <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
        <span>Guest Checkout Active • 1-Minute Order</span>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      </div>

      <Container className="pt-4 sm:pt-6">
        {/* ======================================================== */}
        {/* 3. Page Header: Title + Guest Checkout Box */}
        {/* ======================================================== */}
        <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
              SAFE DOORSTEP COURIER ORDER
            </span>
            <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
              Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-bold text-emerald-900 block">
                Guest Checkout Enabled
              </span>
              <span className="text-slate-600 text-[11px]">
                No account required to order. Courier reaches you directly.
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Main 2-Column Grid: Form (Left) vs Order Summary (Right) */}
        {/* ======================================================== */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Form Steps (lg:col-span-7 or 8) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    1
                  </div>
                  <h2 className="font-heading font-black text-base sm:text-lg text-slate-900">
                    Contact Information
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">Step 1 of 3</span>
              </div>

              {/* Mobile View: Full Name first */}
              <div className="sm:hidden space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Kasun Perera"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Mobile Phone Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Sri Lankan Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-emerald-600 font-semibold hidden sm:inline">
                    SMS Tracking enabled
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-100/70 flex items-center gap-1.5 text-xs font-bold text-slate-800 shrink-0">
                    <span>🇱🇰</span>
                    <span>+94</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="77 123 4567"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Used by third-party courier for delivery coordination &amp; SMS notifications.</span>
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">For order &amp; invoice tracking</span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. kamal.perera@gmail.com"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address (Sri Lanka) */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    2
                  </div>
                  <h2 className="font-heading font-black text-base sm:text-lg text-slate-900">
                    Delivery Address (Sri Lanka)
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Doorstep Delivery
                </span>
              </div>

              {/* Recipient Full Name (Desktop) */}
              <div className="hidden sm:block space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Recipient Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kamal Perera"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Street Address / Apartment / House No */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Street Address / Apartment / House No <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="No. 42/B, Galle Road, Apartment 4-C"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Province & District (2 Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={province}
                      onChange={handleProvinceChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none appearance-none cursor-pointer"
                    >
                      {Object.keys(SRI_LANKA_REGIONS).map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    District <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none appearance-none cursor-pointer"
                    >
                      {(SRI_LANKA_REGIONS[province] || []).map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* City / Town & Postal Code (2 Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    City / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Colombo 03 / Kollupitiya"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="00300"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Courier Delivery Instructions */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Courier Delivery Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Driver guidance</span>
                </div>
                <textarea
                  rows={2}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Near Kollupitiya junction, call before arrival, deliver to security post if unavailable."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Mobile Courier Fulfillment Callout Card */}
              <div className="sm:hidden mt-2 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-900">
                    Courier Fulfillment
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    Dispatched via Prompt Xpress or Certis Lanka. The delivery driver will phone you directly prior to arrival at your doorstep.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile View: Collapsible Order Summary Accordion Section 3 */}
            <div className="sm:hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
              <button
                type="button"
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    3
                  </div>
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Order Summary (2 items)
                  </h3>
                </div>
                <div className="text-slate-400">
                  {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {mobileSummaryOpen && (
                <div className="pt-2 space-y-3 border-t border-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-slate-900 truncate">
                            {item.mobileTitle}
                          </p>
                          <span className="text-[10px] text-slate-400 block">{item.mobileSubtitle}</span>
                        </div>
                      </div>
                      <span className="font-heading font-bold text-slate-900 shrink-0">
                        {formatPrice(item.priceCents)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-slate-900">{formatPrice(subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="flex items-center gap-1">
                        Courier Delivery (Colombo 01-15) <Info className="w-3 h-3 text-slate-400" />
                      </span>
                      <span className="font-bold text-slate-900">{formatPrice(courierFeeCents)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Promotional Discount</span>
                        <span>-{formatPrice(deliveryDiscountCents + promoDiscountCents)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-100">
                      <span>Total Payable</span>
                      <span className="text-brand-hover">{formatPrice(totalPayableCents)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 (or 4 on Mobile): Payment Method */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    <span className="sm:inline hidden">3</span>
                    <span className="sm:hidden">4</span>
                  </div>
                  <h2 className="font-heading font-black text-base sm:text-lg text-slate-900">
                    Payment Method
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safe &amp; Verified</span>
                </span>
              </div>

              {/* Payment Options List */}
              <div className="space-y-3">
                {/* Option 1: Cash on Delivery (COD) */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`block rounded-2xl border p-4 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-brand-primary bg-orange-50/30 ring-1 ring-brand-primary/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'COD'}
                        readOnly
                        className="w-4 h-4 mt-0.5 text-brand-primary accent-brand-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                            Cash on Delivery (COD)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                            POPULAR
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Pay with cash directly to the courier upon parcel handover. Verified Sri Lankan delivery.
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Inspect outer package condition before courier sign-off</span>
                        </div>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  </div>
                </label>

                {/* Option 2: Online Card Payment */}
                <label
                  onClick={() => setPaymentMethod('CARD')}
                  className={`block rounded-2xl border p-4 cursor-pointer transition-all ${
                    paymentMethod === 'CARD'
                      ? 'border-brand-primary bg-orange-50/30 ring-1 ring-brand-primary/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'CARD'}
                        readOnly
                        className="w-4 h-4 mt-0.5 text-brand-primary accent-brand-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                            Online Card Payment (Visa / Mastercard)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Credit or Debit card payment via regional payment gateway (Coming Soon / Future integration placeholder).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
                        VISA
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
                        MC
                      </span>
                    </div>
                  </div>
                </label>

                {/* Option 3: Direct Bank Deposit */}
                <label
                  onClick={() => setPaymentMethod('BANK')}
                  className={`block rounded-2xl border p-4 cursor-pointer transition-all ${
                    paymentMethod === 'BANK'
                      ? 'border-brand-primary bg-orange-50/30 ring-1 ring-brand-primary/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'BANK'}
                        readOnly
                        className="w-4 h-4 mt-0.5 text-brand-primary accent-brand-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                            Direct Bank Deposit
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Transfer to Commercial Bank / HNB account and notify admin via WhatsApp with payment slip.
                        </p>
                      </div>
                    </div>
                    <Building className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  </div>
                </label>
              </div>

              {/* Courier Notice Box */}
              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                <Truck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong className="text-slate-900 font-bold">Notice:</strong> Shipping is performed by external third-party courier partners across all 25 districts. Courier tracking code provided via SMS immediately upon parcel dispatch.
                </p>
              </div>
            </div>

            {/* Agreement Checkbox & Desktop Submit Button */}
            <div className="hidden sm:block space-y-4 pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-primary accent-brand-primary"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/faq" className="text-brand-primary font-bold underline">
                    Store Policies
                  </Link>{' '}
                  and{' '}
                  <Link href="/faq" className="text-brand-primary font-bold underline">
                    Terms of Purchase
                  </Link>
                  , confirming that my delivery address and contact details are accurate.
                </span>
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order ({formatPrice(totalPayableCents)})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Islandwide Coverage</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Hidden Surcharges</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </span>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Order Summary Card (Desktop) */}
          {/* ====================================================== */}
          <div className="hidden lg:block lg:col-span-5 space-y-4 sticky top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="font-heading font-black text-lg text-slate-900">
                  Order Summary
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                  2 Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                        <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-slate-900/80 text-white text-[9px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-slate-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {item.modelSubtitle}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm text-slate-900 shrink-0">
                      {formatPrice(item.priceCents)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo / Voucher Code */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO / VOUCHER CODE"
                    className="flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-xs font-mono uppercase font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-primary focus:outline-none"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyPromo}
                    size="sm"
                    className="h-9 px-4 rounded-lg bg-[#1E293B] hover:bg-slate-900 text-white font-bold text-xs"
                  >
                    Apply
                  </Button>
                </div>
                {promoMessage && (
                  <span
                    className={`text-[10px] font-semibold block mt-1 ${
                      promoApplied ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {promoMessage}
                  </span>
                )}
              </div>

              {/* Cost Calculation */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotalCents)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Standard Courier Delivery ({district} District)</span>
                  <span className="font-bold text-slate-900">{formatPrice(courierFeeCents)}</span>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Promotional Delivery Discount</span>
                    </span>
                    <span>-{formatPrice(deliveryDiscountCents + promoDiscountCents)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="font-heading font-black text-sm text-slate-900 block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Inclusive of all local courier charges
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-black text-2xl text-brand-hover block leading-tight">
                      {formatPrice(totalPayableCents)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">LKR</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Row */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Genuine Product</span>
                    <span className="text-[10px] text-slate-400">100% Guaranteed</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700">
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Colombo Support</span>
                    <span className="text-[10px] text-slate-400">011 234 5678</span>
                  </div>
                </div>
              </div>

              {/* Verified Courier Delivery Network Strip */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Verified Courier Delivery Network:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Domex Courier', 'Pronto Lanka', 'Certis Courier', 'Koombiyo'].map((courier) => (
                    <span
                      key={courier}
                      className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold"
                    >
                      {courier}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp Assistance Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-[11px]">
                    Need help placing order?
                  </span>
                  <span className="text-[10px] text-slate-500">
                    WhatsApp assistance available 8:30 AM - 6:30 PM
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:border-brand-primary hover:text-brand-primary font-bold text-xs shrink-0 transition-colors"
              >
                Chat Now
              </a>
            </div>
          </div>
        </form>
      </Container>

      {/* ======================================================== */}
      {/* 5. Mobile Sticky Bottom Checkout Bar (Stitch Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Total Amount Due
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-black text-xl text-slate-900">
                {formatPrice(totalPayableCents)}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                {paymentMethod}
              </span>
            </div>
          </div>

          <div className="text-right text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>Est. Delivery: 24-48h</span>
          </div>
        </div>

        <Button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="w-full h-11 text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>Place Order</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <p className="text-[9px] text-center text-slate-400">
          By placing order, you agree to LankaDirect&apos;s{' '}
          <Link href="/faq" className="underline text-slate-600">
            Terms of Service
          </Link>{' '}
          &amp;{' '}
          <Link href="/faq" className="underline text-slate-600">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
