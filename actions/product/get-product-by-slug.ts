'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (e) {
    console.error(e);
    throw new Error('Error getting product by slug');
  }
};
