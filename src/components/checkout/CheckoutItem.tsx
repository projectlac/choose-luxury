import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { removeProduct } from 'store/slices/cart';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import { CartProductStateProps } from 'types/cart';
import { ICartList } from 'types/services/productApi.types';
import { REGEX_NUMBER } from 'utils/const';
import formatMoney from 'utils/formatMoney';

interface CheckoutItemProps {
  data: ICartList;
}
function CheckoutItem({ data }: CheckoutItemProps) {
  const intl = useIntl();
  const [lastValue, setLastValue] = React.useState(0);
  const products = useSelector((state) => state.cart.checkout.products);

  const [dataGet, setDataGet] = useState<ICartList>(data);

  const handleChangeQuantity = useCallback(
    (e) => {
      if (dataGet.quantity) {
        const findData = products.map((pro) => {
          if (pro.id === dataGet.id) return { ...pro, quantity: +dataGet.quantity };
          else return pro;
        });
        dispatch(showLoading());
        dispatch(removeProduct(findData));
        dispatch(hiddenLoading());
      } else {
        const oldValue = { ...data };
        oldValue.quantity = lastValue;
        setDataGet(oldValue);
      }
    },
    [data, dataGet.id, dataGet.quantity, lastValue, products]
  );

  const handleRemoveProduct = useCallback(() => {
    const newList: CartProductStateProps[] = [];
    products.forEach((pro) => {
      if (pro.id !== dataGet.id) newList.push(pro);
    });
    dispatch(showLoading());
    dispatch(removeProduct(newList));
    dispatch(hiddenLoading());
  }, [dataGet, products]);

  useEffect(() => {
    setDataGet(data);
    setLastValue(+data.quantity);
  }, [data]);

  return (
    <Box
      sx={{
        height: '171px',
        borderBottom: '1px solid rgba(169, 169, 169, 1)',
        marginBottom: '19px'
      }}
    >
      <Grid container>
        <Grid item md={3} sm={3} xs={4}>
          <Box
            sx={{
              width: { lg: '125px', sm: '100px', xs: '80px' },
              height: { lg: '133px', sm: '105px', xs: '85px' },
              position: 'relative',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              marginTop: '10px',
              borderRadius: '5px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <Link href={`/product-detail/${data.id}`}>
              <a target="__blank">
                <Image src={data.images[0].product_img} layout="fill" objectFit="cover" alt={'gaga'}></Image>
              </a>
            </Link>
          </Box>
        </Grid>
        <Grid item md={6} sm={6} xs={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '148px', marginTop: '10px' }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '12px',
                  fontWeight: '700',
                  lineHeight: '16px',
                  marginBottom: '15px',
                  color: '#000'
                }}
              >
                <Link href={`/product-detail/${data.id}`}>
                  <a target="__blank">{data.product_name}</a>
                </Link>
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '10px',
                  fontWeight: '400',
                  lineHeight: '14px',
                  color: '#000',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '3',
                  overflow: 'hidden'
                }}
              >
                {data.product_description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    color: '#000',
                    paddingRight: '10px'
                  }}
                >
                  {formatMoney(data.base_price)} VNĐ
                </Typography>

                <TextField
                  id="outlined-start-adornment"
                  sx={{
                    width: '100px',
                    height: '32px',
                    '& .MuiOutlinedInput-input': {
                      padding: '7px 5px'
                    }
                  }}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const oldValue = { ...data };
                    oldValue.quantity = +e.target.value;
                    setDataGet(oldValue);
                  }}
                  value={dataGet.quantity}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Qty: </InputAdornment>
                  }}
                  onBlur={handleChangeQuantity}
                />
              </Box>

              <Button
                onClick={handleRemoveProduct}
                variant={'contained'}
                sx={{
                  backgroundColor: 'rgba(191, 140, 10, 1)',
                  padding: '8px 17px ',
                  boxShadow: 'none',
                  borderRadius: '5px',
                  fontFamily: 'Open Sans',
                  fontSize: '12px',
                  fontWeight: '700',
                  lineHeight: '16px',
                  height: '37px',
                  '&:hover': {
                    backgroundColor: 'rgb(151 111 8)'
                  }
                }}
              >
                {`${intl.formatMessage({ id: 'remove' })}`}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            textAlign: 'right',
            display: { sm: 'block', xs: 'none' }
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '12px',
              fontWeight: '700',
              lineHeight: '16px',
              color: '#000',
              paddingRight: '10px'
            }}
          >
            {formatMoney(data.base_price)} VNĐ
          </Typography>
          <TextField
            id="outlined-start-adornment"
            sx={{
              width: '100px',
              height: '32px',
              '& .MuiOutlinedInput-input': {
                padding: '7px 5px'
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (REGEX_NUMBER.test(e.target.value)) {
                const oldValue = { ...data };
                oldValue.quantity = e.target.value;
                setDataGet(oldValue);
                if (e.target.value) {
                  setLastValue(+e.target.value);
                }
              }
              // if (isNumber(Number(e.target.value))) {
              //   const oldValue = { ...data };
              //   setDataGet(oldValue);
            }}
            value={dataGet?.quantity ?? 0}
            InputProps={{
              startAdornment: <InputAdornment position="start">Qty: </InputAdornment>
            }}
            onBlur={handleChangeQuantity}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutItem;
