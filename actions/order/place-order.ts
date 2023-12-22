'use server';

import { auth } from '@/auth.config';
import { IAddress, ISize } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ISize;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: IAddress,
) => {
  const session = await auth();
  const userId = session?.user.id;
  // Verify user session.
  if (!userId)
    return {
      ok: false,
      message: 'No user session found',
    };

  // Obtain the information about the products.
  // We can get multiple products with the same id.

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });

  // Calculate amounts.

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  // Calculate tax, subtotal and total.
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new Error(`${item.productId} doesn't exists`);
      const subtotal = product.price * productQuantity;
      totals.subTotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;
      return totals;
    },
    {
      subTotal: 0,
      tax: 0,
      total: 0,
    },
  );

  try {
    // Create database transaction.
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update product stock.
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((count, item) => item.quantity + count, 0);
        if (productQuantity === 0) {
          throw new Error(`Product ${product.id} has 0 quantity`);
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verify negative values in the products stock.
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`Product ${product.title} has no stock`);
        }
      });

      // 2. Create order - Header / Details.

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validate, if price is 0 throw an error.

      // 3. Create order address.
      const { country, ...rest } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          countryId: country,
          orderId: order.id,
        },
      });
      return {
        order,
        updatedProducts,
        orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
      message: '',
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message: (err as Error).message,
    };
  }
};
