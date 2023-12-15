'use client';
import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, IProduct, ISize } from '@/interfaces';
import { useCartStore } from '@/store';
import { FC, useState } from 'react';

interface Props {
  product: IProduct;
}

export const AddToCart: FC<Props> = ({ product }) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<ISize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size,
      quantity,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt text-red-500 fade-in">You must select a size</span>
      )}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Add to Cart
      </button>
    </>
  );
};
