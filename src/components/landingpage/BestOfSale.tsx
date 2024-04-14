// material-ui
import { Container, Grid, Typography } from '@mui/material';
import BestOfSaleItem from 'components/our-service/BestOfSaleItem';
import { IDataService } from 'types/services/serviceitem';
import accessories from '../../assets/header/accessories.jpg';
import bag from '../../assets/header/bag.jpg';
import clothing from '../../assets/header/clothing.jpg';

import { FormattedMessage } from 'react-intl';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //
const data: IDataService[] = [
  { name: 'Bags', url: '/shop/men', image: bag.src },
  { name: 'Clothing', url: '/shop/men', image: clothing.src },
  { name: 'Accessory', url: '/shop/men', image: accessories.src }
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
        <FormattedMessage id="best-of-sale" />
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
