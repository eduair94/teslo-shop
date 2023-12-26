'use server';
import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { Category, Product } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  let product: (Product & { images: string[] }) | null = null;
  let categories: Category[];
  if (slug !== 'new') {
    [product, { categories }] = await Promise.all([
      getProductBySlug(slug),
      getCategories(),
    ]);
    if (!product) redirect('/admin/products');
  } else {
    categories = (await getCategories()).categories;
  }
  const title = slug === 'new' ? 'New product' : 'Edit product';
  return (
    <div>
      <Title title={title} />
      <Link
        href={`/product/${product?.slug}`}
        className="btn-primary mb-5 block w-fit sm:mx-0 mx-5"
      >
        View Product
      </Link>
      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
