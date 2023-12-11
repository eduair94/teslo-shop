import { IProduct } from '@/interfaces';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { default as NextLink } from 'next/link';
import { FC, useMemo, useState } from 'react';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `products/${product.images[1]}`
        : `products/${product.images[0]}`,
    [isHovered, product],
  );

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={4}
      lg={3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href="product/slug" component={NextLink}>
          <CardActionArea>
            <CardMedia
              className="fadeIn"
              component="img"
              image={productImage}
              alt={product.title}
            />
          </CardActionArea>
        </Link>
      </Card>
      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={600}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
