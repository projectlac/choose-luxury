// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import MailerSubscriber from '../maintenance/ComingSoon/ComingSoon1/MailerSubscriber';
import { gridSpacing } from 'store/constant';
import SubImage from '../../assets/header/subimage.png';
// assets
// const imgMail = '/assets/images/landing/img-groupmail.png';

// styles
const SubscribeWrapper = styled('div')(({ theme }) => ({
  height: '374px',
  marginTop: '14px',
  [theme.breakpoints.down('xl')]: {
    height: '374px'
  },
  [theme.breakpoints.down('lg')]: {
    height: '374px'
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto'
  }
}));

const SubscribeCard = styled('div')(({ theme }) => ({
  height: '374px',
  [theme.breakpoints.down('xl')]: {
    padding: '47px 62px 40px 62px'
  },
  [theme.breakpoints.down('lg')]: {
    padding: '47px 40px 40px 40px'
  },
  [theme.breakpoints.down('md')]: {
    padding: '47px 25px 40px 25px'
  }
}));

const SubscribeImage = styled('img')({
  width: '100%',
  maxWidth: '100%',
  height: '374px',
  boxSizing: 'border-box'
});

// ============================|| LANDING - SUBSCRIBE PAGE ||============================ //

const Subscribe = () => {
  const theme = useTheme();

  return (
    <SubscribeWrapper sx={{ mt: 3 }}>
      <Container maxWidth={'xl'}>
        <Grid container alignItems="center" columnSpacing={gridSpacing}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: 'right',
              height: { md: '374px', xs: 'auto' },
              [theme.breakpoints.down('lg')]: { textAlign: 'center' }
            }}
          >
            <SubscribeImage src={SubImage.src} alt="Berry" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SubscribeCard>
              <Grid container spacing={2}>
                <Grid item xs={3} sx={{ display: { md: 'block', xs: 'none' } }}></Grid>
                <Grid item xs={12} md={9}>
                  <Typography
                    variant="h1"
                    component="div"
                    sx={{ fontSize: '20px', marginBottom: '27px', textAlign: { xs: 'center', md: 'left' } }}
                  >
                    Subscribe to receive 10% off
                  </Typography>
                </Grid>
              </Grid>

              <MailerSubscriber />
            </SubscribeCard>
          </Grid>
        </Grid>
      </Container>
    </SubscribeWrapper>
  );
};

export default Subscribe;
