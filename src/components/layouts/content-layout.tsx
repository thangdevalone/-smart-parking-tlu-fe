import { Navbar } from '../shared/admin-panel';
import React from 'react';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
      <div className="container flex-1 flex flex-col pt-8 pb-8 px-4 sm:px-8 min-h-0 gap-6">{children}</div>
    </>
  );
}
