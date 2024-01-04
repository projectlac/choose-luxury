// material-ui
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProductItem from 'components/Shop/ProductItem/ProductItem';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { IResponseGetProductById } from 'types/services/productApi.types';
import { IFilterProduct } from 'types/services/serviceitem';
import { getProductWithFilter } from '../../../api/ProductAPI/productDashboash';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //

const NewProduct = () => {
  const theme = useTheme();
  const [productList, getProductList] = useState<IResponseGetProductById[]>([]);
  const matchDownXl = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  let noItems = 4;
  noItems = matchDownSM ? 1 : noItems;
  noItems = matchDownMD ? 2 : noItems;
  noItems = matchDownLG ? 3 : noItems;
  noItems = matchDownXl ? 4 : noItems;

  const settings = {
    dots: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '15px',
    slidesToShow: noItems
  };

  const getListProduct = useCallback(async () => {
    const params: IFilterProduct = {
      limit: 6,
      offset: 0
    };
    const res = await getProductWithFilter(params);
    // const res = await getProduct({ search: searchParam, page: page1 });

    getProductList(res.data.results);
  }, []);

  useEffect(() => {
    getListProduct();
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
        <FormattedMessage id="hot-product" />
      </Typography>

      <Grid container sx={{ marginTop: '11px', width: '100%' }} className="hot-product">
        <Slider {...settings}>
          {productList.map((d, index) => (
            <Box height={300} key={d.id} p={2}>
              <ProductItem data={d} />
            </Box>
          ))}
        </Slider>
      </Grid>
    </Container>
  );
};

export default NewProduct;
