import { Container, Grid } from '@mui/material';
import ListCheckout from './ListCheckout';
import CheckoutDetail from './CheckoutDetail';

function CheckoutIndex() {
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={3}>
        <Grid item md={6} xs={12}>
          <ListCheckout />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item sm={3} sx={{ display: { sm: 'block', xs: 'none' } }}></Grid>
            <Grid item md={9} sm={12} xs={12}>
              <CheckoutDetail />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutIndex;
