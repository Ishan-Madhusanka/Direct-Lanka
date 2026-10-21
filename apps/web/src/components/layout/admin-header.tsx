'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Plus,
  Bell,
  Menu,
  X,
  Radio,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Mobile Header Layout (Image 2) */}
        <div className="flex sm:hidden items-center justify-between w-full">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-1.5 text-slate-700 hover:text-brand-primary"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-heading font-black flex items-center justify-center text-xs shadow-xs">
              L
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-sm text-slate-900">
                LankaDirect
              </span>
              <span className="text-[9px] font-black tracking-wider text-brand-primary uppercase">
                ADMIN
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              className="p-1.5 text-slate-600 hover:text-brand-primary relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-brand-primary absolute top-1 right-1"></span>
            </button>
            <Link
              href="/admin/login"
              className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200"
            >
              <Image
                src="/images/dinuka-avatar.jpg"
                alt="Kasun / Admin"
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Header Layout (Image 1) */}
        <div className="hidden sm:flex items-center justify-between w-full">
          {/* Search Input */}
          <div className="relative w-80 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, products, customers..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Colombo Main Node Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Colombo Main Node</span>
            </div>

            {/* + Add Product Button */}
            <Link href="/admin/products?action=new">
              <Button className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Button>
            </Link>

            {/* Notifications */}
            <button
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-primary hover:border-brand-primary transition-colors relative"
              aria-label="Admin Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-brand-primary absolute top-2 right-2"></span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="text-right">
                <p className="text-xs font-heading font-black text-slate-900 leading-none">
                  Admin / Owner
                </p>
                <p className="text-[10px] text-slate-400 font-semibold leading-tight mt-1">
                  LankaDirect Colombo Hub
                </p>
              </div>

              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <Image
                  src="/images/dinuka-avatar.jpg"
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Slide-Over) */}
      {mobileDrawerOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex animate-in fade-in">
          <div className="w-72 bg-white h-full shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary text-white font-heading font-black flex items-center justify-center text-sm">
                    L
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-sm text-slate-900">
                      LankaDirect
                    </h3>
                    <span className="text-[10px] text-brand-primary font-bold uppercase">
                      Store Admin
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700">
                <Link
                  href="/admin"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl bg-orange-50 text-brand-primary flex items-center gap-2.5"
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/admin/products"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>Products</span>
                </Link>
                <Link
                  href="/admin/orders"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>Orders</span>
                </Link>
                <Link
                  href="/admin/categories"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>Categories</span>
                </Link>
                <Link
                  href="/admin/inventory"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>Inventory</span>
                </Link>
                <Link
                  href="/admin/customers"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>Customers</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <Link
                href="/"
                className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Customer Store</span>
              </Link>
              <Link
                href="/admin/login"
                className="w-full py-2 px-3 rounded-xl text-red-600 font-bold flex items-center gap-2"
              >
                <span>Log Out</span>
              </Link>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)}></div>
        </div>
      )}
    </>
  );
}

