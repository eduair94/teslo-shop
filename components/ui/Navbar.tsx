import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link href="/" component={NextLink} display="flex" alignItems="center">
          <Typography variant="h6">Teslo | </Typography>
          <Typography sx={{ ml: 0.5, mb: '-3px' }}>Shop</Typography>
        </Link>
        <Box sx={{ flex: 1 }} />
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          <Link href="/category/men" component={NextLink}>
            <Button>Men</Button>
          </Link>
          <Link href="/category/women" component={NextLink}>
            <Button>Women</Button>
          </Link>
          <Link href="/category/kid" component={NextLink}>
            <Button>Kids</Button>
          </Link>
        </Box>
        <Box sx={{ flex: 1 }} />
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <Link href="/cart" component={NextLink}>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
