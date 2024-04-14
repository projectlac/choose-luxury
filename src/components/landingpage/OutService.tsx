// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import men from '../../assets/header/man.jpg';
import women from '../../assets/header/woman.jpg';
import entrupy from '../../assets/header/closet.jpg';

import ServiceItem from 'components/our-service/ServiceItem';
import { IDataService } from 'types/services/serviceitem';
import { FormattedMessage } from 'react-intl';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //
const data: IDataService[] = [
  { name: 'Men', url: '/shop/Men', image: men.src },
  { name: 'Women', url: '/shop/Women', image: women.src },
  { name: 'Spa and legit check by entrupy', url: '/shop/men', image: entrupy.src }
];
const OutService = () => {
  return (
    <Container
      maxWidth={'xl'}
      sx={{
        mt: 3
      }}
    >
      <Typography
        component={'h2'}
        align="center"
        sx={{
          fontWeight: 700,
          color: '#000',
          fontSize: '24px',
          textTransform: 'uppercase',
          fontFamily: 'Quicksand',
          paddingBottom: '20px'
        }}
      >
        <FormattedMessage id="our-service" />
      </Typography>

      <Grid container columnSpacing={{ lg: 4, md: 3, xs: 2 }} rowSpacing={{ lg: 4, md: 3, xs: 2 }} sx={{ marginTop: '11px' }}>
        {data.map((d, index) => (
          <Grid item md={4} lg={4} sm={index === data.length - 1 ? 12 : 6} xs={12} key={index}>
            <ServiceItem data={d} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OutService;
