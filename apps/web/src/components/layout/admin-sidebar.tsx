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
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Layers },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Coupons & Deals', href: '/admin/coupons', icon: TicketPercent },
  { label: 'Sales Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Store Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-surface border-r border-brand-border flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Brand logo in sidebar */}
      <div className="p-5 border-b border-brand-subtle flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-sm">
            L
          </div>
          <span className="font-heading font-bold text-base text-brand-text">
            Lanka<span className="text-brand-primary">Direct</span>
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="p-3 space-y-1 flex-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-50 text-brand-primary font-semibold'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4',
                  isActive ? 'text-brand-primary' : 'text-brand-muted'
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer exit link */}
      <div className="p-4 border-t border-brand-subtle">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors p-2 rounded-lg hover:bg-brand-bg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Customer Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
