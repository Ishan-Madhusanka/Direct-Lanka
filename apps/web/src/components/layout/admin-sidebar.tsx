'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Users,
  TicketPercent,
  BarChart3,
  Settings,
  ExternalLink,
  LogOut,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Layers },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Discounts', href: '/admin/coupons', icon: TicketPercent },
  { label: 'Sales Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Store Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-4">
        {/* Brand header in sidebar (Image 1) */}
        <div className="space-y-2.5 pb-2 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-sm shadow-xs">
              L
            </div>
            <div>
              <span className="font-heading font-black text-base text-slate-900 block leading-tight">
                LankaDirect
              </span>
              <span className="text-[10px] text-slate-400 font-bold block">
                Store Admin Portal
              </span>
            </div>
          </Link>

          {/* Store Owner Portal Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-brand-hover text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
            <span>Store Owner Portal</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    isActive ? 'text-white' : 'text-slate-500'
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status & Logout */}
      <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
        {/* Store Online Live Indicator Card */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Store Online (Live)</span>
          </div>
          <Radio className="w-3.5 h-3.5 text-emerald-600" />
        </div>

        {/* View Customer Store */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>View Customer Store</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* Logout */}
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
