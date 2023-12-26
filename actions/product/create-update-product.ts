'use server';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  categoryId: z.string().uuid(),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Math.round(val)),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'teslo-shop',
          })
          .then((r) => r.secure_url);
      } catch (err) {
        console.error(err);
        return null;
      }
    });
    const uploadedImages = (await Promise.all(uploadPromises)).filter(
      (el) => el !== null,
    );
    return uploadedImages as string[];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success) {
    console.error(productParsed.error);
    return { ok: false };
  }
  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();
  const { id, ...rest } = product;
  const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase());
  try {
    const tx = await prisma.$transaction(async (tx) => {
      let product: Product;
      if (id) {
        // Update
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Create
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll('images')) {
        console.log(formData.getAll('images'));
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('Error uploading images');
        }
        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image,
            productId: product.id,
          })),
        });
      }

      return { product };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${tx.product.slug}`);
    revalidatePath(`/product/${tx.product.slug}`);

    return {
      ok: true,
      product: tx.product,
    };
  } catch (e) {
    console.error(e);
    return { ok: false };
  }
};
