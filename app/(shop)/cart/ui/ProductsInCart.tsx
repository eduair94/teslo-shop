'use client';
import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    if (!productsInCart.length) {
      redirect('/empty');
    }
  }, [productsInCart.length]);

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
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            <button
              onClick={() => removeProductFromCart(product)}
              className="underline mt-3"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
