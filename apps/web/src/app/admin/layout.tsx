'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, LayoutGrid } from 'lucide-react';
import { AdminHeader } from '@/components/layout/admin-header';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto pb-24 sm:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Sticky Admin Bottom Navigation Bar (Image 2) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-1.5 px-4 shadow-lg flex items-center justify-around text-[10px]">
        <Link
          href="/admin"
          className={`flex flex-col items-center gap-0.5 font-bold transition-colors ${
            pathname === '/admin' ? 'text-brand-primary' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/products"
          className={`flex flex-col items-center gap-0.5 font-bold transition-colors ${
            pathname.startsWith('/admin/products') ? 'text-brand-primary' : 'text-slate-500'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Products</span>
        </Link>

        <Link
          href="/admin/orders"
          className={`flex flex-col items-center gap-0.5 font-bold transition-colors relative ${
            pathname.startsWith('/admin/orders') ? 'text-brand-primary' : 'text-slate-500'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Orders</span>
        </Link>

        <Link
          href="/admin/settings"
          className={`flex flex-col items-center gap-0.5 font-bold transition-colors ${
            pathname.startsWith('/admin/settings') ||
            pathname.startsWith('/admin/categories') ||
            pathname.startsWith('/admin/inventory')
              ? 'text-brand-primary'
              : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Menu</span>
        </Link>
      </div>
    </div>
  );
}
