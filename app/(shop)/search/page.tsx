import { getProductSearchPagination } from '@/actions/product/product-search-pagination';
import {
  PageNotFound,
  Pagination,
  ProductGrid,
  SearchBar,
  Title,
} from '@/components';
export const revalidate = 0;

interface Props {
  searchParams: {
    page: string;
    q: string;
  };
}

export default async function CategoryPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const q = searchParams.q;
  // if (id === 'kids') return notFound();
  const { products, totalPages } = await getProductSearchPagination({
    page,
    query: q,
  });
  return (
    <>
      <Title
        title={`Search Page`}
        subtitle={
          q ? (
            <span>
              Searching for <b>{q}</b>
            </span>
          ) : (
            <span>Showing all products</span>
          )
        }
        className="mb-2"
      />
      <div className="mb-5 max-w-[500px]">
        <SearchBar keep />
      </div>
      {products.length ? (
        <>
          <ProductGrid products={products} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <PageNotFound
          text="No products found"
          status="Error"
          returnToName="Products Page"
        />
      )}
    </>
  );
}
