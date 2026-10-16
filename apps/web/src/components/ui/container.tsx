import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function Container({
  className,
  size = 'default',
  children,
  ...props
}: ContainerProps) {
  const maxSizes = {
    default: 'max-w-[1440px]', // Desktop reference in LankaDirect spec
    narrow: 'max-w-4xl',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
