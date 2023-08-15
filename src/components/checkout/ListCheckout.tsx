import { Box, Button } from '@mui/material';
import CheckoutItem from './CheckoutItem';
import { styled } from '@mui/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  width: '174px',
  height: '46px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(191, 140, 10, 1)',
  fontFamily: 'Open Sans',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '27px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(151 111 8)'
  },
  [theme.breakpoints.down('md')]: {
    width: '48%'
  }
}));
function ListCheckout() {
  return (
    <>
      <CheckoutItem />
      <CheckoutItem />
      <CheckoutItem />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CustomButton>Back to shop</CustomButton>
        <CustomButton>Remove all</CustomButton>
      </Box>
    </>
  );
}

export default ListCheckout;
