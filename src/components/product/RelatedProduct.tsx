import { Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { getProductWithFilter } from '../../../api/ProductAPI/productDashboash';
import { IResponseGetProductById } from 'types/services/productApi.types';
import ProductItem from 'components/Shop/ProductItem/ProductItem';

function RelatedProduct({ id }: { id: number }) {
  const { brand } = useSelector((state) => state.product);
  const [listItem, setListItem] = useState<IResponseGetProductById[]>([]);

  const getRelatedProduct = useCallback(async () => {
    const name = brand.results.find((d) => d.id === id)?.product_brand_name;
    if (name) {
      const res = await getProductWithFilter({ brand: name });
      console.log(res.data.results);

      setListItem(res.data.results);
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
        {listItem.map((d, i) => {
          if (i < 4)
            return (
              <Grid item md={3} key={d.id}>
                <ProductItem data={d} />
              </Grid>
            );
        })}
      </Grid>
    </Container>
  );
}

export default RelatedProduct;
