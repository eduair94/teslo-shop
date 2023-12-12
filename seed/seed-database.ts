import prisma from '../lib/prisma';
import { initialData } from './seed';
async function main() {
  // Delete previous records
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;

  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (acc, category) => {
      acc[category.name.toLowerCase()] = category.id;
      return acc;
    },
    {} as Record<string, string>,
  );

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });
    const imagesData = images.map((el) => {
      return {
        url: el,
        productId: dbProduct.id,
      };
    });
    await prisma.productImage.createMany({ data: imagesData });
  });
}

(() => {
  if (process.env.NODE_ENV == 'production') return;
  main();
})();