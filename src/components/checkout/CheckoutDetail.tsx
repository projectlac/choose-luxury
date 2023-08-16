import { Box, Button, Grid, Typography } from '@mui/material';

import { styled } from '@mui/styles';
import Momo from 'assets/checkout/MoMo_Logo.png';
import VnPay from 'assets/checkout/492x0w.png';
import Zalo from 'assets/checkout/Logo-Zalo-Arc.webp';
import Messenger from 'assets/checkout/Messenger.png';
import Image from 'next/image';
const BoxDetail = styled(Box)(({ theme }) => ({
  marginBottom: '14px',
  border: '1px solid rgba(169, 169, 169, 1)',
  borderRadius: '10px',
  '.title': {
    fontFamily: 'Open Sans',
    fontWeight: '700'
  }
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: '130px',
  height: '46px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(191, 140, 10, 1)',
  fontFamily: 'Open Sans',
  fontSize: '13px',
  fontWeight: '700',
  lineHeight: '16.34px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(151 111 8)'
  }
}));

const PromotionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginTop: '25px',
  justifyContent: 'space-between'
}));

const PromotionInput = styled('input')(({ theme }) => ({
  height: '46px',
  width: 'calc(100% - 137px)',
  outline: 'none',
  fontSize: '17px',
  padding: '5px 10px',
  fontFamily: 'Open Sans',
  borderRadius: '8px',
  border: '1px solid #a9a9a9'
}));

const TotalBox = styled(Box)(({ theme }) => ({
  height: '54.28px',
  background: ' rgba(217, 217, 217, 1)',
  marginBottom: '8.75px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const TotalTypo = styled(Box)(({ theme }) => ({
  fontFamily: 'Lato',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '24px',
  color: '#000',
  padding: ' 0px 36px 0px 11px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '15px'
  }
}));

const PaymentLink = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  margin: '15px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    width: '60px',
    height: '60px',
    margin: '15px 10px'
  }
}));
function CheckoutDetail() {
  return (
    <Box>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item md={12} xs={12} sm={12}>
          <BoxDetail
            sx={{
              height: '126px',
              padding: '8px 23px 22px'
            }}
          >
            <Typography variant={'h2'} className="title" sx={{ fontSize: '20px', lineHeight: '27px' }}>
              Promotion Code
            </Typography>
            <PromotionWrapper>
              <PromotionInput type="text" className="coupon" />
              <CustomButton>Apply coupon</CustomButton>
            </PromotionWrapper>
          </BoxDetail>
        </Grid>
        <Grid item md={12} xs={12} sm={6}>
          <BoxDetail sx={{ height: { md: '260px', xs: '250px' }, padding: { md: '15px 41px 61px', xs: '8px 23px 22px' } }}>
            <Typography variant={'h2'} className="title" sx={{ fontSize: '24px', lineHeight: '32.68px' }}>
              Total
            </Typography>
            <Box sx={{ marginTop: '37px' }}>
              <TotalBox>
                <TotalTypo sx={{ width: '25%' }}>Subtotal:</TotalTypo>
                <TotalTypo>VND 9.000.000.00</TotalTypo>
              </TotalBox>

              <TotalBox>
                <TotalTypo sx={{ width: '25%' }}>Total:</TotalTypo>
                <TotalTypo>VND 9.000.000.00</TotalTypo>
              </TotalBox>
            </Box>
          </BoxDetail>
        </Grid>
        <Grid item md={12} xs={12} sm={6}>
          <BoxDetail
            sx={{
              height: 'auto',
              padding: { md: '37px 25px 30px', xs: '8px 23px 22px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Box alignItems={'center'} sx={{ marginBottom: { md: '17px', xs: '0px' }, flexDirection: { lg: 'row', xs: 'column' } }}>
              <Typography
                textAlign={'center'}
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '19px',
                  color: '#000'
                }}
              >
                Pay Now
              </Typography>
              <Box display={'flex'} justifyContent={'center'}>
                <PaymentLink>
                  <Image src={Momo.src} layout="fill" objectFit="contain" alt={'Momo'} />
                </PaymentLink>
                <PaymentLink>
                  <Image src={VnPay.src} layout="fill" objectFit="contain" alt={'VnPay'} />
                </PaymentLink>
              </Box>
            </Box>
            <Box alignItems={'center'} sx={{ flexDirection: { lg: 'row', xs: 'column' } }}>
              <Typography
                textAlign={'center'}
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '19px',
                  color: '#000'
                }}
              >
                Chat Now
              </Typography>
              <Box display={'flex'} justifyContent={'center'}>
                <PaymentLink>
                  <Image src={Zalo.src} layout="fill" objectFit="contain" alt={'Zalo'} />
                </PaymentLink>
                <PaymentLink>
                  <Image src={Messenger.src} layout="fill" objectFit="contain" alt={'Messenger'} />
                </PaymentLink>
              </Box>
            </Box>
          </BoxDetail>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutDetail;
