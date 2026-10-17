'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Truck,
  Phone,
  Package,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Clock,
  MapPin,
  Share2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'LD-78921';

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-8 sm:py-16 text-slate-900">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Success Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
                ORDER PLACED SUCCESSFULLY
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                Thank You For Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                We have received your order and will dispatch it through our verified third-party courier network.
              </p>
            </div>

            {/* Order Ref & Tracking Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-left">
                <span className="text-[11px] text-slate-400 block font-medium">Order Number:</span>
                <span className="font-heading font-black text-base text-slate-900">{orderId}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Payment Method:</span>
                <span className="font-bold text-slate-800">Cash on Delivery (COD)</span>
              </div>
            </div>

            {/* Courier Dispatch Timeline */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Courier Dispatch Timeline</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-800 block">Colombo &amp; Suburbs:</strong>
                    <span>Delivered within 24 to 48 hours via Colombo Express courier transit.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-800 block">Islandwide (All 25 Districts):</strong>
                    <span>Delivered within 2 to 4 business days via Domex, Pronto, or Certis.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Note */}
            <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] text-slate-600 text-left flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <span>
                The courier delivery driver will phone you directly on your mobile number prior to arrival at your doorstep. Please have exact cash ready for Cash on Delivery handover.
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link href="/" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto font-bold text-xs h-11 px-8 rounded-xl shadow-xs">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto font-bold text-xs h-11 px-6 rounded-xl border-slate-200"
                >
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-slate-400 text-xs">Loading order confirmation...</div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
