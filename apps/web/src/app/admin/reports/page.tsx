'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileText,
  Calendar,
  Building2,
  Receipt,
  ShoppingBag,
  Package,
  Truck,
  ArrowUpRight,
  PieChart,
  CreditCard,
  Sliders,
  Search,
  CheckCircle2,
  X,
  ShieldCheck,
  RefreshCw,
  Clock,
  Layers,
  ArrowRight,
  Percent,
  Check,
  ChevronDown,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopProduct {
  id: string;
  rank: number;
  name: string;
  sku: string;
  category: string;
  categoryBadgeColor: string;
  image: string;
  unitsSold: number;
  sellingPrice: number;
  unitCost: number;
  totalRevenue: number;
  grossProfit: number;
  marginPercent: number;
}

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: 'prod-1',
    rank: 1,
    name: 'Singer 1.8L Electric Kettle',
    sku: 'SIN-KT-1800',
    category: 'Home & Kitchen',
    categoryBadgeColor: 'bg-slate-100 text-slate-700',
    image: '/images/product-kettle.jpg',
    unitsSold: 42,
    sellingPrice: 4950,
    unitCost: 3800,
    totalRevenue: 207900,
    grossProfit: 48300,
    marginPercent: 23.2,
  },
  {
    id: 'prod-2',
    rank: 2,
    name: 'Dilmah Ceylon Black Tea 500g',
    sku: 'DLM-TEA-500',
    category: 'Ceylon Grocery',
    categoryBadgeColor: 'bg-emerald-100 text-emerald-800',
    image: '/images/product-tea.jpg',
    unitsSold: 38,
    sellingPrice: 2150,
    unitCost: 1450,
    totalRevenue: 81700,
    grossProfit: 26600,
    marginPercent: 32.5,
  },
  {
    id: 'prod-3',
    rank: 3,
    name: 'Philips Food Processor 450W',
    sku: 'PHI-FP-450',
    category: 'Home & Kitchen',
    categoryBadgeColor: 'bg-slate-100 text-slate-700',
    image: '/images/product-processor.jpg',
    unitsSold: 14,
    sellingPrice: 14800,
    unitCost: 11200,
    totalRevenue: 207200,
    grossProfit: 50400,
    marginPercent: 24.3,
  },
  {
    id: 'prod-4',
    rank: 4,
    name: 'Borosil Airtight Glass Set',
    sku: 'BOR-GS-3PC',
    category: 'Home & Kitchen',
    categoryBadgeColor: 'bg-slate-100 text-slate-700',
    image: '/images/product-storage.jpg',
    unitsSold: 22,
    sellingPrice: 4200,
    unitCost: 3100,
    totalRevenue: 92400,
    grossProfit: 24200,
    marginPercent: 26.2,
  },
  {
    id: 'prod-5',
    rank: 5,
    name: 'Spa Ceylon De-Stress Balm',
    sku: 'SPA-BALM-50',
    category: 'Beauty & Care',
    categoryBadgeColor: 'bg-purple-100 text-purple-800',
    image: '/images/product-balm.jpg',
    unitsSold: 31,
    sellingPrice: 3250,
    unitCost: 2400,
    totalRevenue: 100750,
    grossProfit: 26350,
    marginPercent: 26.1,
  },
];

export default function AdminSalesReportsPage() {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'quarter'>('30d');
  const [mobileTimePill, setMobileTimePill] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReconciling, setIsReconciling] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReconcile = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      showToast('Pronto & Koombiyo COD ledger successfully reconciled with Commercial Bank A/C.');
    }, 1200);
  };

  const handleExportCSV = () => {
    showToast('Exporting Sales Revenue & Product Margins CSV...');
  };

  const handleExportPDF = () => {
    showToast('Generating official LankaDirect Fiscal YTD PDF Financial Report...');
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return TOP_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
          <span className="text-slate-700 font-bold">Sales Reports &amp; Financial Insights</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
            LIVE LEDGER V2.4
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-heading font-black text-slate-900">
                Store Sales &amp; Revenue Performance
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                Fiscal YTD
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Track sales velocity, product gross margins, and payment collection status. All figures shown as verified retail demo records.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="h-10 px-4 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </Button>

            <button
              onClick={handleExportPDF}
              className="h-10 px-4 rounded-xl bg-[#78350F] hover:bg-[#602B0C] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF Report</span>
            </button>
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
            <span>Demo Store Mode</span>
          </div>

          <button
            onClick={handleExportCSV}
            className="h-8 px-3 rounded-xl bg-orange-50 text-brand-primary text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Export CSV</span>
          </button>
        </div>

        <h2 className="text-2xl font-heading font-black text-slate-900">
          Sales Reports
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* TIME RANGE FILTER TOOLBAR                                                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs space-y-2">
        {/* Desktop Filter Row */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              RANGE:
            </span>
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setTimeRange('today')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === 'today'
                    ? 'bg-brand-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === '7d'
                    ? 'bg-brand-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === '30d'
                    ? 'bg-brand-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setTimeRange('quarter')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === 'quarter'
                    ? 'bg-brand-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                This Quarter
              </button>
            </div>

            {/* Date range picker pill */}
            <div className="h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Apr 12 – May 11, 2025</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Sync indicator */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Ledger Synced (Colombo Main)</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">Updated 4m ago</span>
          </div>
        </div>

        {/* Mobile Filter Row */}
        <div className="lg:hidden flex items-center justify-between gap-2">
          <div className="h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="flex items-center gap-1 text-xs font-bold">
            {(['7D', '30D', '90D', '1Y'] as const).map((pill) => (
              <button
                key={pill}
                onClick={() => setMobileTimePill(pill)}
                className={`px-2.5 py-1.5 rounded-xl transition-all ${
                  mobileTimePill === pill
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FINANCIAL CLARITY NOTE BANNER                                             */}
      {/* ========================================================================= */}
      <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex items-start justify-between gap-3 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-hover flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 font-bold block text-xs">
              Financial Clarity Note
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5 max-w-4xl">
              Gross Profit = Net Product Revenue minus Wholesale Cost of Goods. Islandwide courier fees and uncollected Cash on Delivery (COD) balances are tracked separately to avoid inflated revenue statements.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px] font-bold shrink-0">
          Base: LKR (Rs.)
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 5 KPI METRICS ROW                                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* 1. Total Sales Revenue */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1 border-b-4 border-b-emerald-500">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Sales Revenue
              </span>
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-slate-400">Rs. </span>
              <span className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                1,485,200
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <span>↗</span> +14.8%
            </span>
            <span className="text-slate-400 font-medium">184 orders</span>
          </div>
        </div>

        {/* 2. Est. Gross Profit */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between border-b-4 border-b-emerald-500">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Est. Gross Profit
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-slate-400">Rs. </span>
              <span className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                382,400
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <span>↗</span>
            <span>25.7% Avg Margin</span>
          </div>
        </div>

        {/* 3. Average Order Value */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between border-b-4 border-b-blue-500">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Average Order Value
              </span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-slate-400">Rs. </span>
              <span className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                8,071
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <span>↑</span>
            <span>Rs. 420 vs. prior month</span>
          </div>
        </div>

        {/* 4. Items Dispatched */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between border-b-4 border-b-blue-500">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Items Dispatched
              </span>
              <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                248 Units
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>148 Active SKUs</span>
            <span>• 1.35 items/order</span>
          </div>
        </div>

        {/* 5. COD Remittance */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1 border-b-4 border-b-brand-primary">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                COD Remittance
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400">Rs. </span>
                <span className="text-2xl font-heading font-black text-brand-primary tracking-tight">
                  182,500
                </span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-brand-hover">
                In Transit
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>60 courier runs</span>
            <span className="text-emerald-700 font-bold">Rs. 1.30M Verified</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MIDDLE SECTION: Daily Revenue Curve & Category / Payment Share            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Daily Sales Revenue Trend (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Daily Sales Revenue Trend
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Rolling 30-day billing &amp; daily remittance cycle (Colombo Hub)
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-brand-primary"></span>
                <span className="text-slate-700">Collected Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400"></span>
                <span className="text-slate-500">In-Transit COD</span>
              </div>
            </div>
          </div>

          {/* Festival Peak Alert Banner */}
          <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-center gap-2.5 text-xs text-slate-700">
            <TrendingUp className="w-4 h-4 text-brand-primary shrink-0" />
            <span>
              <strong>Festival Peak Detected:</strong> Sinhala &amp; Tamil New Year season recorded peak revenue of <strong>Rs. 142,000</strong> on Day 18 (April 13).
            </span>
          </div>

          {/* Responsive SVG Area Chart */}
          <div className="relative w-full h-64 sm:h-72 pt-4">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 650 220"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA580C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#EA580C" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="20" x2="650" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x="5" y="16" fill="#94A3B8" fontSize="10" fontWeight="bold">
                Rs. 150k
              </text>

              <line x1="0" y1="80" x2="650" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x="5" y="76" fill="#94A3B8" fontSize="10" fontWeight="bold">
                Rs. 100k
              </text>

              <line x1="0" y1="140" x2="650" y2="140" stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x="5" y="136" fill="#94A3B8" fontSize="10" fontWeight="bold">
                Rs. 50k
              </text>

              {/* Bottom line */}
              <line x1="0" y1="190" x2="650" y2="190" stroke="#CBD5E1" strokeWidth="1" />

              {/* In-Transit COD Dashed Curve */}
              <path
                d="M 20 180 C 80 175, 140 170, 200 160 C 260 150, 310 130, 350 120 C 400 135, 480 150, 560 160 C 600 165, 630 160, 640 155"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Collected Revenue Area Fill */}
              <path
                d="M 20 170 C 80 160, 140 150, 200 140 C 260 130, 280 110, 310 70 C 330 35, 345 30, 355 30 C 365 30, 380 65, 410 120 C 450 145, 520 125, 580 130 C 610 132, 630 125, 640 120 L 640 190 L 20 190 Z"
                fill="url(#orangeGradient)"
              />

              {/* Collected Revenue Solid Stroke Line */}
              <path
                d="M 20 170 C 80 160, 140 150, 200 140 C 260 130, 280 110, 310 70 C 330 35, 345 30, 355 30 C 365 30, 380 65, 410 120 C 450 145, 520 125, 580 130 C 610 132, 630 125, 640 120"
                fill="none"
                stroke="#EA580C"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Peak Point Guideline & Callout (Day 18 / April 13) */}
              <line
                x1="355"
                y1="30"
                x2="355"
                y2="190"
                stroke="#EA580C"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Peak Circle */}
              <circle cx="355" cy="30" r="5" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2.5" />

              {/* Peak Badge Callout */}
              <g transform="translate(325, 8)">
                <rect x="0" y="0" width="105" height="22" rx="6" fill="#0F172A" />
                <text x="52" y="14" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Rs. 142k Peak (D18)
                </text>
              </g>
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-2 px-1">
              <span>Day 1 (Apr 12)</span>
              <span>Day 7</span>
              <span>Day 14</span>
              <span className="text-brand-primary font-black">Day 18 (Peak Avurudu)</span>
              <span>Day 21</span>
              <span>Day 28</span>
              <span>Today (May 11)</span>
            </div>
          </div>
        </div>

        {/* Right: Category Split & Payment Split (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Category Revenue Split */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="font-heading font-black text-sm text-slate-900">
                  Category Revenue Split
                </h4>
                <p className="text-[10px] text-slate-400">
                  Top grossing merchant departments
                </p>
              </div>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 text-xs">
              {/* Home & Kitchen */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                    <span>Home &amp; Kitchen</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    Rs. 624,000 <span className="text-slate-400 font-normal">(42.0%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              {/* Ceylon Grocery & Teas */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Ceylon Grocery &amp; Teas</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    Rs. 386,000 <span className="text-slate-400 font-normal">(26.0%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              {/* Electronics & Gadgets */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Electronics &amp; Gadgets</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    Rs. 297,000 <span className="text-slate-400 font-normal">(20.0%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              {/* Fashion & Beauty */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    <span>Fashion &amp; Beauty</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    Rs. 178,200 <span className="text-slate-400 font-normal">(12.0%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Payment Method Share */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="font-heading font-black text-sm text-slate-900">
                  Payment Method Share
                </h4>
                <p className="text-[10px] text-slate-400">
                  Cash on Delivery vs. Instant Bank/Card
                </p>
              </div>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>

            {/* Split Progress Bar */}
            <div className="h-6 w-full rounded-xl overflow-hidden flex font-heading font-black text-[10px] text-white">
              <div
                className="bg-brand-primary flex items-center justify-center transition-all"
                style={{ width: '78%' }}
              >
                78% COD
              </div>
              <div
                className="bg-emerald-600 flex items-center justify-center transition-all"
                style={{ width: '22%' }}
              >
                22%
              </div>
            </div>

            {/* 2 Stat Boxes below */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover block">
                  Cash on Delivery
                </span>
                <strong className="font-heading font-black text-sm text-slate-900 block">
                  Rs. 1,158,450
                </strong>
                <span className="text-[10px] text-slate-400 block font-medium">
                  78% total volume (143 orders)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                  Direct Card / Transfer
                </span>
                <strong className="font-heading font-black text-sm text-slate-900 block">
                  Rs. 326,750
                </strong>
                <span className="text-[10px] text-emerald-700 block font-bold">
                  22% instant settlement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: Top Performing Products & Margin Analysis Table           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-base text-slate-900">
                Top Performing Products &amp; Margin Analysis
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                Top 5 by Volume
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Direct comparison of unit COGS, actual selling price, and net gross contribution.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter SKU or name..."
                className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
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

            <Button
              variant="outline"
              onClick={() => showToast('Column preferences saved.')}
              className="h-9 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Columns</span>
            </Button>
          </div>
        </div>

        {/* Products Table (Desktop) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-black">Product Name &amp; SKU</th>
                <th className="py-3 px-4 font-black">Category</th>
                <th className="py-3 px-4 font-black text-center">Units Sold</th>
                <th className="py-3 px-4 font-black text-right">Selling Price</th>
                <th className="py-3 px-4 font-black text-right">Unit Cost (COGS)</th>
                <th className="py-3 px-4 font-black text-right">Total Revenue</th>
                <th className="py-3 px-4 font-black text-right">Gross Profit</th>
                <th className="py-3 px-4 font-black text-center">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Product Name & SKU */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                          {p.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-400 font-medium mt-0.5">
                          SKU: {p.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.categoryBadgeColor}`}
                    >
                      {p.category}
                    </span>
                  </td>

                  {/* Units Sold */}
                  <td className="py-3.5 px-4 text-center font-heading font-black text-xs text-slate-900">
                    {p.unitsSold}
                  </td>

                  {/* Selling Price */}
                  <td className="py-3.5 px-4 text-right text-slate-700 font-medium">
                    Rs. {p.sellingPrice.toLocaleString()}
                  </td>

                  {/* Unit Cost (COGS) */}
                  <td className="py-3.5 px-4 text-right text-slate-500 font-medium">
                    Rs. {p.unitCost.toLocaleString()}
                  </td>

                  {/* Total Revenue */}
                  <td className="py-3.5 px-4 text-right font-heading font-black text-xs text-slate-900">
                    Rs. {p.totalRevenue.toLocaleString()}
                  </td>

                  {/* Gross Profit */}
                  <td className="py-3.5 px-4 text-right font-heading font-black text-xs text-emerald-600">
                    Rs. {p.grossProfit.toLocaleString()}
                  </td>

                  {/* Margin % */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                        p.marginPercent >= 30
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.marginPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Top Selling Products List (390px Artboard) */}
        <div className="lg:hidden divide-y divide-slate-100">
          <div className="p-3 bg-slate-50/70 flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Ranked by overall net margin and sales volume</span>
            <button className="text-brand-primary font-bold">Sort</button>
          </div>

          {filteredProducts.map((p) => (
            <div key={p.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-900 text-white font-heading font-black text-[10px] flex items-center justify-center border-2 border-white">
                    {p.rank}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-heading font-black text-xs text-slate-900 truncate">
                      {p.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold shrink-0">
                      {p.unitsSold} sold
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                    Appliance SKU: {p.sku}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block">Gross Revenue</span>
                  <strong className="font-heading font-black text-slate-900 block mt-0.5">
                    Rs. {p.totalRevenue.toLocaleString()}
                  </strong>
                </div>

                <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-800 block">Gross Profit (Net COGS)</span>
                  <strong className="font-heading font-black text-emerald-600 block mt-0.5">
                    Rs. {p.grossProfit.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="p-3.5 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Showing <strong className="text-slate-800">5 of 148</strong> product records • Aggregated across 184 completed invoices
          </span>

          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs">
              Previous
            </button>
            <span className="px-3 py-1 font-bold text-slate-800 text-xs">
              Page 1 of 30
            </span>
            <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM BANNER: Pronto & Koombiyo COD Reconciliation                       */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-hover flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-black text-sm text-slate-900">
              Pronto &amp; Koombiyo COD Reconciliation
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Last batch of <strong className="text-slate-800 font-bold">Rs. 248,000</strong> received into Commercial Bank A/C (ending 4091) on May 10, 2025.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link
            href="/admin/orders?payment=cod"
            className="flex-1 sm:flex-none h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-500" />
            <span>View Pending COD Orders</span>
          </Link>

          <Button
            onClick={handleReconcile}
            disabled={isReconciling}
            className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReconciling ? 'animate-spin' : ''}`} />
            <span>{isReconciling ? 'Reconciling...' : 'Reconcile Gateway'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
