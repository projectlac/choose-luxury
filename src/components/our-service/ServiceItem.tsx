import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IDataService } from 'types/services/serviceitem';

import { Button, Typography } from '@mui/material';
import Link from 'next/link';
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
    <Box
      sx={{
        border: '1px solid #ddd',
        height: '422px',
        width: '100%',
        position: 'relative',
        img: {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        },
        '&:hover': {
          img: {
            opacity: 0.8,
            transition: 'all 0.3s ease-out'
          }
        }
      }}
    >
      <img src={data.image} alt={data.name}></img>
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
        <Link href="/shop/men">
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
        </Link>
      </ContentBox>
    </Box>
  );
}

export default ServiceItem;
