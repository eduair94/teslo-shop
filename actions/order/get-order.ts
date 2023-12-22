'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrder = async (orderId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not found');
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        OrderAddress: true,
      },
    });
    if (!order) throw new Error(`${orderId} doesn't exists`);

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId)
        throw new Error(`${orderId} not from this user`);
    }

    return {
      ok: true,
      order,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      error: 'Order not found',
    };
  }
};
