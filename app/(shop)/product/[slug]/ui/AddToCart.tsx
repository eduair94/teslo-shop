'use client';
import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, IProduct, ISize } from '@/interfaces';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: IProduct;
}

export const AddToCart: FC<Props> = ({ product }) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const { data: session } = useSession();
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
    toast.success(
      `${cartProduct.quantity} ${cartProduct.title} - ${cartProduct.size} added to your cart`,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      },
    );
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

      <div className="my-5 flex gap-3">
        <button onClick={addToCart} className="btn-primary">
          Add to Cart
        </button>
        {session?.user.role === 'admin' && (
          <Link href={`/admin/product/${product.slug}`} className="btn-primary">
            Edit product
          </Link>
        )}
      </div>
    </>
  );
};
