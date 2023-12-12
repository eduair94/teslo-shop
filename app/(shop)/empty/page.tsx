'use client';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

const EmptyPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>Your cart is empty</Typography>
        <Link href="/" component={NextLink} typography="h4" color="secondary">
          Return
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyPage;
