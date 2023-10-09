// material-ui
import { Box, Grid, Typography } from '@mui/material';
import LoginImage from 'assets/login/grr.png';
// project imports
import Logo from 'assets/header/logo.png';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import AuthLogin from 'components/authentication/auth-forms/AuthLogin';
import AuthRegister from 'components/authentication/auth-forms/AuthRegister';
import Image from 'next/image';
import { useState } from 'react';
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1';

// ================================|| AUTH3 - LOGIN ||================================ //

// carousel items

const Login = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <BackgroundPattern1>
            <Image alt="loginImage" src={LoginImage.src} layout="fill" objectFit="cover"></Image>
          </BackgroundPattern1>
        </Grid>
        <Grid item container justifyContent="center" md={6} lg={7} sx={{ my: 3 }}>
          <AuthCardWrapper>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '180px',
                    height: '150px',
                    position: 'relative',
                    margin: '0 auto'
                  }}
                >
                  <Image alt="loginImage" src={Logo.src} layout="fill" objectFit="cover"></Image>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {loginMode ? <AuthLogin /> : <AuthRegister setLoginMode={setLoginMode} />}
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '27px' }}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Box color={'#000'} sx={{ fontFamily: 'Roboto', display: 'flex', alignItems: 'center' }}>
                    <Typography color={'#000'} sx={{ textDecoration: 'none', fontFamily: 'Roboto', marginRight: '5px' }}>
                      {loginMode ? `Not registered yet, create a ${' '}` : 'Login'}{' '}
                    </Typography>
                    <Typography
                      // component={Link}
                      // href="/pages/authentication/auth1/register"
                      color={'rgba(21, 76, 218, 1)'}
                      sx={{ textDecoration: 'none', fontFamily: 'Roboto', cursor: 'pointer' }}
                      onClick={() => {
                        setLoginMode((prev) => !prev);
                      }}
                    >
                      {loginMode ? '  new account ' : 'here'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

Login.Layout = 'guestGuard';
export default Login;
