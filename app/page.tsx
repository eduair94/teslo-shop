/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ProductList } from '@/components/products';
import { initialData } from '@/database/products';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component="h2">
        All Products
      </Typography>

      <ProductList products={initialData.products as any} />
    </>
  );
}
