import { Box, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { IFormProfile } from 'types/services/profileApi.types';
import * as Yup from 'yup';

import { CustomButton } from 'common/button';
import { useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import { useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import authApi from '../../../../api/AuthenticationApi/AuthApi';
function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const theme = useTheme();
  const intl = useIntl();
  const [defaultProfile, setDefaultProfile] = useState<IFormProfile>({
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
    submit: null
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: defaultProfile,
    validationSchema: Yup.object().shape({
      email: Yup.string().email().max(255).required('Email is required'),
      first_name: Yup.string().max(255).required('First name is required'),
      last_name: Yup.string().max(255).required('Last name is required'),
      phoneNumber: Yup.string().max(255).required('Phone number is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const { email, first_name, last_name, phoneNumber } = values;
        if (!user || !user?.id) return;
        const res = await authApi.updateProfile(user?.id, { email, first_name, last_name, phone: phoneNumber, sex: 'Female' });

        if (res.status === 200) {
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
        }
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

  const getProfileOfUser = useCallback(async () => {
    if (user?.id) {
      const res = await authApi.getProfile(user.id);
      const param: IFormProfile = {
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        phoneNumber: res.data.phone ?? '',
        submit: null
      };
      setDefaultProfile(param);
    }
  }, [user]);

  useEffect(() => {
    getProfileOfUser();
  }, [getProfileOfUser]);

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
          <Grid item md={6} xs={12}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.first_name && formik.errors.first_name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-first_name-login"> {`${intl.formatMessage({ id: 'first_name' })}`} </InputLabel>
              <OutlinedInput
                id="outlined-adornment-first_name-login"
                type="first_name"
                value={formik.values.first_name}
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'first_name' })}`}
                inputProps={{}}
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <FormHelperText error id="standard-weight-helper-text-first_name-login">
                  {formik.errors.first_name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.last_name && formik.errors.last_name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-last_name-login"> {`${intl.formatMessage({ id: 'last_name' })}`} </InputLabel>
              <OutlinedInput
                id="outlined-adornment-last_name-login"
                type="last_name"
                value={formik.values.last_name}
                name="last_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'last_name' })}`}
                inputProps={{}}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <FormHelperText error id="standard-weight-helper-text-last_name-login">
                  {formik.errors.last_name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login"> {`${intl.formatMessage({ id: 'email-address' })}`} </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'email-address' })}`}
                inputProps={{}}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-phoneNumber-login"> {`${intl.formatMessage({ id: 'phone-number' })}`} </InputLabel>
              <OutlinedInput
                id="outlined-adornment-phoneNumber-login"
                type="phoneNumber"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={`${intl.formatMessage({ id: 'phone-number' })}`}
                inputProps={{}}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <FormHelperText error id="standard-weight-helper-text-phoneNumber-login">
                  {formik.errors.phoneNumber}
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

export default UserProfile;
