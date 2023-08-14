import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

interface ProductFilterData {
  id: string;
  name: string;
  url: string;
}
const data: ProductFilterData[] = [
  {
    id: '123',
    name: `Men’s shoes`,
    url: ''
  },
  {
    id: '1233',
    name: `Men’s appearance `,
    url: ''
  },
  {
    id: '1231',
    name: ` Men’s accessories`,
    url: ''
  }
];
function ProductFilter() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <Box sx={{ marginBottom: '51px' }}>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '15px' }} justifyContent={'space-between'}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '16px',
            color: '#000',
            marginRight: '32px'
          }}
        >
          Product
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${toggle ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </Box>
      <Box display={`${!toggle ? 'block' : 'none'}`}>
        {data.map((d) => (
          <Link key={d.id} href={d.url}>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '14px',
                color: '#000',
                marginBottom: '15px'
              }}
            >
              {d.name}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default ProductFilter;
