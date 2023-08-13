import { Container, Grid } from '@mui/material';
import ListCheckout from './ListCheckout';
import CheckoutDetail from './CheckoutDetail';

function CheckoutIndex() {
  return (
    <Container>
      <Grid container>
        <Grid item md={6}>
          <ListCheckout />
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid item md={3}></Grid>
            <Grid item md={9}>
              <CheckoutDetail />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutIndex;
