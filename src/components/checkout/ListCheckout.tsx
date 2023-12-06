import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  useTheme
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/styles';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import cartApi from '../../../api/CartAPI/cartApi';
import CheckoutItem from './CheckoutItem';

import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'store';
import { ICartList } from 'types/services/productApi.types';
import { LIST_COUNTRIES, PAYMENT_METHODS } from 'utils/const';
import { getProductById } from '../../../api/ProductAPI/productDashboash';
const CustomButton = styled(Button)(({ theme }) => ({
  width: '174px',
  height: '46px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(191, 140, 10, 1)',
  fontFamily: 'Open Sans',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '27px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(151 111 8)'
  },
  [theme.breakpoints.down('md')]: {
    width: '48%'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListCheckout() {
  const [listCart, setListCart] = useState<ICartList[]>([]);
  const products = useSelector((state) => state.cart.checkout.products);

  const fetch = useCallback(async () => {
    const dm = await Promise.all(
      products.map(async (product) => {
        const res = await getProductById(product.id);
        return { ...res.data, quantity: product.quantity };
      })
    );
    const res = await cartApi.listItemInCart();
    console.log(res);

    setListCart(dm);

    // if (products.length > 0) {
    //   products.forEach(async (item) => {
    //     await getProductById(item.id).then((res) => {
    //       data.push(res.data);
    //     });
    //   });

    //   setListCart(data);
    // }
  }, [products]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: '',
      city: '',
      postalCode: 0,
      country: 'Viet Nam',
      paymentMethod: 'Cash delivery',
      submit: null
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255).required('Address is required'),
      city: Yup.string().max(255).required('City is required'),
      country: Yup.string().max(255).required('Country is required'),
      paymentMethod: Yup.string().max(255).required('Payment method is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const { address, city, postalCode, country, paymentMethod } = values;
        await cartApi.createOrder({ paymentMethod, shippingAddress: { address, city, country, postalCode } }).then(
          (res) => {
            console.log(res);
          },
          (err: any) => {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        );
      } catch (err: any) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      {listCart.map((item) => (
        <CheckoutItem key={item.id} data={item} />
      ))}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CustomButton>Back to shop</CustomButton>
        <CustomButton>Remove all</CustomButton>
        {!isLoggedIn ? (
          <DialogAuthCommon>
            <CustomButton>Order</CustomButton>
          </DialogAuthCommon>
        ) : (
          <CustomButton onClick={handleClickOpen}>Order</CustomButton>
        )}
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Order Form'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="alert-dialog-slide-description">
              <Grid container columnSpacing={2}>
                <Grid item md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.address && formik.errors.address)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-address-login">Address </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-address-login"
                      type="address"
                      value={formik.values.address}
                      name="address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="Address"
                      inputProps={{}}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <FormHelperText error id="standard-weight-helper-text-address-login">
                        {formik.errors.address}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  {' '}
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.city && formik.errors.city)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-city-login">City</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-city-login"
                      type="city"
                      value={formik.values.city}
                      name="city"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="City"
                      inputProps={{}}
                    />

                    {formik.touched.city && formik.errors.city && (
                      <FormHelperText error id="standard-weight-helper-text-city-login">
                        {formik.errors.city}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-postalCode-login">Postal Code</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-postalCode-login"
                      type="postalCode"
                      value={formik.values.postalCode}
                      name="postalCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="Postal Code"
                      inputProps={{}}
                    />

                    {formik.touched.postalCode && formik.errors.postalCode && (
                      <FormHelperText error id="standard-weight-helper-text-postalCode-login">
                        {formik.errors.postalCode}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.country && formik.errors.country)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-country-login">Country</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                      sx={{
                        fieldset: {
                          borderColor: 'rgba(191, 140, 10, 1) !important'
                        },
                        height: '62px',
                        div: {
                          marginTop: '15px'
                        }
                      }}
                    >
                      {LIST_COUNTRIES.map((data) => (
                        <MenuItem key={data.code} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.country && formik.errors.country && (
                      <FormHelperText error id="standard-weight-helper-text-country-login">
                        {formik.errors.country}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-paymentMethod-login">Payment method</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="paymentMethod"
                      value={formik.values.paymentMethod}
                      onChange={formik.handleChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                      sx={{
                        fieldset: {
                          borderColor: 'rgba(191, 140, 10, 1) !important'
                        },
                        height: '62px',
                        div: {
                          marginTop: '15px'
                        }
                      }}
                    >
                      {PAYMENT_METHODS.map((data) => (
                        <MenuItem key={data.id} value={data.value}>
                          {data.title}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                      <FormHelperText error id="standard-weight-helper-text-paymentMethod-login">
                        {formik.errors.paymentMethod}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={formik.isSubmitting}
                    onClick={() => {
                      console.log(formik.errors);
                    }}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgb(191, 140, 10)'
                    }}
                  >
                    Order
                  </Button>
                </AnimateButton>
              </Box>
            </DialogContentText>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default ListCheckout;
