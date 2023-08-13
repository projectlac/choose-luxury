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
  marginTop: '14px'
}));

const SubscribeCard = styled('div')(({ theme }) => ({
  padding: '47px 62px 40px 62px',
  height: '374px'
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
              display: { xs: 'none', md: 'block' },
              textAlign: 'right',
              height: '374px',
              [theme.breakpoints.down('lg')]: { textAlign: 'center' }
            }}
          >
            <SubscribeImage src={SubImage.src} alt="Berry" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SubscribeCard>
              <Grid container spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <Typography variant="h1" component="div" sx={{ fontSize: '20px', marginBottom: '27px' }}>
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
