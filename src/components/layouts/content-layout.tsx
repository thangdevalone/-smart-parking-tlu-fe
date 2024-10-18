import { Navbar } from '../shared/admin-panel';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({ title, children, className }: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
      <div
        className={cn(className ?? 'container flex-1 flex flex-col pt-8 pb-8 px-4 sm:px-8 min-h-0 gap-6')}>{children}</div>
    </>
  );
}
