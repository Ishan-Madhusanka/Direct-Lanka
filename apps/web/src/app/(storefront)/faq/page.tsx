'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  RotateCcw,
  Headphones,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  Lock,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  Send,
  Scale,
  Sparkles,
  Layers,
  Phone,
  Mail,
  X,
  Package,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function FAQPage() {
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // Active Category filter
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'orders' | 'payment' | 'delivery' | 'returns'
  >('all');
  // Active Policy Tab (Desktop)
  const [activePolicy, setActivePolicy] = useState<
    'shipping' | 'returns' | 'privacy' | 'terms'
  >('shipping');
  // Accordion state for FAQs (open indices)
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]); // First FAQ open by default
  // Accordion state for Mobile Policies
  const [openMobilePolicies, setOpenMobilePolicies] = useState<string[]>(['shipping']);

  // FAQ Items Data
  const faqs = [
    {
      id: 0,
      question: 'How do I place an order?',
      category: 'orders',
      icon: ShoppingBag,
      answer:
        'Simply browse our catalog or search for your required essentials. Add items to your cart, proceed to checkout, provide your doorstep delivery address and phone number, and select Cash on Delivery or Card payment. No advance account creation is required.',
    },
    {
      id: 1,
      question: 'Can I order without creating an account?',
      category: 'orders',
      icon: Lock,
      answer:
        'Yes, absolutely! LankaDirect fully supports guest checkout. You only need to supply your contact number and doorstep delivery address in Sri Lanka so our courier partners can deliver your items.',
    },
    {
      id: 2,
      question: 'How do I pay for my order?',
      category: 'payment',
      icon: CreditCard,
      answer:
        'We support Cash on Delivery (COD) islandwide across all 25 districts, as well as Visa, MasterCard, and secure online bank transfer verification. For COD, you inspect the parcel and pay directly to the delivery courier.',
    },
    {
      id: 3,
      question: 'How are products delivered?',
      category: 'delivery',
      icon: Truck,
      answer:
        'Orders are dispatched directly from our central fulfillment operations hub in Colombo via trusted third-party courier services including Domex, Pronto Lanka, Certis Lanka, and Prompt Xpress. Delivery takes 1–2 business days for Colombo/Western Province and 2–3 business days islandwide.',
    },
    {
      id: 4,
      question: 'How can I check my order status?',
      category: 'orders',
      icon: RotateCcw,
      answer:
        'You can track your order at any time using our My Orders page by entering your order reference (e.g. #LD-84920). You will also receive SMS updates directly to your registered mobile number upon dispatch with the courier tracking number.',
    },
    {
      id: 5,
      question: 'How can I contact customer support?',
      category: 'returns',
      icon: Headphones,
      answer:
        'Our Colombo support desk is available Monday to Saturday (8:30 AM – 6:30 PM) via phone at +94 11 234 5678, email at support@lankadirect.lk, or via our online Contact Us inquiry form. We assist in Sinhala, Tamil, and English.',
    },
    {
      id: 6,
      question: 'What should I do if I receive an incorrect or damaged product?',
      category: 'returns',
      icon: AlertTriangle,
      answer:
        'We offer a 7-day hassle-free inspection and replacement guarantee on all damaged or defective items. Please contact our support team within 48 hours of courier delivery with your order ID and a photo of the item, and we will arrange a direct replacement or refund.',
    },
  ];

  // Filtered FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: number) => {
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenFaqs(faqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenFaqs([]);
  };

  const toggleMobilePolicy = (key: string) => {
    setOpenMobilePolicies((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
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
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">
              Help Center &amp; Store Policies
            </span>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Top Bar (Stitch Artboard) */}
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

      <Container className="pt-4 sm:pt-8 max-w-7xl">
        {/* ======================================================== */}
        {/* 3. Hero Header & Search Section (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-xs font-bold mb-2">
                <Headphones className="w-3.5 h-3.5 text-brand-primary" />
                <span className="hidden sm:inline">
                  Customer Guidance &amp; Service Standards
                </span>
                <span className="sm:hidden">LANKADIRECT SUPPORT</span>
              </span>

              <h1 className="text-2xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Help Center &amp; Store Policies</span>
                <span className="sm:hidden w-7 h-7 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center text-xs">
                  <Headphones className="w-4 h-4" />
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Find quick answers to common questions about shopping, payments, courier
                deliveries, and customer policies at LankaDirect.
              </p>
            </div>

            {/* Desktop 25 Districts Badge */}
            <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-heading font-bold text-emerald-800 block">
                  25 Districts Covered
                </span>
                <span className="text-[11px] text-slate-500">
                  Standard third-party parcel dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g., payment, courier, returns)..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Multi-Language Support Desk Card */}
        <div className="sm:hidden mb-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <Image
              src="/images/support-agent.jpg"
              alt="Support Specialist"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Island-Wide Care Desk</span>
            </span>
            <h4 className="font-heading font-bold text-xs text-slate-900 mt-0.5">
              We speak Sinhala, Tamil &amp; English
            </h4>
            <p className="text-[10px] text-slate-500">Daily 8:00 AM – 9:00 PM (IST)</p>
          </div>
        </div>

        {/* Mobile 3 Quick Metric Badges Grid */}
        <div className="sm:hidden grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-0.5">
            <div className="w-6 h-6 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center mx-auto">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <p className="font-heading font-black text-xs text-slate-900 pt-1">25 Districts</p>
            <span className="text-[9px] text-slate-500 block">Doorstep COD</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-0.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <p className="font-heading font-black text-xs text-slate-900 pt-1">7 Days</p>
            <span className="text-[9px] text-slate-500 block">Hassle-free return</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-0.5">
            <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <p className="font-heading font-black text-xs text-slate-900 pt-1">1–3 Days</p>
            <span className="text-[9px] text-slate-500 block">Colombo Express</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Quick Navigation: Explore by Category (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-brand-hover">
                QUICK NAVIGATION
              </span>
              <h2 className="hidden sm:block text-xl font-heading font-black text-slate-900 tracking-tight">
                Explore by Category
              </h2>
            </div>
            <span className="hidden sm:inline text-xs text-slate-400">
              Select a topic to jump directly
            </span>
          </div>

          {/* Desktop 5 Category Cards */}
          <div className="hidden sm:grid grid-cols-5 gap-4">
            {[
              {
                id: 'all',
                label: 'All Topics',
                sub: 'Browse everything',
                icon: Layers,
              },
              {
                id: 'orders',
                label: 'Product Orders',
                sub: 'Ordering & checkout',
                icon: ShoppingBag,
              },
              {
                id: 'payment',
                label: 'Payment Methods',
                sub: 'COD & card gateways',
                icon: CreditCard,
              },
              {
                id: 'delivery',
                label: 'Delivery Info',
                sub: 'Islandwide dispatch',
                icon: Truck,
              },
              {
                id: 'returns',
                label: 'Returns & Help',
                sub: '7-day resolution window',
                icon: RotateCcw,
              },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-brand-primary'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-xs">{cat.label}</h3>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}
                  >
                    {cat.sub}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Tabs Pills */}
          <div className="sm:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Topics</span>
            </button>

            <button
              onClick={() => setActiveCategory('orders')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeCategory === 'orders'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveCategory('payment')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeCategory === 'payment'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payments</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Section: Frequently Asked Questions (Accordions) */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-brand-hover">
                ANSWERS ON DEMAND
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="sm:hidden px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                {filteredFaqs.length} answers
              </span>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600">
                <button
                  onClick={expandAll}
                  className="hover:text-brand-primary flex items-center gap-1 cursor-pointer"
                >
                  <span>Expand All</span>
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={collapseAll}
                  className="hover:text-brand-primary flex items-center gap-1 cursor-pointer"
                >
                  <span>Collapse All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqs.includes(faq.id);
              const IconComp = faq.icon;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                        {faq.question}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. Section: Store Policies & Terms (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-brand-hover">
                FORMAL GUIDELINES
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="sm:hidden w-5 h-5 text-brand-primary" />
                <span>Store Policies &amp; Terms</span>
              </h2>
              <p className="sm:hidden text-xs text-slate-500 mt-1">
                Legal terms, transparent buyer protection, and courier guarantees.
              </p>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>Store Standard Terms &amp; Operational Conditions</span>
            </span>
          </div>

          {/* Desktop 2-Column Policies Grid */}
          <div className="hidden sm:grid grid-cols-12 gap-8 items-start">
            {/* Left 4 cols: Policy Tabs */}
            <div className="col-span-4 space-y-3">
              {[
                {
                  id: 'shipping',
                  label: 'Shipping Policy',
                  sub: 'Courier transit & 25 districts',
                  icon: Truck,
                },
                {
                  id: 'returns',
                  label: 'Return & Refund Policy',
                  sub: '7-day inspection window',
                  icon: RotateCcw,
                },
                {
                  id: 'privacy',
                  label: 'Privacy Policy',
                  sub: 'Customer contact & address care',
                  icon: ShieldCheck,
                },
                {
                  id: 'terms',
                  label: 'Terms and Conditions',
                  sub: 'Retail orders & availability',
                  icon: FileText,
                },
              ].map((p) => {
                const isActive = activePolicy === p.id;
                const IconComp = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePolicy(p.id as any)}
                    className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-brand-primary'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs">{p.label}</h4>
                        <p
                          className={`text-[10px] ${
                            isActive ? 'text-white/80' : 'text-slate-400'
                          }`}
                        >
                          {p.sub}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>

            {/* Right 8 cols: Detailed Policy Content */}
            <div className="col-span-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              {activePolicy === 'shipping' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-heading font-black text-slate-900">
                        Shipping &amp; Courier Logistics Policy
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Effective across all 25 administrative districts of Sri Lanka
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      Store Standard
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    LankaDirect operates as a specialized online retail platform. We carefully
                    prepare, package, and dispatch customer orders from central fulfillment hubs
                    across Sri Lanka via authorized third-party courier logistics providers.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <MapPin className="w-4 h-4 text-brand-primary" />
                      <span>Third-Party Courier Dispatch &amp; Regional Coverage</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We guarantee dispatch coordination to all 25 administrative districts across the
                      island. Deliveries are executed by accredited logistics operators (including
                      Pronto Lanka, Domex, Prompt Xpress, and Certis Lanka). LankaDirect does not
                      maintain private on-site rider fleets.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <CreditCard className="w-4 h-4 text-brand-primary" />
                      <span>Standard Courier Rate Calculation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Shipping costs are dynamic standard third-party courier rates calculated
                      transparently during checkout based on volumetric order weight and the
                      destination postal sector (Western Province vs. Outstation). No undisclosed
                      fulfillment surcharges are applied.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Clock className="w-4 h-4 text-brand-primary" />
                      <span>Estimated Delivery Timelines</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Colombo &amp; Suburbs: 1 to 2 business days following courier pickup. Greater
                      Western Province &amp; Major Outstation Cities: 2 to 3 business days. Remote or
                      Rural Delivery Zones: up to 4 business days. Severe weather or regional
                      logistics disruptions may influence these estimates.
                    </p>
                  </div>
                </div>
              )}

              {activePolicy === 'returns' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-heading font-black text-slate-900">
                        Return &amp; Refund Policy
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        7-day customer satisfaction and replacement window
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Buyer Protected
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Customer peace of mind is our utmost priority. If an item arrives damaged,
                    defective, or differs substantially from its listing description, our store team
                    coordinates an immediate replacement or full reimbursement.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Eligibility &amp; Inspection Period
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Customers must report defects or shipping transit damage within 48 hours of
                      courier doorstep handover. Returned products must be in their original
                      packaging accompanied by any warranty cards and accessories.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Refund Processing Times
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For bank transfer and online card transactions, verified refunds are credited
                      within 3–5 business days. Cash on Delivery orders are refunded via direct bank
                      deposit upon verified courier return intake.
                    </p>
                  </div>
                </div>
              )}

              {activePolicy === 'privacy' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-heading font-black text-slate-900">
                        Privacy &amp; Data Protection Policy
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Strict Sri Lankan customer data stewardship
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      Encrypted Care
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    LankaDirect handles your personal information with strict confidentiality.
                    Customer delivery addresses, contact numbers, and payment details are utilized
                    exclusively for processing and delivering your orders.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      No Unsolicited Marketing or Data Selling
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We never sell, rent, or lease customer contact information to third-party
                      advertisers. Phone numbers are strictly used for dispatch alerts, SMS tracking
                      notifications, and courier driver arrival verification calls.
                    </p>
                  </div>
                </div>
              )}

              {activePolicy === 'terms' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-heading font-black text-slate-900">
                        Terms &amp; Store Conditions
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Retail agreements and order fulfillment terms
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      Legal Binding
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    By shopping with LankaDirect, you agree to our standard operating guidelines.
                    All prices are quoted transparently in Sri Lankan Rupees (LKR) with no hidden
                    merchant markups.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Order Acceptance &amp; Inventory Verification
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All placed orders undergo verification by our store fulfillment team prior to
                      courier dispatch handover. In the rare event of inventory stockouts, customers
                      are notified promptly with options for alternative products or immediate
                      refunds.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Policy Accordions (Stitch Artboard) */}
          <div className="sm:hidden space-y-3">
            {[
              {
                id: 'shipping',
                title: 'Shipping & Delivery Policy',
                icon: Truck,
                content:
                  'We guarantee dispatch to all 25 districts across Sri Lanka via authorized courier operators (Domex, Pronto, Certis). Shipping costs are transparently calculated at checkout based on destination. Colombo deliveries arrive in 1–2 days; outstation zones in 2–3 business days.',
              },
              {
                id: 'returns',
                title: 'Return & Refund Policy',
                icon: RotateCcw,
                content:
                  '7-day replacement window on damaged or defective merchandise. Report any issues within 48 hours of doorstep delivery with photos to our support team for an expedited replacement or direct bank refund.',
              },
              {
                id: 'privacy',
                title: 'Privacy & Data Protection',
                icon: ShieldCheck,
                content:
                  'Your phone number and delivery address are strictly protected and never shared or sold. Phone numbers are utilized solely for dispatch SMS updates and courier driver delivery calls.',
              },
              {
                id: 'terms',
                title: 'Terms & Conditions',
                icon: FileText,
                content:
                  'All prices are listed in Sri Lankan Rupees (LKR). Orders are confirmed by our store fulfillment team before courier handover. We ensure radical transparency across all customer transactions.',
              },
            ].map((p) => {
              const isOpen = openMobilePolicies.includes(p.id);
              const IconComp = p.icon;
              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleMobilePolicy(p.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-xs text-slate-900">
                        {p.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      <p>{p.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. Bottom Contact Callout Banner (Desktop & Mobile) */}
        {/* ======================================================== */}
        {/* Desktop Callout Banner */}
        <div className="hidden sm:flex rounded-3xl bg-indigo-50/70 border border-indigo-100 p-6 sm:p-8 shadow-xs items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Still have questions?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Our Colombo-based customer care team is available Monday through Saturday (8:30 AM –
                6:30 PM).
              </p>
            </div>
          </div>

          <Link href="/contact" className="shrink-0">
            <Button className="h-11 px-6 rounded-xl text-xs font-bold shadow-xs">
              Contact Customer Care
            </Button>
          </Link>
        </div>

        {/* Mobile Callout Banner (Stitch Artboard) */}
        <div className="sm:hidden mb-8 rounded-3xl bg-gradient-to-tr from-[#C2410C] via-brand-primary to-orange-500 text-white p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base text-white">Still need help?</h3>
              <p className="text-[11px] text-white/90 leading-snug">
                Can&apos;t find what you&apos;re looking for? Our Colombo support team is ready to
                assist you right now.
              </p>
            </div>
          </div>

          <Link href="/contact" className="block">
            <Button className="w-full h-11 rounded-xl bg-white text-brand-hover hover:bg-slate-100 text-xs font-bold shadow-md flex items-center justify-center gap-2">
              <Send className="w-3.5 h-3.5" />
              <span>Contact Customer Care</span>
            </Button>
          </Link>

          <div className="pt-2 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-white/90">
            <a href="tel:+94112345678" className="flex items-center gap-1 hover:underline">
              <Phone className="w-3 h-3" />
              <span>+94 11 234 5678</span>
            </a>
            <span className="opacity-60">•</span>
            <a
              href="mailto:support@lankadirect.lk"
              className="flex items-center gap-1 hover:underline"
            >
              <Mail className="w-3 h-3" />
              <span>support@lankadirect.lk</span>
            </a>
          </div>
        </div>

        {/* Mobile Hub Footer Disclaimer */}
        <div className="sm:hidden text-center space-y-1 pb-4 text-[10px] text-slate-400">
          <p className="flex items-center justify-center gap-1 font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official LankaDirect Consumer Hub</span>
          </p>
          <p>Last policy revision: October 2024 • Colombo, Sri Lanka</p>
        </div>
      </Container>
    </div>
  );
}
