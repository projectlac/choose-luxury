import { Box, Button, Grid, Typography } from '@mui/material';

import { styled } from '@mui/styles';

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
  fontSize: '12px',
  fontWeight: '700',
  lineHeight: '16.34px',
  color: '#000',
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
  width: '115.15px',
  height: '39px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(191, 140, 10, 1)',
  borderRadius: '10px',
  marginLeft: '37px',
  marginTop: '15px',
  [theme.breakpoints.down('lg')]: {
    margin: '15px'
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
          <BoxDetail sx={{ height: { md: '260px', xs: '225px' }, padding: { md: '15px 41px 61px', xs: '8px 23px 22px' } }}>
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
          <BoxDetail sx={{ height: { lg: '190px', md: 'auto', xs: '225px' }, padding: { md: '37px 25px 30px', xs: '8px 23px 22px' } }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ marginBottom: '17px', flexDirection: { lg: 'row', xs: 'column' } }}
            >
              <Typography
                textAlign={'left'}
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
              <Box display={'flex'}>
                <PaymentLink>Momo</PaymentLink>
                <PaymentLink>VNPAY</PaymentLink>
              </Box>
            </Box>
            <Box
              display={'flex'}
              justifyContent={{ md: 'space-between' }}
              alignItems={'center'}
              sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
            >
              <Typography
                textAlign={'left'}
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
              <Box display={'flex'}>
                <PaymentLink>Zalo</PaymentLink>
                <PaymentLink>Messenger</PaymentLink>
              </Box>
            </Box>
          </BoxDetail>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutDetail;
