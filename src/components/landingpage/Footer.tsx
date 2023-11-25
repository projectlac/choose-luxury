import Image from 'next/image';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import FacebookIcon from '../../assets/footer/facebook.png';
import TwitterIcon from '../../assets/footer/twitter.png';
import InstagramIcon from '../../assets/footer/instagram.png';

const logoDark = '/assets/images/logo-white.svg';

// styles
const FooterWrapper = styled('div')(({ theme }) => ({
  padding: '35px 0',
  color: '#000',
  background: '#fff',

  height: '280px',
  borderTop: '1px solid rgba(191, 140, 10, 1)',
  marginTop: '36px'
}));

const Title = styled(Typography)({
  color: '#000',
  fontSize: '15px',
  lineHeight: '18px',
  fontWeight: 'bold',
  marginBottom: '10px'
});

const Detail = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '15px',
  lineHeight: '1.7'
}));
import Logo from '../../assets/header/logo.png';
import { FormattedMessage } from 'react-intl';

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {
  const theme = useTheme();
  return (
    <>
      <FooterWrapper>
        <Container maxWidth="xl">
          <Grid container alignItems="flex-start" spacing={gridSpacing}>
            <Grid item xs={12} sm={2} textAlign={{ md: 'left', xs: 'center' }}>
              <Image src={Logo.src} alt="Berry" width={137} height={115} layout={'intrinsic'} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Title>
                <FormattedMessage id="address" />
              </Title>
              <Detail>
                Central 3, Vinhome central park, <br /> 252 Nguyen Huu Canh street, Ward 22, <br /> Binh Thanh district, HCM
              </Detail>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Title>
                <FormattedMessage id="term-footer" />
              </Title>
              <Detail>Purchasing policy </Detail>
              <Detail>Payment method</Detail>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Title>
                <FormattedMessage id="contact-us" />
              </Title>
              <Detail>Phone: 0945821194/ 0334820791</Detail>
              <Detail>Email: info@chooseluxauth.com</Detail>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Title>
                <FormattedMessage id="follow-us" />
              </Title>
              <Box
                sx={{
                  a: {
                    marginRight: '15px'
                  }
                }}
              >
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src={FacebookIcon.src} alt="facebook" width={22} height={22}></Image>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src={InstagramIcon.src} alt="instargram" width={22} height={22}></Image>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src={TwitterIcon.src} alt="twitter" width={22} height={22}></Image>
                </a>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FooterWrapper>
    </>
  );
};

export default FooterPage;
