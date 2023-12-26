'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async ({ page = 1, take = 12 }) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (page < 1) page = 1;
    const session = await auth();
    if (session?.user.role !== 'admin')
      return {
        ok: false,
        message: 'You must be authenticated',
        orders: [],
      };

    const ordersP = prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: take,
      skip: (page - 1) * take,
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    const totalCountP = prisma.order.count({});
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
