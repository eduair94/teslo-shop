/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empty cart',
  description: 'No articles in your cart',
  openGraph: {
    title: 'No articles in your cart',
    images: '',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
