import { type ReactNode } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function RootGroupLayout({ children }: { children: ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>;
}
