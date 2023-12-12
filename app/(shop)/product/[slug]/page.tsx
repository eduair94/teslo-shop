import { ProductSlideShow, QuantitySelector, SizeSelector } from '@/components';
import { ProductMobileSlideShow } from '@/components/products/slideshow/ProductMobileSlideshow';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/database/products';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);
  if (!product) return notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow*/}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />

        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Add to Cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
