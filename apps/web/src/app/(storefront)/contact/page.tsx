'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Headphones,
  Mail,
  Phone,
  Clock,
  Truck,
  ShieldCheck,
  Send,
  HelpCircle,
  CheckCircle2,
  Package,
  RotateCcw,
  CreditCard,
  Lock,
  MessageSquare,
  ArrowRight,
  Search,
  ShoppingBag,
  ExternalLink,
  Info,
  Check,
  User,
  AtSign,
  FileText,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function ContactUsPage() {
  // Form State
  const [fullName, setFullName] = useState('Kasun Perera');
  const [email, setEmail] = useState('kasun@example.lk');
  const [phone, setPhone] = useState('77 123 4567');
  const [subject, setSubject] = useState('');
  const [orderReference, setOrderReference] = useState('#LD-86240');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(`LD-TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
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
            <span className="font-semibold text-slate-900">Contact Us</span>
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
        {/* 3. Header Title & Subtitle */}
        {/* ======================================================== */}
        <div className="hidden sm:block mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-xs font-bold mb-3">
            <Headphones className="w-3.5 h-3.5 text-brand-primary" />
            <span>Customer Care Desk</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Have a question about a product, order, or delivery? We&apos;re here to help. Send us a
            message or browse our support channels.
          </p>
        </div>

        {/* Mobile Header Card (Stitch Mobile Artboard) */}
        <div className="sm:hidden mb-4 p-5 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-orange-50/40 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black text-slate-900 tracking-tight">
              Contact Us
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              We&apos;re here to help with your orders, questions, and inquiries across Sri Lanka.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Support Desk Active</span>
            </span>
            <span>• Mon – Sat, 8:30 AM – 6:30 PM</span>
          </div>
        </div>

        {/* Mobile 2 Quick Cards: Call Direct + Email Us */}
        <div className="sm:hidden grid grid-cols-2 gap-3 mb-4">
          <a
            href="tel:+94112345678"
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1 block hover:border-brand-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Call Direct</span>
            <p className="font-heading font-black text-xs text-slate-900">+94 11 234 5678</p>
            <span className="text-[10px] text-emerald-700 font-semibold block flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Standard rates</span>
            </span>
          </a>

          <a
            href="mailto:support@lankadirect.lk"
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1 block hover:border-brand-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Email Us</span>
            <p className="font-heading font-black text-xs text-slate-900 truncate">
              support@lankadi...
            </p>
            <span className="text-[10px] text-amber-700 font-semibold block">⚡ ~2hr response</span>
          </a>
        </div>

        {/* Mobile Browse Help Center & FAQs Link */}
        <div className="sm:hidden mb-5">
          <Link
            href="/faq"
            className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-indigo-700 flex items-center justify-center border border-indigo-100 shadow-2xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  Browse Help Center &amp; FAQs
                </h4>
                <p className="text-[10px] text-slate-500">
                  Track package, return rules, delivery fee guide
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* ======================================================== */}
        {/* 4. Main Grid: Left (Inquiry Form) + Right (Support Desk) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* ====================================================== */}
          {/* Left Column: Form & Authentic Support Card (lg:col-span-7) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Inquiry Form Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                    Customer Inquiry Form
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill in your query details; our support associates respond promptly.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              {submittedTicket ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="font-heading font-black text-base text-emerald-900">
                    Inquiry Dispatched Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Ayubowan <strong>{fullName}</strong>! Your ticket{' '}
                    <strong className="font-mono text-emerald-900">{submittedTicket}</strong> has
                    been registered with our Colombo Support Desk. A confirmation copy was sent to{' '}
                    <strong>{email}</strong>.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setMessage('');
                    }}
                    variant="outline"
                    className="h-9 px-4 text-xs font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Name and Email 2-cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 flex items-center gap-1">
                        <span>Full Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Kasun Perera"
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 flex items-center gap-1">
                        <span>Email Address</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="kasun@example.lk"
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone and Subject 2-cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <label className="font-bold text-slate-700">Phone Number</label>
                        <span className="text-[10px] text-slate-400 font-semibold">(Optional)</span>
                      </div>
                      <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-brand-primary focus-within:bg-white">
                        <span className="px-3 bg-slate-100 border-r border-slate-200 text-slate-600 font-bold text-xs flex items-center">
                          +94
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="77 123 4567"
                          className="w-full h-11 px-3 bg-transparent text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 flex items-center gap-1">
                        <span>Subject / Topic</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select an inquiry subject</option>
                        <option value="order">Order Status &amp; Tracking</option>
                        <option value="delivery">Delivery &amp; Courier Logistics</option>
                        <option value="products">Product Inquiries &amp; Specifications</option>
                        <option value="refunds">Returns &amp; Refund Request</option>
                        <option value="payment">Bank Transfer / Card Verification</option>
                        <option value="general">General Store Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Reference */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="font-bold text-slate-700">
                        Order Reference <span className="font-normal text-slate-400 text-[11px]">(If related to active order)</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Format: #LD-XXXXX</span>
                    </div>
                    <div className="relative">
                      <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderReference}
                        onChange={(e) => setOrderReference(e.target.value)}
                        placeholder="#LD-86240"
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold font-mono focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 flex items-center gap-1">
                      <span>Message</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please tell us how we can assist you..."
                      className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Form Footer Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Direct encrypted dispatch to LankaDirect support team.</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-11 px-6 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Authentic Sri Lankan Retail Support Banner */}
            <div className="rounded-3xl border border-indigo-100 bg-[#EEF2FF]/60 p-5 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-heading font-black text-slate-900 text-sm">
                  Authentic Sri Lankan Retail Support
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We handle every consumer concern locally. Whether you are ordering Ceylon tea,
                  daily groceries, or regional confectionery, our Colombo customer operations desk
                  coordinates directly with dispatch hubs.
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Support Channels & Delivery (lg:col-span-5) */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Customer Support Desk */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Headphones className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Customer Support Desk
                </h3>
              </div>

              {/* Item 1: Support Email */}
              <div className="flex items-start gap-3.5 text-xs">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Support Email</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      Primary Channel
                    </span>
                  </div>
                  <a
                    href="mailto:support@lankadirect.lk"
                    className="font-heading font-bold text-sm text-brand-hover hover:underline block"
                  >
                    support@lankadirect.lk
                  </a>
                  <p className="text-[11px] text-slate-500">
                    General inquiries, payment confirmations &amp; account queries.
                  </p>
                </div>
              </div>

              {/* Item 2: Telephone Assistance */}
              <div className="flex items-start gap-3.5 text-xs pt-1 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Telephone Assistance</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      Sri Lanka
                    </span>
                  </div>
                  <a
                    href="tel:+94112345678"
                    className="font-heading font-black text-sm text-slate-900 hover:text-brand-primary block"
                  >
                    +94 11 234 5678
                  </a>
                  <p className="text-[11px] text-slate-500">
                    Dedicated customer care hotline for rapid order confirmation.
                  </p>
                </div>
              </div>

              {/* Item 3: Operating Hours */}
              <div className="flex items-start gap-3.5 text-xs pt-1 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Operating Hours</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>Open Now</span>
                    </span>
                  </div>
                  <p className="font-heading font-bold text-slate-900">Monday to Saturday</p>
                  <p className="text-[11px] text-slate-600 font-semibold">
                    8:30 AM – 6:30 PM <span className="font-normal text-slate-400">(Sri Lanka Time / UTC+05:30)</span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Closed on Sundays and select Mercantile public holidays.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Islandwide Courier Logistics */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900">
                    Islandwide Courier Logistics
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Pronto, Domex, Certis Lanka &amp; Prompt Xpress
                  </p>
                </div>
              </div>

              {/* Order Reference Notice */}
              <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-[11px] text-slate-700 flex items-start gap-2">
                <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  For inquiries regarding an active shipment, please have your{' '}
                  <strong>Order Reference (#LD-XXXXX)</strong> ready.
                </span>
              </div>

              {/* Transit Timeline List */}
              <div className="space-y-2 text-xs divide-y divide-slate-100 pt-1">
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Western Province &amp; Colombo</span>
                  </span>
                  <span className="font-bold text-slate-900">1 – 2 Business Days</span>
                </div>

                <div className="flex items-center justify-between py-1 pt-2">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>All Other 8 Provinces</span>
                  </span>
                  <span className="font-bold text-slate-900">2 – 3 Business Days</span>
                </div>

                <div className="flex items-center justify-between py-1 pt-2">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>Cash on Delivery (COD) Reconciliation</span>
                  </span>
                  <span className="font-bold text-slate-900">Handled at doorstep</span>
                </div>
              </div>
            </div>

            {/* Card 3: Looking for instant answers? */}
            <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-md space-y-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Immediate Assistance</span>
              </span>

              <h4 className="font-heading font-black text-lg text-white tracking-tight">
                Looking for instant answers?
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Check our FAQ &amp; Store Policies for ordering, payment, and delivery guidance.
                Most frequent questions about delivery zones, card payments, and refunds are answered
                in detail.
              </p>

              <Link href="/faq" className="block pt-1">
                <Button className="w-full h-10 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-xs flex items-center justify-center gap-2">
                  <span>View FAQ &amp; Store Policies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Bottom 3 Quick Help Cards (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Track Delivery */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-primary flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-sm text-slate-900">Track Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check real-time dispatch progress for domestic courier partner handovers.
              </p>
            </div>
            <Link
              href="/orders"
              className="text-xs font-bold text-brand-hover hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>Go to Order History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Returns & Replacements */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-sm text-slate-900">
                Returns &amp; Replacements
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Damaged or missing items? Request exchanges within 48 hours of courier delivery.
              </p>
            </div>
            <Link
              href="/faq"
              className="text-xs font-bold text-brand-hover hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>Review Refund Policy</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Payment Verification */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-sm text-slate-900">
                Payment Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank transfer receipts and online gateway checkout support available daily.
              </p>
            </div>
            <Link
              href="/faq"
              className="text-xs font-bold text-brand-hover hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>Payment Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Privacy Notice Box */}
        <div className="sm:hidden mb-6 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-slate-700 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-snug">
            LankaDirect securely stores your inquiry. We never share customer contact details with
            third parties.
          </p>
        </div>
      </Container>
    </div>
  );
}
