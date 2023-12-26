'use client';
import { ProductImage } from '@/components';
import { IProduct } from '@/interfaces';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
  product: IProduct;
}

export const ProductGridItem: FC<Props> = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <ProductImage
        src={displayImage}
        alt={product.title}
        className="w-full object-cover rounded"
        width={500}
        height={500}
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
      />
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
