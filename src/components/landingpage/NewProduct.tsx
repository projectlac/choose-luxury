// material-ui
import { Box, Container, Grid, Typography } from '@mui/material';
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

  const settings = {
    dots: false,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '15px',
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
