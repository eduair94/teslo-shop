'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async ({ page = 1, take = 12 }) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (page < 1) page = 1;
    const session = await auth();
    if (session?.user.role !== 'admin')
      return {
        ok: false,
        message: 'You must be authenticated',
        users: [],
      };

    const usersP = prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
    });
    const totalCountP = prisma.user.count({});
    const [users, totalCount] = await Promise.all([usersP, totalCountP]);
    const totalPages = Math.ceil(totalCount / take);
    return {
      ok: true,
      currentPage: page,
      totalPages,
      users,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      users: [],
      error: 'Users not found',
    };
  }
};
