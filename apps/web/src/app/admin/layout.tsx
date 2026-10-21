'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
