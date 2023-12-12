import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { IGender } from '@/interfaces';
import { redirect } from 'next/navigation';
export const revalidate = 60;

interface Props {
  params: {
    gender: IGender;
  };
  searchParams: {
    page: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  // if (id === 'kids') return notFound();
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });
  if (products.length === 0) redirect(`/gender/${gender}`);

  const labels: Record<IGender, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'Unisex',
  };
  return (
    <>
      <Title
        title={`${labels[gender]} articles`}
        subtitle="All products"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
