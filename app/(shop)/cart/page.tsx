import { Grid, Typography } from '@mui/material';

const CartPage = () => {
  return (
    <>
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
        </Grid>
        <Grid item xs={12} sm={5}></Grid>
      </Grid>
    </>
  );
};

export default CartPage;
