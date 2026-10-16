'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AdminHeader() {
  return (
    <header className="h-16 bg-brand-surface border-b border-brand-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="font-heading font-bold text-lg text-brand-text">
          Owner Portal
        </h1>
        <Badge variant="brand">Single-Owner Admin</Badge>
      </div>

      <div className="flex items-center gap-4">
        {/* Switch to customer storefront */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-hover bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 transition-colors"
        >
          <span>View Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications mock */}
        <button
          className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-bg rounded-lg transition-colors relative"
          aria-label="Admin notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-brand-primary absolute top-2 right-2 ring-2 ring-white"></span>
        </button>

        {/* Admin profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-brand-border">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
            LD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-brand-text leading-none">Store Owner</p>
            <p className="text-[11px] text-brand-muted leading-tight mt-0.5">admin@lankadirect.lk</p>
          </div>
        </div>
      </div>
    </header>
  );
}
