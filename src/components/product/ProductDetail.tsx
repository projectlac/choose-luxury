import { Box, Button, Container, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';
import { IProductDetail } from 'types/shop/product';
import SizeSelector from './SizeSelector';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import Slider from 'react-slick';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import { useSelector } from 'store';

interface IProductDetailProps {
  data: IProductDetail;
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
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [quanlity, setQuanlity] = useState<number>(1);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={10}>
        <Grid item md={6} xs={12}>
          {matchDownSM ? (
            <Slider {...settings}>
              {data.image.map((d, index) => (
                <BoxImage key={index}>
                  <Image src={d} layout="fill" alt="" objectFit="cover"></Image>
                </BoxImage>
              ))}
            </Slider>
          ) : (
            <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} thumbnail={true}>
              {data.image.map((d, index) => (
                <a
                  href={d}
                  key={index}
                  style={{
                    width: `${data.image.length === 1 ? '100%' : '50%'}`,
                    padding: '5px'
                  }}
                >
                  <Box
                    sx={{
                      width: `100%`,
                      height: `${data.image.length === 1 ? '634px' : '350px'}`,
                      position: 'relative',
                      background: 'rgb(224 224 224)'
                    }}
                  >
                    <Image alt={data.name} src={d} layout="fill" objectFit="contain"></Image>
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
              {data.name}
            </Typography>
            <InfoTypo>Product code: {data.productCode}</InfoTypo>
            <InfoTypo>Brand: {data.brand}</InfoTypo>
            <PriceTypo>{data.price}</PriceTypo>
            <Grid container>
              <Grid item md={5}>
                <SizeSelector size={data.size} />
              </Grid>
              <Grid item md={4}>
                <QualityWrapper>
                  <ButtonQuality
                    disabled={quanlity === 1}
                    onClick={() => {
                      setQuanlity((prev) => prev - 1);
                    }}
                  >
                    -
                  </ButtonQuality>
                  <input
                    type="number"
                    name="quanlity"
                    min="1"
                    maxLength={3}
                    className="number-quanlity"
                    value={quanlity}
                    onChange={(e) => {
                      setQuanlity(+e.target.value);
                    }}
                  />
                  <ButtonQuality
                    onClick={() => {
                      setQuanlity((prev) => prev + 1);
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
              <table>
                <tr>
                  <th>Brand</th>
                  <th>Vetement</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td> <td></td>
                </tr>
              </table>
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
                    Đăng nhập ngay
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
