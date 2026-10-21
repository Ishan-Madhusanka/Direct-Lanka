'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Boxes,
  Package,
  ShieldCheck,
  AlertTriangle,
  ShoppingCart,
  Search,
  Download,
  Filter,
  RotateCcw,
  Plus,
  Minus,
  Check,
  X,
  Truck,
  FileSpreadsheet,
  CheckCircle2,
  ScanBarcode,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowRight,
  ClipboardList,
  Sparkles,
  FileText,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  hubTag: string;
  category: string;
  unitPrice: number;
  onHandStock: number;
  lowAlertThreshold: number;
  image: string;
  shelfLocation: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Electric Fast-Boil Kettle 1.8L',
    sku: 'SIN-KT-1800',
    hubTag: 'Standard Hub',
    category: 'Home & Kitchen',
    unitPrice: 4950,
    onHandStock: 28,
    lowAlertThreshold: 5,
    image: '/images/product-kettle.jpg',
    shelfLocation: 'Shelf 01-Rack 2',
  },
  {
    id: 'inv-2',
    name: 'Premium Ceylon Black Tea 500g',
    sku: 'DLM-TEA-500',
    hubTag: 'Hill Country Harvest',
    category: 'Ceylon Grocery',
    unitPrice: 2150,
    onHandStock: 3,
    lowAlertThreshold: 5,
    image: '/images/product-tea.jpg',
    shelfLocation: 'Shelf 02-Rack 4',
  },
  {
    id: 'inv-3',
    name: 'Multi-Blade Food Processor 450W',
    sku: 'PHI-FP-450',
    hubTag: 'Kitchen Tech',
    category: 'Home & Kitchen',
    unitPrice: 14800,
    onHandStock: 12,
    lowAlertThreshold: 4,
    image: '/images/product-processor.jpg',
    shelfLocation: 'Shelf 03-Rack 1',
  },
  {
    id: 'inv-4',
    name: 'Borosil Airtight Glass Set (3-Piece)',
    sku: 'BOR-GS-3PC',
    hubTag: 'Stock Depleted',
    category: 'Home & Kitchen',
    unitPrice: 4200,
    onHandStock: 0,
    lowAlertThreshold: 5,
    image: '/images/product-storage.jpg',
    shelfLocation: 'Shelf 01-Rack 5',
  },
  {
    id: 'inv-5',
    name: 'Twin Jar Heavy Mixer Grinder 550W',
    sku: 'PRE-MG-550',
    hubTag: 'Reorder Suggested',
    category: 'Home & Kitchen',
    unitPrice: 18900,
    onHandStock: 2,
    lowAlertThreshold: 4,
    image: '/images/product-grinder.jpg',
    shelfLocation: 'Shelf 04-Rack 3',
  },
  {
    id: 'inv-6',
    name: 'Herbal Calming Wellness Balm 50g',
    sku: 'SPA-BALM-50',
    hubTag: 'Ayur Organics',
    category: 'Beauty & Personal Care',
    unitPrice: 3250,
    onHandStock: 8,
    lowAlertThreshold: 3,
    image: '/images/product-balm.jpg',
    shelfLocation: 'Shelf 05-Rack 2',
  },
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'low' | 'out' | 'in'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Quick Stock Adjustment Modal State
  const [adjustmentTarget, setAdjustmentTarget] = useState<InventoryItem | null>(null);
  const [deltaChange, setDeltaChange] = useState<number>(24);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('New Stock Received');
  const [poReference, setPoReference] = useState<string>('PO-2024-CMB-094 Dilmah Direct');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open adjustment modal
  const handleOpenAdjustment = (item: InventoryItem) => {
    setAdjustmentTarget(item);
    setDeltaChange(24);
    setAdjustmentReason('New Stock Received');
    setPoReference(`PO-2026-CMB-${Math.floor(100 + Math.random() * 900)} ${item.name.split(' ')[0]} Direct`);
  };

  // Apply Stock Adjustment
  const handleApplyAdjustment = () => {
    if (!adjustmentTarget) return;
    const newStock = Math.max(0, adjustmentTarget.onHandStock + deltaChange);
    setItems((prev) =>
      prev.map((it) =>
        it.id === adjustmentTarget.id ? { ...it, onHandStock: newStock } : it
      )
    );
    showToast(
      `Stock updated for ${adjustmentTarget.name}! New on-hand balance: ${newStock} units.`
    );
    setAdjustmentTarget(null);
  };

  // KPI Metrics computation
  const metrics = useMemo(() => {
    const totalTracked = 148;
    const healthyCount = items.filter(
      (it) => it.onHandStock > it.lowAlertThreshold
    ).length;
    const lowCount = items.filter(
      (it) => it.onHandStock > 0 && it.onHandStock <= it.lowAlertThreshold
    ).length;
    const outCount = items.filter((it) => it.onHandStock === 0).length;

    return {
      total: totalTracked,
      healthy: 132,
      healthyPercent: '89.2%',
      low: 5,
      out: 11,
    };
  }, [items]);

  // Filtered Inventory List
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.hubTag.toLowerCase().includes(q);

      // Department
      const matchesDepartment =
        selectedDepartment === 'All' || item.category === selectedDepartment;

      // Filter Tab
      const isLow =
        item.onHandStock > 0 && item.onHandStock <= item.lowAlertThreshold;
      const isOut = item.onHandStock === 0;
      const isIn = item.onHandStock > item.lowAlertThreshold;

      const matchesTab =
        activeFilterTab === 'all'
          ? true
          : activeFilterTab === 'low'
          ? isLow
          : activeFilterTab === 'out'
          ? isOut
          : isIn;

      return matchesSearch && matchesDepartment && matchesTab;
    });
  }, [items, searchQuery, selectedDepartment, activeFilterTab]);

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
      {/* DESKTOP HEADER (1440px Artboard)                                          */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[11px] font-black uppercase tracking-wider">
              Logistics &amp; Hub
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              Updated 4 mins ago
            </span>
          </div>
          <h1 className="text-2xl font-heading font-black text-slate-900 mt-1">
            Inventory &amp; Stock Levels
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track on-hand stock counts, minimum alert thresholds, and catalog availability
          </p>
        </div>

        {/* Direct Hub Sync Card */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 max-w-sm">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xs text-slate-900">
                Direct Hub Sync
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
              Direct stock modifications active without multi-warehouse routing delays
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-black text-slate-900">
              Inventory &amp; Stock
            </h2>
            <p className="text-xs text-slate-400">
              Colombo Central Hub Fulfillment
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            ● Live Sync
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 METRIC CARDS                                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. TOTAL TRACKED ITEMS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Tracked Items
              </span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Package className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-slate-900 tracking-tight">
                {metrics.total} <span className="text-xs font-bold text-slate-400">SKUs</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>100% catalog coverage indexed</span>
          </div>
        </div>

        {/* 2. IN STOCK (HEALTHY) */}
        <div className="bg-white rounded-2xl p-4 border-t-2 border-t-emerald-500 border-x border-b border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                In Stock (Healthy)
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-emerald-600 tracking-tight">
                {metrics.healthy}{' '}
                <span className="text-xs font-bold text-emerald-700">{metrics.healthyPercent}</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <span>↗</span>
            <span>Buffer capacity exceeding 14 days</span>
          </div>
        </div>

        {/* 3. LOW STOCK ALERTS */}
        <div className="bg-[#FFF9F5] rounded-2xl p-4 border-t-2 border-t-brand-primary border-x border-b border-orange-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover">
                Low Stock Alerts
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-primary flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-brand-primary tracking-tight">
                {metrics.low}{' '}
                <span className="text-xs font-bold text-amber-700">Reorder</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-orange-200/60 flex items-center gap-1 text-[10px] text-amber-800 font-bold">
            <span>⚠</span>
            <span>Requires purchase order generation</span>
          </div>
        </div>

        {/* 4. OUT OF STOCK */}
        <div className="bg-[#FFF5F5] rounded-2xl p-4 border-t-2 border-t-red-600 border-x border-b border-red-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                Out of Stock
              </span>
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-red-600 tracking-tight">
                {metrics.out}{' '}
                <span className="text-xs font-bold text-red-700">Urgent</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-red-200/60 flex items-center gap-1 text-[10px] text-red-700 font-bold">
            <span>⚠</span>
            <span>Zero catalog availability currently</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SKU, barcode, or product name..."
              className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
            {/* Mobile Barcode Scanner Icon */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-primary"
              aria-label="Scan Barcode"
            >
              <ScanBarcode className="w-4 h-4" />
            </button>
          </div>

          {/* Department Dropdown */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Home & Kitchen">Home &amp; Kitchen</option>
              <option value="Ceylon Grocery">Ceylon Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion & Apparel">Fashion &amp; Apparel</option>
              <option value="Beauty & Personal Care">Beauty &amp; Personal Care</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <div className="sm:col-span-3 lg:col-span-2 flex items-center justify-end">
            <Button
              variant="outline"
              onClick={() => showToast('Inventory stock levels CSV downloaded.')}
              className="w-full h-10 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 pt-2 border-t border-slate-100 text-xs font-bold">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Quick Filter:
          </span>

          <button
            onClick={() => setActiveFilterTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              activeFilterTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products (148)
          </button>

          <button
            onClick={() => setActiveFilterTab('low')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilterTab === 'low'
                ? 'bg-brand-primary text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
            <span>Low Stock (5)</span>
          </button>

          <button
            onClick={() => setActiveFilterTab('out')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilterTab === 'out'
                ? 'bg-red-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>Out of Stock (11)</span>
          </button>

          <button
            onClick={() => setActiveFilterTab('in')}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilterTab === 'in'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>In Stock (132)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TABLE VIEW (1440px Artboard)                                      */}
      {/* ========================================================================= */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-black">Product Details &amp; SKU</th>
                <th className="py-3 px-4 font-black">Category</th>
                <th className="py-3 px-4 font-black">Unit Price</th>
                <th className="py-3 px-4 font-black">On-Hand Stock</th>
                <th className="py-3 px-4 font-black">Low Alert Threshold</th>
                <th className="py-3 px-4 font-black">Catalog Status</th>
                <th className="py-3 px-4 text-right font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredItems.map((item) => {
                const isOutOfStock = item.onHandStock === 0;
                const isLowStock =
                  item.onHandStock > 0 && item.onHandStock <= item.lowAlertThreshold;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Details & SKU */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-400 font-bold">
                              SKU: {item.sku}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                isOutOfStock
                                  ? 'bg-red-100 text-red-700'
                                  : isLowStock
                                  ? 'bg-orange-100 text-brand-hover'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {item.hubTag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700">
                        {item.category}
                      </span>
                    </td>

                    {/* Unit Price */}
                    <td className="py-3.5 px-4">
                      <span className="font-heading font-black text-slate-900">
                        Rs. {item.unitPrice.toLocaleString()}
                      </span>
                    </td>

                    {/* On-Hand Stock */}
                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <div>
                          <span className="font-heading font-black text-sm text-red-600 block leading-tight">
                            0
                          </span>
                          <span className="text-[10px] font-bold text-red-500 block">
                            Nil on rack
                          </span>
                        </div>
                      ) : isLowStock ? (
                        <div>
                          <span className="font-heading font-black text-sm text-brand-primary block leading-tight">
                            {item.onHandStock}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700 block">
                            Below Min {item.lowAlertThreshold}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-heading font-black text-sm text-slate-900 block leading-tight">
                            {item.onHandStock}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 block">
                            Units available
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Low Alert Threshold */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200">
                        {item.lowAlertThreshold} Units
                      </span>
                    </td>

                    {/* Catalog Status */}
                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-black flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          <span>Out of Stock</span>
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-orange-50 text-brand-hover border border-orange-200 text-[11px] font-black flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>In Stock</span>
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenAdjustment(item)}
                        className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-brand-primary text-slate-600 hover:text-brand-primary flex items-center justify-center transition-colors ml-auto"
                        title="Update Stock Levels"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">1 to {filteredItems.length}</strong> of{' '}
            <strong className="text-slate-800">148</strong> indexed SKUs
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
            >
              &lt;
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 1
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => setCurrentPage(25)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
            >
              25
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LIST CARDS VIEW (390px Artboard)                                   */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3.5">
        {filteredItems.map((item) => {
          const isOutOfStock = item.onHandStock === 0;
          const isLowStock =
            item.onHandStock > 0 && item.onHandStock <= item.lowAlertThreshold;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 font-bold">
                      SKU: {item.sku}
                    </span>
                    {isOutOfStock ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-black">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        Healthy
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-black text-xs text-slate-900 leading-snug line-clamp-1 mt-0.5">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span
                      className={`font-heading font-black text-sm ${
                        isOutOfStock
                          ? 'text-red-600'
                          : isLowStock
                          ? 'text-brand-primary'
                          : 'text-slate-900'
                      }`}
                    >
                      {item.onHandStock} Units
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Min alert: {item.lowAlertThreshold}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.shelfLocation}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenAdjustment(item)}
                  className="h-8 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3 h-3 text-slate-500" />
                  <span>Update Stock</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODAL / BOTTOM SHEET: QUICK STOCK ADJUSTMENT                              */}
      {/* Matches Mobile Screenshot #2 & Desktop Modal View                         */}
      {/* ========================================================================= */}
      {adjustmentTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setAdjustmentTarget(null)}
          ></div>

          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 z-10 animate-in slide-in-from-bottom sm:zoom-in-95">
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2"></div>

            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Quick Stock Adjustment</span>
                </span>
                <h3 className="font-heading font-black text-base text-slate-900 leading-tight mt-0.5">
                  {adjustmentTarget.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  SKU: {adjustmentTarget.sku} • {adjustmentTarget.shelfLocation}
                </p>
              </div>

              <button
                onClick={() => setAdjustmentTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Count Comparison Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  Current On-Hand
                </span>
                <span className="font-heading font-black text-lg text-slate-900 block mt-0.5">
                  {adjustmentTarget.onHandStock} <span className="text-xs font-normal">units</span>
                </span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-400" />

              <div className="text-right">
                <span className="text-[10px] font-bold text-brand-primary block uppercase">
                  New Total Count
                </span>
                <span className="font-heading font-black text-xl text-brand-primary block mt-0.5">
                  {Math.max(0, adjustmentTarget.onHandStock + deltaChange)}{' '}
                  <span className="text-xs font-bold">units</span>
                </span>
              </div>
            </div>

            {/* Quantity Adjustment Counter */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800 text-xs block">
                Quantity Adjustment
              </label>

              <div className="p-3 rounded-2xl bg-indigo-50/20 border border-indigo-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDeltaChange((d) => d - 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <span
                    className={`font-heading font-black text-2xl block leading-tight ${
                      deltaChange > 0
                        ? 'text-emerald-600'
                        : deltaChange < 0
                        ? 'text-red-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {deltaChange > 0 ? `+${deltaChange}` : deltaChange}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    delta change
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setDeltaChange((d) => d + 1)}
                  className="w-10 h-10 rounded-xl bg-brand-primary text-white font-bold text-lg flex items-center justify-center hover:bg-brand-hover shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Presets Row */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setDeltaChange(6)}
                  className={`py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    deltaChange === 6
                      ? 'border-brand-primary bg-orange-50 text-brand-primary shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  +6 (1 Box)
                </button>
                <button
                  type="button"
                  onClick={() => setDeltaChange(12)}
                  className={`py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    deltaChange === 12
                      ? 'border-brand-primary bg-orange-50 text-brand-primary shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  +12 (Case)
                </button>
                <button
                  type="button"
                  onClick={() => setDeltaChange(24)}
                  className={`py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    deltaChange === 24
                      ? 'border-brand-primary bg-orange-50 text-brand-primary shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  +24 (Carton)
                </button>
                <button
                  type="button"
                  onClick={() => setDeltaChange(0)}
                  className="py-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 text-[11px] font-bold transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Adjustment Reason Chips */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 text-xs block">
                Adjustment Reason <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: 'New Stock Received', icon: Truck },
                  { label: 'Cycle Count Audit', icon: ClipboardList },
                  { label: 'Damaged / Expired', icon: AlertTriangle },
                  { label: 'Customer Return', icon: RotateCcw },
                ].map((r) => {
                  const Icon = r.icon;
                  const isSelected = adjustmentReason === r.label;
                  return (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => setAdjustmentReason(r.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reference PO Input */}
            <div className="space-y-1">
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={poReference}
                  onChange={(e) => setPoReference(e.target.value)}
                  placeholder="PO or audit document reference..."
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setAdjustmentTarget(null)}
                className="h-10 rounded-xl text-xs font-bold border-slate-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyAdjustment}
                className="h-10 rounded-xl text-xs font-bold shadow-xs"
              >
                Apply Stock Adjustment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BARCODE SCANNER (Mobile simulation)                                */}
      {/* ========================================================================= */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-heading font-black text-sm text-slate-900">
                Inventory Barcode Scanner
              </span>
              <button onClick={() => setIsScannerOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white">
              <ScanBarcode className="w-16 h-16 text-brand-primary animate-pulse" />
              <div className="w-40 h-0.5 bg-red-500 shadow-md animate-bounce mt-4"></div>
              <p className="text-[10px] text-slate-300 mt-2">
                Point camera at warehouse bin / carton barcode
              </p>
            </div>

            <Button
              onClick={() => {
                setSearchQuery('DLM-TEA-500');
                setIsScannerOpen(false);
                showToast('Scanned SKU: DLM-TEA-500 (Dilmah Tea)');
              }}
              className="w-full h-9 rounded-xl text-xs font-bold"
            >
              Simulate Scan: DLM-TEA-500 (Dilmah Tea)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
