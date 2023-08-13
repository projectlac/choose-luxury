import { Box, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PriceFilter from './PriceFilter';
import ProductFilter from './ProductFilter';
import SizeFilter from './SizeFilter';
import BrandFilter from './BrandFilter';
function Filter() {
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '50px' }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '24px',
            color: '#000',
            marginRight: '40px'
          }}
        >
          Filter
        </Typography>
        <ArrowForwardIosIcon sx={{ color: '#000' }} />
      </Box>
      <PriceFilter />
      <ProductFilter />
      <SizeFilter />
      <BrandFilter />
    </Box>
  );
}

export default Filter;
