import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'muted' | 'outline';
}

export function Badge({
  className,
  variant = 'brand',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    brand: 'bg-orange-50 text-brand-primary border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    muted: 'bg-slate-100 text-brand-muted border-slate-200',
    outline: 'bg-transparent text-brand-text border-brand-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
