import Link from 'Link';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports

import AuthForgotPassword from 'components/authentication/auth-forms/AuthForgotPassword';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';

// ============================|| AUTH3 - FORGOT PASSWORD ||============================ //

const ForgotPassword = ({ handleChangeMode }: { handleChangeMode?: (data: boolean) => void }) => {
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sx={{ mb: 0 }}>
        <AuthCardWrapper>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography color={'#000'} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                    Forgot password?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" fontSize="16px" textAlign="center">
                    Enter your email address below and we&apos;ll send you password reset OTP.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AuthForgotPassword />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid item container direction="column" alignItems="center" xs={12}>
                <Typography
                  // component={Link}
                  // href={isLoggedIn ? '/pages/authentication/auth3/login' : '/login'}
                  onClick={() => {
                    handleChangeMode?.(false);
                  }}
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  Already have an account?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AuthCardWrapper>
      </Grid>
    </Grid>
  );
};
ForgotPassword.Layout = 'minimalLayout';
export default ForgotPassword;
