// material-ui
import { Container, Grid, Typography } from '@mui/material';
import BestOfSaleItem from 'components/our-service/BestOfSaleItem';
import { IDataService } from 'types/services/serviceitem';
import image from '../../assets/header/serivce.png';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //
const data: IDataService[] = [
  { name: 'Bags', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_azzqsGfh.jpeg' },
  { name: 'Clothing', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_azzqsGfh.jpeg' },
  { name: 'Accessory', url: '/shop/men', image: 'https://pos.nvncdn.net/0a688a-28099/pc/20230518_azzqsGfh.jpeg' }
];
const BestOfSale = () => {
  return (
    <Container maxWidth={'xl'} sx={{ mt: 3 }}>
      <Typography
        component={'h2'}
        align="center"
        sx={{
          marginTop: '14px',
          fontWeight: 700,
          color: '#000',
          fontSize: '24px',
          textTransform: 'uppercase',
          fontFamily: 'Quicksand',
          paddingBottom: '20px'
        }}
      >
        BEST OF SALES
      </Typography>

      <Grid container columnSpacing={{ lg: 4, md: 3, xs: 2 }} rowSpacing={{ lg: 4, md: 3, xs: 2 }} sx={{ marginTop: '11px' }}>
        {data.map((d, index) => (
          <Grid item md={4} lg={4} sm={index === data.length - 1 ? 12 : 6} xs={12} key={index}>
            <BestOfSaleItem data={d} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BestOfSale;
