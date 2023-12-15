'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { FC, useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel: FC<Props> = ({ slug }) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {!isLoading ? (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}
        >
          &nbsp;
        </h1>
      )}
    </>
  );
};
