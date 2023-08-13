import { Box } from '@mui/system';
import React from 'react';
import { IDataService } from 'types/services/serviceitem';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';

import { Button, Typography } from '@mui/material';
interface ServiceItemProps {
  data: IDataService;
}

const ContentBox = styled(Box)(({ theme }) => ({
  height: '96px',
  background: '#fff',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  textAlign: 'center',
  padding: '20px 0 17px'
}));
function ServiceItem({ data }: ServiceItemProps) {
  return (
    <Box sx={{ border: '1px solid #ddd', height: '422px', width: '100%', position: 'relative' }}>
      <Image src={data.image} layout="fill" objectFit="cover" alt={data.name}></Image>
      <ContentBox>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#000',
            fontFamily: 'Quicksand'
          }}
        >
          {data.name}
        </Typography>
        <a href={data.url}>
          <Button
            sx={{
              border: '1px solid #BF8C0A',
              borderRadius: '0',
              marginTop: '12px',
              height: '31px',
              fontSize: '13px',
              color: '#000',
              fontFamily: 'Quicksand'
            }}
          >
            Shop Now
          </Button>
        </a>
      </ContentBox>
    </Box>
  );
}

export default ServiceItem;
