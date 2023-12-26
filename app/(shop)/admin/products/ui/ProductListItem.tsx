import { ProductImage } from '@/components';
import { currencyFormat } from '@/utils';
import { $Enums } from '@prisma/client';
import Link from 'next/link';
import { FC } from 'react';

interface IProduct {
  images: string[];
  ProductImage: {
    url: string;
  }[];
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: $Enums.Size[];
  slug: string;
  tags: string[];
  gender: $Enums.Gender;
  categoryId: string;
}

interface Props {
  product: IProduct;
}

export const ProductListItem: FC<Props> = ({ product }) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <Link href={`/product/${product.slug}`}>
          <ProductImage
            className="w-20 h-20 object-cover rounded"
            width={80}
            height={80}
            alt={product.title}
            src={product.ProductImage[0]?.url}
          />
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Link
          href={`/admin/product/${product.slug}`}
          className="hover:underline"
        >
          {product.title}
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        {currencyFormat(product.price)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {product.gender}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {product.inStock}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {product.sizes.join(', ')}
      </td>
    </tr>
  );
};
