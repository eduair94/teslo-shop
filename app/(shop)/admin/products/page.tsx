// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { Pagination, Title } from '@/components';

import { getPaginatedProductsWithImages } from '@/actions';
import Link from 'next/link';
import { ProductListItem } from './ui/ProductListItem';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });
  return (
    <>
      <Title title="Product's Panel" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New product
        </Link>
      </div>

      <div className="mb-10 overflow-auto w-100">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages as number} />
      </div>
    </>
  );
}
