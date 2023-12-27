'use client';
import { ProductImage } from '@/components';
import { IProduct } from '@/interfaces';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  product: IProduct;
}

const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  console.log('parts', parts);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-blue-300">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export const ProductGridItem: FC<Props> = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

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
          {q ? (
            <HighlightedText text={product.title} highlight={q} />
          ) : (
            product.title
          )}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
