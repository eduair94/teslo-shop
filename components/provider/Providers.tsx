'use client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalLoading } from '..';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <NextTopLoader />
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
          intent: 'capture',
          currency: 'USD',
        }}
      >
        <SessionProvider>{children}</SessionProvider>
        <ToastContainer />
      </PayPalScriptProvider>
      <GlobalLoading />
    </>
  );
};
