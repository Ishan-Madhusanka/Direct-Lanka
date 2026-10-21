'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Package,
  Plus,
  ArrowUpRight,
  Truck,
  AlertTriangle,
  Users,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Printer,
  FileSpreadsheet,
  RotateCcw,
  Phone,
  Check,
  ShieldCheck,
  TrendingUp,
  Tag,
  Boxes,
  Layers,
  Sparkles,
  X,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  // Interactive state
  const [activeDateFilter, setActiveDateFilter] = useState('Last 30 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [mobileTimeScope, setMobileTimeScope] = useState<'today' | 'month'>('today');
  const [ordersDispatched, setOrdersDispatched] = useState(false);
  const [confirmedOrders, setConfirmedOrders] = useState<Record<string, boolean>>({});
  const [waybillsModalOpen, setWaybillsModalOpen] = useState(false);
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmOrder = (orderId: string) => {
    setConfirmedOrders((prev) => ({ ...prev, [orderId]: true }));
    showToast(`Order #${orderId} confirmed successfully! Sent to packing queue.`);
  };

  const handleMarkDispatched = () => {
    setOrdersDispatched(true);
    showToast('6 Parcels handed over to Pronto & Koombiyo Logistics driver!');
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
      {/* DESKTOP HEADER (Hidden on mobile <1024px, Visible on lg+)                 */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Dashboard Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              Live Store Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Good morning, Store Owner! Here is what&apos;s happening today at LankaDirect.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative">
          {/* Date Range Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{activeDateFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-xs font-semibold">
                {['Today', 'Last 7 Days', 'Last 30 Days', 'This Month', 'This Quarter'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActiveDateFilter(opt);
                      setShowDateDropdown(false);
                      showToast(`Dashboard filtered to: ${opt}`);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-orange-50 hover:text-brand-primary transition-colors ${
                      activeDateFilter === opt ? 'text-brand-primary font-bold bg-orange-50/50' : 'text-slate-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View All Orders */}
          <Link href="/admin/orders">
            <Button
              variant="outline"
              className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
              <span>View All Orders</span>
            </Button>
          </Link>

          {/* + Add New Product */}
          <Link href="/admin/products?action=new">
            <Button className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HERO (Visible on mobile <1024px, Hidden on lg+)                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-4">
        {/* Top Hub Status & Scope Toggle */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Store Online • Pettah Hub Active</span>
          </div>

          {/* Today / This Month Pill Switch */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
            <button
              onClick={() => setMobileTimeScope('today')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                mobileTimeScope === 'today'
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setMobileTimeScope('month')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                mobileTimeScope === 'month'
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Greeting Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50/40 rounded-2xl p-4 border border-orange-100 shadow-2xs space-y-3">
          <div>
            <h2 className="text-xl font-heading font-black text-slate-900 flex items-center gap-1.5">
              Ayubowan, Kasun! 🙏
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Your shop is buzzing today. You have <strong className="text-brand-primary">8 urgent deliveries</strong> queued.
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <Link href="/admin/products?action=new" className="flex-1">
              <Button className="w-full h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Button>
            </Link>

            <Link href="/admin/orders" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-9 rounded-xl bg-white border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                <span>Orders</span>
                <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-black">
                  8 Pending
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6 METRIC KPI CARDS                                                        */}
      {/* Desktop: 6-column grid; Mobile: 2-column x 3-row grid                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* 1. TOTAL SALES */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Sales
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                <Tag className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-lg lg:text-xl font-heading font-black text-slate-900 tracking-tight">
                Rs. 1,485,200
              </p>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <span>↑ 12.4%</span>
                <span className="text-slate-400 font-normal">vs last month</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">30d Gross Total</span>
            <span className="px-1.5 py-0.5 rounded bg-orange-100 text-brand-hover font-bold">
              Demo Data
            </span>
          </div>
        </div>

        {/* 2. TOTAL ORDERS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Orders
              </span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-lg lg:text-xl font-heading font-black text-slate-900 tracking-tight">
                184 Orders
              </p>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>14 placed today</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <Link href="/admin/orders" className="text-slate-500 font-medium hover:text-brand-primary">
              Avg. Rs. 8,071 / order →
            </Link>
          </div>
        </div>

        {/* 3. TOTAL PRODUCTS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Products
              </span>
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Package className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-lg lg:text-xl font-heading font-black text-slate-900 tracking-tight">
                148 Products
              </p>
              <p className="text-[11px] font-bold mt-0.5">
                <span className="text-emerald-600">132 active</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className="text-red-500">16 out</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium truncate">Colombo Warehouse</span>
            <Link href="/admin/products" className="text-brand-primary font-bold hover:underline shrink-0">
              Catalog
            </Link>
          </div>
        </div>

        {/* 4. TOTAL CUSTOMERS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Customers
              </span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-lg lg:text-xl font-heading font-black text-slate-900 tracking-tight">
                412 Customers
              </p>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <span>+28 this month</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium">64% repeat shoppers</span>
            <span className="text-emerald-600 font-bold">✓</span>
          </div>
        </div>

        {/* 5. PENDING ORDERS (Highlight Card) */}
        <div className="bg-[#FFF9F5] rounded-2xl p-4 border border-orange-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover">
                Pending Orders
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-brand-primary tracking-tight">
                8 Orders
              </p>
              <p className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Ready for courier handoff</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-orange-200/60 flex items-center justify-between text-[10px]">
            <Link href="/admin/orders?status=PENDING" className="text-brand-primary font-bold hover:underline">
              Needs Attention Today →
            </Link>
          </div>
        </div>

        {/* 6. LOW STOCK (Warning Card) */}
        <div className="bg-[#FFF5F5] rounded-2xl p-4 border border-red-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                Low Stock
              </span>
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-red-600 tracking-tight">
                5 Items
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Stock threshold ≤ 5 units
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-red-200/60 flex items-center justify-between text-[10px]">
            <button
              onClick={() => setRestockModalOpen(true)}
              className="text-red-600 font-bold hover:underline text-left"
            >
              Critical reorder !
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MIDDLE SECTION: Charts & Operations                                       */}
      {/* Desktop: 2-column (Left chart 8 cols, Right operations 4 cols)             */}
      {/* Mobile: Weekly Revenue Pace chart card                                    */}
      {/* ========================================================================= */}

      {/* --- DESKTOP CHART & RIGHT SIDEBAR (lg+) --- */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        {/* Left: 30-Day Sales Overview Chart (col-span-8) */}
        <div className="col-span-8 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-base text-slate-900">
                    Sales Overview (Past 30 Days)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    LKR Revenue
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Continuous daily performance with campaign highlight peaks
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-brand-primary"></span>
                  <span>Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span>
                  <span>Avg Trend</span>
                </div>
              </div>
            </div>

            {/* SVG Area Chart */}
            <div className="relative mt-6 h-56 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueDesktopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F15A24" stopOpacity="0.32" />
                    <stop offset="60%" stopColor="#F15A24" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#F15A24" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="700" y2="90" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="700" y2="140" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                {/* Average Trend Line */}
                <line x1="0" y1="120" x2="700" y2="70" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Area fill */}
                <path
                  d="M 0 160 
                     C 40 155, 70 148, 110 145 
                     C 150 142, 180 135, 230 120 
                     C 270 110, 310 115, 360 85 
                     C 390 65, 410 25, 440 25 
                     C 470 25, 490 90, 520 80 
                     C 560 70, 600 75, 640 55 
                     C 670 48, 690 50, 700 50 
                     L 700 200 L 0 200 Z"
                  fill="url(#revenueDesktopGrad)"
                />

                {/* Stroke curve */}
                <path
                  d="M 0 160 
                     C 40 155, 70 148, 110 145 
                     C 150 142, 180 135, 230 120 
                     C 270 110, 310 115, 360 85 
                     C 390 65, 410 25, 440 25 
                     C 470 25, 490 90, 520 80 
                     C 560 70, 600 75, 640 55 
                     C 670 48, 690 50, 700 50"
                  fill="none"
                  stroke="#F15A24"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                />

                {/* Peak Point Dot */}
                <circle cx="440" cy="25" r="4.5" fill="#FFFFFF" stroke="#F15A24" strokeWidth="3" />
                <line x1="440" y1="25" x2="440" y2="200" stroke="#F15A24" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
              </svg>

              {/* Callout Marker: Avurudu Flash Sale */}
              <div className="absolute left-[56%] -top-2 -translate-x-1/2 bg-slate-900 text-white rounded-xl px-3 py-2 shadow-xl border border-slate-700 pointer-events-none z-10 animate-pulse">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Avurudu Flash Sale
                  </span>
                </div>
                <div className="text-xs font-black text-white mt-0.5">
                  Rs. 142,000 / day
                </div>
                {/* Tooltip downward caret */}
                <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-slate-700"></div>
              </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mt-3 pt-2 border-t border-slate-100">
              <span>Day 1</span>
              <span>Day 6</span>
              <span>Day 12</span>
              <span className="text-brand-primary font-bold">Day 18 (Avurudu Sale)</span>
              <span>Day 24</span>
              <span className="text-slate-700 font-bold">Today (Day 30)</span>
            </div>
          </div>

          {/* Bottom 3 Stats Row */}
          <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Highest Day
              </span>
              <span className="font-heading font-black text-sm text-slate-900 mt-0.5 block">
                Rs. 142,000
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Daily Average
              </span>
              <span className="font-heading font-black text-sm text-slate-900 mt-0.5 block">
                Rs. 49,506
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Current Run-rate
              </span>
              <span className="font-heading font-black text-sm text-emerald-600 mt-0.5 block">
                +18.2% pacing
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stacked Operations Cards (col-span-4) */}
        <div className="col-span-4 space-y-4">
          {/* 1. Courier Handover Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
                    Courier Handover
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Pronto & Koombiyo Logistics
                  </p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-heading font-black text-xs text-slate-900">
                  {ordersDispatched ? '0 Parcels Waiting' : '6 Parcels Ready'}
                </span>
                <span className="text-[10px] font-bold text-brand-hover bg-orange-100 px-2 py-0.5 rounded-full">
                  Pickup: 2:30 PM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {ordersDispatched
                  ? 'All 6 manifests stamped and dispatch completed for afternoon courier route.'
                  : 'Waybills generated & packages ready for daily 3rd-party dispatch collection.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWaybillsModalOpen(true)}
                className="h-8 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                <span>Print Waybills (6)</span>
              </Button>
              <Button
                size="sm"
                disabled={ordersDispatched}
                onClick={handleMarkDispatched}
                className="h-8 rounded-xl text-xs font-bold"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>{ordersDispatched ? 'Dispatched ✓' : 'Mark Dispatched'}</span>
              </Button>
            </div>
          </div>

          {/* 2. Payment Split Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-black text-xs text-slate-900">
                Payment Split
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold">
                Past 30 Days
              </span>
            </div>

            {/* Visual stacked bar */}
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
              <div className="h-full bg-brand-primary" style={{ width: '78%' }}></div>
              <div className="h-full bg-emerald-500" style={{ width: '22%' }}></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                  <span>Cash on Delivery (COD)</span>
                </div>
                <span className="font-black text-slate-900">78% (144 orders)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Bank Transfer & Cards</span>
                </div>
                <span className="font-black text-slate-900">22% (40 orders)</span>
              </div>
            </div>
          </div>

          {/* 3. Quick Management Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Quick Management
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/inventory"
                className="p-2.5 rounded-xl border border-slate-200 hover:border-brand-primary/50 hover:bg-orange-50/40 transition-colors flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Boxes className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                    Inventory
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    Update stock
                  </span>
                </div>
              </Link>

              <button
                onClick={() => showToast('Sales Report CSV generated and downloaded.')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-2 text-left group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                    Export Sales
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    CSV / Excel
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE CHART CARD (<1024px) --- */}
      <div className="lg:hidden bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-black text-sm text-slate-900">
              Weekly Revenue Pace
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Peak recorded on Poya Weekend Friday
            </p>
          </div>
          <div className="text-right">
            <span className="font-heading font-black text-base text-brand-primary block leading-none">
              Rs. 320,400
            </span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
              +14.2% velocity
            </span>
          </div>
        </div>

        {/* Mini 7-day SVG chart */}
        <div className="relative mt-3 h-36 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 350 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mobilePaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F15A24" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F15A24" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Dashed reference */}
            <line x1="0" y1="30" x2="350" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="0" y1="70" x2="350" y2="70" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="2 2" />

            {/* Area */}
            <path
              d="M 0 100 
                 C 30 95, 60 90, 80 88 
                 C 110 85, 130 95, 160 85 
                 C 190 75, 210 50, 240 22 
                 C 270 20, 290 80, 320 85 
                 L 320 120 L 0 120 Z"
              fill="url(#mobilePaceGrad)"
            />

            {/* Stroke */}
            <path
              d="M 0 100 
                 C 30 95, 60 90, 80 88 
                 C 110 85, 130 95, 160 85 
                 C 190 75, 210 50, 240 22 
                 C 270 20, 290 80, 320 85"
              fill="none"
              stroke="#F15A24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Points on curve */}
            {[
              { cx: 30, cy: 95 },
              { cx: 80, cy: 88 },
              { cx: 130, cy: 92 },
              { cx: 180, cy: 80 },
              { cx: 240, cy: 22 },
              { cx: 285, cy: 75 },
              { cx: 320, cy: 85 },
            ].map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.cx}
                cy={pt.cy}
                r={idx === 4 ? 4.5 : 3}
                fill={idx === 4 ? '#FFFFFF' : '#F15A24'}
                stroke="#F15A24"
                strokeWidth={idx === 4 ? 2.5 : 1}
              />
            ))}
          </svg>

          {/* Peak tooltip on Friday */}
          <div className="absolute left-[68%] -top-1 -translate-x-1/2 bg-slate-900 text-white rounded-md px-2 py-0.5 shadow-md pointer-events-none z-10 text-[10px] font-bold">
            Fri: Rs. 94k
          </div>
        </div>

        {/* Days labels */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-2 border-t border-slate-100">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span className="text-brand-primary font-bold">Fri</span>
          <span className="text-slate-800 font-bold">Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE PENDING ORDERS CARDS (<1024px)                                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-black text-sm text-slate-900">
              Pending Orders
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-black">
              2 Urgents
            </span>
          </div>
          <Link href="/admin/orders" className="text-xs font-bold text-brand-primary hover:underline">
            View All (8)
          </Link>
        </div>

        {/* Mobile Order Card 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-hover font-black text-xs flex items-center justify-center">
                DF
              </div>
              <div>
                <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                  Dinuka Fernando <span className="font-normal text-slate-400">• Colombo 03</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  #LD-84920 • 12 mins ago
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
              {confirmedOrders['84920'] ? 'Confirmed ✓' : 'Pending'}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <span className="font-heading font-black text-slate-900">Rs. 7,550</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:+94771234567"
              className="h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Call Client</span>
            </a>
            <Button
              disabled={confirmedOrders['84920']}
              onClick={() => handleConfirmOrder('84920')}
              className="h-9 rounded-xl text-xs font-bold"
            >
              <Check className="w-3.5 h-3.5 mr-1" />
              <span>{confirmedOrders['84920'] ? 'Confirmed ✓' : 'Confirm Order'}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Order Card 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                MS
              </div>
              <div>
                <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                  Malkanthi Silva <span className="font-normal text-slate-400">• Kandy City</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  #LD-84919 • 34 mins ago
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              ✓ Confirmed
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Bank Transfer (Slip Verified)</span>
            </div>
            <span className="font-heading font-black text-slate-900">Rs. 8,650</span>
          </div>

          <Button
            onClick={() => {
              showToast('Order #LD-84919 marked ready for Pronto/PickMe Courier!');
            }}
            className="w-full h-9 rounded-xl text-xs font-bold"
          >
            <Truck className="w-3.5 h-3.5 mr-1.5" />
            <span>Ready for Courier (Pronto / PickMe)</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LOW STOCK WARNING CARD (<1024px)                                   */}
      {/* ========================================================================= */}
      <div className="lg:hidden bg-white rounded-2xl p-4 border border-red-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-black text-xs text-red-600 leading-tight">
                Low Stock Warning
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold">
                Replenish to prevent delivery halts
              </p>
            </div>
          </div>
          <button
            onClick={() => setRestockModalOpen(true)}
            className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Update Stock</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <Image src="/images/product-kettle.jpg" alt="Singer Kettle" fill className="object-cover" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                  Singer Cordless Kettle...
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  SKU: SK-4402 • Home Dept
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black block">
                4 left
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Min threshold: 10</span>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <Image src="/images/product-tea.jpg" alt="Dilmah Tea" fill className="object-cover" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                  Dilmah Premium...
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  SKU: DL-9921 • Grocery
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black block">
                3 left
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Min threshold: 15</span>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <Image src="/images/product-cinnamon.jpg" alt="MD Jam" fill className="object-cover" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                  MD Woodapple Jam...
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  SKU: MD-2030 • Preserves
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black block">
                5 left
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Min threshold: 12</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP BOTTOM SECTION: Recent Orders Table & Low Stock / Top Selling      */}
      {/* (lg+ visible)                                                             */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        {/* Left Column: Recent Customer Orders Table (col-span-8) */}
        <div className="col-span-8 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-base text-slate-900">
                  Recent Customer Orders
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time storefront checkout activity
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>See all 184 orders</span>
                <span>→</span>
              </Link>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="pb-3 font-black">Order ID</th>
                    <th className="pb-3 font-black">Customer</th>
                    <th className="pb-3 font-black">Items</th>
                    <th className="pb-3 font-black">Total (LKR)</th>
                    <th className="pb-3 font-black">Payment</th>
                    <th className="pb-3 font-black">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5">
                      <p className="font-heading font-black text-slate-900">#LD-84920</p>
                      <p className="text-[10px] text-slate-400 font-normal">10 mins ago</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900">Dinuka Fernando</p>
                      <p className="text-[10px] text-slate-400 font-medium">📍 Colombo 03</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-800">2 items</p>
                      <p className="text-[10px] text-slate-400 font-normal">Singer Kettle + Dilmah Tea</p>
                    </td>
                    <td className="py-3.5 font-heading font-black text-slate-900">
                      Rs. 7,550
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        COD
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-orange-100 text-brand-hover text-[11px] font-black">
                        Pending Confirmation
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5">
                      <p className="font-heading font-black text-slate-900">#LD-84919</p>
                      <p className="text-[10px] text-slate-400 font-normal">42 mins ago</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900">Malkanthi Silva</p>
                      <p className="text-[10px] text-slate-400 font-medium">📍 Kandy</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-800">1 item</p>
                      <p className="text-[10px] text-slate-400 font-normal">Prestige Pressure Cooker</p>
                    </td>
                    <td className="py-3.5 font-heading font-black text-slate-900">
                      Rs. 8,650
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                        Bank Transfer
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black">
                        Confirmed
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5">
                      <p className="font-heading font-black text-slate-900">#LD-84918</p>
                      <p className="text-[10px] text-slate-400 font-normal">2 hrs ago</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900">Rohan Jayasuriya</p>
                      <p className="text-[10px] text-slate-400 font-medium">📍 Galle</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-800">3 items</p>
                      <p className="text-[10px] text-slate-400 font-normal">Ceylon Tea + Handloom</p>
                    </td>
                    <td className="py-3.5 font-heading font-black text-slate-900">
                      Rs. 11,400
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        COD
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-black">
                        Dispatched
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5">
                      <p className="font-heading font-black text-slate-900">#LD-84917</p>
                      <p className="text-[10px] text-slate-400 font-normal">4 hrs ago</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900">Anura Perera</p>
                      <p className="text-[10px] text-slate-400 font-medium">📍 Colombo 05</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-800">1 item</p>
                      <p className="text-[10px] text-slate-400 font-normal">Borosil Glass Set</p>
                    </td>
                    <td className="py-3.5 font-heading font-black text-slate-900">
                      Rs. 4,200
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        COD
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                        Delivered
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sync status footer note */}
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 text-slate-600 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Islandwide Island Direct Delivery network synced</span>
            </div>
            <span className="text-slate-400 font-medium">
              Colombo Hub Dispatch Node #01
            </span>
          </div>
        </div>

        {/* Right Column: Low Stock Alerts & Top Selling Items (col-span-4) */}
        <div className="col-span-4 space-y-4">
          {/* 1. Low Stock Alerts Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <h4 className="font-heading font-black text-xs text-slate-900">
                  Low Stock Alerts
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                5 Items
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Alert Item 1 */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 font-bold text-xs">
                    🍵
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs text-slate-900 leading-tight">
                      Singer 1.8L Electric Kettle
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      SKU: SIN-KT-1800
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black">
                    4 left
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Threshold: 5</span>
                </div>
              </div>

              {/* Alert Item 2 */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    🍃
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs text-slate-900 leading-tight">
                      Dilmah Single Estate 500g
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      SKU: DLM-TEA-500
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black">
                    3 left
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Threshold: 5</span>
                </div>
              </div>

              {/* Alert Item 3 */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    🥣
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs text-slate-900 leading-tight">
                      Philips Food Processor
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      SKU: PHI-FP-700
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black">
                    2 left
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Threshold: 5</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setRestockModalOpen(true)}
              className="w-full h-8 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>Create Restock PO</span>
            </Button>
          </div>

          {/* 2. Top Selling Items Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-black text-xs text-slate-900">
                Top Selling Items
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold">
                This Month
              </span>
            </div>

            <div className="space-y-3">
              {/* Top Item 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 truncate">
                    1. Singer 1.8L Electric Kettle
                  </span>
                  <span className="font-black text-brand-primary shrink-0 ml-2">
                    42 sold
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '92%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400">Rs. 157,500 Gross Volume</p>
              </div>

              {/* Top Item 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 truncate">
                    2. Dilmah Single Estate 500g
                  </span>
                  <span className="font-black text-brand-primary shrink-0 ml-2">
                    38 sold
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400">Rs. 57,000 Gross Volume</p>
              </div>

              {/* Top Item 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 truncate">
                    3. Prestige Pressure Cooker
                  </span>
                  <span className="font-black text-brand-primary shrink-0 ml-2">
                    29 sold
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400">Rs. 250,850 Gross Volume</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Catalog Health: High Demand</span>
              <Link href="/admin/products" className="text-brand-primary font-bold hover:underline">
                View All →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE COD SETTLEMENT SYNC BANNER (<1024px)                                */}
      {/* ========================================================================= */}
      <div className="lg:hidden p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-heading font-black text-xs text-emerald-950 leading-tight">
            Island-wide COD Settlement Sync
          </h4>
          <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
            BOC & Sampath Bank gateway verified today at 09:30 AM.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: Print Waybills Modal                                             */}
      {/* ========================================================================= */}
      {waybillsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Pronto & Koombiyo Courier Waybills (6)
                </h3>
              </div>
              <button
                onClick={() => setWaybillsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Ready-to-print batch waybills with barcodes, consignee addresses, and islandwide COD remittal tags.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
              {[
                { id: 'LD-84920', client: 'Dinuka Fernando', dest: 'Colombo 03', lkr: '7,550' },
                { id: 'LD-84919', client: 'Malkanthi Silva', dest: 'Kandy City', lkr: '8,650' },
                { id: 'LD-84918', client: 'Rohan Jayasuriya', dest: 'Galle Outstation', lkr: '11,400' },
                { id: 'LD-84916', client: 'Nimali Samarasinghe', dest: 'Kurunegala', lkr: '5,800' },
                { id: 'LD-84915', client: 'Sunil Weerakkody', dest: 'Gampaha', lkr: '12,900' },
                { id: 'LD-84914', client: 'Priyani Alwis', dest: 'Matara Town', lkr: '6,450' },
              ].map((w) => (
                <div key={w.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">#{w.id}</span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span className="font-medium text-slate-700">{w.client}</span>
                    <span className="text-[10px] text-slate-400 block">{w.dest}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-black text-brand-primary">Rs. {w.lkr}</span>
                    <span className="text-[10px] text-emerald-600 block font-bold">COD Stamp ✓</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWaybillsModalOpen(false)}
                className="h-9 px-4 rounded-xl text-xs font-bold"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setWaybillsModalOpen(false);
                  showToast('6 Waybill PDFs sent to system default thermal printer!');
                }}
                className="h-9 px-4 rounded-xl text-xs font-bold gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print All 6 Waybills</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: Create Restock Purchase Order (PO)                               */}
      {/* ========================================================================= */}
      {restockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-500" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Quick Restock Purchase Order
                </h3>
              </div>
              <button
                onClick={() => setRestockModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Generate expedited restock dispatch orders directly to official brand distributors in Sri Lanka.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Low Stock Item</label>
                <select className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800">
                  <option>Singer 1.8L Electric Kettle (4 units left - Threshold 5)</option>
                  <option>Dilmah Single Estate 500g (3 units left - Threshold 5)</option>
                  <option>Philips Food Processor (2 units left - Threshold 5)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Restock Quantity</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Authorized Distributor Node</label>
                <input
                  type="text"
                  readOnly
                  value="Singer Sri Lanka PLC (Pettah Central Logistics Hub)"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRestockModalOpen(false)}
                className="h-9 px-4 rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setRestockModalOpen(false);
                  showToast('Restock Purchase Order PO-2026-049 dispatched to Singer Sri Lanka!');
                }}
                className="h-9 px-4 rounded-xl text-xs font-bold"
              >
                Dispatch Restock PO
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
