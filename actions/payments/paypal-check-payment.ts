'use server';

import { PaypalOrderStatusResponse } from '@/interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const getPayPalBearerToken = async (): Promise<string | null> => {
  const myHeaders = new Headers();
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL;

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`);

  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token.toString('base64')}}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const resp = await fetch(oauth2Url as string, {
      ...requestOptions,
      cache: 'no-store',
    }).then((response) => response.json());
    return resp.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<PaypalOrderStatusResponse | null> => {
  const payPalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${bearerToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const resp: PaypalOrderStatusResponse = await fetch(payPalOrderUrl, {
      ...requestOptions,
      cache: 'no-store',
    }).then((response) => response.json());

    return resp;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();
  if (!authToken) {
    return {
      ok: false,
      message: 'Could not verify token',
    };
  }
  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);
  if (!resp) {
    return {
      ok: false,
      message: 'Could not verify payment',
    };
  }
  const { status, purchase_units } = resp;
  if (status !== 'COMPLETED') {
    console.log(resp);
    return {
      ok: false,
      message: 'Payment not completed',
    };
  }

  const orderId = purchase_units[0].invoice_id;

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Revalidate path
    revalidatePath(`/orders/${orderId}`);
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message: '500 - Unsuccessful payment',
    };
  }
  //const {} = purchase_units[0]; Todo invoice id
};
