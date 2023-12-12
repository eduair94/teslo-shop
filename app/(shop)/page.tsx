/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductGrid, Title } from '@/components';
import { initialData } from '@/database/products';
import { IProduct } from '@/interfaces';
const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />
      <ProductGrid products={products as IProduct[]} />
    </>
  );
}
