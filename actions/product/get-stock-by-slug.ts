'use server';

import prisma from '@/lib/prisma';

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return 0;

    return product.inStock;
  } catch (e) {
    console.error(e);
    throw new Error('Error getting product by slug');
  }
};
