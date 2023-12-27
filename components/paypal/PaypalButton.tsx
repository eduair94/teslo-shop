'use client';
import { paypalCheckPayment, setTransactionId } from '@/actions';
import { roundAmount } from '@/utils';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { FC, useMemo } from 'react';
import { toast } from 'react-toastify';

interface Props {
  orderId: string;
  amount: number;
}

const testUser = {
  email: process.env.NEXT_PUBLIC_PAYPAL_TEST_EMAIL,
  password: process.env.NEXT_PUBLIC_PAYPAL_TEST_PASSWORD,
};

export const PaypalButton: FC<Props> = ({ orderId, amount }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = useMemo(() => roundAmount(amount), [amount]);

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
          },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error("Couldn't update order");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    const resp = await paypalCheckPayment(details.id);
    console.log({ resp });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${text} Copied!`);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 mt-2 bg-gray-300 rounded"></div>
      </div>
    );
  }
  return (
    <div className="relative z-0">
      <div className="flex flex-col gap-1 mb-5 break-words w-full">
        <div className="flex justify-between items-center">
          <span className="max-w-[75%]">
            Email: <strong className="text-sm">{testUser.email}</strong>
          </span>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white ml-2 transition-all p-2"
            type="button"
            onClick={() => copyToClipboard(testUser.email)}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="max-w-[75%]">
            Password: <strong className="text-sm">{testUser.password}</strong>
          </span>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white ml-2 transition-all p-2"
            type="button"
            onClick={() => copyToClipboard(testUser.password)}
          >
            Copy
          </button>
        </div>
      </div>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
