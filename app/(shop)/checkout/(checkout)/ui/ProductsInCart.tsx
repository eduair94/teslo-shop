'use client';
import { ProductImage } from '@/components';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            style={{
              width: '100px',
              height: '100px',
            }}
            className="mr-5 rounded"
          />
          <div>
            <span className="hover:underline cursor-pointer">
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
