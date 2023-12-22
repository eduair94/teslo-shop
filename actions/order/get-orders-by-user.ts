'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async ({ page = 1, take = 12 }) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (page < 1) page = 1;
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not found');

    const ordersP = prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    const totalCountP = prisma.order.count({
      where: {
        userId: session.user.id,
      },
    });
    const [orders, totalCount] = await Promise.all([ordersP, totalCountP]);
    const totalPages = Math.ceil(totalCount / take);
    return {
      ok: true,
      currentPage: page,
      totalPages,
      orders,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      orders: [],
      error: 'User not found',
    };
  }
};
