// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

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
import { FormattedMessage, useIntl } from 'react-intl';

// ===========================|| MAILER SUBSCRIBER ||=========================== //

const MailerSubscriberContact = ({ className, ...others }: { className?: string }) => {
  const scriptedRef = useScriptRef();
  const intl = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
          phone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required(`${`${intl.formatMessage({ id: 'email-address' })}`} ${`${intl.formatMessage({ id: 'is-required' })}`}`),
          name: Yup.string()
            .email('Must be a valid name')
            .max(255)
            .required(`${`${intl.formatMessage({ id: 'name' })}`} ${`${intl.formatMessage({ id: 'is-required' })}`}`),
          phone: Yup.number().required(
            `${`${intl.formatMessage({ id: 'phone-number' })}`} ${`${intl.formatMessage({ id: 'is-required' })}`}`
          )
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
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                  <InputLabel htmlFor="outlined-adornment-name-login">{`${intl.formatMessage({ id: 'name' })}`} </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name-forgot"
                    defaultValue={values.name}
                    placeholder={matchDownMD ? 'Name' : ''}
                    name="name"
                    label={`${intl.formatMessage({ id: 'name' })}`}
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

              <Grid item xs={12} md={12}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                  <InputLabel htmlFor="outlined-adornment-name-login">{`${intl.formatMessage({ id: 'email-address' })}`} </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-forgot"
                    type="email"
                    placeholder={matchDownMD ? 'Email Address' : ''}
                    defaultValue={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={`${intl.formatMessage({ id: 'email-address' })}`}
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

              <Grid item xs={12} md={12}>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ position: 'relative' }}>
                  <InputLabel htmlFor="outlined-adornment-phoneNumber-login">{`${intl.formatMessage({ id: 'phone-number' })}`} </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone-forgot"
                    placeholder={matchDownMD ? 'Phone Number' : ''}
                    defaultValue={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={`${intl.formatMessage({ id: 'phone-number' })}`}
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

              <Grid item xs={12} md={12}>
                <FormControl fullWidth error={Boolean(touched.message && errors.message)} sx={{ position: 'relative' }}>
                  <InputLabel htmlFor="outlined-adornment-phoneNumber-login">{`${intl.formatMessage({ id: 'message' })}`} </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-message-forgot"
                    placeholder={matchDownMD ? 'message Number' : ''}
                    defaultValue={values.message}
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={`${intl.formatMessage({ id: 'message' })}`}
                    inputProps={{
                      rows: 5
                    }}
                    multiline
                    rows={5}
                  />
                  {touched.message && errors.message && (
                    <Box sx={{ position: 'absolute', bottom: '-16px' }}>
                      <FormHelperText sx={{ fontSize: '11px' }} error id="standard-weight-helper-text-message-forgot">
                        {errors.message}
                      </FormHelperText>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sx={{ marginTop: '30px', paddingTop: '0 !important' }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 2.75,
                    py: 1.5
                  }}
                  fullWidth
                >
                  <FormattedMessage id="submit1" />
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

export default MailerSubscriberContact;
