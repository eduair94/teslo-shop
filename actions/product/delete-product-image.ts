'use server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'Cannot delete image from filesystem',
    };
  }
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
  try {
    await cloudinary.uploader.destroy('teslo-shop/' + imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    const product = deletedImage.product;
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
    return {
      ok: true,
      message: 'Image deleted',
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      message: 'Error deleting image',
    };
  }
};
