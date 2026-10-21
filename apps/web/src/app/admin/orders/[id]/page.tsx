'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Phone,
  Mail,
  MapPin,
  Truck,
  Building2,
  CreditCard,
  Banknote,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
  Package,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const orderId = rawId.startsWith('LD-') ? `#${rawId}` : rawId.startsWith('%23') ? decodeURIComponent(rawId) : rawId.startsWith('#') ? rawId : `#LD-${rawId}`;

  // Interactive State
  const [orderStatus, setOrderStatus] = useState<'Pending' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled'>('Pending');
  const [isCashCollected, setIsCashCollected] = useState(false);
  const [courierPartner, setCourierPartner] = useState<'Pronto' | 'Domex'>('Pronto');
  const [waybillRef, setWaybillRef] = useState('PRN-90482-CMB');
  const [isEditingWaybill, setIsEditingWaybill] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [printInvoiceOpen, setPrintInvoiceOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmOrder = () => {
    setOrderStatus('Processing');
    showToast('Order confirmed! Transferred to Colombo Packaging Queue (Step 3/5).');
  };

  const handleMarkCashCollected = () => {
    setIsCashCollected(true);
    showToast('COD collection verified! Rs. 7,550 marked as Paid & Settled.');
  };

  const handleCopyWaybill = () => {
    navigator.clipboard.writeText(waybillRef);
    showToast(`Waybill "${waybillRef}" copied to clipboard!`);
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
      {/* DESKTOP BREADCRUMB & HEADER (1440px Artboard)                             */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Link href="/admin/orders" className="hover:text-brand-primary transition-colors">
            Orders
          </Link>
          <span>&gt;</span>
          <span>Order Details</span>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">{orderId}</span>
        </div>

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-black text-slate-900">
              Order {orderId}
            </h1>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Web Express
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                orderStatus === 'Pending'
                  ? 'bg-orange-100 text-brand-hover border border-orange-200'
                  : orderStatus === 'Processing'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              <span>
                {orderStatus === 'Pending'
                  ? 'Pending Confirmation'
                  : orderStatus === 'Processing'
                  ? 'Processing (In Queue)'
                  : orderStatus}
              </span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={() => {
                setOrderStatus('Cancelled');
                showToast(`Order ${orderId} has been cancelled.`);
              }}
              className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 shadow-2xs flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5 text-red-500" />
              <span>Cancel Order</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setPrintInvoiceOpen(true)}
              className="h-9 px-3.5 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Slip &amp; Invoice</span>
            </Button>

            {orderStatus === 'Pending' ? (
              <Button
                onClick={handleConfirmOrder}
                className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm Order</span>
              </Button>
            ) : (
              <Button
                disabled
                className="h-9 px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmed ✓</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE TOP BAR & BANNER (390px Artboard)                                  */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orders</span>
          </Link>
          <span className="font-heading font-black text-xs text-slate-800">
            Order Details
          </span>
        </div>

        {/* Mobile Orange Status Banner */}
        <div className="bg-gradient-to-r from-brand-primary to-orange-500 text-white rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="font-heading font-black text-sm">
                {orderStatus === 'Pending' ? 'Pending Confirmation' : orderStatus}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono font-black">
              {orderId.replace('#', '')}
            </span>
          </div>
          <p className="text-[11px] text-white/90 font-medium">
            Placed: Today, 10:42 AM • Web Order (Direct Checkout)
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN TWO-COLUMN WORKSPACE                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Pipeline, Items, Dispatch, Audit (col-span-8)               */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: FULFILLMENT PIPELINE */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Fulfillment Pipeline
                </span>
                <h3 className="font-heading font-black text-base text-slate-900 leading-tight mt-0.5">
                  Order Progression
                </h3>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-hover text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Confirm order to proceed to packaging</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {/* Step 1: Placed */}
              <div className="text-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-primary font-bold text-xs flex items-center justify-center mx-auto shadow-2xs ring-2 ring-brand-primary/20">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="font-heading font-black text-xs text-slate-900">
                    Order Placed
                  </p>
                  <p className="text-[10px] text-slate-400">May 24, 10:42 AM</p>
                </div>
              </div>

              {/* Step 2: Pending Confirmation */}
              <div className="text-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto shadow-2xs ${
                    orderStatus === 'Pending'
                      ? 'bg-brand-primary text-white ring-4 ring-orange-100'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-black text-xs text-brand-primary">
                    Pending Confirmation
                  </p>
                  <p className="text-[10px] text-amber-700 font-semibold">
                    {orderStatus === 'Pending' ? 'Awaiting Merchant' : 'Verified ✓'}
                  </p>
                </div>
              </div>

              {/* Step 3: Processing */}
              <div className="text-center space-y-1.5 opacity-70">
                <div
                  className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto ${
                    orderStatus === 'Processing'
                      ? 'bg-brand-primary text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-black text-xs text-slate-700">
                    Processing
                  </p>
                  <p className="text-[10px] text-slate-400">Packaging Queue</p>
                </div>
              </div>

              {/* Step 4: Dispatched */}
              <div className="text-center space-y-1.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center mx-auto">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-black text-xs text-slate-700">
                    Dispatched
                  </p>
                  <p className="text-[10px] text-slate-400">Courier Handover</p>
                </div>
              </div>

              {/* Step 5: Delivered */}
              <div className="text-center space-y-1.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center mx-auto">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-black text-xs text-slate-700">
                    Delivered
                  </p>
                  <p className="text-[10px] text-slate-400">Recipient Signed</p>
                </div>
              </div>
            </div>

            {/* Mobile Prominent Action Bar */}
            <div className="lg:hidden space-y-2 pt-2">
              {orderStatus === 'Pending' ? (
                <Button
                  onClick={handleConfirmOrder}
                  className="w-full h-11 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm Order &amp; Release to Warehouse</span>
                </Button>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                  ✓ Order Confirmed &amp; Released to Packaging Desk
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPrintInvoiceOpen(true)}
                  className="h-9 rounded-xl border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setOrderStatus('Cancelled');
                    showToast(`Order ${orderId} cancelled.`);
                  }}
                  className="h-9 rounded-xl border-red-200 text-xs font-bold text-red-600 bg-red-50/50 flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel Order</span>
                </Button>
              </div>
            </div>
          </div>

          {/* CARD 2: ORDER ITEMS (2 SKUs) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Order Items (2 SKUs)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                Colombo Central Hub Fulfillment
              </span>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="pb-3 font-black">Product Details</th>
                    <th className="pb-3 font-black text-center">Warehouse Status</th>
                    <th className="pb-3 font-black text-center">Qty</th>
                    <th className="pb-3 font-black text-right">Unit Price</th>
                    <th className="pb-3 font-black text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {/* Item 1 */}
                  <tr>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src="/images/product-kettle.jpg" alt="Singer Kettle" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                            Singer 1.8L Electric Kettle
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                            <span className="font-mono font-bold">SKU: SIN-KT-1800</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">Original Manufacturer Warranty</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        In Stock (28 units at Colombo Hub)
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-heading font-black text-slate-900">
                      1
                    </td>
                    <td className="py-3.5 text-right font-medium text-slate-600">
                      Rs. 4,950
                    </td>
                    <td className="py-3.5 text-right font-heading font-black text-slate-900">
                      Rs. 4,950
                    </td>
                  </tr>

                  {/* Item 2 */}
                  <tr>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src="/images/product-tea.jpg" alt="Dilmah Tea" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-heading font-black text-xs text-slate-900 leading-tight">
                            Dilmah Single Estate 500g
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                            <span className="font-mono font-bold">SKU: DLM-TEA-500</span>
                            <span>•</span>
                            <span className="text-slate-500 font-medium">Fresh Harvest Grade BOPF</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-orange-100 text-brand-hover text-[11px] font-bold">
                        Low Stock (3 units left)
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-heading font-black text-slate-900">
                      1
                    </td>
                    <td className="py-3.5 text-right font-medium text-slate-600">
                      Rs. 2,150
                    </td>
                    <td className="py-3.5 text-right font-heading font-black text-slate-900">
                      Rs. 2,150
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hub Reservation Note & Price Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 border-t border-slate-100">
              <div className="md:col-span-7 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  All items have been auto-reserved at the Colombo Main Hub. Physical packaging begins immediately after order confirmation.
                </p>
              </div>

              <div className="md:col-span-5 space-y-1.5 text-xs text-right">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-slate-900">Rs. 7,100</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Standard Courier Delivery (Western Province):</span>
                  <span className="font-bold text-slate-900">Rs. 450</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Promo Discount Applied:</span>
                  <span className="font-bold text-emerald-600">- Rs. 0</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                  <div>
                    <span className="font-heading font-black text-base text-slate-900 block leading-tight">
                      Grand Total Payable:
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Inclusive of all local dispatch taxes
                    </span>
                  </div>
                  <span className="font-heading font-black text-xl text-brand-primary">
                    Rs. 7,550 <span className="text-xs font-bold text-slate-500">LKR</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: THIRD-PARTY COURIER DISPATCH */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-brand-primary flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Third-Party Courier Dispatch
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                External Partner Delivery
              </span>
            </div>

            {/* Merchant Dispatch Notice */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-bold block">
                  Single-Store Merchant Dispatch Notice
                </strong>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Fulfillment is handled strictly through third-party courier contracts. No dedicated fleet GPS tracking or proprietary driver apps are utilized. Tracking is synchronized using partner waybills.
                </p>
              </div>
            </div>

            {/* Courier Configuration Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Courier Provider Partner</label>
                <select
                  value={courierPartner}
                  onChange={(e) => setCourierPartner(e.target.value as 'Pronto' | 'Domex')}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-brand-primary"
                >
                  <option value="Pronto">Pronto Lanka (Pvt) Ltd</option>
                  <option value="Domex">Domex Express Logistics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Waybill / Consignment Ref #</label>
                <div className="relative">
                  <input
                    type="text"
                    value={waybillRef}
                    onChange={(e) => setWaybillRef(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-brand-primary"
                  />
                  <button
                    onClick={handleCopyWaybill}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary"
                    title="Copy Waybill"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Courier Handover Status</label>
                <div className="h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-semibold flex items-center justify-between text-[11px]">
                  <span>Scheduled upon packaging</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Waybill synchronized with Pronto server.')}
                className="h-8 px-3 rounded-xl text-xs font-bold gap-1"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>Sync Waybill</span>
              </Button>

              <Button
                size="sm"
                onClick={() => showToast('Courier partner details updated.')}
                className="h-8 px-4 rounded-xl text-xs font-bold shadow-xs"
              >
                Update Courier Details
              </Button>
            </div>
          </div>

          {/* CARD 4: ORDER ACTIVITY & AUDIT TRAIL */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Order Activity &amp; Audit Trail
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                3 Events Recorded
              </span>
            </div>

            <div className="relative pl-6 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Stock Reserved in Colombo Hub
                  </span>
                  <span className="text-[10px] text-slate-400">May 24, 2025 • 11:00 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Auto-allocated inventory units: Singer Kettle (-1), Dilmah Tea (-1) from Colombo Central Storage Bay 04.
                </p>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-brand-primary ring-4 ring-white"></span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Notification Dispatches Triggered
                  </span>
                  <span className="text-[10px] text-slate-400">May 24, 2025 • 10:42 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Automated order confirmation SMS sent via Mobitel Gateway to <strong className="text-slate-700 font-bold">+94 77 123 4567</strong> and confirmation receipt emailed to <strong className="text-slate-700 font-bold">dinuka.f@gmail.com</strong>.
                </p>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400 ring-4 ring-white"></span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Order Placed by Customer
                  </span>
                  <span className="text-[10px] text-slate-400">May 24, 2025 • 10:42 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Customer checked out via Web Express. Chosen delivery method: Standard Courier (Western Province). Payment: Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Buyer Profile, Destination, Settlement (col-span-4)        */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARD 1: BUYER PROFILE */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Buyer Profile
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Verified Customer</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-brand-hover font-heading font-black text-sm flex items-center justify-center shrink-0">
                DF
              </div>
              <div>
                <h4 className="font-heading font-black text-sm text-slate-900 leading-tight">
                  Dinuka Fernando
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Registered Account • Colombo
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href="mailto:dinuka.f@gmail.com" className="hover:text-brand-primary">
                  dinuka.f@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>+94 77 123 4567</span>
                </div>
                <a
                  href="tel:+94771234567"
                  className="text-[10px] font-bold text-brand-primary hover:underline"
                >
                  Click to Call
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Historical Frequency</span>
                <span className="font-bold text-slate-800">3 previous orders</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <span>👍</span>
                <span>Good Standing</span>
              </div>
            </div>
          </div>

          {/* CARD 2: RECIPIENT DESTINATION */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Recipient Destination
              </span>
              <MapPin className="w-4 h-4 text-brand-primary" />
            </div>

            <div className="space-y-1">
              <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                Western Province Address
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No. 42, Galle Road, Colombo 03 (Colpetty), Western Province, Postal Code:{' '}
                <strong className="text-slate-900 font-bold">00300</strong>
              </p>
            </div>

            {/* Rider Special Instructions */}
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-hover block">
                ! Rider Special Instructions
              </span>
              <p className="text-[11px] text-slate-700 italic mt-0.5">
                &ldquo;Near landmark supermarket, call before arrival&rdquo;
              </p>
            </div>

            {/* Map Illustration Box */}
            <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-sky-50 flex items-center justify-center text-center p-3">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100/80 via-white/40 to-emerald-100/40"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-slate-800 text-[11px] font-bold shadow-xs border border-slate-200">
                  <MapPin className="w-3 h-3 text-brand-primary" />
                  <span>Colpetty Delivery Zone A</span>
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: SETTLEMENT & ACCOUNTING */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Settlement &amp; Accounting
              </span>
              <Banknote className="w-4 h-4 text-brand-primary" />
            </div>

            {/* COD Value Box */}
            <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/70 flex items-center justify-between">
              <div>
                <span className="font-heading font-black text-xs text-slate-900 block leading-tight">
                  Cash on Delivery (COD)
                </span>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                  Pay upon physical handover
                </span>
              </div>
              <span className="font-heading font-black text-base text-brand-primary">
                Rs. 7,550
              </span>
            </div>

            {/* Unpaid / Awaiting Collection */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${isCashCollected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className="font-bold text-slate-800">
                {isCashCollected ? 'Paid & Remitted' : 'Unpaid / Awaiting COD Collection'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-2">
              {isCashCollected
                ? 'Cash verified and remitted to merchant Commercial Bank ledger.'
                : 'Cash has not reached merchant account.'}
            </p>

            {/* Critical Settlement Policy */}
            <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-950 space-y-1">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-[11px] font-black uppercase tracking-wider text-red-700">
                  Critical Settlement Policy
                </span>
              </div>
              <p className="text-[11px] text-red-900 leading-relaxed">
                COD orders are <strong className="font-bold">NOT marked paid automatically</strong> upon dispatch or delivery. Payment must be manually confirmed after the courier partner remits the collected cash to LankaDirect.
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleMarkCashCollected}
              disabled={isCashCollected}
              className={`w-full h-10 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 ${
                isCashCollected ? 'bg-emerald-600 text-white' : ''
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCashCollected ? 'Cash Collected & Paid ✓' : 'Mark Cash Collected & Paid'}</span>
            </Button>
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Requires verification of courier remittance receipt.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: PRINT SLIP & INVOICE PREVIEW                                       */}
      {/* ========================================================================= */}
      {printInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Customer Invoice &amp; Packaging Slip
                </h3>
              </div>
              <button onClick={() => setPrintInvoiceOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable slip mock */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-heading font-black text-sm text-slate-900">LankaDirect Storefront</h4>
                  <p className="text-[10px] text-slate-500">Pettah Central Logistics Hub #01, Colombo</p>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-sm text-brand-primary">{orderId}</span>
                  <p className="text-[10px] text-slate-500">24 May 2025</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Ship To:</span>
                <p className="font-bold text-slate-900">Dinuka Fernando</p>
                <p className="text-slate-600 text-[11px]">No. 42, Galle Road, Colombo 03, Western Province</p>
                <p className="text-slate-600 text-[11px]">Phone: +94 77 123 4567</p>
              </div>

              <div className="border-t border-slate-200 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>1x Singer 1.8L Electric Kettle (SIN-KT-1800)</span>
                  <span className="font-bold">Rs. 4,950</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Dilmah Ceylon Black Tea 500g (DLM-TEA-500)</span>
                  <span className="font-bold">Rs. 2,150</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Courier Delivery (Western Province)</span>
                  <span>Rs. 450</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due (COD):</span>
                  <span className="text-brand-primary">Rs. 7,550</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setPrintInvoiceOpen(false)} className="h-9 px-4 rounded-xl text-xs font-bold">
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setPrintInvoiceOpen(false);
                  showToast('Thermal packaging slip sent to printer!');
                }}
                className="h-9 px-4 rounded-xl text-xs font-bold gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
