'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return <p>Loading...</p>;
  return (
    <>
      <span>Qty. Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
    </>
  );
};
