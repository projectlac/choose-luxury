import { Box, Button, Typography } from '@mui/material';

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
  fontFamily: 'Open Sans'
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
  padding: ' 0px 36px 0px 11px'
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
  marginTop: '15px'
}));
function CheckoutDetail() {
  return (
    <Box>
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
      <BoxDetail sx={{ height: '260px', padding: '15px 41px 61px' }}>
        <Typography variant={'h2'} className="title" sx={{ fontSize: '24px', lineHeight: '32.68px' }}>
          Total
        </Typography>
        <Box sx={{ marginTop: '37px' }}>
          <TotalBox>
            <TotalTypo>Subtotal:</TotalTypo>
            <TotalTypo>VND 9.000.000.00</TotalTypo>
          </TotalBox>

          <TotalBox>
            <TotalTypo>Total:</TotalTypo>
            <TotalTypo>VND 9.000.000.00</TotalTypo>
          </TotalBox>
        </Box>
      </BoxDetail>
      <BoxDetail sx={{ height: '190px', padding: '37px 25px 30px' }}>
        <Box display={'flex'} justifyContent={'space-between'} sx={{ marginBottom: '17px' }}>
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
        <Box display={'flex'} justifyContent={'space-between'}>
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
    </Box>
  );
}

export default CheckoutDetail;
