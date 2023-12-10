import React from 'react';
// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormattedMessage } from 'react-intl';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { StringColorProps } from 'types';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const { setLoginMode, toggleTab } = others;
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState<StringColorProps>();
  const { register } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          re_password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          username: Yup.string().max(255).required('Username is required'),
          re_password: Yup.string().max(255).required('Confirm password is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const { email, username, password, re_password } = values;
          try {
            await register({ email, first_name: 'Tim', last_name: 'Dang', password, re_password, username });

            dispatch(
              openSnackbar({
                open: true,
                message: 'Register Successful',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            setLoginMode?.(true);
            toggleTab?.(0);

            // (res) => {
          } catch (err: any) {
            console.log(err);

            dispatch(
              openSnackbar({
                open: true,
                message: `${err.data?.non_field_errors?.[0] ?? err.data?.email?.[0]}`,
                variant: 'alert',
                alert: {
                  color: 'error'
                },

                severity: 'error',
                close: false
              })
            );
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-register" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-register"
                type="username"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Email{' '}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.re_password && errors.re_password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-re_password-register" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-re_password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.re_password}
                name="re_password"
                label="re_password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle re_password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {touched.re_password && errors.re_password && (
                <FormHelperText error id="standard-weight-helper-text-re_password-register">
                  {errors.re_password}
                </FormHelperText>
              )}
            </FormControl>
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 30 * strength, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        <FormattedMessage id={level?.label} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgba(191, 140, 10, 1)',
                    '&:hover': {
                      backgroundColor: 'rgb(167 121 3)'
                    }
                  }}
                >
                  <FormattedMessage id="register" />
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
