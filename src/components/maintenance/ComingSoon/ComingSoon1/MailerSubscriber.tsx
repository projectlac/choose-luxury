// material-ui
import { Box, Button, FormControl, FormHelperText, Grid, OutlinedInput, Typography, useMediaQuery, useTheme } from '@mui/material';

// third party
import axios from 'axios';
import clsx from 'clsx';
import { Formik } from 'formik';
import { useDispatch } from 'store';
import * as Yup from 'yup';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ===========================|| MAILER SUBSCRIBER ||=========================== //

const MailerSubscriber = ({ className, ...others }: { className?: string }) => {
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          name: Yup.string().email('Must be a valid name').max(255).required('Name is required'),
          phone: Yup.number().required('Phone is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const options = {
              headers: {
                'content-type': 'application/json'
              }
            };
            await axios.post('https://yourapicall', { email: values.email }, options);
            dispatch(
              openSnackbar({
                open: true,
                message: 'Success! Please check inbox and confirm.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );

            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err: any) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err?.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={clsx(className)} {...others}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={3} sx={{ display: { md: 'block', xs: 'none' } }}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                  <OutlinedInput
                    id="outlined-adornment-name-forgot"
                    type="name"
                    defaultValue={values.name}
                    placeholder={matchDownMD ? 'Name' : ''}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <Box sx={{ position: 'absolute', bottom: '-16px' }}>
                      <FormHelperText sx={{ fontSize: '11px' }} error id="standard-weight-helper-text-name-forgot">
                        {errors.name}
                      </FormHelperText>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3} sx={{ display: { md: 'block', xs: 'none' } }}>
                <Typography>Email adress</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                  <OutlinedInput
                    id="outlined-adornment-email-forgot"
                    type="email"
                    placeholder={matchDownMD ? 'Email Address' : ''}
                    defaultValue={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <Box sx={{ position: 'absolute', bottom: '-16px' }}>
                      <FormHelperText sx={{ fontSize: '11px' }} error id="standard-weight-helper-text-email-forgot">
                        {errors.email}
                      </FormHelperText>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3} sx={{ display: { md: 'block', xs: 'none' } }}>
                <Typography>Phone number</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ position: 'relative' }}>
                  <OutlinedInput
                    id="outlined-adornment-phone-forgot"
                    type="phone"
                    placeholder={matchDownMD ? 'Phone Number' : ''}
                    defaultValue={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.phone && errors.phone && (
                    <Box sx={{ position: 'absolute', bottom: '-16px' }}>
                      <FormHelperText sx={{ fontSize: '11px' }} error id="standard-weight-helper-text-phone-forgot">
                        {errors.phone}
                      </FormHelperText>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3} sx={{ display: { md: 'block', xs: 'none' } }}></Grid>
              <Grid item xs={12} md={9} sx={{ marginTop: '30px', paddingTop: '0 !important' }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 2.75,
                    py: 1.5,
                    width: { md: '130px', xs: '100%' }
                  }}
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MailerSubscriber;
