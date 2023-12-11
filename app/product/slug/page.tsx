'use client';
import { ProductSlideShow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { initialData } from '@/database/products';
import { Box, Button, Grid, Typography } from '@mui/material';

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7}>
        <ProductSlideShow images={product.images} />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            ${product.price}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2">Quantity</Typography>
            {/* <QuantityInput /> */}
            <ItemCounter />
            <SizeSelector
              sizes={product.sizes}
              selectedSize={product.sizes[0]}
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            className="circular-btn"
          >
            Add to cart
          </Button>
          {/* <Chip
            color="error"
            variant="outlined"
            label="No stock available"
          ></Chip> */}

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Description</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
