/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidate = 60;
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });
  if (products.length === 0) redirect('/');
  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
