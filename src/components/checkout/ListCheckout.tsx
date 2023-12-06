import { Box, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'store';
import { ICartList } from 'types/services/productApi.types';
import { getProductById } from '../../../api/ProductAPI/productDashboash';
import CheckoutItem from './CheckoutItem';

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
  const [listCart, setListCart] = useState<ICartList[]>([]);
  const products = useSelector((state) => state.cart.checkout.products);

  const fetch = useCallback(async () => {
    const dm = await Promise.all(
      products.map(async (product) => {
        const res = await getProductById(product.id);
        return { ...res.data, quantity: product.quantity };
      })
    );
    setListCart(dm);

    // if (products.length > 0) {
    //   products.forEach(async (item) => {
    //     await getProductById(item.id).then((res) => {
    //       data.push(res.data);
    //     });
    //   });

    //   setListCart(data);
    // }
  }, [products]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <>
      {listCart.map((item) => (
        <CheckoutItem key={item.id} data={item} />
      ))}

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
