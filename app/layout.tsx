/* eslint-disable @next/next/no-page-custom-font */
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { inter } from './config/fonts';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
