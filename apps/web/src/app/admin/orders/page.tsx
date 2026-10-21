'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
  Phone,
  Printer,
  Barcode,
  ScanBarcode,
  ExternalLink,
  ShieldCheck,
  Building2,
  Check,
  X,
  CreditCard,
  Banknote,
  Send,
  Boxes,
  HelpCircle,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  orderNumber: string;
  isNew?: boolean;
  channel: string;
  customerName: string;
  customerCity: string;
  customerProvince: string;
  customerPhone: string;
  customerAvatar: string;
  customerAvatarBg: string;
  timestamp: string;
  timeFormatted: string;
  itemsSummary: string;
  itemsCount: number;
  itemThumbnail?: string;
  totalLKR: number;
  courierFeeNote: string;
  paymentMethod: 'COD' | 'Bank Transfer' | 'Card';
  paymentStatus: 'Unpaid' | 'Paid';
  orderStatus: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  courierPartner?: string;
  waybillNumber?: string;
  signatureOnFile?: boolean;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: '#LD-84920',
    isNew: true,
    channel: 'Web Checkout',
    customerName: 'Dinuka Fernando',
    customerCity: 'Colombo 03 (Colpetty)',
    customerProvince: 'Western Province',
    customerPhone: '+94 77 123 4567',
    customerAvatar: 'DF',
    customerAvatarBg: 'bg-orange-100 text-brand-hover',
    timestamp: 'May 24, 2025 • 10:42 AM',
    timeFormatted: 'Today, 10:42 AM • Web Express',
    itemsSummary: 'Singer 1.8L Kettle, Dilmah Ceylon Black Tea 500g',
    itemsCount: 2,
    itemThumbnail: '/images/bundle-kettle-tea.jpg',
    totalLKR: 7550,
    courierFeeNote: 'Inc. Rs. 450 courier',
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    courierPartner: 'Domex Express',
  },
  {
    id: 'ord-2',
    orderNumber: '#LD-84919',
    channel: 'Web Checkout',
    customerName: 'Malkanthi Silva',
    customerCity: 'Kandy Central',
    customerProvince: 'Central Province',
    customerPhone: '+94 71 987 6543',
    customerAvatar: 'MS',
    customerAvatarBg: 'bg-blue-100 text-blue-700',
    timestamp: 'May 24, 2025 • 09:15 AM',
    timeFormatted: 'Today, 09:15 AM • Mobile App',
    itemsSummary: 'Prestige Pressure Cooker 3L, Spices Bundle',
    itemsCount: 3,
    itemThumbnail: '/images/product-cooker.jpg',
    totalLKR: 8650,
    courierFeeNote: 'Free Delivery Promo',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    courierPartner: 'Pronto Logistics',
  },
  {
    id: 'ord-3',
    orderNumber: '#LD-84918',
    channel: 'Phone Order',
    customerName: 'Rohan Jayasuriya',
    customerCity: 'Galle Fort',
    customerProvince: 'Southern Province',
    customerPhone: '+94 76 555 4321',
    customerAvatar: 'RJ',
    customerAvatarBg: 'bg-purple-100 text-purple-700',
    timestamp: 'May 23, 2025 • 04:30 PM',
    timeFormatted: 'Yesterday, 04:30 PM • Pronto Courier',
    itemsSummary: 'Ceylon Tea 500g, Pure Cotton Handloom Shirt',
    itemsCount: 3,
    itemThumbnail: '/images/product-tea.jpg',
    totalLKR: 11400,
    courierFeeNote: 'Inc. Rs. 550 courier',
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    orderStatus: 'Dispatched',
    courierPartner: 'Pronto Courier',
    waybillNumber: 'PRN-90234-LK',
  },
  {
    id: 'ord-4',
    orderNumber: '#LD-84917',
    channel: 'Web Checkout',
    customerName: 'Anura Perera',
    customerCity: 'Colombo 05 (Havelock)',
    customerProvince: 'Western Province',
    customerPhone: '+94 77 888 9900',
    customerAvatar: 'AP',
    customerAvatarBg: 'bg-emerald-100 text-emerald-800',
    timestamp: 'May 23, 2025 • 02:18 PM',
    timeFormatted: 'Yesterday, 02:18 PM • Domex',
    itemsSummary: 'Borosil Glass Containers (3-Piece)',
    itemsCount: 1,
    itemThumbnail: '/images/product-storage.jpg',
    totalLKR: 4200,
    courierFeeNote: 'Inc. Rs. 350 courier',
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    courierPartner: 'Domex',
    signatureOnFile: true,
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterTab, setSelectedFilterTab] = useState<
    'all' | 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled'
  >('all');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderItem | null>(null);
  const [batchHandedOver, setBatchHandedOver] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [manifestModalOpen, setManifestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle order confirmation
  const handleConfirmOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, orderStatus: 'Processing', isNew: false }
          : o
      )
    );
    showToast(`Order #${orderId} verified & sent to Colombo packing queue!`);
    if (selectedOrderDetails?.id === orderId) {
      setSelectedOrderDetails((prev) =>
        prev ? { ...prev, orderStatus: 'Processing', isNew: false } : null
      );
    }
  };

  // Mark Batch Handed Over
  const handleBatchHandover = () => {
    setBatchHandedOver(true);
    showToast('12 Domex Packed Packages handed over to dispatch driver!');
  };

  // Select all handler
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerCity.toLowerCase().includes(q) ||
        o.itemsSummary.toLowerCase().includes(q);

      // Tab
      const matchesTab =
        selectedFilterTab === 'all'
          ? true
          : selectedFilterTab === 'pending'
          ? o.orderStatus === 'Pending'
          : selectedFilterTab === 'processing'
          ? o.orderStatus === 'Processing'
          : selectedFilterTab === 'dispatched'
          ? o.orderStatus === 'Dispatched'
          : selectedFilterTab === 'delivered'
          ? o.orderStatus === 'Delivered'
          : o.orderStatus === 'Cancelled';

      return matchesSearch && matchesTab;
    });
  }, [orders, searchQuery, selectedFilterTab]);

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
              Fulfillment Hub
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              • Islandwide Logistics
            </span>
          </div>
          <h1 className="text-2xl font-heading font-black text-slate-900 mt-1">
            Orders &amp; Fulfillment
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer transactions, verify pending cash on delivery requests, and coordinate courier dispatch batches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => showToast('Order history CSV exported.')}
            className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </Button>

          <Button
            onClick={() => {
              setManifestModalOpen(true);
            }}
            className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Create Courier Batch</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (390px Artboard)                                            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-black text-slate-900">
              Orders
            </h2>
            <p className="text-xs text-brand-hover font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              <span>8 orders require rapid review</span>
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
            Live Synced
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6 KPI STATUS CARDS ROW                                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* 1. Total Orders */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total Orders
              </span>
              <ShoppingBag className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-slate-900 tracking-tight">
                184 <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
            Updated 2m ago
          </div>
        </div>

        {/* 2. Action Needed (Highlight) */}
        <div className="bg-[#FFF9F5] rounded-2xl p-4 border border-orange-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover">
                Action Needed
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-brand-primary tracking-tight">
                8 <span className="text-xs font-bold text-amber-700">Pending</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-orange-200/60 text-[10px] text-amber-800 font-bold">
            Requires call or verification
          </div>
        </div>

        {/* 3. In Processing */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                In Processing
              </span>
              <Package className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-slate-900 tracking-tight">
                14 <span className="text-xs font-bold text-slate-400">orders</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
            Colombo packaging desk
          </div>
        </div>

        {/* 4. Dispatched */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Dispatched
              </span>
              <Truck className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-slate-900 tracking-tight">
                12 <span className="text-xs font-bold text-slate-400">active transit</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium truncate">
            Pronto &amp; Domex couriers
          </div>
        </div>

        {/* 5. Delivered */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Delivered
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-emerald-600 tracking-tight">
                146 <span className="text-xs font-bold text-slate-400">orders</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold">
            98.2% on-time SLA
          </div>
        </div>

        {/* 6. Cancelled */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Cancelled
              </span>
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl lg:text-2xl font-heading font-black text-red-600 tracking-tight">
                4 <span className="text-xs font-bold text-slate-400">total</span>
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
            2.1% cancellation rate
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold">
            <button
              onClick={() => setSelectedFilterTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedFilterTab === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All (184)
            </button>

            <button
              onClick={() => setSelectedFilterTab('pending')}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
                selectedFilterTab === 'pending'
                  ? 'bg-brand-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              <span>Pending Review (8)</span>
            </button>

            <button
              onClick={() => setSelectedFilterTab('processing')}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedFilterTab === 'processing'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Processing (14)
            </button>
          </div>

          {/* Search Box & Date */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by ID (#LD-...) or customer"
                className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
              />
              <button
                onClick={() => setIsScannerOpen(true)}
                className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-primary"
              >
                <ScanBarcode className="w-4 h-4" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <button className="hidden sm:flex w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 items-center justify-center transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LOGISTICS CALLOUT: Domex Daily Batch Ready                                */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-black text-sm text-slate-900 leading-tight">
                Domex Express Daily Batch Ready
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                {batchHandedOver ? 'Dispatched' : '12 Packed Packages'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {batchHandedOver
                ? 'All 12 parcels stamped and handed over to Domex route courier driver.'
                : 'Pickup van scheduled at Colombo Hub today at 4:30 PM. Complete handoff sheets before courier arrival.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setManifestModalOpen(true)}
            className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span>Print Shipping Manifest</span>
          </Button>

          <Button
            size="sm"
            disabled={batchHandedOver}
            onClick={handleBatchHandover}
            className="flex-1 sm:flex-none h-9 px-4 rounded-xl text-xs font-bold shadow-xs"
          >
            <Check className="w-3.5 h-3.5 mr-1.5" />
            <span>{batchHandedOver ? 'Handed Over ✓' : 'Mark Batch Handed Over'}</span>
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP ORDERS TABLE (1440px Artboard)                                    */}
      {/* ========================================================================= */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrderIds.length === filteredOrders.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-brand-primary accent-brand-primary cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-black">Order Reference</th>
                <th className="py-3 px-4 font-black">Customer Details</th>
                <th className="py-3 px-4 font-black">Order Timestamp</th>
                <th className="py-3 px-4 font-black">Purchased Items</th>
                <th className="py-3 px-4 text-right font-black">Order Total (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredOrders.map((ord) => {
                const isSelected = selectedOrderIds.includes(ord.id);

                return (
                  <tr
                    key={ord.id}
                    onClick={() => setSelectedOrderDetails(ord)}
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                      isSelected ? 'bg-orange-50/40' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOne(ord.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(ord.id)}
                        className="w-4 h-4 rounded text-brand-primary accent-brand-primary cursor-pointer"
                      />
                    </td>

                    {/* Order Reference */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-xs text-brand-primary">
                          {ord.orderNumber}
                        </span>
                        {ord.isNew && (
                          <span className="px-1.5 py-0.2 rounded bg-brand-primary text-white text-[9px] font-black uppercase">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                        {ord.channel}
                      </span>
                    </td>

                    {/* Customer Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${ord.customerAvatarBg}`}
                        >
                          {ord.customerAvatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {ord.customerName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            {ord.customerCity}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Order Timestamp */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {ord.timestamp}
                    </td>

                    {/* Purchased Items */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 leading-tight">
                        {ord.itemsCount} items
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1 max-w-xs">
                        {ord.itemsSummary}
                      </p>
                    </td>

                    {/* Order Total (LKR) */}
                    <td className="py-3.5 px-4 text-right">
                      <p className="font-heading font-black text-slate-900 text-sm">
                        Rs. {ord.totalLKR.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {ord.courierFeeNote}
                      </p>
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
            Showing <strong className="text-slate-800">1 to {filteredOrders.length}</strong> of{' '}
            <strong className="text-slate-800">184</strong> customer orders
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
              onClick={() => setCurrentPage(46)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
            >
              46
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
      {/* MOBILE ORDER CARDS (390px Artboard)                                       */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((ord) => {
          const isPending = ord.orderStatus === 'Pending';

          return (
            <div
              key={ord.id}
              className={`bg-white rounded-2xl p-4 border shadow-2xs space-y-3 ${
                isPending ? 'border-orange-300 ring-2 ring-orange-100' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-sm text-slate-900">
                      {ord.orderNumber}
                    </span>
                    {ord.isNew && (
                      <span className="text-[10px] font-black text-brand-primary flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                        <span>New</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    {ord.timeFormatted}
                  </span>
                </div>

                {/* Status Badge */}
                {ord.orderStatus === 'Pending' && (
                  <span className="px-2.5 py-1 rounded-full bg-orange-100 text-brand-hover text-[10px] font-black flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Pending Confirmation</span>
                  </span>
                )}
                {ord.orderStatus === 'Processing' && (
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    <span>Processing</span>
                  </span>
                )}
                {ord.orderStatus === 'Dispatched' && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Dispatched</span>
                  </span>
                )}
                {ord.orderStatus === 'Delivered' && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Delivered</span>
                  </span>
                )}
              </div>

              {/* Customer Box with Quick Call */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-brand-hover font-black text-xs flex items-center justify-center">
                    {ord.customerAvatar[0]}
                  </div>
                  <div>
                    <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                      {ord.customerName}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      📍 {ord.customerCity}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${ord.customerPhone}`}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 text-brand-primary flex items-center justify-center shadow-2xs hover:bg-orange-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Items Preview */}
              {ord.itemThumbnail && (
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                    <Image src={ord.itemThumbnail} alt="Item" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-slate-800 truncate leading-snug">
                      {ord.itemsSummary}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {ord.itemsCount} items • Standard Islandwide Parcel
                    </span>
                  </div>
                </div>
              )}

              {/* Waybill / Signature proof if applicable */}
              {ord.waybillNumber && (
                <div className="text-[11px] text-brand-hover font-mono font-bold flex items-center gap-1">
                  <span>↗ Waybill: {ord.waybillNumber}</span>
                </div>
              )}
              {ord.signatureOnFile && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Customer Signature on file</span>
                </div>
              )}

              {/* Total & Payment Method */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                    Total Value
                  </span>
                  <span className="font-heading font-black text-base text-brand-primary block leading-tight">
                    Rs. {ord.totalLKR.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold inline-block">
                    {ord.paymentMethod === 'COD' ? '📦 Cash on Delivery' : '🏦 Bank Transfer'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {ord.paymentStatus === 'Unpaid' ? 'Unpaid • Collect at Door' : 'Paid & Settled'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {isPending ? (
                <Button
                  onClick={() => handleConfirmOrder(ord.id)}
                  className="w-full h-10 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>View Order &amp; Confirm</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrderDetails(ord)}
                  className="w-full h-9 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                >
                  <span>Details</span>
                  <span>&gt;</span>
                </Button>
              )}
            </div>
          );
        })}

        {/* Mobile Bottom Daily Packing Slips Banner */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                Daily Packing Slips
              </span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                Ready to print batch for today (22)
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast('Batch packing slips PDF generated.')}
            className="h-8 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-800"
          >
            Batch Export
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 BOTTOM INFO CARDS (Desktop View)                                        */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-3 gap-5 pt-2">
        {/* Card 1 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-orange-50 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
              Cash on Delivery Verification
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Always call high-value orders (&gt;Rs. 10,000) prior to packing to reduce return-to-origin courier charges.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
            <ScanBarcode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
              Scan Waybill Barcodes
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Directly scan courier consignment notes during evening handoffs to bulk-update transit waybills.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <Banknote className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
              Remittance Schedule
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Domex and Pronto COD remittances are deposited into your Commercial Bank account every Tuesday and Friday.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ORDER DETAILS                                                      */}
      {/* ========================================================================= */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base text-slate-900">
                  Order Details: {selectedOrderDetails.orderNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-bold">
                  {selectedOrderDetails.orderStatus}
                </span>
              </div>

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Contact */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  {selectedOrderDetails.customerName}
                </span>
                <a
                  href={`tel:${selectedOrderDetails.customerPhone}`}
                  className="font-bold text-brand-primary flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>{selectedOrderDetails.customerPhone}</span>
                </a>
              </div>
              <p className="text-slate-500 text-[11px]">
                📍 {selectedOrderDetails.customerCity}, {selectedOrderDetails.customerProvince}
              </p>
              <p className="text-slate-400 text-[10px]">
                Created: {selectedOrderDetails.timestamp} via {selectedOrderDetails.channel}
              </p>
            </div>

            {/* Order Items Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">
                Purchased Items ({selectedOrderDetails.itemsCount})
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-[11px]">
                {selectedOrderDetails.itemsSummary}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/60 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Payment Method:</span>
                <span className="font-bold text-slate-900">
                  {selectedOrderDetails.paymentMethod} ({selectedOrderDetails.paymentStatus})
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-1 border-t border-orange-200/50">
                <span>Grand Total:</span>
                <span className="text-brand-primary">
                  Rs. {selectedOrderDetails.totalLKR.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast(`Thermal packing slip printed for ${selectedOrderDetails.orderNumber}`);
                }}
                className="h-9 px-3.5 rounded-xl text-xs font-bold gap-1"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Packing Slip</span>
              </Button>

              {selectedOrderDetails.orderStatus === 'Pending' && (
                <Button
                  size="sm"
                  onClick={() => handleConfirmOrder(selectedOrderDetails.id)}
                  className="h-9 px-4 rounded-xl text-xs font-bold gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Order</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SHIPPING MANIFEST PREVIEW                                          */}
      {/* ========================================================================= */}
      {manifestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center mx-auto">
              <Printer className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-black text-base text-slate-900 leading-tight">
              Domex Daily Manifest Sheet (12 Parcels)
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidated courier dispatch batch sheet generated for Colombo Hub pickup. Includes consignee phone numbers, barcode manifests, and islandwide COD remittal sums.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total COD Collections:</span>
                <strong className="text-slate-900 font-bold">Rs. 94,800.00</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Colombo Hub Handover:</span>
                <strong className="text-slate-900 font-bold">4:30 PM Today</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Button
                variant="outline"
                onClick={() => setManifestModalOpen(false)}
                className="h-9 rounded-xl text-xs font-bold"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setManifestModalOpen(false);
                  showToast('Daily Manifest Sheet sent to thermal printer!');
                }}
                className="h-9 rounded-xl text-xs font-bold"
              >
                Print Manifest Sheet
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
                Order Barcode Scanner
              </span>
              <button onClick={() => setIsScannerOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white">
              <ScanBarcode className="w-16 h-16 text-brand-primary animate-pulse" />
              <div className="w-40 h-0.5 bg-red-500 shadow-md animate-bounce mt-4"></div>
              <p className="text-[10px] text-slate-300 mt-2">
                Point camera at order invoice or waybill barcode
              </p>
            </div>

            <Button
              onClick={() => {
                setSearchQuery('LD-84920');
                setIsScannerOpen(false);
                showToast('Scanned Order: #LD-84920 (Dinuka Fernando)');
              }}
              className="w-full h-9 rounded-xl text-xs font-bold"
            >
              Simulate Scan: #LD-84920
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
