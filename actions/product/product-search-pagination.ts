'use server';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  query?: string;
}

export const getProductSearchPagination = async ({
  page = 1,
  take = 12,
  query,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (page < 1) page = 1;
  console.log('Query', query);
  try {
    // Get all products.
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
      }),
      prisma.product.count({
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
      }),
    ]);
    // Get total pages.
    const totalPages = Math.ceil(totalCount / take);
    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Product cannot be loaded');
  }
};
