// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import image from '../../assets/header/serivce.png';
import ServiceItem from 'components/our-service/ServiceItem';
import { IDataService } from 'types/services/serviceitem';
// project imports

// =============================|| LANDING - FEATURE PAGE ||============================= //
const data: IDataService[] = [
  { name: 'Men', url: '/shop/men', image: image.src },
  { name: 'Women', url: '/shop/men', image: image.src },
  { name: 'Spa and legit check by entrupy', url: '/shop/men', image: image.src }
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
        sx={{ fontWeight: 700, color: '#000', fontSize: '24px', textTransform: 'uppercase', fontFamily: 'Quicksand' }}
      >
        Out Service
      </Typography>

      <Grid container columnSpacing={4} sx={{ marginTop: '11px' }}>
        {data.map((d, index) => (
          <Grid item md={4} xs={12} key={index}>
            <ServiceItem data={d} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OutService;
