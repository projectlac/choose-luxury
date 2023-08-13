import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';
import { IProductDetail } from 'types/shop/product';
import SizeSelector from './SizeSelector';
interface IProductDetailProps {
  data: IProductDetail;
}

const InfoTypo = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '19px',
  color: '#000',
  marginBottom: '16px',
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
  width: '33px',
  height: '33px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #000',
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
    height: '33px',
    width: '67px',
    border: '1px solid #000',
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
function ProductDetail({ data }: IProductDetailProps) {
  const [quanlity, setQuanlity] = useState<number>(1);
  return (
    <Container>
      <Grid container columnSpacing={10}>
        <Grid item md={6}>
          <Box sx={{ widTh: '100%', height: '634px', position: 'relative', background: 'rgba(169, 169, 169, 1)' }}>
            <Image alt={data.name} src={data.image} layout="fill" objectFit="contain"></Image>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
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
                marginBottom: '20px'
              }}
            >
              {data.name}
            </Typography>
            <InfoTypo>product code: {data.productCode}</InfoTypo>
            <InfoTypo>brand: {data.brand}</InfoTypo>
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
                  lineHeight: '22px'
                }}
              >
                Add to cart
              </Button>
            </Box>
            <Divider sx={{ marginTop: '19px' }}></Divider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
