'use server';

import prisma from '@/lib/prisma';

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({});
    return { categories };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message: 'Error getting categories',
      categories: [],
    };
  }
};
