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
  Typography,
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
import { isUndefined } from 'lodash';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { removeProduct, setBillingAddress } from 'store/slices/cart';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import { openSnackbar } from 'store/slices/snackbar';
import { Address } from 'types/cart';
import { IOrderItem } from 'types/services/cartApi.types';
import { ICartList, IResponseGetProductById } from 'types/services/productApi.types';
import { IAddressList } from 'types/services/serviceitem';
import { LIST_COUNTRIES, PAYMENT_METHODS } from 'utils/const';
import orderAPI from '../../../api/OrderAPI/OrderAPI';
import CheckoutDetail from './CheckoutDetail';
const CustomButton = styled(Button)(({ theme }) => ({
  width: '180px',
  height: '46px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(191, 140, 10, 1)',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '27px',
  color: '#fff',
  marginBottom: '15px',
  '&:hover': {
    backgroundColor: 'rgb(151 111 8)'
  },
  [theme.breakpoints.down('md')]: {
    width: '45%',
    fontSize: '15px',
    height: '35px'
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

interface ListCheckoutProps {
  handlePrice: (data: number) => void;
  totalPrice: number;
  handleToggle: (data: number) => void;
}

interface InitFormAddress {
  addressId: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  paymentMethod: string;
  submit: null | boolean;
}

function ListCheckout({ handlePrice, totalPrice, handleToggle }: ListCheckoutProps) {
  const [listCart, setListCart] = useState<ICartList[]>([]);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [addressList, setAddressList] = useState<IAddressList[]>([]);
  const products = useSelector((state) => state.cart.checkout.products);
  const [defaultAddress, setDefaultAddress] = useState<InitFormAddress>({
    addressId: -1,
    address: '',
    city: '',
    postalCode: 0,
    country: 'Viet Nam',
    paymentMethod: 'Cash delivery',
    submit: null
  });
  const billing = useSelector((state) => state.cart.checkout.billing);

  const { isLoggedIn } = useAuth();
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: defaultAddress,
    validationSchema: Yup.object().shape({
      address: Yup.string().when(['addressId'], {
        is: (addressId: number) => {
          return addressId !== -1;
        }, // alternatively: (isBig, isSpecial) => isBig && isSpecial
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required('Address is required')
      }),
      city: Yup.string().when(['addressId'], {
        is: (addressId: number) => {
          return addressId !== -1;
        }, // alternatively: (isBig, isSpecial) => isBig && isSpecial
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required('City is required')
      }),
      country: Yup.string().when(['addressId'], {
        is: (addressId: number) => {
          return addressId !== -1;
        }, // alternatively: (isBig, isSpecial) => isBig && isSpecial
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required('Country is required')
      }),
      paymentMethod: Yup.string().max(255).required('Payment method is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const { address, city, postalCode, country, paymentMethod, addressId } = values;
        const orderItems: IOrderItem[] = [];
        listCart.forEach((item) => {
          orderItems.push({ product: item.id, qty: +item.quantity, price: +item.base_price });
        });
        const res = await cartApi.createOrder({
          orderItems,
          paymentMethod,
          shippingAddress: addressId === -1 ? { address, city, country, postalCode } : { id: addressId },
          totalPrice
        });

        if (res.status === 200) {
          const addressInformation: Address = {
            building: '',
            city,
            country,
            destination: paymentMethod,
            isDefault: true,
            name: '',
            phone: '',
            post: postalCode,
            state: '',
            street: address
          };

          dispatch(setBillingAddress(addressInformation));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Order successfully created',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          dispatch(removeProduct([]));
          setOpen(false);
          handleToggle(1);
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

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const fetchAddressUser = useCallback(async () => {
    const res = await orderAPI.getUserAddress();
    if (res.data.length > 0)
      formik.handleChange({
        target: { name: 'addressId', value: res.data[0].id }
      });
    setAddressList(res.data);
  }, []);

  const fetch = useCallback(async () => {
    const ids: number[] = [];
    products?.forEach((item) => {
      ids.push(item.id);
    });
    dispatch(showLoading());

    try {
      const res1 = await cartApi.getItemsWithListId({ ids });
      let allPrice: number = 0;
      const params = res1.data.data?.map((d: IResponseGetProductById) => {
        const productItem = products?.find((item) => item.id === d.id);
        if (!isUndefined(productItem)) allPrice += productItem?.quantity * +d.base_price;
        return { ...d, quantity: productItem?.quantity ?? 0 };
      });
      handlePrice(allPrice);

      setListCart(params);
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Something went wrong!',
          variant: 'alert',
          alert: {
            color: 'error'
          },

          severity: 'error',
          close: false
        })
      );
    } finally {
      dispatch(hiddenLoading());
    }
  }, [dispatch, handlePrice, products]);

  useEffect(() => {
    fetch();
  }, [billing, fetch]);

  useEffect(() => {
    if (open) {
      fetchAddressUser();
    }
  }, [fetchAddressUser, open]);

  return (
    <>
      {/* <DialogBill openBill={true} handleCloseBill={handleCloseBill} /> */}

      <Grid container>
        <Grid item md={6} xs={12}>
          {' '}
          {listCart.map((item) => (
            <CheckoutItem key={item.id} data={item} />
          ))}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <Link href={'/shop'}>
              <CustomButton
                sx={{
                  [theme.breakpoints.down('md')]: {
                    width: '100% !important',
                    minWidth: 'inherit',
                    fontSize: '15px',
                    height: '35px'
                  }
                }}
              >{`${intl.formatMessage({ id: 'back-to-shop' })}`}</CustomButton>
            </Link>
            {products.length > 0 && (
              <>
                <CustomButton
                  onClick={() => {
                    dispatch(showLoading());
                    dispatch(removeProduct([]));
                    dispatch(hiddenLoading());
                  }}
                >
                  {`${intl.formatMessage({ id: 'remove-all' })}`}
                </CustomButton>
              </>
            )}

            {products.length > 0 && (
              <>
                {!isLoggedIn ? (
                  <CustomButton sx={{ width: '100%' }}>
                    <DialogAuthCommon>
                      <>{`${intl.formatMessage({ id: 'order1' })}`}</>
                    </DialogAuthCommon>
                  </CustomButton>
                ) : (
                  <CustomButton onClick={handleClickOpen}>{`${intl.formatMessage({ id: 'order1' })}`}</CustomButton>
                )}
              </>
            )}
          </Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{'Shipping address'}</DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <DialogContentText id="alert-dialog-slide-description">
                  <Grid container columnSpacing={2}>
                    <Grid item md={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(formik.touched.addressId && formik.errors.addressId)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-addressId-login">{`${intl.formatMessage({
                          id: 'choose-address'
                        })}`}</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="addressId"
                          value={formik.values.addressId}
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
                          <MenuItem value={-1}>
                            {intl.formatMessage({
                              id: 'create-one'
                            })}
                          </MenuItem>
                          {addressList.map((data) => (
                            <MenuItem key={data.id} value={data.id}>
                              <Box>
                                <b>
                                  {intl.formatMessage({
                                    id: 'address'
                                  })}
                                </b>
                                : {data.address} -{' '}
                                <b>
                                  {intl.formatMessage({
                                    id: 'city'
                                  })}
                                </b>
                                : {data.city} -{' '}
                                <b>
                                  {' '}
                                  {intl.formatMessage({
                                    id: 'country'
                                  })}
                                </b>
                                : {data.country} -{' '}
                                <b>
                                  {' '}
                                  {intl.formatMessage({
                                    id: 'postal-code'
                                  })}
                                </b>
                                : {data.postalCode}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>

                        {formik.touched.addressId && formik.errors.addressId && (
                          <FormHelperText error id="standard-weight-helper-text-addressId-login">
                            {formik.errors.addressId}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {formik.values.addressId === -1 && (
                      <>
                        <Grid item md={12}>
                          <FormControl
                            fullWidth
                            error={Boolean(formik.touched.address && formik.errors.address)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-address-login">
                              {' '}
                              {`${intl.formatMessage({ id: 'address' })}`}{' '}
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-address-login"
                              type="address"
                              value={formik.values.address}
                              name="address"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              label={`${intl.formatMessage({ id: 'address' })}`}
                              inputProps={{}}
                            />
                            {formik.touched.address && formik.errors.address && (
                              <FormHelperText error id="standard-weight-helper-text-address-login">
                                {formik.errors.address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(formik.touched.city && formik.errors.city)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-city-login">{`${intl.formatMessage({ id: 'city' })}`}</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-city-login"
                              type="city"
                              value={formik.values.city}
                              name="city"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              label={`${intl.formatMessage({ id: 'city' })}`}
                              inputProps={{}}
                            />

                            {formik.touched.city && formik.errors.city && (
                              <FormHelperText error id="standard-weight-helper-text-city-login">
                                {formik.errors.city}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-postalCode-login">{`${intl.formatMessage({
                              id: 'postal-code'
                            })}`}</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-postalCode-login"
                              type="postalCode"
                              value={formik.values.postalCode}
                              name="postalCode"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              label={`${intl.formatMessage({ id: 'postal-code' })}`}
                              inputProps={{}}
                            />

                            {formik.touched.postalCode && formik.errors.postalCode && (
                              <FormHelperText error id="standard-weight-helper-text-postalCode-login">
                                {formik.errors.postalCode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(formik.touched.country && formik.errors.country)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-country-login">{`${intl.formatMessage({ id: 'country' })}`}</InputLabel>
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
                      </>
                    )}
                    <Grid item md={3}>
                      <FormControl
                        fullWidth
                        error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-paymentMethod-login">{`${intl.formatMessage({
                          id: 'payment-method'
                        })}`}</InputLabel>
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
                  {formik.values.paymentMethod === 'Bank transfer' && (
                    <Box
                      sx={{
                        width: '300px',
                        border: '1px solid',
                        padding: '15px',
                        borderRadius: '8px',
                        margin: '15px auto',
                        color: '#000'
                      }}
                    >
                      <Typography fontWeight={'bold'}>📌TECHCOMBANK THANH XUÂN</Typography>
                      <Typography fontWeight={'bold'}> 19033245019013</Typography>
                      <Typography fontWeight={'bold'}> VU PHUONG NGHI</Typography>
                    </Box>
                  )}
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
                        fullWidth
                        onClick={() => {
                          console.log(formik.errors);
                        }}
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: 'rgb(191, 140, 10)',
                          '&:hover': {
                            backgroundColor: 'rgb(151 111 8)'
                          }
                        }}
                      >
                        {intl.formatMessage({ id: 'order1' })}
                      </Button>
                    </AnimateButton>
                  </Box>
                </DialogContentText>
              </form>
            </DialogContent>
          </Dialog>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item sm={3} sx={{ display: { sm: 'block', xs: 'none' } }}></Grid>
            <Grid item md={9} sm={12} xs={12}>
              <CheckoutDetail totalPrice={totalPrice} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ListCheckout;
