'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Ticket,
  Tag,
  Percent,
  Truck,
  Calendar,
  Megaphone,
  ShoppingBag,
  ArrowDownRight,
  Sparkles,
  Plus,
  Search,
  Download,
  CheckCircle2,
  X,
  ShieldCheck,
  Sliders,
  Copy,
  Check,
  Receipt,
  Coffee,
  Clock,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CouponCampaign {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'shipping';
  typeDisplay: string;
  typeSubtitle: string;
  typeSubtitleColor?: string;
  discountValue: number;
  maxCap?: number;
  minOrder: number;
  currentUses: number;
  maxUses: number | 'unlimited';
  status: 'active' | 'scheduled' | 'expired';
  startDate: string;
  endDate: string;
  category?: string;
  iconType: 'percent' | 'truck' | 'megaphone' | 'tag';
}

const INITIAL_CAMPAIGNS: CouponCampaign[] = [
  {
    id: 'coup-1',
    code: 'WELCOME500',
    name: 'New Shopper First Order',
    type: 'fixed',
    typeDisplay: 'Rs. 500 OFF',
    typeSubtitle: 'Fixed discount',
    discountValue: 500,
    minOrder: 3500,
    currentUses: 84,
    maxUses: 200,
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    iconType: 'percent',
  },
  {
    id: 'coup-2',
    code: 'COLOMBOEXPRESS',
    name: 'Free Western Province Delivery',
    type: 'shipping',
    typeDisplay: 'Rs. 450 OFF',
    typeSubtitle: 'Free shipping waiver',
    typeSubtitleColor: 'text-emerald-600',
    discountValue: 450,
    minOrder: 5000,
    currentUses: 42,
    maxUses: 'unlimited',
    status: 'active',
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    iconType: 'truck',
  },
  {
    id: 'coup-3',
    code: 'KITCHEN10',
    name: 'Home & Kitchen Appliances',
    type: 'percentage',
    typeDisplay: '10% OFF',
    typeSubtitle: 'Cap: Rs. 1,500',
    typeSubtitleColor: 'text-red-500 font-bold',
    discountValue: 10,
    maxCap: 1500,
    minOrder: 4000,
    currentUses: 16,
    maxUses: 100,
    status: 'active',
    startDate: '2025-05-15',
    endDate: '2025-06-15',
    category: 'Home & Kitchen',
    iconType: 'percent',
  },
  {
    id: 'coup-4',
    code: 'AVURUDU25',
    name: 'Sinhala & Tamil New Year Special',
    type: 'percentage',
    typeDisplay: '15% OFF',
    typeSubtitle: 'Sitewide catalog',
    discountValue: 15,
    maxCap: 3000,
    minOrder: 6000,
    currentUses: 0,
    maxUses: 500,
    status: 'scheduled',
    startDate: '2025-04-10',
    endDate: '2025-04-20',
    iconType: 'megaphone',
  },
  {
    id: 'coup-5',
    code: 'FLASH50',
    name: 'April Tea Festival Flash Deal',
    type: 'fixed',
    typeDisplay: 'Rs. 500 OFF',
    typeSubtitle: 'Tea category',
    discountValue: 500,
    minOrder: 2000,
    currentUses: 150,
    maxUses: 150,
    status: 'expired',
    startDate: '2025-04-01',
    endDate: '2025-04-05',
    category: 'Ceylon Tea',
    iconType: 'percent',
  },
  {
    id: 'coup-6',
    code: 'MONSOON20',
    name: 'Monsoon Monsoon Bonanza',
    type: 'percentage',
    typeDisplay: '10% OFF',
    typeSubtitle: 'Monsoon rain gear',
    discountValue: 10,
    maxCap: 1000,
    minOrder: 3500,
    currentUses: 150,
    maxUses: 150,
    status: 'expired',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    iconType: 'tag',
  },
];

export default function AdminCouponsPage() {
  const [campaigns, setCampaigns] = useState<CouponCampaign[]>(INITIAL_CAMPAIGNS);
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'scheduled' | 'expired'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State (Default populated with KITCHEN10 as seen in the artboard)
  const [campaignName, setCampaignName] = useState('Mid-Year Kitchen Promotion');
  const [couponCode, setCouponCode] = useState('KITCHEN10');
  const [calcModel, setCalcModel] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [maxCap, setMaxCap] = useState(1500);
  const [minSubtotal, setMinSubtotal] = useState(4000);
  const [startDate, setStartDate] = useState('2025-05-15');
  const [expiryDate, setExpiryDate] = useState('2025-06-15');
  const [maxUses, setMaxUses] = useState(100);
  const [isActive, setIsActive] = useState(true);

  // Mobile modal
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Copied code "${code}" to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generate random code helper
  const handleGenerateCode = () => {
    const prefixes = ['LANKA', 'PROMO', 'DIRECT', 'SAVE', 'DEAL', 'SUPER', 'KITCHEN'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(10 + Math.random() * 90);
    const newCode = `${randomPrefix}${randomNum}`;
    setCouponCode(newCode);
    showToast(`Generated code: ${newCode}`);
  };

  // Select campaign to populate form
  const handleSelectCampaign = (c: CouponCampaign) => {
    setCampaignName(c.name);
    setCouponCode(c.code);
    setCalcModel(c.type === 'fixed' || c.type === 'shipping' ? 'fixed' : 'percentage');
    setDiscountValue(c.discountValue);
    if (c.maxCap) setMaxCap(c.maxCap);
    setMinSubtotal(c.minOrder);
    setStartDate(c.startDate);
    setExpiryDate(c.endDate);
    setMaxUses(typeof c.maxUses === 'number' ? c.maxUses : 9999);
    setIsActive(c.status === 'active');
  };

  // Real-time calculation for simulation
  // Catalog Product: Singer 1.7L Cordless Electric Kettle = Rs. 4,950
  const demoItemPrice = 4950;
  const standardCourier = 450;

  const appliedDiscount = useMemo(() => {
    if (calcModel === 'percentage') {
      const calculated = Math.round((demoItemPrice * (discountValue || 0)) / 100);
      return maxCap > 0 ? Math.min(calculated, maxCap) : calculated;
    } else {
      return discountValue || 0;
    }
  }, [calcModel, discountValue, maxCap]);

  const newSubtotal = Math.max(0, demoItemPrice - appliedDiscount);
  const finalPayable = newSubtotal + standardCourier;

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterTab === 'all') return true;
      return item.status === filterTab;
    });
  }, [campaigns, searchQuery, filterTab]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: campaigns.length,
      active: campaigns.filter((c) => c.status === 'active').length,
      scheduled: campaigns.filter((c) => c.status === 'scheduled').length,
      expired: campaigns.filter((c) => c.status === 'expired').length,
    };
  }, [campaigns]);

  // Handle Save
  const handleSaveDiscount = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!couponCode.trim()) {
      showToast('Please specify a valid coupon code.');
      return;
    }

    const existingIndex = campaigns.findIndex(
      (c) => c.code.toLowerCase() === couponCode.trim().toLowerCase()
    );

    const newCamp: CouponCampaign = {
      id: existingIndex >= 0 ? campaigns[existingIndex].id : `coup-${Date.now()}`,
      code: couponCode.trim().toUpperCase(),
      name: campaignName.trim() || 'Store Discount',
      type: calcModel,
      typeDisplay:
        calcModel === 'percentage' ? `${discountValue}% OFF` : `Rs. ${discountValue} OFF`,
      typeSubtitle:
        calcModel === 'percentage'
          ? maxCap > 0
            ? `Cap: Rs. ${maxCap.toLocaleString()}`
            : 'Sitewide catalog'
          : 'Fixed discount',
      typeSubtitleColor: calcModel === 'percentage' ? 'text-red-500 font-bold' : undefined,
      discountValue: discountValue,
      maxCap: maxCap,
      minOrder: minSubtotal,
      currentUses: existingIndex >= 0 ? campaigns[existingIndex].currentUses : 0,
      maxUses: maxUses || 100,
      status: isActive ? 'active' : 'expired',
      startDate: startDate,
      endDate: expiryDate,
      iconType: 'percent',
    };

    if (existingIndex >= 0) {
      const updated = [...campaigns];
      updated[existingIndex] = newCamp;
      setCampaigns(updated);
      showToast(`Updated discount voucher "${newCamp.code}" successfully.`);
    } else {
      setCampaigns([newCamp, ...campaigns]);
      showToast(`Created new discount voucher "${newCamp.code}"!`);
    }

    setMobileModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
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
          <span className="text-slate-700 font-bold">Discounts &amp; Promotions</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Discounts &amp; Promo Vouchers
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Create and manage store coupon codes and seasonal promotions. Configured for single store retail without double-discount conflicts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={() => showToast('Coupon redemptions audit log exported to CSV.')}
              className="h-10 px-4 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Logs</span>
            </Button>

            <Button
              onClick={() => {
                setCampaignName('New Campaign Promotion');
                handleGenerateCode();
                setIsActive(true);
              }}
              className="h-10 px-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Discount</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Store Campaign
            </span>
            <h2 className="text-2xl font-heading font-black text-slate-900">
              Discounts
            </h2>
          </div>

          <Button
            onClick={() => setMobileModalOpen(true)}
            className="h-9 px-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 KPI METRICS ROW                                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Active Coupons */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Active Coupons
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-heading font-black text-slate-900 tracking-tight">
                3
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                ● Live
              </span>
            </div>
          </div>
          <div className="mt-3 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-600 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="truncate">Zero coupon overlap conflicts</span>
          </div>
        </div>

        {/* 2. Scheduled Promotions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Scheduled Promotions
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-heading font-black text-slate-900 tracking-tight">
                1
              </span>
              <span className="text-xs text-slate-400 font-semibold">Upcoming</span>
            </div>
          </div>
          <div className="mt-3 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-600 font-medium truncate">
            Queued: <span className="font-bold text-slate-800">Avurudu Mega Sal...</span>
          </div>
        </div>

        {/* 3. Total Redemptions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Redemptions
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-heading font-black text-slate-900 tracking-tight">
                142
              </span>
              <span className="text-xs text-slate-400 font-semibold">orders</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Current month checkout share</span>
            <strong className="text-brand-primary font-bold">28.4%</strong>
          </div>
        </div>

        {/* 4. Total Savings Provided */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Savings Provided
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5">
              <span className="text-xs font-bold text-slate-400">Rs. </span>
              <span className="text-2xl lg:text-3xl font-heading font-black text-slate-900 tracking-tight">
                68,500
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Avg Discount/Order:</span>
            <strong className="text-slate-900 font-bold">Rs. 482.39</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER TABS & SEARCH BAR                                                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              filterTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({tabCounts.all})
          </button>
          <button
            onClick={() => setFilterTab('active')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              filterTab === 'active'
                ? 'bg-brand-primary text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active ({tabCounts.active})
          </button>
          <button
            onClick={() => setFilterTab('scheduled')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              filterTab === 'scheduled'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Scheduled ({tabCounts.scheduled})
          </button>
          <button
            onClick={() => setFilterTab('expired')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              filterTab === 'expired'
                ? 'bg-slate-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Expired ({tabCounts.expired})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter code..."
            className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TWO-COLUMN LAYOUT (1440px Artboard)                               */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Coupon Table & Policy (col-span-7) */}
        <div className="col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4 font-black">Coupon Code &amp; Campaign</th>
                    <th className="py-3 px-4 font-black">Type &amp; Value</th>
                    <th className="py-3 px-4 font-black">Min Order</th>
                    <th className="py-3 px-4 font-black">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {filteredCampaigns.map((c) => {
                    const isSelected = couponCode === c.code;

                    // Progress bar calculation
                    const usagePercent =
                      typeof c.maxUses === 'number' && c.maxUses > 0
                        ? Math.min(100, Math.round((c.currentUses / c.maxUses) * 100))
                        : 20;

                    return (
                      <tr
                        key={c.id}
                        onClick={() => handleSelectCampaign(c)}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                          isSelected ? 'bg-orange-50/40 border-l-4 border-brand-primary' : ''
                        }`}
                      >
                        {/* Coupon Code & Campaign */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-orange-100/70 text-brand-hover flex items-center justify-center shrink-0">
                              {c.iconType === 'truck' ? (
                                <Truck className="w-4 h-4 text-slate-700" />
                              ) : c.iconType === 'megaphone' ? (
                                <Megaphone className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Percent className="w-4 h-4 text-brand-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-heading font-black text-xs text-slate-900 tracking-wide">
                                  {c.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyCode(c.code);
                                  }}
                                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                                  title="Copy code"
                                >
                                  {copiedCode === c.code ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {c.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type & Value */}
                        <td className="py-3.5 px-4">
                          <p className="font-heading font-black text-xs text-slate-900">
                            {c.typeDisplay}
                          </p>
                          <p
                            className={`text-[10px] font-medium mt-0.5 ${
                              c.typeSubtitleColor || 'text-slate-400'
                            }`}
                          >
                            {c.typeSubtitle}
                          </p>
                        </td>

                        {/* Min Order */}
                        <td className="py-3.5 px-4">
                          <p className="text-slate-800 font-bold text-[11px]">
                            Rs. {c.minOrder.toLocaleString()}
                          </p>
                        </td>

                        {/* Usage & Progress bar */}
                        <td className="py-3.5 px-4 min-w-[120px]">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                            <span>{c.currentUses}</span>
                            <span className="text-slate-400">
                              / {c.maxUses === 'unlimited' ? '∞' : c.maxUses}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                c.status === 'expired'
                                  ? 'bg-slate-400'
                                  : c.type === 'shipping'
                                  ? 'bg-emerald-500'
                                  : c.status === 'scheduled'
                                  ? 'bg-blue-400'
                                  : 'bg-brand-primary'
                              }`}
                              style={{ width: `${usagePercent}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>
                  <strong>LankaDirect Guarantee:</strong> Automatic Cart rule strictly prevents code stacking at checkout.
                </span>
              </div>
              <span className="text-slate-400 font-semibold shrink-0">
                Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              </span>
            </div>
          </div>

          {/* Anti-Stacking Checkout Policy Box */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <h4 className="font-heading font-black text-slate-900 text-xs">
                Anti-Stacking Checkout Policy
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                When a Sri Lankan shopper applies a promotional code at checkout, it overrides any generic bundle codes. Discount amounts apply strictly to <strong>eligible merchandise subtotals</strong> before islandwide courier fees.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Create Discount Code Form (col-span-5) */}
        <div className="col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-base text-slate-900">
                  Create Discount Code
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
                  New Voucher
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Set straightforward coupon rules for customer checkout.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveDiscount} className="space-y-3.5 text-xs">
            {/* Campaign Name */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Campaign Name</label>
                <span className="text-[10px] text-slate-400">Internal &amp; receipt title</span>
              </div>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. Mid-Year Kitchen Promotion"
                className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                required
              />
            </div>

            {/* Coupon Code (Auto-Caps) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Coupon Code (Auto-Caps)</label>
                <span className="text-[10px] text-brand-hover font-semibold">
                  Customers enter this
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. KITCHEN10"
                  className="w-full h-9 pl-3 pr-20 rounded-xl border border-slate-200 bg-slate-50 font-heading font-black text-xs text-slate-900 tracking-wider focus:outline-none focus:border-brand-primary focus:bg-white uppercase"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateCode}
                  className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Discount Calculation Model */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Discount Calculation Model
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                    calcModel === 'percentage'
                      ? 'border-brand-primary bg-orange-50/50 text-slate-900'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="calcModel"
                    checked={calcModel === 'percentage'}
                    onChange={() => setCalcModel('percentage')}
                    className="accent-brand-primary"
                  />
                  <span>Percentage (%)</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                    calcModel === 'fixed'
                      ? 'border-brand-primary bg-orange-50/50 text-slate-900'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="calcModel"
                    checked={calcModel === 'fixed'}
                    onChange={() => setCalcModel('fixed')}
                    className="accent-brand-primary"
                  />
                  <span>Fixed (LKR)</span>
                </label>
              </div>
            </div>

            {/* Discount Value & Max Cap */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Discount Value</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full h-9 px-3 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    {calcModel === 'percentage' ? '%' : 'Rs.'}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Max Cap (LKR)</label>
                  <span className="text-[9px] text-slate-400">Prevents loss</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={maxCap}
                  onChange={(e) => setMaxCap(Number(e.target.value))}
                  placeholder="e.g. 1500"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Minimum Cart Subtotal */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Minimum Cart Subtotal</label>
                <span className="text-[10px] text-slate-400">Optional threshold</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  value={minSubtotal}
                  onChange={(e) => setMinSubtotal(Number(e.target.value))}
                  placeholder="4000"
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Start Date & Expiry Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Max Total Uses & Voucher Status */}
            <div className="grid grid-cols-2 gap-3 items-center pt-1">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Max Total Uses</label>
                <input
                  type="number"
                  min="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Voucher Status</label>
                <div className="flex items-center justify-between h-9 px-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800">
                    {isActive ? 'Active' : 'Paused'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* REAL-TIME CHECKOUT SIMULATION CARD                                        */}
            {/* ========================================================================= */}
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-indigo-100/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Receipt className="w-3.5 h-3.5 text-brand-primary" />
                  <span>REAL-TIME CHECKOUT SIMULATION</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[9px] font-bold">
                  Live Preview
                </span>
              </div>

              {/* Product preview box */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-black text-xs text-slate-900 truncate">
                    Singer 1.7L Cordless Electric Kettle
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Catalog Price: Rs. {demoItemPrice.toLocaleString()} LKR
                  </p>
                </div>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Eligible Subtotal:</span>
                  <span className="font-bold text-slate-800">
                    Rs. {demoItemPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-brand-hover font-bold">
                  <span>
                    Applied Discount ({calcModel === 'percentage' ? `${discountValue}%` : 'Fixed'}):
                  </span>
                  <span>-Rs. {appliedDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>New Subtotal:</span>
                  <span className="font-bold text-slate-800">
                    Rs. {newSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Standard Islandwide Courier:</span>
                  <span>Rs. {standardCourier}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-heading font-black text-slate-900 text-xs">
                    Customer Final Payable:
                  </span>
                  <span className="font-heading font-black text-sm text-brand-primary">
                    Rs. {finalPayable.toLocaleString()} LKR
                  </span>
                </div>
              </div>

              {/* Prevents Stacking Note */}
              <div className="p-2 rounded-lg bg-emerald-50 text-[10px] text-emerald-800 font-semibold flex items-center gap-1.5 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Prevents stacking: Only one voucher code allowed per checkout.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <Button
                type="submit"
                className="flex-1 h-10 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save Discount Code</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCampaignName('');
                  setCouponCode('');
                  showToast('Form inputs cleared.');
                }}
                className="h-10 px-4 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LIST (390px Artboard)                                              */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3.5">
        {filteredCampaigns.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              handleSelectCampaign(c);
              setMobileModalOpen(true);
            }}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5 cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-base text-slate-900 tracking-wide">
                  {c.code}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCode(c.code);
                  }}
                  className="text-slate-400 hover:text-slate-700 p-0.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  c.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : c.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {c.status === 'active'
                  ? 'Active'
                  : c.status === 'scheduled'
                  ? 'Scheduled'
                  : 'Expired'}
              </span>
            </div>

            <p className="text-xs">
              <strong className="text-brand-hover font-heading font-black">
                {c.typeDisplay}
              </strong>{' '}
              <span className="text-slate-500 font-medium">{c.name}</span>
            </p>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
              <span>
                Min. Order: <strong className="text-slate-900">Rs. {c.minOrder}</strong>
              </span>
              <span>
                Redeemed:{' '}
                <strong className="text-slate-900">
                  {c.currentUses} / {c.maxUses === 'unlimited' ? '∞' : c.maxUses}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-UP BOTTOM SHEET MODAL (390px Artboard)                       */}
      {/* ========================================================================= */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setMobileModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-t-3xl max-w-md w-full p-5 shadow-2xl space-y-4 z-10 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2"></div>

            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  New Discount Code
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Design single-use or campaign promotions
                </p>
              </div>

              <button
                onClick={() => setMobileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDiscount} className="space-y-3.5 text-xs">
              {/* Promotion Name */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Promotion Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Monsoon Monsoon Bonanza"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                  required
                />
              </div>

              {/* Coupon Code (Customer Enters) */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Coupon Code (Customer Enters)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MONSOON20"
                    className="w-full h-10 pl-3 pr-20 rounded-xl border border-slate-200 bg-slate-50 font-heading font-black text-xs text-slate-900 tracking-wider focus:outline-none focus:border-brand-primary focus:bg-white uppercase"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold flex items-center gap-1"
                  >
                    <span>Auto</span>
                  </button>
                </div>
              </div>

              {/* Type & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type</label>
                  <div className="flex h-10 p-1 rounded-xl bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setCalcModel('percentage')}
                      className={`flex-1 rounded-lg text-xs font-bold transition-all ${
                        calcModel === 'percentage'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      % OFF
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcModel('fixed')}
                      className={`flex-1 rounded-lg text-xs font-bold transition-all ${
                        calcModel === 'fixed'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      LKR (Rs.)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Value</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                      className="w-full h-10 px-3 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                      {calcModel === 'percentage' ? '%' : 'Rs.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Min. Order & Max Uses */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min. Order</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={minSubtotal}
                      onChange={(e) => setMinSubtotal(Number(e.target.value))}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Uses</label>
                  <input
                    type="number"
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-primary focus:bg-white"
                  />
                </div>
              </div>

              {/* REALTIME CART PREVIEW */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <Receipt className="w-3.5 h-3.5 text-brand-primary" />
                    <span>REALTIME CART PREVIEW</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    Demo Cart
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-brand-primary" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">Singer Kettle 1.7L</p>
                      <span className="text-[10px] text-slate-400">Qty 1</span>
                    </div>
                  </div>
                  <strong className="text-slate-900">Rs. {demoItemPrice.toLocaleString()}</strong>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Original Subtotal</span>
                    <span>Rs. {demoItemPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-hover font-bold">
                    <span>
                      Discount ({calcModel === 'percentage' ? `${discountValue}%` : 'Fixed'})
                    </span>
                    <span>-Rs. {appliedDiscount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save Discount Code</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
