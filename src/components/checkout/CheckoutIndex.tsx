import { Container, Grid } from '@mui/material';
import ListCheckout from './ListCheckout';
import CheckoutDetail from './CheckoutDetail';
import { useCallback, useState } from 'react';

function CheckoutIndex() {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handlePrice = useCallback((data: number) => {
    setTotalPrice(data);
  }, []);
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={3}>
        <Grid item md={6} xs={12}>
          <ListCheckout handlePrice={handlePrice} totalPrice={totalPrice} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item sm={3} sx={{ display: { sm: 'block', xs: 'none' } }}></Grid>
            <Grid item md={9} sm={12} xs={12}>
              <CheckoutDetail totalPrice={totalPrice} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutIndex;
