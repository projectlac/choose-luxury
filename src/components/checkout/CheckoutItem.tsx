import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { ICartList } from 'types/services/productApi.types';
import formatMoney from 'utils/formatMoney';

interface CheckoutItemProps {
  data: ICartList;
}
function CheckoutItem({ data }: CheckoutItemProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataGet, setDataGet] = useState<ICartList>(data);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
  };

  console.log(data);

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
              overflow: 'hidden'
            }}
          >
            <Image src={data.images[0].product_img} layout="fill" objectFit="cover" alt={'gaga'}></Image>
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
                {data.product_name}
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
                />
              </Box>

              <Button
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
                Remove
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
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutItem;
