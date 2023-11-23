import { Box, Button, Container, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import useAuth from 'hooks/useAuth';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Slider from 'react-slick';
import { IResponseGetProductById } from 'types/services/productApi.types';
import cartApi from '../../../api/CartAPI/cartApi';
import { useSelector } from 'store';

interface IProductDetailProps {
  data: IResponseGetProductById;
}

const InfoTypo = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
  color: '#000',
  marginBottom: '16px',
  fontFamily: 'Quicksand',
  '&:last-of-type': {
    marginBottom: '21px'
  }
}));

const PriceTypo = styled('div')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '400',
  lineHeight: '28.8px',
  color: '#000',
  marginBottom: '39px'
}));

const ButtonQuality = styled('button')(({ theme }) => ({
  width: '37px',
  height: '37px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#eee',
    color: '#000'
  }
}));

const QualityWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',

  input: {
    height: '37px',
    width: '67px',
    border: '1px solid #ccc',
    borderLeft: '0',
    borderRight: '0',
    outline: 'none',
    textAlign: 'center',
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: '0'
    },
    '&::-webkit_inner_spin_button': {
      WebkitAppearance: 'none',
      margin: '0'
    }
  }
}));

const BoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '392px',
  position: 'relative'
}));

function ProductDetail({ data }: IProductDetailProps) {
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [quantity, setQuantity] = useState<number>(1);
  const { size, category, brand } = useSelector((state) => state.product);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const addToCart = useCallback(async () => {
    try {
      const res = await cartApi.addToCart({
        items: [
          {
            quantity,
            product: {
              brand: +data.brand_id,
              category: +data.category_id,
              is_available: data.is_available,
              product_description: data.product_description,
              product_name: data.product_name,
              size: +data.size_id,
              slug: data.slug,
              unit_in_stock: +data.unit_in_stock
            }
          }
        ]
      });
      console.log(res);
    } catch (error) {}
  }, [data, quantity]);

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={10}>
        <Grid item md={6} xs={12}>
          {matchDownSM ? (
            <Slider {...settings}>
              {data.images.length > 0 &&
                data.images.map((d, index) => (
                  <BoxImage key={index}>
                    <Image src={d.product_img} layout="fill" alt="" objectFit="cover"></Image>
                  </BoxImage>
                ))}
            </Slider>
          ) : (
            <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} thumbnail={true}>
              {data.images.length > 0 &&
                data.images.map((d, index) => (
                  <a
                    href={d.product_img}
                    key={index}
                    style={{
                      width: `${data.images.length === 1 ? '100%' : '50%'}`,
                      padding: '5px'
                    }}
                  >
                    <Box
                      sx={{
                        width: `100%`,
                        height: `${data.images.length === 1 ? '634px' : '350px'}`,
                        position: 'relative',
                        background: 'rgb(224 224 224)'
                      }}
                    >
                      <Image alt={data.product_name} src={d.product_img} layout="fill" objectFit="contain"></Image>
                    </Box>
                  </a>
                ))}
            </LightGallery>
          )}
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            padding: '5px 0px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '634px'
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '29px',
                color: '#000',
                marginBottom: '20px',
                fontFamily: 'Quicksand'
              }}
            >
              {data.product_name}
            </Typography>
            <InfoTypo>Product code: {data.id}</InfoTypo>
            <InfoTypo>Brand: {brand.results.find((d) => d.id === data.brand_id)?.product_brand_name}</InfoTypo>
            <InfoTypo>Size: {size.results.find((d) => d.id === data.size_id)?.product_size_name}</InfoTypo>

            <PriceTypo>{data.base_price}</PriceTypo>
            <Grid container>
              {/* <Grid item md={5}>
                <SizeSelector size={data.size} />
              </Grid> */}
              <Grid item md={4}>
                <QualityWrapper>
                  <ButtonQuality
                    disabled={quantity === 1}
                    onClick={() => {
                      setQuantity((prev) => prev - 1);
                    }}
                  >
                    -
                  </ButtonQuality>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    maxLength={3}
                    className="number-quantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(+e.target.value);
                    }}
                  />
                  <ButtonQuality
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                  >
                    +
                  </ButtonQuality>
                </QualityWrapper>
              </Grid>
            </Grid>

            <Box
              sx={{
                marginTop: '51px'
              }}
              className="tableBrand"
            >
              {data.product_description}
            </Box>

            <Divider sx={{ marginTop: '36px', marginBottom: '18px' }}></Divider>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  onClick={addToCart}
                  sx={{
                    padding: '18px 56px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(191, 140, 10, 1)',
                    boxShadow: 'none',
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '22px',
                    ':hover': {
                      backgroundColor: 'rgba(191, 140, 10, 1)'
                    }
                  }}
                >
                  Add to cart
                </Button>
              ) : (
                <DialogAuthCommon>
                  <Button
                    variant="contained"
                    sx={{
                      padding: '18px 56px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(191, 140, 10, 1)',
                      boxShadow: 'none',
                      fontFamily: 'Open Sans',
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '22px',
                      ':hover': { backgroundColor: 'rgba(191, 140, 10, 1)' }
                    }}
                  >
                    Login
                  </Button>
                </DialogAuthCommon>
              )}
            </Box>
            <Divider sx={{ marginTop: '19px' }}></Divider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
