'use server';

import prisma from '@/lib/prisma';

export const setTransactionId = async (
  orderId: string,
  transactionId: string,
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });
    if (!order) {
      return {
        ok: false,
        message: 'Order not found',
      };
    }
    return {
      ok: true,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      message: 'Transaction error',
    };
  }
};
