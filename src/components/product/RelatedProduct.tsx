import { Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { getProductByBrand } from '../../../api/BrandAPI/brandAPI';

function RelatedProduct({ id }: { id: number }) {
  const { brand } = useSelector((state) => state.product);
  const getRelatedProduct = useCallback(async () => {
    const name = brand.results.find((d) => d.id === id)?.product_brand_name;
    if (name) {
      const res = await getProductByBrand(name);
      console.log(res);
    }
  }, [brand, id]);
  useEffect(() => {
    getRelatedProduct();
  }, [getRelatedProduct]);
  return (
    <Container maxWidth="xl" sx={{ marginTop: '140px', marginBottom: '125px' }}>
      <Typography
        variant={'h2'}
        sx={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '19px',
          marginBottom: '16px',
          textTransform: 'uppercase'
        }}
      >
        <FormattedMessage id="related-product" />
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
