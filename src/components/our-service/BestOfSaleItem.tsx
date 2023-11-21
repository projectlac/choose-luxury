import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

import { Button } from '@mui/material';
import { IDataService } from 'types/services/serviceitem';
interface BestOfSaleItemProps {
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
function BestOfSaleItem({ data }: BestOfSaleItemProps) {
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
      <img src={data?.image || ''} alt={data?.name}></img>
      <ContentBox>
        <a href={data?.url}>
          <Button
            sx={{
              border: '1px solid #BF8C0A',
              borderRadius: '4px',
              marginTop: '12px',
              height: '31px',
              fontSize: '13px',
              color: '#000',
              background: '#EEEEEE',
              padding: '10px 43px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Quicksand'
            }}
          >
            {data.name}
          </Button>
        </a>
      </ContentBox>
    </Box>
  );
}

export default BestOfSaleItem;
