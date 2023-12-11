/* eslint-disable @next/next/no-page-custom-font */
import { initialData } from '@/database/products';
import type { Metadata } from 'next';

const product = initialData.products[0];

export const metadata: Metadata = {
  title: product.title,
  description: product.description,
  openGraph: {
    title: product.title,
    images: '',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
