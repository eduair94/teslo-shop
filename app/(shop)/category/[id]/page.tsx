import { ProductGrid, Title } from '@/components';
import { initialData } from '@/database/products';
import { IGender, IProduct } from '@/interfaces';

const seedProducts = initialData.products;

interface Props {
  params: {
    id: IGender;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  // if (id === 'kids') return notFound();
  const products = seedProducts.filter((product) => product.gender === id);
  const labels: Record<IGender, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'Unisex',
  };
  return (
    <>
      <Title
        title={`${labels[id]} articles`}
        subtitle="All products"
        className="mb-2"
      />
      <ProductGrid products={products as IProduct[]} />
    </>
  );
}
