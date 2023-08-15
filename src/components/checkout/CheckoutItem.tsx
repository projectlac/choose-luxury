import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import FakeImage from 'assets/products/BAGS-removebg-preview.png';
import Image from 'next/image';

function CheckoutItem() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
  };
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
            <Image src={FakeImage.src} layout="fill" objectFit="contain" alt={'gaga'}></Image>
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
                Classic triomphe bag in shiny calfskin
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
                {`is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type`}
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
                  $20.20
                </Typography>
                <TextField
                  select
                  sx={{
                    width: '100px',
                    height: '32px',
                    '.MuiSelect-select': {
                      padding: '6px 10px',
                      background: '#fff',
                      textAlign: 'left'
                    }
                  }}
                  SelectProps={{
                    renderValue: (value) => {
                      return `Qty: ${value}`;
                    }
                  }}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </TextField>
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
            $20.20
          </Typography>
          <TextField
            select
            sx={{
              width: '100px',
              height: '32px',
              '.MuiSelect-select': {
                padding: '6px 10px',
                background: '#fff',
                textAlign: 'left'
              }
            }}
            SelectProps={{
              renderValue: (value) => {
                return `Qty: ${value}`;
              }
            }}
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutItem;
