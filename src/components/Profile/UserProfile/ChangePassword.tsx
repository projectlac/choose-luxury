import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IFormChangePassword, IFormProfile } from 'types/services/profileApi.types';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { useIntl } from 'react-intl';
import { CustomButton } from 'common/button';
import authApi from '../../../../api/AuthenticationApi/AuthApi';
import useAuth from 'hooks/useAuth';
function ChangePassword() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const theme = useTheme();
  const intl = useIntl();
  const [defaultProfile, setDefaultProfile] = useState<IFormChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    submit: null
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: defaultProfile,
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().max(255).required('Current password is required'),
      newPassword: Yup.string().max(255).required('New password is required'),
      confirmPassword: Yup.string()
        .max(255)
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const { currentPassword, newPassword, confirmPassword } = values;
        if (!user || !user?.id) return;
        const res = await authApi.changePassword({
          current_password: currentPassword,
          new_password: newPassword,
          re_new_password: confirmPassword
        });

        dispatch(
          openSnackbar({
            open: true,
            message: 'Update profile successful!',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      } catch (err: any) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Something failed',
            variant: 'alert',
            alert: {
              color: 'error'
            },

            severity: 'error',
            close: false
          })
        );
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container columnSpacing={2}>
          {/* <Grid item md={12}>
          <Stack direction={'row'} alignItems={'center'}>
            <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
            <Stack direction={'row'} alignItems={'center'} sx={{ ml: 1 }}>
              <InfoOutlinedIcon sx={{ width: 15, height: 15 }} />
              Image size Limit should be 125kb Max.
            </Stack>
          </Stack>
        </Grid> */}
          <Grid item md={12} xs={12}>
            <Grid container columnSpacing={2}>
              <Grid item md={6} xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-currentPassword-login">
                    {`${intl.formatMessage({ id: 'current-password' })}`}{' '}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-currentPassword-login"
                    value={formik.values.currentPassword}
                    name="currentPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label={`${intl.formatMessage({ id: 'current-password' })}`}
                    inputProps={{}}
                    type={showPassword ? 'text' : 'password'}
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
                  />
                  {formik.touched.currentPassword && formik.errors.currentPassword && (
                    <FormHelperText error id="standard-weight-helper-text-currentPassword-login">
                      {formik.errors.currentPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-newPassword-login"> {`${intl.formatMessage({ id: 'new-password' })}`} </InputLabel>
              <OutlinedInput
                id="outlined-adornment-newPassword-login"
                value={formik.values.newPassword}
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'new-password' })}`}
                inputProps={{}}
                type={showPassword ? 'text' : 'password'}
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
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <FormHelperText error id="standard-weight-helper-text-newPassword-login">
                  {formik.errors.newPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-confirmPassword-login">
                {' '}
                {`${intl.formatMessage({ id: 'confirm-password' })}`}{' '}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-login"
                value={formik.values.confirmPassword}
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'confirm-password' })}`}
                inputProps={{}}
                type={showPassword ? 'text' : 'password'}
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
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
                  {formik.errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={12} xs={12} mt={2}>
            <Stack direction={'row'} justifyContent={'flex-end'}>
              <CustomButton
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
                sx={{
                  [theme.breakpoints.down('md')]: {
                    width: '100%',
                    minWidth: 'inherit',
                    fontSize: '15px',
                    height: '35px'
                  }
                }}
              >
                Update
              </CustomButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ChangePassword;
