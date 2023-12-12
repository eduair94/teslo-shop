/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Articles cart',
  openGraph: {
    title: '',
    images: '',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
