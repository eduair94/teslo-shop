/* eslint-disable @next/next/no-page-custom-font */
import { Providers } from '@/components';
import type { Metadata } from 'next';
import { inter } from '../config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: 'Find the best products in Teslo-Shop',
  openGraph: {
    title: {
      template: 'Teslo-Shop - %s',
      default: 'Teslo-Shop',
    },
    images: '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
