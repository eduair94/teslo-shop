'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const address = useAddressStore((state) => state.address);
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      size: product.size,
      quantity: product.quantity,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (resp.ok === false) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }
    // Everything went ok.
    // Clear cart
    clearCart();
    router.replace(`/orders/${resp?.order?.id}`);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>ZIP {address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 bg-gray-200 mb-10"></div>
      <h2 className="text-2xl mb-2">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>Qty. Products</span>
        <span className="text-right">
          {itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            By clicking on &quot;Place Order&quot;, you agree to our{' '}
            <a href="#" className="underline">
              terms and conditions
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              privacy policy
            </a>{' '}
          </span>
        </p>
        {/* href="/orders/123" */}
        {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
        <button
          onClick={onPlaceOrder}
          className={clsx('flex btn-primary justify-center', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
