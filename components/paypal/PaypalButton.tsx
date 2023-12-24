'use client';
import { paypalCheckPayment, setTransactionId } from '@/actions';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { FC, useMemo } from 'react';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton: FC<Props> = ({ orderId, amount }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = useMemo(() => Math.round(amount * 100) / 100, [amount]);

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

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 mt-2 bg-gray-300 rounded"></div>
      </div>
    );
  }
  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
