// material-ui
import { Container, Grid, Typography } from '@mui/material';
import ServiceItem from 'components/our-service/ServiceItem';
import { useCallback, useEffect } from 'react';
import { IDataService } from 'types/services/serviceitem';
import { getProduct } from '../../../api/ProductAPI/productDashboash';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //
const data: IDataService[] = [
  { name: 'Men', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_vdH3Kwo5.jpeg' },
  { name: 'Women', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_azzqsGfh.jpeg' },
  { name: 'Spa and legit check by entrupy', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_azzqsGfh.jpeg' }
];
const ProductDemo = () => {
  const getListProduct = useCallback(async (searchParam: string) => {
    // const res1 = await getProductWithFilter();
    const res = await getProduct({ search: searchParam, limit: 3 });
    console.log(res);

    // getProductList(res.data.results);
  }, []);
  useEffect(() => {
    getListProduct('');
  }, [getListProduct]);
  return (
    <Container
      maxWidth={'xl'}
      sx={{
        mt: 3
      }}
    >
      <Typography
        component={'h2'}
        align="center"
        sx={{
          fontWeight: 700,
          color: '#000',
          fontSize: '24px',
          textTransform: 'uppercase',
          fontFamily: 'Quicksand',
          paddingBottom: '20px'
        }}
      >
        Sản phẩm nổi bật
      </Typography>

      <Grid container columnSpacing={{ lg: 4, md: 3, xs: 2 }} rowSpacing={{ lg: 4, md: 3, xs: 2 }} sx={{ marginTop: '11px' }}>
        {data.map((d, index) => (
          <Grid item md={4} lg={4} sm={index === data.length - 1 ? 12 : 6} xs={12} key={index}>
            <ServiceItem data={d} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductDemo;
