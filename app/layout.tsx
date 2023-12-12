/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import { inter } from '../config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: 'Teslo-Shop - %s',
    default: 'Teslo-Shop',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
