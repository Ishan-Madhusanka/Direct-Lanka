'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Building2,
  CheckCircle2,
  RotateCcw,
  Save,
  Lock,
  Globe,
  Clock,
  Languages,
  CreditCard,
  Truck,
  Package,
  ShieldCheck,
  Key,
  LogOut,
  Laptop,
  Mail,
  Phone,
  AlertCircle,
  X,
  Check,
  ChevronDown,
  Flag,
  Upload,
  Radio,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  // Store Profile State
  const [storeName, setStoreName] = useState('LankaDirect');
  const [supportPhone, setSupportPhone] = useState('+94 11 234 5678');
  const [tagline, setTagline] = useState('Direct Online Retail for Sri Lankan Households');
  const [description, setDescription] = useState(
    'Curated everyday lifestyle, kitchenware, and groceries delivered directly across all 25 districts.'
  );
  const [supportEmail, setSupportEmail] = useState('support@lankadirect.lk');

  // Checkout & Order Policies
  const [orderPrefix, setOrderPrefix] = useState('LD-');
  const [defaultOrderStatus, setDefaultOrderStatus] = useState('Pending Confirmation');
  const [guestCheckout, setGuestCheckout] = useState(true);

  // Logistics & Courier Rates
  const [westernFee, setWesternFee] = useState(450);
  const [outstationFee, setOutstationFee] = useState(550);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(8500);
  const [shippingNotice, setShippingNotice] = useState(
    'Deliveries take 1-2 business days within Western Province and 2-4 business days for outstation addresses. Cash on delivery accepted islandwide.'
  );

  // Payment Methods
  const [codEnabled, setCodEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true);
  const [cardPaymentEnabled, setCardPaymentEnabled] = useState(false);

  // Inventory & Stock Alerts
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [zeroStockBehavior, setZeroStockBehavior] = useState<'out_of_stock' | 'hide'>('out_of_stock');

  // UI States
  const [toastMessage, setToastMessage] = useState<string | null>(
    'Settings updated successfully! Changes are immediately live on the customer storefront.'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings updated successfully! Changes are immediately live on the customer storefront.');
    }, 700);
  };

  const handleResetDefaults = () => {
    setStoreName('LankaDirect');
    setSupportPhone('+94 11 234 5678');
    setTagline('Direct Online Retail for Sri Lankan Households');
    setDescription(
      'Curated everyday lifestyle, kitchenware, and groceries delivered directly across all 25 districts.'
    );
    setSupportEmail('support@lankadirect.lk');
    setOrderPrefix('LD-');
    setDefaultOrderStatus('Pending Confirmation');
    setGuestCheckout(true);
    setWesternFee(450);
    setOutstationFee(550);
    setFreeShippingThreshold(8500);
    setCodEnabled(true);
    setBankTransferEnabled(true);
    setCardPaymentEnabled(false);
    setLowStockThreshold(5);
    setZeroStockBehavior('out_of_stock');
    showToast('Store settings restored to factory defaults.');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold border border-emerald-700 animate-in fade-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP HEADER (1440px Artboard)                                          */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Link href="/admin" className="hover:text-brand-primary">
            Admin
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">Store Settings &amp; Operations</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Store Settings &amp; Configuration
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              Production Live
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={handleResetDefaults}
              className="h-10 px-4 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Defaults</span>
            </Button>

            <Button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="h-10 px-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Production Live</span>
          </div>

          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="h-8 px-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center gap-1"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </Button>
        </div>

        <h2 className="text-2xl font-heading font-black text-slate-900">
          Store Settings
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* STORE ENGINE STATUS BAR (Desktop)                                         */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-100/70 text-brand-hover flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 font-bold block text-xs">
              Storefront Engine Status: Operational
            </strong>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Serving Western, Central, Southern &amp; Outstation delivery sectors via synced 3PL endpoints.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">Storefront UUID:</span>
          <span className="font-mono text-xs font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            LK-DIR-2924-HQ
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TWO-COLUMN CONFIGURATION LAYOUT (1440px Artboard)                  */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols) */}
        <div className="col-span-7 space-y-6">
          {/* Card 1: Store Information & Brand Identity */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Store Information &amp; Brand Identity
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Storefront Profile
              </span>
            </div>

            {/* Primary Store Badge */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white font-heading font-black text-xl flex items-center justify-center shadow-xs">
                    L
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-black text-xs text-slate-900">
                    Primary Store Badge
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs leading-tight">
                    Square format (PNG/SVG, 512×512px). Displayed on mobile app, invoices &amp; checkout header.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => showToast('Select new logo image file...')}
                  className="h-8 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-white"
                >
                  Change Logo
                </Button>
                <button
                  type="button"
                  onClick={() => showToast('Store logo reset to default.')}
                  className="h-8 px-2.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Store Name & Support Hotline */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Support Hotline</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white font-mono"
                />
              </div>
            </div>

            {/* Store Tagline */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Store Tagline / Slogan</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
              />
            </div>

            {/* Store Description (Meta & SEO) */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Store Description (Meta &amp; SEO)</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white resize-none"
              />
            </div>

            {/* Customer Inquiries Email */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Customer Inquiries Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Order & Checkout Policies */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Order &amp; Checkout Policies
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Frictionless Flow
              </span>
            </div>

            {/* Order Reference Prefix & Default Order Status */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Order Reference Prefix</label>
                  <span className="text-[10px] text-slate-400">
                    Preview: <strong className="text-slate-800">#{orderPrefix}84920</strong>
                  </span>
                </div>
                <input
                  type="text"
                  value={orderPrefix}
                  onChange={(e) => setOrderPrefix(e.target.value.toUpperCase())}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 uppercase focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Default Order Status</label>
                <select
                  value={defaultOrderStatus}
                  onChange={(e) => setDefaultOrderStatus(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
                >
                  <option value="Pending Confirmation">Pending Confirmation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>

            {/* Guest Checkout Mode */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-slate-900 font-bold block text-xs">
                  Guest Checkout Mode
                </strong>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Allow shoppers to order with just an SMS phone number without creating an account or password.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={guestCheckout}
                  onChange={(e) => setGuestCheckout(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4.5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          </div>

          {/* Card 3: Third-Party Courier & Logistics */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Third-Party Courier &amp; Logistics
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                Islandwide 25 Districts
              </span>
            </div>

            {/* Integrated Fleet Partners banner */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block text-xs">
                    Integrated Fleet Partners:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Pronto Lanka, Domex Express, Prompt Xpress API Dispatch
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Auto-Assigned</span>
              </span>
            </div>

            {/* Western vs Outstation delivery fees */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Western Province Fee</label>
                  <span className="text-[10px] text-slate-400">Colombo, Gampaha, Kalutara</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={westernFee}
                    onChange={(e) => setWesternFee(Number(e.target.value))}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Outstation Delivery Fee</label>
                  <span className="text-[10px] text-slate-400">Remaining 22 Districts</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={outstationFee}
                    onChange={(e) => setOutstationFee(Number(e.target.value))}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Free Shipping Basket Threshold */}
            <div className="text-xs space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Free Shipping Basket Threshold</label>
                <span className="text-[10px] font-bold text-emerald-700">
                  Promotion Incentive Active
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  Rs.
                </span>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
              <p className="text-[10px] text-slate-400 pt-0.5">
                Orders equal to or above this value bypass standard shipping charges at checkout.
              </p>
            </div>

            {/* Storefront Shipping Notice */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">
                Storefront Shipping Notice (Cart &amp; Checkout)
              </label>
              <textarea
                rows={2}
                value={shippingNotice}
                onChange={(e) => setShippingNotice(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols) */}
        <div className="col-span-5 space-y-6">
          {/* Card 1: Regional Preferences */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Regional Preferences
                </h3>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Currency */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Base Store Currency</span>
                  <span className="font-bold text-slate-900 text-xs">Sri Lankan Rupee (LKR / Rs.)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  System Locked
                </span>
              </div>

              {/* Target Destination */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Target Destination</span>
                  <span className="font-bold text-slate-900 text-xs">Sri Lanka (All Districts)</span>
                </div>
                <Flag className="w-4 h-4 text-emerald-600" />
              </div>

              {/* Timezone */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Timezone</span>
                  <span className="font-bold text-slate-900 text-xs">Asia/Colombo (SLST, UTC+05:30)</span>
                </div>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>

              {/* Catalog Language */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Catalog Language</span>
                  <span className="font-bold text-slate-900 text-xs">English (Sinhala &amp; Tamil)</span>
                </div>
                <Languages className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Card 2: Payment Methods */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Payment Methods
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Gateways
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* COD */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-700 font-bold">$</span>
                    <strong className="text-slate-900 font-bold text-xs">Cash on Delivery (COD)</strong>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={codEnabled}
                      onChange={(e) => setCodEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Collect cash upon physical courier doorstep delivery. Driver provides receipt via SMS/Print.
                </p>
              </div>

              {/* Direct Bank Deposit */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-600" />
                    <strong className="text-slate-900 font-bold text-xs">Direct Bank Deposit / Transfer</strong>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bankTransferEnabled}
                      onChange={(e) => setBankTransferEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Shoppers transfer to Commercial Bank / HNB and upload slip.
                </p>
              </div>

              {/* Card Payments */}
              <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-200/60 space-y-1 opacity-80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-700 font-bold text-xs">Card Payments (Visa/Mastercard)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardPaymentEnabled}
                      onChange={(e) => setCardPaymentEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                    Future IPG Integration
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Awaiting merchant gateway onboarding.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Inventory & Stock Alerts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Inventory &amp; Stock Alerts
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Replenishment
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Default Low Stock Alert Threshold */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Default Low Stock Alert Threshold</label>
                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[9px] font-bold">
                    Alert Trigger
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    className="w-20 h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                  <span className="text-slate-500 font-medium">units remaining in central hub</span>
                </div>
              </div>

              {/* Zero-Stock Catalog Behavior */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Zero-Stock Catalog Behavior
                </label>
                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="zeroStock"
                      checked={zeroStockBehavior === 'out_of_stock'}
                      onChange={() => setZeroStockBehavior('out_of_stock')}
                      className="mt-0.5 accent-brand-primary"
                    />
                    <div>
                      <strong className="text-slate-900 font-bold block text-xs">
                        Show as &apos;Out of Stock&apos; on storefront
                      </strong>
                      <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                        Customers can still view specs and request re-stock alerts.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="zeroStock"
                      checked={zeroStockBehavior === 'hide'}
                      onChange={() => setZeroStockBehavior('hide')}
                      className="mt-0.5 accent-brand-primary"
                    />
                    <div>
                      <strong className="text-slate-900 font-bold block text-xs">
                        Hide product completely from customer catalog
                      </strong>
                      <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                        Invisible until warehouse replenishment batch is received.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Admin Credentials & Sessions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Admin Credentials &amp; Sessions
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Store Administrator</span>
                  <span className="font-bold text-slate-900 block text-xs">Kasun Perera (Owner)</span>
                  <span className="text-[11px] text-slate-500">owner@lankadirect.lk</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPasswordModalOpen(true)}
                  className="h-8 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-white"
                >
                  Change Password
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Current Active Session</span>
                    <span className="font-medium text-slate-700 text-[11px]">
                      Colombo Main Hub • IP SLT-Fiber (112.134.**)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('All remote device sessions terminated.')}
                  className="text-red-600 hover:underline font-bold text-xs"
                >
                  Log Out All Devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SETTINGS VIEW (390px Artboard)                                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-4">
        {/* Card 1: Store Profile */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h4 className="font-heading font-black text-xs text-slate-900">
                Store Profile
              </h4>
              <p className="text-[10px] text-slate-400">General storefront credentials</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">
              Primary
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white font-heading font-black text-base flex items-center justify-center">
                L
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Official Store Logo</span>
                <span className="text-[10px] text-slate-400">PNG, JPG or SVG (Max 2MB)</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => showToast('Select new logo...')}
              className="h-8 px-2.5 rounded-xl text-xs font-bold border-slate-200 bg-white"
            >
              Change
            </Button>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Support Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Hotline / WhatsApp Desk</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Currency & Timezone */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900">
              Currency &amp; Timezone
            </h4>
            <p className="text-[10px] text-slate-400">Regional fiscal configuration</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">Default Currency</span>
              <strong className="font-heading font-black text-xs text-slate-900 block mt-0.5">
                LKR (Rs.)
              </strong>
              <span className="text-[9px] text-emerald-700 font-bold block mt-1">● Fixed Base</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">Operating Timezone</span>
              <strong className="font-heading font-black text-xs text-slate-900 block mt-0.5">
                Asia/Colombo
              </strong>
              <span className="text-[9px] text-slate-400 font-semibold block mt-1">GMT +05:30</span>
            </div>
          </div>
        </div>

        {/* Card 3: Checkout & Orders */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900">
              Checkout &amp; Orders
            </h4>
            <p className="text-[10px] text-slate-400">Cart behavior &amp; invoice sequencing</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block text-xs">Order Prefix</span>
              <span className="text-[10px] text-slate-400">Prepended to invoice numbers</span>
            </div>
            <input
              type="text"
              value={orderPrefix}
              onChange={(e) => setOrderPrefix(e.target.value.toUpperCase())}
              className="w-16 h-8 text-center rounded-lg border border-slate-200 bg-white font-bold text-xs uppercase"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block text-xs">Guest Checkout</span>
              <span className="text-[10px] text-slate-400">Allow purchase without account creation</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
              <input
                type="checkbox"
                checked={guestCheckout}
                onChange={(e) => setGuestCheckout(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>

          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-bold text-slate-700 block">Default Order Status Upon Creation</span>
            <select
              value={defaultOrderStatus}
              onChange={(e) => setDefaultOrderStatus(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
            >
              <option value="Pending Confirmation">● Pending Confirmation</option>
              <option value="Confirmed">● Confirmed</option>
              <option value="Processing">● Processing</option>
            </select>
          </div>
        </div>

        {/* Card 4: Payment Methods */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h4 className="font-heading font-black text-xs text-slate-900">
                Payment Methods
              </h4>
              <p className="text-[10px] text-slate-400">Gateways for Sri Lankan shoppers</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              2 Active
            </span>
          </div>

          {/* COD */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Cash on Delivery (COD)</strong>
              <span className="text-[10px] text-slate-400">Islandwide settlement at doorstep</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>

          {/* Credit / Debit Card */}
          <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-center justify-between text-xs opacity-75">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-700 font-bold text-xs">Credit / Debit Card</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[9px] font-bold">
                  COMING SOON
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Visa / Mastercard / IPG</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={cardPaymentEnabled}
                onChange={(e) => setCardPaymentEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>

          {/* Direct Bank Transfer */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Direct Bank Transfer</strong>
              <span className="text-[10px] text-slate-400">Commercial Bank / Sampath Bank</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bankTransferEnabled}
                onChange={(e) => setBankTransferEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>
        </div>

        {/* Card 5: Courier Delivery Rates */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900">
              Courier Delivery Rates
            </h4>
            <p className="text-[10px] text-slate-400">Standard islandwide flat tariff rules</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Western Province</strong>
              <span className="text-[10px] text-slate-400">Colombo, Gampaha, Kalutara</span>
            </div>
            <span className="font-heading font-black text-slate-900 text-xs">
              Rs. {westernFee}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Outstation Districts</strong>
              <span className="text-[10px] text-slate-400">All other 22 regional zones</span>
            </div>
            <span className="font-heading font-black text-slate-900 text-xs">
              Rs. {outstationFee}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-emerald-800 font-bold flex items-center gap-1 text-xs">
                <span>⚡ Free Shipping Threshold</span>
              </span>
              <strong className="text-emerald-800 font-heading font-black text-xs">
                Rs. {freeShippingThreshold}
              </strong>
            </div>
            <p className="text-[10px] text-emerald-700">
              Orders crossing this net cart subtotal will auto-waive dispatch charges.
            </p>
          </div>
        </div>

        {/* Card 6: Inventory Alert Rules */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900">
              Inventory Alert Rules
            </h4>
            <p className="text-[10px] text-slate-400">Stock threshold automated triggers</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Low Stock Warning</strong>
              <span className="text-[10px] text-slate-400">Flag item in catalog view</span>
            </div>
            <span className="font-bold text-brand-primary text-xs bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
              {lowStockThreshold} units
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 block text-xs">Zero Stock Behavior</strong>
              <span className="text-[10px] text-slate-400">Storefront display rule</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
              Sold Out
            </span>
          </div>
        </div>

        {/* Card 7: Admin Account & Access */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900">
              Admin Account &amp; Access
            </h4>
            <p className="text-[10px] text-slate-400">Root credentials and authentication</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-hover text-white font-heading font-black text-xs flex items-center justify-center">
                LD
              </div>
              <div>
                <strong className="text-slate-900 block text-xs">Store Owner Account</strong>
                <span className="text-[10px] text-slate-400">owner@lankadirect.lk</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
              Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPasswordModalOpen(true)}
              className="h-9 rounded-xl border-slate-200 text-xs font-bold text-slate-700 bg-white"
            >
              <Key className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>Change Key</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => showToast('Session logged out.')}
              className="h-9 rounded-xl border-red-200 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>

        {/* Save All Settings Full-Width Button */}
        <Button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* CHANGE PASSWORD MODAL                                                     */}
      {/* ========================================================================= */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Update Admin Password
                </h3>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  onClick={() => {
                    setPasswordModalOpen(false);
                    showToast('Admin password updated successfully.');
                  }}
                  className="flex-1 h-9 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs"
                >
                  Update Key
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPasswordModalOpen(false)}
                  className="h-9 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
