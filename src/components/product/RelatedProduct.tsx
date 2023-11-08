import { Container, Grid, Typography } from '@mui/material';

function RelatedProduct() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '140px', marginBottom: '125px' }}>
      <Typography
        variant={'h2'}
        sx={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: '700', lineHeight: '19px', marginBottom: '16px' }}
      >
        RELATED PRODUCTS
      </Typography>
      <Grid container columnSpacing={3} rowSpacing={3}>
        {/* {data.map((d) => (
          <Grid item md={3} key={d.id}>
            <ProductItem data={d} />
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
}

export default RelatedProduct;
